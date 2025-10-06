import { useState } from 'react';
import { Trash2, Edit, Image as ImageIcon, Loader2, ArrowRightCircleIcon, XCircle, CheckCircle2, Plus, Upload, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Team {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
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
        title: 'Team',
        href: '/admin/team',
    },
];

const TeamAdmin = ({ teams }: { teams: Team[] }) => {
    const [editingMember, setEditingMember] = useState<Team | null>(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [image_url, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        loading: false,
        success: false,
        error: null,
        message: '',
        fieldErrors: {}
    });

    console.log(teams)

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
        formData.append('name', name);
        formData.append('role', role);
        formData.append('bio', bio);
        if (image_url) formData.append('image_url', image_url);
        formData.append('_method', editingMember ? 'PUT' : 'POST');

        try {
            const url = editingMember
                ? `/admin/teams/${editingMember.id}`
                : '/admin/teams';

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

            teams = data.team;

            resetForm();
            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: `Team member ${editingMember ? 'updated' : 'created'} successfully!`,
                fieldErrors: {}
            });

            // Close modal after successful submission
            setTimeout(() => {
                closeModal();
            }, 1500);

        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: `Failed to ${editingMember ? 'update' : 'create'} team member`,
                message: error instanceof Error ? error.message : 'Team request failed! Please try again.',
                fieldErrors: {}
            });
            console.error('Error saving team member:', error);
        }
    };

    const handleEdit = (member: Team) => {
        setSubmissionState({
            loading: false,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });

        setEditingMember(member);
        setName(member.name);
        setRole(member.role);
        setBio(member.bio);
        setPreview(`${member.image_url}`);
        openModal();
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
            const response = await fetch(`/admin/teams/${id}`, {
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

            teams = data.team;

            setSubmissionState({
                loading: false,
                success: true,
                error: null,
                message: 'Team member deleted successfully!',
                fieldErrors: {}
            });
        } catch (error) {
            setSubmissionState({
                loading: false,
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
                message: 'Failed to delete team member. Please try again.',
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
        setEditingMember(null);
        setName('');
        setRole('');
        setBio('');
        setImage(null);
        setPreview('');
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
        document.body.style.overflow = 'unset'; // Re-enable scrolling
        setSubmissionState({
            loading: false,
            success: false,
            error: null,
            message: '',
            fieldErrors: {}
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team Management" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 text-black p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Team Management
                                </h1>
                                <p className="mt-2 text-gray-600">
                                    Manage and organize your team members with ease
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {teams?.length} {teams?.length === 1 ? 'Member' : 'Members'}
                                    </span>
                                </div>
                                <button
                                    onClick={openModal}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Member
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                        </div>

                        {teams?.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <ImageIcon className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
                                <p className="text-gray-500 mb-6">Get started by adding your first team member</p>
                                <button
                                    onClick={openModal}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add First Member
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {teams?.map((member) => (
                                    <div
                                        key={member.id}
                                        className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                            <img
                                                src={`${member.image_url}`}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-blue-600 font-medium mb-2">
                                                {member.role}
                                            </p>
                                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                                                {member.bio}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                    ID: {member.id}
                                                </span>
                                                <div className="flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button
                                                        onClick={() => handleEdit(member)}
                                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit team member"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(member.id)}
                                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete team member"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal/Popup */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 hide-scrollbar overflow-y-auto">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 hide-scrollbar backdrop-blur-sm transition-opacity"
                            onClick={closeModal}
                        />

                        {/* Modal Container */}
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto hide-scrollbar transform transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            {editingMember ? (
                                                <Edit className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-blue-600" />
                                            )}
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {editingMember ? 'Edit Team Member' : 'Add New Member'}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 max-h-[70vh] hide-scrollbar overflow-y-auto">
                                    {/* Status Messages */}
                                    {submissionState.success && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium text-green-800">Success!</p>
                                                    <p className="text-sm text-green-700 mt-1">{submissionState.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {submissionState.error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top">
                                            <div className="flex items-start gap-3">
                                                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium text-red-800">{submissionState.error}</p>
                                                    <p className="text-sm text-red-700 mt-1">{submissionState.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter team member's name..."
                                                required
                                            />
                                            {submissionState.fieldErrors?.name && (
                                                <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.name[0]}</p>
                                            )}
                                        </div>

                                        {/* Role Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Role/Position
                                            </label>
                                            <input
                                                type="text"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter team member's role..."
                                                required
                                            />
                                            {submissionState.fieldErrors?.role && (
                                                <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.role[0]}</p>
                                            )}
                                        </div>

                                        {/* Bio Input */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Biography
                                            </label>
                                            <textarea
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter team member's bio..."
                                                required
                                            />
                                            {submissionState.fieldErrors?.bio && (
                                                <p className="mt-2 text-sm text-red-600">{submissionState.fieldErrors.bio[0]}</p>
                                            )}
                                        </div>

                                        {/* Image Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Image
                                            </label>
                                            <div className="space-y-3">
                                                <label className="block">
                                                    <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 group ${
                                                        preview
                                                            ? 'border-green-200 bg-green-50'
                                                            : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
                                                    }`}>
                                                        {preview ? (
                                                            <div className="relative w-full h-48 rounded-xl overflow-hidden">
                                                                <img
                                                                    src={preview}
                                                                    alt="Preview"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                                                                    <Upload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center w-full h-32 p-6">
                                                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
                                                                <p className="text-sm text-gray-500 text-center group-hover:text-blue-600 transition-colors">
                                                                    Click to upload image<br />
                                                                    <span className="text-xs">PNG, JPG, WEBP up to 5MB</span>
                                                                </p>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                            required={!editingMember}
                                                        />
                                                    </div>
                                                </label>
                                                {submissionState.fieldErrors?.image_url && (
                                                    <p className="text-sm text-red-600">{submissionState.fieldErrors.image_url[0]}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="submit"
                                                disabled={submissionState.loading}
                                                className={`flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg transition-all duration-200 ${
                                                    submissionState.loading
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5'
                                                } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                            >
                                                {submissionState.loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                                        {editingMember ? 'Updating...' : 'Creating...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        {editingMember ? 'Update Member' : 'Create Member'}
                                                        <ArrowRightCircleIcon className="ml-3 -mr-1 h-5 w-5" />
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default TeamAdmin;
