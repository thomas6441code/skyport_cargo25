import { useForm } from '@inertiajs/react';
import { useState, useCallback, ChangeEvent } from 'react';
import IconComponent from '@/components/common/IconComponent';
import { XCircle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

interface ServiceFormProps {
    service?: {
        id?: number;
        title: string;
        image: string;
        icon: string;
        description: string;
        long_description: string;
        features: string[];
        benefits: string[];
        process_steps: string[];
    };
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(service?.image || '');
    const { data, setData, processing } = useForm({
        title: service?.title || '',
        image: service?.image || '',
        icon: service?.icon || '',
        description: service?.description || '',
        long_description: service?.long_description || '',
        features: service?.features || [''],
        benefits: service?.benefits || [''],
        process_steps: service?.process_steps || [''],
    });
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });



    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setData('image', '');

            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);


    console.log(submissionState.fieldErrors)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('icon', data.icon);
        formData.append('description', data.description);
        formData.append('long_description', data.long_description);

        if (service?.id) {

            formData.append('_method', 'PUT');

        }

        data.benefits.forEach((benefit, index) => {
            if (benefit.trim() !== '') {
                formData.append(`benefits[${index}]`, benefit);
            }
        });

        data.features.forEach((feature, index) => {
            if (feature.trim() !== '') {
                formData.append(`features[${index}]`, feature);
            }
        });

        data.process_steps.forEach((process_step, index) => {
            if (process_step.trim() !== '') {
                formData.append(`process_steps[${index}]`, process_step);
            }
        });

        // Handle image file
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (data.image) {
            formData.append('existing_image', data.image);
        }

        try {
            const url = service?.id
                ? route('admin.services.update', service.id)
                : route('admin.services.store');


            console.log(formData.entries())

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'include',
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (response.status === 422 && responseData.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: responseData.errors
                    });
                    return;
                }
                throw new Error(responseData.message || 'Request failed');
            }

            // Handle successful response
            window.location.href = route('admin.services.index');

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Failed to ${service?.id ? 'update' : 'create'} service.`,
                message: error instanceof Error ? error.message : 'Service request failed! Please try again.',
                fieldErrors: {}
            });
        }
    };

    const handleArrayChange = (field: 'features' | 'benefits' | 'process_steps', index: number, value: string) => {
        const newArray = [...data[field]];
        newArray[index] = value;
        setData(field, newArray);
    };

    const addArrayItem = (field: 'features' | 'benefits' | 'process_steps') => {
        setData(field, [...data[field], '']);
    };

    const removeArrayItem = (field: 'features' | 'benefits' | 'process_steps', index: number) => {
        const newArray = [...data[field]];
        newArray.splice(index, 1);
        setData(field, newArray);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black" encType="multipart/form-data">
            <div className='grid md:grid-cols-3 gap-4'>
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title*
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-2 block px-3 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {submissionState.fieldErrors.title && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.title[0]}</p>
                    )}
                </div>

                {/* Icon Selection */}
                <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon*
                    </label>
                    <div className='flex flex-1 items-center gap-4'>
                        <input
                            id="icon"
                            value={data.icon}
                            onChange={(e) => setData('icon', e.target.value)}
                            className="mt-1 px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {data.icon && (
                            <div className='text-sky-900'>
                                <IconComponent icon={data.icon} />
                            </div>
                        )}
                    </div>
                    {submissionState.fieldErrors.icon && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.icon[0]}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image*
                    </label>
                    <div className="mt-1 px-3 py-2 flex items-center">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-16 w-16 object-cover rounded-md mr-4"
                            />
                        )}
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>
                {submissionState.fieldErrors.image && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.image[0]}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Short Description*
                </label>
                <textarea
                    id="description"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {submissionState.fieldErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.description[0]}</p>
                )}
            </div>

            {/* Long Description */}
            <div>
                <label htmlFor="long_description" className="block text-sm font-medium text-gray-700">
                    Detailed Description*
                </label>
                <textarea
                    id="long_description"
                    rows={5}
                    value={data.long_description}
                    onChange={(e) => setData('long_description', e.target.value)}
                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {submissionState.fieldErrors.long_description && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.long_description[0]}</p>
                )}
            </div>

            <div className='grid md:grid-cols-3 gap-4'>
                {/* Features */}
                <div>
                    <label className="block font-medium text-gray-700">Features*</label>
                    {data.features.map((feature, index) => (
                        <div key={index} className="mt-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleArrayChange('features', index, e.target.value)}
                                className="flex-1 block px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('features', index)}
                                className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('features')}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Feature
                    </button>
                    {submissionState.fieldErrors.features && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.features[0]}</p>
                    )}
                </div>

                {/* Benefits */}
                <div>
                    <label className="block font-medium text-gray-700">Benefits*</label>
                    {data.benefits.map((benefit, index) => (
                        <div key={index} className="mt-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={benefit}
                                onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                                className="flex-1 block px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('benefits', index)}
                                className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('benefits')}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Benefit
                    </button>
                    {submissionState.fieldErrors.benefits && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.benefits[0]}</p>
                    )}
                </div>

                {/* Process Steps */}
                <div>
                    <label className="block font-medium text-gray-700">Process Steps*</label>
                    {data.process_steps.map((step, index) => (
                        <div key={index} className="mt-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={step}
                                onChange={(e) => handleArrayChange('process_steps', index, e.target.value)}
                                className="flex-1 block px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('process_steps', index)}
                                className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('process_steps')}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Process Step
                    </button>
                    {submissionState.fieldErrors.process_steps && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.process_steps[0]}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : service?.id ? 'Update Service' : 'Create Service'}
                </button>
            </div>

            {/* Success Message */}
            {submissionState.success && (
                <div className="bg-green-50 border-green-500 p-2 rounded-xl mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="">
                            <h3 className="text-sm ml-3 font-medium text-green-800">
                                Success!
                            </h3>
                            <div className="text-sm ml-3 text-green-700">
                                {submissionState.message}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {submissionState.error && (
                <div className="bg-red-50 border-red-500 p-2 rounded-xl mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="">
                            <h3 className="text-sm font-medium ml-3 text-red-800">
                                {submissionState.error}
                            </h3>
                            {submissionState.message && (
                                <div className="ml-3 text-sm text-red-700">
                                    {submissionState.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </form>
    );
};

export default ServiceForm;