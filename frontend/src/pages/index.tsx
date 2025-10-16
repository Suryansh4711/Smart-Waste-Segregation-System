import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Settings, Users, BarChart3, Trash2, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Trash2 className="h-8 w-8 text-emerald-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Waste Management</h1>
            </div>
            
            <nav className="flex items-center space-x-8">
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Users className="h-4 w-4 mr-2" />
                Users
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Admin</Badge>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Monitor and manage your waste collection system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total Waste Collected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">-- kg</div>
              <p className="text-sm text-gray-500">Data loading...</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Recycling Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">--%</div>
              <p className="text-sm text-gray-500">Data loading...</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Active Bins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">--</div>
              <p className="text-sm text-gray-500">Data loading...</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Collection Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">--</div>
              <p className="text-sm text-gray-500">Data loading...</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">Latest waste collection updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <BarChart3 className="h-full w-full" />
                </div>
                <p className="text-gray-500 text-sm">No recent activity to display</p>
                <p className="text-gray-400 text-xs mt-1">Activity will appear here once data is available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">System Status</CardTitle>
              <CardDescription className="text-gray-600">Current system health and monitoring</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-700">System Health</span>
                  <Badge className="bg-gray-100 text-gray-600">Checking...</Badge>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-700">Database Status</span>
                  <Badge className="bg-gray-100 text-gray-600">Checking...</Badge>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">API Response</span>
                  <Badge className="bg-gray-100 text-gray-600">Checking...</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Add New Bin
                </Button>
                <Button variant="outline" className="h-12 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Schedule Collection
                </Button>
                <Button variant="outline" className="h-12 border-blue-200 text-blue-700 hover:bg-blue-50">
                  Generate Report
                </Button>
                <Button variant="outline" className="h-12 border-purple-200 text-purple-700 hover:bg-purple-50">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
