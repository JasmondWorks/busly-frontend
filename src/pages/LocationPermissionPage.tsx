import { useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle } from 'lucide-react';

export default function LocationPermissionPage() {
  const navigate = useNavigate();

  const handleAllow = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 max-w-md mx-auto justify-center">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="w-28 h-28 bg-brand-50 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-brand-100 rounded-full animate-ping opacity-20"></div>
          <MapPin className="text-brand-600 w-12 h-12 fill-brand-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Enable Location</h1>
        <p className="text-gray-500 leading-relaxed mb-8 max-w-xs">
          Busly uses your location to show nearby stops and faster routes. This is optional, but it
          helps.
        </p>

        {/* Privacy Note */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-start text-left gap-3 w-full mb-8 border border-gray-100">
          <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            Your location is never stored or shared. It's only used for this session.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 mb-8">
        <button
          onClick={handleAllow}
          className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 active:scale-95 transition-all"
        >
          Allow Location Access
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
