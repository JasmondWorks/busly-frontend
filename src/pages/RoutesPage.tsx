import { useState } from 'react';
import { Search, MapPin, Filter, ArrowRight, Bus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { ALL_ROUTES, ROUTE_FILTERS } from '@/shared/constants/routes';

export default function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ROUTE_FILTERS;
  const routes = ALL_ROUTES;

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || route.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-6 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">
            Find your <span className="text-brand-600">route.</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Search for buses, terminals, or destinations.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-6 sticky top-0 bg-[#FDFDFD]/90 backdrop-blur-xl z-20 py-4 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none md:p-0 md:m-0">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl border border-gray-200 shadow-sm text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid gap-4">
          {filteredRoutes.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Bus size={32} />
              </div>
              <p className="text-gray-400 font-medium">No routes found for your search.</p>
            </div>
          ) : (
            filteredRoutes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/navigation/active')}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/5 hover:border-brand-200 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        route.type === 'Express'
                          ? 'bg-purple-50 text-purple-600 border-purple-100'
                          : route.type === 'BRT'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}
                    >
                      {route.type}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        route.status === 'Fast'
                          ? 'text-emerald-500'
                          : route.status === 'Congested'
                            ? 'text-red-500'
                            : 'text-gray-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          route.status === 'Fast'
                            ? 'bg-emerald-500'
                            : route.status === 'Congested'
                              ? 'bg-red-500'
                              : 'bg-gray-300'
                        }`}
                      ></span>
                      {route.status}
                    </span>
                  </div>
                  <span className="font-extrabold text-gray-900">{route.price}</span>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full border-2 border-brand-500 bg-white"></div>
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                        {route.from}
                      </h3>
                    </div>
                    <div className="ml-[3px] w-0.5 h-3 bg-gray-200 my-0.5 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-600"></div>
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1">{route.to}</h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-400 mb-0.5">Duration</p>
                    <p className="text-lg font-black text-gray-900 tracking-tight">
                      {route.duration}
                    </p>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity -mr-4 group-hover:mr-0">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
