import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight, Bell, Clock, Star, TrendingUp, BookOpen } from 'lucide-react';
import { ALL_ROUTES } from '@/shared/constants/routes';
import { useAuth } from '@/shared/context/AuthContext';

export default function DriverDashboardPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  // Using the first 3 routes as "Assigned Tasks"
  const assignedRoutes = ALL_ROUTES.slice(0, 3).map((r, i) => ({
    ...r,
    startTime: i === 0 ? '08:00 AM' : i === 1 ? '11:30 AM' : '03:00 PM',
    status: i === 0 ? 'ready' : 'pending',
  }));

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-safe">
      {/* Header */}
      <header className="bg-white p-6 shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-slate-400 font-medium text-sm">Sunday, 31 August</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/driver/notifications')}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center relative hover:bg-slate-100 transition-all border border-transparent hover:border-slate-100 shadow-sm"
              >
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <button
                onClick={() => {
                  if (auth.user?.role === 'driver') {
                    auth.toggleRole();
                  }
                  navigate('/');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-all shadow-sm border border-red-100"
                title="Exit Driver Mode"
              >
                <ArrowRight size={14} className="rotate-180" />
                Exit Mode
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-brand-500 p-5 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-brand-500/20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-5 -mt-5 blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <ClipboardCheck size={16} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">
                    Completed
                  </span>
                </div>
                <div className="text-3xl font-bold">12/15</div>
                <p className="text-brand-100 text-[10px] font-bold mt-1 uppercase tracking-widest">
                  Trips this week
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Star size={16} className="text-orange-400 fill-orange-400" />
                <span className="text-[10px] font-semibold uppercase tracking-widest">Rating</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">4.9</div>
              <p className="text-emerald-500 text-[10px] font-bold mt-1 uppercase tracking-widest flex items-center gap-1">
                <TrendingUp size={12} /> Top 5% Driver
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Timeline Section */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Training & Routes</h2>
            <button
              onClick={() => navigate('/driver/calendar')}
              className="px-4 py-2 bg-white text-brand-600 font-bold text-xs rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              View Calendar
            </button>
          </div>

          <div className="relative pl-4 space-y-8 pb-10">
            {/* Vertical Dotted Line */}
            <div className="absolute left-[21px] top-2 bottom-8 w-0.5 border-l-2 border-dashed border-slate-100"></div>

            {assignedRoutes.map((route, i) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={route.id}
                className="relative pl-8"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 top-6 w-4 h-4 rounded-full border-[3px] z-10 bg-white ${i === 0 ? 'border-brand-500 shadow-[0_0_10px_rgba(79,70,229,0.2)]' : 'border-gray-200'}`}
                ></div>

                <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-brand-100 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                        {route.name}
                      </h3>
                      <div className="flex items-center gap-3 text-slate-400 text-[10px] font-semibold uppercase tracking-widest">
                        <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                          <Clock size={12} />
                          {route.startTime}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <div className="bg-slate-50 px-2 py-1 rounded-md">{route.duration}</div>
                      </div>
                    </div>
                    {i === 0 ? (
                      <span className="px-2.5 py-1 bg-brand-600 text-white text-[9px] font-semibold uppercase tracking-widest rounded-lg shadow-lg shadow-brand-500/20">
                        Next Route
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-400 text-[9px] font-semibold uppercase tracking-widest rounded-lg">
                        Scheduled
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate(`/driver/learning/${route.id}`)}
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-transparent active:scale-95 whitespace-nowrap"
                    >
                      <BookOpen size={18} /> Study Route
                    </button>
                    <button
                      onClick={() => navigate(`/driver/active/${route.id}`)}
                      className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-95 group/btn whitespace-nowrap shadow-sm hover:shadow-md ${
                        i === 0
                          ? 'bg-slate-900 text-white hover:bg-brand-600 shadow-lg shadow-slate-900/10'
                          : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      Start Shift{' '}
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
