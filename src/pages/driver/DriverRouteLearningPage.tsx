import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, AlertTriangle, Navigation, ArrowRight, Eye } from 'lucide-react';
import { ALL_ROUTES } from '@/shared/constants/routes';
import { ROUTE_WAYPOINTS } from '@/shared/constants/landmarks';

export default function DriverRouteLearningPage() {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const route = ALL_ROUTES.find((r) => r.id === routeId) || ALL_ROUTES[0];
  const waypoints = ROUTE_WAYPOINTS[route.id] || ROUTE_WAYPOINTS['1'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-safe">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-4 hover:text-slate-900"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div>
          <span className="inline-block px-2 py-1 bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-wider rounded-md mb-2">
            Route Learning Mode
          </span>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            Study Route: <br />
            <span className="text-brand-600">{route.name}</span>
          </h1>
        </div>
      </div>

      <main className="p-6 space-y-8">
        {/* Intro Card */}
        <div className="bg-indigo-600 rounded-[1.5rem] p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Eye className="text-indigo-200" /> Visual Verification
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed mb-4">
              Review these critical landmarks and turns before starting. Memorizing visual cues
              reduces distraction while driving.
            </p>
          </div>
          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
        </div>

        {/* Timeline of Landmarks */}
        <section className="relative pl-4 space-y-8">
          {/* Thread Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

          {waypoints.map((point) => (
            <div key={point.id} className="relative pl-12">
              {/* Connector Dot */}
              <div
                className={`absolute left-0 top-6 w-14 h-14 rounded-full flex items-center justify-center border-[4px] z-10 bg-white ${point.type === 'landmark' ? 'border-indigo-500 text-indigo-500' : 'border-slate-200 text-slate-400'}`}
              >
                {point.type === 'landmark' ? (
                  <Navigation size={20} />
                ) : point.type === 'stop' ? (
                  <MapPin size={20} />
                ) : (
                  <AlertTriangle size={20} />
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Image Header if available */}
                {point.imageUrl && (
                  <div className="h-40 w-full relative">
                    <img
                      src={point.imageUrl}
                      alt={point.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                        Visual Cue
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {point.distanceFromStart} km marker
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-1">{point.label}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {point.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Start Button */}
        <div className="sticky bottom-4 z-40">
          <button
            onClick={() => navigate(`/driver/active/${route.id}`)}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-slate-900/30 flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all"
          >
            I've Memorized the Route <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
