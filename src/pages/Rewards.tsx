import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, Calendar, Car as IdCard, Plus, Gift } from 'lucide-react';

interface UserRegistration {
  id: string;
  name: string;
  aadhaar: string;
  place: string;
  mobile: string;
  dob: string;
  registeredAt: string;
  points: number;
}

export default function Rewards() {
  const { addNotification } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<UserRegistration[]>([
    {
      id: '1',
      name: 'Raj Kumar Singh',
      aadhaar: '****-****-1234',
      place: 'Punjab, India',
      mobile: '+91 98765-43210',
      dob: '1985-03-15',
      registeredAt: '2024-01-15',
      points: 2450
    },
    {
      id: '2',
      name: 'Priya Sharma',
      aadhaar: '****-****-5678',
      place: 'Haryana, India',
      mobile: '+91 87654-32109',
      dob: '1990-07-22',
      registeredAt: '2024-02-10',
      points: 1890
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    place: '',
    mobile: '',
    dob: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.aadhaar && formData.place && formData.mobile && formData.dob) {
      const newUser: UserRegistration = {
        id: Date.now().toString(),
        ...formData,
        aadhaar: `****-****-${formData.aadhaar.slice(-4)}`,
        registeredAt: new Date().toISOString().split('T')[0],
        points: 100
      };
      setUsers([...users, newUser]);
      setFormData({ name: '', aadhaar: '', place: '', mobile: '', dob: '' });
      setShowForm(false);
      addNotification(`User "${newUser.name}" registered successfully`);
    }
  };

  const totalUsers = users.length;
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  const averagePoints = totalUsers > 0 ? Math.round(totalPoints / totalUsers) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quality Operators</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage operator registrations and performance tracking</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200"
        >
          <Plus size={20} />
          <span>Register Operator</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl">
              <User className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Operators</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl">
              <Gift className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Quality Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averagePoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Users Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Registered Operators</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <IdCard size={14} className="mr-1" />
                          {user.aadhaar}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900 dark:text-white flex items-center">
                        <Phone size={14} className="mr-1" />
                        {user.mobile}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">DOB: {user.dob}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {user.place}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">{user.registeredAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Gift className="text-orange-500" size={16} />
                      <span className="font-semibold text-gray-900 dark:text-white">{user.points}/100</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Register New Operator</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter Aadhaar number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Place</label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({...formData, place: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}