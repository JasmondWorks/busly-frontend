import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => onComplete(),
        () => onComplete(),
      );
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] bg-white text-center p-8 max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center relative shadow-sm">
          <MapPin className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
          <div className="absolute -top-2 -right-2 bg-brand-600 rounded-full p-1 border-2 border-white shadow-sm">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight"
      >
        Enable Location Access
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-gray-500 mb-10 text-base leading-relaxed max-w-sm font-normal"
      >
        Busly uses your location to suggest nearby stops and optimized routes. We respect your
        privacy and only use this data for navigation.
      </motion.p>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onClick={requestLocation}
        className="w-full bg-brand-600 text-white py-3 px-6 rounded-md font-medium text-sm hover:bg-brand-500 focus:ring-4 focus:ring-brand-100 transition-all outline-none"
      >
        Allow Location
      </motion.button>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        onClick={onComplete}
        className="mt-4 text-gray-500 font-medium text-sm hover:text-gray-900 transition-colors py-2 px-4 rounded-md focus:bg-gray-50 outline-none"
      >
        Skip for now
      </motion.button>
    </div>
  );
};
