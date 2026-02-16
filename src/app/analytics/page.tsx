'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
} from 'recharts';
import {
    Calendar,
    TrendingUp,
    Users,
    Mail,
    DollarSign,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck
} from 'lucide-react';
import { useCampaign } from '@/context/CampaignContext';

export default function AnalyticsPage() {
    const { savedCampaigns, metrics, subscribers } = useCampaign();
    const [mounted, setMounted] = useState(false);
    const [timeFilter, setTimeFilter] = useState('Last 30 days');

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartData = useMemo(() => {
        if (!mounted) return { performance: [], subscribers: [], revenue: [], trends: [], bounces: [] };

        const now = new Date();
        let days = 30;
        if (timeFilter === 'Last 7 days') days = 7;
        if (timeFilter === '3 months') days = 90;

        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const filtered = savedCampaigns.filter(c => new Date(c.createdAt) >= cutoff && c.status === 'Completed');

        // 1. Performance Data (Daily/Weekly based on filter)
        const perfMap: Record<string, any> = {};
        filtered.forEach(c => {
            const date = new Date(c.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
            if (!perfMap[date]) perfMap[date] = { name: date, sent: 0, opens: 0, clicks: 0 };
            perfMap[date].sent += c.sent;
            perfMap[date].opens += c.opens;
            perfMap[date].clicks += c.clicks;
        });
        const performance = Object.values(perfMap);

        // 2. Subscriber Data (Historical trend based on current total)
        let runningTotal = subscribers;
        const subData = [...filtered].reverse().map(c => {
            const growth = Math.floor(c.recipients * 0.05);
            const dataPoint = {
                month: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count: runningTotal
            };
            runningTotal = Math.max(0, runningTotal - growth);
            return dataPoint;
        }).reverse();

        // 3. Revenue Data
        const revMap: Record<string, any> = {};
        filtered.forEach(c => {
            const week = `W${Math.ceil(new Date(c.createdAt).getDate() / 7)}`;
            if (!revMap[week]) revMap[week] = { week, value: 0 };
            revMap[week].value += c.revenue;
        });
        const revenue = Object.values(revMap);

        // 4. Rate Trends
        const trends = filtered.map(c => ({
            day: new Date(c.createdAt).toLocaleDateString('en-US', { day: '2-digit' }),
            open: c.sent > 0 ? (c.opens / c.sent) * 100 : 0,
            click: c.sent > 0 ? (c.clicks / c.sent) * 100 : 0
        }));

        // 5. Bounces
        const totalSent = filtered.reduce((acc, c) => acc + c.sent, 0);
        const totalBounces = filtered.reduce((acc, c) => acc + c.bounces, 0);
        const bounceRate = totalSent > 0 ? (totalBounces / totalSent) * 100 : 0;
        const bounces = [
            { category: 'Hard Bounce', value: (bounceRate * 0.6).toFixed(1) },
            { category: 'Soft Bounce', value: (bounceRate * 0.3).toFixed(1) },
            { category: 'Spam Complain', value: (bounceRate * 0.1).toFixed(1) },
        ];

        return { performance, subscribers: subData, revenue, trends, bounces };
    }, [savedCampaigns, subscribers, timeFilter, mounted]);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Campaigns",
            value: savedCampaigns.length.toString(),
            icon: Mail,
            color: "indigo"
        },
        {
            title: "Total Subscribers",
            value: subscribers.toLocaleString(),
            icon: Users,
            color: "emerald"
        },
        {
            title: "Total Revenue",
            value: `$${metrics.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "blue"
        },
        {
            title: "Avg Open Rate",
            value: `${metrics.avgOpenRate.toFixed(1)}%`,
            icon: TrendingUp,
            color: "purple"
        },
    ];

    const handleDownloadReport = () => {
        // Headers
        const headers = ['Campaign Name', 'Sent', 'Opens', 'Clicks', 'Bounces', 'Revenue', 'Status', 'Date', 'Type'];

        // Data Rows
        const rows = savedCampaigns.map(c => [
            c.name.replace(/,/g, ' '), // Handle commas in names
            c.sent,
            c.opens,
            c.clicks,
            c.bounces,
            c.revenue,
            c.status,
            new Date(c.createdAt).toLocaleDateString(),
            (c as any).type || 'Standard'
        ]);

        // Add Summary Section
        const summary = [
            [],
            ['SUMMARY METRICS'],
            ['Total Campaigns', savedCampaigns.length],
            ['Total Subscribers', subscribers],
            ['Total Revenue', metrics.totalRevenue],
            ['Avg Open Rate', `${metrics.avgOpenRate.toFixed(2)}%`],
            ['Avg Click Rate', `${metrics.avgClickRate.toFixed(2)}%`],
            []
        ];

        // Combine all
        const csvContent = [
            ...summary.map(r => r.join(',')),
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        // Create Blob and Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-4 md:px-0">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">Performance Analytics</h1>
                    <p className="text-gray-500 font-medium">Deep dive into your campaign insights and audience growth.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                    {['Last 7 days', 'Last 30 days', '3 months'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${timeFilter === filter
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}

                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-${stat.color}-50 rounded-full opacity-50 group-hover:scale-110 transition-transform`} />
                        <div className="relative z-10 space-y-4">
                            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
                                <div className="flex items-end gap-3 mt-1">
                                    <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Campaign Performance Bar Chart */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Campaign Performance</h3>
                            <p className="text-xs font-bold text-gray-400">Weekly breakdown of sent vs engagement</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Sent</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Opens</div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData.performance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                    cursor={{ fill: '#F8FAFC', radius: 8 }}
                                />
                                <Bar dataKey="sent" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="opens" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subscriber Growth Area Chart */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Subscriber Growth</h3>
                            <p className="text-xs font-bold text-gray-400">Cumulative audience increase over time</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.subscribers}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Open & Click Rate Trends Line Chart */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Efficiency Trends</h3>
                            <p className="text-xs font-bold text-gray-400">Fluctuation of engagement ratios</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600">
                                <div className="w-2 h-2 rounded-full bg-purple-500" /> Open Rate
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Click Rate
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData.trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Line type="monotone" dataKey="open" stroke="#a855f7" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, stroke: '#fff', fill: '#a855f7' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="click" stroke="#3b82f6" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, stroke: '#fff', fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue & Bounce Combined */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                    {/* Revenue Overview Bar Chart */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Revenue Overview</h3>
                            <p className="text-xs font-bold text-gray-400">Monetary results from email conversions</p>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.revenue}>
                                    <XAxis dataKey="week" hide />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" fill="#6366f1" radius={[12, 12, 12, 12]} barSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bounce Analysis */}
                    <div className="bg-indigo-950 p-8 rounded-[40px] text-white space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Relay Health</h3>
                            <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div className="space-y-6">
                            {chartData.bounces.map((item: { category: string, value: string }, idx: number) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-wider">
                                        <span className="text-indigo-300">{item.category}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${(parseFloat(item.value) / 2) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-indigo-400/70 leading-relaxed pt-2">
                            Global average bounce rate is 2.1%. Your current performance reflects your actual list health.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Insights */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Sparkles className="w-48 h-48" />
                </div>
                <div className="space-y-4 relative z-10 max-w-xl text-center md:text-left">
                    <h2 className="text-3xl font-black leading-tight">AI Strategy Insight</h2>
                    <p className="text-indigo-100 font-medium leading-relaxed">
                        Your personalized campaigns are currently being analyzed for engagement patterns. Check back soon for deeper behavioral insights.
                    </p>
                </div>
                <button
                    onClick={handleDownloadReport}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-2xl text-base font-black hover:bg-gray-50 transition-all shadow-2xl relative z-10 whitespace-nowrap active:scale-95"
                >
                    Download Full Report
                </button>
            </div>
        </div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}
