import { MapPin, ArrowRight, Bookmark, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SavedPage() {
  const navigate = useNavigate();

  const savedRoutes = [
    { id: 1, name: 'Home to Work', origin: 'Ikeja', dest: 'Victoria Island', stops: 12 },
    { id: 2, name: 'Gym Route', origin: 'Maryland', dest: 'Surulere', stops: 5 },
  ];

  const savedStops = [
    { id: 's1', name: 'Obalende Underbridge', location: 'Lagos Island' },
    { id: 's2', name: 'Anthony Bus Stop', location: 'Ikorodu Road' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Saved</h1>
          <p className="text-slate-500 font-medium max-w-sm">
            Your personal collection of routes and favorite stops.
          </p>
        </div>
      </div>

      {/* Saved Routes */}
      <section className="relative z-10">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200"></span> Routes
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {savedRoutes.map((route) => (
            <motion.div
              key={route.id}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 transition-all group relative overflow-hidden"
              onClick={() => navigate('/navigation/active')}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-[2rem] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center shadow-inner">
                  <Bookmark size={22} className="fill-brand-600/20" />
                </div>
                <button className="text-slate-300 hover:text-red-400 transition-colors p-2 hover:bg-red-50 rounded-full">
                  <X size={18} />
                </button>
              </div>

              <div className="relative z-10">
                <h3 className="font-extrabold text-xl text-slate-900 mb-1 leading-tight">
                  {route.name}
                </h3>

                <div className="flex items-center gap-3 mt-4 text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl inline-flex group-hover:bg-white group-hover:shadow-sm transition-all">
                  <span>{route.origin}</span>
                  <ArrowRight size={14} className="text-brand-400" />
                  <span>{route.dest}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Saved Stops */}
      <section className="relative z-10">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-slate-200"></span> Frequent Stops
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedStops.map((stop) => (
            <div
              key={stop.id}
              className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                  <MapPin size={22} className="group-hover:fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 mb-0.5">{stop.name}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {stop.location}
                  </p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
