'use client';

import { useCampaign } from '@/context/CampaignContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TemplatePage() {
    const { campaignData } = useCampaign();
    const router = useRouter();

    return (
        <div className="p-8 animate-in fade-in duration-500">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Approach
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Standard Content Template</h1>
            <p className="text-gray-500 mt-2">Design your email template for campaign: <span className="font-bold text-indigo-600">{campaignData.name}</span></p>

            <div className="mt-12 bg-white rounded-3xl p-20 border-2 border-dashed border-gray-100 flex items-center justify-center">
                <p className="text-gray-400 font-medium">Visual Editor Placeholder</p>
            </div>
        </div>
    );
}
