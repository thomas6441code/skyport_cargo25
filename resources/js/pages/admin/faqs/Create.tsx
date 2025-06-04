import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import FaqForm from './CreateEditForm';

const FaqsCreate: React.FC = () => {
    return (
        <AppLayout>
            <Head title="Create New Faq" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Faqs</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <FaqForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default FaqsCreate;