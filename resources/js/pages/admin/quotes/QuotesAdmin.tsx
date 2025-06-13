import { useState, useEffect } from 'react';
import { Mail, Check, Search, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

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
    {
        title: 'Quotes',
        href: '/admin/quotes',
    },
];

export default function AdminQuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Quote; direction: 'ascending' | 'descending' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const quotesPerPage = 10;

    useEffect(() => {
        fetchQuotes();
    }, []);

    useEffect(() => {
        const filtered = quotes.filter(quote =>
            quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.destination.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuotes(filtered);
    }, [searchTerm, quotes]);

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/admin/quote');
            const data = await response.json();
            setQuotes(data);
            setFilteredQuotes(data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsAnswered = async (id: number) => {
        try {

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            await fetch(`/admin/quotes/mark-answered/${id}`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                credentials: 'include',
            });

            fetchQuotes();
        } catch (error) {
            console.error('Error updating quote:', error);
        }
    };


    const requestSort = (key: keyof Quote) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedQuotes = [...filteredQuotes].sort((a, b) => {
        if (!sortConfig) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Pagination logic
    const indexOfLastQuote = currentPage * quotesPerPage;
    const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
    const currentQuotes = sortedQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
    const totalPages = Math.ceil(sortedQuotes.length / quotesPerPage);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotes" />

            <div className="min-h-screen bg-gray-50 py-8 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl font-bold text-gray-800">Shipping Quotes Management</h1>
                            <p className="mt-1 text-sm text-gray-500 dar:text-gray-400">
                                Manage all available quotes in your system.
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={fetchQuotes}
                                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                <div className="relative flex-1 max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search quotes by name, email, origin or destination..."
                                        className="block w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="text-sm text-gray-500">
                                    Showing {currentQuotes.length} of {filteredQuotes.length} quotes
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-8 flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => requestSort('created_at')}
                                                >
                                                    <div className="flex items-center">
                                                        Date
                                                        {sortConfig?.key === 'created_at' && (
                                                            sortConfig.direction === 'ascending' ?
                                                                <ChevronUp className="ml-1 h-4 w-4" /> :
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => requestSort('name')}
                                                >
                                                    <div className="flex items-center">
                                                        Name
                                                        {sortConfig?.key === 'name' && (
                                                            sortConfig.direction === 'ascending' ?
                                                                <ChevronUp className="ml-1 h-4 w-4" /> :
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => requestSort('origin')}
                                                >
                                                    <div className="flex items-center">
                                                        Origin
                                                        {sortConfig?.key === 'origin' && (
                                                            sortConfig.direction === 'ascending' ?
                                                                <ChevronUp className="ml-1 h-4 w-4" /> :
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => requestSort('destination')}
                                                >
                                                    <div className="flex items-center">
                                                        Destination
                                                        {sortConfig?.key === 'destination' && (
                                                            sortConfig.direction === 'ascending' ?
                                                                <ChevronUp className="ml-1 h-4 w-4" /> :
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Cargo Type
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                                    onClick={() => requestSort('is_answered')}
                                                >
                                                    <div className="flex items-center">
                                                        Status
                                                        {sortConfig?.key === 'is_answered' && (
                                                            sortConfig.direction === 'ascending' ?
                                                                <ChevronUp className="ml-1 h-4 w-4" /> :
                                                                <ChevronDown className="ml-1 h-4 w-4" />
                                                        )}
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentQuotes.map((quote) => (
                                                <tr key={quote.id} className={quote.is_answered ? 'bg-gray-50' : 'bg-white'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(quote.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                                                        <div className="text-sm text-gray-500">{quote.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {quote.origin}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {quote.destination}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {quote.cargo_type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {quote.is_answered ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Answered
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex gap-5 items-center font-medium">
                                                        <Link
                                                            href={route('admin.quotes.EmailQuotes', quote.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                            title="Email Answer"
                                                        >
                                                            <Mail className="h-5 w-5" />
                                                        </Link>
                                                        {!quote.is_answered && (
                                                            <button
                                                                onClick={() => markAsAnswered(quote.id)}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                <Check className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{indexOfFirstQuote + 1}</span> to{' '}
                                                <span className="font-medium">
                                                    {Math.min(indexOfLastQuote, sortedQuotes.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{sortedQuotes.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                <button
                                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <ChevronDown className="h-5 w-5 transform -rotate-90" />
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>


    );
}