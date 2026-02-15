'use client';

import { useState, useEffect } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { useRouter } from 'next/navigation';
import {
    Sparkles,
    ArrowLeft,
    Users,
    Mail,
    Bot,
    ChevronRight,
    Zap,
    CheckCircle2,
    RefreshCcw,
    User,
    Briefcase,
    Building2,
    ThumbsUp,
    ThumbsDown,
    Send,
    X
} from 'lucide-react';

export default function AIEmailPreviewPage() {
    const { campaignData, setCampaignData } = useCampaign();
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPitches, setShowPitches] = useState(campaignData.generatedPitches.length > 0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (campaignData.generatedPitches.length > 0) {
            setShowPitches(true);
        }
    }, [campaignData.generatedPitches]);

    const selectedCount = mounted ? campaignData.selectedContacts.length : 0;
    const approvedCount = mounted ? campaignData.generatedPitches.filter(p => p.status === 'approved').length : 0;

    const handleGeneratePitches = () => {
        setIsGenerating(true);

        // Mocking AI generation delay
        setTimeout(() => {
            const newPitches = campaignData.selectedContacts.map(contact => ({
                id: Math.random().toString(36).substr(2, 9),
                contactId: contact.id,
                subject: `Exploring Synergies Between ${campaignData.businessInfo.split(' ')[0] || 'Persona'} and ${contact.company}`,
                body: `Hi ${contact.name},\n\nI noticed your work at ${contact.company} and wanted to reach out. At ${campaignData.businessInfo}, we specialize in ${campaignData.productDetails}.\n\nGiven the current challenges in landscape supplies, I believe our solutions could help address the ${campaignData.painPoints} you might be facing.\n\nWould you be open to a brief chat next week?\n\nBest regards,\nThe ${campaignData.businessInfo} Team`,
                status: 'pending' as const
            }));

            setCampaignData(prev => ({
                ...prev,
                generatedPitches: newPitches
            }));

            setIsGenerating(false);
            setShowPitches(true);
        }, 1500);
    };

    const handleApprove = (pitchId: string) => {
        setCampaignData(prev => ({
            ...prev,
            generatedPitches: prev.generatedPitches.map(p =>
                p.id === pitchId ? { ...p, status: 'approved' } : p
            )
        }));
    };

    const handleReject = (pitchId: string) => {
        setCampaignData(prev => ({
            ...prev,
            generatedPitches: prev.generatedPitches.map(p =>
                p.id === pitchId ? { ...p, status: 'rejected' } : p
            )
        }));
    };

    const handleSchedule = () => {
        router.push('/email-campaigns/create/validation');
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Audience Selection
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 leading-tight">
                                    {showPitches ? 'AI Generated Email Pitches' : 'AI Generated Email Preview'}
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    {showPitches
                                        ? `Generated ${campaignData.generatedPitches.length} personalized pitches for your selection.`
                                        : 'Ready to generate personalized pitches for your selection.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {!showPitches && (
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={handleGeneratePitches}
                                disabled={isGenerating || selectedCount === 0}
                                className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-base font-black hover:shadow-2xl hover:shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95 shadow-xl
                                    ${isGenerating || selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {isGenerating ? (
                                    <>Generating... <RefreshCcw className="w-5 h-5 animate-spin" /></>
                                ) : (
                                    <>Generate Email Pitches <Zap className="w-5 h-5 fill-current" /></>
                                )}
                            </button>
                        </div>
                    )}

                    {showPitches && (
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => {
                                    setShowPitches(false);
                                    handleGeneratePitches();
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Regenerate All
                            </button>
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={handleSchedule}
                                disabled={approvedCount === 0}
                                className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl text-base font-black hover:shadow-2xl hover:shadow-emerald-100 transition-all hover:-translate-y-1 active:scale-95 shadow-xl
                                    ${approvedCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                Validate & Schedule <Send className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Campaign Name</p>
                            <p className="text-base font-bold text-gray-900">{campaignData.name || 'Untitled Campaign'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Target Audience</p>
                            <p className="text-base font-bold text-gray-900">{selectedCount} Contacts Selected</p>
                        </div>
                    </div>

                    <div className={`${showPitches ? 'bg-emerald-600' : 'bg-indigo-600'} p-6 rounded-3xl text-white shadow-xl transition-colors duration-500 flex items-center gap-5`}>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">AI Status</p>
                            <p className="text-base font-bold">{showPitches ? 'Personalization Complete' : 'Ready to Personalize'}</p>
                        </div>
                    </div>
                </div>

                {!showPitches ? (
                    /* Selected Contacts Preview (Static List) */
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-indigo-50/20 overflow-hidden animate-in fade-in duration-500">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-indigo-600" />
                                    Selected Recipients
                                </h2>
                                <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-black text-indigo-600">
                                    {selectedCount} TOTAL
                                </span>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Previewing Data Binding</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-10 py-5">Contact</th>
                                        <th className="px-6 py-5">Position</th>
                                        <th className="px-6 py-5">Company</th>
                                        <th className="px-6 py-5">Personalization Hub</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {campaignData.selectedContacts.length > 0 ? (
                                        campaignData.selectedContacts.map((contact) => (
                                            <tr key={contact.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-10 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                                            <User className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-900">{contact.name}</span>
                                                            <span className="text-[10px] font-bold text-gray-400">{contact.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                        <Briefcase className="w-3.5 h-3.5 text-gray-300" />
                                                        {contact.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                                                        <Building2 className="w-3.5 h-3.5 text-indigo-100" />
                                                        {contact.company}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Pending AI Hook</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-10 py-10 text-center text-gray-400 font-medium italic">
                                                No contacts selected. Please go back and select target contacts.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 bg-gray-50/30 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-indigo-600/60">
                                <Zap className="w-4 h-4 fill-current" />
                                <p className="text-xs font-bold uppercase tracking-widest">
                                    AI will use <strong>{campaignData.businessInfo || 'Business Info'}</strong> to craft unique hooks for each contact.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* AI Generated Email Pitches (Individual Preview Cards) */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {campaignData.generatedPitches.map((pitch) => {
                            const contact = campaignData.selectedContacts.find(c => c.id === pitch.contactId);
                            return (
                                <div key={pitch.id} className={`bg-white rounded-[40px] border transition-all duration-500 overflow-hidden shadow-sm
                                    ${pitch.status === 'approved' ? 'border-emerald-200 shadow-emerald-50' :
                                        pitch.status === 'rejected' ? 'border-red-100 opacity-75' :
                                            'border-gray-100 hover:border-indigo-100 hover:shadow-md'}
                                `}>
                                    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-50 h-full">
                                        {/* Contact Info (Left) */}
                                        <div className="lg:w-1/4 p-8 bg-gray-50/30">
                                            <div className="flex flex-col items-center text-center gap-4">
                                                <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm relative group overflow-hidden">
                                                    <User className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                                    {pitch.status === 'approved' && (
                                                        <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{contact?.name}</h3>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{contact?.title}</p>
                                                    <p className="text-sm font-bold text-indigo-600/70 mt-1">{contact?.company}</p>
                                                </div>
                                                <div className="flex flex-col gap-2 w-full pt-4">
                                                    <button
                                                        type="button"
                                                        suppressHydrationWarning
                                                        disabled={pitch.status !== 'pending'}
                                                        onClick={() => handleApprove(pitch.id)}
                                                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold transition-all
                                                            ${pitch.status === 'approved'
                                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed'
                                                                : pitch.status === 'rejected'
                                                                    ? 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed'
                                                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}
                                                        `}
                                                    >
                                                        {pitch.status === 'approved' ? (
                                                            <><CheckCircle2 className="w-4 h-4" /> Approved</>
                                                        ) : (
                                                            <><ThumbsUp className="w-4 h-4" /> Approve Draft</>
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        suppressHydrationWarning
                                                        disabled={pitch.status !== 'pending'}
                                                        onClick={() => handleReject(pitch.id)}
                                                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold transition-all
                                                            ${pitch.status === 'rejected'
                                                                ? 'bg-red-50 text-red-600 border border-red-100 cursor-not-allowed'
                                                                : pitch.status === 'approved'
                                                                    ? 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed'
                                                                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100'}
                                                        `}
                                                    >
                                                        {pitch.status === 'rejected' ? (
                                                            <><X className="w-4 h-4" /> Rejected</>
                                                        ) : (
                                                            <><ThumbsDown className="w-4 h-4" /> Reject Pitch</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email Content (Right) */}
                                        <div className="flex-1 p-10 flex flex-col gap-6 relative">
                                            {pitch.status === 'approved' && (
                                                <div className="absolute top-8 right-10">
                                                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-widest">
                                                        LOCKED & READY
                                                    </span>
                                                </div>
                                            )}
                                            {pitch.status === 'rejected' && (
                                                <div className="absolute top-8 right-10">
                                                    <span className="px-4 py-1.5 bg-red-50 text-red-700 text-[10px] font-black rounded-full border border-red-100 uppercase tracking-widest">
                                                        PITCH REJECTED
                                                    </span>
                                                </div>
                                            )}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] w-16">Subject:</span>
                                                    <p className="text-sm font-bold text-gray-900">{pitch.subject}</p>
                                                </div>
                                                <div className="pt-2">
                                                    <div className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed font-medium">
                                                        {pitch.body}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-indigo-600">AI</div>
                                                        <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-emerald-600">✓</div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Persona Optimization Active</span>
                                                </div>
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Confidence Score: 98%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.3em] font-mono">
                        {showPitches ? 'Phase 4/4: Pitch Validation' : 'Phase 3/4: Context Building'}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Next State:</span>
                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest">
                            {showPitches ? 'Final Review & Dispatch' : 'Email Content Discovery'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}
