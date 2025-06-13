import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import OfficeForm from './CreateEditForm';

interface OfficeProps {
    office?: {
        id: number;
        coordinates: [number, number];
        country: string;
        city: string;
        address?: string;
        email?: string;
        phone?: string;
        hours?: string;
        color?: string;
    }
}

const OfficeEdit: React.FC<OfficeProps> = ({ office }) => {

    return (
        <AppLayout>
            <Head title={`Edit Office`} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit office</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <OfficeForm office={office} />
                </div>
            </div>
        </AppLayout>
    );
};

export default OfficeEdit;