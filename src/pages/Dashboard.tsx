import React from 'react';
import { useApp } from '../context/AppContext';
import SensorCard from '../components/SensorCard';
import DeviceControl from '../components/DeviceControl';
import SensorChart from '../components/SensorChart';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sprout,
  Sun,
  MapPin
} from 'lucide-react';

export default function Dashboard() {
  const { sensorData, deviceState } = useApp();

  const sensorCards = [
    {
      title: 'Temperature',
      value: `${sensorData.temperature.toFixed(1)}°C`,
      icon: Thermometer,
      color: 'from-red-400 to-orange-500',
      status: 'normal'
    },
    {
      title: 'Humidity',
      value: `${sensorData.humidity.toFixed(0)}%`,
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      status: sensorData.humidity > 70 ? 'high' : 'normal'
    },
    {
      title: 'CO2 Level',
      value: `${sensorData.co2.toFixed(0)} ppm`,
      icon: Wind,
      color: 'from-gray-400 to-gray-600',
      status: sensorData.co2 > 450 ? 'warning' : 'normal'
    },
    {
      title: 'Soil Moisture',
      value: `${sensorData.soilMoisture.toFixed(0)}%`,
      icon: Sprout,
      color: 'from-green-400 to-emerald-500',
      status: sensorData.soilMoisture < 30 ? 'low' : 'normal'
    },
    {
      title: 'Light Level',
      value: `${sensorData.lightLevel.toFixed(0)}%`,
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      status: 'normal'
    },
    {
      title: 'GPS Location',
      value: `${sensorData.gps.lat.toFixed(4)}, ${sensorData.gps.lng.toFixed(4)}`,
      icon: MapPin,
      color: 'from-purple-400 to-pink-500',
      status: 'connected'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of your smart farm</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-800 dark:text-green-200 font-medium">All Systems Online</span>
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorCards.map((card, index) => (
          <SensorCard key={index} {...card} />
        ))}
      </div>

      {/* Device Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DeviceControl
          name="Smart Lighting"
          device="light"
          isOn={deviceState.light}
          icon="💡"
        />
        <DeviceControl
          name="Ventilation Fan"
          device="fan"
          isOn={deviceState.fan}
          icon="🌪️"
        />
        <DeviceControl
          name="Water Pump"
          device="motor"
          isOn={deviceState.motor}
          icon="💧"
        />
        <DeviceControl
          name="Irrigation System"
          device="irrigation"
          isOn={deviceState.irrigation}
          icon="🌿"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          title="Environmental Conditions"
          data={[
            { name: 'Temperature', value: sensorData.temperature, color: '#EF4444' },
            { name: 'Humidity', value: sensorData.humidity, color: '#3B82F6' },
            { name: 'Light Level', value: sensorData.lightLevel, color: '#F59E0B' }
          ]}
        />
        <SensorChart
          title="Soil & Air Quality"
          data={[
            { name: 'Soil Moisture', value: sensorData.soilMoisture, color: '#10B981' },
            { name: 'CO2 Level', value: sensorData.co2 / 5, color: '#6B7280' }
          ]}
        />
      </div>
    </div>
  );
}