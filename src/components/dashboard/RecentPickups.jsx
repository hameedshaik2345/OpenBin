import React from 'react';

export default function RecentPickups({ pickups, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Pickups</h3>
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Pickups</h3>
      <div className="space-y-3">
        {pickups.length > 0 ? (
          pickups.map((pickup, index) => (
            <div key={pickup.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Pickup #{pickup.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(pickup.pickup_date).toLocaleDateString()}
                </p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                {pickup.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No recent pickups</p>
        )}
      </div>
    </div>
  );
}