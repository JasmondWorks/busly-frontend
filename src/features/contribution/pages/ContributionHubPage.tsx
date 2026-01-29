import { motion } from 'framer-motion';
import {
  MapPin,
  CheckCircle,
  Plus,
  AlertCircle,
  TrendingUp,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContributionHubPage() {
  const navigate = useNavigate();

  const contributions = [
    { type: 'Validation', desc: 'Verified 5 stops in Lagos Island', points: '+50', time: '2h ago' },
    { type: 'New Stop', desc: 'Added "Marina Junction"', points: '+150', time: '1d ago' },
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 bg-[#FDFDFD] min-h-screen text-gray-900 font-sans relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-brand-50/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100/50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Shield size={14} className="fill-brand-600/20" /> Community
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 leading-[0.9]"
          >
            Shape the <br />
            <span className="text-brand-600">Commute.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium text-lg max-w-md"
          >
            Help thousands of commuters by keeping Busly accurate. Earn trust points for every
            verified action.
          </motion.p>
        </div>

        {/* Trust Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-[2rem] shadow-xl shadow-brand-900/5 flex items-center gap-6 relative overflow-hidden group hover:scale-[1.02] transition-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Your Trust Score
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900">850</span>
              <span className="text-sm font-bold text-emerald-500">Excellent</span>
            </div>
          </div>
          <div className="w-16 h-16 relative z-10">
            {/* Simple SVG Gauge Visualization */}
            <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="4"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="4"
                strokeDasharray="85, 100"
                className="animate-[dash_1.5s_ease-out_forwards]"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 relative z-10">
        {/* Actions Grid */}
        <section className="lg:col-span-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Add Stop Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm cursor-pointer group relative overflow-hidden hover:shadow-xl hover:shadow-brand-900/5 transition-all"
              onClick={() => {
                /* TODO: Navigate to Add Stop Flow */
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all relative z-10">
                <Plus size={28} />
              </div>
              <h3 className="font-extrabold text-2xl text-gray-900 mb-2 relative z-10">
                Add a Stop
              </h3>
              <p className="text-gray-500 font-medium relative z-10">
                Found a new pickup point? Put it on the map for everyone.
              </p>
            </motion.div>

            {/* Validate Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm cursor-pointer group relative overflow-hidden hover:shadow-xl hover:shadow-brand-900/5 transition-all"
              onClick={() => {
                /* TODO: Navigate to Validation Flow */
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all relative z-10">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-extrabold text-2xl text-gray-900 mb-2 relative z-10">Validate</h3>
              <p className="text-gray-500 font-medium relative z-10">
                Verify suggested stops and landmarks. Help keep data clean.
              </p>
            </motion.div>

            {/* Suggest Landmark Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm cursor-pointer group relative overflow-hidden hover:shadow-xl hover:shadow-brand-900/5 transition-all md:col-span-2 flex items-center justify-between"
              onClick={() => {
                /* TODO: Navigate to Landmark Flow */
              }}
            >
              <div className="absolute -left-10 bottom-0 w-48 h-48 bg-blue-50 rounded-tr-[100px] pointer-events-none"></div>
              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-extrabold text-2xl text-gray-900">Suggest a Landmark</h3>
                </div>
                <p className="text-gray-500 font-medium">
                  Add popular landmarks near stops like "Underbridge" or "Shoprite" to help others
                  navigate.
                </p>
              </div>
              <ChevronRight size={24} className="text-gray-300 relative z-10" />
            </motion.div>
          </div>
        </section>

        {/* Activity Sidebar */}
        <section className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Recent Activity
          </h2>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="space-y-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 rounded-full"></div>

              {contributions.map((item, i) => (
                <div key={i} className="flex gap-5 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center shrink-0 shadow-sm">
                    {item.type === 'Validation' ? (
                      <CheckCircle size={16} className="text-emerald-500" />
                    ) : (
                      <Plus size={16} className="text-brand-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{item.type}</h4>
                    <p className="text-sm text-gray-500 font-medium mb-1">{item.desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                        {item.points} pts
                      </span>
                      <span className="text-xs font-bold text-gray-300">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
