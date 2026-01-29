import { useNavigate } from 'react-router-dom';
import { StopSearch } from '../components/StopSearch';
import type { Stop } from '../types';
import { Clock, MapPin, TrendingUp } from 'lucide-react';

export const SearchPage = () => {
  const navigate = useNavigate();

  const handleRouteSelected = (origin: Stop, destination: Stop) => {
    navigate(`/routes?originId=${origin.id}&destinationId=${destination.id}`);
  };

  const recentSearches = [
    { from: 'Ikeja Underbridge', to: 'Lekki Phase 1', date: 'Yesterday' },
    { from: 'Yaba Tech', to: 'Oshodi Terminal', date: '2 days ago' },
  ];

  const popularDestinations = [
    {
      name: 'Victoria Island',
      description: 'Business District',
      image:
        'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Ikeja City Mall',
      description: 'Shopping & Leisure',
      image:
        'https://images.unsplash.com/photo-1595053915747-0e625515c026?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Unilag, Akoka',
      description: 'Education',
      image:
        'https://images.unsplash.com/photo-1592323363827-b50a41768407?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="h-full flex flex-col items-center p-4 w-full overflow-y-auto bg-gray-50/50">
      <div className="w-full max-w-lg mt-8">
        <StopSearch onRouteSelected={handleRouteSelected} />
      </div>

      <div className="w-full max-w-lg mt-12 space-y-10 pb-20">
        {/* Recent Searches */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Clock size={16} className="text-gray-400" />
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Recent Searches
            </h3>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {recentSearches.map((item, i) => (
              <div
                key={i}
                onClick={() =>
                  handleRouteSelected(
                    { id: '1', name: item.from } as Stop,
                    { id: '2', name: item.to } as Stop,
                  )
                }
                className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-gray-900 font-medium">
                    {item.from} <span className="text-gray-300">→</span> {item.to}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{item.date}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-50 text-gray-400 group-hover:text-brand-600 transition-colors">
                  <TrendingUp size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <MapPin size={16} className="text-gray-400" />
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Trending Places
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {popularDestinations.map((place, i) => (
              <div
                key={i}
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
                onClick={() => console.log('Navigate to ' + place.name)}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-white font-bold leading-tight">{place.name}</h4>
                  <p className="text-white/70 text-xs mt-1 font-medium">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
