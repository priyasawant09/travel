import React, { useState } from 'react';
import { Search, MapPin, Filter, Star } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';

// Mock Data
const Destinations = [
  { id: '1', name: 'Chettinad', location: 'Tamil Nadu', image: 'https://picsum.photos/400/300?random=11', theme: 'Heritage', rating: 4.8, description: 'Famous for its mansions and spicy cuisine.' },
  { id: '2', name: 'Spiti Valley', location: 'Himachal', image: 'https://picsum.photos/400/300?random=12', theme: 'Nature', rating: 4.9, description: 'Cold desert mountain valley high in the Himalayas.' },
  { id: '3', name: 'Majuli', location: 'Assam', image: 'https://picsum.photos/400/300?random=13', theme: 'Culture', rating: 4.7, description: 'The largest river island in the world.' },
  { id: '4', name: 'Khajuraho', location: 'Madhya Pradesh', image: 'https://picsum.photos/400/300?random=14', theme: 'History', rating: 4.6, description: 'Group of monuments famous for nagara-style symbolism.' },
  { id: '5', name: 'Gokarna', location: 'Karnataka', image: 'https://picsum.photos/400/300?random=15', theme: 'Beach', rating: 4.5, description: 'A small temple town with pristine beaches.' },
  { id: '6', name: 'Ziro', location: 'Arunachal Pradesh', image: 'https://picsum.photos/400/300?random=16', theme: 'Nature', rating: 4.8, description: 'Pine hills and rice fields, home to the Apatani tribe.' },
];

export const Explore: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Heritage', 'Nature', 'Culture', 'History'];
  const filteredDestinations = filter === 'All' ? Destinations : Destinations.filter(d => d.theme === filter);

  return (
    <div className="space-y-6 px-4 md:px-0 pt-4">
      {/* Search Header */}
      <div className="sticky top-0 bg-brand-50 pt-2 pb-4 z-40">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Explore Destinations</h1>
        <div className="flex gap-2">
          <div className="flex-1 bg-white flex items-center p-3 rounded-lg shadow-sm border border-brand-100">
            <Search className="text-gray-400 mr-2" size={20}/>
            <input 
              type="text" 
              placeholder="Search by state, city, or theme..." 
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
          </div>
          <button className="bg-white p-3 rounded-lg shadow-sm border border-brand-100 text-brand-600">
            <Filter size={20} />
          </button>
        </div>
        
        {/* Chips */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredDestinations.map(dest => (
          <Card key={dest.id} className="group cursor-pointer">
            <div className="h-48 overflow-hidden relative">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                <Star size={10} className="text-yellow-500 fill-yellow-500" /> {dest.rating}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold font-serif text-gray-900">{dest.name}</h3>
                  <div className="flex items-center text-gray-500 text-xs">
                    <MapPin size={12} className="mr-1" /> {dest.location}
                  </div>
                </div>
                <Badge>{dest.theme}</Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{dest.description}</p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">3-5 Days Suggested</span>
                <Button size="sm" variant="ghost">Details →</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
