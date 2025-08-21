import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Analytics: React.FC = () => {
  // Sample Data
  const soilMoistureData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 42 },
    { day: "Thu", value: 50 },
    { day: "Fri", value: 47 },
    { day: "Sat", value: 44 },
    { day: "Sun", value: 48 },
  ];

  const sensorPerformance = [
    { name: "Temperature", value: 75 },
    { name: "Humidity", value: 65 },
    { name: "CO₂", value: 55 },
    { name: "Light", value: 80 },
  ];

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Insights and performance metrics for your agricultural operations
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold">Soil Moisture</h2>
          <p className="text-2xl font-bold mt-2">45%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold">Avg Temperature</h2>
          <p className="text-2xl font-bold mt-2">27°C</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold">CO₂ Level</h2>
          <p className="text-2xl font-bold mt-2">412 ppm</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold">Humidity</h2>
          <p className="text-2xl font-bold mt-2">68%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Soil Moisture Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={soilMoistureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Bar Chart */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Sensor Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sensorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
