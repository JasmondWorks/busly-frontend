import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { NAV_ITEMS } from '@/shared/constants/navigation';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-20 lg:w-72 h-full bg-white border-r border-gray-100 flex flex-col py-8 transition-all duration-300 z-50 relative overflow-hidden shadow-2xl shadow-slate-200/50">
      {/* Brand Logo Area */}
      <div className="mb-12 px-0 lg:px-8 flex items-center justify-center lg:justify-start w-full relative z-10">
        <div className="h-12 w-12 bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-500/30 transform transition-transform hover:scale-110 cursor-pointer">
          B
        </div>
        <span className="ml-4 font-black text-2xl hidden lg:block tracking-tighter text-slate-900">
          Busly<span className="text-brand-600">.</span>
        </span>
      </div>

      <nav className="flex-1 w-full px-3 lg:px-6 space-y-3 relative z-10">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-brand-600 text-white shadow-xl shadow-brand-600/20 translate-x-2'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1',
              )}
            >
              {/* Active State background shape */}
              {isActive && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
              )}

              <item.icon
                className={clsx('w-6 h-6 relative z-10', isActive ? 'stroke-[2.5px]' : 'stroke-2')}
              />
              <span
                className={clsx(
                  'ml-4 text-base font-bold hidden lg:block relative z-10',
                  isActive ? 'font-black tracking-wide' : 'tracking-normal',
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="lg:block hidden ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm relative z-10"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Area mockup */}
      <div className="mt-auto px-3 lg:px-6 relative z-10">
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center lg:justify-start gap-4 cursor-pointer hover:bg-white hover:shadow-lg transition-all group">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white group-hover:ring-brand-200 transition-all">
            <div className="w-full h-full bg-gradient-to-tr from-brand-400 to-purple-400"></div>
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">Jasmond</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
