import React, { useState } from 'react';
import { Map, Layers, Thermometer, Eye, MapPin } from 'lucide-react';

type MapType = 'normal' | 'demand' | 'heat';

export default function Maps() {
  const [activeMap, setActiveMap] = useState<MapType>('normal');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: any } | null>(null);

  const mapTypes = [
    { 
      id: 'normal' as MapType, 
      name: 'Normal Map', 
      icon: Map, 
      description: 'Standard view with storage facility locations'
    },
    { 
      id: 'demand' as MapType, 
      name: 'Quality Map', 
      icon: Layers, 
      description: 'Quality distribution across facilities'
    },
    { 
      id: 'heat' as MapType, 
      name: 'Temperature Map', 
      icon: Thermometer, 
      description: 'Storage temperature monitoring'
    }
  ];

  const sampleDataPoints = [
    { id: 1, x: 25, y: 30, temp: 4.5, humidity: 85, crop: 'Apples', quality: 95 },
    { id: 2, x: 45, y: 45, temp: 2.2, humidity: 90, crop: 'Lettuce', quality: 87 },
    { id: 3, x: 65, y: 25, temp: 8.8, humidity: 75, crop: 'Tomatoes', quality: 92 },
    { id: 4, x: 35, y: 65, temp: 6.1, humidity: 80, crop: 'Bananas', quality: 78 },
    { id: 5, x: 75, y: 55, temp: 3.3, humidity: 88, crop: 'Carrots', quality: 91 }
  ];

  const handleMouseOver = (point: any, event: React.MouseEvent) => {
    setHoveredPoint({
      x: event.clientX,
      y: event.clientY,
      data: point
    });
  };

  const handleMouseOut = () => {
    setHoveredPoint(null);
  };

  const renderMapContent = () => {
    switch (activeMap) {
      case 'normal':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            {sampleDataPoints.map((point) => (
              <div
                key={point.id}
                className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onMouseOver={(e) => handleMouseOver(point, e)}
                onMouseOut={handleMouseOut}
              >
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
            ))}
          </div>
        );
      case 'demand':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {/* Grid pattern for demand visualization */}
              <div className="grid grid-cols-8 grid-rows-6 h-full gap-1 p-2">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded ${
                      Math.random() > 0.5 
                        ? 'bg-red-400' 
                        : Math.random() > 0.3 
                          ? 'bg-yellow-400' 
                          : 'bg-green-400'
                    }`}
                    style={{ opacity: Math.random() * 0.7 + 0.3 }}
                  />
                ))}
              </div>
            </div>
            {sampleDataPoints.map((point) => (
              <div
                key={point.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200 ${
                  point.quality > 90 ? 'bg-green-500' : point.quality > 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onMouseOver={(e) => handleMouseOver(point, e)}
                onMouseOut={handleMouseOut}
              />
            ))}
          </div>
        );
      case 'heat':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl overflow-hidden">
            {/* Heat map gradient overlay */}
            <div className="absolute inset-0">
              <div className="w-full h-full" style={{
                background: 'radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(251, 191, 36, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)'
              }} />
            </div>
            {sampleDataPoints.map((point) => (
              <div
                key={point.id}
                className="absolute w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200"
                style={{ 
                  left: `${point.x}%`, 
                  top: `${point.y}%`,
                  backgroundColor: `hsl(${240 - point.temp * 8}, 70%, 60%)`
                }}
                onMouseOver={(e) => handleMouseOver(point, e)}
                onMouseOut={handleMouseOut}
              >
                <div className="absolute inset-0 rounded-full animate-pulse opacity-50"
                     style={{ 
                       backgroundColor: `hsl(${240 - point.temp * 8}, 70%, 50%)`
                     }} />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quality Maps</h1>
          <p className="text-gray-600 dark:text-gray-400">Interactive visualization of quality data across locations</p>
        </div>
      </div>

      {/* Map Type Selector */}
      <div className="flex flex-wrap gap-3">
        {mapTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveMap(type.id)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                activeMap === type.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-transparent shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              <Icon size={20} />
              <div className="text-left">
                <div className="font-medium">{type.name}</div>
                <div className="text-xs opacity-80">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Eye className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {mapTypes.find(t => t.id === activeMap)?.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {sampleDataPoints.length} data points
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={16} />
              <span>Farm Location: 20.5937°N, 78.9629°E</span>
            </div>
          </div>
          
          <div className="relative h-96 w-full">
            {renderMapContent()}
          </div>
        </div>

        {/* Map Legend */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {activeMap === 'normal' && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Storage Facilities</span>
                </div>
              )}
              {activeMap === 'demand' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">High Quality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Medium Quality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Low Quality</span>
                  </div>
                </>
              )}
              {activeMap === 'heat' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">High Temperature</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Medium Temperature</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Low Temperature</span>
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredPoint && (
        <div
          className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg pointer-events-none"
          style={{
            left: hoveredPoint.x + 10,
            top: hoveredPoint.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-sm space-y-1">
            <div className="font-semibold text-gray-900 dark:text-white">
              {hoveredPoint.data.crop} Storage
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Temperature: {hoveredPoint.data.temp}°C
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Humidity: {hoveredPoint.data.humidity}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Quality: {hoveredPoint.data.quality}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}