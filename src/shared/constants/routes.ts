export const RECENT_ROUTES = [
  { id: '1', name: 'CMS to Lekki', duration: '45 mins', icon: '🚌' },
  { id: '2', name: 'Ikeja to Maryland', duration: '15 mins', icon: '🚌' },
  { id: '3', name: 'Yaba to Surulere', duration: '30 mins', icon: '🚌' },
  { id: '4', name: 'Oshodi to VI', duration: '1hr 10m', icon: '🚌' },
];

export const ALL_ROUTES = [
  {
    id: 'r1',
    name: 'CMS - Lekki',
    from: 'CMS Terminal',
    to: 'Lekki Phase 1',
    duration: '45m',
    type: 'Express',
    status: 'Fast',
    price: '₦800',
  },
  {
    id: 'r2',
    name: 'Oshodi - Abule Egba',
    from: 'Oshodi Interchange',
    to: 'Abule Egba',
    duration: '35m',
    type: 'BRT',
    status: 'Normal',
    price: '₦500',
  },
  {
    id: 'r3',
    name: 'Yaba - Obalende',
    from: 'Yaba Park',
    to: 'Obalende',
    duration: '25m',
    type: 'Local',
    status: 'Congested',
    price: '₦300',
  },
  {
    id: 'r4',
    name: 'Ikeja - Maryland',
    from: 'Ikeja Underbridge',
    to: 'Maryland',
    duration: '15m',
    type: 'Local',
    status: 'Fast',
    price: '₦200',
  },
  {
    id: 'r5',
    name: 'Ajah - Epe',
    from: 'Ajah Jubilee',
    to: 'Epe Resort',
    duration: '1h 10m',
    type: 'Express',
    status: 'Normal',
    price: '₦1200',
  },
];

export const ROUTE_FILTERS = ['All', 'Express', 'BRT', 'Local'];
