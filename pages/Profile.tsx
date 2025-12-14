import React from 'react';
import { User, Settings, Heart, LogOut, Map } from 'lucide-react';
import { Card, Button } from '../components/ui';

export const Profile: React.FC = () => {
  return (
    <div className="px-4 md:px-0 py-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center text-brand-700">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Guest User</h1>
          <p className="text-gray-500">guest@cultureaangan.com</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><Heart size={20}/></div>
              <span className="font-medium text-gray-700">Saved Destinations</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Map size={20}/></div>
              <span className="font-medium text-gray-700">My Itineraries</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Settings size={20}/></div>
              <span className="font-medium text-gray-700">Settings</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </Card>

        <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50" icon={LogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
