import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {  XCircle, CheckCircle, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface CompanyData {
    id?: number;
    vision: string;
    mission: string;
    core_values: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mission & Vision',
        href: '/admin/company/mission-vision',
    },
];

export default function MissionVision() {
    const { companyData, flash, errors: pageErrors } = usePage().props as { 
        companyData: CompanyData;
        flash?: { success?: string; error?: string };
        errors?: { value?: string };
    };

    const { data, setData, post, processing, errors } = useForm({
        vision: companyData.vision,
        mission: companyData.mission,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.company.mission-vision'));
    };

      const { 
        data: coreValueData, 
        setData: setCoreValueData, 
        post: postCoreValue, 
        reset: resetCoreValue, 
        processing: processingCoreValue,
        errors: coreValueErrors 
    } = useForm({
        value: '',
    });


    const submitCoreValue = (e: React.FormEvent) => {
        e.preventDefault();
        postCoreValue(route('admin.company.mission-vision.core-values.add'), {
            preserveScroll: true,
            onSuccess: () => resetCoreValue(),
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Mission & Vision" />

            <div className="md:px-6 text-black px-4 py-8">
                

                <div className="sm:flex sm:items-center sm:justify-between mb-8">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900">Mission & Vision</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage company mission, vision and core values
                        </p>
                    </div>
                </div>
               {/* Flash messages */}
	            

		{flash?.error && (
		    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
		        <XCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
		        <div>{flash.error}</div>
		    </div>
		)}
		{flash?.success && (
		    <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
		        <CheckCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
		        <div>{flash.success}</div>
		    </div>
		)}

                <div className="grid grid-cols-1 gap-8">
                    {/* Vision & Mission Form */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6">
                        <form onSubmit={submit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">
                                        Vision
                                    </label>
                                    <textarea
                                        id="vision"
                                        value={data.vision}
                                        onChange={(e) => setData('vision', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                    />
                                    {errors.vision && <p className="mt-1 text-sm text-red-600">{errors.vision}</p>}
                                </div>

                                <div>
                                    <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mission
                                    </label>
                                    <textarea
                                        id="mission"
                                        value={data.mission}
                                        onChange={(e) => setData('mission', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                    />
                                    {errors.mission && <p className="mt-1 text-sm text-red-600">{errors.mission}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Core Values Section */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Core Values</h2>
                        </div>
			    

                        <div className="p-6">
                            {companyData.core_values?.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {companyData.core_values.map((value, index) => (
                                        <li key={index} className="py-4 flex justify-between items-center">
                                            <span className="text-gray-800">{value}</span>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('admin.company.mission-vision.core-values.delete', index)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No core values added yet.</p>
                            )}

                             <form onSubmit={submitCoreValue} className="mt-6 flex">
			        <input
			            type="text"
			            name="value"
			            value={coreValueData.value}
			            onChange={(e) => setCoreValueData('value', e.target.value)}
			            required
				    className={`flex-1 px-3 py-2 border ${coreValueErrors.value || pageErrors?.value ? 'border-red-300' : 'border-gray-300'} rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
		                    placeholder="Add new core value"	
			        />
			        <button
			            type="submit"
			            disabled={processingCoreValue}
			            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			        >
			            {processingCoreValue ? 'Adding...' : <PlusIcon className="h-4 w-4" />}
			        </button>
				 {(coreValueErrors.value || pageErrors?.value) && (
		                    <p className="mt-1 text-sm text-red-600">
		                        {coreValueErrors.value || pageErrors?.value}
		                    </p>
		                )}
			    </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
