'use client';

import { useState, useEffect } from 'react';

import CampaignsDashboardHeader from '@/components/CampaignsDashboardHeader';
import StatsCard from '@/components/StatsCard';
import CampaignCard from '@/components/CampaignCard';
import { Send, UserCheck, Wand2, Users, MousePointer2, BarChart3 } from 'lucide-react';

import { useCampaign } from '@/context/CampaignContext';
import { CampaignCardSkeleton } from '@/components/Skeleton';

export default function EmailCampaignsPage() {
    const { savedCampaigns, metrics, updateCampaignStatus } = useCampaign();
    const [mounted, setMounted] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { title: "Total Campaigns", value: mounted ? metrics.totalCampaigns.toString() : "0", icon: Send, iconBgColor: "bg-indigo-50", iconColor: "text-indigo-600" },
        { title: "Sent Volume", value: mounted ? metrics.totalSent.toLocaleString() : "0", icon: UserCheck, iconBgColor: "bg-blue-50", iconColor: "text-blue-600" },
        { title: "Revenue", value: mounted ? `$${metrics.totalRevenue.toLocaleString()}` : "$0", icon: Wand2, iconBgColor: "bg-purple-50", iconColor: "text-purple-600" },
        { title: "Avg Open Rate", value: mounted ? `${metrics.avgOpenRate.toFixed(1)}%` : "0%", icon: MousePointer2, iconBgColor: "bg-emerald-50", iconColor: "text-emerald-600" },
        { title: "Avg Click Rate", value: mounted ? `${metrics.avgClickRate.toFixed(1)}%` : "0%", icon: MousePointer2, iconBgColor: "bg-orange-50", iconColor: "text-orange-600" },
        { title: "Bounce Rate", value: mounted ? `${metrics.bounceRate.toFixed(1)}%` : "0%", icon: BarChart3, iconBgColor: "bg-pink-50", iconColor: "text-pink-600" },
    ];

    // Filter and Sort
    const filteredCampaigns = savedCampaigns.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedCampaigns = [...filteredCampaigns].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in">
            <CampaignsDashboardHeader
                viewMode={viewMode}
                setViewMode={setViewMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <StatsCard {...stat} />
                    </div>
                ))}
            </div>

            {/* Campaign Grid */}
            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Campaigns</h2>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Showing {mounted ? sortedCampaigns.length : 0} campaigns
                    </span>
                </div>
                <div className={viewMode === 'grid'

                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    : "flex flex-col gap-4"
                }>
                    {!mounted ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <CampaignCardSkeleton />
                            </div>
                        ))
                    ) : sortedCampaigns.length > 0 ? (
                        sortedCampaigns.map((campaign, idx) => (
                            <div
                                key={campaign.id || idx}
                                className="animate-fade-in"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <CampaignCard
                                    {...campaign}
                                    onStatusUpdate={updateCampaignStatus}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 animate-fade-in">
                            <Send className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600 mb-4 animate-pulse-slow" />
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">No campaigns yet</h3>
                            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1.5">Start by creating your first AI email campaign.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
