import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import OfficeForm from './CreateEditForm';
import DepartmentForm from './CreateEditForm';
import { BreadcrumbItem } from '@/types';

interface DepartmentProps {
    department?: {
        id: number;
        name: string;
        description: string;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Department/Edit',
        href: '/admin/departments/edit',
    },
];

const DepartmentEdit: React.FC<DepartmentProps> = ({ department }) => {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Department`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Department</h1>
                <div className="bg-white shadow rounded-lg p-6 max-w-lg">
                    <DepartmentForm department={department} />
                </div>
            </div>
        </AppLayout>
    );
};

export default DepartmentEdit;