import { useQuery } from '@tanstack/react-query';
import { stopsApi } from '@/lib/api/stops.api';

export const stopKeys = {
  all: ['stops'] as const,
  lists: () => [...stopKeys.all, 'list'] as const,
  list: (limit: number, area?: string) => [...stopKeys.lists(), { limit, area }] as const,
  search: (q: string) => [...stopKeys.all, 'search', q] as const,
  nearby: (lat: number, lng: number, dist?: number) =>
    [...stopKeys.all, 'nearby', { lat, lng, dist }] as const,
  detail: (id: string) => [...stopKeys.all, 'detail', id] as const,
};

export function useAllStops(limit = 50, area?: string) {
  return useQuery({
    queryKey: stopKeys.list(limit, area),
    queryFn: () => stopsApi.getAll(limit, area),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchStops(q: string) {
  return useQuery({
    queryKey: stopKeys.search(q),
    queryFn: () => stopsApi.search(q),
    enabled: q.trim().length >= 2,
    staleTime: 60 * 1000,
  });
}

export function useNearbyStops(lat: number | null, lng: number | null, dist = 2000) {
  return useQuery({
    queryKey: stopKeys.nearby(lat!, lng!, dist),
    queryFn: () => stopsApi.nearby(lat!, lng!, dist),
    enabled: lat !== null && lng !== null,
    staleTime: 2 * 60 * 1000,
  });
}

export function useStop(id: string) {
  return useQuery({
    queryKey: stopKeys.detail(id),
    queryFn: () => stopsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
