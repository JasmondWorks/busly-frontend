import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacySecurityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/10 p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-br from-brand-600 to-brand-800 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
              B
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Privacy & Security</h1>
          </div>
        </header>

        <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-600">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your Data is Safe</h2>
          <p className="text-slate-600 font-medium">
            Manage your privacy preferences and account security.
          </p>
        </div>
      </div>
    </div>
  );
}
