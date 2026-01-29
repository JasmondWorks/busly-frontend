import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { navigationApi } from '../services/navigation.api';
import type { Route } from '../types';
import { ArrowLeft, Clock, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const RouteSelectionPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const originId = searchParams.get('originId');
  const destinationId = searchParams.get('destinationId');

  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!originId || !destinationId) return;
      try {
        setLoading(true);
        const results = await navigationApi.searchRoutes(originId, destinationId);
        setRoutes(results);
      } catch (error) {
        console.error('Failed to fetch routes', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [originId, destinationId]);

  const handleSelectRoute = (route: Route) => {
    navigate('/navigation/active'); // Directing to the ActiveMock for demo purposes
  };

  if (!originId || !destinationId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Route Selected</h2>
        <p className="text-gray-500 mb-6">Please start from the search page.</p>
        <button
          onClick={() => navigate('/search')}
          className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
        >
          Go to Search
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/search')}
          className="p-2.5 -ml-2 text-gray-500 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Select Route</h1>
          <p className="text-sm text-gray-500">Fastest options to destination</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : routes.length === 0 ? (
        <div className="text-center py-20 px-4 border border-gray-100 rounded-2xl bg-gray-50">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="text-gray-400" size={32} />
          </div>
          <div className="text-gray-900 font-bold text-lg mb-1">No routes found</div>
          <div className="text-gray-500 text-sm">Try searching for different stops.</div>
        </div>
      ) : (
        <div className="grid gap-4">
          {routes.map((route, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={route.id}
              onClick={() => handleSelectRoute(route)}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Recommended Badge for first item */}
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Recommended
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
                    {route.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                      <Zap size={12} className="fill-current" /> 98% Match
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                      <Users size={12} /> Popular
                    </span>
                  </div>
                </div>
                <div className="text-right pr-2">
                  <span className="block text-2xl font-extrabold text-gray-900 tracking-tight">
                    {route.estimatedFare ? `₦${route.estimatedFare}` : 'N/A'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">approximate</span>
                </div>
              </div>

              {/* Path Visualizer */}
              <div className="flex items-center gap-3 text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white shrink-0"></div>
                  <span className="font-medium truncate">{route.originStop.name}</span>
                </div>

                <div className="h-0.5 bg-gray-200 flex-1 relative mx-2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-[10px] text-gray-400 font-medium uppercase">
                    Direct
                  </div>
                </div>

                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-3 h-3 rounded-full bg-brand-600 shrink-0"></div>
                  <span className="font-medium truncate">{route.destinationStop.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
