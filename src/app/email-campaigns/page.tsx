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

    // Sort a copy to avoid mutation
    const sortedCampaigns = [...savedCampaigns].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CampaignsDashboardHeader />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {stats.map((stat, idx) => (
                    <StatsCard
                        key={idx}
                        {...stat}
                    />
                ))}
            </div>

            {/* Campaign Grid */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Campaigns</h2>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Showing {mounted ? savedCampaigns.length : 0} campaigns
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!mounted ? (
                        Array(6).fill(0).map((_, i) => <CampaignCardSkeleton key={i} />)
                    ) : sortedCampaigns.length > 0 ? (
                        sortedCampaigns.map((campaign, idx) => (
                            <CampaignCard
                                key={campaign.id || idx}
                                {...campaign}
                                onStatusUpdate={updateCampaignStatus}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-[32px] border border-dashed border-gray-200">
                            <Send className="w-12 h-12 text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">No campaigns yet</h3>
                            <p className="text-gray-500 mt-1">Start by creating your first AI email campaign.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
