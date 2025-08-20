import React, { useState } from 'react';
import { Map, Layers, Thermometer, Eye, MapPin } from 'lucide-react';

type MapType = 'normal' | 'demand' | 'heat' | 'osm';

export default function Maps() {
  const [activeMap, setActiveMap] = useState<MapType>('normal');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: typeof sampleDataPoints[0] } | null>(null);

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
    },
    {
      id: 'osm' as MapType,
      name: 'Live Map',
      icon: MapPin,
      description: 'OpenStreetMap live view'
    }
  ];

  const sampleDataPoints = [
    { id: 1, x: 25, y: 30, temp: 4.5, humidity: 85, crop: 'Apples', quality: 95 },
    { id: 2, x: 45, y: 45, temp: 2.2, humidity: 90, crop: 'Lettuce', quality: 87 },
    { id: 3, x: 65, y: 25, temp: 8.8, humidity: 75, crop: 'Tomatoes', quality: 92 },
    { id: 4, x: 35, y: 65, temp: 6.1, humidity: 80, crop: 'Bananas', quality: 78 },
    { id: 5, x: 75, y: 55, temp: 3.3, humidity: 88, crop: 'Carrots', quality: 91 }
  ];

  const handleMouseOver = (point: typeof sampleDataPoints[0], event: React.MouseEvent) => {
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
              />
            ))}
          </div>
        );
      case 'osm':
        return (
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            {/* Free OpenStreetMap Embed */}
            <iframe
              title="OpenStreetMap"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=68.1766,6.5546,97.4026,35.6745&layer=mapnik"
              allowFullScreen
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector */}
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

      {/* Map Display */}
      <div className="relative h-96 w-full">
        {renderMapContent()}
      </div>

      {/* Hover Tooltip (not for OSM) */}
      {hoveredPoint && activeMap !== 'osm' && (
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
