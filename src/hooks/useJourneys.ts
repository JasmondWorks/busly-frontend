import { useQuery } from '@tanstack/react-query';
import { journeysApi } from '@/lib/api/journeys.api';

export const journeyKeys = {
  all: ['journeys'] as const,
  byStops: (originStopId: string, destStopId: string) =>
    [...journeyKeys.all, 'by-stops', { originStopId, destStopId }] as const,
  byCoords: (oLat: number, oLng: number, dLat: number, dLng: number) =>
    [...journeyKeys.all, 'by-coords', { oLat, oLng, dLat, dLng }] as const,
  alternates: (stopId: string, currentRouteId: string, destinationStopId: string) =>
    [...journeyKeys.all, 'alternates', { stopId, currentRouteId, destinationStopId }] as const,
};

export function useJourneyByStops(originStopId: string, destStopId: string) {
  return useQuery({
    queryKey: journeyKeys.byStops(originStopId, destStopId),
    queryFn: () => journeysApi.searchByStops(originStopId, destStopId),
    enabled: !!originStopId && !!destStopId,
    staleTime: 60 * 1000,
    retry: 1,
  });
}

export function useJourneyByCoords(
  originLat: number | null,
  originLng: number | null,
  destLat: number | null,
  destLng: number | null,
) {
  return useQuery({
    queryKey: journeyKeys.byCoords(originLat!, originLng!, destLat!, destLng!),
    queryFn: () => journeysApi.searchByCoords(originLat!, originLng!, destLat!, destLng!),
    enabled:
      originLat !== null && originLng !== null && destLat !== null && destLng !== null,
    staleTime: 60 * 1000,
    retry: 1,
  });
}

export function useAlternateRoutes(
  stopId: string,
  currentRouteId: string,
  destinationStopId: string,
) {
  return useQuery({
    queryKey: journeyKeys.alternates(stopId, currentRouteId, destinationStopId),
    queryFn: () => journeysApi.getAlternates(stopId, currentRouteId, destinationStopId),
    enabled: !!stopId && !!currentRouteId,
    staleTime: 30 * 1000,
  });
}
