import { Bell, MoreVertical } from 'lucide-react';

interface NavigationHeaderProps {
  nextStop: string;
  arrivalTime: string;
  isAlighting?: boolean;
}

export function NavigationHeader({ nextStop, arrivalTime, isAlighting }: NavigationHeaderProps) {
  return (
    <header
      className={`relative overflow-hidden ${isAlighting ? 'bg-orange-500' : 'bg-brand-600'} text-white p-4 md:p-6 shadow-xl shadow-brand-900/10 transition-colors duration-500 rounded-b-[2rem] md:rounded-b-none shrink-0 z-20`}
    >
      {/* Background Texture & Shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white_1px,_transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div>
            <div
              className={`inline-block px-2 py-1 rounded-md mb-1 md:mb-2 text-[10px] font-bold uppercase tracking-widest border border-white/20 ${isAlighting ? 'bg-orange-600/50' : 'bg-brand-700/50'} backdrop-blur-sm`}
            >
              {isAlighting ? 'Get Ready to Alight' : 'Next Stop'}
            </div>
            <h1 className="text-2xl md:text-3xl font-black leading-none tracking-tight">
              {nextStop}
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Bell size={18} />
            </button>
            <button className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl md:text-6xl font-black tracking-tighter tabular-nums">
            {arrivalTime}
          </span>
          <span className="text-brand-100 text-base md:text-lg font-bold">mins</span>
        </div>
      </div>
    </header>
  );
}
