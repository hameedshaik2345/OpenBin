import React from 'react';

export default function MascotMessage({ userStreak, onActionClick }) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-200 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="text-4xl">🐕</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Hello from your Eco-Buddy!</h3>
          <p className="text-gray-600 mb-4">
            Great job on your {userStreak} month recycling streak! Keep up the amazing work! 🌟
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => onActionClick('Throw Waste into Bin')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-1"
            >
              🗑️ Throw Waste into Bin
            </button>
            <button 
              onClick={() => onActionClick('Schedule Pickup')}
              className="px-4 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Schedule Pickup
            </button>
            <button 
              onClick={() => onActionClick('View Rewards')}
              className="px-4 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              View Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}