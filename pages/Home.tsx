import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sun, Coffee, Camera, BookOpen } from 'lucide-react';
import { Card, SectionHeader, Badge } from '../components/ui';
import { TravelTheme } from '../types';

const FeaturedDestinations = [
  { id: '1', name: 'Jaipur', location: 'Rajasthan', image: 'https://picsum.photos/400/300?random=1', theme: 'Heritage' },
  { id: '2', name: 'Munnar', location: 'Kerala', image: 'https://picsum.photos/400/300?random=2', theme: 'Nature' },
  { id: '3', name: 'Varanasi', location: 'Uttar Pradesh', image: 'https://picsum.photos/400/300?random=3', theme: 'Culture' },
  { id: '4', name: 'Hampi', location: 'Karnataka', image: 'https://picsum.photos/400/300?random=4', theme: 'History' },
];

const Themes = [
  { name: TravelTheme.CULTURE, icon: BookOpen, color: 'bg-orange-100 text-orange-700' },
  { name: TravelTheme.HERITAGE, icon: Camera, color: 'bg-amber-100 text-amber-700' },
  { name: TravelTheme.NATURE, icon: Sun, color: 'bg-green-100 text-green-700' },
  { name: TravelTheme.FOOD, icon: Coffee, color: 'bg-rose-100 text-rose-700' },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[500px] w-full md:rounded-2xl overflow-hidden group">
        <img 
          src="https://picsum.photos/1200/800?random=10" 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
          <Badge color="bg-brand-500 text-white mb-3 w-fit">Discover India</Badge>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
            Experience the Soul <br/> of Culture Aangan
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-lg mb-6">
            Curated journeys to hidden gems and authentic local experiences across India.
          </p>
          
          <div className="bg-white p-2 rounded-lg flex items-center shadow-lg max-w-md w-full">
            <Search className="text-gray-400 ml-2" size={20} />
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              className="flex-1 p-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <button 
              className="bg-brand-500 text-white px-6 py-2 rounded-md font-medium hover:bg-brand-600 transition"
              onClick={() => navigate('/explore')}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access / Themes */}
      <div className="px-4 md:px-0">
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {Themes.map((t) => (
            <button 
              key={t.name}
              onClick={() => navigate('/explore')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${t.color} shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1`}>
                <t.icon size={24} />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Destinations */}
      <div>
        <SectionHeader 
          title="Featured Destinations" 
          subtitle="Handpicked hidden gems for you"
          action={
            <button 
              onClick={() => navigate('/explore')}
              className="text-brand-600 text-sm font-medium flex items-center hover:text-brand-700"
            >
              View All <ArrowRight size={16} className="ml-1"/>
            </button>
          }
        />
        <div className="flex overflow-x-auto gap-4 px-4 md:px-0 pb-4 no-scrollbar snap-x">
          {FeaturedDestinations.map((dest) => (
            <Card 
              key={dest.id} 
              className="min-w-[260px] md:min-w-[300px] snap-center group cursor-pointer"
              onClick={() => navigate(`/explore`)}
            >
              <div className="h-40 overflow-hidden relative">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-gray-800">
                  {dest.theme}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-gray-900">{dest.name}</h3>
                    <div className="flex items-center text-gray-500 text-xs mt-1">
                      <MapPin size={12} className="mr-1" />
                      {dest.location}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

       {/* Our Packages Teaser */}
       <div className="px-4 md:px-0">
         <div className="bg-brand-900 rounded-2xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-800 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Curated Culture Packages</h2>
              <p className="text-brand-200 text-sm md:text-base mb-6 max-w-lg">
                Immerse yourself in authentic village stays, culinary trails, and heritage walks designed by experts.
              </p>
              <button 
                onClick={() => navigate('/packages')}
                className="bg-white text-brand-900 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition"
              >
                Explore Packages
              </button>
            </div>
            <div className="z-10 grid grid-cols-2 gap-3">
               <img src="https://picsum.photos/150/150?random=20" className="rounded-lg shadow-lg rotate-3 border-2 border-white/20" alt="Culture" />
               <img src="https://picsum.photos/150/150?random=21" className="rounded-lg shadow-lg -rotate-3 mt-4 border-2 border-white/20" alt="Village" />
            </div>
         </div>
       </div>
    </div>
  );
};
