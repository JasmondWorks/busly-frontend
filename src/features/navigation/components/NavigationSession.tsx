import { motion } from 'framer-motion';
import type { Route, Stop } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface NavigationSessionProps {
  route: Route;
  stops: { stop: Stop; sequenceOrder: number }[];
  currentStepIndex: number;
}

export const NavigationSession = ({ route, stops, currentStepIndex }: NavigationSessionProps) => {
  return (
    <div className="bg-white h-full relative flex flex-col font-sans">
      {/* Header */}
      <div className="bg-brand-600 text-white p-6 shadow-md z-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold tracking-tight">Bus Status</h1>
          <div className="p-2 bg-brand-500 rounded-full text-brand-100 flex items-center justify-center">
            <MapPin size={18} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-lg opacity-90">{route.originStop.name}</span>
          <ArrowRight size={16} className="text-brand-200" />
          <span className="font-medium text-lg opacity-90">{route.destinationStop.name}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-6 relative bg-white">
        <div className="max-w-md mx-auto relative pl-4">
          {/* Vertical Line */}
          <div className="absolute left-[2.35rem] top-4 bottom-12 w-0.5 bg-gray-100 h-full -z-10"></div>
          <div className="absolute left-[2.35rem] top-4 bottom-12 w-0.5 bg-brand-600 h-[30%] -z-10 transition-all duration-1000"></div>

          <div className="space-y-8 relative">
            {stops.map((item, index) => {
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isLast = index === stops.length - 1;
              const isFirst = index === 0;

              return (
                <motion.div
                  key={item.stop.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Indicator */}
                  <div className="relative z-10 flex flex-col items-center pt-1">
                    {isCurrent ? (
                      <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center shadow-md ring-4 ring-brand-50">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    ) : isPast ? (
                      <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div
                          className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isCurrent ? 'text-brand-600' : 'text-gray-500'}`}
                        >
                          {isFirst ? 'Start' : isLast ? 'End' : `Station ${index}`}
                        </div>
                        <h3
                          className={`text-base font-semibold ${isCurrent ? 'text-gray-900' : 'text-gray-700'}`}
                        >
                          {item.stop.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span
                          className={`block text-xs font-medium ${isCurrent ? 'text-brand-600' : 'text-gray-500'}`}
                        >
                          {isPast ? 'Crossed' : isCurrent ? 'Arriving' : 'Expected'}
                        </span>
                        <span className="block text-sm font-semibold text-gray-900">
                          {isPast ? '09:30 AM' : '10:15 AM'}
                        </span>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-brand-50 text-brand-700 text-xs font-medium">
                        Current Location
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-4 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <button className="py-3 px-4 rounded-xl border-2 border-brand-100 text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-2">
          Alarm
        </button>
        <button className="py-3 px-4 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 flex items-center justify-center gap-2">
          Pay the fare
        </button>
      </div>
    </div>
  );
};
