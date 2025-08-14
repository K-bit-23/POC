import React from 'react';
import { useApp } from '../context/AppContext';
import { Power, Wifi, WifiOff } from 'lucide-react';

interface DeviceControlProps {
  name: string;
  device: 'light' | 'fan' | 'motor' | 'irrigation';
  isOn: boolean;
  icon: string;
}

export default function DeviceControl({ name, device, isOn, icon }: DeviceControlProps) {
  const { toggleDevice } = useApp();

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center space-x-1">
              {isOn ? (
                <Wifi className="text-green-500" size={16} />
              ) : (
                <WifiOff className="text-gray-400" size={16} />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isOn ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isOn 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
        }`}>
          {isOn ? 'Online' : 'Offline'}
        </div>
        
        <button
          onClick={() => toggleDevice(device)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isOn ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isOn ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => toggleDevice(device)}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
            isOn
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200'
          }`}
        >
          <Power size={16} />
          <span>{isOn ? 'Turn Off' : 'Turn On'}</span>
        </button>
      </div>
    </div>
  );
}