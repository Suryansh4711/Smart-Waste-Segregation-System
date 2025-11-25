import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import LoginLayout from './layout';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Signup functionality - redirecting to login');
    setActiveTab('login');
  };

  return (
    <LoginLayout>
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
    </LoginLayout>
  );
}
