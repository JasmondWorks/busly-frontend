import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bus,
  ChevronsRight,
  Map,
  ArrowRightLeft,
  Users,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StopDecisionPage() {
  const navigate = useNavigate();
  const { stopId } = useParams();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  // Mock Context
  const currentStop = {
    name: stopId ? stopId.charAt(0).toUpperCase() + stopId.slice(1) : 'Obalende Underbridge',
    // Swapped to a reliable city transit image
    image:
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop',
  };

  const alternateRoutes = [
    {
      id: 'r1',
      destination: 'Lekki Phase 1',
      time: '25 mins',
      stops: 4,
      transfers: 0,
      reliability: 98,
      familiarity: 'High',
      tag: 'Fastest',
      tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: 'r2',
      destination: 'Victoria Island (Alt)',
      time: '35 mins',
      stops: 6,
      transfers: 1,
      reliability: 85,
      familiarity: 'Medium',
      tag: 'Less Walking',
      tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      id: 'r3',
      destination: 'Ikoyi (Falomo)',
      time: '40 mins',
      stops: 8,
      transfers: 1,
      reliability: 70,
      familiarity: 'Low',
      tag: 'Congested',
      tagColor: 'bg-orange-100 text-orange-700 border-orange-200',
    },
  ];

  const handleRouteSwitch = (routeId: string) => {
    navigate('/navigation/active');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] relative font-sans">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-900/5 to-transparent pointer-events-none"></div>

      {/* Header Image Area */}
      <div className="relative h-72 w-full shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
        <img
          src={currentStop.image}
          alt={currentStop.name}
          className="w-full h-full object-cover"
        />

        {/* Nav Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
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
              Live Decision
            </span>
          </div>
        </div>

        {/* Stop Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 pb-16 z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              You are at
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
              {currentStop.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content Card (Glass Sheet) */}
      <div className="flex-1 bg-[#FDFDFD] -mt-8 rounded-t-[2.5rem] relative z-30 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
        {/* Decorative Handle */}
        <div className="w-full h-6 flex justify-center items-center pt-2 opacity-20">
          <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        <div className="px-8 pt-2 pb-6 text-center">
          <p className="text-gray-400 font-medium text-sm">
            Tap a route below to view details & compare.
          </p>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 px-4 md:px-8 pb-24 overflow-y-auto space-y-4">
          {alternateRoutes.map((route, i) => (
            <motion.div
              key={route.id}
              layoutId={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => setSelectedRouteId(route.id === selectedRouteId ? null : route.id)}
              className={`
                        relative overflow-hidden rounded-[2rem] p-6 border transition-all cursor-pointer group
                        ${
                          selectedRouteId === route.id
                            ? 'bg-white border-brand-200 shadow-xl shadow-brand-900/5 ring-1 ring-brand-100'
                            : 'bg-white border-gray-100 shadow-sm hover:border-brand-100 hover:shadow-lg hover:shadow-brand-900/5'
                        }
                    `}
            >
              {/* Main Row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-colors ${selectedRouteId === route.id ? 'bg-brand-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}
                  >
                    <Bus size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">
                      {route.destination}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${route.tagColor} bg-opacity-50`}
                      >
                        {route.tag}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">• {route.time}</span>
                    </div>
                  </div>
                </div>
                {selectedRouteId !== route.id && (
                  <ChevronsRight className="text-gray-300 group-hover:text-brand-400 transition-colors" />
                )}
              </div>

              {/* Expanded Details (Comparison View) */}
              <AnimatePresence>
                {selectedRouteId === route.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100 mt-6 pt-6"
                  >
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                        <div className="text-gray-400 mb-1 flex justify-center">
                          <Map size={18} />
                        </div>
                        <div className="text-xl font-black text-gray-900">{route.stops}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Stops
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                        <div className="text-gray-400 mb-1 flex justify-center">
                          <ArrowRightLeft size={18} />
                        </div>
                        <div className="text-xl font-black text-gray-900">{route.transfers}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Transfers
                        </div>
                      </div>
                      <div className="bg-gray-50/50 p-3 rounded-2xl text-center border border-gray-100">
                        <div className="text-gray-400 mb-1 flex justify-center">
                          <ShieldCheck size={18} />
                        </div>
                        <div className="text-xl font-black text-emerald-600">
                          {route.reliability}%
                        </div>
                        <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Reliable
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900">
                      <Users size={16} className="mt-0.5 text-blue-500 shrink-0" />
                      <span className="text-sm font-medium leading-normal">
                        <strong>Verified recently:</strong> "Buses are moving fast on this route
                        today."
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRouteSwitch(route.id);
                      }}
                      className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Zap size={18} className="fill-white" /> Start Navigation
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
      </div>
    </div>
  );
}
