import { Map, Bus, User, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Map', icon: Map, path: '/' },
  { label: 'Routes', icon: Bus, path: '/routes' },
  { label: 'Search', icon: Search, path: '/search' },
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-20 lg:w-64 h-full bg-white border-r border-gray-200 flex flex-col items-center lg:items-start py-6 transition-all duration-300 z-50">
      <div className="mb-10 px-0 lg:px-6 flex items-center justify-center lg:justify-start w-full">
        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
          B
        </div>
        <span className="ml-3 font-bold text-xl hidden lg:block tracking-tight text-slate-800">
          Busly
        </span>
      </div>

      <nav className="flex-1 w-full px-2 lg:px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center p-3 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900',
              )}
            >
              <item.icon className={clsx('w-6 h-6', isActive ? 'stroke-[2.5px]' : 'stroke-2')} />
              <span
                className={clsx('ml-3 font-medium hidden lg:block', isActive && 'font-semibold')}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
