import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { useAllRoutes } from '@/hooks/useRoutes';
import { useNearbyStops } from '@/hooks/useStops';
import { useGeolocation } from '@/hooks/useGeolocation';
import { formatFare } from '@/store/journey.store';

export default function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  // Geolocation — auto-fetch on mount
  const { lat, lng, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Nearest stop
  const { data: nearbyStops, isLoading: nearbyLoading } = useNearbyStops(lat, lng, 2000);
  const nearbyStop = nearbyStops?.[0] ?? null;

  // Recent routes (first 4 from API)
  const { data: allRoutes, isLoading: routesLoading } = useAllRoutes(4);
  const recentRoutes = allRoutes ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    navigate(`/search`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 font-sans selection:bg-brand-100 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-brand-50/80 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[10%] right-[0%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[500px] h-[500px] bg-orange-50/80 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* HERO */}
        <section className="relative text-center max-w-4xl mx-auto pb-4 md:pb-8">
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
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4 md:mb-8 leading-[1.1] text-gray-900"
          >
            Find your way, <br className="hidden md:block" />
            <span className="text-brand-600 relative inline-block whitespace-nowrap">
              stop by stop.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 md:mb-16 leading-relaxed px-4"
          >
            Navigate the chaos of informal transit confidently. We map the routes and connect the
            stops so you never get lost.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearch}
            className="w-full max-w-2xl mx-auto h-14 md:h-16 bg-white/90 backdrop-blur-xl rounded-xl md:rounded-2xl flex items-center px-1.5 md:px-2 shadow-sm border border-gray-200 ring-1 ring-gray-100 group transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-brand-500/20"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-gray-50 text-gray-400 group-focus-within:bg-brand-50 group-focus-within:text-brand-600 transition-colors ml-1">
              <Search className="w-5 h-5 md:w-5 md:h-5" />
            </div>
            <div className="flex-1 px-3 md:px-5 text-left">
              <label
                htmlFor="search-input"
                className="block text-[10px] md:text-xs font-semibold text-gray-500 mb-0.5"
              >
                Where to?
              </label>
              <input
                id="search-input"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination stop..."
                className="w-full bg-transparent border-none p-0 text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="h-10 md:h-12 px-6 md:px-8 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg md:rounded-xl transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2 text-sm md:text-base"
            >
              Go <ChevronRight className="w-4 h-4" />
            </button>
          </motion.form>
        </section>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Recent Routes */}
          <section className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Popular Routes</h2>
              <button
                onClick={() => navigate('/routes')}
                className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors"
              >
                View all
              </button>
            </div>

            {routesLoading ? (
              <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Loading routes…</span>
              </div>
            ) : (
              <div className="grid gap-4">
                {recentRoutes.map((route, i) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.01, backgroundColor: '#ffffff' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate('/search')}
                    className="bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm rounded-2xl p-4 cursor-pointer flex items-center gap-4 transition-all group hover:shadow-md hover:border-brand-200"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                      🚌
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base lg:text-lg mb-0.5 group-hover:text-brand-600 transition-colors">
                        {route.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {route.stopCount} stops
                        {route.estimatedFare > 0 && ` • ${formatFare(route.estimatedFare)}`}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-200 group-hover:text-brand-600 group-hover:bg-brand-50 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Nearest Stop */}
          <section className="lg:col-span-5">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Nearest Stop</h2>
              <button
                onClick={() => navigate('/search')}
                className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors"
              >
                Plan route
              </button>
            </div>

            {nearbyLoading && (
              <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Finding nearby stops…</span>
              </div>
            )}

            {!nearbyLoading && !nearbyStop && (
              <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm">
                <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">
                  {lat === null
                    ? 'Enable location to find nearby stops.'
                    : 'No stops within 2km.'}
                </p>
                {lat === null && (
                  <button
                    onClick={getLocation}
                    className="mt-4 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 transition-colors"
                  >
                    Enable Location
                  </button>
                )}
              </div>
            )}

            {!nearbyLoading && nearbyStop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate('/search')}
                className="bg-white rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-brand-900/10 transition-all relative"
              >
                {/* Header */}
                <div className="h-36 overflow-hidden relative bg-gradient-to-br from-brand-600 to-brand-800">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-600 flex items-center shadow-lg z-20">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Nearby
                  </div>
                  <div className="absolute bottom-4 left-6 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-0.5">{nearbyStop.name}</h3>
                    <p className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <MapPin size={12} />
                      {nearbyStop.areaName ?? 'Lagos'}
                      {nearbyStop.distance != null &&
                        ` · ${Math.round(nearbyStop.distance)}m away`}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {nearbyStop.description && (
                    <p className="text-gray-400 text-sm mb-5 font-medium line-clamp-2">
                      {nearbyStop.description}
                    </p>
                  )}

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/search');
                    }}
                    className="w-full py-3 bg-gray-900 text-white font-semibold text-sm rounded-xl hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center shadow-md cursor-pointer"
                  >
                    Plan route from here <ChevronRight className="w-4 h-4 ml-1.5" />
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
