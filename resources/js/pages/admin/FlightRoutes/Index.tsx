import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import FlightRouteCard from '@/components/FlightRouteCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flights Route',
        href: '/flight-routes',
    },
];

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
  routes: FlightRoute[];
}

export default function Index({ routes }: Props) {

  const { flash } = usePage().props;
  
  return (
    <AppLayout breadcrumbs={breadcrumbs} >
      <Head title="Flight Routes Management" />
      
      <div className="min-h-screen bg-gray-50 py-8 md:px-6 p-4">
        {flash?.status && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {flash.status}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Flight Routes Management</h1>
          <Link
            href={route('admin.flight-routes.create')}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
          >
            <Plus className="w-4 md:flex hidden h-4 mr-2" /> Add Route
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes?.map((routee) => (
            <div key={route.id} className="relative group">
              <FlightRouteCard route={routee} />
              
              <div className="absolute bottom-2 right-2 flex space-x-2 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity">
                <Link
                  href={route('admin.flight-routes.edit', routee.id)}
                  className="p-1.5 bg-white/90 hover:bg-white rounded shadow"
                  preserveScroll
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </Link>
                
                <Link
                  href={route('admin.flight-routes.destroy', routee.id)}
                  method="delete"
                  as="button"
                  className="p-1.5 bg-white/90 hover:bg-white rounded shadow"
                  preserveScroll
                  
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
