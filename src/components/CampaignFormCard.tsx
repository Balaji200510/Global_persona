'use client';

import { ArrowRight } from 'lucide-react';
import AudienceSelectDropdown from './AudienceSelectDropdown';

interface CampaignFormCardProps {
    name: string;
    setName: (name: string) => void;
    audienceId: string;
    setAudienceId: (id: string) => void;
    onNext: () => void;
    onClear: () => void;
}

export default function CampaignFormCard({
    name,
    setName,
    audienceId,
    setAudienceId,
    onNext,
    onClear
}: CampaignFormCardProps) {
    const isNameEmpty = name.trim() === '';
    const isAudienceEmpty = audienceId === '';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full transform transition-all duration-300 hover:shadow-md">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Campaign Details</h2>
                <p className="text-sm text-gray-500 mt-1">Enter your campaign information and select your target audience</p>
            </div>

            <div className="space-y-8 flex-1">
                {/* Campaign Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Campaign Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Summer Special Promotion 2024"
                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400
                            ${!isNameEmpty
                                ? 'border-transparent focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'
                                : 'border-red-100 focus:border-red-300 focus:ring-4 focus:ring-red-50'}
                        `}
                    />
                    {isNameEmpty && (
                        <p className="text-[11px] text-red-500 font-medium">Campaign name is required</p>
                    )}
                    {!isNameEmpty && (
                        <p className="text-[11px] text-gray-400 mt-1">Give your campaign a descriptive name to track performance</p>
                    )}
                </div>

                {/* Audience Selection */}
                <div className="space-y-2">
                    <AudienceSelectDropdown value={audienceId} onChange={setAudienceId} />
                    {isAudienceEmpty && (
                        <p className="text-[11px] text-red-500 font-medium mt-1">Target audience is required</p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-10 border-t border-gray-50 mt-8">
                <button
                    onClick={onClear}
                    className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Clear Form
                </button>
                <button
                    onClick={onNext}
                    disabled={isNameEmpty || isAudienceEmpty}
                    className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg
                        ${!isNameEmpty && !isAudienceEmpty
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0'
                            : 'bg-gray-200 shadow-none cursor-not-allowed text-gray-400'}
                    `}
                >
                    Next Step <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
