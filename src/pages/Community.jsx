import React from 'react';
import { Trophy, TrendingUp, Users, Package, DollarSign } from 'lucide-react';

export default function Community() {
  // University rankings data
  const universityRankings = [
    {
      rank: 1,
      name: "Delhi University",
      contributions: 2450,
      points: 24500,
      growth: 15,
      color: "bg-yellow-500"
    },
    {
      rank: 2,
      name: "SRM University AP",
      contributions: 2300,
      points: 23000,
      growth: 28,
      color: "bg-red-500"
    },
    {
      rank: 3,
      name: "VIT-AP University",
      contributions: 2200,
      points: 22000,
      growth: 25,
      color: "bg-blue-600"
    },
    {
      rank: 4,
      name: "IIT Bombay",
      contributions: 2130,
      points: 21300,
      growth: 12,
      color: "bg-gray-400"
    },
    {
      rank: 5,
      name: "Jamia Millia Islamia",
      contributions: 1980,
      points: 19800,
      growth: 8,
      color: "bg-orange-500"
    },
    {
      rank: 6,
      name: "BHU Varanasi",
      contributions: 1750,
      points: 17500,
      growth: 22,
      color: "bg-emerald-400"
    },
    {
      rank: 7,
      name: "JNU New Delhi",
      contributions: 1650,
      points: 16500,
      growth: 5,
      color: "bg-green-600"
    }
  ];

  // Summary statistics
  const summaryStats = [
    {
      icon: Users,
      value: "50+",
      label: "Universities",
      color: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: Package,
      value: "15,000kg",
      label: "Recycled",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: DollarSign,
      value: "₹2.5L",
      label: "Earned",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900">University Rankings</h1>
      </div>

      {/* University Rankings */}
      <div className="grid gap-4 mb-8">
        {universityRankings.map((university, index) => (
          <div
            key={university.rank}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Rank Circle */}
                <div className={`w-12 h-12 ${university.color} rounded-full flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-lg">#{university.rank}</span>
                </div>
                
                {/* University Info */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {university.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {university.contributions.toLocaleString()} contributions this month
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-lg font-bold text-emerald-600">
                      {university.points.toLocaleString()} points
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
                      +{university.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        {summaryStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center justify-center mb-4">
              <div className={`p-3 rounded-full bg-white shadow-md`}>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
            <p className="text-gray-700 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Additional Community Features */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join the Green Revolution! 🌱
            </h2>
            <p className="text-gray-600">
              Be part of the largest university recycling community in India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏆</span>
                  </div>
                  <span className="text-gray-700">Compete for university rankings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <span className="text-gray-700">Earn rewards for your contributions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌍</span>
                  </div>
                  <span className="text-gray-700">Make a real environmental impact</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👥</span>
                  </div>
                  <span className="text-gray-700">Connect with like-minded students</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Highlights</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total Universities</span>
                    <span className="font-bold text-emerald-600">50+</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Active Students</span>
                    <span className="font-bold text-blue-600">25,000+</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">CO2 Saved</span>
                    <span className="font-bold text-green-600">2.5 tons</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Trees Planted</span>
                    <span className="font-bold text-emerald-600">150+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}