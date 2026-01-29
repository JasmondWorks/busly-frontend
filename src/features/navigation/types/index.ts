export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface Route {
  id: string;
  name: string;
  originStop: Stop;
  destinationStop: Stop;
  estimatedFare?: number;
  stops?: Stop[];
  totalStops?: number;
}

export interface NavigationState {
  origin: Stop | null;
  destination: Stop | null;
  routes: Route[];
  selectedRoute: Route | null;
  currentStep: number;
  isNavigating: boolean;
}
