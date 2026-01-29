import { Map, Bus, Search, User, Settings, Shield } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Map', icon: Map, path: '/' },
  { label: 'Routes', icon: Bus, path: '/routes' },
  { label: 'Search', icon: Search, path: '/search' },
  { label: 'Contribute', icon: Shield, path: '/contribute' },
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];
