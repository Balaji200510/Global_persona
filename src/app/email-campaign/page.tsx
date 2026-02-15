'use client';

import { useState } from 'react';
import { useMapping } from '@/context/MappingContext';
import CampaignFormCard from '@/components/CampaignFormCard';
import CampaignPreviewCard from '@/components/CampaignPreviewCard';

export default function EmailCampaignPage() {
    const { emailLists } = useMapping();
    const [campaignName, setCampaignName] = useState('');
    const [selectedAudienceId, setSelectedAudienceId] = useState('');

    const selectedAudience = emailLists.find(list => list.id === selectedAudienceId);
    const selectedAudienceName = selectedAudience ? selectedAudience.name : '';

    const handleNext = () => {
        // Placeholder for future steps
        alert('Proceeding to Step 2: Choose Your Approach');
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
