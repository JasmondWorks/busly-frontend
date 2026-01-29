import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RouteResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const origin = searchParams.get('origin') || 'Ikeja';
  const destination = searchParams.get('dest') || 'VI';

  const routes = [
    {
      id: 1,
      option: '3 stops',
      transfer: '1 transfer',
      duration: '45 mins',
      confidence: '95% community-backed',
      steps: [
        { name: 'Ikeja Bus Stop', detail: 'Shopping Mall area', color: 'bg-brand-600' },
        { name: 'Lekki Phase 1', detail: 'Near roundabout', color: 'bg-gray-200' },
        { name: 'VI', detail: 'Business district', color: 'bg-orange-500' },
      ],
      isPrimary: true,
    },
    {
      id: 2,
      option: '4 stops',
      transfer: '2 transfers',
      duration: '52 mins',
      steps: [],
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 bg-grid-pattern flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl p-6 border-b border-gray-100 mb-4 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Routes found</h1>
        </div>
        <p className="text-gray-500 text-sm ml-10 font-medium">
          <span className="text-brand-600 font-bold">{origin}</span> to{' '}
          <span className="text-brand-600 font-bold">{destination}</span> • {routes.length} options
        </p>
      </div>

      <div className="px-4 space-y-4">
        {routes.map((route) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border transition-all ${
              route.isPrimary
                ? 'border-brand-200 ring-4 ring-brand-50 shadow-brand-100'
                : 'border-gray-100 opacity-90'
            }`}
          >
            {/* Decoration for Primary Card */}
            {route.isPrimary && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            )}

            {/* Top Row */}
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${route.isPrimary ? 'bg-brand-600 shadow-brand-200' : 'bg-gray-400'}`}
                  >
                    {route.id}
                  </div>
                  <span className="font-extrabold text-xl text-gray-900 tracking-tight">
                    {route.option}
                  </span>
                </div>
                <p className="text-gray-500 text-sm ml-11 font-medium">{route.transfer}</p>
              </div>
              <div className="flex items-center text-gray-900 font-bold bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {route.duration}
              </div>
            </div>

            {/* Confidence Badge */}
            {route.isPrimary && (
              <div className="ml-11 mb-8 inline-flex items-center bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100 shadow-sm relative z-10">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                {route.confidence}
              </div>
            )}

            {/* Timeline Visualization (only for primary/expanded) */}
            {route.isPrimary && (
              <div className="ml-4 pl-6 border-l-2 border-dashed border-gray-100 space-y-8 relative mb-8 z-10">
                {route.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Dot */}
                    <div
                      className={`absolute -left-[29px] w-4 h-4 rounded-full border-[3px] border-white shadow-sm ${step.color} top-0.5`}
                    ></div>

                    <h4 className="font-bold text-gray-900 text-sm leading-tight mb-0.5">
                      {step.name}
                    </h4>
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Action Button */}
            {route.isPrimary && (
              <button
                onClick={() => navigate('/navigation/active')}
                className="relative z-10 w-full py-4 bg-brand-600 text-white font-bold rounded-2xl text-sm flex items-center justify-center hover:bg-brand-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-200"
              >
                Start Journey <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
