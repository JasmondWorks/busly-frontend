import { LandmarkCard } from './LandmarkCard';

interface Landmark {
  id: string;
  type: 'system' | 'user';
  author?: string; // If user generated
  privacy?: 'public' | 'private';
  hint: string;
  detail: string;
  image?: string | null;
  votes?: number;
}

interface Stop {
  id: string;
  name: string;
  time: string;
  status: 'past' | 'current' | 'future';
  landmarks?: Landmark[];
}

export function NavigationTimeline({
  stops,
  onStopClick,
}: {
  stops: Stop[];
  onStopClick?: (stopId: string) => void;
}) {
  return (
    <div className="px-6 py-4">
      {stops.map((stop, index) => (
        <TimelineItem
          key={stop.id}
          stop={stop}
          isLast={index === stops.length - 1}
          onClick={() => onStopClick?.(stop.id)}
        />
      ))}
    </div>
  );
}

function TimelineItem({
  stop,
  isLast,
  onClick,
}: {
  stop: Stop;
  isLast: boolean;
  onClick?: () => void;
}) {
  const isCurrent = stop.status === 'current';
  const isPast = stop.status === 'past';

  return (
    <div className="flex gap-4 relative">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full z-10 ${isCurrent ? 'bg-orange-500 ring-4 ring-orange-100' : isPast ? 'bg-orange-500' : 'bg-gray-300'}`}
        />
        {!isLast && <div className="w-0.5 flex-1 bg-gray-100 -my-1 min-h-16" />}
      </div>

      <div className="flex-1 pb-8">
        <div className="flex justify-between items-start cursor-pointer group" onClick={onClick}>
          <div>
            <h3
              className={`font-bold text-lg group-hover:text-brand-600 transition-colors ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}
            >
              {stop.name}
            </h3>
            <span
              className={`text-sm font-medium ${isCurrent ? 'text-orange-600' : 'text-gray-400'}`}
            >
              {stop.time}
            </span>
          </div>
        </div>

        {isCurrent && stop.landmarks && stop.landmarks.length > 0 && (
          <LandmarkCard landmarks={stop.landmarks} stopName={stop.name} />
        )}
      </div>
    </div>
  );
}
