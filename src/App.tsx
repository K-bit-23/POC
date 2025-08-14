import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DeviceConnections from './pages/DeviceConnections';
import Rewards from './pages/Rewards';
import Suggestions from './pages/Suggestions';
import Settings from './pages/Settings';
import Maps from './pages/Maps';
import Auth from './pages/Auth';
import { Toaster } from './components/Toaster';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="devices" element={<DeviceConnections />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="suggestions" element={<Suggestions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="maps" element={<Maps />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;