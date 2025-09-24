import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Calendar, Truck, Sparkles, Heart, DollarSign } from 'lucide-react';
import Logo from '../components/Logo';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-emerald-50/30 via-white to-yellow-50/20 min-h-screen">
      {/* Header */}
      <header className="py-4 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <Link to={createPageUrl("Landing")} className="flex items-center gap-2 group">
          <Logo size="medium" className="group-hover:scale-110 transition-transform duration-300" />
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">OpenBin</h1>
        </Link>
        <Button 
          onClick={() => navigate('/auth')} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base py-2.5 px-5 sm:py-2.5 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Get Started
        </Button>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Side */}
            <div className="text-center md:text-left">
              <Badge variant="outline" className="mb-4 bg-emerald-100/70 text-emerald-700 border-emerald-200 py-1.5 px-4 text-sm shadow-sm">
                Making recycling emotional & rewarding
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Turn Your Waste <br className="hidden md:block" />
                Into <span className="text-emerald-500">Wonder ✨</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Doorstep pickup, transparent rewards, and a lovable mascot who makes recycling fun. Choose to earn money or donate for good — either way, you're making an impact! 🌍
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-base py-3 px-8 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/auth')}
                >
                  <Calendar className="w-5 h-5 mr-2" /> Schedule Pickup
                </Button>
              </div>
            </div>
            
            {/* Right Side - Mascot */}
            <div className="relative text-center">
              <div className="relative flex flex-col items-center">
                <div className="flex items-center mb-3">
                  <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-emerald-600">
                    Open
                    <span className="text-yellow-400">Bin</span>
                  </h2>
                </div>
                
                <p className="text-2xl sm:text-3xl font-semibold text-emerald-700 mb-8">Meet Your Eco-Buddy!</p>

                <div className="relative mb-4">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                    <span className="text-7xl sm:text-8xl animate-bounce" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}>🐕</span>
                  </div>
                  <div className="absolute -bottom-2 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm sm:text-base">
                    Woof! Let's recycle! ✨
                  </div>
                </div>

                <p className="text-gray-600 max-w-sm text-sm sm:text-base">
                  I'll remind you monthly & celebrate every donation! Together, we make a HUGE impact!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            How OpenBin Works
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Three simple steps to turn your waste into wonder, guided by our friendly eco-mascot.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Schedule Pickup</h3>
              <p className="text-gray-600">Open the app, select waste categories, and schedule a convenient pickup time.</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Doorstep Pickup</h3>
              <p className="text-gray-600">Our verified collection partners pick up and weigh your recyclables.</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Get Rewarded</h3>
              <p className="text-gray-600">Choose to earn money or donate for good! Watch your impact grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Feature Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Scan & Earn with QR Codes
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Each logged-in user gets a unique QR code on their dashboard. Scan it at our vending machines to choose between earning money or donating to social causes!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Donate for Good</h3>
              <p className="text-gray-600">Choose to donate your earnings to social causes and make a positive impact on society.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Earn Money</h3>
              <p className="text-gray-600">Get market price for your recyclables directly to your wallet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
                <Logo size="medium" />
                <h1 className="text-2xl font-bold text-white">OpenBin</h1>
              </div>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Making recycling emotional, easy, and impactful — one pickup, one donation, one smile at a time.
            </p>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} OpenBin. Making the world greener, one pickup at a time.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="hover:text-emerald-400">Privacy</Link>
              <Link to="#" className="hover:text-emerald-400">Terms</Link>
              <Link to="#" className="hover:text-emerald-400">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}