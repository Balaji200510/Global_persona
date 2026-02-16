'use client';

import { Plus, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCampaign } from '@/context/CampaignContext';
import { useState, useEffect } from 'react';

export default function CampaignsDashboardHeader() {
    const router = useRouter();
    const { resetCampaign } = useCampaign();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNewCampaign = () => {
        resetCampaign();
        router.push('/email-campaigns/new');
    };

    if (!mounted) return (
        <div className="space-y-8 mb-10 opacity-0">
            <div className="flex justify-between items-center h-14"></div>
            <div className="flex justify-between items-center h-12"></div>
        </div>
    );

    return (
        <div className="space-y-8 mb-10">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
                    <p className="text-sm text-gray-500 mt-1">Create, manage, and track your email marketing campaigns</p>
                </div>
                <button
                    type="button"
                    suppressHydrationWarning
                    onClick={handleNewCampaign}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-blue-100 transition-all hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    New Campaign
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-1 items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                        <input
                            type="text"
                            suppressHydrationWarning
                            placeholder="Search campaigns..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder-gray-400 shadow-sm"
                        />
                    </div>
                    <button
                        type="button"
                        suppressHydrationWarning
                        className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl self-end lg:self-auto">
                    <button
                        type="button"
                        suppressHydrationWarning
                        className="p-2 bg-white text-blue-600 rounded-lg shadow-sm transition-all"
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        suppressHydrationWarning
                        className="p-2 text-gray-400 hover:text-gray-600 transition-all"
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
