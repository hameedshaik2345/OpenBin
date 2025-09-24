import React from 'react';
import { Card } from "../ui/card";

export default function StatsCard({ title, value, unit, icon: Icon, gradient, delay = 0 }) {
  return (
    <div className="animate-fade-in-up">
      <Card className="p-6 glass-effect hover:shadow-lg transition-all duration-300 border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">{value}</span>
              {unit && <span className="text-sm text-gray-500 font-medium">{unit}</span>}
            </div>
          </div>
          <div className={`p-4 rounded-2xl ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>
    </div>
  );
}