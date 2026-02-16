'use client';

import { Eye, Send, Users, MousePointer2, BarChart3, Wand2 } from 'lucide-react';

interface CampaignCardProps {
    id: string;
    name: string;
    status: 'Draft' | 'Completed' | 'Rejected';
    isAIPersonalized: boolean;
    recipients: number;
    sent: number;
    opens: number;
    clicks: number;
    revenue?: number;
    onStatusUpdate?: (id: string, status: 'Completed' | 'Rejected') => void;
}

export default function CampaignCard({
    id,
    name,
    status,
    isAIPersonalized,
    recipients,
    sent,
    opens,
    clicks,
    revenue,
    onStatusUpdate
}: CampaignCardProps) {
    const openRate = sent > 0 ? ((opens / sent) * 100).toFixed(1) : (status === 'Completed' ? opens : '0');
    const clickRate = sent > 0 ? ((clicks / sent) * 100).toFixed(1) : (status === 'Completed' ? clicks : '0');

    const handleApprove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onStatusUpdate?.(id, 'Completed');
    };

    const handleReject = (e: React.MouseEvent) => {
        e.stopPropagation();
        onStatusUpdate?.(id, 'Rejected');
    };
    return (
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm p-4 sm:p-6 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-4 sm:mb-6">
                <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Completed' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800' :
                                status === 'Rejected' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800' :
                                    'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-600'
                            }`}>
                            {status}
                        </span>
                        {isAIPersonalized && (
                            <span className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-indigo-100 dark:border-indigo-800">
                                <Wand2 className="w-3 h-3" />
                                AI Personalized
                            </span>
                        )}
                        {revenue && revenue > 0 && (
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100 dark:border-emerald-800">
                                ${revenue.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{name}</h3>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    {status === 'Draft' && (
                        <>
                            <button
                                onClick={handleApprove}
                                className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                                title="Launch Campaign"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleReject}
                                className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                                title="Reject Campaign"
                            >
                                <BarChart3 className="w-5 h-5 rotate-180" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => {
                            // Navigate to campaign details or show preview
                            // For now, show notification
                            if (typeof window !== 'undefined') {
                                window.location.href = `/email-campaigns`;
                            }
                        }}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                        title="View Campaign Details"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 transition-opacity ${status === 'Rejected' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:scale-110 transition-transform duration-200">
                        <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Recipients</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{recipients.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                        <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Total Sent</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{sent.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-100 dark:border-gray-700 transition-opacity ${status === 'Rejected' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                        <MousePointer2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Opens</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{openRate}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200">
                        <BarChart3 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">Clicked</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{clickRate}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
