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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 group">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' :
                                status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-100' :
                                    'bg-gray-50 text-gray-500 border border-gray-100'
                            }`}>
                            {status}
                        </span>
                        {isAIPersonalized && (
                            <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-indigo-100">
                                <Wand2 className="w-3 h-3" />
                                AI Personalized
                            </span>
                        )}
                        {revenue && revenue > 0 && (
                            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                                ${revenue.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{name}</h3>
                </div>
                <div className="flex items-center gap-1">
                    {status === 'Draft' && (
                        <>
                            <button
                                onClick={handleApprove}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                title="Launch Campaign"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleReject}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Reject Campaign"
                            >
                                <BarChart3 className="w-5 h-5 rotate-180" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => alert('Opening campaign preview for: ' + name)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 mb-6 transition-opacity ${status === 'Rejected' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                        <Users className="w-4.5 h-4.5" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Recipients</p>
                        <p className="text-sm font-bold text-gray-900">{recipients.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <Send className="w-4.5 h-4.5" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Total Sent</p>
                        <p className="text-sm font-bold text-gray-900">{sent.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 pt-5 border-t border-gray-50 transition-opacity ${status === 'Rejected' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <MousePointer2 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Opens</p>
                        <p className="text-sm font-bold text-gray-900">{openRate}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <BarChart3 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Clicked</p>
                        <p className="text-sm font-bold text-gray-900">{clickRate}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
