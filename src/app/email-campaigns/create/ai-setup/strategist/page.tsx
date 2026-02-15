'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCampaign } from '@/context/CampaignContext';
import {
    Send,
    Sparkles,
    MessageSquare,
    Bot,
    ArrowLeft,
    CheckCircle
} from 'lucide-react';

export default function AIEmailStrategistPage() {
    const router = useRouter();
    const { campaignData, setCampaignData } = useCampaign();
    const [answer, setAnswer] = useState('');
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!campaignData.step1Completed) {
            router.replace('/email-campaigns/new');
        }
    }, [campaignData.step1Completed, router]);

    const handleSend = () => {
        if (answer.trim()) {
            // In a real app, AI would process this. For now, we save it.
            // We'll also mock the other fields based on this input for the completion page.
            setCampaignData(prev => ({
                ...prev,
                aiStrategyInput: answer.trim(),
                businessInfo: answer.trim(), // Using input for demo
                productDetails: `AI-Powered Solutions for professionals`, // Mock derived field
                painPoints: `Manual personalization is time-consuming and inefficient.`, // Mock derived field
            }));
            setIsFinished(true);

            // Automatically redirect after a short delay to show 100% status
            setTimeout(() => {
                router.push('/email-campaigns/create/ai-setup/completion');
            }, 1000);
        }
    };

    const handleCompletion = () => {
        router.push('/email-campaigns/create/ai-setup/completion');
    };

    if (!campaignData.step1Completed) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-10 animate-in fade-in duration-700 flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col">
                {/* Progress Header */}
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center justify-between text-[11px] font-black tracking-widest text-indigo-400 uppercase">
                        <span>AI EMAIL STRATEGIST</span>
                        <span>{isFinished ? '100%' : '13%'} COMPLETE</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-indigo-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)] ${isFinished ? 'w-full' : 'w-[13%]'}`}
                        />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-indigo-50/20 overflow-hidden flex flex-col min-h-[500px]">
                    {/* Strategist Header */}
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-indigo-50/30">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 text-2xl font-black">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">AI Email Strategist</h1>
                                <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Active Personalization Mode</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-indigo-100 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase">AI Agent Online</span>
                        </div>
                    </div>

                    {/* Chat Interaction Area */}
                    <div className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
                        <div className="flex gap-5 max-w-3xl animate-in slide-in-from-left-4 duration-500">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="bg-white border border-gray-100 p-6 rounded-2xl rounded-tl-none shadow-sm">
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Hello! I&apos;m excited to help you configure your email campaign. To get started, could you please share some details about your company or business? Specifically, what is your company name, and what do you specialize in?
                                    </p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-300 ml-1">AI STRATEGIST • JUST NOW</span>
                            </div>
                        </div>

                        {isFinished && (
                            <div className="flex gap-5 max-w-3xl self-end animate-in slide-in-from-right-4 duration-500">
                                <div className="flex flex-col gap-1.5 items-end">
                                    <div className="bg-indigo-600 text-white p-6 rounded-2xl rounded-tr-none shadow-lg">
                                        <p className="leading-relaxed font-medium">{answer}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-300 mr-1 uppercase">You • Just Now</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-gray-50/50 border-t border-gray-50">
                        {!isFinished ? (
                            <div className="relative group">
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Type a detailed answer..."
                                    className="w-full bg-white border border-gray-100 rounded-2xl p-6 pr-24 text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-lg shadow-indigo-50/10 placeholder-gray-300 min-h-[120px] resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!answer.trim()}
                                    className={`absolute right-6 bottom-6 p-4 rounded-xl text-white transition-all shadow-xl active:scale-95
                                        ${answer.trim()
                                            ? 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5'
                                            : 'bg-gray-300 cursor-not-allowed'}
                                    `}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-4 gap-6 animate-in zoom-in-95 duration-500">
                                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 shadow-sm">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Configuration Complete</span>
                                </div>
                                <button
                                    onClick={handleCompletion}
                                    className="w-full max-w-md py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-base font-black hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all shadow-xl active:scale-[0.98]"
                                >
                                    100% Complete &rarr;
                                </button>
                            </div>
                        )}
                        {!isFinished && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="bg-gray-200 px-1.5 py-0.5 rounded text-[8px] border border-gray-300">ENTER</span>
                                    to send message
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                                    <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Voice Config</span>
                                    <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> AI Enhanced</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Abort AI Setup
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-gray-200" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">AI Configuration</span>
                        <div className="h-px w-10 bg-gray-200" />
                    </div>
                    <div className="w-24" /> {/* Spacer */}
                </div>
            </div>
        </div>
    );
}
