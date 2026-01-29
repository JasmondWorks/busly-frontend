import { motion } from 'framer-motion';
import type { Route, Stop } from '../types';
import { useMemo } from 'react';

interface GraphViewProps {
  route: Route;
  stops: { stop: Stop; sequenceOrder: number }[];
}

export const GraphView = ({ route, stops }: GraphViewProps) => {
  // Generate pseudo-coordinates for a "network map" visualization
  // In a real app, these would come from the API (lat/lng mapped to SVG coords)
  // Here we'll generate a visually pleasing "random but connected" layout
  const points = useMemo(() => {
    return stops.map((item, i) => {
      // Create a zigzag or semi-random path
      // x: 30% to 70% of width
      // y: distributed vertically with some jitter
      const xPercent = 30 + (i % 2 === 0 ? -10 : 10) + (Math.random() * 20 - 10);
      const yPercent = 15 + (i / (stops.length - 1)) * 70;
      return {
        ...item,
        x: xPercent,
        y: yPercent,
      };
    });
  }, [stops]);

  return (
    <div className="bg-[#f0f2f5] h-full w-full relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/city-map.png')] pointer-events-none mix-blend-multiply"></div>

      <div className="p-6 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Route Network</h2>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{route.name} Overview</p>
      </div>

      <div className="flex-1 relative z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Network Lines */}
          {points.map((p, i) => {
            if (i === points.length - 1) return null;
            const next = points[i + 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${p.x}%`}
                y1={`${p.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="#ef4444" // red-500 matching the reference "red network"
                strokeWidth="0.4"
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            );
          })}

          {/* Secondary Connections (Simulating network complexity) */}
          {points.map((p, i) => {
            if (i < 2) return null;
            // Connect to a previous node purely for visual "network" density (skip immediate predecessor)
            const prev = points[i - 2];
            return (
              <motion.line
                key={`connector-${i}`}
                x1={`${p.x}%`}
                y1={`${p.y}%`}
                x2={`${prev.x}%`}
                y2={`${prev.y}%`}
                stroke="#ecaebb" // lighter red/pink
                strokeWidth="0.1"
                strokeDasharray="1 1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* DOM Nodes for Interactivity/Labels (easier to style text with HTML than SVG) */}
        {points.map((p, i) => (
          <motion.div
            key={p.stop.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.5, type: 'spring' }}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group hover:z-20"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {/* Circle Node */}
            <div
              className={`
                            rounded-full shadow-lg transition-transform duration-200 group-hover:scale-125
                            ${i === 0 || i === points.length - 1 ? 'w-6 h-6 bg-red-600 border-2 border-white' : 'w-4 h-4 bg-orange-400 border border-white'}
                        `}
            ></div>

            {/* Label Badge */}
            <div className="mt-2 px-2 py-1 bg-white/90 backdrop-blur shadow-sm rounded border border-gray-100 text-[10px] font-bold text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:opacity-100">
              {p.stop.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
