/**
 * Navigation API — thin re-exports of the canonical service modules.
 * Components in the navigation feature can import from here for convenience.
 */
export { stopsApi as navigationStopsApi } from '@/lib/api/stops.api';
export { journeysApi as navigationJourneysApi } from '@/lib/api/journeys.api';

// Re-export types
export type { NormalisedStop } from '@/lib/api/stops.api';
export type { JourneyOption, JourneyLeg, StopDetail, AlternateRoute } from '@/lib/api/journeys.api';
export type { NormalisedRoute } from '@/lib/api/routes.api';

// ─── Unified navigationApi used by NavigationPage ─────────────────────────────
import { routesApi } from '@/lib/api/routes.api';
import { stopsApi } from '@/lib/api/stops.api';
import type { NormalisedRoute } from '@/lib/api/routes.api';
import type { NormalisedStop } from '@/lib/api/stops.api';
import { api } from '@/lib/axios';
import type { ApiRoute } from '@/lib/api/routes.api';

export const navigationApi = {
  /** GET /routes/search?originId=X&destinationId=Y — returns matching normalised routes */
  searchRoutes: (originId: string, destinationId: string): Promise<NormalisedRoute[]> =>
    routesApi.search(originId, destinationId),

  /** GET /routes/:id — returns a normalised route */
  getRouteById: (id: string): Promise<NormalisedRoute> => routesApi.getById(id),

  /**
   * GET /routes/:id — fetches the raw route and resolves each stop in its
   * stopsSequence, returning them in order with their sequence position.
   */
  getRouteStops: async (
    routeId: string,
  ): Promise<{ stop: NormalisedStop; sequenceOrder: number }[]> => {
    const res = await api.get<ApiRoute>(`/routes/${routeId}`);
    const raw = res.data;
    const sorted = [...raw.stopsSequence].sort((a, b) => a.order - b.order);
    const resolved = await Promise.all(
      sorted.map(async (entry) => ({
        stop: await stopsApi.getById(entry.stop),
        sequenceOrder: entry.order,
      })),
    );
    return resolved;
  },
};
