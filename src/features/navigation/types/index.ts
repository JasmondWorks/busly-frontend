// ─── Stop ─────────────────────────────────────────────────────────────────────
export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  areaName?: string;
  distance?: number;
  location?: { lat: number; lng: number };
}

// ─── Route ────────────────────────────────────────────────────────────────────
export interface Route {
  id: string;
  name: string;
  originStop: Stop;
  destinationStop: Stop;
  estimatedFare?: number;
  stops?: Stop[];
  totalStops?: number;
}

// ─── Journey (matches backend JourneyOption) ──────────────────────────────────
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

// ─── Navigation session state ──────────────────────────────────────────────────
export interface NavigationState {
  origin: Stop | null;
  destination: Stop | null;
  routes: Route[];
  selectedRoute: Route | null;
  currentStep: number;
  isNavigating: boolean;
}
