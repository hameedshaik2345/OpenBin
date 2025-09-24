import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Search, Navigation, Clock, Star, Trash2, QrCode, Phone, Navigation2 } from 'lucide-react';
import QRScanner from '../components/QRScanner';

export default function FindBins() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [nearbyBins, setNearbyBins] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);

  useEffect(() => {
    loadNearbyBins();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Default to a demo location
          setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  };

  const loadNearbyBins = () => {
    // Mock data for nearby bins
    const mockBins = [
      {
        id: 1,
        name: "Central Campus - Building A",
        type: "vending_machine",
        address: "Building A, Central Campus",
        distance: "0.2 km",
        status: "available",
        rating: 4.8,
        lastMaintenance: "2 days ago",
        binTypes: ["plastic", "paper", "metal", "glass"],
        features: ["QR Scanner", "Weight Display", "Reward Points"],
        operatingHours: "24/7",
        phone: "+91 98765 43210",
        coordinates: { lat: 28.6140, lng: 77.2091 }
      },
      {
        id: 2,
        name: "Library Block - Smart Bin",
        type: "smart_bin",
        address: "Library Block, Ground Floor",
        distance: "0.5 km",
        status: "available",
        rating: 4.6,
        lastMaintenance: "1 week ago",
        binTypes: ["paper", "cardboard"],
        features: ["Capacity Sensor", "Auto-compaction"],
        operatingHours: "6 AM - 10 PM",
        phone: "+91 98765 43211",
        coordinates: { lat: 28.6145, lng: 77.2095 }
      },
      {
        id: 3,
        name: "Sports Complex - Recycling Hub",
        type: "collection_point",
        address: "Sports Complex, Near Parking",
        distance: "0.8 km",
        status: "available",
        rating: 4.9,
        lastMaintenance: "3 days ago",
        binTypes: ["plastic", "paper", "metal", "glass", "organic"],
        features: ["QR Scanner", "Weight Display", "Multiple Compartments"],
        operatingHours: "5 AM - 11 PM",
        phone: "+91 98765 43212",
        coordinates: { lat: 28.6150, lng: 77.2100 }
      },
      {
        id: 4,
        name: "Cafeteria Area - Eco Station",
        type: "vending_machine",
        address: "Main Cafeteria, Food Court",
        distance: "1.1 km",
        status: "maintenance",
        rating: 4.7,
        lastMaintenance: "In progress",
        binTypes: ["plastic", "paper"],
        features: ["QR Scanner", "Reward Points"],
        operatingHours: "7 AM - 9 PM",
        phone: "+91 98765 43213",
        coordinates: { lat: 28.6155, lng: 77.2105 }
      }
    ];
    
    setTimeout(() => {
      setNearbyBins(mockBins);
      setIsLoading(false);
    }, 1000);
  };

  const filteredBins = nearbyBins.filter(bin => {
    const matchesSearch = bin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bin.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || bin.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'full': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'maintenance': return 'Under Maintenance';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  const getBinTypeIcon = (type) => {
    switch (type) {
      case 'vending_machine': return '🏪';
      case 'smart_bin': return '🤖';
      case 'collection_point': return '♻️';
      default: return '🗑️';
    }
  };

  const handleQRScanSuccess = (qrData) => {
    console.log('QR Code scanned successfully:', qrData);
    // Show success message with bin information
    const binInfo = selectedBin ? ` at ${selectedBin.name}` : '';
    alert(`Successfully connected to vending machine ${qrData.machineId}${binInfo}! 🎉`);
  };

  const handleScanQRClick = (bin) => {
    setSelectedBin(bin);
    setIsQRScannerOpen(true);
  };

  const handleGetDirections = (bin) => {
    const directions = [
      "Head north on Main Street for 200 meters, then turn right at the library building.",
      "Walk straight for 150 meters past the cafeteria, then turn left at the sports complex.",
      "Go east for 300 meters along the campus road, the bin will be on your right.",
      "Take the campus shuttle to Building A stop, then walk 100 meters north.",
      "Head towards the parking lot, then turn right at the first intersection.",
      "Walk past the student center for 250 meters, the bin is near the entrance.",
      "Follow the green pathway markers for 180 meters to reach the recycling station.",
      "Take the elevator to ground floor, then exit and walk 120 meters east."
    ];
    
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const estimatedTime = Math.floor(Math.random() * 8) + 2; // 2-9 minutes
    
    alert(`🗺️ Directions to ${bin.name}:\n\n${randomDirection}\n\n⏱️ Estimated walking time: ${estimatedTime} minutes\n\n📍 Distance: ${bin.distance}`);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Find Recycling Bins 🗺️
        </h1>
        <p className="text-gray-600">
          Discover nearby recycling bins and vending machines to dispose of your waste
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location or bin name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white min-w-[180px]"
            >
              <option value="all">All Types</option>
              <option value="vending_machine">Vending Machines</option>
              <option value="smart_bin">Smart Bins</option>
              <option value="collection_point">Collection Points</option>
            </select>
          </div>

          {/* Get Directions Button */}
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Navigation className="w-5 h-5" />
            Get Directions
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bins List */}
      {!isLoading && (
        <div className="space-y-6">
          {filteredBins.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bins found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredBins.map((bin) => (
              <div key={bin.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Bin Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl">{getBinTypeIcon(bin.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{bin.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bin.status)}`}>
                              {getStatusText(bin.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{bin.address}</span>
                            <span className="text-emerald-600 font-medium ml-2">• {bin.distance}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{bin.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{bin.operatingHours}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bin Types */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Accepts:</p>
                        <div className="flex flex-wrap gap-2">
                          {bin.binTypes.map((type) => (
                            <span key={type} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {bin.features.map((feature) => (
                            <span key={feature} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      <button 
                        onClick={() => handleScanQRClick(bin)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <QrCode className="w-5 h-5" />
                        Scan QR Code
                      </button>
                      <button 
                        onClick={() => handleGetDirections(bin)}
                        className="border border-emerald-500 text-emerald-500 hover:bg-emerald-50 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Navigation2 className="w-5 h-5" />
                        Get Directions
                      </button>
                      <button className="border border-gray-300 text-gray-600 hover:bg-gray-50 py-2 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                        <Phone className="w-4 h-4" />
                        Call {bin.phone}
                      </button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Last maintenance: {bin.lastMaintenance}</span>
                      <span>ID: {bin.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Map View Toggle */}
      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
          View on Map 🗺️
        </button>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />
    </div>
  );
}