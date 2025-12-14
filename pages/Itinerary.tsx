import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Sparkles, Loader, Share2, Save, MoveVertical } from 'lucide-react';
import { Card, Button, SectionHeader, Badge } from '../components/ui';
import { generateItinerary, getDestinationInsights } from '../services/geminiService';
import { ItineraryDay, TravelTheme } from '../types';

export const Itinerary: React.FC = () => {
  // State for Generation Form
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [theme, setTheme] = useState(TravelTheme.CULTURE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string>("");

  // State for Itinerary Data
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [mode, setMode] = useState<'form' | 'view'>('form');

  const handleGenerate = async () => {
    if (!destination) return;
    setIsGenerating(true);
    
    // Parallel fetch: Itinerary + Insights
    const [genItinerary, genInsights] = await Promise.all([
      generateItinerary(destination, days, theme),
      getDestinationInsights(destination)
    ]);

    setItinerary(genItinerary);
    setInsights(genInsights);
    setIsGenerating(false);
    setMode('view');
  };

  const handleRemoveItem = (dayIndex: number, itemIndex: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].items.splice(itemIndex, 1);
    setItinerary(newItinerary);
  };

  if (mode === 'form') {
    return (
      <div className="px-4 md:px-0 py-6 max-w-xl mx-auto">
        <SectionHeader title="Build Your Itinerary" subtitle="Plan your perfect trip with AI assistance" />
        
        <Card className="p-6 space-y-6 border-brand-200 shadow-md">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Where to?</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-brand-500">
              <MapPin className="text-gray-400 mr-2" size={20} />
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Udaipur, Kerala, Vietnam" 
                className="flex-1 outline-none text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Duration (Days)</label>
            <div className="flex items-center gap-4">
               <input 
                type="range" 
                min="1" 
                max="10" 
                value={days} 
                onChange={(e) => setDays(Number(e.target.value))}
                className="flex-1 accent-brand-600"
              />
              <span className="font-bold text-brand-800 w-8 text-center">{days}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Travel Style</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(TravelTheme).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    theme === t 
                    ? 'bg-brand-50 border-brand-500 text-brand-700' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full py-3 text-lg mt-4" 
            onClick={handleGenerate}
            disabled={!destination}
            isLoading={isGenerating}
            icon={Sparkles}
          >
            {isGenerating ? 'Generating Plan...' : 'Generate Itinerary'}
          </Button>
        </Card>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
           <h4 className="text-blue-800 font-bold mb-1 flex items-center gap-2">
             <Sparkles size={16}/> Why use AI?
           </h4>
           <p className="text-sm text-blue-700">
             Our AI helps you find hidden gems and organizes your day efficiently based on local geography and opening times.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <button onClick={() => setMode('form')} className="text-sm text-gray-500 hover:text-brand-600 mb-1">← Back to planner</button>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Your Trip to {destination}</h1>
          <p className="text-gray-500 text-sm">{days} Days • {theme} Theme</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={Save}>Save</Button>
          <Button variant="secondary" size="sm" icon={Share2}>Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Itinerary Timeline */}
        <div className="lg:col-span-2 space-y-6">
           {itinerary.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
               <p className="text-gray-400">No itinerary generated. Try again.</p>
               <Button variant="ghost" onClick={() => setMode('form')} className="mt-2">Try Again</Button>
             </div>
           ) : (
             itinerary.map((day, dIdx) => (
               <div key={dIdx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-brand-50 px-4 py-3 border-b border-brand-100 flex justify-between items-center">
                    <h3 className="font-bold text-brand-800 flex items-center gap-2">
                      <Calendar size={18}/> Day {day.day}
                    </h3>
                  </div>
                  <div className="p-2">
                    {day.items?.map((item, iIdx) => (
                      <div key={iIdx} className="group flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors relative">
                         <div className="w-16 pt-1 text-right flex-shrink-0">
                           <span className="text-xs font-bold text-gray-500 block">{item.time}</span>
                         </div>
                         <div className="relative z-10">
                            <div className="absolute top-2 -left-[25px] w-3 h-3 bg-brand-300 rounded-full border-2 border-white shadow-sm"></div>
                            {iIdx !== day.items.length -1 && <div className="absolute top-5 -left-[20px] w-0.5 h-12 bg-gray-200"></div>}
                         </div>
                         <div className="flex-1">
                           <h4 className="font-bold text-gray-800 text-sm">{item.activity}</h4>
                           <p className="text-xs text-gray-500 flex items-center mt-1">
                             <MapPin size={10} className="mr-1"/> {item.location}
                           </p>
                           <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] rounded border ${
                             item.type === 'food' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                             item.type === 'culture' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                             'bg-gray-50 text-gray-600 border-gray-200'
                           }`}>
                             {item.type}
                           </span>
                         </div>
                         <button 
                           onClick={() => handleRemoveItem(dIdx, iIdx)}
                           className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-2"
                         >
                           <Trash2 size={16} />
                         </button>
                      </div>
                    ))}
                    <button className="w-full py-2 text-xs text-brand-600 font-medium hover:bg-brand-50 rounded mt-2 flex items-center justify-center gap-1 border border-dashed border-brand-200">
                      <Plus size={14}/> Add Activity
                    </button>
                  </div>
               </div>
             ))
           )}
        </div>

        {/* Sidebar: Tips & Guidance */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="p-5 bg-gradient-to-br from-brand-500 to-brand-700 text-white border-none">
              <h3 className="font-serif font-bold text-xl mb-2">Culture Aangan Tips</h3>
              <p className="text-brand-100 text-sm mb-4 leading-relaxed">
                {insights || "Generating local insights..."}
              </p>
              <div className="flex gap-2">
                 <Badge color="bg-white/20 text-white backdrop-blur-sm">Local Etiquette</Badge>
                 <Badge color="bg-white/20 text-white backdrop-blur-sm">Hidden Gems</Badge>
              </div>
           </Card>

           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
             <h3 className="font-bold text-gray-900 mb-3">Booking Assistance</h3>
             <p className="text-sm text-gray-600 mb-4">
               Need help booking hotels or transport for this itinerary? Our experts can handle it for you.
             </p>
             <Button variant="outline" className="w-full text-sm">Contact an Expert</Button>
           </div>
        </div>
      </div>
    </div>
  );
};