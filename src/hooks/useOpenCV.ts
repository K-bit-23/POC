import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    cv: any;
  }
}

export interface DetectionResult {
  spoilageLevel: number;
  confidence: number;
  type: 'fresh' | 'moderate' | 'spoiled';
  areas: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    severity: number;
  }>;
}

export function useOpenCV() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkOpenCV = () => {
      if (window.cv && window.cv.Mat) {
        setIsLoaded(true);
      } else {
        setTimeout(checkOpenCV, 100);
      }
    };
    checkOpenCV();
  }, []);

  const detectSpoilage = async (imageElement: HTMLImageElement): Promise<DetectionResult> => {
    if (!window.cv || !canvasRef.current) {
      throw new Error('OpenCV not loaded');
    }

    setIsProcessing(true);

    try {
      const cv = window.cv;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      
      // Set canvas size to match image
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      ctx.drawImage(imageElement, 0, 0);

      // Convert to OpenCV Mat
      const src = cv.imread(canvas);
      const hsv = new cv.Mat();
      const mask = new cv.Mat();
      const result = new cv.Mat();

      // Convert to HSV for better color analysis
      cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);

      // Define color ranges for spoilage detection
      const brownLower = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [10, 50, 20, 0]);
      const brownUpper = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [20, 255, 200, 255]);
      
      // Create mask for brown/dark spots (spoilage indicators)
      cv.inRange(hsv, brownLower, brownUpper, mask);

      // Apply morphological operations to clean up the mask
      const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5));
      cv.morphologyEx(mask, mask, cv.MORPH_CLOSE, kernel);
      cv.morphologyEx(mask, mask, cv.MORPH_OPEN, kernel);

      // Find contours
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      // Analyze contours for spoilage areas
      const areas: DetectionResult['areas'] = [];
      let totalSpoilageArea = 0;
      const totalArea = src.rows * src.cols;

      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        
        if (area > 100) { // Filter small noise
          const rect = cv.boundingRect(contour);
          const severity = Math.min(1, area / 1000); // Normalize severity
          
          areas.push({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            severity
          });
          
          totalSpoilageArea += area;
          
          // Draw bounding rectangle on result
          cv.rectangle(src, new cv.Point(rect.x, rect.y), 
                      new cv.Point(rect.x + rect.width, rect.y + rect.height), 
                      new cv.Scalar(255, 0, 0, 255), 2);
        }
        contour.delete();
      }

      // Calculate spoilage percentage
      const spoilagePercentage = (totalSpoilageArea / totalArea) * 100;
      
      // Determine spoilage level and type
      let type: DetectionResult['type'];
      let confidence: number;
      
      if (spoilagePercentage < 5) {
        type = 'fresh';
        confidence = 0.9 - (spoilagePercentage / 10);
      } else if (spoilagePercentage < 20) {
        type = 'moderate';
        confidence = 0.8 - (spoilagePercentage / 50);
      } else {
        type = 'spoiled';
        confidence = 0.7 + Math.min(0.2, spoilagePercentage / 100);
      }

      // Draw result back to canvas
      cv.imshow(canvas, src);

      // Cleanup
      src.delete();
      hsv.delete();
      mask.delete();
      result.delete();
      brownLower.delete();
      brownUpper.delete();
      kernel.delete();
      contours.delete();
      hierarchy.delete();

      return {
        spoilageLevel: spoilagePercentage,
        confidence: Math.max(0.5, confidence),
        type,
        areas
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const detectHandGestures = (videoElement: HTMLVideoElement): { x: number; y: number; gesture: string } | null => {
    if (!window.cv || !canvasRef.current) return null;

    const cv = window.cv;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    ctx.drawImage(videoElement, 0, 0);

    try {
      const src = cv.imread(canvas);
      const gray = new cv.Mat();
      const blur = new cv.Mat();
      const thresh = new cv.Mat();

      // Convert to grayscale and apply Gaussian blur
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
      cv.GaussianBlur(gray, blur, new cv.Size(35, 35), 0);
      
      // Apply threshold to detect hand
      cv.threshold(blur, thresh, 127, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);

      // Find contours
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      if (contours.size() > 0) {
        // Find largest contour (assumed to be hand)
        let maxArea = 0;
        let maxContourIndex = 0;
        
        for (let i = 0; i < contours.size(); i++) {
          const area = cv.contourArea(contours.get(i));
          if (area > maxArea) {
            maxArea = area;
            maxContourIndex = i;
          }
        }

        if (maxArea > 5000) { // Minimum area threshold
          const handContour = contours.get(maxContourIndex);
          const moments = cv.moments(handContour);
          
          if (moments.m00 !== 0) {
            const cx = moments.m10 / moments.m00;
            const cy = moments.m01 / moments.m00;
            
            // Simple gesture recognition based on contour properties
            const hull = new cv.Mat();
            cv.convexHull(handContour, hull);
            const hullArea = cv.contourArea(hull);
            const solidity = maxArea / hullArea;
            
            let gesture = 'unknown';
            if (solidity > 0.8) {
              gesture = 'fist';
            } else if (solidity > 0.6) {
              gesture = 'open';
            } else {
              gesture = 'point';
            }

            hull.delete();
            handContour.delete();
            
            // Cleanup
            src.delete();
            gray.delete();
            blur.delete();
            thresh.delete();
            contours.delete();
            hierarchy.delete();

            return { x: cx, y: cy, gesture };
          }
        }
      }

      // Cleanup
      src.delete();
      gray.delete();
      blur.delete();
      thresh.delete();
      contours.delete();
      hierarchy.delete();

    } catch (error) {
      console.error('Hand detection error:', error);
    }

    return null;
  };

  return {
    isLoaded,
    isProcessing,
    canvasRef,
    detectSpoilage,
    detectHandGestures
  };
}