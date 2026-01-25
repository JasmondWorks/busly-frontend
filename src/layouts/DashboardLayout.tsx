import { Outlet } from 'react-router-dom';
import Sidebar from '@/shared/ui/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
