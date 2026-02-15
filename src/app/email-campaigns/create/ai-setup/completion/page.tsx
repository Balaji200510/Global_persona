'use client';

import { useState, useEffect } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { useRouter } from 'next/navigation';
import {
    CheckCircle2,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Target,
    Briefcase,
    Package,
    AlertCircle,
    User,
    Users,
    Mail,
    Zap,
    Eye
} from 'lucide-react';

export default function AIStrategyCompletionPage() {
    const { campaignData } = useCampaign();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-[#FDFDFD]" />; // Prevent mismatch during initial mount
    }

    return (
        <div
            suppressHydrationWarning
            className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 leading-tight">Campaign Complete</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 3 of 3</span>
                                <div className="h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                </div>
                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">100% COMPLETE</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => router.push('/email-campaigns/create/content')}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-base font-black hover:shadow-2xl hover:shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95 shadow-xl"
                    >
                        Review Content <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Campaign Header Summary */}
                <div className="flex flex-col gap-2 px-2">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">Strategy Overview</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Campaign: <span className="text-indigo-600 font-extrabold">{campaignData.name || 'Untitled Campaign'}</span>
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column - Key Config Blocks (7 cols) */}
                    <div className="lg:col-span-12 space-y-8">
                        <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-10 pb-4 border-b border-gray-50 flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                AI Generated Content Strategy
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Business Info */}
                                <div className="space-y-4 group">
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <Briefcase className="w-5 h-5" />
                                        <p className="text-xs font-extrabold uppercase tracking-widest">Business Info</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-indigo-200 transition-colors h-full">
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium capitalize">
                                            {campaignData.businessInfo || 'Not configured'}
                                        </p>
                                    </div>
                                </div>

                                {/* Product/Service */}
                                <div className="space-y-4 group">
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <Package className="w-5 h-5" />
                                        <p className="text-xs font-extrabold uppercase tracking-widest">Product/Service</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-emerald-200 transition-colors h-full">
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                            {campaignData.productDetails || 'AI-Powered Solutions'}
                                        </p>
                                    </div>
                                </div>

                                {/* Pain Points */}
                                <div className="space-y-4 group">
                                    <div className="flex items-center gap-3 text-amber-600">
                                        <AlertCircle className="w-5 h-5" />
                                        <p className="text-xs font-extrabold uppercase tracking-widest">Pain Points</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-amber-200 transition-colors h-full">
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                            {campaignData.painPoints || 'Inefficient manual processes'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personalization Preview Section */}
                        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
                            <div className="p-10 bg-indigo-600 text-white">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold">Dynamic Content Tags</h4>
                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-0.5">Automated Data Binding Enabled</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="px-4 py-2 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-tighter">Ready for Launch</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Subject Line Template</span>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center">
                                                <p className="text-sm">
                                                    <span className="bg-indigo-100 px-2 py-1 rounded text-indigo-700 font-bold text-xs ring-1 ring-indigo-200 uppercase tracking-tighter mx-1">AI_PERSONALIZED_SUBJECT</span>
                                                    for {campaignData.audienceName || 'Target Audience'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                                <User className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Opening Hook</span>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                                <p className="text-sm leading-relaxed">
                                                    Hi <span className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 font-bold text-xs ring-1 ring-emerald-200 uppercase tracking-tighter mx-1">CONTACT_NAME</span>,
                                                    I noticed you specialize in <span className="bg-amber-100 px-2 py-1 rounded text-amber-700 font-bold text-xs ring-1 ring-amber-200 uppercase tracking-tighter mx-1">CONTACT_INDUSTRY</span>...
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                                AI Summary
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                                Based on your strategy, our AI will generate unique hooks for each contact in the <span className="text-indigo-600 font-bold">{campaignData.audienceName}</span> list. It will focus on how <span className="text-gray-900 font-bold underline decoration-indigo-300 underline-offset-4">{campaignData.businessInfo || 'your business'}</span> can solve their specific pain points using your <span className="text-gray-900 font-bold underline decoration-emerald-300 underline-offset-4">{campaignData.productDetails}</span>.
                                            </p>
                                        </div>

                                        {/* Action Buttons Section */}
                                        <div className="mt-8 flex flex-col gap-3">
                                            <button
                                                type="button"
                                                suppressHydrationWarning
                                                onClick={() => router.push('/email-campaigns/create/ai-setup/strategist')}
                                                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-indigo-200 transition-all shadow-sm"
                                            >
                                                <ArrowLeft className="w-3.5 h-3.5" /> Reconfigure
                                            </button>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    suppressHydrationWarning
                                                    onClick={() => router.push('/email-campaigns/create/content')}
                                                    className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-indigo-200 transition-all shadow-sm"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> View Details
                                                </button>
                                                <button
                                                    type="button"
                                                    suppressHydrationWarning
                                                    onClick={() => router.push('/select-target-audience')}
                                                    className="flex items-center justify-center gap-2 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-all shadow-sm"
                                                >
                                                    <Users className="w-3.5 h-3.5" /> Select Contacts
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                    <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Adjust Configuration
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Ready for Review</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
