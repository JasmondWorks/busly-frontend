import { api } from '@/lib/axios';

export interface ApiRoute {
  _id: string;
  name: string;
  description?: string;
  mode?: string;
  status?: string;
  reliabilityScore?: number;
  estimatedFare?: number;
  stopsSequence: Array<{
    stop: string;
    order: number;
    estimatedFare?: number;
  }>;
}

export interface NormalisedRoute {
  id: string;
  name: string;
  description?: string;
  mode: string;
  status: string;
  reliabilityScore: number;
  estimatedFare: number;
  stopCount: number;
}

function normaliseRoute(r: ApiRoute): NormalisedRoute {
  return {
    id: r._id,
    name: r.name,
    description: r.description,
    mode: r.mode ?? 'BUS',
    status: r.status ?? 'Normal',
    reliabilityScore: r.reliabilityScore ?? 80,
    estimatedFare: r.estimatedFare ?? 0,
    stopCount: r.stopsSequence?.length ?? 0,
  };
}

export const routesApi = {
  /** GET /routes?limit=N */
  getAll: async (limit = 30): Promise<NormalisedRoute[]> => {
    const res = await api.get<ApiRoute[]>('/routes', { params: { limit } });
    return res.data.map(normaliseRoute);
  },

  /** GET /routes/search?originId=X&destinationId=Y */
  search: async (originId: string, destinationId: string): Promise<NormalisedRoute[]> => {
    const res = await api.get<ApiRoute[]>('/routes/search', {
      params: { originId, destinationId },
    });
    return res.data.map(normaliseRoute);
  },

  /** GET /routes/:id */
  getById: async (id: string): Promise<NormalisedRoute> => {
    const res = await api.get<ApiRoute>(`/routes/${id}`);
    return normaliseRoute(res.data);
  },
};
