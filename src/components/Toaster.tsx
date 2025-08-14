import React from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

export function Toaster() {
  const { notifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-sm transform animate-slide-in"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-gray-900 dark:text-white text-sm">{notification}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}