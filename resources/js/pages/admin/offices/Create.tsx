import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import OfficeForm from './CreateEditForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offices/Create',
        href: '/admin/offices/create',
    },
];

const OfficesCreate: React.FC = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Office" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Office</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <OfficeForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default OfficesCreate;