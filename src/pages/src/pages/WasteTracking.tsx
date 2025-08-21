// src/pages/WasteTracking.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WasteTracking: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  // Example: Bangalore location
  const lat = 12.9716;
  const lon = 77.5946;

  useEffect(() => {
    // ✅ Replace with your OpenWeatherMap API key
    const API_KEY = "YOUR_OPENWEATHER_API_KEY";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🚛 Waste Collection Tracking</h1>
      <p className="mb-4">
        Track waste trucks & recycling points on the live map. Weather updates
        included 🌦
      </p>

      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Truck moving route (simulated markers) */}
        <Marker position={[12.9716, 77.5946]}>
          <Popup>
            Waste Truck 🚛 <br /> Starting Point
          </Popup>
        </Marker>
        <Marker position={[12.9816, 77.6046]}>
          <Popup>
            Truck Midway Stop ♻️ <br /> Recycling Bin Pickup
          </Popup>
        </Marker>
        <Marker position={[12.9916, 77.6146]}>
          <Popup>
            Final Disposal Point 🏭 <br /> Waste Management Center
          </Popup>
        </Marker>
      </MapContainer>

      {/* Weather Info */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">🌦 Current Weather</h2>
        {weather ? (
          <div>
            <p className="text-lg">
              {weather.name}: {weather.main.temp}°C,{" "}
              {weather.weather[0].description}
            </p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
};

export default WasteTracking;    