import React from 'react';
import { useVirtualControl } from '../hooks/useVirtualControl';
import { Hand, Video, VideoOff, MousePointer } from 'lucide-react';

export default function VirtualController() {
  const { controlState, videoRef, startVirtualControl, stopVirtualControl, isLoaded } = useVirtualControl();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Virtual Cursor */}
      {controlState.isActive && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: controlState.cursorPosition.x - 12,
            top: controlState.cursorPosition.y - 12,
          }}
        >
          <div className={`w-6 h-6 rounded-full border-2 ${
            controlState.currentGesture === 'fist' ? 'bg-red-500 border-red-600' :
            controlState.currentGesture === 'point' ? 'bg-blue-500 border-blue-600' :
            'bg-green-500 border-green-600'
          } shadow-lg animate-pulse`}>
            <MousePointer className="text-white" size={16} />
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-xl">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg">
            <Hand className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Virtual Control</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {controlState.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {!isLoaded && (
          <div className="text-center py-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        )}

        {isLoaded && (
          <div className="space-y-3">
            <button
              onClick={controlState.isActive ? stopVirtualControl : startVirtualControl}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                controlState.isActive
                  ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200'
              }`}
            >
              {controlState.isActive ? <VideoOff size={16} /> : <Video size={16} />}
              <span>{controlState.isActive ? 'Stop' : 'Start'}</span>
            </button>

            {controlState.isActive && (
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <p>Gesture: <span className="font-medium capitalize">{controlState.currentGesture}</span></p>
                  <p>Position: {controlState.cursorPosition.x.toFixed(0)}, {controlState.cursorPosition.y.toFixed(0)}</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-20 object-cover rounded"
                  />
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>• Point: Hover/Select</p>
                  <p>• Fist: Click/Tap</p>
                  <p>• Open: Scroll</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}