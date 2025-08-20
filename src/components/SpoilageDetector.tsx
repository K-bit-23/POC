import React, { useState, useRef } from 'react';
import { useOpenCV, DetectionResult } from '../hooks/useOpenCV';
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function SpoilageDetector() {
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { isLoaded, isProcessing, canvasRef, detectSpoilage } = useOpenCV();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetection = async () => {
    if (!selectedImage || !imageRef.current || !isLoaded) return;

    setIsDetecting(true);
    try {
      const result = await detectSpoilage(imageRef.current);
      setDetectionResult(result);
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  const getStatusIcon = (type: DetectionResult['type']) => {
    switch (type) {
      case 'fresh':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'moderate':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'spoiled':
        return <XCircle className="text-red-500" size={24} />;
    }
  };

  const getStatusColor = (type: DetectionResult['type']) => {
    switch (type) {
      case 'fresh':
        return 'from-green-400 to-green-600';
      case 'moderate':
        return 'from-yellow-400 to-yellow-600';
      case 'spoiled':
        return 'from-red-400 to-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl">
            <Scan className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Spoilage Detection</h3>
            <p className="text-gray-600 dark:text-gray-400">Upload fruit/vegetable images for analysis</p>
          </div>
        </div>

        {!isLoaded && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading OpenCV...</p>
          </div>
        )}

        {isLoaded && (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {!selectedImage ? (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload an image of fruits or vegetables
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <Camera size={20} />
                    <span>Choose Image</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      ref={imageRef}
                      src={selectedImage}
                      alt="Selected produce"
                      className="max-w-full max-h-64 rounded-lg shadow-lg"
                      onLoad={() => console.log('Image loaded')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Change Image
                    </button>
                    <button
                      onClick={handleDetection}
                      disabled={isDetecting || isProcessing}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                    >
                      <Scan size={20} />
                      <span>{isDetecting ? 'Analyzing...' : 'Detect Spoilage'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            {detectionResult && (
              <div className="space-y-4">
                <div className={`bg-gradient-to-r ${getStatusColor(detectionResult.type)} rounded-xl p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(detectionResult.type)}
                      <div>
                        <h4 className="text-xl font-bold capitalize">{detectionResult.type}</h4>
                        <p className="opacity-90">Confidence: {(detectionResult.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{detectionResult.spoilageLevel.toFixed(1)}%</p>
                      <p className="opacity-90">Spoilage Level</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 rounded-lg p-4">
                    <p className="font-medium mb-2">Analysis Results:</p>
                    <ul className="space-y-1 text-sm opacity-90">
                      <li>• Detected {detectionResult.areas.length} spoilage areas</li>
                      <li>• Overall condition: {detectionResult.type}</li>
                      <li>• Recommended action: {
                        detectionResult.type === 'fresh' ? 'Safe to consume' :
                        detectionResult.type === 'moderate' ? 'Use soon or process' :
                        'Discard or compost'
                      }</li>
                    </ul>
                  </div>
                </div>

                {/* Processed Image */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Processed Image with Detection Areas:</h5>
                  <canvas
                    ref={canvasRef}
                    className="max-w-full rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}