import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Moon, 
  Sun, 
  Camera, 
  MapPin, 
  Clock, 
  Palette,
  Layout,
  Save,
  RotateCcw
} from 'lucide-react';

export default function Settings() {
  const { isDark, setIsDark, addNotification } = useApp();
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [locationFormat, setLocationFormat] = useState('decimal');
  const [timeFormat, setTimeFormat] = useState('12');
  const [layoutMode, setLayoutMode] = useState('grid');

  const handleSave = () => {
    addNotification('Settings saved successfully');
  };

  const handleReset = () => {
    setIsDark(false);
    setCameraEnabled(true);
    setLocationFormat('decimal');
    setTimeFormat('12');
    setLayoutMode('grid');
    addNotification('Settings reset to defaults');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your AgriFresh experience</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <RotateCcw size={20} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl">
              <Palette className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
              <p className="text-gray-600 dark:text-gray-400">Customize the look and feel</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDark(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    !isDark
                      ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200'
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun size={20} />
                  <span>Light Mode</span>
                </button>
                <button
                  onClick={() => setIsDark(true)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200'
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Moon size={20} />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Layout Mode</label>
              <select
                value={layoutMode}
                onChange={(e) => setLayoutMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="grid">Grid Layout</option>
                <option value="list">List Layout</option>
                <option value="compact">Compact Layout</option>
                <option value="custom">Custom Layout</option>
              </select>
            </div>
          </div>
        </div>

        {/* Device Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl">
              <Camera className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Device Settings</h3>
              <p className="text-gray-600 dark:text-gray-400">Configure device permissions</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Camera Access</label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow camera for crop monitoring</p>
              </div>
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  cameraEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    cameraEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Location & Time Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location & Time</h3>
              <p className="text-gray-600 dark:text-gray-400">Configure display formats</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location Format</label>
              <select
                value={locationFormat}
                onChange={(e) => setLocationFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="decimal">Decimal Degrees (DD)</option>
                <option value="dms">Degrees, Minutes, Seconds (DMS)</option>
                <option value="utm">UTM Coordinates</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Format</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="12"
                    checked={timeFormat === '12'}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">12 Hour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="24"
                    checked={timeFormat === '24'}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">24 Hour</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Customization */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl">
              <Layout className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Layout Customization</h3>
              <p className="text-gray-600 dark:text-gray-400">Drag and drop interface elements</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Layout size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Drag & Drop Layout Editor</p>
                <p className="text-xs">Coming Soon</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-move hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dashboard Cards</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sensor displays</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-move hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Device Controls</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toggle switches</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-move hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Charts</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Data visualization</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-move hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Navigation</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Menu layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}