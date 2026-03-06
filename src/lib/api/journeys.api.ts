import { api } from '@/lib/axios';

export interface StopDetail {
  id: string;
  name: string;
  areaName?: string;
  coordinates: [number, number]; // [lng, lat]
  landmark?: {
    name: string;
    category: string;
    cue?: string;
  } | null;
}

export interface JourneyLeg {
  routeId: string;
  routeName: string;
  mode: string;
  stops: StopDetail[];
  estimatedFare: number;
  estimatedDurationSeconds: number;
}

export interface JourneyOption {
  totalLegs: number;
  totalStops: number;
  totalDurationSeconds: number;
  totalEstimatedFare: number;
  legs: JourneyLeg[];
  summary: string;
}

export interface AlternateRoute {
  routeId: string;
  routeName: string;
  stopsRemaining: number;
  estimatedFare: number;
  reliabilityScore: number;
  requiresTransfer: boolean;
}

export const journeysApi = {
  /**
   * GET /journeys/search?originLat=X&originLng=Y&destLat=A&destLng=B
   * Coord-based search (snap to nearest stops then route)
   */
  searchByCoords: async (
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number,
  ): Promise<JourneyOption[]> => {
    const res = await api.get<JourneyOption[]>('/journeys/search', {
      params: { originLat, originLng, destLat, destLng },
    });
    return res.data;
  },

  /**
   * GET /journeys/search-by-stops?originStopId=X&destStopId=Y
   * Stop-ID based search (used after user picks stops in StopSearch)
   */
  searchByStops: async (originStopId: string, destStopId: string): Promise<JourneyOption[]> => {
    const res = await api.get<JourneyOption[]>('/journeys/search-by-stops', {
      params: { originStopId, destStopId },
    });
    return res.data;
  },

  /**
   * GET /journeys/alternates?currentStopId=X&currentRouteId=Y&destStopId=Z
   * Returns alternate routes at a decision node during navigation
   */
  getAlternates: async (
    stopId: string,
    currentRouteId: string,
    destinationStopId: string,
  ): Promise<AlternateRoute[]> => {
    const res = await api.get<AlternateRoute[]>('/journeys/alternates', {
      params: { stopId, currentRouteId, destinationStopId },
    });
    return res.data;
  },
};
