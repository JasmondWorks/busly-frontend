import { User, Award, Map, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const user = {
    name: 'Jasmond',
    email: 'jasmond@busly.app',
    trips: 42,
    savedCarbon: '12kg',
    level: 'Commuter Pro',
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="relative text-center p-8 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden shadow-2xl shadow-slate-900/10">
        {/* Abstract pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,white_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[100%] bg-brand-600/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 p-1 mb-5 shadow-xl shadow-brand-500/20">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white border-[3px] border-slate-900">
              <User size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1">{user.name}</h1>
          <p className="text-slate-400 font-medium text-sm mb-6">{user.email}</p>
          <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-brand-300 text-xs font-bold uppercase tracking-widest rounded-full">
            {user.level}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 text-center shadow-sm hover:border-blue-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <Map size={24} className="fill-blue-600/20" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
            {user.trips}
          </div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Total Trips
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 text-center shadow-sm hover:border-green-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 mx-auto bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-3">
            <TrendingUp size={24} />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
            {user.savedCarbon}
          </div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            CO2 Saved
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 text-center shadow-sm hover:border-orange-100 hover:shadow-md transition-all">
          <div className="w-12 h-12 mx-auto bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-3">
            <Award size={24} className="fill-orange-600/20" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">
            4.9
          </div>
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Rating
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <h3 className="font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-500"></span> Recent Activity
        </h3>
        <div className="space-y-8 relative pl-2">
          <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-slate-100 rounded-full"></div>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex gap-6 relative z-10 group">
              <div className="w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white shrink-0 mt-1.5 group-hover:bg-brand-500 transition-colors shadow-sm"></div>
              <div className="flex-1">
                <p className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  Trip to Victoria Island
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    Yesterday
                  </span>
                  <span className="text-xs font-bold text-slate-400">45 mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
