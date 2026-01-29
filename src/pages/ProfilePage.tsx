import {
  User,
  Award,
  Map,
  TrendingUp,
  Smartphone,
  Laptop,
  ShieldCheck,
  Zap,
  MoreVertical,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = {
    name: 'Jasmond',
    email: 'jasmond@busly.app',
    trips: 42,
    savedCarbon: '12kg',
    level: 'Commuter Pro',
  };

  const achievements = [
    {
      title: 'Eco Warrior',
      desc: 'Saved 10kg of CO2',
      icon: <Zap size={18} />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Pathfinder',
      desc: 'Discovered 5 routes',
      icon: <Map size={18} />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Early Bird',
      desc: 'First trip before 6AM',
      icon: <Award size={18} />,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50/30 relative">
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 relative z-10">
        {/* Page Header with Logo */}
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Column: Profile Card & Stats */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-900/20"
            >
              {/* Abstract pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,white_1px,transparent_1px)] bg-size-[20px_20px]"></div>
              <div className="absolute top-[-50%] left-[-20%] w-[150%] h-full bg-brand-600/20 blur-3xl rounded-full"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-brand-400 to-brand-600 p-1 mb-5 shadow-xl shadow-brand-500/20">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white border-4 border-slate-900">
                    <User size={40} />
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">{user.name}</h1>
                <p className="text-slate-400 font-medium text-sm mb-6">{user.email}</p>
                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-brand-300 text-[10px] font-semibold uppercase tracking-widest rounded-full mb-6">
                  {user.level} {auth.user?.role === 'driver' && '• Driver Mode'}
                </div>

                <button
                  onClick={() => {
                    const isCurrentlyDriver = auth.user?.role === 'driver';
                    auth.toggleRole();
                    if (isCurrentlyDriver) navigate('/');
                    else navigate('/driver');
                  }}
                  className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-100 transition-all active:scale-95"
                >
                  Switch to {auth.user?.role === 'driver' ? 'Commuter' : 'Driver'} View
                </button>
              </div>
            </motion.div>

            {/* Quick Stats Integrated */}
            <div className="grid grid-cols-1 gap-4">
              <StatCard
                icon={<Map size={24} />}
                value={user.trips.toString()}
                label="Total Trips"
                color="blue"
              />
              <StatCard
                icon={<TrendingUp size={24} />}
                value={user.savedCarbon}
                label="CO2 Offset"
                color="emerald"
              />
              <StatCard
                icon={<Award size={24} />}
                value="4.9"
                label="Safety Rating"
                color="orange"
              />
            </div>
          </div>

          {/* Right Column: Detailed Sections */}
          <div className="lg:col-span-8 mt-10 lg:mt-0 space-y-8">
            {/* Recent Activity Section */}
            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/20 transition-all">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-xl text-slate-900 uppercase tracking-tight flex items-center gap-3">
                  <div className="w-2 h-6 bg-brand-500 rounded-full"></div>
                  Recent Activity
                </h3>
                <button className="text-xs font-semibold uppercase text-brand-600 tracking-widest hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-8 relative pl-2">
                <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-slate-50 rounded-full"></div>
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-6 relative z-10 group">
                    <div className="w-4 h-4 rounded-full bg-slate-100 ring-4 ring-white shrink-0 mt-1.5 group-hover:bg-brand-500 transition-all shadow-sm"></div>
                    <div className="flex-1 bg-slate-50/50 p-4 rounded-xl group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-base font-bold text-slate-900">
                          Trip to Victoria Island
                        </p>
                        <span className="text-[10px] font-semibold text-brand-500 uppercase">
                          Completed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400">Yesterday • 4.5km</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-xs font-bold text-slate-400">₦800</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-slate-50 bg-slate-50/30 flex flex-col items-center text-center hover:bg-white hover:border-brand-100 hover:shadow-lg hover:shadow-brand-900/5 transition-all group"
                  >
                    <div
                      className={`${ach.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {ach.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{ach.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {ach.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Linked Devices & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Smartphone className="text-brand-600" size={20} />
                  <h3 className="font-bold text-lg text-slate-900 uppercase tracking-tight">
                    Active Devices
                  </h3>
                </div>
                <div className="space-y-4">
                  <DeviceRow
                    icon={<Smartphone size={18} />}
                    name="iPhone 15 Pro"
                    lastActive="Active Now"
                    current
                  />
                  <DeviceRow
                    icon={<Laptop size={18} />}
                    name="MacBook Pro 14"
                    lastActive="2 hours ago"
                  />
                </div>
              </section>

              <section className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                  <ShieldCheck size={80} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl mb-2 tracking-tight">Security Score</h3>
                    <p className="text-slate-400 text-sm font-medium">
                      Your account is well protected.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                    <span className="font-bold text-emerald-400 text-sm">85%</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'blue' | 'emerald' | 'orange';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 fill-blue-600/20 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 fill-emerald-600/20 border-emerald-100',
    orange: 'bg-orange-50 text-orange-600 fill-orange-600/20 border-orange-100',
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/20 hover:${colors[color].split(' ')[3]} transition-all group`}
    >
      <div
        className={`${colors[color].split(' ').slice(0, 2).join(' ')} w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900 tracking-tight leading-none mb-1">
          {value}
        </div>
        <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">
          {label}
        </div>
      </div>
    </div>
  );
}

function DeviceRow({
  icon,
  name,
  lastActive,
  current,
}: {
  icon: React.ReactNode;
  name: string;
  lastActive: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-600 shadow-sm transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {lastActive}
          </p>
        </div>
      </div>
      {current ? (
        <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
          This Device
        </span>
      ) : (
        <MoreVertical size={16} className="text-slate-300 cursor-pointer hover:text-slate-600" />
      )}
    </div>
  );
}
