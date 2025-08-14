import React, { useState } from 'react';
import { Brain, Play, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react';

export default function Suggestions() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const aiSuggestions = [
    {
      title: "Optimize Watering Schedule",
      description: "Based on soil moisture data, reduce watering by 15% during morning hours",
      confidence: 92,
      impact: "High",
      category: "Water Management"
    },
    {
      title: "Pest Alert Prevention",
      description: "Temperature and humidity levels indicate potential aphid activity",
      confidence: 87,
      impact: "Medium",
      category: "Pest Control"
    },
    {
      title: "Nutrient Adjustment",
      description: "Current soil conditions suggest increasing nitrogen levels by 8%",
      confidence: 94,
      impact: "High",
      category: "Soil Health"
    }
  ];

  const videos = [
    {
      id: '1',
      title: 'Sustainable Farming Practices',
      duration: '12:45',
      thumbnail: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sustainability'
    },
    {
      id: '2',
      title: 'Biogas Production from Farm Waste',
      duration: '18:32',
      thumbnail: 'https://images.pexels.com/photos/2064825/pexels-photo-2064825.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biogas'
    },
    {
      id: '3',
      title: 'Composting Techniques for Better Manure',
      duration: '15:21',
      thumbnail: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Manure'
    },
    {
      id: '4',
      title: 'Climate-Smart Agriculture Methods',
      duration: '22:10',
      thumbnail: 'https://images.pexels.com/photos/1459347/pexels-photo-1459347.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Environment'
    }
  ];

  const tips = [
    "Monitor soil pH levels weekly for optimal nutrient absorption",
    "Use companion planting to naturally reduce pest populations",
    "Implement drip irrigation to reduce water waste by up to 40%",
    "Rotate crops seasonally to maintain soil health and prevent disease",
    "Install weather stations for precise local climate monitoring",
    "Consider organic fertilizers to improve long-term soil structure"
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Suggestions</h1>
          <p className="text-gray-600 dark:text-gray-400">Smart recommendations and educational resources</p>
        </div>
      </div>

      {/* Scrolling Tips Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-4 text-white overflow-hidden">
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb size={20} />
          <span className="font-semibold">Latest Tips</span>
        </div>
        <div className="relative overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {tips.join(' • ')} • {tips[0]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Suggestions - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Analysis & Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">Data-driven insights for your farm</p>
              </div>
            </div>

            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-xs font-medium rounded-full">
                          {suggestion.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          suggestion.impact === 'High' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                        }`}>
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp size={16} className="text-green-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {suggestion.confidence}% confidence
                          </span>
                        </div>
                        <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                          <span>Apply Suggestion</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${suggestion.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="space-y-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Educational Videos</h3>
            <div className="space-y-4">
              {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer" onClick={() => setActiveVideo(video.id)}>
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Play className="text-gray-900 ml-1" size={20} />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full mb-1">
                      {video.category}
                    </span>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {videos.find(v => v.id === activeVideo)?.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Video player would be implemented here</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Duration: {videos.find(v => v.id === activeVideo)?.duration}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}