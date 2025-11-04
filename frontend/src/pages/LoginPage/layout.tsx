import React from 'react';
import { Trash2 } from 'lucide-react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 Smart Waste Segregation System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
