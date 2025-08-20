import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Wifi, WifiOff, Settings, Trash2, Edit } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  mqttTopic: string;
  mqttServer: string;
  status: 'connected' | 'disconnected';
  lastSeen: string;
}

export default function DeviceConnections() {
  const { addNotification } = useApp();
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Temperature Sensor',
      type: 'sensor',
      mqttTopic: 'farm/sensors/temperature',
      mqttServer: 'mqtt.agrifresh.com:1883',
      status: 'connected',
      lastSeen: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Humidity Sensor',
      type: 'sensor',
      mqttTopic: 'farm/sensors/humidity',
      mqttServer: 'mqtt.agrifresh.com:1883',
      status: 'connected',
      lastSeen: '1 minute ago'
    },
    {
      id: '3',
      name: 'Smart Irrigation Controller',
      type: 'actuator',
      mqttTopic: 'farm/actuators/irrigation',
      mqttServer: 'mqtt.agrifresh.com:1883',
      status: 'disconnected',
      lastSeen: '1 hour ago'
    }
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'sensor',
    mqttTopic: '',
    mqttServer: 'mqtt.agrifresh.com:1883'
  });

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.mqttTopic) {
      const device: Device = {
        id: Date.now().toString(),
        ...newDevice,
        status: 'disconnected',
        lastSeen: 'Never'
      };
      setDevices([...devices, device]);
      setNewDevice({ name: '', type: 'sensor', mqttTopic: '', mqttServer: 'mqtt.agrifresh.com:1883' });
      setShowAddDevice(false);
      addNotification(`Device "${device.name}" added successfully`);
    }
  };

  const toggleDeviceStatus = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id 
        ? { 
            ...device, 
            status: device.status === 'connected' ? 'disconnected' : 'connected',
            lastSeen: device.status === 'connected' ? 'Just now' : new Date().toLocaleString()
          }
        : device
    ));
  };

  const removeDevice = (id: string) => {
    const device = devices.find(d => d.id === id);
    setDevices(devices.filter(d => d.id !== id));
    addNotification(`Device "${device?.name}" removed`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Device Connections</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage cameras and detection devices</p>
        </div>
        <button
          onClick={() => setShowAddDevice(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Plus size={20} />
          <span>Add Camera</span>
        </button>
      </div>

      {/* MQTT Server Status */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Detection Server</h3>
            <p className="text-gray-600 dark:text-gray-400">detection.freshguard.com:443</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 dark:text-green-400 font-medium">Connected</span>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${device.type === 'sensor' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                  {device.status === 'connected' ? (
                    <Wifi className={device.type === 'sensor' ? 'text-blue-600' : 'text-green-600'} size={20} />
                  ) : (
                    <WifiOff className="text-gray-400" size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{device.type}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => toggleDeviceStatus(device.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <Settings size={16} />
                </button>
                <button 
                  onClick={() => removeDevice(device.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">MQTT Topic</label>
                <p className="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">{device.mqttTopic}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Server</label>
                <p className="text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">{device.mqttServer}</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  device.status === 'connected'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                }`}>
                  {device.status}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Last seen: {device.lastSeen}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New Device</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Name</label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter device name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Type</label>
                <select
                  value={newDevice.type}
                  onChange={(e) => setNewDevice({...newDevice, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="sensor">Sensor</option>
                  <option value="actuator">Actuator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MQTT Topic</label>
                <input
                  type="text"
                  value={newDevice.mqttTopic}
                  onChange={(e) => setNewDevice({...newDevice, mqttTopic: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="farm/sensors/your-topic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">MQTT Server</label>
                <input
                  type="text"
                  value={newDevice.mqttServer}
                  onChange={(e) => setNewDevice({...newDevice, mqttServer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="mqtt.server.com:1883"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddDevice(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}