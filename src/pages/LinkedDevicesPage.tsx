import { Smartphone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LinkedDevicesPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
              B
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Linked Devices</h1>
          </div>
        </header>
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <Smartphone size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Device Management</h2>
          <p className="text-gray-500 font-medium">
            View and manage all devices currently logged into your Busly account.
          </p>
        </div>
      </div>
    </div>
  );
}
