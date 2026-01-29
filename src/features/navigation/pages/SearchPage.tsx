import { useNavigate } from 'react-router-dom';
import { StopSearch } from '../components/StopSearch';
import type { Stop } from '../types';
import { Clock, MapPin, TrendingUp, Bookmark, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import victoriaIslandImg from '@/assets/images/victoria-island.png';
import ikejaMallImg from '@/assets/images/ikeja-city-mall.png';
import unilagImg from '@/assets/images/unilag.png';

export const SearchPage = () => {
  const navigate = useNavigate();

  const handleRouteSelected = (origin: Stop, destination: Stop) => {
    navigate(`/routes?originId=${origin.id}&destinationId=${destination.id}`);
  };

  const recentSearches = [
    { from: 'Ikeja Underbridge', to: 'Lekki Phase 1', date: 'Yesterday' },
    { from: 'Yaba Tech', to: 'Oshodi Terminal', date: '2 days ago' },
  ];

  const popularDestinations = [
    {
      name: 'Victoria Island',
      description: 'Business District',
      image: victoriaIslandImg,
    },
    {
      name: 'Ikeja City Mall',
      description: 'Shopping & Leisure',
      image: ikejaMallImg,
    },
    {
      name: 'Unilag, Akoka',
      description: 'Education',
      image: unilagImg,
    },
  ];

  const savedPlaces = [
    { id: 's1', name: 'Home', address: '12 Adeleke St, Ikeja', icon: 'home' },
    { id: 's2', name: 'Work', address: 'Capital City Office Lagos', icon: 'briefcase' },
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50/30 relative selection:bg-brand-100">
      {/* Search Spotlight Effect */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_20%,rgba(var(--brand-600-rgb),0.08),transparent_70%)] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">
            Plan your <span className="text-brand-600">journey.</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            Discover the best routes, explore trending destinations, and manage your daily commute
            with ease.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Discovery & Planning */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* 1. Imagery-First Discovery (Trending) */}
            <section>
              <div className="flex items-center gap-2 mb-6 px-2">
                <MapPin size={16} className="text-brand-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Trending Destinations
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularDestinations.map((place, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="group relative h-52 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-brand-900/10 transition-all border border-transparent hover:border-brand-100"
                    onClick={() =>
                      navigate(
                        `/routes?dest=${encodeURIComponent(place.name)}&origin=Current Location`,
                      )
                    }
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                      <h4 className="text-white text-lg font-bold drop-shadow-md">{place.name}</h4>
                      <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest leading-none mt-1">
                        {place.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 2. Main Search Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="flex items-center gap-2 mb-4 px-2">
                <TrendingUp size={16} className="text-brand-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Find a Route
                </h3>
              </div>
              <StopSearch onRouteSelected={handleRouteSelected} />
            </motion.div>

            {/* 3. Saved Places (Mobile Only) */}
            <section className="lg:hidden">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <Bookmark size={16} className="text-gray-400" />
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Saved Places
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/saved')}
                  className="text-xs font-bold text-brand-600"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() =>
                      navigate(
                        `/routes?dest=${encodeURIComponent(place.name)}&origin=Current Location`,
                      )
                    }
                    className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Star size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{place.name}</h4>
                      <p className="text-xs text-gray-400 truncate w-32 font-medium">
                        {place.address}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: History & Saved (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 space-y-10">
            {/* Desktop Saved Places */}
            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-brand-500" />
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Saved Locations
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/saved')}
                  className="text-[10px] font-bold uppercase text-brand-600 tracking-widest hover:underline"
                >
                  Manage
                </button>
              </div>
              <div className="space-y-3">
                {savedPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() =>
                      navigate(
                        `/routes?dest=${encodeURIComponent(place.name)}&origin=Current Location`,
                      )
                    }
                    className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-brand-100 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                      <Bookmark size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-none mb-1">{place.name}</h4>
                      <p className="text-[10px] font-semibold text-gray-400 truncate">
                        {place.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 px-2">
                <Clock size={16} className="text-gray-400" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Recent History
                </h3>
              </div>
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleRouteSelected(
                        { id: '1', name: item.from } as Stop,
                        { id: '2', name: item.to } as Stop,
                      )
                    }
                    className="p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                        {item.from} <span className="text-gray-300 font-normal">→</span> {item.to}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                        {item.date}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-50 text-gray-300 group-hover:text-brand-600 transition-colors">
                      <TrendingUp size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
