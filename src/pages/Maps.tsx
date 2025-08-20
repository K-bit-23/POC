import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { Map, Layers, Thermometer, Eye, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

type MapType = "normal" | "demand" | "heat";

export default function Maps() {
  const [activeMap, setActiveMap] = useState<MapType>("normal");

  const mapTypes = [
    {
      id: "normal" as MapType,
      name: "Normal Map",
      icon: Map,
      description: "Standard view with storage facility locations",
    },
    {
      id: "demand" as MapType,
      name: "Quality Map",
      icon: Layers,
      description: "Quality distribution across facilities",
    },
    {
      id: "heat" as MapType,
      name: "Temperature Map",
      icon: Thermometer,
      description: "Storage temperature monitoring",
    },
  ];

  // Real lat/lng data (replace with actual storage facilities)
  const sampleDataPoints = [
    { id: 1, lat: 28.6139, lng: 77.209, temp: 4.5, humidity: 85, crop: "Apples", quality: 95 },
    { id: 2, lat: 19.076, lng: 72.8777, temp: 2.2, humidity: 90, crop: "Lettuce", quality: 87 },
    { id: 3, lat: 13.0827, lng: 80.2707, temp: 8.8, humidity: 75, crop: "Tomatoes", quality: 92 },
    { id: 4, lat: 22.5726, lng: 88.3639, temp: 6.1, humidity: 80, crop: "Bananas", quality: 78 },
    { id: 5, lat: 12.9716, lng: 77.5946, temp: 3.3, humidity: 88, crop: "Carrots", quality: 91 },
  ];

  const renderMapContent = () => {
    return (
      <MapContainer
        center={[20.5937, 78.9629]} // India center
        zoom={5}
        className="h-96 w-full rounded-xl"
      >
        {/* Free OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sampleDataPoints.map((point) => {
          let color = "green";

          if (activeMap === "demand") {
            color = point.quality > 90 ? "green" : point.quality > 80 ? "yellow" : "red";
          } else if (activeMap === "heat") {
            // Map temp (°C) to color
            const hue = 240 - point.temp * 8; // blue to red scale
            color = `hsl(${hue}, 80%, 50%)`;
          }

          return (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={activeMap === "normal" ? 8 : 10}
              color="white"
              weight={2}
              fillColor={color}
              fillOpacity={0.8}
            >
              <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                <div>
                  <strong>{point.crop} Storage</strong>
                  <br />
                  Temp: {point.temp}°C
                  <br />
                  Humidity: {point.humidity}%
                  <br />
                  Quality: {point.quality}%
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quality Maps</h1>

      {/* Map type buttons */}
      <div className="flex gap-3">
        {mapTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveMap(type.id)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeMap === type.id ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              <Icon size={18} className="mr-2" />
              {type.name}
            </button>
          );
        })}
      </div>

      {/* Map container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        {renderMapContent()}
      </div>
    </div>
  );
}
