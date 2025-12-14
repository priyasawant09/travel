import React from 'react';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, Button, SectionHeader, Badge } from '../components/ui';
import { Package } from '../types';

const PackagesList: Package[] = [
  {
    id: 'p1',
    title: 'Royal Rajasthan Heritage Trail',
    duration: '7 Days / 6 Nights',
    price: 'On Request',
    description: 'Experience the grandeur of forts, palaces, and rural Rajasthan. Stay in heritage havelis and enjoy authentic Rajasthani cuisine.',
    inclusions: ['Heritage Stays', 'Private Transport', 'Guided Tours', 'Cultural Shows'],
    imageUrl: 'https://picsum.photos/400/300?random=50'
  },
  {
    id: 'p2',
    title: 'Kerala Backwaters & Spice Plantations',
    duration: '5 Days / 4 Nights',
    price: 'On Request',
    description: 'Drift through tranquil backwaters on a houseboat and walk through aromatic spice plantations in Munnar.',
    inclusions: ['Houseboat Stay', 'All Meals', 'Spice Walk', 'Kathakali Performance'],
    imageUrl: 'https://picsum.photos/400/300?random=51'
  },
  {
    id: 'p3',
    title: 'Spiritual Varanasi & Sarnath',
    duration: '4 Days / 3 Nights',
    price: 'On Request',
    description: 'Witness the Ganga Aarti, explore ancient temples, and visit the Buddhist pilgrimage site of Sarnath.',
    inclusions: ['Ganga Aarti Boat Ride', 'Temple Tour', 'Airport Transfers', 'Breakfast'],
    imageUrl: 'https://picsum.photos/400/300?random=52'
  }
];

export const Packages: React.FC = () => {
  return (
    <div className="px-4 md:px-0 py-6">
      <SectionHeader title="Our Curated Packages" subtitle="Hand-crafted experiences by Culture Aangan experts" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PackagesList.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col h-full">
            <div className="h-48 relative overflow-hidden">
               <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                 <Badge color="bg-brand-500 text-white">{pkg.duration}</Badge>
               </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{pkg.description}</p>
              
              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase">Inclusions</p>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.inclusions.map((inc, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-700">
                      <CheckCircle size={12} className="text-green-600 mr-1" /> {inc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="font-bold text-brand-700">{pkg.price}</p>
                </div>
                <Button size="sm">Enquire Now <ArrowRight size={16} className="ml-1"/></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
