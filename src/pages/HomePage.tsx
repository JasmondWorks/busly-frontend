import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { RECENT_ROUTES } from '@/shared/constants/routes';
import { NEARBY_STOP } from '@/shared/constants/stops';

export default function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    // Use browser geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In a real app, reverse geocode here or pass coords
          // For this demo, we assume "Current Location"
          navigate(`/routes?origin=Current Location&dest=${encodeURIComponent(destination)}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback or just navigate with manual origin implication
          navigate(`/routes?origin=Lagos&dest=${encodeURIComponent(destination)}`);
        },
      );
    } else {
      // Fallback for no geolocation support
      navigate(`/routes?origin=Lagos&dest=${encodeURIComponent(destination)}`);
    }
  };

  const recentRoutes = RECENT_ROUTES;
  const nearbyStop = NEARBY_STOP;

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 font-sans selection:bg-brand-100 relative overflow-x-hidden">
      {/* Global Background Glows (Light Mode) - Minimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-brand-50/80 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[10%] right-[0%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[500px] h-[500px] bg-orange-50/80 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* HERO SECTION */}
        <section className="relative text-center max-w-4xl mx-auto pb-4 md:pb-8">
          <div className="flex justify-center mb-8">
            <div className="h-12 w-12 bg-linear-to-br from-brand-600 to-brand-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-500/20">
              B
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/onboarding/location')}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200/60 shadow-sm text-gray-600 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-10 hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Lagos, Nigeria
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-8xl font-black tracking-tighter mb-4 md:mb-8 leading-[0.95] text-gray-900"
          >
            Total clarity over <br /> your{' '}
            <span className="text-brand-600 relative inline-block">
              commute.
              <svg
                className="absolute w-full h-3 md:h-4 -bottom-1 left-0 text-brand-200 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-8 md:mb-16 leading-relaxed px-4"
          >
            Track buses automatically, manage your routes, and see clear wait times without
            complicated generic maps.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearch}
            className="w-full max-w-2xl mx-auto h-16 md:h-20 bg-white/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] flex items-center px-2 md:px-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/50 ring-1 ring-gray-100 group transition-all hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] focus-within:ring-2 focus-within:ring-brand-500/20"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-[1rem] md:rounded-[1.2rem] bg-gray-50 text-gray-400 group-focus-within:bg-brand-50 group-focus-within:text-brand-600 transition-colors ml-1">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            <div className="flex-1 px-3 md:px-6 text-left">
              <label
                htmlFor="search-input"
                className="block text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5"
              >
                Where to?
              </label>
              <input
                id="search-input"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination..."
                className="w-full bg-transparent border-none p-0 text-gray-900 text-base md:text-lg font-bold placeholder:text-gray-300 focus:ring-0 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="h-12 md:h-14 px-5 md:px-8 bg-gray-900 hover:bg-black text-white font-bold rounded-[1.2rem] md:rounded-[1.5rem] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center gap-2 text-sm md:text-base"
            >
              Go <ChevronRight className="w-4 h-4" />
            </button>
          </motion.form>
        </section>

        {/* SECTION 2: CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Recent Routes */}
          <section className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Routes</h2>
              <button
                onClick={() => navigate('/routes')}
                className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors"
              >
                View all
              </button>
            </div>

            <div className="grid gap-4">
              {recentRoutes.map((route, i) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/navigation/active')}
                  className="bg-white/60 backdrop-blur-md border border-white/60 shadow-sm rounded-[2rem] p-5 cursor-pointer flex items-center gap-6 transition-all group hover:shadow-lg hover:shadow-brand-900/5 hover:border-brand-100"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                    {route.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-brand-600 transition-colors">
                      {route.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Fastest route • {route.duration}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-brand-200 group-hover:text-brand-600 group-hover:bg-brand-50 transition-all">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Nearest Stop Card */}
          <section className="lg:col-span-5">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Nearest Stop</h2>
              <button
                onClick={() => navigate('/navigation/obalende')}
                className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors"
              >
                Map view
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/navigation/obalende')}
              className="bg-white rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-brand-900/10 transition-all relative"
            >
              {/* Image Header */}
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                <img
                  src={nearbyStop.image}
                  alt={nearbyStop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-emerald-600 flex items-center shadow-lg z-20">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live Status
                </div>

                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="text-3xl font-bold mb-1">{nearbyStop.name}</h3>
                  <p className="text-sm font-medium text-white/80 flex items-center gap-2">
                    <MapPin size={14} /> 200m walk from here
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 group-hover:bg-brand-50/50 group-hover:border-brand-100 transition-colors">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Wait Time
                    </p>
                    <p className="text-gray-900 text-3xl font-black tracking-tighter">
                      {nearbyStop.wait}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 group-hover:bg-brand-50/50 group-hover:border-brand-100 transition-colors">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Next Bus
                    </p>
                    <p className="text-gray-900 text-3xl font-black tracking-tighter">
                      {nearbyStop.nextBus}
                    </p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/navigation/active');
                  }}
                  className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-lg"
                >
                  Navigate to Stop <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}
