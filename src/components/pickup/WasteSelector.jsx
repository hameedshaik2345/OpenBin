import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

const wasteCategories = [
  {
    id: 'plastic',
    name: 'Plastic',
    emoji: '♻️',
    description: 'Bottles, containers, bags',
    baseValue: 15, // per kg
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'paper',
    name: 'Paper',
    emoji: '📄',
    description: 'Newspapers, magazines, cardboard',
    baseValue: 8,
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    emoji: '📱',
    description: 'Phones, laptops, chargers',
    baseValue: 50,
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'metal',
    name: 'Metal',
    emoji: '🔧',
    description: 'Cans, utensils, wires',
    baseValue: 25,
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'glass',
    name: 'Glass',
    emoji: '🍾',
    description: 'Bottles, jars, containers',
    baseValue: 5,
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    id: 'textiles',
    name: 'Textiles',
    emoji: '👕',
    description: 'Clothes, bags, shoes',
    baseValue: 12,
    color: 'from-pink-400 to-pink-600'
  }
];

export default function WasteSelector({ selectedWaste, onWasteChange }) {
  const updateWeight = (categoryId, delta) => {
    const updated = selectedWaste.map(item => {
      if (item.category === categoryId) {
        const newWeight = Math.max(0, (item.estimated_weight || 0) + delta);
        const category = wasteCategories.find(c => c.id === categoryId);
        return {
          ...item,
          estimated_weight: newWeight,
          estimated_value: newWeight * category.baseValue
        };
      }
      return item;
    });
    
    onWasteChange(updated);
  };

  const toggleCategory = (category) => {
    const exists = selectedWaste.find(w => w.category === category.id);
    if (exists) {
      onWasteChange(selectedWaste.filter(w => w.category !== category.id));
    } else {
      onWasteChange([
        ...selectedWaste,
        {
          category: category.id,
          estimated_weight: 1,
          estimated_value: category.baseValue
        }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What are you recycling today?</h3>
        <p className="text-gray-600 text-sm">Select categories and estimate weights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wasteCategories.map((category, index) => {
          const selected = selectedWaste.find(w => w.category === category.id);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                  selected 
                    ? 'border-emerald-300 bg-emerald-50 shadow-md' 
                    : 'border-gray-200 hover:border-emerald-200 hover:shadow-sm'
                }`}
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                      {category.emoji}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                    ₹{category.baseValue}/kg
                  </Badge>
                </div>

                {selected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-3 border-t border-emerald-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Weight (kg):</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateWeight(category.id, -0.5);
                          }}
                          className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-emerald-600" />
                        </button>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={selected.estimated_weight}
                          onChange={(e) => {
                            e.stopPropagation();
                            const weight = parseFloat(e.target.value) || 0;
                            const updated = selectedWaste.map(item => 
                              item.category === category.id 
                                ? { ...item, estimated_weight: weight, estimated_value: weight * category.baseValue }
                                : item
                            );
                            onWasteChange(updated);
                          }}
                          className="w-20 text-center border-emerald-200 focus:border-emerald-300"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateWeight(category.id, 0.5);
                          }}
                          className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-sm text-emerald-600 font-medium">
                        Est. Value: ₹{selected.estimated_value?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selectedWaste.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-emerald-800">Total Estimated Value:</span>
            <span className="text-xl font-bold text-emerald-600">
              ₹{selectedWaste.reduce((sum, item) => sum + (item.estimated_value || 0), 0).toFixed(2)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}