import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SensorData {
  temperature: number;
  humidity: number;
  co2: number;
  soilMoisture: number;
  lightLevel: number;
  gps: { lat: number; lng: number; };
}

interface DeviceState {
  light: boolean;
  fan: boolean;
  motor: boolean;
  irrigation: boolean;
}

interface User {
  name: string;
  aadhaar: string;
  place: string;
  mobile: string;
  dob: string;
}

interface AppContextType {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  sensorData: SensorData;
  deviceState: DeviceState;
  toggleDevice: (device: keyof DeviceState) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  notifications: string[];
  addNotification: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to authenticated for demo
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24.5,
    humidity: 68,
    co2: 420,
    soilMoisture: 45,
    lightLevel: 75,
    gps: { lat: 20.5937, lng: 78.9629 }
  });

  const [deviceState, setDeviceState] = useState<DeviceState>({
    light: false,
    fan: true,
    motor: false,
    irrigation: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 5)),
        co2: Math.max(350, Math.min(500, prev.co2 + (Math.random() - 0.5) * 10)),
        soilMoisture: Math.max(0, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 3)),
        lightLevel: Math.max(0, Math.min(100, prev.lightLevel + (Math.random() - 0.5) * 5)),
        gps: prev.gps
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (device: keyof DeviceState) => {
    setDeviceState(prev => ({ ...prev, [device]: !prev[device] }));
    addNotification(`${device.charAt(0).toUpperCase() + device.slice(1)} ${deviceState[device] ? 'turned off' : 'turned on'}`);
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  const value = {
    isDark,
    setIsDark,
    sensorData,
    deviceState,
    toggleDevice,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    notifications,
    addNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}