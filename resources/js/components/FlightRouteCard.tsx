import { Plane, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FlightRoute } from '@/types';

interface FlightRouteCardProps {
  route: FlightRoute;
}

export default function FlightRouteCard({ route }: FlightRouteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const days = Math.floor(parseInt(route.duration) / 24);
  
  return (
    <div
      className={`p-5 rounded-xl transition-all duration-300 shadow-md ${
        route.active
          ? 'bg-blue-50 border-2 border-blue-200 hover:border-blue-300'
          : 'bg-indigo-100 border-2 border-indigo-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          {/* Origin */}
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              route.active 
                ? 'bg-green-500 animate-pulse ring-2 ring-green-200' 
                : 'bg-gray-500 ring-2 ring-gray-200'
            }`} />
            <div>
              <h3 className="font-bold text-gray-800">
                {route.origin_city} <span className="text-blue-600">({route.origin_code})</span>
              </h3>
            </div>
          </div>

          {/* Flight Path */}
          <div className="ml-5 pl-3 border-l-2 border-gray-300 space-y-3">
            {/* Departure */}
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-600 rotate-90" />
              <span className="text-sm font-medium text-gray-700">
                Departs: <span className="text-gray-900">{route.departure_time}</span>
              </span>
            </div>
            
            {/* Stops */}
            {expanded && route.stops.map((stop, index) => (
              <div key={stop.id || index} className="flex items-center gap-2 ml-3">
                <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Stop {index + 1}:</span> {stop.location} <span className="text-amber-600">({stop.code})</span>
                </span>
              </div>
            ))}
            
            {/* Arrival */}
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-600 rotate-90" />
              <span className="text-sm font-medium text-gray-700">
                Arrives: <span className="text-gray-900">{route.arrival_time}</span> (+{days} day{days !== 1 ? 's' : ''})
              </span>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200" />
            <h3 className="font-bold text-gray-800">
              {route.destination_city} <span className="text-blue-600">({route.destination_code})</span>
            </h3>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="text-right space-y-2 min-w-[100px]">
          <div className="text-lg font-bold text-blue-700">
            {route.duration}Hrs
          </div>
          
          <div className={`text-sm font-medium px-1 text-center py-1 rounded-full ${
            route.stops.length > 0 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {route.stops.length > 0 ? (
              `${route.stops.length} ${route.stops.length === 1 ? 'Stop' : 'Stops'}`
            ) : (
              'Non-stop'
            )}
          </div>
          
          {!route.active && (
            <div className="text-xs font-semibold px-1 py-1 text-center rounded-full bg-amber-200 text-gray-900">
              Coming soon
            </div>
          )}
          
          {!expanded && route.stops.length > 0 && (
            <div className="text-xs text-gray-600 mt-1">
              via {route.stops.map(s => s.location).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center  gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Show details
            </>
          )}
        </button>
      </div>
    </div>
  );
}
