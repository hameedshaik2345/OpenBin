import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Trophy, 
  Star, 
  TrendingUp, 
  Recycle, 
  Gift, 
  DollarSign,
  Award,
  Target,
  Activity,
  Settings,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [user, setUser] = useState({
    id: 'user-123',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    university: 'SRM University AP',
    studentId: 'SRM2024001',
    course: 'Computer Science Engineering',
    year: '3rd Year',
    dateJoined: '2024-01-15',
    profileImage: null,
    totalPoints: 2450,
    totalEarnings: 340,
    recyclingStreak: 3,
    ecoLevel: 'Eco Champion',
    totalPickups: 15,
    totalWeight: 45.2,
    favoriteActivity: 'Plastic Recycling',
    achievements: [
      { id: 1, title: 'First Recycler', description: 'Completed first recycling', date: '2024-01-20', icon: Recycle },
      { id: 2, title: 'Streak Master', description: '3 months recycling streak', date: '2024-04-15', icon: TrendingUp },
      { id: 3, title: 'Eco Champion', description: 'Reached highest eco level', date: '2024-09-10', icon: Trophy },
      { id: 4, title: 'Point Collector', description: 'Earned 1000+ points', date: '2024-07-22', icon: Star }
    ],
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
      locationSharing: true
    }
  });

  const [tempUser, setTempUser] = useState({ ...user });

  const handleEdit = (field) => {
    setEditField(field);
    setTempUser({ ...user });
  };

  const handleSave = () => {
    setUser({ ...tempUser });
    setEditField(null);
    alert('Profile updated successfully! ✅');
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setEditField(null);
  };

  const handleInputChange = (field, value) => {
    setTempUser({
      ...tempUser,
      [field]: value
    });
  };

  const handlePreferenceChange = (preference, value) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [preference]: value
      }
    });
  };

  const stats = [
    { label: 'Total Points', value: user.totalPoints, icon: Star, color: 'text-yellow-500' },
    { label: 'Money Earned', value: `₹${user.totalEarnings}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Recycling Streak', value: `${user.recyclingStreak} months`, icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Total Pickups', value: user.totalPickups, icon: Recycle, color: 'text-emerald-500' }
  ];

  const profileFields = [
    { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
    { key: 'university', label: 'University', icon: MapPin, type: 'text' },
    { key: 'studentId', label: 'Student ID', icon: User, type: 'text' },
    { key: 'course', label: 'Course', icon: Award, type: 'text' },
    { key: 'year', label: 'Year', icon: Calendar, type: 'text' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Profile 👤
        </h1>
        <p className="text-gray-600">
          Manage your account settings and view your recycling achievements
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.fullName}</h2>
              <p className="text-gray-600 mb-2">{user.university}</p>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-emerald-700">{user.ecoLevel}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-gray-600">{stat.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {user.achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <achievement.icon className="w-5 h-5 text-emerald-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.key} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <field.icon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-700">{field.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {editField === field.key ? (
                      <div className="flex items-center gap-2">
                        <input
                          type={field.type}
                          value={tempUser[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleSave}
                          className="text-emerald-600 hover:text-emerald-700 p-1"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-500 hover:text-gray-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{user[field.key]}</span>
                        <button
                          onClick={() => handleEdit(field.key)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recycling Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recycling Statistics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total Weight Recycled</span>
                    <Recycle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">{user.totalWeight} kg</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Favorite Activity</span>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-blue-600">{user.favoriteActivity}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Member Since</span>
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-lg font-bold text-yellow-600">{user.dateJoined}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Current Level</span>
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-purple-600">{user.ecoLevel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Push Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Email Updates</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.emailUpdates}
                    onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">SMS Updates</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.smsUpdates}
                    onChange={(e) => handlePreferenceChange('smsUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Location Sharing</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.locationSharing}
                    onChange={(e) => handlePreferenceChange('locationSharing', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Account Settings</span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Privacy & Security</span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Activity className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Activity History</span>
              </button>
              <button className="flex items-center gap-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}