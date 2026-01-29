import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { useMemo } from 'react';

interface Stop {
  id: string;
  name: string;
  status: 'past' | 'current' | 'future';
  landmarkHint?: string; // Added for map callout
}

interface NavigationMapProps {
  stops: Stop[];
  currentStopIndex: number;
}

export function NavigationMap({ stops, currentStopIndex }: NavigationMapProps) {
  // 1. Define fixed coordinates for a "Mock Route"
  // We'll create a simple "Z" or "S" curve shape for visual interest.
  const mapPoints = useMemo(
    () => [
      { x: 100, y: 100 }, // Idi-Iroko
      { x: 300, y: 150 }, // Anthony (Curve down-right)
      { x: 250, y: 350 }, // Maryland (Curve down-left)
      { x: 500, y: 450 }, // Palmgrove (Curve right)
      { x: 600, y: 250 }, // Onipanu (Curve up-right)
    ],
    [],
  );

  // Helper to generate path segments
  const getPathSegment = (startIndex: number, endIndex: number) => {
    let d = `M ${mapPoints[startIndex].x} ${mapPoints[startIndex].y} `;
    for (let i = startIndex + 1; i <= endIndex; i++) {
      d += `L ${mapPoints[i].x} ${mapPoints[i].y} `;
    }
    return d;
  };

  // Split path into Past/Active (Solid) and Future (Dashed)
  // We assume the route is continuous.
  // If current is 1 (Anthony), 0->1 is Solid. 1->4 is Dashed.
  const activePathD = getPathSegment(0, Math.max(0, currentStopIndex)); // Ensure at least 0
  const futurePathD = getPathSegment(Math.max(0, currentStopIndex), mapPoints.length - 1); // Ensure at least 0

  // Calculate current position based on index (Mock logic)
  // If index is 1 (Anthony), our "bus" is at mapPoints[1]
  const busPosition = mapPoints[currentStopIndex] || mapPoints[0];
  const currentStop = stops[currentStopIndex];

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden select-none">
      {/* Background Texture (Grid) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [bg-size:20px_20px]"></div>

      {/* SVG Layer */}
      <svg className="w-full h-full" viewBox="40 40 620 480" preserveAspectRatio="xMidYMid meet">
        {/* 1. Future Route Path (Dashed) */}
        <path
          d={futurePathD}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="16 16"
        />

        {/* 2. Active Route Path (Solid) */}
        <path
          d={activePathD}
          fill="none"
          stroke="#6366f1"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Stops */}
        {stops.map((stop, i) => {
          const point = mapPoints[i];
          const isPast = i < currentStopIndex;
          const isCurrent = i === currentStopIndex;

          return (
            <g key={stop.id} transform={`translate(${point.x}, ${point.y})`}>
              {/* Stop Circle */}
              <circle
                r={isCurrent ? 12 : 8}
                fill={isPast ? '#6366f1' : isCurrent ? '#ffffff' : '#fff'}
                stroke={isPast ? '#6366f1' : isCurrent ? '#6366f1' : '#94a3b8'}
                strokeWidth={isCurrent ? 8 : 6}
              />
            </g>
          );
        })}

        {/* 4. The Bus Element (Animated Motion) */}
        <motion.g
          initial={false}
          animate={{
            x: busPosition.x,
            y: busPosition.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 15,
          }}
        >
          {/* Ripple Effect for Active Location */}
          <circle r="30" fill="#6366f1" opacity="0.15">
            <animate attributeName="r" from="30" to="50" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="12" fill="#4f46e5" stroke="white" strokeWidth="3" className="shadow-xl" />

          {/* Floating Callout (Inspired by Image 2 - "bicycle cafe") */}
          {/* Rendered INSIDE the motion group so it moves with the bus */}
          <foreignObject x="-80" y="-70" width="160" height="60" className="overflow-visible">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xl shadow-brand-900/10 p-2.5 flex items-center gap-3 border border-slate-100/50"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Navigation size={14} fill="currentColor" />
              </div>
              <div className="leading-none">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                  Next Stop
                </div>
                <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  {currentStop?.name || 'Arriving...'}
                </div>
              </div>
              {/* Arrow at bottom */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100/50"></div>
            </motion.div>
          </foreignObject>
        </motion.g>
      </svg>

      {/* Floating Legend / Control */}
      <div className="hidden md:block absolute bottom-6 right-6 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-sm border border-slate-100 max-w-[150px]">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
          Estimated Arrival
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-slate-900">09:42</span>
          <span className="text-xs font-bold text-slate-400">AM</span>
        </div>
      </div>
    </div>
  );
}
