import AppLayout from '@/layouts/app-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flights Route',
        href: '/admin/flight-routes',
    },
    {
        title: 'Edit',
        href: '/admin/flight-routes/edit',
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
  route: FlightRoute;
}

export default function Edit({ route }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Form routee={route} />
    </AppLayout>
  );
}
