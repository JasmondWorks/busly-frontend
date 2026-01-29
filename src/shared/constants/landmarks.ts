export interface RouteWaypoint {
  id: string;
  type: 'stop' | 'turn' | 'landmark';
  label: string;
  detail?: string; // e.g., "Turn Right", "Pick up passengers"
  distanceFromStart: number; // km
  imageUrl?: string;
}

export const ROUTE_WAYPOINTS: Record<string, RouteWaypoint[]> = {
  '1': [
    // CMS to Lekki
    {
      id: 'w1',
      type: 'stop',
      label: 'CMS Terminal',
      detail: 'Start Point',
      distanceFromStart: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1595842878784-a169b12a8497?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'w2',
      type: 'landmark',
      label: 'Muson Centre',
      detail: 'Keep Left after this',
      distanceFromStart: 1.2,
      imageUrl:
        'https://images.unsplash.com/photo-1563813898144-8df655225c57?q=80&w=600&auto=format&fit=crop', // Placeholder
    },
    {
      id: 'w3',
      type: 'turn',
      label: 'Bonny Camp Junction',
      detail: 'Turn Left onto Ozumba',
      distanceFromStart: 2.5,
    },
    {
      id: 'w4',
      type: 'stop',
      label: 'Victoria Island (1004)',
      detail: 'Bus Stop',
      distanceFromStart: 4.0,
      imageUrl:
        'https://images.unsplash.com/photo-1580227974549-33b8a8b0c66b?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'w5',
      type: 'landmark',
      label: 'Lekki Toll Gate',
      detail: 'Prepare for tolls',
      distanceFromStart: 8.5,
      imageUrl:
        'https://images.unsplash.com/photo-1577085739343-41bb0224d08b?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'w6',
      type: 'stop',
      label: 'Lekki Phase 1',
      detail: 'Destination',
      distanceFromStart: 12.0,
    },
  ],
};
