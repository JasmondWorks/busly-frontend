import { useState } from 'react';
import { Search, ArrowRight, Bus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useAllRoutes } from '@/hooks/useRoutes';

const ROUTE_FILTERS = ['All', 'BRT', 'Express', 'Local'] as const;
type Filter = (typeof ROUTE_FILTERS)[number];

function modeLabel(mode: string): Filter {
  if (mode === 'BRT') return 'BRT';
  if (mode === 'EXPRESS') return 'Express';
  return 'Local';
}

export default function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const { data: routes = [], isLoading, error } = useAllRoutes(50);

  const filteredRoutes = routes.filter((route) => {
    const label = modeLabel(route.mode);
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || label === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-6 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center gap-5">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Routes</h1>
            <p className="text-gray-500 font-medium text-lg">
              Search for buses, terminals, or destinations.
            </p>
          </div>
        </header>

        {/* Search & Filter */}
        <div className="space-y-4 md:space-y-6 sticky top-0 bg-[#FDFDFD]/90 backdrop-blur-xl z-20 py-4 -mx-4 px-4 md:static md:bg-transparent md:backdrop-blur-none md:p-0 md:m-0">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-white rounded-lg border border-gray-200 shadow-sm text-base font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {ROUTE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all border ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Loading routes…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-10 text-center text-red-500 font-medium text-sm">
            Failed to load routes. Make sure the backend is running.
          </div>
        )}

        {/* Routes Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRoutes.length === 0 ? (
              <div className="mt-12 text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl col-span-2">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Bus size={32} />
                </div>
                <p className="text-gray-400 font-medium">No routes found.</p>
              </div>
            ) : (
              filteredRoutes.map((route, i) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => navigate('/search')}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider border ${
                          route.mode === 'BRT'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : route.mode === 'EXPRESS'
                              ? 'bg-purple-50 text-purple-600 border-purple-100'
                              : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}
                      >
                        {modeLabel(route.mode)}
                      </span>
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1 ${
                          route.reliabilityScore >= 85 ? 'text-emerald-500' : 'text-gray-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            route.reliabilityScore >= 85 ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                        ></span>
                        {route.reliabilityScore >= 85 ? 'Reliable' : 'Variable'}
                      </span>
                    </div>
                    <div className="group-hover:opacity-0 transition-opacity whitespace-nowrap text-sm font-semibold text-gray-900">
                      {route.stopCount} stops
                    </div>
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 tracking-tight">
                        {route.name}
                      </h3>
                      {route.description && (
                        <p className="text-xs text-gray-400 font-medium line-clamp-1 mt-0.5">
                          {route.description}
                        </p>
                      )}
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
        )}
      </div>
    </div>
  );
}
