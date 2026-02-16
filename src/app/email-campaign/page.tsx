'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMapping } from '@/context/MappingContext';
import { useNotification } from '@/context/NotificationContext';
import CampaignFormCard from '@/components/CampaignFormCard';
import CampaignPreviewCard from '@/components/CampaignPreviewCard';

export default function EmailCampaignPage() {
    const router = useRouter();
    const { emailLists } = useMapping();
    const { showNotification } = useNotification();
    const [campaignName, setCampaignName] = useState('');
    const [selectedAudienceId, setSelectedAudienceId] = useState('');

    const selectedAudience = emailLists.find(list => list.id === selectedAudienceId);
    const selectedAudienceName = selectedAudience ? selectedAudience.name : '';

    const handleNext = () => {
        if (!campaignName.trim()) {
            showNotification('Please enter a campaign name', 'warning');
            return;
        }
        if (!selectedAudienceId) {
            showNotification('Please select an audience', 'warning');
            return;
        }
        // Navigate to approach selection
        router.push('/email-campaigns/new/approach');
    };

    const handleClear = () => {
        setCampaignName('');
        setSelectedAudienceId('');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest border border-indigo-100">
                        Step 1 of 3
                    </span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create New Campaign</h1>
                <p className="text-sm text-gray-500 mt-1 max-w-xl leading-relaxed">
                    Set up your campaign name and choose which audience to target. You'll be able to customize your content in the next step.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <CampaignFormCard
                    name={campaignName}
                    setName={setCampaignName}
                    audienceId={selectedAudienceId}
                    setAudienceId={setSelectedAudienceId}
                    onNext={handleNext}
                    onClear={handleClear}
                />

                <CampaignPreviewCard
                    name={campaignName}
                    audienceName={selectedAudienceName}
                />
            </div>
        </div>
    );
}
