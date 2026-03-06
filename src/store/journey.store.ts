import { create } from 'zustand';
import type { Stop, JourneyOption } from '@/features/navigation/types';

interface JourneyStore {
  // Selected origin/destination stops
  originStop: Stop | null;
  destStop: Stop | null;

  // Journey options returned by the API
  journeyOptions: JourneyOption[];

  // The journey the user chose to navigate
  activeJourney: JourneyOption | null;

  // Index into activeJourney.legs[0].stops for current position
  currentStopIndex: number;

  // Actions
  setStops: (origin: Stop, dest: Stop) => void;
  setJourneyOptions: (options: JourneyOption[]) => void;
  startJourney: (option: JourneyOption) => void;
  advanceStop: () => void;
  endJourney: () => void;
}

export const useJourneyStore = create<JourneyStore>((set, get) => ({
  originStop: null,
  destStop: null,
  journeyOptions: [],
  activeJourney: null,
  currentStopIndex: 0,

  setStops: (origin, dest) => set({ originStop: origin, destStop: dest }),

  setJourneyOptions: (options) => set({ journeyOptions: options }),

  startJourney: (option) => set({ activeJourney: option, currentStopIndex: 0 }),

  advanceStop: () => {
    const { activeJourney, currentStopIndex } = get();
    if (!activeJourney) return;
    const allStops = activeJourney.legs.flatMap((l) => l.stops);
    if (currentStopIndex < allStops.length - 1) {
      set({ currentStopIndex: currentStopIndex + 1 });
    }
  },

  endJourney: () =>
    set({ activeJourney: null, currentStopIndex: 0, journeyOptions: [] }),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns all stops in a flat array across all legs */
export function flattenStops(journey: JourneyOption) {
  return journey.legs.flatMap((leg) => leg.stops);
}

/** Format seconds → "X min" or "Xhr Ym" */
export function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}hr ${m}m` : `${h}hr`;
}

/** Format naira fare */
export function formatFare(amount: number): string {
  if (!amount) return 'Free';
  return `₦${amount.toLocaleString()}`;
}
