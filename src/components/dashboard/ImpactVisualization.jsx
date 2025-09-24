import React from 'react';

export default function ImpactVisualization({ totalContributions }) {
  const totalWeight = totalContributions.reduce((sum, c) => sum + (c.weight || 0), 0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Impact</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            {totalWeight.toFixed(1)} kg
          </div>
          <p className="text-gray-600">Total Recycled</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="text-xl font-bold text-emerald-600">
              {Math.round(totalWeight * 2.5)}
            </div>
            <p className="text-xs text-gray-600">CO2 Saved (kg)</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              {Math.round(totalWeight * 1.2)}
            </div>
            <p className="text-xs text-gray-600">Trees Saved</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((totalWeight / 10) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {Math.min((totalWeight / 10) * 100, 100).toFixed(0)}% to next milestone
          </p>
        </div>
      </div>
    </div>
  );
}