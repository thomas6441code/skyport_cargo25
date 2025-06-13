import { FormEventHandler, useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Box,
    Calendar,
    Package,
    ArrowRight,
    Loader2,
    CheckCircle2,
    XCircle,
    InfoIcon
} from 'lucide-react';

interface QuoteFormProps {
    defaultOrigin?: string;
    defaultDestination?: string;
    cargoTypes?: {
        id: number;
        name: string;
        description: string;
    }[];
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    zipCode: string;
    origin: string;
    destination: string;
    cargoType: string;
    cargoDescription: string;
    weight: string;
    dimensions: string;
    readyDate: string;
    specialRequirements: string;
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

export function QuoteForm({ defaultOrigin = '', defaultDestination = '', cargoTypes = [] }: QuoteFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        location: '',
        zipCode: '',
        origin: defaultOrigin,
        destination: defaultDestination,
        cargoType: cargoTypes[0].name || '',
        cargoDescription: '',
        weight: '',
        dimensions: '',
        readyDate: '',
        specialRequirements: ''
    });

    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        setSubmissionState({
            loading: true,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const res = await fetch(route('quotes.store'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 422 && data.errors) {
                    setSubmissionState({
                        loading: false,
                        success: false,
                        error: 'Please fix the form errors',
                        message: 'Please correct the highlighted fields',
                        fieldErrors: data.errors
                    });
                    return;
                }
                throw new Error(data.message || 'Failed to submit quote');
            }

            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: 'Quote request submitted successfully! Our team will contact you shortly.',
                fieldErrors: {}
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                zipCode: '',
                origin: defaultOrigin,
                destination: defaultDestination,
                cargoType: cargoTypes[0]?.name || '',
                cargoDescription: '',
                weight: '',
                dimensions: '',
                readyDate: '',
                specialRequirements: ''
            });

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
                message: 'Failed to submit quote. Please try again.',
                fieldErrors: {}
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">


            <h3 className="text-lg pt-2 font-medium text-gray-900">Contact Information</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.name && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.name[0]}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.email && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.email[0]}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.phone && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.phone[0]}</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.location && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.location[0]}</p>
                    )}
                </div>

                {/* Zip Code */}
                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP/Postal Code
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.zipCode ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.zipCode && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.zipCode[0]}</p>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900">Shipment Details</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Origin */}
                <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                        Origin
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            className={`block w-full pl-3 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.origin ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.origin && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.origin[0]}</p>
                    )}
                </div>

                {/* Destination */}
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                        Destination
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            className={`block w-full pl-3 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.destination ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.destination && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.destination[0]}</p>
                    )}
                </div>

                {/* Cargo Type */}
                {cargoTypes?.length > 0 && (
                    <div>
                        <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700">
                            Cargo Type
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Box className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                id="cargoType"
                                name="cargoType"
                                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.cargoType ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                value={formData.cargoType}
                                onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                                required
                            >
                                {cargoTypes.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <p className="text-xs mt-2 text-gray-500 flex items-center">
                            <InfoIcon className="mr-1 h-4 w-4 text-gray-500" />
                            {cargoTypes.find(t => t.name === formData.cargoType)?.description}
                        </p>
                        {submissionState.fieldErrors?.cargoType && (
                            <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.cargoType[0]}</p>
                        )}
                    </div>
                )}

                {/* Ready Date */}
                <div>
                    <label htmlFor="readyDate" className="block text-sm font-medium text-gray-700">
                        Ready Date
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            id="readyDate"
                            name="readyDate"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.readyDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.readyDate}
                            onChange={(e) => setFormData({ ...formData, readyDate: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.readyDate && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.readyDate[0]}</p>
                    )}
                </div>

                {/* Weight */}
                <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                        Weight (kg)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.weight ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.weight && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.weight[0]}</p>
                    )}
                </div>

                {/* Dimensions */}
                <div>
                    <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">
                        Dimensions (L x W x H in cm)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="dimensions"
                            name="dimensions"
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.dimensions ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.dimensions}
                            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                            required
                        />
                    </div>
                    {submissionState.fieldErrors?.dimensions && (
                        <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.dimensions[0]}</p>
                    )}
                </div>
            </div>

            {/* Cargo Description */}
            <div>
                <label htmlFor="cargoDescription" className="block text-sm font-medium text-gray-700">
                    Cargo Description
                </label>
                <div className="mt-1">
                    <textarea
                        id="cargoDescription"
                        name="cargoDescription"
                        rows={3}
                        className={`block w-full pl-3 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.cargoDescription ? 'border-red-500' : 'border-gray-300'
                            }`}
                        value={formData.cargoDescription}
                        onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
                        required
                    />
                </div>
                {submissionState.fieldErrors?.cargoDescription && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.cargoDescription[0]}</p>
                )}
            </div>

            {/* Special Requirements */}
            <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
                    Special Requirements
                </label>
                <div className="mt-1">
                    <textarea
                        id="specialRequirements"
                        name="specialRequirements"
                        rows={2}
                        className={`block w-full pl-3 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${submissionState.fieldErrors?.specialRequirements ? 'border-red-500' : 'border-gray-300'
                            }`}
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    />
                </div>
                {submissionState.fieldErrors?.specialRequirements && (
                    <p className="mt-1 text-sm text-red-600">{submissionState.fieldErrors.specialRequirements[0]}</p>
                )}
            </div>

            {/* Success Message */}
            {submissionState.success && (
                <div className="bg-green-50 border-green-500 p-2 rounded-xl mb-6">
                    <div className="flex backdrop-blur-xs">
                        <div className="flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="">
                            <h3 className="text-sm ml-3 font-medium text-green-800">
                                Success!
                            </h3>
                            <div className="mt-2 ml-3 text-sm text-green-700">
                                {submissionState.message}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {submissionState.error && (
                <div className="bg-red-50 border-red-500 p-2 rounded-xl mb-6">
                    <div className="flex backdrop-blur-xs">
                        <div className="flex-shrink-0">
                            <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="">
                            <h3 className="text-sm font-medium ml-3 text-red-800">
                                {submissionState.error}
                            </h3>
                            {submissionState.message && (
                                <div className="mt-2 text-sm text-red-700">
                                    {submissionState.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={submissionState.loading}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submissionState.loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {submissionState.loading ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Submit Quote <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
                        </>
                    )}
                </button>
            </div>

            <div className="mt-8 bg-gray-50 border-t border-green-200">
                <p className="text-sm p-2 text-gray-600 flex items-center">
                    <InfoIcon className="mr-2 h-4 w-4 text-gray-500" />
                    Quotes are valid for 7 days. For special cargo, contact our team.
                </p>
            </div>
        </form>
    );
}
