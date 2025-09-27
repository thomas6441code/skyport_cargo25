import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
    CheckCircle2Icon,
    XCircleIcon,
    ArrowLeftIcon,
    SendIcon,
    MailIcon,
    ClockIcon,
    MapPinIcon,
    PackageIcon,
    UserIcon,
    CalendarIcon
} from 'lucide-react';

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
    const [emailContent, setEmailContent] = useState(`Dear ${quote?.name},
Thank you for your quote request regarding shipping from ${quote?.origin} to ${quote?.destination}. We have reviewed your requirements and are pleased to provide you with the following quotation:

...Insert your quote details here..

Best regards,
Your Shipping Team`);
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
            setSubmitSuccess(data.message || 'Email sent successfully! Redirecting...');

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Reply to Quote #${quote.id}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-col items-center space-x-4">
                                <h1 className="text-3xl font-bold text-slate-900">Reply to Quote</h1>
                                <p className="mt-1 text-slate-600">Send response to {selectedQuote?.name}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className={`inline-flex items-center uppercase px-3 py-2 rounded-full text-sm font-semibold ${
                                    selectedQuote?.is_answered
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-amber-100 text-amber-800'
                                }`}>
                                    {selectedQuote?.is_answered ? 'A n s w e r e d' : 'P e n d i n g'}
                                </div>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {submitError && (
                            <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                                <div className="flex items-center">
                                    <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">{submitError}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* Quote Details Sidebar */}
                        <div className="xl:col-span-1 space-y-6">
                            {/* Customer Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <UserIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Customer</h3>
                                            <p className="text-blue-100 text-sm">{selectedQuote?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center space-x-3 text-slate-600">
                                        <MailIcon className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm">{selectedQuote?.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-slate-600">
                                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-sm">{selectedQuote?.phone || 'Not provided'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Details Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <MapPinIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Route</h3>
                                            <p className="text-emerald-100 text-sm">Shipping Details</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Origin → Destination</label>
                                        <p className="text-sm font-medium text-slate-900 mt-1">
                                            {selectedQuote?.origin} → {selectedQuote?.destination}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Cargo Type</label>
                                        <p className="text-sm text-slate-900 mt-1">{selectedQuote?.cargo_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Dimensions & Weight</label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {selectedQuote?.dimensions} cm, {selectedQuote?.weight} kg
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 bg-gradient-to-r from-slate-600 to-slate-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <PackageIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Additional Info</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Ready Date</label>
                                            <p className="text-sm text-slate-900 mt-1">
                                                {selectedQuote?.ready_date ? formatDate(selectedQuote.ready_date) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedQuote?.special_requirements && (
                                        <div>
                                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Special Requirements</label>
                                            <p className="text-sm text-slate-900 mt-1">{selectedQuote.special_requirements}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Cargo Description</label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {selectedQuote?.cargo_description || 'No description provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Form Section */}
                        <div className="xl:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-5 bg-gradient-to-r from-indigo-500 to-purple-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <SendIcon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">Compose Response</h3>
                                                <p className="text-indigo-100">Quote #{selectedQuote?.id} • {formatDate(selectedQuote?.created_at || '')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6 text-gray-700">
                                    {/* Subject Field */}
                                    <div>
                                        <label htmlFor="email-subject" className="block text-sm font-medium text-slate-700 mb-2">
                                            Email Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="email-subject"
                                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 transition-all duration-200"
                                            value={emailSubject}
                                            onChange={(e) => setEmailSubject(e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label htmlFor="email-content" className="block text-sm font-medium text-slate-700 mb-2">
                                            Email Content
                                        </label>
                                        <textarea
                                            id="email-content"
                                            rows={16}
                                            className="block w-full px-4 py-3 rounded-lg border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-20 transition-all duration-200 font-mono text-sm"
                                            value={emailContent}
                                            onChange={(e) => setEmailContent(e.target.value)}
                                            disabled={isSubmitting}
                                            placeholder="Write your response here..."
                                        />
                                        <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
                                            <span>Recipient: {selectedQuote?.email}</span>
                                            <span>{emailContent.length} characters</span>
                                        </div>
                                    </div>

                                    {/* Success Message */}
                                    {submitSuccess && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                            <div className="flex items-center">
                                                <CheckCircle2Icon className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-green-800">{submitSuccess}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>Last updated: {formatDate(new Date().toISOString())}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => window.history.back()}
                                                className="inline-flex items-center px-5 py-2.5 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={sendEmail}
                                                disabled={isSubmitting || !emailContent.trim()}
                                                className={`inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                                                    (!emailContent.trim() || isSubmitting)
                                                        ? 'bg-indigo-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                                                }`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <SendIcon className="h-4 w-4 mr-2" />
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
