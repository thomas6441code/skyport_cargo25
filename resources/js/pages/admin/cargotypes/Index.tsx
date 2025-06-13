import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';


interface cargotype {
    'id': number;
    'name': string;
    'description': string;
}

interface Props {
    cargotypes: cargotype[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CargoType',
        href: '/admin/cargotypes',
    },
];

export default function officesIndex({ cargotypes }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cargo Types" />

            <div className="px-4 py-8">

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}

                {/* Header with actions */}
                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900 dar:text-white">CargoTypes Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                            Manage all available cargo-types in your system
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.cargotypes.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Cargo-Type
                        </Link>
                    </div>
                </div>


                {/* cargotypes table */}
                <div className="bg-white dar:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dar:divide-gray-700">
                            <thead className="bg-gray-50 dar:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Descrption
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {cargotypes.map((cargotype, index) => (
                                    <tr key={cargotype.id} className="hover:bg-gray-50 dar:hover:bg-gray-700/50">
                                        <td className="px-6 py-3 text-left text-sm text-gray-500 dar:text-gray-300 uppercase tracking-wider">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {cargotype.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dar:text-gray-200 line-clamp-2 max-w-xs">
                                                {cargotype.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end items-center gap-3">
                                                <Link
                                                    href={route('admin.cargotypes.edit', cargotype.id)}
                                                    className="text-blue-600 hover:text-blue-900 dar:text-blue-400 dar:hover:text-blue-300 p-1 rounded-md hover:bg-blue-50 dar:hover:bg-blue-900/30"
                                                    title="Edit"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    method="delete"
                                                    href={route('admin.cargotypes.destroy', cargotype.id)}
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

                {cargotypes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dar:text-gray-400">
                            No cargo-types found. Create your first cargo-type!
                        </div>
                        <Link
                            href={route('admin.cargotypes.create')}
                            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add New Cargo-Type.
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}