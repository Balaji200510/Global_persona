'use client';

import { Activity, Edit2, Trash2, Mail, Chrome, CheckCircle2 } from 'lucide-react';

interface EmailAccountCardProps {
    email: string;
    type: 'SMTP/IMAP' | 'Gmail OAuth';
    status: 'Active' | 'Inactive';
    verified: boolean;
    info: string;
    isFirst?: boolean;
}

export default function EmailAccountCard({
    email,
    type,
    status,
    verified,
    info,
    isFirst
}: EmailAccountCardProps) {
    const Icon = type === 'Gmail OAuth' ? Chrome : Mail;

    return (
        <div className={`flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group ${isFirst ? 'bg-orange-50/30' : ''}`}>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`p-3 rounded-lg ${type === 'Gmail OAuth' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{email}</span>
                        {status === 'Active' && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                <CheckCircle2 className="w-3 h-3" />
                                Active
                            </span>
                        )}
                        {verified && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                        <span className="font-semibold text-gray-600">{type}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{info}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0 ml-auto">
                <button
                    onClick={() => alert('Viewing activity for ' + email)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Activity"
                >
                    <Activity className="w-4.5 h-4.5" />
                </button>
                <button
                    onClick={() => alert('Editing account: ' + email)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Account"
                >
                    <Edit2 className="w-4.5 h-4.5" />
                </button>
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this email account?')) {
                            alert('Account deleted (mock)');
                        }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete Account"
                >
                    <Trash2 className="w-4.5 h-4.5" />
                </button>
            </div>
        </div>
    );
}
