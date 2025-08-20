import { useState, useEffect, useRef, useCallback } from 'react';
import { useOpenCV } from './useOpenCV';

interface VirtualControlState {
  isActive: boolean;
  currentGesture: string;
  cursorPosition: { x: number; y: number };
  selectedElement: string | null;
}

export function useVirtualControl() {
  const [controlState, setControlState] = useState<VirtualControlState>({
    isActive: false,
    currentGesture: 'none',
    cursorPosition: { x: 0, y: 0 },
    selectedElement: null
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { isLoaded, detectHandGestures } = useOpenCV();
  const animationFrameRef = useRef<number>();

  const startVirtualControl = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setControlState(prev => ({ ...prev, isActive: true }));
        
        // Start gesture detection loop
        const detectLoop = () => {
          if (videoRef.current && controlState.isActive) {
            const detection = detectHandGestures(videoRef.current);
            
            if (detection) {
              const normalizedX = (detection.x / videoRef.current.videoWidth) * window.innerWidth;
              const normalizedY = (detection.y / videoRef.current.videoHeight) * window.innerHeight;
              
              setControlState(prev => ({
                ...prev,
                currentGesture: detection.gesture,
                cursorPosition: { x: normalizedX, y: normalizedY }
              }));

              // Handle gesture actions
              handleGestureAction(detection.gesture, normalizedX, normalizedY);
            }
          }
          
          if (controlState.isActive) {
            animationFrameRef.current = requestAnimationFrame(detectLoop);
          }
        };
        
        videoRef.current.onloadedmetadata = () => {
          detectLoop();
        };
      }
    } catch (error) {
      console.error('Failed to start virtual control:', error);
    }
  }, [controlState.isActive, detectHandGestures]);

  const stopVirtualControl = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setControlState({
      isActive: false,
      currentGesture: 'none',
      cursorPosition: { x: 0, y: 0 },
      selectedElement: null
    });
  }, []);

  const handleGestureAction = useCallback((gesture: string, x: number, y: number) => {
    const elementAtPosition = document.elementFromPoint(x, y);
    
    switch (gesture) {
      case 'point':
        // Highlight element under cursor
        if (elementAtPosition) {
          setControlState(prev => ({ 
            ...prev, 
            selectedElement: elementAtPosition.id || elementAtPosition.className 
          }));
        }
        break;
        
      case 'fist':
        // Click action
        if (elementAtPosition && (elementAtPosition as HTMLElement).click) {
          (elementAtPosition as HTMLElement).click();
        }
        break;
        
      case 'open':
        // Scroll or swipe action
        window.scrollBy(0, (y - window.innerHeight / 2) * 0.1);
        break;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopVirtualControl();
    };
  }, [stopVirtualControl]);

  return {
    controlState,
    videoRef,
    startVirtualControl,
    stopVirtualControl,
    isLoaded
  };
}