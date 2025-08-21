import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DeviceConnections from "./pages/DeviceConnections";
import Rewards from "./pages/Rewards";
import Suggestions from "./pages/Suggestions";
import Settings from "./pages/Settings";
import Maps from "./pages/Maps";
import Auth from "./pages/Auth";
import Analytics from "./pages/Analytics"; // ✅ Capital A
import { Toaster } from "./components/Toaster";
import RecyclingGame from "./pages/RecyclingGame";
import WasteTracking from "./pages/WasteTracking";
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Routes>
            {/* Auth Page */}
            <Route path="/auth" element={<Auth />} />

            {/* Layout Pages */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="devices" element={<DeviceConnections />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="suggestions" element={<Suggestions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="maps" element={<Maps />} />
              <Route path="analytics" element={<Analytics />} /> 
              <Route path="/RecyclingGame" element={<RecyclingGame />} />
              <Route path="/waste-tracking" element={<WasteTracking />} />
            </Route>
          </Routes>

          {/* Toaster for Notifications */}
          <Toaster />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
