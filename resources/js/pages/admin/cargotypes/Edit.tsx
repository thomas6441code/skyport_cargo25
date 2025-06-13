import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import CargoForm from './CreateEditForm';

interface cargoTypeProps {
    cargoType?: {
        id: number;
        name: string;
        description: string;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CargoType/Edit',
        href: '/admin/cargotypes/edit',
    },
];

const DepartmentEdit: React.FC<cargoTypeProps> = ({ cargoType }) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit CargoType`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit CargoType</h1>
                <div className="bg-white shadow rounded-lg p-6 max-w-lg">
                    <CargoForm cargoType={cargoType} />
                </div>
            </div>
        </AppLayout>
    );
};

export default DepartmentEdit;