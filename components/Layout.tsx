import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Map, Package, User, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Explore', icon: Compass, path: '/explore' },
    { label: 'Plan', icon: Map, path: '/itinerary' },
    { label: 'Packages', icon: Package, path: '/packages' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-50 pb-20 md:pb-0">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-serif font-bold">C</div>
          <span className="text-xl font-bold font-serif text-brand-800">Culture Aangan</span>
        </div>
        <nav className="flex gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-600' : 'text-gray-500 hover:text-brand-500'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button className="p-2 hover:bg-gray-100 rounded-full">
           <Menu size={20} className="text-gray-600"/>
        </button>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-50">
         <div className="flex items-center gap-2" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-serif font-bold">C</div>
          <span className="text-lg font-bold font-serif text-brand-800">Culture Aangan</span>
        </div>
        <button>
          <User size={24} className="text-brand-800" onClick={() => navigate('/profile')}/>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto md:px-8 md:py-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-1 z-50 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 w-full transition-colors ${
                isActive ? 'text-brand-600' : 'text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
