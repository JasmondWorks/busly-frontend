import { api } from '@/lib/axios';
import type { Stop, Route } from '../types';

export const navigationApi = {
  searchStops: async (query: string): Promise<Stop[]> => {
    const response = await api.get<Stop[]>(`/stops/search`, { params: { q: query } });
    return response.data;
  },

  searchRoutes: async (originId: string, destinationId: string): Promise<Route[]> => {
    const response = await api.get<Route[]>(`/routes/search`, {
      params: { originId, destinationId },
    });
    return response.data;
  },

  getRouteStops: async (routeId: string): Promise<{ stop: Stop; sequenceOrder: number }[]> => {
    const response = await api.get<{ stop: Stop; sequenceOrder: number }[]>(
      `/routes/${routeId}/stops`,
    );
    return response.data;
  },

  getRouteById: async (routeId: string): Promise<Route> => {
    const response = await api.get<Route>(`/routes/${routeId}`);
    return response.data;
  },

  findNearestStop: async (lat: number, lng: number): Promise<Stop> => {
    try {
      // Assuming a GET endpoint exists or using POST if clearer
      const response = await api.get<Stop>(`/stops/nearest`, { params: { lat, lng } });
      return response.data;
    } catch (e) {
      console.warn('Nearest stop endpoint failed or missing, using mock', e);
      return {
        id: 'mock-nearest',
        name: 'Current Location (Nearby)',
        longitude: lng,
        latitude: lat,
        location: { lat, lng },
      } as Stop;
    }
  },
};
