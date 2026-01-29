import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { navigationApi } from '../services/navigation.api';
import type { Route, Stop } from '../types';
import { NavigationSession } from '../components/NavigationSession';
import { GraphView } from '../components/GraphView';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, GitGraph, X } from 'lucide-react';

export const NavigationPage = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState<Route | null>(null);
  const [stops, setStops] = useState<{ stop: Stop; sequenceOrder: number }[]>([]);
  const [isGraphMode, setIsGraphMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!routeId) return;
      try {
        setLoading(true);
        const routeStops = await navigationApi.getRouteStops(routeId);
        setStops(routeStops);
        const routeData = await navigationApi.getRouteById(routeId);
        setRoute(routeData);
      } catch (error) {
        console.error('Failed to load navigation session', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [routeId]);

  if (loading)
    return <div className="flex justify-center items-center h-full text-brand-600">Loading...</div>;
  if (!route) return <div className="p-8 text-gray-500">Route not found</div>;

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-20 shadow-sm shrink-0">
        <h1 className="font-semibold text-gray-900">Active Navigation</h1>
        <button
          onClick={() => navigate('/routes')}
          className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isGraphMode ? 'graph' : 'session'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {isGraphMode ? (
              <GraphView route={route} stops={stops} />
            ) : (
              <NavigationSession route={route} stops={stops} currentStepIndex={1} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Functional Toggle */}
      <div className="absolute bottom-6 right-6 z-30">
        <button
          onClick={() => setIsGraphMode(!isGraphMode)}
          className="p-3 bg-white border border-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-brand-100 transition-all"
          title={isGraphMode ? 'Switch to List' : 'Switch to Map'}
        >
          {isGraphMode ? <Map size={20} /> : <GitGraph size={20} />}
        </button>
      </div>
    </div>
  );
};
