import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, Heart, DollarSign, X } from 'lucide-react';

const DonationPopup = ({ isOpen, onClose, onDonate, onWithdraw, marketPrice, userData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-fade-in-scale">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Choose Your Action</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl border border-emerald-200">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm text-gray-600">Estimated Market Value</p>
              <p className="text-2xl font-bold text-emerald-600">₹{marketPrice}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onDonate}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Donate to Social Cause</div>
                <div className="text-sm opacity-90">Help make the world a better place</div>
              </div>
            </button>

            <button
              onClick={onWithdraw}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <DollarSign className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Withdraw Money</div>
                <div className="text-sm opacity-90">Add ₹{marketPrice} to your wallet</div>
              </div>
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Scan this QR code at any OpenBin vending machine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QRCodeDisplay({ userData }) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [marketPrice, setMarketPrice] = useState(0);

  useEffect(() => {
    generateQRCode();
    // Simulate market price calculation (in real app, this would come from an API)
    setMarketPrice(Math.floor(Math.random() * 50) + 10); // Random price between ₹10-60
  }, [userData]);

  const generateQRCode = async () => {
    try {
      const userQRData = {
        userId: userData?.id || 'demo-user-123',
        timestamp: Date.now(),
        sessionId: Math.random().toString(36).substring(7),
        machineId: 'vending-machine-001'
      };

      // Create a simple QR code placeholder using canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 200;
      canvas.height = 200;
      
      // Draw a simple QR-like pattern
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 200, 200);
      
      ctx.fillStyle = '#10b981';
      const size = 8;
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 3 === 0 || (i * j) % 5 === 0) {
            ctx.fillRect(i * size, j * size, size - 1, size - 1);
          }
        }
      }
      
      // Add corner squares (QR code characteristic)
      ctx.fillStyle = '#10b981';
      ctx.fillRect(0, 0, 56, 56);
      ctx.fillRect(144, 0, 56, 56);
      ctx.fillRect(0, 144, 56, 56);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(8, 8, 40, 40);
      ctx.fillRect(152, 8, 40, 40);
      ctx.fillRect(8, 152, 40, 40);
      
      ctx.fillStyle = '#10b981';
      ctx.fillRect(16, 16, 24, 24);
      ctx.fillRect(160, 16, 24, 24);
      ctx.fillRect(16, 160, 24, 24);
      
      setQrCodeDataURL(canvas.toDataURL());
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Fallback to a simple placeholder
      setQrCodeDataURL('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgZmlsbD0iIzEwYjk4MSIvPgo8cmVjdCB4PSIxNDQiIHk9IjAiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgZmlsbD0iIzEwYjk4MSIvPgo8cmVjdCB4PSIwIiB5PSIxNDQiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgZmlsbD0iIzEwYjk4MSIvPgo8cmVjdCB4PSI4IiB5PSI4IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTUyIiB5PSI4IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iOCIgeT0iMTUyIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiMxMGI5ODEiLz4KPHJlY3QgeD0iMTYwIiB5PSIxNiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjMTBiOTgxIi8+CjxyZWN0IHg9IjE2IiB5PSIxNjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzEwYjk4MSIvPgo8L3N2Zz4K');
    }
  };

  const handleDonate = () => {
    // In a real app, this would make an API call to process the donation
    alert(`Thank you for donating ₹${marketPrice} to our social cause! 🌟`);
    setIsPopupOpen(false);
  };

  const handleWithdraw = () => {
    // In a real app, this would make an API call to add money to user's wallet
    alert(`₹${marketPrice} has been added to your wallet! 💰`);
    setIsPopupOpen(false);
  };

  const handleQRClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">Your Unique QR Code</h3>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div 
              className="relative cursor-pointer group"
              onClick={handleQRClick}
            >
              <img
                src={qrCodeDataURL}
                alt="User QR Code"
                className="w-40 h-40 rounded-xl border-2 border-emerald-200 group-hover:border-emerald-400 transition-colors duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Scan at any OpenBin vending machine
              </p>
              <p className="text-xs text-gray-500">
                Click QR code to see donation/withdrawal options
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-700">Ready to scan</span>
            </div>
          </div>
        </div>
      </div>

      <DonationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onDonate={handleDonate}
        onWithdraw={handleWithdraw}
        marketPrice={marketPrice}
        userData={userData}
      />
    </>
  );
}
