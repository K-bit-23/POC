import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navigation from './Navigation';
import { LogOut, User } from 'lucide-react';

export default function Layout() {
  const { setIsAuthenticated, isDark, user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🔍</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">FreshGuard</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">AI Spoilage Detection</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <User size={16} />
                <span>{user?.name || 'Guest User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}