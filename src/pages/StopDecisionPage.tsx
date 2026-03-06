import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Bus,
  ChevronsRight,
  Map as MapIcon,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationMap } from '@/features/navigation/components/NavigationMap';
import { useAlternateRoutes } from '@/hooks/useJourneys';
import { useJourneyStore, flattenStops, formatFare } from '@/store/journey.store';

export default function StopDecisionPage() {
  const navigate = useNavigate();
  const { stopId } = useParams<{ stopId: string }>();
  const { state } = useLocation() as {
    state?: { stopName?: string; currentRouteId?: string; destStopId?: string };
  };

  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const { activeJourney, currentStopIndex } = useJourneyStore();

  const stopName = state?.stopName ?? (stopId ? stopId.replace(/-/g, ' ') : 'Stop');
  const currentRouteId = state?.currentRouteId ?? '';
  const destStopId = state?.destStopId ?? ''; // passed as destinationStopId to the hook

  const { data: alternates = [], isLoading, error } = useAlternateRoutes(
    stopId ?? '',
    currentRouteId,
    destStopId, // maps to destinationStopId in the hook
  );

  // Build mini-map stop list from the active journey
  const mapStops = activeJourney
    ? flattenStops(activeJourney).map((s, i) => ({
        id: s.id,
        name: s.name,
        status: i < currentStopIndex ? 'past' : i === currentStopIndex ? 'current' : 'future',
      }))
    : [];

  const handleRouteSwitch = (routeId: string) => {
    console.log('Switching to route:', routeId);
    navigate('/navigation/active');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] relative font-sans">
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-900/5 to-transparent pointer-events-none"></div>

      {/* Header Image Area */}
      <div className="relative h-64 md:h-72 w-full shrink-0 bg-gradient-to-br from-brand-800 to-brand-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>

        <div className="absolute top-0 left-0 right-0 p-6 flex flex-col gap-4 z-20">
          <div className="flex justify-between items-start">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-lg shadow-black/10">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                Branch Point
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm self-start px-3 py-1.5 rounded-full border border-white/10">
            <span>Active Journey</span>
            <ChevronRight size={10} />
            <span className="text-white">{stopName}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 pb-12 z-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-block px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              Branching from
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg capitalize">
              {stopName}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#FDFDFD] -mt-8 rounded-t-[2.5rem] relative z-30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
        <div className="w-full h-6 flex justify-center items-center pt-2 opacity-20">
          <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Mini Map */}
        {mapStops.length > 0 && (
          <div className="px-6 mb-6">
            <div className="h-40 bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 z-0"></div>
              <div className="relative z-10 w-full h-full scale-[0.8] opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                <NavigationMap stops={mapStops as any} currentStopIndex={currentStopIndex} />
              </div>
              <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm z-20">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Live Branch Preview
                </span>
                <MapIcon size={12} className="text-brand-600" />
              </div>
            </div>
          </div>
        )}

        <div className="px-8 pt-0 pb-6">
          <h2 className="text-xl font-black text-gray-900 mb-1">Alternate Routes</h2>
          <p className="text-gray-400 font-medium text-xs">
            Other ways to continue your journey from{' '}
            <span className="capitalize">{stopName}</span>.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Finding alternatives…</span>
          </div>
        )}

        {/* Error / None */}
        {!isLoading && (error || alternates.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-6 gap-3">
            <AlertCircle className="w-8 h-8 text-gray-300" />
            <p className="text-gray-500 font-medium text-sm">
              {error ? 'Could not load alternates.' : 'No alternate routes at this stop.'}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Alternates List */}
        {!isLoading && !error && alternates.length > 0 && (
          <div className="flex-1 px-4 md:px-8 pb-24 overflow-y-auto space-y-4">
            {alternates.map((route, i) => (
              <motion.div
                key={route.routeId}
                layoutId={route.routeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() =>
                  setSelectedRouteId(
                    route.routeId === selectedRouteId ? null : route.routeId,
                  )
                }
                className={`relative overflow-hidden rounded-[2rem] p-6 border transition-all cursor-pointer group ${
                  selectedRouteId === route.routeId
                    ? 'bg-white border-brand-200 shadow-xl shadow-brand-900/5 ring-1 ring-brand-100'
                    : 'bg-white border-gray-100 shadow-sm hover:border-brand-100 hover:shadow-lg hover:shadow-brand-900/5'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-colors ${
                        selectedRouteId === route.routeId
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'
                      }`}
                    >
                      <Bus size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">
                        {route.routeName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-bold">
                          {route.stopsRemaining} stops remaining
                        </span>
                        {route.requiresTransfer && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-100">
                            Transfer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedRouteId !== route.routeId && (
                    <ChevronsRight className="text-gray-300 group-hover:text-brand-400 transition-colors" />
                  )}
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {selectedRouteId === route.routeId && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100 mt-6 pt-6"
                    >
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                          <div className="text-gray-400 mb-1 flex justify-center">
                            <MapIcon size={18} />
                          </div>
                          <div className="text-xl font-black text-gray-900">
                            {route.stopsRemaining}
                          </div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Stops
                          </div>
                        </div>
                        <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                          <div className="text-gray-400 mb-1 flex justify-center">
                            <ArrowRightLeft size={18} />
                          </div>
                          <div className="text-xl font-black text-gray-900">
                            {route.requiresTransfer ? 1 : 0}
                          </div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Transfers
                          </div>
                        </div>
                        <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                          <div className="text-gray-400 mb-1 flex justify-center">
                            <ShieldCheck size={18} />
                          </div>
                          <div className="text-xl font-black text-emerald-600">
                            {Math.round(route.reliabilityScore ?? 80)}%
                          </div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Reliable
                          </div>
                        </div>
                      </div>

                      {route.estimatedFare > 0 && (
                        <div className="mb-4 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 font-medium">
                          Estimated fare: <strong>{formatFare(route.estimatedFare)}</strong>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRouteSwitch(route.routeId);
                        }}
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Zap size={18} className="fill-white" /> Switch to This Route
                      </button>

                      <p className="text-center text-[10px] font-bold text-gray-300 mt-3 uppercase tracking-widest">
                        Tap again to close
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
