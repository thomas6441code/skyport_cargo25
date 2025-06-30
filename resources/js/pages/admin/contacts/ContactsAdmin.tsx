import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpenCheck, Eye, EyeOffIcon, MailIcon, MailOpenIcon, RefreshCwIcon, SearchCheck, SortAsc, SortAscIcon, SortDescIcon, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    department: string;
    is_read: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Message',
        href: '/admin/messages',
    },
];

const MessageTable: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Message;
        direction: 'ascending' | 'descending'
    } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 20;

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const filtered = messages.filter(message =>
            message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (message.phone && message.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
            message.message.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMessages(filtered);
        setCurrentPage(1);
    }, [searchTerm, messages]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/admin/message');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data);
            setFilteredMessages(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/admin/messages/read/${id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to mark as read');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const markAsUnread = async (id: number) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/admin/messages/unread/${id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to mark as unread');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error marking as unread:', err);
        }
    };

    const deleteMessage = async (id: number) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(`/admin/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            fetchMessages();
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const requestSort = (key: keyof Message) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };


    const safeSort = <T extends Record<string, any>>(
        array: T[],
        sortConfig: { key: keyof T; direction: 'ascending' | 'descending' } | null
    ): T[] => {
        if (!sortConfig) return [...array];

        return [...array].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            // Handle null/undefined cases
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;
            if (bValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;

            // Handle dates
            if (sortConfig.key === 'created_at') {
                const dateA = new Date(aValue).getTime();
                const dateB = new Date(bValue).getTime();
                return sortConfig.direction === 'ascending'
                    ? dateA - dateB
                    : dateB - dateA;
            }

            // Default comparison
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const sortedMessages = safeSort(filteredMessages, sortConfig);

    // Pagination logic
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);
    const totalPages = Math.ceil(sortedMessages.length / messagesPerPage);

    const getSortIcon = (key: keyof Message) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <SortAsc className="ml-1 inline opacity-30" />;
        }
        return sortConfig.direction === 'ascending'
            ? <SortAscIcon className="ml-1 inline" />
            : <SortDescIcon className="ml-1 inline" />;
    };

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="text-black md:px-6 px-4 py-8">
                <div className="flex justify-between items-center mb-2">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold mb-4">Messages Management</h1>
                        <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                            Manage all available messages in your system.
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={fetchMessages}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <RefreshCwIcon className="h-4 w-4 mr-2" />
                            Refresh
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="p-8 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="bg-white shadow-md rounded-lg max-w-full overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                    <div className="relative flex-1 max-w-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchCheck className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search message by name or email..."
                                            className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Showing {currentMessages.length} of {filteredMessages.length} messages
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto max-w-full">
                                <table className="max-w-full min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('is_read')}
                                            >
                                                <div className="flex items-center">
                                                    Status
                                                    {getSortIcon('is_read')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('name')}
                                            >
                                                <div className="flex items-center">
                                                    Name
                                                    {getSortIcon('name')}
                                                </div>
                                            </th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('department')}
                                            >
                                                <div className="flex items-center">
                                                    Department
                                                    {getSortIcon('department')}
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('subject')}
                                            >
                                                <div className="flex items-center">
                                                    Subject
                                                    {getSortIcon('subject')}
                                                </div>
                                            </th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Message
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                onClick={() => requestSort('created_at')}
                                            >
                                                <div className="flex items-center">
                                                    Date
                                                    {getSortIcon('created_at')}
                                                </div>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentMessages.length > 0 ? (
                                            currentMessages.map((message) => (
                                                <tr
                                                    key={message.id}
                                                    className={message.is_read ? 'bg-white' : 'bg-blue-50'}
                                                >
                                                    <td className="px-3 py-4 whitespace-nowrap">
                                                        {message.is_read ? (
                                                            <MailOpenIcon className="text-gray-400" />
                                                        ) : (
                                                            <MailIcon className="text-blue-500" />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                                                        <div className="text-sm text-gray-500">{message.email}</div>
                                                    </td>
                                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {message.phone || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {message.department}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-[90px]">
                                                        {message.subject}
                                                    </td>
                                                    <td className="px-3 py-4 whitespace-normal text-sm text-gray-500 max-w-[150px]">
                                                        <div className="truncate max-w-xs">{message.message}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(message.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            {message.is_read ? (
                                                                <button
                                                                    onClick={() => markAsUnread(message.id)}
                                                                    className="text-yellow-600 hover:text-yellow-900"
                                                                    title="Mark as unread"
                                                                >
                                                                    <EyeOffIcon />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => markAsRead(message.id)}
                                                                    className="text-green-600 hover:text-green-900"
                                                                    title="Mark as read"
                                                                >
                                                                    <Eye />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => setSelectedMessage(message)}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                            >
                                                                <BookOpenCheck className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteMessage(message.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="Delete"
                                                            >
                                                                <Trash2Icon />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No messages found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{indexOfFirstMessage + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(indexOfLastMessage, sortedMessages.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{sortedMessages.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    &larr;
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    &rarr;
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Email Modal */}
                {selectedMessage && (
                    <div className="fixed inset-0 backdrop-blur-xs text-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Send Email to {selectedMessage.name}</h2>

                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-2">Message Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{selectedMessage.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{selectedMessage.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Department</p>
                                            <p className="font-medium">{selectedMessage.department}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Subject</p>
                                            <p className="font-medium">{selectedMessage.subject} kg</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Messae</p>
                                        <p className="font-medium">{selectedMessage.message} kg</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            setSelectedMessage(null);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    {selectedMessage.is_read ? (
                                        <button
                                            onClick={() => markAsUnread(selectedMessage.id)}
                                            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-200"
                                            title="Mark as unread"
                                        >
                                            <EyeOffIcon />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => markAsRead(selectedMessage.id)}
                                            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-green-300 hover:bg-green-200"
                                            title="Mark as read"
                                        >
                                            <Eye />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
};

export default MessageTable;
