import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Recycle, Gift, DollarSign, Trophy, TrendingUp, Trash2, QrCode } from "lucide-react";
// Removed framer-motion dependency

import StatsCard from "../components/dashboard/StatsCard";
import RecentPickups from "../components/dashboard/RecentPickups";
import ImpactVisualization from "../components/dashboard/ImpactVisualization";
import QRScanner from "../components/QRScanner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock user data for demonstration - replace with actual API calls
      const mockUser = {
        id: 'user-123',
        full_name: 'John Doe',
        total_points: 1250,
        total_earnings: 340,
        recycling_streak: 3,
        eco_level: 'Eco Champion'
      };
      setUser(mockUser);

      // Mock pickups data
      const mockPickups = [
        { id: 1, status: 'completed', pickup_date: new Date().toISOString() },
        { id: 2, status: 'completed', pickup_date: new Date().toISOString() },
        { id: 3, status: 'completed', pickup_date: new Date().toISOString() }
      ];
      setPickups(mockPickups);

      // Mock contributions data
      const mockContributions = [
        { id: 1, weight: 2.5 },
        { id: 2, weight: 1.8 },
        { id: 3, weight: 3.2 }
      ];
      setContributions(mockContributions);

      // Uncomment below for actual API calls:
      // const currentUser = await User.me();
      // setUser(currentUser);
      // const userPickups = await Pickup.filter({ user_id: currentUser.id }, '-pickup_date', 5);
      // setPickups(userPickups);
      // const userContributions = await Contribution.filter({ user_id: currentUser.id });
      // setContributions(userContributions);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleQRScanSuccess = (qrData) => {
    console.log('QR Code scanned successfully:', qrData);
    // Here you would typically process the scanned QR code
    // For now, we'll show a success message and navigate to a completion page
    alert(`Successfully connected to vending machine ${qrData.machineId} at ${qrData.location}! 🎉`);
    // You could navigate to a waste disposal interface or show options
  };

  const completedPickups = pickups.filter(p => p.status === 'completed').length;
  const totalWeight = contributions.reduce((sum, c) => sum + (c.weight || 0), 0);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Eco-Warrior'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Ready to make the planet happier today?</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-emerald-700">{user?.eco_level || 'Beginner'}</span>
        </div>
      </div>


      {/* Quick Actions Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Recycle? ♻️</h2>
            <p className="text-emerald-100">Find a vending machine and dispose of your waste instantly!</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsQRScannerOpen(true)}
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <QrCode className="w-5 h-5" />
              Throw Waste into Bin
            </button>
            <button
              onClick={() => navigate(createPageUrl("FindBins"))}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Find Nearby Bins
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Points"
          value={user?.total_points || 0}
          icon={Gift}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          delay={0}
        />
        <StatsCard
          title="Money Earned"
          value={`₹${user?.total_earnings || 0}`}
          icon={DollarSign}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          delay={0.1}
        />
        <StatsCard
          title="Pickups Completed"
          value={completedPickups}
          icon={Recycle}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          delay={0.2}
        />
        <StatsCard
          title="Recycling Streak"
          value={user?.recycling_streak || 0}
          unit="months"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-amber-500 to-amber-600"
          delay={0.3}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentPickups pickups={pickups} isLoading={false} />
        <div id="impact-section">
          <ImpactVisualization totalContributions={contributions} />
        </div>
      </div>

      {user?.recycling_streak === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl border border-emerald-200 animate-fade-in">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Eco Journey!</h3>
          <p className="text-gray-600 mb-6">Schedule your first pickup and join thousands making a difference</p>
          <button
            onClick={() => navigate(createPageUrl("SchedulePickup"))}
            className="px-8 py-3 eco-gradient text-white font-medium rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Schedule First Pickup 🚛
          </button>
        </div>
      )}

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />
    </div>
  );
}