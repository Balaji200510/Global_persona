'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCampaign } from '@/context/CampaignContext';
import {
    ArrowLeft,
    CheckCircle2,
    Zap,
    Mail,
    Target,
    TrendingUp,
    Users,
    Settings,
    Layout,
    Sparkles
} from 'lucide-react';

export default function ChooseApproachPage() {
    const router = useRouter();
    const { campaignData, setCampaignData } = useCampaign();
    const [selected, setSelected] = useState<string | null>(campaignData.approach || 'ai'); // Default per request

    useEffect(() => {
        if (!campaignData.step1Completed) {
            router.replace('/email-campaigns/new');
        }
    }, [campaignData.step1Completed, router]);

    const handleBack = () => {
        router.back();
    };

    const handleCreateContent = () => {
        if (!selected) return;

        setCampaignData(prev => ({ ...prev, approach: selected, step2Completed: true }));

        if (selected === 'standard') {
            router.push('/email-campaigns/create/template');
        } else {
            router.push('/email-campaigns/create/ai-setup');
        }
    };

    if (!campaignData.step1Completed) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex flex-col items-center pt-16 pb-20 px-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="w-full max-w-5xl flex flex-col items-center">
                <div className="w-full flex justify-start mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Setup
                    </button>
                </div>

                <h1 className="text-[32px] font-bold text-gray-900 mb-2">Choose Your Approach</h1>
                <h2 className="text-lg text-gray-600 font-medium">
                    How would you like to create content for &lsquo;{campaignData.name || 'your campaign'}&rsquo;?
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                    Select between standard content creation or AI-powered personalization
                </p>

                {/* Pill Banner */}
                <div className="mt-8 flex items-center gap-3 bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Users className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-blue-800">
                        Campaign: <span className="text-blue-600">{campaignData.name || 'Untitled'}</span> | List: <span className="text-blue-600">{campaignData.audienceName || 'None'}</span>
                    </span>
                </div>
            </div>

            {/* Main Content (Two Cards) */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-16">

                {/* Standard Content Card */}
                <div
                    onClick={() => setSelected('standard')}
                    className={`relative bg-white rounded-3xl p-10 border-2 transition-all duration-300 cursor-pointer flex flex-col ${selected === 'standard'
                        ? 'border-green-500 shadow-xl shadow-green-50 scale-[1.02]'
                        : 'border-transparent shadow-sm hover:border-gray-200 hover:-translate-y-1'
                        }`}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                            <Layout className="w-8 h-8" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Standard Content</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8">Single template for all recipients</p>

                    <div className="space-y-4 flex-1">
                        {[
                            'Quick and easy setup',
                            'Consistent messaging',
                            'Perfect for announcements',
                            'Full content control'
                        ].map((bullet) => (
                            <div key={bullet} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm text-gray-600 font-medium">{bullet}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next: Create email content template</p>
                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                            <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">BEST FOR</p>
                            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
                                Newsletters, product launches, event invitations
                            </p>
                        </div>
                    </div>
                </div>

                {/* AI Personalization Card */}
                <div
                    onClick={() => setSelected('ai')}
                    className={`relative bg-white rounded-3xl p-10 border-2 transition-all duration-300 cursor-pointer flex flex-col ${selected === 'ai'
                        ? 'border-indigo-600 shadow-xl shadow-indigo-50 scale-[1.02]'
                        : 'border-transparent shadow-sm hover:border-gray-200 hover:-translate-y-1'
                        }`}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-md shadow-indigo-100">
                            AI POWERED
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-1">AI Personalization</h3>
                    <p className="text-sm text-indigo-600/70 font-bold mb-8">Tailored emails for each recipient</p>

                    <div className="space-y-4 flex-1">
                        {[
                            'Personalized subject lines',
                            'Higher engagement rates',
                            'Smart content recommendations',
                            'Automated A/B testing'
                        ].map((bullet) => (
                            <div key={bullet} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span className="text-sm text-gray-600 font-medium">{bullet}</span>
                            </div>
                        ))}
                    </div>

                    {/* Meta Stats for AI */}
                    <div className="flex gap-4 mt-6">
                        <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50/50 px-2 py-1 rounded-lg border border-indigo-100/50">
                            <Target className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold">Better targeting</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded-lg border border-emerald-100/50">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold">Higher ROI</span>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-6">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Next: Configure AI Assistant</p>
                        <div className="bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/30">
                            <p className="text-[11px] font-bold text-indigo-400 uppercase mb-2">BEST FOR</p>
                            <p className="text-sm text-gray-600 font-semibold leading-relaxed">
                                Sales outreach, customer retention, recommendations
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* CTA Button */}
            <button
                onClick={handleCreateContent}
                disabled={!selected}
                className={`flex items-center gap-3 px-12 py-5 rounded-2xl text-base font-black text-white transition-all shadow-2xl active:scale-95
                    ${selected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-indigo-100 hover:-translate-y-1'
                        : 'bg-gray-200 shadow-none cursor-not-allowed text-gray-400'}
                `}
            >
                Create Content
            </button>
        </div>
    );
}
