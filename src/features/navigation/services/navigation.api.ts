/**
 * Navigation API — thin re-exports of the canonical service modules.
 * Components in the navigation feature can import from here for convenience.
 */
export { stopsApi as navigationStopsApi } from '@/lib/api/stops.api';
export { journeysApi as navigationJourneysApi } from '@/lib/api/journeys.api';

// Re-export types
export type { NormalisedStop } from '@/lib/api/stops.api';
export type { JourneyOption, JourneyLeg, StopDetail, AlternateRoute } from '@/lib/api/journeys.api';
