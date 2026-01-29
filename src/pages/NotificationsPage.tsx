import { ArrowLeft, CheckCircle2, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: 'Route Update',
      message: 'Express Route 42 has a new stop at Lekki Phase 1.',
      time: '2m ago',
      type: 'info',
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      unread: true,
    },
    {
      id: 2,
      title: 'Achievement Unlocked',
      message: 'You have contributed 10 stop validations this week!',
      time: '1h ago',
      type: 'success',
      icon: CheckCircle2,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      unread: true,
    },
    {
      id: 3,
      title: 'Reminder',
      message: 'Your shift starts in 30 minutes.',
      time: '3h ago',
      type: 'reminder',
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          </div>
          <button className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors">
            Clear all
          </button>
        </header>

        <div className="space-y-4">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                notif.unread
                  ? 'bg-white border-brand-100 shadow-lg shadow-brand-900/5'
                  : 'bg-white/60 border-gray-100 grayscale-[0.5] opacity-80'
              }`}
            >
              {notif.unread && (
                <div className="absolute top-6 left-0 w-1 h-8 bg-brand-500 rounded-r-full"></div>
              )}
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.bgColor} ${notif.color}`}
                >
                  <notif.icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{notif.title}</h3>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-12 text-center py-10 border-2 border-dashed border-gray-200 rounded-3xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-gray-400 font-semibold">You're all caught up!</p>
        </section>
      </div>
    </div>
  );
}
