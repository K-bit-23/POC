import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wifi, 
  Gift, 
  Lightbulb, 
  Settings, 
  Map,
  ChevronRight,
  BarChart3,
  Leaf,
  Truck
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/devices', icon: Wifi, label: 'Device Connections' },
  { path: '/rewards', icon: Gift, label: 'Rewards' },
  { path: '/suggestions', icon: Lightbulb, label: 'Suggestions' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics Dashboard' },
  { path: '/RecyclingGame', icon: Leaf, label: 'Eco & Waste Game' }, // ✅ new game page
  { path: '/waste-tracking', icon: Truck, label: 'Waste Tracking' }, // ✅ new tracking page
  { path: '/maps', icon: Map, label: 'Maps' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  return (
    <nav className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
