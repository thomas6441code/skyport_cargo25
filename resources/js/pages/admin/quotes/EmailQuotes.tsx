import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';

interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    zip_code: string;
    origin: string;
    destination: string;
    cargo_type: string;
    cargo_description: string;
    weight: number;
    dimensions: string;
    ready_date: string;
    special_requirements: string;
    is_answered: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Quotes', href: '/admin/quotes' },
    { title: 'Reply', href: '#' },
];

export default function AdminQuotesPage({ quote }: { quote: Quote }) {
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [emailContent, setEmailContent] = useState(`Thank you for your quote request regarding shipping from ${quote?.origin} to ${quote?.destination}.
Your shipment costs : 200$. `);
    const [emailSubject, setEmailSubject] = useState(`Re: Your Shipping Quote #${quote.id}`);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    useEffect(() => {
        setSelectedQuote(quote);
    }, [quote]);

    const sendEmail = async () => {
        if (!selectedQuote || !emailContent.trim()) return;

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        try {
            const response = await fetch('/admin/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    to: selectedQuote.email,
                    subject: emailSubject,
                    content: emailContent,
                    quote_id: selectedQuote.id
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send email');
            }

            const data = await response.json();
            setSubmitSuccess(data.message || 'Email sent successfully!');

            // Auto-redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '/admin/quotes';
            }, 2000);

        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to send email');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Reply to Quote #${quote.id}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Reply to Quote</h1>
                                <p className="mt-1 text-gray-600">Send response to {selectedQuote?.name}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                                    disabled={isSubmitting}
                                >
                                    Back to Quotes
                                </button>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {submitError && (
                            <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{submitError}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quote Details Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-sky-400 to-sky-500">
                                    <h3 className="text-lg font-medium text-white">Quote #{selectedQuote?.id}</h3>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Customer</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{selectedQuote?.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{selectedQuote?.email}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{selectedQuote?.phone || 'Not provided'}</dd>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="text-sm font-medium text-gray-500">Route</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {selectedQuote?.origin} → {selectedQuote?.destination}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Cargo Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{selectedQuote?.cargo_type}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {selectedQuote?.dimensions} cm, {selectedQuote?.weight} kg
                                            </dd>
                                        </div>
                                        {selectedQuote?.special_requirements && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Special Requirements</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{selectedQuote.special_requirements}</dd>
                                            </div>
                                        )}
                                        <div className="border-t border-gray-200 pt-4">
                                            <dt className="text-sm font-medium text-gray-500">Request Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(selectedQuote?.created_at || '').toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Form Card */}
                        <div className="lg:col-span-2 text-black">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-sky-500 to-sky-600">
                                    <h3 className="text-lg font-medium text-white">Compose Response</h3>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700">
                                                Subject
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    id="email-subject"
                                                    className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                                    value={emailSubject}
                                                    onChange={(e) => setEmailSubject(e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email-content" className="block text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="email-content"
                                                    rows={12}
                                                    className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                                    value={emailContent}
                                                    onChange={(e) => setEmailContent(e.target.value)}
                                                    placeholder={`Dear ${selectedQuote?.name},\n\nThank you for your quote request regarding shipping from ${selectedQuote?.origin} to ${selectedQuote?.destination}.`}
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        {/* Success Message */}
                                        {submitSuccess && (
                                            <div className="bg-green-50 border-green-500 p-2 rounded-xl mb-6">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                                                    </div>
                                                    <div className="">
                                                        <h3 className="text-sm ml-3 font-medium text-green-800">
                                                            Success!
                                                        </h3>
                                                        <div className="text-sm ml-3 text-green-700">
                                                            {submitSuccess}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Error Message */}
                                        {submitError && (
                                            <div className="bg-red-50 border-red-500 p-2 rounded-xl mb-6">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <XCircleIcon className="h-5 w-5 text-red-500" />
                                                    </div>
                                                    <div className="">
                                                        <h3 className="text-sm font-medium ml-3 text-red-800">
                                                            Error!
                                                        </h3>
                                                        <div className="ml-3 text-sm text-red-700">
                                                            {submitError}                                                                       </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => window.history.back()}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={sendEmail}
                                                disabled={isSubmitting || !emailContent.trim()}
                                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ${(!emailContent.trim() || isSubmitting) ? 'opacity-75 cursor-not-allowed' : ''}`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        Send Response
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}