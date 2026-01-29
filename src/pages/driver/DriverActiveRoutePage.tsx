import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, AlertTriangle, Flag, Map as MapIcon } from 'lucide-react';
import { ALL_ROUTES } from '@/shared/constants/routes';
import { ROUTE_WAYPOINTS } from '@/shared/constants/landmarks';

export default function DriverActiveRoutePage() {
  const navigate = useNavigate();
  const { routeId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const route = ALL_ROUTES.find((r) => r.id === routeId) || ALL_ROUTES[0];
  const waypoints = ROUTE_WAYPOINTS[route.id] || ROUTE_WAYPOINTS['1']; // Fallback to '1' for demo

  // State
  const [speed, setSpeed] = useState(0);
  const [speedLimit] = useState(60);
  const [isOverspeeding, setIsOverspeeding] = useState(false);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const [distanceToNext, setDistanceToNext] = useState(0.8); // km
  const [showEndModal, setShowEndModal] = useState(false);
  const isSimulated = true;

  // Derived
  const currentWaypoint = waypoints[currentWaypointIndex];
  // const nextWaypoint = waypoints[currentWaypointIndex + 1];

  // Simulation: Speed & Distance
  useEffect(() => {
    if (!isSimulated) return;

    const interval = setInterval(() => {
      setSpeed((prev) => {
        // Random fluctuation
        const change = Math.random() > 0.5 ? 1 : -1;
        const noise = Math.floor(Math.random() * 3);
        let newSpeed = prev + change + noise;

        // Overspeeding simulation occasionally
        if (Math.random() > 0.95) newSpeed += 10;
        if (Math.random() > 0.9) newSpeed -= 5;

        return Math.min(Math.max(newSpeed, 0), 85);
      });

      // Decrease distance locally
      setDistanceToNext((prev) => {
        const newDist = prev - 0.01;
        if (newDist <= 0) {
          // Advance to next waypoint if available
          if (currentWaypointIndex < waypoints.length - 1) {
            setCurrentWaypointIndex((curr) => curr + 1);
            return (
              (waypoints[currentWaypointIndex + 1]?.distanceFromStart || 0) -
              (waypoints[currentWaypointIndex]?.distanceFromStart || 0)
            ); // Rough est
          }
          return 0;
        }
        return newDist;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulated, currentWaypointIndex, waypoints]);

  // Check Speed Limit
  useEffect(() => {
    if (speed > speedLimit) {
      if (!isOverspeeding) setIsOverspeeding(true);
    } else {
      if (isOverspeeding) setIsOverspeeding(false);
    }
  }, [speed, speedLimit, isOverspeeding]);

  const progressPercentage = (currentWaypointIndex / (waypoints.length - 1 || 1)) * 100;

  return (
    <div
      className={`h-screen w-full flex flex-col md:flex-row overflow-hidden font-sans transition-colors duration-500 ${isOverspeeding ? 'bg-red-600' : 'bg-slate-950'} text-white`}
    >
      {/* LEFT PANEL: Driving Instruments (Mobile: Top) */}
      <div className="h-[28vh] md:h-screen md:flex-1 flex flex-col relative p-4 md:p-8 shrink-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Active Route
            </h2>
            <h1 className="text-xl md:text-2xl font-bold truncate max-w-[200px] md:max-w-md">
              {route.name}
            </h1>
          </div>

          <div className="bg-slate-800/50 p-2 rounded-lg backdrop-blur-sm border border-slate-700">
            <div className="text-xs text-slate-400 font-bold uppercase text-center mb-1">Limit</div>
            <div
              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-xl ${isOverspeeding ? 'border-white bg-red-500 text-white' : 'border-red-500 bg-white text-slate-900'}`}
            >
              {speedLimit}
            </div>
          </div>
        </header>

        {/* Speedometer */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative z-10 text-center">
            <span className="text-slate-400 font-bold uppercase text-sm tracking-wider block mb-2">
              Current Speed
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span
                className={`text-[5rem] md:text-[10rem] font-black leading-none tracking-tighter tabular-nums ${isOverspeeding ? 'animate-pulse text-white' : 'text-white'}`}
              >
                {Math.max(0, Math.floor(speed))}
              </span>
              <span className="text-lg md:text-2xl font-bold text-slate-500">km/h</span>
            </div>
          </div>

          {/* Animated Ring (Decoration) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div
              className={`w-64 h-64 md:w-96 md:h-96 rounded-full border-20 ${isOverspeeding ? 'border-white animate-ping' : 'border-slate-800'}`}
            ></div>
          </div>
        </div>

        {/* Overspeeding Alert */}
        <AnimatePresence>
          {isOverspeeding && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 bg-white text-red-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-lg md:text-xl flex items-center gap-3 shadow-2xl animate-bounce z-20 whitespace-nowrap"
            >
              <AlertTriangle fill="currentColor" size={24} /> SLOW DOWN
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT PANEL: Route Learning & Timeline (Mobile: Bottom Sheet style) */}
      <div className="flex-1 md:max-w-md bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col relative z-10 shadow-2xl">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-800 w-full">
          <motion.div
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Current Instruction Card (Prominent) */}
        <div className="p-4 md:p-6 border-b border-slate-800 bg-slate-800/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-brand-500/20 text-brand-400">
              <Navigation size={24} fill="currentColor" />
            </div>
            <span className="text-brand-400 font-bold uppercase tracking-wider text-sm">
              Next Action
            </span>
            <span className="ml-auto text-white font-mono font-bold text-xs md:text-base">
              {distanceToNext.toFixed(2)} km
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-white leading-tight mb-2">
            {currentWaypoint?.detail || currentWaypoint?.label}
          </h2>

          {/* Visual Cue / Landmark Image */}
          {currentWaypoint?.imageUrl && (
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-700 relative aspect-16/6 md:aspect-video group">
              <img
                src={currentWaypoint.imageUrl}
                alt="Landmark"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 to-transparent p-3 md:p-4">
                <span className="text-white font-bold flex items-center gap-2 text-xs md:text-base">
                  <MapIcon size={14} /> Look for: {currentWaypoint.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-4">
            Upcoming Route
          </h3>

          {waypoints.map((point, index) => {
            const isActive = index === currentWaypointIndex;
            const isPast = index < currentWaypointIndex;

            return (
              <div
                key={point.id}
                className={`flex gap-4 ${isPast ? 'opacity-30' : isActive ? 'opacity-100' : 'opacity-50'}`}
              >
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 z-10 ${isActive ? 'bg-brand-500 border-brand-500 shadow-lg shadow-brand-500/50' : isPast ? 'bg-slate-700 border-slate-700' : 'bg-slate-800 border-slate-600'}`}
                  />
                  {index !== waypoints.length - 1 && (
                    <div className={`w-0.5 flex-1 ${isPast ? 'bg-slate-700' : 'bg-slate-800'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 pt-0.5">
                  <h4
                    className={`text-lg font-bold leading-none mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`}
                  >
                    {point.label}
                  </h4>
                  <p className="text-sm text-slate-500">{point.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 pb-safe">
          <button
            onClick={() => setShowEndModal(true)}
            className="w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 hover:text-red-400 font-bold py-4 rounded-xl flex items-center justify-center gap-2 border border-red-600/20 transition-all"
          >
            <Flag size={20} /> End Route Session
          </button>
        </div>
      </div>

      {/* End Session Modal */}
      <AnimatePresence>
        {showEndModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-md p-8 text-center"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flag size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Route Complete?</h2>
              <p className="text-slate-400 mb-8">
                Confirming will log this session to your driver history.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/driver')}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-brand-600/20"
                >
                  Yes, Finish Route
                </button>
                <button
                  onClick={() => setShowEndModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-lg"
                >
                  Return to Navigation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
