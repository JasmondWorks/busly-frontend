import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Navigation } from 'lucide-react';
import { navigationApi } from '../services/navigation.api';
import type { Stop } from '../types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface StopSearchProps {
  onRouteSelected: (origin: Stop, destination: Stop) => void;
}

interface StopPickerProps {
  label: string;
  selected: Stop | null;
  onSelect: (stop: Stop | null) => void;
  results: Stop[];
  onSearch: (val: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  placeholder: string;
  icon: React.ReactNode;
  enableCurrentLocation?: boolean;
}

const StopPicker = ({
  label,
  selected,
  onSelect,
  results,
  onSearch,
  open,
  setOpen,
  placeholder,
  icon,
  enableCurrentLocation,
}: StopPickerProps) => {
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleUseCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const nearest = await navigationApi.findNearestStop(latitude, longitude);
            onSelect(nearest); // We call onSelect directly
            setOpen(false);
          } catch (e) {
            console.error(e);
          } finally {
            setLoadingLocation(false);
          }
        },
        (err) => {
          console.error(err);
          setLoadingLocation(false);
        },
      );
    }
  };

  return (
    <div className="relative mb-6">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50 bg-white h-12 px-3',
              !selected && 'text-muted-foreground',
              open && 'border-brand-600 ring-2 ring-brand-100',
            )}
          >
            <div className="mr-3 text-gray-400 shrink-0">{icon}</div>
            <span className="truncate block flex-1 text-gray-900">
              {selected ? selected.name : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white z-[100]"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} onValueChange={onSearch} />
            <CommandList>
              <CommandEmpty>No stop found.</CommandEmpty>
              <CommandGroup>
                {enableCurrentLocation && (
                  <CommandItem
                    onSelect={handleUseCurrentLocation}
                    className="cursor-pointer text-brand-600 font-medium"
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    {loadingLocation ? 'Locating...' : 'Use Current Location'}
                  </CommandItem>
                )}
                {results.map((stop) => (
                  <CommandItem
                    key={stop.id}
                    value={stop.name}
                    onSelect={() => {
                      onSelect(stop);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="flex flex-col">
                      <span>{stop.name}</span>
                      {stop.description && (
                        <span className="text-xs text-gray-400 text-muted-foreground">
                          {stop.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const StopSearch = ({ onRouteSelected }: StopSearchProps) => {
  const [originResults, setOriginResults] = useState<Stop[]>([]);
  const [destResults, setDestResults] = useState<Stop[]>([]);

  const [selectedOrigin, setSelectedOrigin] = useState<Stop | null>(null);
  const [selectedDest, setSelectedDest] = useState<Stop | null>(null);

  const [originOpen, setOriginOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  // Generic search handler
  const handleSearch = async (query: string, setResults: (stops: Stop[]) => void) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    try {
      const results = await navigationApi.searchStops(query);
      setResults(results);
      console.log(results);
    } catch (error) {
      console.error(error);
      setResults([]);
    }
  };

  const handleFindRoute = () => {
    if (selectedOrigin && selectedDest) {
      onRouteSelected(selectedOrigin, selectedDest);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-8 text-gray-900 tracking-tight">Plan your journey</h2>

      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-[20px] top-[45px] bottom-[45px] w-px bg-gray-200 hidden sm:block z-0"></div>

        <div className="relative z-10">
          <StopPicker
            label="Origin"
            selected={selectedOrigin}
            onSelect={setSelectedOrigin}
            results={originResults}
            onSearch={(val) => handleSearch(val, setOriginResults)}
            open={originOpen}
            setOpen={setOriginOpen}
            placeholder="Search origin stop..."
            icon={
              <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-400 bg-white"></div>
            }
            enableCurrentLocation={true}
          />

          <StopPicker
            label="Destination"
            selected={selectedDest}
            onSelect={setSelectedDest}
            results={destResults}
            onSearch={(val) => handleSearch(val, setDestResults)}
            open={destOpen}
            setOpen={setDestOpen}
            placeholder="Search destination stop..."
            icon={<MapPin size={16} className="text-brand-600" />}
          />
        </div>
      </div>

      <button
        disabled={!selectedOrigin || !selectedDest}
        onClick={handleFindRoute}
        className={cn(
          'w-full py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-2',
          selectedOrigin && selectedDest
            ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-sm'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200',
        )}
      >
        Find Route <ArrowRight size={16} />
      </button>
    </div>
  );
};
