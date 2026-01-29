import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Compass, Map, User, Settings, Navigation, Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResponsiveLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD] flex text-gray-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 h-screen sticky top-0 shadow-2xl shadow-gray-200/50 z-40">
        <div className="p-8 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-300">
            <span className="font-extrabold text-xl text-white">B</span>
          </div>
          <span className="font-black text-2xl tracking-tighter text-gray-900">
            Busly<span className="text-brand-600">.</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          <NavItem to="/" icon={<Home size={20} />} label="Home" />
          <NavItem to="/routes" icon={<Compass size={20} />} label="Routes" />
          <NavItem to="/search" icon={<Navigation size={20} />} label="Search" />
          <NavItem to="/saved" icon={<Map size={20} />} label="Saved" />
          <NavItem to="/contribute" icon={<Shield size={20} />} label="Contribute" />
          <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
        </nav>

        <div className="px-4 border-t border-gray-100 mt-auto pt-4 mb-8">
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-30 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg text-white">B</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              Busly<span className="text-brand-600">.</span>
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden sticky bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 py-3 px-6 flex justify-between items-center z-30 pb-safe shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
          <MobileNavItem to="/" icon={<Home size={24} />} label="Home" />
          <MobileNavItem to="/routes" icon={<Compass size={24} />} label="Routes" />
          <MobileNavItem to="/saved" icon={<Map size={24} />} label="Saved" />
          <MobileNavItem to="/profile" icon={<User size={24} />} label="Profile" />
        </nav>
      </main>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <span className="font-black text-xl tracking-tighter text-gray-900">Menu</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <DrawerItem
                  to="/"
                  icon={<Home size={20} />}
                  label="Home"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <DrawerItem
                  to="/routes"
                  icon={<Compass size={20} />}
                  label="Routes"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <DrawerItem
                  to="/search"
                  icon={<Navigation size={20} />}
                  label="Search"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <DrawerItem
                  to="/contribute"
                  icon={<Shield size={20} />}
                  label="Contribute"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <DrawerItem
                  to="/saved"
                  icon={<Map size={20} />}
                  label="Saved"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <DrawerItem
                  to="/profile"
                  icon={<User size={20} />}
                  label="Profile"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <div className="h-px bg-gray-100 my-2"></div>
                <DrawerItem
                  to="/settings"
                  icon={<Settings size={20} />}
                  label="Settings"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium group relative overflow-hidden ${
          isActive
            ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`
      }
    >
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{label}</span>
      {/* Active Dot */}
    </NavLink>
  );
}

function MobileNavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-all ${
          isActive ? 'text-brand-600 scale-105 font-bold' : 'text-gray-400 hover:text-gray-600'
        }`
      }
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </NavLink>
  );
}

function DrawerItem({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-medium ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
