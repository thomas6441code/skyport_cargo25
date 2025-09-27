import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, AreaChart, Area, CartesianGrid } from 'recharts';
import { CalendarArrowDown, CheckCheck, CheckCircle2Icon, Link, LucideChartNoAxesCombined, MessageCircleXIcon, Quote } from 'lucide-react';
import { CheckboxIndicator } from '@radix-ui/react-checkbox';

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

interface DashboardProps {
    stats: {
        unreadMessages: number;
        unreadQuotes: number;
        repliedQuotes: number;
        totalMessages: number;
        totalQuotes: number;
    };
    quotesOverTime: { date: string; count: number }[];
    recentQuotes: Quote[];
    messagesByDepartment: { department: string; count: number }[];
}

const GLOW_COLORS = {
    primary: '#6366F1',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    purple: '#8B5CF6',
    pink: '#EC4899'
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
];

export default function Dashboard({ stats, quotesOverTime, messagesByDepartment, recentQuotes }: Readonly<DashboardProps>) {
    // Combined status data
    const combinedStatusData = [
        { name: 'Unread Messages', value: stats.unreadMessages, type: 'message' },
        { name: 'Read Messages', value: stats.totalMessages - stats.unreadMessages, type: 'message' },
        { name: 'Unread Quotes', value: stats.unreadQuotes, type: 'quote' },
        { name: 'Replied Quotes', value: stats.repliedQuotes, type: 'quote' },
    ];

    // Format dates for better readability
    const formattedQuotesOverTime = quotesOverTime.map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex-col items-center space-x-2">
                        <h1 className="text-sm md:text-xl font-bold text-gray-800">
                            Dashboard Overview
                        </h1>
                        <h1 className="text-sm font-bold text-gray-500">
                            What's happening today on SkyPortCargo.
                        </h1>
                    </div>
                    <div className="flex justify-between items-center md:text-sm text-xs gap-2 text-gray-700 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <CalendarArrowDown className="text-gray-700 text-xs md:size-4 size-10" />
                        Last Logged In: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Top Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Messages"
                        value={stats.totalMessages}
                        icon={<MessageIcon />}
                        trend="up"
                        percentage={`${Math.round(((stats.totalMessages - stats.unreadMessages) / stats.totalMessages) * 100)}%`}
                        color="from-indigo-500 to-indigo-600"
                        glow="shadow-sm"
                    />
                    <StatCard
                        title="Unread Messages"
                        value={stats.unreadMessages}
                        icon={<MailWarningIcon />}
                        trend={stats.unreadMessages > 0 ? "up" : "down"}
                        percentage={`${Math.round((stats.unreadMessages / stats.totalMessages) * 100)}%`}
                        color="from-red-500 to-red-600"
                        glow="shadow-sm"
                    />
                    <StatCard
                        title="Total Quotes"
                        value={stats.totalQuotes}
                        icon={<Quote />}
                        trend="up"
                        percentage={`${Math.round(((stats.totalQuotes - stats.unreadQuotes) / stats.totalQuotes) * 100)}%`}
                        color="from-amber-500 to-amber-600"
                        glow="shadow-sm"
                    />
                    <StatCard
                        title="Unread Quotes"
                        value={stats.unreadQuotes}
                        icon={<HelpCircleIcon />}
                        trend={stats.unreadQuotes > 0 ? "up" : "down"}
                        percentage={`${Math.round((stats.unreadQuotes / stats.totalQuotes) * 100)}%`}
                        color="from-purple-500 to-purple-600"
                        glow="shadow-sm"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Combined Status Chart */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-3 max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">Messages & Quotes Status</h3>
                            <div className="flex space-x-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2 bg-indigo-500" />
                                    <span className="text-sm text-gray-600">Messages</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2 bg-amber-500" />
                                    <span className="text-sm text-gray-600">Quotes</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                    <Pie
                                        data={combinedStatusData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        cornerRadius={5}
                                        startAngle={180}
                                        endAngle={-270}
                                        label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {combinedStatusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    entry.type === 'message'
                                                        ? entry.name.includes('Unread')
                                                            ? GLOW_COLORS.danger
                                                            : GLOW_COLORS.primary
                                                        : entry.name.includes('Unread')
                                                            ? GLOW_COLORS.warning
                                                            : GLOW_COLORS.success
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [`${value} ${name.toString().toLowerCase()}`, 'Count']}
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(229, 231, 235, 0.5)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            padding: '12px',
                                        }}
                                        itemStyle={{
                                            color: '#1F2937',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Messages By Department Column Chart */}
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-3 max-w-2xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Messages by Department</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={messagesByDepartment}
                                    layout="horizontal"
                                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#E5E7EB" />
                                    <YAxis
                                        type="number"
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <XAxis
                                        dataKey="department"
                                        type="category"
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickLine={false}
                                        axisLine={false}
                                        width={100}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(229, 231, 235, 0.5)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            padding: '6px',
                                        }}
                                        formatter={(value) => [`${value} messages`, 'Count']}
                                    />
                                    <Bar
                                        dataKey="count"
                                        name="Messages"
                                        radius={[4, 4, 0, 0]}
                                        animationDuration={1500}
                                    >
                                        {messagesByDepartment.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={[
                                                    GLOW_COLORS.primary,
                                                    GLOW_COLORS.success,
                                                    GLOW_COLORS.warning,
                                                    GLOW_COLORS.danger,
                                                    GLOW_COLORS.info,
                                                    GLOW_COLORS.purple,
                                                    GLOW_COLORS.pink
                                                ][index % 7]}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Quotes Over Time Area Chart */}
                <div className="rounded-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow border border-gray-100 p-3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Quotes Over Time</h3>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={formattedQuotesOverTime}>
                                    <defs>
                                        <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={GLOW_COLORS.primary} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={GLOW_COLORS.primary} stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickLine={false}
                                        axisLine={false}
                                        padding={{ left: 20, right: 20 }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B7280' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(229, 231, 235, 0.5)',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            padding: '12px',
                                        }}
                                        formatter={(value) => [`${value} quotes`, 'Count']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke={GLOW_COLORS.primary}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorQuotes)"
                                        activeDot={{
                                            r: 6,
                                            strokeWidth: 2,
                                            fill: GLOW_COLORS.primary,
                                            stroke: '#fff',
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow border border-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Rescent Quotes</h3>
                        <div className="w-full overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                Date
                                                <CalendarArrowDown className="ml-1 h-4 w-4" />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                Name
                                                <LucideChartNoAxesCombined className="ml-1 h-4 w-4" />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                Origin
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                Destination
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cargo Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                Status
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentQuotes.map((quote) => (
                                        <tr key={quote.id} className={quote.is_answered ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(quote.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                                                <div className="text-sm text-gray-500">{quote.email}</div>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {quote.origin}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {quote.destination}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {quote.cargo_type}
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
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
                                            <td className="px-3 py-4 whitespace-nowrap text-right text-sm flex gap-5 items-center font-medium">
                                                {quote.is_answered ? (
                                                    <CheckCheck className="h-5 w-5 text-green-600 hover:text-green-900" />
                                                ) : (
                                                    <CheckCheck className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({
    title,
    value,
    icon,
    trend,
    percentage,
    color,
    glow
}: Readonly<{
    title: string;
    value: number;
    icon?: React.ReactNode;
    trend?: "up" | "down";
    percentage?: string;
    color: string;
    glow: string;
}>) {
    return (
        <div className={`rounded-xl p-5 ${glow} bg-gradient-to-br ${color} text-white`}>
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-sm font-medium text-white/80">{title}</div>
                        <div className="text-2xl font-bold mt-1 text-white">{value}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/20">
                        {icon}
                    </div>
                </div>
                {trend && percentage && (
                    <div className="flex items-center mt-3">
                        <span className={`inline-flex items-center ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                            {trend === 'up' ? (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                            <span className="text-xs font-medium">{percentage}</span>
                        </span>
                        <span className="text-xs text-white/60 ml-2">vs last period</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Icon Components
function MessageIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    );
}

function MailWarningIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

function HelpCircleIcon() {
    return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
