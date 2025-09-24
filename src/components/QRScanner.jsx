import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

const QRScanner = ({ isOpen, onClose, onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      initializeCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const initializeCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        setScanning(true);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError('Camera access is required to scan QR codes. Please allow camera permission and try again.');
      setCameraPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
    setScanResult(null);
    setError(null);
  };

  const simulateQRScan = () => {
    // Simulate scanning a vending machine QR code
    const mockQRData = {
      machineId: 'OB-VM-001',
      location: 'Central Campus - Building A',
      status: 'active',
      lastMaintenance: '2024-01-15',
      binTypes: ['plastic', 'paper', 'metal'],
      timestamp: new Date().toISOString()
    };
    
    setScanResult(mockQRData);
    setScanning(false);
    
    // Auto-process the scan after a brief delay
    setTimeout(() => {
      onScanSuccess(mockQRData);
      onClose();
    }, 2000);
  };

  const handleManualInput = () => {
    const manualCode = prompt('Enter the vending machine QR code manually:');
    if (manualCode) {
      const mockData = {
        machineId: manualCode,
        location: 'Manual Entry',
        status: 'active',
        timestamp: new Date().toISOString()
      };
      setScanResult(mockData);
      setTimeout(() => {
        onScanSuccess(mockData);
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 animate-fade-in-scale">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Scan Vending Machine QR</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {!cameraPermission && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Access Required</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We need camera permission to scan QR codes on vending machines
                </p>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <button
                    onClick={initializeCamera}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <Camera className="w-4 h-4 inline mr-2" />
                    Allow Camera Access
                  </button>
                  <button
                    onClick={handleManualInput}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                  >
                    Enter Code Manually
                  </button>
                </div>
              </div>
            </div>
          )}

          {cameraPermission && scanning && !scanResult && (
            <div className="text-center space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 bg-gray-900 rounded-xl object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-emerald-400 rounded-xl relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Point your camera at the QR code on the vending machine display
                </p>
                
                {/* Demo button for testing */}
                <button
                  onClick={simulateQRScan}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Demo: Simulate QR Scan
                </button>
                
                <button
                  onClick={handleManualInput}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  Enter Code Manually
                </button>
              </div>
            </div>
          )}

          {scanResult && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code Scanned!</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Machine ID:</span>
                      <span className="font-medium text-gray-900">{scanResult.machineId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-900">{scanResult.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-emerald-600 capitalize">{scanResult.status}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Processing your request...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Powered by OpenBin QR Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
