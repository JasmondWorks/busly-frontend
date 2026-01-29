import { useState } from 'react';
import { Search, ArrowRight, Bus } from 'lucide-react';
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
        <header className="flex items-center gap-5">
          <div className="h-12 w-12 bg-linear-to-br from-brand-600 to-brand-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-500/20">
            B
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-1">
              Find your <span className="text-brand-600">route.</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Search for buses, terminals, or destinations.
            </p>
          </div>
        </header>

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
              className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border border-gray-200 shadow-sm text-lg font-bold text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRoutes.length === 0 ? (
            <div className="mt-12 text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-300">
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
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/5 hover:border-brand-200 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
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
                      className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${
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
                  <span className="font-bold text-gray-900 border-b-2 border-brand-100 pb-0.5">
                    {route.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-brand-400 bg-white ring-4 ring-brand-50"></div>
                      <h3 className="text-lg font-black text-gray-900 line-clamp-1 tracking-tight">
                        {route.from}
                      </h3>
                    </div>
                    <div className="ml-[4px] w-0.5 h-4 bg-gray-100 my-0.5 rounded-full"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-brand-50"></div>
                      <h3 className="text-lg font-black text-gray-900 line-clamp-1 tracking-tight">
                        {route.to}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-0.5">
                      Duration
                    </p>
                    <p className="text-base font-bold text-gray-900">{route.duration}</p>
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
