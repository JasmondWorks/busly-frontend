import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationHeader } from '@/features/navigation/components/NavigationHeader';
import { NavigationTimeline } from '@/features/navigation/components/NavigationTimeline';
import { NavigationMap } from '@/features/navigation/components/NavigationMap';
import { LogOut, ChevronRight, ArrowLeft } from 'lucide-react';

export default function ActiveJourneyPage() {
  const navigate = useNavigate();
  // Mock State
  const [currentStopIndex, setCurrentStopIndex] = useState(1);
  const [isAlighting, setIsAlighting] = useState(false);

  // Mock Data Definition (Moved inside or kept static)
  const stops = [
    { id: '1', name: 'Idi-Iroko', time: '12:30 PM' },
    {
      id: '2',
      name: 'Anthony',
      time: '5 mins',
      status: 'current' as const,
      landmarks: [
        {
          id: 'l1',
          type: 'system',
          hint: 'After the Blue Pedestrian Bridge',
          detail:
            'Look for the large blue footbridge crossing the expressway. The bus stop is immediately after the bridge descent.',
          image:
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop',
          votes: 120,
        },
        {
          id: 'l2',
          type: 'user',
          author: 'Chinedu',
          privacy: 'public',
          hint: 'Look for the yellow filling station',
          detail:
            "There is a Total filling station just before the stop. You can't miss the bright yellow canopy.",
          image: null,
          votes: 45,
        },
      ],
    },
    { id: '3', name: 'Maryland', time: '12 mins' },
    { id: '4', name: 'Palmgrove', time: '18 mins' },
    { id: '5', name: 'Onipanu', time: '25 mins' },
  ];

  // Dynamic Status Logic based on index
  const dynamicStops = stops.map((stop, index) => ({
    ...stop,
    status: index < currentStopIndex ? 'past' : index === currentStopIndex ? 'current' : 'future',
  })) as any[];

  const activeStop = dynamicStops[currentStopIndex];

  // Simulation
  useEffect(() => {
    if (activeStop?.name === 'Onipanu') {
      setIsAlighting(true);
    } else {
      setIsAlighting(false);
    }
  }, [activeStop]);

  const handleNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col md:flex-row relative">
      {/* Mobile Back Button (Floating) */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Left/Top: Header & Timeline */}
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto md:mx-0 md:h-screen md:overflow-y-auto bg-white/80 backdrop-blur-xl border-r border-gray-100 z-10 relative shadow-2xl shadow-gray-200/50">
        <NavigationHeader
          nextStop={activeStop?.name || 'Destination'}
          arrivalTime={
            activeStop?.time.includes('mins') ? activeStop?.time.replace(' mins', '') : '0'
          }
          isAlighting={isAlighting}
        />

        <div className="flex-1 overflow-y-auto pb-4">
          <NavigationTimeline stops={dynamicStops} />
        </div>

        <div className="p-4 border-t border-gray-100 bg-white/90 backdrop-blur sticky bottom-0 space-y-3 z-20">
          {/* DEBUG CONTROL */}
          <button
            onClick={handleNextStop}
            className="w-full py-2 bg-gray-50 text-gray-400 text-xs font-bold rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1 border border-transparent hover:border-gray-200 transition-all"
          >
            Development: Next Stop <ChevronRight size={12} />
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
          >
            <LogOut size={20} /> End Journey
          </button>
        </div>
      </div>

      {/* Right/Bottom: Map */}
      <div className="hidden md:flex flex-1 bg-gray-50 items-center justify-center relative overflow-hidden">
        {/* Decorative Map BG Pattern if Map doesn't load */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 z-0"></div>
        <div className="relative z-10 w-full h-full">
          <NavigationMap stops={dynamicStops} currentStopIndex={currentStopIndex} />
        </div>
      </div>
    </div>
  );
}
