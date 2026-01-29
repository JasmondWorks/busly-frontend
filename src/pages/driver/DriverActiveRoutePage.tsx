import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, AlertTriangle, Disc, MapPin, Flag } from 'lucide-react';
import { ALL_ROUTES } from '@/shared/constants/routes';

export default function DriverActiveRoutePage() {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const route = ALL_ROUTES.find((r) => r.id === routeId) || ALL_ROUTES[0];

  const [speed, setSpeed] = useState(0);
  const [speedLimit, setSpeedLimit] = useState(60);
  const [isOverspeeding, setIsOverspeeding] = useState(false);
  const [nextStop, setNextStop] = useState('CMS Terminal');
  const [distance, setDistance] = useState(2.4); // km
  const [showEndModal, setShowEndModal] = useState(false);

  // Simulate Driving Physics
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const change = Math.random() > 0.5 ? 2 : -2;
        const newSpeed = Math.min(Math.max(prev + change, 0), 85); // Cap at 85
        return newSpeed;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check Overspeeding
  useEffect(() => {
    if (speed > speedLimit) {
      if (!isOverspeeding) {
        // Trigger Audio Warning here in real app
        setIsOverspeeding(true);
      }
    } else {
      setIsOverspeeding(false);
    }
  }, [speed, speedLimit]);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 flex flex-col ${isOverspeeding ? 'bg-red-500' : 'bg-slate-900'} text-white pb-safe`}
    >
      {/* Top Bar: Speed & Status */}
      <header className="p-6 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-slate-400 font-bold uppercase text-sm tracking-wider mb-1">
            Current Speed
          </span>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-8xl font-black tabular-nums leading-none tracking-tighter ${isOverspeeding ? 'text-white animate-pulse' : 'text-white'}`}
            >
              {speed}
            </span>
            <span className="text-2xl font-bold text-slate-500">km/h</span>
          </div>
        </div>

        {/* Speed Limit Indicator */}
        <div className="w-24 h-24 rounded-full border-[6px] border-red-500 bg-white flex flex-col items-center justify-center text-slate-900 shadow-xl shadow-red-500/20">
          <span className="text-4xl font-black leading-none mt-1">{speedLimit}</span>
          <span className="text-[10px] font-bold uppercase">Limit</span>
        </div>
      </header>

      {/* Main Instruction Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 relative">
        <AnimatePresence>
          {isOverspeeding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-10 inset-x-0 flex justify-center z-10"
            >
              <div className="bg-red-600 text-white px-8 py-4 rounded-full font-black text-xl flex items-center gap-3 shadow-lg animate-bounce">
                <AlertTriangle fill="currentColor" /> SLOW DOWN
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center mb-4 relative z-0">
          <div className="absolute inset-0 border-4 border-slate-700/50 rounded-full animate-ping opacity-20"></div>
          <Navigation size={80} className="text-brand-400" fill="currentColor" strokeWidth={0} />
        </div>

        <div>
          <h2 className="text-slate-400 font-bold uppercase text-lg tracking-widest mb-2">
            Next Stop
          </h2>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-lg mx-auto">
            {nextStop}
          </h1>
          <p className="text-slate-500 font-bold text-2xl mt-4 flex items-center justify-center gap-2">
            <MapPin size={24} /> {distance} km away
          </p>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="p-6">
        <button
          onClick={() => setShowEndModal(true)}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-6 rounded-3xl text-xl flex items-center justify-center gap-3 transition-colors border-2 border-slate-800 hover:border-slate-600"
        >
          <Flag /> END ROUTE
        </button>
      </footer>

      {/* End Route Modal */}
      <AnimatePresence>
        {showEndModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-[2rem] w-full max-w-md p-8 text-slate-900"
            >
              <h2 className="text-3xl font-black mb-2">End Route?</h2>
              <p className="text-slate-500 font-medium mb-8 text-lg">
                Are you sure you want to complete this route? This will log your arrival time.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/driver')}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg shadow-brand-500/30"
                >
                  Confirm Completion
                </button>
                <button
                  onClick={() => setShowEndModal(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl text-xl"
                >
                  Resume Driving
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
