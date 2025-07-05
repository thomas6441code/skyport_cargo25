import { Link, Head, useForm, usePage } from '@inertiajs/react';
import { X, Plane, Plus, Minus } from 'lucide-react';

 interface RouteStop {
  id?: number;
  location: string;
  code: string;
  order?: number;
}

 interface FlightRoute {
  id?: number;
  origin_city: string;
  origin_code: string;
  destination_city: string;
  destination_code: string;
  duration: string;
  active: boolean;
  departure_time: string;
  arrival_time: string;
  stops: RouteStop[];
  created_at?: string;
  updated_at?: string;
}


interface Props {
  routee?: FlightRoute;
}

export default function Form({ routee }: Props) {
  const { errors } = usePage().props;
  
  const { data, setData, post, put, processing } = useForm({
    origin_city: routee?.origin_city || '',
    origin_code: routee?.origin_code || '',
    destination_city: routee?.destination_city || '',
    destination_code: routee?.destination_code || '',
    duration: routee?.duration || '',
    active: routee?.active ?? true,
    departure_time: routee?.departure_time || '',
    arrival_time: routee?.arrival_time || '',
    stops: routee?.stops || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (routee) {
      put(route('admin.flight-routes.update', routee.id));
    } else {
      post(route('admin.flight-routes.store'));
    }
  };

  const addStop = () => {
    setData('stops', [...data.stops, { location: '', code: '' }]);
  };

  const removeStop = (index: number) => {
    const updatedStops = [...data.stops];
    updatedStops.splice(index, 1);
    setData('stops', updatedStops);
  };

  const updateStop = (index: number, field: string, value: string) => {
    const updatedStops = [...data.stops];
    updatedStops[index] = { ...updatedStops[index], [field]: value };
    setData('stops', updatedStops);
  };

  return (
    <>
      <Head title={routee ? 'Edit Flight Route' : 'Create Flight Route'} />
      
      <div className="container text-black mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              {routee ? 'Edit Flight Route' : 'Create New Flight Route'}
            </h2>
            <Link
              href={route('admin.flight-routes.index')}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin City
                </label>
                <input
                  type="text"
                  value={data.origin_city}
                  onChange={(e) => setData('origin_city', e.target.value)}
                  className="w-full py-3 px-2 rounded-md border-gray-300 shadow-sm"
                />
                {errors.origin_city && (
                  <p className="mt-1 text-sm text-red-600">{errors.origin_city}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin Code
                </label>
                <input
                  type="text"
                  value={data.origin_code}
                  onChange={(e) => setData('origin_code', e.target.value.toUpperCase())}
                  maxLength={3}
                  className="w-full rounded-md py-3 px-2 border-gray-300 shadow-sm uppercase"
                />
                {errors.origin_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.origin_code}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination City
                </label>
                <input
                  type="text"
                  value={data.destination_city}
                  onChange={(e) => setData('destination_city', e.target.value)}
                  className="w-full rounded-md border-gray-300 py-3 px-2 shadow-sm"
                />
                {errors.destination_city && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination_city}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Code
                </label>
                <input
                  type="text"
                  value={data.destination_code}
                  onChange={(e) => setData('destination_code', e.target.value.toUpperCase())}
                  maxLength={3}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2 uppercase"
                />
                {errors.destination_code && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination_code}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (hours)
                </label>
                <input
                  type="text"
                  value={data.duration}
                  onChange={(e) => setData('duration', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={data.active ? 'true' : 'false'}
                  onChange={(e) => setData('active', e.target.value === 'true')}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time
                </label>
                <input
                  type="time"
                  value={data.departure_time}
                  onChange={(e) => setData('departure_time', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2"
                />
                {errors.departure_time && (
                  <p className="mt-1 text-sm text-red-600">{errors.departure_time}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Time
                </label>
                <input
                  type="time"
                  value={data.arrival_time}
                  onChange={(e) => setData('arrival_time', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2"
                />
                {errors.arrival_time && (
                  <p className="mt-1 text-sm text-red-600">{errors.arrival_time}</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-900">Route Stops</h3>
                <button
                  type="button"
                  onClick={addStop}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Stop
                </button>
              </div>
              
              {data.stops.length === 0 ? (
                <div className="text-center py-4 text-sm text-gray-500">
                  No stops added (direct flight)
                </div>
              ) : (
                <div className="space-y-4">
                  {data.stops.map((stop, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={stop.location}
                          onChange={(e) => updateStop(index, 'location', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm py-3 px-2 text-sm"
                        />
                        {errors[`stops.${index}.location`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`stops.${index}.location`]}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Airport Code
                        </label>
                        <input
                          type="text"
                          value={stop.code}
                          onChange={(e) => updateStop(index, 'code', e.target.value.toUpperCase())}
                          maxLength={3}
                          className="w-full rounded-md border-gray-300 shadow-sm text-sm py-3 px-2 uppercase"
                        />
                        {errors[`stops.${index}.code`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`stops.${index}.code`]}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeStop(index)}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                        >
                          <Minus className="w-3 h-3 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link
                href={route('admin.flight-routes.index')}
                className="px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-md disabled:opacity-50"
              >
                {processing ? 'Saving...' : 'Save Route'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
