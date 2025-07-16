import { useState } from 'react';
import { Trash2, Edit, Image as ImageIcon, Loader2, ArrowRightCircleIcon, XCircle, CheckCircle2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Slide {
    id: number;
    title: string;
    slide_url: string;
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Slides',
        href: '/admin/Slides',
    },
];


const SlidesAdmin = ({ slides }: { slides: Slide[] }) => {
    const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
    const [title, setTitle] = useState('');
    const [slide_url, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });

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
        formData.append('title', title);
        if (slide_url) formData.append('slide_url', slide_url);
        formData.append('_method', editingSlide ? 'PUT' : 'POST');

        try {
            const url = editingSlide
                ? `/admin/slides/${editingSlide.id}`
                : '/admin/slides';

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422 && data.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: data.errors
                    });
                    return;
                }

            }
		
	    
            slides = data.slides;          
  
            resetForm();
            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: `Slide request  ${editingSlide ? 'edited' : 'created'} successfully!.`,
                fieldErrors: {}
            });

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Falied to ${editingSlide ? 'edite' : 'create'} Slide.`,
                message: error instanceof Error ? error.message : 'Slide request failed! Please try again.',
                fieldErrors: {}
            });
            console.error('Error saving slide:', error);
        }
    };

    const handleEdit = (slide: Slide) => {
        setSubmissionState({
            loading: false,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        setEditingSlide(slide);
        setTitle(slide.title);
        setPreview(`/images/slidesd/${slide.slide_url}`);
    };

    const handleDelete = async (id: number) => {
        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        try {
            const response = await fetch(`/admin/slides/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422 && data.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: data.errors
                    });
                    return;
                }

            }
	    
            slides = data.slides;
            
	    setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: 'Slide deleted successfully!.',
                fieldErrors: {}
            });
        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
                message: 'Failed to delete slide. Please try again.',
                fieldErrors: {}
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const resetForm = () => {
        setEditingSlide(null);
        setTitle('');
        setImage(null);
        setPreview('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Slides" />
            <div className="min-h-screen bg-gray-100 text-black md:px-6 p-4">
                <div className="">
                    <div className="mb-4 sm:mb-0 md:sticky md:top-20 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">Slides Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                            Manage all available slides in your system.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1 md:max-h-fit md:sticky md:top-38">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                            </h2>

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

                            <form onSubmit={handleSubmit} encType=''>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {submissionState.fieldErrors?.title && (
                                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.title[0]}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Image</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            {preview ? (
                                                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500">
                                                        Click to upload image
                                                    </p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                required={!editingSlide}
                                            />
                                        </label>
                                    </div>
                                    {submissionState.fieldErrors?.slide_url && (
                                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.slide_url[0]}</p>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        disabled={submissionState.loading}
                                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submissionState.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {editingSlide ? (
                                            submissionState.loading ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    Update <ArrowRightCircleIcon className="ml-3 -mr-1 h-5 w-5" />
                                                </>
                                            )
                                        ) : (
                                            submissionState.loading ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    Create <ArrowRightCircleIcon className="ml-3 -mr-1 h-5 w-5" />
                                                </>
                                            )
                                        )}
                                    </button>
                                    {editingSlide && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Slides List */}
                        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2 mt-2">
                            <h2 className="text-xl font-semibold mb-4">Current Slides</h2>

                            {slides.length === 0 ? (
                                <p className="text-gray-500">No slides available. Add your first slide above.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {slides.map((slide) => (
                                        <div key={slide.id} className="border rounded-lg overflow-hidden">
                                            <div className="relative h-40 bg-gray-200">
                                                <img
                                                    src={`/images/slides/${slide.slide_url}`}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium">{slide.title}</h3>
                                                <div className="flex justify-end space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleEdit(slide)}
                                                        className="p-1 text-blue-600 hover:text-blue-800"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(slide.id)}
                                                        className="p-1 text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SlidesAdmin;
