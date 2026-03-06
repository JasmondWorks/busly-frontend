import { api } from '@/lib/axios';

/** Shape returned by the backend for a stop document */
export interface ApiStop {
  _id: string;
  name: string;
  description?: string;
  areaName?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  popularityScore?: number;
  /** Present on geoNear results */
  distance?: number;
}

/** Normalise backend stop → frontend Stop (lat/lng at top level) */
export function normaliseStop(s: ApiStop) {
  return {
    id: s._id,
    name: s.name,
    description: s.description,
    areaName: s.areaName,
    longitude: s.location.coordinates[0],
    latitude: s.location.coordinates[1],
    location: { lat: s.location.coordinates[1], lng: s.location.coordinates[0] },
    distance: s.distance,
  };
}

export type NormalisedStop = ReturnType<typeof normaliseStop>;

export const stopsApi = {
  /** GET /stops?limit=N&area=X */
  getAll: async (limit = 50, area?: string): Promise<NormalisedStop[]> => {
    const res = await api.get<ApiStop[]>('/stops', { params: { limit, area } });
    return res.data.map(normaliseStop);
  },

  /** GET /stops/search?q=query */
  search: async (q: string): Promise<NormalisedStop[]> => {
    const res = await api.get<ApiStop[]>('/stops/search', { params: { q } });
    return res.data.map(normaliseStop);
  },

  /** GET /stops/nearby?lat=X&lng=Y&dist=D */
  nearby: async (lat: number, lng: number, dist = 2000): Promise<NormalisedStop[]> => {
    const res = await api.get<ApiStop[]>('/stops/nearby', { params: { lat, lng, dist } });
    return res.data.map(normaliseStop);
  },

  /** GET /stops/:id */
  getById: async (id: string): Promise<NormalisedStop> => {
    const res = await api.get<ApiStop>(`/stops/${id}`);
    return normaliseStop(res.data);
  },
};
