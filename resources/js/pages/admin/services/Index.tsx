import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon, BookOpenCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import ServiceDetailModal from './ServiceDetailsModel';
import IconComponent from '@/components/common/IconComponent';

interface Service {
    id?: number;
    title: string;
    slug: string;
    image: string;
    icon: string;
    description: string;
    long_description: string;
    features: string[];
    benefits: string[];
    process_steps: string[];
    status?: 'active' | 'draft';
    featured?: boolean;
};

interface Props {
    services: Service[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: '/admin/services',
    },
];

export default function ServicesIndex({ services }: Props) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { flash } = usePage().props as { flash?: { success?: string } };

    const openModal = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />

            <div className="md:px-6 px-4 py-8">
                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dar:text-white">Services Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                            Manage all available services in your system
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.services.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Service
                        </Link>
                    </div>
                </div>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Services table */}
                <div className="bg-white dar:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dar:divide-gray-700">
                            <thead className="bg-gray-50 dar:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        S/Image
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {services.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50 ">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center rounded-md max-w-[10rem]">
                                                <div className="block text-gray-500 h-24 w-full bg-gray-100 rounded-md sm:text-sm">
                                                    <img
                                                        src={service.image}
                                                        className="w-full h-full rounded-md object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 rounded-md text-cyan-600 w-10">
                                                    <IconComponent icon={service.icon} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dar:text-white">
                                                        {service.title}
                                                        {service.featured && (
                                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dar:text-gray-400">/{service.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {service.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center gap-3">
                                                <Link
                                                    href={route('admin.services.edit', service.id)}
                                                    className="text-blue-600 hover:text-blue-900 dar:text-blue-400 dar:hover:text-blue-300 p-1 rounded-md hover:bg-blue-50 dar:hover:bg-blue-900/30"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <Button
                                                    key={service.id}
                                                    title='View'
                                                    onClick={() => openModal(service)}
                                                    className="text-orange-600 hover:text-orange-900 p-1 rounded-md hover:bg-orange-50"
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => e.key === 'Enter' && openModal(service)}
                                                >
                                                    <BookOpenCheck className="h-4 w-4" />
                                                </Button>
                                                <Link
                                                    method="delete"
                                                    href={route('admin.services.destroy', service.id)}
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 dar:text-red-400 dar:hover:text-red-300 p-1 rounded-md hover:bg-red-50 dar:hover:bg-red-900/30"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                <ServiceDetailModal
                    service={selectedService}
                    onClose={closeModal}
                />

                {/* Pagination would go here */}
                {services.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dar:text-gray-400">
                            No services found. Create your first service!
                        </div>
                        <Link
                            href={route('admin.services.create')}
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add New Service
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
