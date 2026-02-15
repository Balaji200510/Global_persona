'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

interface CampaignPreviewCardProps {
    name: string;
    audienceName: string;
    step?: number;
    percentage?: number;
    approachName?: string;
}

export default function CampaignPreviewCard({
    name,
    audienceName,
    step = 1,
    percentage = 33,
    approachName
}: CampaignPreviewCardProps) {
    const nextSteps = [
        { title: 'Choose Your Approach', stepNum: 2 },
        { title: 'Review & Launch', stepNum: 3 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8 h-full">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Campaign Preview</h2>
                <p className="text-sm text-gray-500 mt-1">Live overview of your current configuration</p>
            </div>

            <div className="space-y-6 flex-1">
                {/* Campaign Name Preview */}
                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Campaign Name</p>
                    <p className={`text-sm font-bold transition-all ${name ? 'text-gray-900' : 'text-gray-300 italic font-medium'}`}>
                        {name || 'Campaign title will appear here...'}
                    </p>
                </div>

                {/* Target Audience Preview */}
                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target Audience</p>
                    <p className={`text-sm font-bold transition-all ${audienceName ? 'text-indigo-600' : 'text-gray-300 italic font-medium'}`}>
                        {audienceName || 'No list selected'}
                    </p>
                </div>

                {/* Approach Preview */}
                {approachName && (
                    <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 animate-in zoom-in-95 duration-300">
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Chosen Approach</p>
                        <p className="text-sm font-bold text-indigo-700">{approachName}</p>
                    </div>
                )}

                {/* Progress */}
                <div className="pt-2">
                    <ProgressIndicator step={step} totalSteps={3} percentage={percentage} />
                </div>

                {/* Next Steps */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Steps</p>
                    {nextSteps.map((s, idx) => {
                        const isUpcoming = s.stepNum > step;
                        return (
                            <div key={idx} className={`flex items-center gap-3 transition-opacity ${isUpcoming ? 'opacity-50 grayscale' : 'opacity-100 text-green-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white ${!isUpcoming ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                    {isUpcoming ? s.stepNum : <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <span className={`text-sm font-bold ${!isUpcoming ? 'text-green-600' : 'text-gray-500'}`}>{s.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-indigo-50/50 rounded-xl p-4 flex items-start gap-3 border border-indigo-100/50">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">
                    {step === 1
                        ? "You're currently in step 1. Once you complete this, you'll be able to choose your campaign approach."
                        : "You're in step 2. Next, you'll review your campaign and prepare for launch."}
                </p>
            </div>
        </div>
    );
}
