import React, { useState } from 'react';
import { 
  Gift, 
  Star, 
  Trophy, 
  Tag, 
  ShoppingBag, 
  Coffee, 
  Pizza, 
  Smartphone, 
  Headphones, 
  Camera,
  Download,
  Copy,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

export default function Rewards() {
  const [copiedVoucher, setCopiedVoucher] = useState(null);
  const [userPoints] = useState(2450);

  const availableVouchers = [
    {
      id: 1,
      title: "Starbucks Coffee",
      description: "Get 20% off on your next coffee",
      pointsRequired: 500,
      discount: "20%",
      code: "STARBUCKS20",
      expiry: "2024-12-31",
      icon: Coffee,
      color: "bg-green-500",
      category: "Food & Beverage"
    },
    {
      id: 2,
      title: "Domino's Pizza",
      description: "Free medium pizza with any order",
      pointsRequired: 800,
      discount: "₹200",
      code: "DOMINOS200",
      expiry: "2024-11-30",
      icon: Pizza,
      color: "bg-red-500",
      category: "Food & Beverage"
    },
    {
      id: 3,
      title: "Amazon Shopping",
      description: "₹500 off on orders above ₹2000",
      pointsRequired: 1000,
      discount: "₹500",
      code: "AMAZON500",
      expiry: "2024-12-15",
      icon: ShoppingBag,
      color: "bg-orange-500",
      category: "Shopping"
    },
    {
      id: 4,
      title: "Flipkart Electronics",
      description: "15% off on mobile phones",
      pointsRequired: 1200,
      discount: "15%",
      code: "FLIPKART15",
      expiry: "2024-11-20",
      icon: Smartphone,
      color: "bg-blue-500",
      category: "Electronics"
    },
    {
      id: 5,
      title: "Zomato Gold",
      description: "1 month free Zomato Gold membership",
      pointsRequired: 600,
      discount: "Free",
      code: "ZOMATO1M",
      expiry: "2024-12-25",
      icon: Gift,
      color: "bg-purple-500",
      category: "Food & Beverage"
    },
    {
      id: 6,
      title: "Spotify Premium",
      description: "3 months free Spotify Premium",
      pointsRequired: 900,
      discount: "3 Months",
      code: "SPOTIFY3M",
      expiry: "2024-11-10",
      icon: Headphones,
      color: "bg-green-600",
      category: "Entertainment"
    },
    {
      id: 7,
      title: "Camera Store",
      description: "₹1000 off on camera accessories",
      pointsRequired: 1500,
      discount: "₹1000",
      code: "CAMERA1K",
      expiry: "2024-12-20",
      icon: Camera,
      color: "bg-gray-600",
      category: "Electronics"
    },
    {
      id: 8,
      title: "Swiggy Super",
      description: "₹300 off on your next food order",
      pointsRequired: 400,
      discount: "₹300",
      code: "SWIGGY300",
      expiry: "2024-11-25",
      icon: Pizza,
      color: "bg-orange-600",
      category: "Food & Beverage"
    }
  ];

  const userVouchers = [
    {
      id: 101,
      title: "McDonald's",
      description: "Free McFlurry with any burger",
      code: "MCFLURRY1",
      expiry: "2024-11-15",
      status: "active",
      earnedDate: "2024-10-20"
    },
    {
      id: 102,
      title: "BookMyShow",
      description: "Buy 1 Get 1 Free movie tickets",
      code: "BMSBOGO",
      expiry: "2024-12-05",
      status: "active",
      earnedDate: "2024-10-18"
    },
    {
      id: 103,
      title: "Uber",
      description: "₹150 off on your next ride",
      code: "UBER150",
      expiry: "2024-11-30",
      status: "used",
      earnedDate: "2024-10-15"
    }
  ];

  const handleCopyCode = (code, voucherId) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(voucherId);
    setTimeout(() => setCopiedVoucher(null), 2000);
  };

  const canAfford = (pointsRequired) => userPoints >= pointsRequired;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food & Beverage': return Pizza;
      case 'Shopping': return ShoppingBag;
      case 'Electronics': return Smartphone;
      case 'Entertainment': return Headphones;
      default: return Gift;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food & Beverage': return 'bg-red-100 text-red-700';
      case 'Shopping': return 'bg-blue-100 text-blue-700';
      case 'Electronics': return 'bg-gray-100 text-gray-700';
      case 'Entertainment': return 'bg-purple-100 text-purple-700';
      default: return 'bg-emerald-100 text-emerald-700';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Rewards & Vouchers 🎁
        </h1>
        <p className="text-gray-600">
          Redeem your recycling points for amazing vouchers and discounts
        </p>
      </div>

      {/* Points Balance */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Points Balance</h2>
            <p className="text-emerald-100">Keep recycling to earn more points!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{userPoints.toLocaleString()}</div>
            <div className="text-emerald-200">Points Available</div>
          </div>
        </div>
      </div>

      {/* User's Vouchers */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Vouchers</h2>
        {userVouchers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userVouchers.map((voucher) => (
              <div key={voucher.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{voucher.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    voucher.status === 'active' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {voucher.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{voucher.description}</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-700">{voucher.code}</span>
                    <button
                      onClick={() => handleCopyCode(voucher.code, voucher.id)}
                      className="text-emerald-600 hover:text-emerald-700 p-1"
                    >
                      {copiedVoucher === voucher.id ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Expires: {voucher.expiry}</span>
                  <span>Earned: {voucher.earnedDate}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vouchers yet</h3>
            <p className="text-gray-600">Start recycling to earn your first voucher!</p>
          </div>
        )}
      </div>

      {/* Available Vouchers */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Vouchers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableVouchers.map((voucher) => {
            const CategoryIcon = getCategoryIcon(voucher.category);
            const affordable = canAfford(voucher.pointsRequired);
            
            return (
              <div 
                key={voucher.id} 
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
                  affordable 
                    ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-xl' 
                    : 'border-gray-200 opacity-75'
                }`}
              >
                {/* Voucher Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${voucher.color} text-white`}>
                    <voucher.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{voucher.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(voucher.category)}`}>
                      {voucher.category}
                    </span>
                  </div>
                </div>

                {/* Voucher Details */}
                <p className="text-gray-600 text-sm mb-4">{voucher.description}</p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{voucher.discount}</div>
                    <div className="text-sm text-gray-600">Discount</div>
                  </div>
                </div>

                {/* Points Required */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Points Required</span>
                  </div>
                  <span className="font-bold text-gray-900">{voucher.pointsRequired}</span>
                </div>

                {/* Action Button */}
                <button
                  disabled={!affordable}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    affordable
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {affordable ? (
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Redeem Now
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      Need {voucher.pointsRequired - userPoints} more points
                    </div>
                  )}
                </button>

                {/* Expiry */}
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500">Expires: {voucher.expiry}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Earn Points */}
      <div className="mt-12 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Earn More Points? 🌟</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recycle More</h3>
            <p className="text-gray-600 text-sm">Drop bottles in vending machines to earn 10-50 points per item</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Streak</h3>
            <p className="text-gray-600 text-sm">Maintain daily recycling streak for bonus points</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Refer Friends</h3>
            <p className="text-gray-600 text-sm">Invite friends to join OpenBin and earn 100 bonus points</p>
          </div>
        </div>
      </div>
    </div>
  );
}