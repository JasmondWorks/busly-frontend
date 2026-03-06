import { useQuery } from '@tanstack/react-query';
import { routesApi } from '@/lib/api/routes.api';

export const routeKeys = {
  all: ['routes'] as const,
  lists: () => [...routeKeys.all, 'list'] as const,
  list: (limit: number) => [...routeKeys.lists(), { limit }] as const,
  search: (originId: string, destinationId: string) =>
    [...routeKeys.all, 'search', { originId, destinationId }] as const,
  detail: (id: string) => [...routeKeys.all, 'detail', id] as const,
};

export function useAllRoutes(limit = 30) {
  return useQuery({
    queryKey: routeKeys.list(limit),
    queryFn: () => routesApi.getAll(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchRoutes(originId: string, destinationId: string) {
  return useQuery({
    queryKey: routeKeys.search(originId, destinationId),
    queryFn: () => routesApi.search(originId, destinationId),
    enabled: !!originId && !!destinationId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: routeKeys.detail(id),
    queryFn: () => routesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
