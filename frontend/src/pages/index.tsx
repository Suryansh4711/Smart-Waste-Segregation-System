import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Home, Settings, Users, BarChart3, Trash2, Bell, Camera, User } from 'lucide-react';

export default function SmartWasteSegregationSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<{ category: string; confidence?: number } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    alert('Signup functionality - redirecting to login');
    setActiveTab('login');
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const scanNow = async () => {
    if (!capturedImage) return;
    
    setIsScanning(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const categories = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-waste'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setScanResult({ category: randomCategory, confidence });
      setIsScanning(false);
    }, 2000);
  };

  const resetScan = () => {
    setCapturedImage(null);
    setScanResult(null);
    setIsScanning(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Smart Waste Segregation
              </CardTitle>
              <CardDescription className="text-gray-600">
                {activeTab === 'login' ? 'Access your dashboard' : 'Create your account'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'login'
                      ? 'bg-white text-emerald-600 shadow-sm font-medium'
                      : 'bg-transparent text-gray-600 hover:text-gray-800'
                  }`}
                  variant="ghost"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === 'signup'
                      ? 'bg-white text-emerald-600 shadow-sm font-medium'
                      : 'bg-transparent text-gray-600 hover:text-gray-800'
                  }`}
                  variant="ghost"
                >
                  Sign Up
                </Button>
              </div>

              {/* Login Form */}
              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Username or Email"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-emerald-600 hover:text-emerald-700">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  >
                    Sign In
                  </Button>
                </form>
              )}

              {/* Signup Form */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 mt-0.5" required />
                    <span>
                      I agree to the{' '}
                      <a href="#" className="text-emerald-600 hover:text-emerald-700">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-emerald-600 hover:text-emerald-700">
                        Privacy Policy
                      </a>
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  >
                    Create Account
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {activeTab === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">Guest User is not upgradable</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Admin Login</Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-gray-50"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Waste Segregation System</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-8">
                <div className="text-center">
                  {!capturedImage ? (
                    <div className="space-y-6">
                      <div className="w-80 h-80 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                        {videoRef.current?.srcObject ? (
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="text-center">
                            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg text-gray-600 font-medium">Camera to capture</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-x-4">
                        {!videoRef.current?.srcObject ? (
                          <Button 
                            onClick={startCamera}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Start Camera
                          </Button>
                        ) : (
                          <Button 
                            onClick={captureImage}
                            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Capture Image
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="w-80 h-80 mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
                        <img 
                          src={capturedImage} 
                          alt="Captured waste" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="space-x-4">
                        <Button 
                          onClick={scanNow}
                          disabled={isScanning}
                          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-emerald-400"
                        >
                          {isScanning ? 'Scanning...' : 'Scan Now'}
                        </Button>
                        <Button 
                          onClick={resetScan}
                          variant="outline"
                          className="px-8 py-3"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Preview */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">Image</h3>
                  <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {capturedImage ? (
                      <img 
                        src={capturedImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image captured</span>
                    )}
                  </div>
                </div>

                {/* Category Result */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">Category</h3>
                  <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {isScanning ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                        <span className="text-gray-600 text-sm">Analyzing...</span>
                      </div>
                    ) : scanResult ? (
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-600 mb-1">{scanResult.category}</div>
                        {scanResult.confidence && (
                          <div className="text-sm text-gray-500">{scanResult.confidence}% confidence</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Scan an image to see results</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
