import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  status: 'normal' | 'warning' | 'high' | 'low' | 'connected';
}

const statusColors = {
  normal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  low: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  connected: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
};

export default function SensorCard({ title, value, icon: Icon, color, status }: SensorCardProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
              <Icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                {status}
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-200">
            {value}
          </div>
        </div>
      </div>
      <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full transform transition-all duration-1000 ease-out`} 
             style={{ width: '75%' }}></div>
      </div>
    </div>
  );
}