'use client';

import { useRouter } from 'next/navigation';
import CampaignFormCard from '@/components/CampaignFormCard';
import CampaignPreviewCard from '@/components/CampaignPreviewCard';
import { useMapping } from '@/context/MappingContext';
import { useCampaign } from '@/context/CampaignContext';

export default function NewCampaignPage() {
    const router = useRouter();
    const { emailLists } = useMapping();
    const { campaignData, setCampaignData, resetCampaign } = useCampaign();

    const audienceName = emailLists.find(list => list.id === campaignData.audienceId)?.name || '';

    const handleNameChange = (name: string) => {
        setCampaignData(prev => ({ ...prev, name }));
    };

    const handleAudienceChange = (id: string) => {
        const name = emailLists.find(l => l.id === id)?.name || '';
        setCampaignData(prev => ({ ...prev, audienceId: id, audienceName: name }));
    };

    const handleClear = () => {
        resetCampaign();
    };

    const handleNext = () => {
        if (campaignData.name && campaignData.audienceId) {
            setCampaignData(prev => ({ ...prev, step1Completed: true }));
            router.push('/email-campaigns/new/approach');
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Step 1 of 3 – Create New Campaign</h1>
                <p className="text-sm text-gray-500 mt-1">Configure your campaign details and target audience</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[500px]">
                {/* Left Section - Campaign Details */}
                <CampaignFormCard
                    name={campaignData.name}
                    setName={handleNameChange}
                    audienceId={campaignData.audienceId}
                    setAudienceId={handleAudienceChange}
                    onNext={handleNext}
                    onClear={handleClear}
                />

                {/* Right Section - Campaign Preview */}
                <CampaignPreviewCard
                    name={campaignData.name}
                    audienceName={audienceName}
                />
            </div>
        </div>
    );
}
