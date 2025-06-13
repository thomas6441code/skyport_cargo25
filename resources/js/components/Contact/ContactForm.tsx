import { FormEventHandler, useState } from 'react';
import {
    Mail,
    Phone,
    User,
    MessageSquare,
    NotebookPen,
    CheckCircle2,
    XCircle,
    LoaderCircleIcon,
    OptionIcon
} from 'lucide-react';

interface Department {
    'id': number;
    'name': string;
    'description': string;
}

interface FormProps {
    departments?: Department[];
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    department?: string;
    subject: string;
    message: string;
}

interface SubmissionState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}

const ContactForm: React.FC<FormProps> = ({ departments = [] }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
        message: ''
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
            const res = await fetch(route('message.store'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: "same-origin",
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

                setSubmissionState({
                    loading: false,
                    success: false,
                    error: 'An unexpected error occurred',
                    message: data.message || 'Failed to submit form!',
                    fieldErrors: {}
                });
            }

            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: data.message || 'Message sent successfully!',
                fieldErrors: {}
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                department: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
                message: 'Failed to send message. Please try again.',
                fieldErrors: {}
            });
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Name Field */}
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${submissionState.fieldErrors?.name
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            {submissionState.fieldErrors?.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {submissionState.fieldErrors.name[0]}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${submissionState.fieldErrors?.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            {submissionState.fieldErrors?.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {submissionState.fieldErrors.email[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="tel"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${submissionState.fieldErrors?.phone
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        {submissionState.fieldErrors?.phone && (
                            <p className="mt-1 text-sm text-red-600">
                                {submissionState.fieldErrors.phone[0]}
                            </p>
                        )}
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label className="block text-gray-700 mb-2">Subject</label>
                        <div className="relative">
                            <NotebookPen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${submissionState.fieldErrors?.subject
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>
                        {submissionState.fieldErrors?.subject && (
                            <p className="mt-1 text-sm text-red-600">
                                {submissionState.fieldErrors.subject[0]}
                            </p>
                        )}
                    </div>

                    {/* Department Field */}
                    {departments.length > 0 && (
                        <div>
                            <label className="block text-gray-700 mb-2">Department</label>
                            <div className="relative">
                                <OptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <select
                                    className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${submissionState.fieldErrors?.department
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    value={formData.department || ''}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option value="">Select a department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                            {submissionState.fieldErrors?.department && (
                                <p className="mt-1 text-sm text-red-600">
                                    {submissionState.fieldErrors.department[0]}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Message Field */}
                    <div>
                        <label className="block text-gray-700 mb-2">Message</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary min-h-[150px] ${submissionState.fieldErrors?.message
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                                    }`}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        {submissionState.fieldErrors?.message && (
                            <p className="mt-1 text-sm text-red-600">
                                {submissionState.fieldErrors.message[0]}
                            </p>
                        )}
                    </div>

                    {/* Form-wide error message */}
                    {submissionState.error && (
                        <div className="bg-red-50 border-red-500 p-4 py-2 rounded-xl mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircle className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        {submissionState.error}
                                    </h3>
                                    {submissionState.message && (
                                        <div className="text-sm text-red-700">
                                            {submissionState.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success message */}
                    {submissionState.success && (
                        <div className="bg-green-50 border-green-500 p-4 py-2 rounded-xl mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">
                                        Success!
                                    </h3>
                                    <div className="text-sm text-green-700">
                                        {submissionState.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submissionState.loading}
                        className={`w-full md:w-[35%] bg-cyan-700 text-white py-3 px-4 rounded-lg hover:bg-cyan-600 transition-colors font-medium ${submissionState.loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {submissionState.loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;