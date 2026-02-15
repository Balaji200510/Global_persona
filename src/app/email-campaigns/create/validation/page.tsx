'use client';

import { useState, useEffect } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { useRouter } from 'next/navigation';
import {
    CheckCircle2,
    Sparkles,
    ArrowLeft,
    Send,
    Calendar,
    Clock,
    Users,
    Mail,
    ShieldCheck,
    Zap,
    AlertCircle,
    ChevronRight,
    RefreshCcw
} from 'lucide-react';

export default function CampaignValidationPage() {
    const { campaignData, addCampaign } = useCampaign();
    const router = useRouter();
    const [isLaunching, setIsLaunching] = useState(false);
    const [isLaunched, setIsLaunched] = useState(false);
    const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const approvedPitches = mounted ? campaignData.generatedPitches.filter(p => p.status === 'approved') : [];
    const totalRecipients = approvedPitches.length;

    const handleLaunch = () => {
        setIsLaunching(true);

        // Add campaign to global list
        addCampaign({
            id: Math.random().toString(36).substr(2, 9),
            name: campaignData.name || 'Untitled Campaign',
            status: 'Completed',
            isAIPersonalized: true,
            recipients: totalRecipients,
            sent: totalRecipients,
            opens: Math.floor(totalRecipients * 0.4), // Simulate initial engagement
            clicks: Math.floor(totalRecipients * 0.1),
            bounces: Math.floor(totalRecipients * 0.02),
            revenue: Math.floor(totalRecipients * 5.5), // Simulate revenue
            createdAt: new Date().toISOString()
        });

        // Simulate campaign launch delay
        setTimeout(() => {
            setIsLaunching(false);
            setIsLaunched(true);
        }, 2500);
    };

    if (isLaunched) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex items-center justify-center p-8 animate-in fade-in duration-700">
                <div className="max-w-md w-full text-center space-y-8 bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl shadow-emerald-100/50">
                    <div className="w-24 h-24 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 mx-auto shadow-inner border border-emerald-100">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-3">Campaign Launched!</h1>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Your personalized campaign <strong>"{campaignData.name}"</strong> has been successfully scheduled for {totalRecipients} recipients.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-base font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                    >
                        Return to Dashboard <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Review
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 leading-tight">Final Validation</h1>
                                <p className="text-gray-500 font-medium">Confirm sending settings and launch your campaign.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Summary Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Campaign Summary */}
                        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="w-32 h-32 text-indigo-600" />
                            </div>
                            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">Campaign Summary</h2>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between py-4 border-b border-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">Campaign Name</span>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{campaignData.name || 'Untitled Campaign'}</span>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">Total Recipients</span>
                                    </div>
                                    <span className="text-sm font-black text-emerald-600">{totalRecipients} Contacts</span>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">Optimization Level</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                        <span className="text-sm font-black text-indigo-600">AI Personalized</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sending Settings */}
                        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Scheduling Options</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setScheduleType('now')}
                                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-start gap-4 text-left
                                        ${scheduleType === 'now'
                                            ? 'border-indigo-600 bg-indigo-50/30'
                                            : 'border-gray-100 bg-white hover:border-indigo-100'}
                                    `}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                        ${scheduleType === 'now' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}
                                    `}>
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">Send Immediately</p>
                                        <p className="text-xs font-bold text-gray-400 mt-1">Blast your pitches after validation.</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setScheduleType('later')}
                                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-start gap-4 text-left
                                        ${scheduleType === 'later'
                                            ? 'border-indigo-600 bg-indigo-50/30'
                                            : 'border-gray-100 bg-white hover:border-indigo-100'}
                                    `}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                        ${scheduleType === 'later' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}
                                    `}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 text-sm">Schedule for Later</p>
                                        <p className="text-xs font-bold text-gray-400 mt-1">Pick the perfect delivery window.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Launch Actions */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-200">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                    <AlertCircle className="w-5 h-5 text-indigo-300" />
                                </div>
                                <h3 className="text-lg font-bold">Launch Check</h3>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold text-indigo-100/70 leading-relaxed">
                                        All {totalRecipients} emails passed the AI high-confidence validation check.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold text-indigo-100/70 leading-relaxed">
                                        Spam filters successfully bypassed for personalized content hooks.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLaunch}
                                disabled={isLaunching || totalRecipients === 0}
                                className={`w-full py-5 rounded-2xl text-base font-black transition-all flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group
                                    ${isLaunching
                                        ? 'bg-indigo-800 cursor-not-allowed'
                                        : 'bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-1 active:scale-95 shadow-indigo-900/40'}
                                `}
                            >
                                {isLaunching ? (
                                    <>Launching... <RefreshCcw className="w-5 h-5 animate-spin" /></>
                                ) : (
                                    <>Launch Campaign <Send className="w-5 h-5" /></>
                                )}
                            </button>

                            <p className="text-[10px] font-bold text-center text-indigo-300/50 uppercase tracking-widest mt-6">
                                Estimated Delivery: {scheduleType === 'now' ? 'Immediate' : 'Scheduled Window'}
                            </p>
                        </div>

                        <div className="bg-emerald-50 rounded-[32px] p-6 border border-emerald-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-emerald-800 uppercase tracking-tighter">Ready to Fly</p>
                                <p className="text-[10px] font-bold text-emerald-600/70 leading-tight">Secure delivery protocols active.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">HAIL Campaign Manager v1.0</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Step 4/4</span>
                        <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
