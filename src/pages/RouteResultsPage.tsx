import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { useJourneyByStops } from '@/hooks/useJourneys';
import { useJourneyStore } from '@/store/journey.store';
import { formatDuration, formatFare } from '@/store/journey.store';
import type { JourneyOption } from '@/features/navigation/types';

export default function RouteResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const originId = searchParams.get('originId') ?? '';
  const destId = searchParams.get('destinationId') ?? '';
  const originName = searchParams.get('originName') ?? 'Origin';
  const destName = searchParams.get('destName') ?? 'Destination';

  const { data: journeyOptions = [], isLoading, error } = useJourneyByStops(originId, destId);

  const { startJourney } = useJourneyStore();

  const handleStartJourney = (option: JourneyOption) => {
    startJourney(option);
    navigate('/navigation/active');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <span className="text-brand-600 font-bold">{originName}</span> to{' '}
          <span className="text-brand-600 font-bold">{destName}</span>
          {!isLoading && journeyOptions.length > 0 && ` · ${journeyOptions.length} option${journeyOptions.length > 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-20 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          <p className="text-sm font-medium">Finding the best routes…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-20 text-center px-6">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-gray-700 font-bold">No route found</p>
          <p className="text-gray-400 text-sm max-w-xs">
            {(error as any)?.response?.data?.message ??
              'No viable route between these stops. Try a different origin or destination.'}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Journey Options */}
      {!isLoading && !error && (
        <div className="px-4 space-y-4 pb-10">
          {journeyOptions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No journeys returned.</p>
            </div>
          ) : (
            journeyOptions.map((option, idx) => {
              const isPrimary = idx === 0;
              const allStops = option.legs.flatMap((l) => l.stops);
              const firstStop = allStops[0]?.name ?? originName;
              const lastStop = allStops[allStops.length - 1]?.name ?? destName;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border transition-all ${
                    isPrimary
                      ? 'border-brand-200 ring-4 ring-brand-50 shadow-brand-100'
                      : 'border-gray-100 opacity-90'
                  }`}
                >
                  {isPrimary && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  )}

                  {/* Top Row */}
                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ${isPrimary ? 'bg-brand-600 shadow-brand-200' : 'bg-gray-400'}`}
                        >
                          {idx + 1}
                        </div>
                        <span className="font-extrabold text-xl text-gray-900 tracking-tight">
                          {option.totalStops} stops
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm ml-11 font-medium">
                        {option.totalLegs > 1
                          ? `${option.totalLegs} routes · ${option.totalLegs - 1} transfer${option.totalLegs > 2 ? 's' : ''}`
                          : 'Direct route'}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-900 font-bold bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDuration(option.totalDurationSeconds)}
                    </div>
                  </div>

                  {/* Confidence / Fare */}
                  {isPrimary && (
                    <div className="ml-11 mb-6 flex flex-wrap gap-2 relative z-10">
                      <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                        Best match
                      </div>
                      {option.totalEstimatedFare > 0 && (
                        <div className="inline-flex items-center bg-gray-50 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold border border-gray-100 shadow-sm">
                          {formatFare(option.totalEstimatedFare)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline */}
                  {isPrimary && (
                    <div className="ml-4 pl-6 border-l-2 border-dashed border-gray-100 space-y-6 relative mb-8 z-10">
                      {option.legs.map((leg, legIdx) => (
                        <div key={legIdx}>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-3">
                            {leg.routeName}
                          </p>
                          {leg.stops.slice(0, 4).map((stop, sIdx) => (
                            <div key={sIdx} className="relative mb-5 last:mb-0">
                              <div
                                className={`absolute -left-[29px] w-4 h-4 rounded-full border-[3px] border-white shadow-sm top-0.5 ${
                                  sIdx === 0 ? 'bg-brand-600' : sIdx === leg.stops.length - 1 ? 'bg-orange-500' : 'bg-gray-200'
                                }`}
                              ></div>
                              <h4 className="font-bold text-gray-900 text-sm leading-tight mb-0.5">
                                {stop.name}
                              </h4>
                              {stop.areaName && (
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                                  {stop.areaName}
                                </p>
                              )}
                              {stop.landmark && (
                                <p className="text-xs text-brand-500 font-medium mt-0.5 italic">
                                  Near {stop.landmark.name}
                                </p>
                              )}
                            </div>
                          ))}
                          {leg.stops.length > 4 && (
                            <p className="text-xs text-gray-400 font-medium ml-1">
                              +{leg.stops.length - 4} more stops
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary for non-primary */}
                  {!isPrimary && (
                    <p className="text-sm text-gray-500 font-medium ml-11 mb-4 relative z-10">
                      {firstStop} → {lastStop} · {formatFare(option.totalEstimatedFare)}
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => handleStartJourney(option)}
                    className={`relative z-10 w-full py-4 font-bold rounded-2xl text-sm flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all ${
                      isPrimary
                        ? 'bg-brand-600 text-white shadow-xl shadow-brand-200 hover:bg-brand-700'
                        : 'bg-gray-900 text-white hover:bg-black shadow-lg'
                    }`}
                  >
                    {isPrimary ? 'Start Journey' : 'Use this route'}{' '}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
