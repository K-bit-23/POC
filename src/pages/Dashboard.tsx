import React from 'react';
import { useApp } from '../context/AppContext';
import SpoilageDetector from '../components/SpoilageDetector';
import VirtualController from '../components/VirtualController';
import { 
  Scan,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Camera
} from 'lucide-react';

export default function Dashboard() {
  const { addNotification } = useApp();

  const detectionStats = [
    {
      title: 'Fresh Items',
      value: '847',
      icon: CheckCircle,
      color: 'from-green-400 to-green-600',
      change: '+12%'
    },
    {
      title: 'Moderate Spoilage',
      value: '23',
      icon: AlertTriangle,
      color: 'from-yellow-400 to-yellow-600',
      change: '-5%'
    },
    {
      title: 'Spoiled Items',
      value: '7',
      icon: Scan,
      color: 'from-red-400 to-red-600',
      change: '-18%'
    },
    {
      title: 'Detection Accuracy',
      value: '94.2%',
      icon: BarChart3,
      color: 'from-blue-400 to-purple-600',
      change: '+2.1%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FreshGuard Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">AI-powered spoilage detection and quality monitoring</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-800 dark:text-green-200 font-medium">AI Detection Active</span>
        </div>
      </div>

      {/* Detection Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detectionStats.map((stat, index) => (
          <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
              }`}>
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Spoilage Detection Component */}
      <SpoilageDetector />

      {/* Recent Detections */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Detections</h3>
          <button
            onClick={() => addNotification('Detection history updated')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { item: 'Apples (Batch #A123)', status: 'fresh', time: '2 minutes ago', confidence: 96 },
            { item: 'Bananas (Batch #B456)', status: 'moderate', time: '15 minutes ago', confidence: 87 },
            { item: 'Tomatoes (Batch #T789)', status: 'fresh', time: '1 hour ago', confidence: 94 },
            { item: 'Lettuce (Batch #L012)', status: 'spoiled', time: '2 hours ago', confidence: 91 }
          ].map((detection, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  detection.status === 'fresh' ? 'bg-green-500' :
                  detection.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{detection.item}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{detection.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium capitalize ${
                  detection.status === 'fresh' ? 'text-green-600 dark:text-green-400' :
                  detection.status === 'moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {detection.status}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{detection.confidence}% confidence</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Controller */}
      <VirtualController />
    </div>
  );
}