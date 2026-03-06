import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHeader } from '@/features/navigation/components/NavigationHeader';
import { NavigationTimeline } from '@/features/navigation/components/NavigationTimeline';
import { NavigationMap } from '@/features/navigation/components/NavigationMap';
import { LogOut, ChevronRight, ArrowLeft, Maximize2, X, Map as MapIcon } from 'lucide-react';
import { useState } from 'react';

import { useJourneyStore, flattenStops, formatDuration } from '@/store/journey.store';

export default function ActiveJourneyPage() {
  const navigate = useNavigate();
  const [showMapModal, setShowMapModal] = useState(false);

  const { activeJourney, destStop, currentStopIndex, advanceStop, endJourney } = useJourneyStore();

  // If no active journey, redirect to search
  useEffect(() => {
    if (!activeJourney) {
      navigate('/search', { replace: true });
    }
  }, [activeJourney, navigate]);

  if (!activeJourney) return null;

  const allStops = flattenStops(activeJourney);
  const activeStop = allStops[currentStopIndex];
  const isAlighting = currentStopIndex === allStops.length - 1;

  // Find which leg the current stop belongs to
  const currentLeg = activeJourney.legs.find((leg) =>
    leg.stops.some((s) => s.id === activeStop?.id),
  );

  // Build timeline-compatible stop list
  const timelineStops = allStops.map((stop, index) => ({
    id: stop.id,
    name: stop.name,
    time: index === currentStopIndex ? 'Now' : '',
    status: (index < currentStopIndex
      ? 'past'
      : index === currentStopIndex
        ? 'current'
        : 'future') as 'past' | 'current' | 'future',
    landmarks: stop.landmark
      ? [
          {
            id: `lm-${stop.id}`,
            type: 'system' as const,
            hint: stop.landmark.cue ?? `Near ${stop.landmark.name}`,
            detail: `${stop.landmark.category} · ${stop.landmark.name}`,
            image: null,
            votes: 0,
          },
        ]
      : [],
  }));

  const handleEndJourney = () => {
    endJourney();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col lg:flex-row relative">
      {/* Mobile Back */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Left/Top: Timeline */}
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto lg:mx-0 lg:h-screen lg:overflow-y-auto bg-white/80 backdrop-blur-xl border-r border-gray-100 z-10 relative shadow-2xl shadow-gray-200/50">
        <NavigationHeader
          nextStop={activeStop?.name ?? 'Destination'}
          arrivalTime={
            currentLeg ? Math.round(currentLeg.estimatedDurationSeconds / 60).toString() : '0'
          }
          isAlighting={isAlighting}
          onMapClick={() => setShowMapModal(true)}
        />

        {currentLeg && (
          <div className="px-4 py-2 bg-brand-50/50 border-b border-brand-100 text-xs text-brand-700 font-bold uppercase tracking-wider">
            {currentLeg.routeName}
          </div>
        )}

        <div className="flex-1 overflow-y-auto pb-4">
          <NavigationTimeline
            stops={timelineStops}
            onStopClick={(stopId) => {
              const stop = allStops.find((s) => s.id === stopId);
              if (stop && currentLeg) {
                navigate(`/navigation/${stop.id}`, {
                  state: {
                    stopName: stop.name,
                    currentRouteId: currentLeg.routeId,
                    destStopId: destStop?.id ?? allStops[allStops.length - 1]?.id,
                  },
                });
              }
            }}
          />
        </div>

        <div className="p-4 border-t border-gray-100 bg-white/90 backdrop-blur sticky bottom-0 space-y-3 z-20">
          {/* Journey summary */}
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1 pb-1">
            <span>
              Stop {currentStopIndex + 1} / {allStops.length}
            </span>
            <span>{formatDuration(activeJourney.totalDurationSeconds)} total</span>
          </div>

          {!isAlighting && (
            <button
              onClick={advanceStop}
              className="w-full py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1 border border-transparent hover:border-gray-200 transition-all"
            >
              Dev: Next Stop <ChevronRight size={12} />
            </button>
          )}

          {isAlighting && (
            <div className="w-full py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-center text-sm border border-emerald-100">
              Alight here — you've arrived!
            </div>
          )}

          <button
            onClick={handleEndJourney}
            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
          >
            <LogOut size={20} /> End Journey
          </button>
        </div>
      </div>

      {/* Right/Bottom: Map */}
      <div className="flex flex-1 bg-gray-50 items-center justify-center relative overflow-hidden h-[35vh] md:h-[50vh] lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0"></div>
        <div className="relative z-10 w-full h-full group">
          <NavigationMap stops={timelineStops} currentStopIndex={currentStopIndex} />
          <button
            onClick={() => setShowMapModal(true)}
            className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-brand-600 hover:scale-110 active:scale-95 transition-all z-20"
          >
            <Maximize2 size={24} />
          </button>
        </div>
      </div>

      <div className="lg:hidden absolute bottom-[38vh] md:bottom-[53vh] left-0 w-full flex justify-center pointer-events-none z-20">
        <div className="bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl">
          <MapIcon size={12} /> Map Preview Below
        </div>
      </div>

      {/* Full Screen Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-200">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setShowMapModal(false)}
              className="p-3 bg-white rounded-full shadow-xl border border-gray-100 text-gray-900 hover:bg-gray-50 transition-all"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 relative">
            <NavigationMap stops={timelineStops} currentStopIndex={currentStopIndex} />
          </div>
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{activeStop?.name}</h3>
                <p className="text-gray-500 text-sm">Current Stop</p>
              </div>
              <button
                className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl"
                onClick={() => setShowMapModal(false)}
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
