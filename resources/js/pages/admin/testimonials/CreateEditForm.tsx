import { useForm } from '@inertiajs/react';
import { useState, useCallback, ChangeEvent } from 'react';
import { XCircle } from 'lucide-react';
import { CheckCircle2, OptionIcon } from 'lucide-react';

interface testimonial {
    'id': number;
    'name': string;
    'role': string;
    'content': string;
    'rating': number;
    'image': string;
    'category': string;
};


interface service {
    id: number;
    title: string;
};

interface FormProps {

    service: service[];
    testimonial: testimonial;

}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const TestimonialForm: React.FC<FormProps> = ({ service, testimonial }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(testimonial?.image || '');
    const { data, setData, processing } = useForm({
        name: testimonial?.name || '',
        image: testimonial?.image || '',
        role: testimonial?.role || '',
        content: testimonial?.content || '',
        rating: testimonial?.rating || 0,
        category: testimonial?.category || '',
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

        formData.append('name', data.name);
        formData.append('role', data.role);
        formData.append('rating', data.rating.toString());
        formData.append('content', data.content);
        formData.append('category', data.category);

        if (testimonial?.id) {

            formData.append('_method', 'PUT');

        }

        // Handle image file
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (data.image) {
            formData.append('existing_image', data.image);
        }

        try {
            const url = testimonial?.id
                ? route('admin.testimonials.update', testimonial.id)
                : route('admin.testimonials.store');

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
            window.location.href = route('admin.testimonials.index');

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Failed to ${testimonial?.id ? 'update' : 'create'} testimonial.`,
                message: error instanceof Error ? error.message : 'Testimonial request failed! Please try again.',
                fieldErrors: {}
            });
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black" encType="multipart/form-data">
            <div className='grid md:grid-cols-3 gap-4'>
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name*
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-2 block px-3 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {submissionState.fieldErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.name[0]}</p>
                    )}
                </div>

                {/* Rating */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Rating *
                    </label>
                    <input
                        type="number"
                        id="rating"
                        value={data.rating}
                        onChange={(e) => setData('rating', parseInt(e.target.value))}
                        className="mt-2 block px-3 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {submissionState.fieldErrors.rating && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.rating[0]}</p>
                    )}
                </div>

                {/* Role Selection */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role *
                    </label>
                    <div className='flex flex-1 items-center gap-4'>
                        <input
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="mt-1 px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />

                    </div>
                    {submissionState.fieldErrors.role && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.role[0]}</p>
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

                <div>
                    <label className="block text-sm text-gray-700 mb-1">Category *</label>
                    <div className="relative">
                        <OptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 ${submissionState?.fieldErrors.category
                                ? 'border-red-500'
                                : 'border-gray-300'
                                }`}
                            value={data.category || ''}
                            onChange={(e) => setData({ ...data, category: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            <option value="0">Tracking Faq</option>
                            {service?.map((dept) => (
                                <option key={dept.id} value={dept.id}>{dept.title} Faq</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            {/* Content */}
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Short Content*
                </label>
                <textarea
                    id="content"
                    rows={3}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {submissionState.fieldErrors.content && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.content[0]}</p>
                )}
            </div>


            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : testimonial?.id ? 'Update Testimonial' : 'Create Testimonial'}
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

export default TestimonialForm;