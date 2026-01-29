import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Power, ClipboardCheck, ArrowRight, Bell } from 'lucide-react';
import { ALL_ROUTES } from '@/shared/constants/routes';

export default function DriverDashboardPage() {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Mock assigned route for the day
  const assignedRoutes = ALL_ROUTES.slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-safe">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Driver Mode</h1>
            <p className="text-slate-400 font-medium">Good Morning, Jasmond</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center relative">
            <Bell size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col items-center gap-4 active:scale-95 transition-transform"
            onClick={() => navigate('/driver/vehicle-check')}
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <ClipboardCheck size={32} />
            </div>
            <span className="font-bold text-slate-900 text-lg">Vehicle Check</span>
          </button>
          <button
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col items-center gap-4 active:scale-95 transition-transform opacity-50 grayscale"
            disabled
          >
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Power size={32} />
            </div>
            <span className="font-bold text-slate-900 text-lg">Shift Ended</span>
          </button>
        </div>

        {/* Assigned Routes */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4 px-2">Today's Routes</h2>

          <div className="space-y-4">
            {assignedRoutes.map((route) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedRoute(route.id)}
                className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
                  selectedRoute === route.id
                    ? 'bg-brand-900 border-brand-900 text-white shadow-xl scale-[1.02]'
                    : 'bg-white border-transparent shadow-sm text-slate-900'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                      {route.id === 'r1' ? '08:00 AM' : '10:30 AM'}
                    </span>
                    <h3 className="text-2xl font-black">{route.name}</h3>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-3xl font-black ${selectedRoute === route.id ? 'text-brand-400' : 'text-slate-900'}`}
                    >
                      {route.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-base font-bold opacity-80">
                  <span>{route.from}</span>
                  <ArrowRight size={20} />
                  <span>{route.to}</span>
                </div>

                {selectedRoute === route.id && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/driver/active/${route.id}`);
                    }}
                    className="w-full mt-6 bg-brand-500 hover:bg-brand-400 text-white font-black py-4 rounded-xl text-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    START ROUTE <ArrowRight strokeWidth={3} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
