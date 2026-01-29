import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
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
      <header className="bg-white p-6 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-400 font-medium text-sm">Sunday, 31 August</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center relative hover:bg-slate-100 transition-colors">
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
            className="ml-2 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Exit Driver Mode"
          >
            <ArrowRight size={20} className="rotate-180" />
          </button>
        </div>

        {/* Stats Row (Inspired by Image 4/5) */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="bg-brand-500 p-4 rounded-[1.5rem] text-white relative overflow-hidden shadow-lg shadow-brand-500/20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-5 -mt-5 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 opacity-90">
                <ClipboardCheck size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
              </div>
              <div className="text-3xl font-black">12/15</div>
              <p className="text-brand-100 text-xs mt-1">Trips this week</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Star size={16} className="text-orange-400 fill-orange-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rating
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">4.9</div>
            <p className="text-emerald-500 text-xs font-bold mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Top 5%
            </p>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Timeline Section (Inspired by Image 3) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">Training & Routes</h2>
          <button className="text-brand-600 font-bold text-sm">View Calendar</button>
        </div>

        <div className="relative pl-4 space-y-8">
          {/* Vertical Dotted Line */}
          <div className="absolute left-[21px] top-2 bottom-8 w-0.5 border-l-2 border-dashed border-gray-200"></div>

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
                className={`absolute left-0 top-6 w-4 h-4 rounded-full border-[3px] z-10 bg-white ${i === 0 ? 'border-brand-500' : 'border-gray-300'}`}
              ></div>

              <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">
                      {route.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wide">
                      <Clock size={12} />
                      {route.startTime}
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>{route.duration}</span>
                    </div>
                  </div>
                  {i === 0 ? (
                    <span className="px-2 py-1 bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-wider rounded-md">
                      Next
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider rounded-md">
                      Later
                    </span>
                  )}
                </div>

                {/* Tags/Badges */}
                <div className="flex gap-2 mb-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${
                      route.type === 'Express'
                        ? 'bg-purple-50 text-purple-600 border-purple-100'
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}
                  >
                    {route.type} Line
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/driver/learning/${route.id}`)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gray-50 text-slate-600 hover:bg-gray-100 transition-colors"
                  >
                    <BookOpen size={16} /> Study Route
                  </button>
                  <button
                    onClick={() => navigate(`/driver/active/${route.id}`)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                  >
                    Start <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
