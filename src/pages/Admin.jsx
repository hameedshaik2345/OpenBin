import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Users, 
  Settings, 
  BarChart3, 
  Activity,
  Edit,
  Save,
  X,
  Trash2,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prices, setPrices] = useState({
    plastic: 15,
    paper: 8,
    eWaste: 25,
    metal: 20,
    glass: 12
  });
  const [dailyOrders, setDailyOrders] = useState(0);
  const [vendingMachineData, setVendingMachineData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrices, setTempPrices] = useState({});

  // Mock data for vending machines
  const vendingMachines = [
    { id: 'VM-001', location: 'Central Campus - Building A', bottles: 1247, status: 'active' },
    { id: 'VM-002', location: 'Library Block', bottles: 892, status: 'active' },
    { id: 'VM-003', location: 'Sports Complex', bottles: 2156, status: 'maintenance' },
    { id: 'VM-004', location: 'Cafeteria Area', bottles: 1834, status: 'active' },
    { id: 'VM-005', location: 'Hostel Block A', bottles: 967, status: 'active' },
    { id: 'VM-006', location: 'Hostel Block B', bottles: 1345, status: 'active' }
  ];

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setDailyOrders(prev => prev + Math.floor(Math.random() * 3));
      setVendingMachineData(prev => {
        const updated = { ...prev };
        vendingMachines.forEach(machine => {
          if (machine.status === 'active') {
            updated[machine.id] = (updated[machine.id] || machine.bottles) + Math.floor(Math.random() * 2);
          }
        });
        return updated;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEditPrices = () => {
    setTempPrices({ ...prices });
    setIsEditing(true);
  };

  const handleSavePrices = () => {
    setPrices({ ...tempPrices });
    setIsEditing(false);
    alert('Prices updated successfully! 💰');
  };

  const handleCancelEdit = () => {
    setTempPrices({});
    setIsEditing(false);
  };

  const handlePriceChange = (material, value) => {
    setTempPrices({
      ...tempPrices,
      [material]: parseFloat(value) || 0
    });
  };

  const getCurrentBottles = (machineId) => {
    return vendingMachineData[machineId] || vendingMachines.find(m => m.id === machineId)?.bottles || 0;
  };

  const totalBottles = vendingMachines.reduce((sum, machine) => sum + getCurrentBottles(machine.id), 0);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'prices', label: 'Price Management', icon: DollarSign },
    { id: 'orders', label: 'Daily Orders', icon: Package },
    { id: 'machines', label: 'Vending Machines', icon: Activity }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Admin Portal 🔧
        </h1>
        <p className="text-gray-600">
          Manage OpenBin operations, pricing, and monitor system performance
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Bottles</p>
                  <p className="text-3xl font-bold">{totalBottles.toLocaleString()}</p>
                  <p className="text-emerald-200 text-xs">Live Count</p>
                </div>
                <Package className="w-12 h-12 text-emerald-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Today's Orders</p>
                  <p className="text-3xl font-bold">{dailyOrders.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs">+12% from yesterday</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Machines</p>
                  <p className="text-3xl font-bold">{vendingMachines.filter(m => m.status === 'active').length}</p>
                  <p className="text-purple-200 text-xs">Out of {vendingMachines.length} total</p>
                </div>
                <Activity className="w-12 h-12 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Daily Revenue</p>
                  <p className="text-3xl font-bold">₹{dailyOrders * 12}</p>
                  <p className="text-orange-200 text-xs">Estimated</p>
                </div>
                <DollarSign className="w-12 h-12 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Live Vending Machine Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Vending Machine Status</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendingMachines.map((machine) => (
                <div key={machine.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{machine.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      machine.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {machine.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{machine.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">
                      {getCurrentBottles(machine.id).toLocaleString()} bottles
                    </span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Price Management Tab */}
      {activeTab === 'prices' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Price Management</h2>
            {!isEditing ? (
              <button
                onClick={handleEditPrices}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Prices
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSavePrices}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(isEditing ? tempPrices : prices).map(([material, price]) => (
              <div key={material} className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                  {material === 'eWaste' ? 'E-Waste' : material}
                </h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => handlePriceChange(material, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter price per kg"
                  />
                ) : (
                  <div className="text-2xl font-bold text-emerald-600">
                    ₹{price}/kg
                  </div>
                )}
                <p className="text-gray-600 text-sm mt-1">Per kilogram</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Orders Tracking</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                  <span className="text-gray-700">Total Orders</span>
                  <span className="text-2xl font-bold text-emerald-600">{dailyOrders}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Estimated Revenue</span>
                  <span className="text-2xl font-bold text-blue-600">₹{dailyOrders * 12}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Avg. Order Value</span>
                  <span className="text-2xl font-bold text-purple-600">₹12</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">Order #{Math.floor(Math.random() * 1000) + 1000} - ₹{Math.floor(Math.random() * 20) + 5}</span>
                    <span className="text-gray-500 text-sm ml-auto">{Math.floor(Math.random() * 60)}m ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vending Machines Tab */}
      {activeTab === 'machines' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Vending Machine Management</h2>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add Machine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Machine ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Bottles Count</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendingMachines.map((machine) => (
                  <tr key={machine.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{machine.id}</td>
                    <td className="py-3 px-4 text-gray-600">{machine.location}</td>
                    <td className="py-3 px-4">
                      <span className="text-lg font-bold text-emerald-600">
                        {getCurrentBottles(machine.id).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        machine.status === 'active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {machine.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-emerald-600 hover:text-emerald-700 p-1">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}