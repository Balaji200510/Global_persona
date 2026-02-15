'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCampaign } from '@/context/CampaignContext';
import { useMapping } from '@/context/MappingContext';
import {
    ArrowLeft,
    Sparkles,
    Layers,
    Users,
    AlertCircle,
    CheckCircle2,
    Briefcase,
    Package,
    ChevronRight,
    MessageSquareQuote
} from 'lucide-react';

export default function ConfigureAIPage() {
    const router = useRouter();
    const { campaignData } = useCampaign();
    const { emailLists } = useMapping();

    const currentList = emailLists.find(l => l.id === campaignData.audienceId);
    const contactCount = currentList?.contactCount || 0;

    useEffect(() => {
        // Simple security: Must have step 1 done.
        // Also if standard content was chosen, this page isn't the right one, 
        // but we'll let it stay for now or redirect if needed.
        if (!campaignData.step1Completed) {
            router.replace('/email-campaigns/new');
        }
    }, [campaignData.step1Completed, router]);

    const handleBack = () => {
        router.back();
    };

    if (!campaignData.step1Completed) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Choose Approach
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm border border-indigo-100/50">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Configure AI Assistant</h1>
                    </div>
                    <p className="text-gray-500 font-medium ml-12">Set up AI personalization for your campaign</p>
                </div>

                {/* Summary Info Bar - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Campaign Info */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-inner">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Campaign</p>
                            <p className="text-sm font-bold text-gray-900">{campaignData.name || 'Untitled Campaign'}</p>
                        </div>
                    </div>

                    {/* List Info */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email List</p>
                            <p className="text-sm font-bold text-gray-900">{campaignData.audienceName || 'No List Selected'}</p>
                        </div>
                    </div>

                    {/* AI Status */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shadow-inner">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">AI Status</p>
                            <p className="text-sm font-bold text-amber-600">Pending Setup</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Left Column: Let's Configure Your AI Assistant */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[32px] p-12 border border-blue-50/50 shadow-xl shadow-blue-50/20 h-full flex flex-col justify-center border-t-4 border-t-indigo-500">
                            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
                                <MessageSquareQuote className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                                Let's Configure Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI Assistant</span>
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed font-medium mb-10 max-w-md">
                                Our AI will ask strategic questions to create highly personalized email content for {contactCount > 0 ? contactCount.toLocaleString() : 'your'} contacts.
                            </p>
                            <button
                                onClick={() => router.push('/email-campaigns/create/ai-setup/strategist')}
                                className="flex items-center justify-center gap-3 w-full max-w-sm py-5 px-8 bg-indigo-600 text-white rounded-2xl text-base font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                            >
                                Start Configuration <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Purple Card with Feature Recaps */}
                    <div className="lg:col-span-5">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[32px] p-10 text-white h-full shadow-2xl shadow-indigo-200">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md border border-white/20">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold">AI Personalization</h3>
                            </div>

                            {/* Features Section */}
                            <div className="space-y-8 mb-12">
                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">For Each Contact:</p>
                                    <div className="space-y-4">
                                        {[
                                            'Personalized subject line',
                                            'Tailored email content',
                                            'Relevant pain points',
                                            'Custom call-to-action'
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-sm font-bold text-white/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px bg-white/10 w-full" />

                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">Using Your Configuration:</p>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-bold text-white/90">Business information</span>
                                        </div>
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-bold text-white/90">Product/service details</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Info */}
                            <div className="mt-auto pt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs font-bold text-white/70">Optimization Level: High</span>
                                </div>
                                <span className="text-xs font-black text-white/40">STEP 3/3</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
