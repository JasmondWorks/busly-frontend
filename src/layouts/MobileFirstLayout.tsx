import { Outlet } from 'react-router-dom';

export default function MobileFirstLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-xl relative flex flex-col">
        {/* Placeholder for Header if needed, but pages often have their own headers */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>

        {/* Simple Bottom Nav Placeholder - Can be made into a component later */}
        <nav className="sticky bottom-0 w-full bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center z-50">
          <div className="flex flex-col items-center gap-1 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px] font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            <span className="text-[10px] font-medium">Map</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-medium">Profile</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
