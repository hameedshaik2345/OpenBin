import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Package, CheckCircle, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function SchedulePickup() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [detectedLocation, setDetectedLocation] = useState('');
  const [weightEstimate, setWeightEstimate] = useState('');
  const [isLocationDetected, setIsLocationDetected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available time slots
  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM', available: true },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 3:00 PM', available: true },
    { id: 'evening', label: 'Evening', time: '3:00 PM - 6:00 PM', available: true },
    { id: 'late-evening', label: 'Late Evening', time: '6:00 PM - 8:00 PM', available: false },
  ];

  // Weight estimation options
  const weightOptions = [
    { id: '1-2kg', label: '1-2 kg', description: 'Small bag, few bottles', icon: '👜' },
    { id: '2-4kg', label: '2-4 kg', description: 'Medium bag, multiple items', icon: '🎒' },
    { id: '4-6kg', label: '4-6 kg', description: 'Large bag, many recyclables', icon: '🛍️' },
    { id: '6-10kg', label: '6-10 kg', description: 'Multiple bags', icon: '📦' },
    { id: '10+kg', label: '10+ kg', description: 'Bulk collection', icon: '🚛' },
  ];

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const detectLocation = () => {
    if (navigator.geolocation) {
      setIsLocationDetected(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setDetectedLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          // In a real app, you would reverse geocode this to get address
          setAddress(`Auto-detected location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
        },
        (error) => {
          console.error('Error detecting location:', error);
          alert('Unable to detect location. Please enter address manually.');
          setIsLocationDetected(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedTimeSlot('');
    setAddress('');
    setDetectedLocation('');
    setWeightEstimate('');
    setIsLocationDetected(false);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pickup Scheduled! 🎉</h1>
          <div className="bg-emerald-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-emerald-800 mb-2">Your Pickup Details:</h3>
            <div className="text-left space-y-2 text-emerald-700">
              <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {timeSlots.find(slot => slot.id === selectedTimeSlot)?.time}</p>
              <p><strong>Address:</strong> {address}</p>
              <p><strong>Weight Estimate:</strong> {weightOptions.find(opt => opt.id === weightEstimate)?.label}</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Our eco-friendly collection team will arrive at your scheduled time. 
            Please keep your recyclables ready!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetForm} variant="outline">
              Schedule Another Pickup
            </Button>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Truck className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Schedule Pickup</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Schedule your eco-friendly waste pickup in just a few steps
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Date */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-semibold text-gray-900">1. Select Pickup Date</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={minDate}
                  max={maxDateString}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available from tomorrow to {maxDate.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl mb-2">📅</div>
                  <p className="text-sm text-emerald-700 font-medium">Flexible Scheduling</p>
                  <p className="text-xs text-emerald-600">Choose any day that works for you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Select Time Slot */}
          {selectedDate && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-900">2. Choose Time Slot</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.id}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedTimeSlot === slot.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : slot.available
                        ? 'border-gray-200 hover:border-emerald-300'
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={selectedTimeSlot === slot.id}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      disabled={!slot.available}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{slot.label}</p>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                      </div>
                      {!slot.available && (
                        <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">
                          Full
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Address & Location */}
          {selectedTimeSlot && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-900">3. Pickup Location</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={detectLocation}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={isLocationDetected}
                  >
                    <Navigation className="w-4 h-4" />
                    {isLocationDetected ? 'Location Detected' : 'Detect My Location'}
                  </Button>
                  {isLocationDetected && (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Location detected successfully!</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address including landmark..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors h-20 resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Please provide a detailed address for easy pickup
                  </p>
                </div>

                {detectedLocation && (
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <p className="text-sm text-emerald-700">
                      <strong>Detected Coordinates:</strong> {detectedLocation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Weight Estimation */}
          {address && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-900">4. Weight Estimation</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weightOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      weightEstimate === option.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="weight"
                      value={option.id}
                      checked={weightEstimate === option.id}
                      onChange={(e) => setWeightEstimate(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {weightEstimate && (
            <div className="animate-fade-in-up pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900">Ready to Schedule?</h4>
                  <p className="text-sm text-gray-600">
                    Review your details and confirm your pickup
                  </p>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 mr-2" />
                      Confirm Pickup
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}