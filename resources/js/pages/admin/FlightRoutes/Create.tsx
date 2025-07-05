import AppLayout from '@/layouts/app-layout';
import Form from './Form';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Flights Route',
        href: '/admin/flight-routes',
    },
    {
        title: 'Create',
        href: '/admin/flight-routes/create',
    },
];

export default function Create() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Form />
    </AppLayout>
  );
}
