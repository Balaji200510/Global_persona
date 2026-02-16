'use client';

import { Activity, Edit2, Trash2, Mail, Chrome, CheckCircle2 } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';
import { useEmailAccount } from '@/context/EmailAccountContext';

interface EmailAccountCardProps {
    email: string;
    type: 'SMTP/IMAP' | 'Gmail OAuth';
    status: 'Active' | 'Inactive';
    verified: boolean;
    info: string;
    isFirst?: boolean;
    accountId?: string;
    onEdit?: () => void;
}

export default function EmailAccountCard({
    email,
    type,
    status,
    verified,
    info,
    isFirst,
    accountId,
    onEdit
}: EmailAccountCardProps) {
    const Icon = type === 'Gmail OAuth' ? Chrome : Mail;
    const { showNotification, showConfirm } = useNotification();
    const { deleteEmailAccount, emailAccounts } = useEmailAccount();

    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 group ${isFirst ? 'bg-orange-50/30 dark:bg-orange-900/10' : ''}`}>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto flex-1 min-w-0">
                <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${type === 'Gmail OAuth' ? 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 truncate">{email}</span>
                        {status === 'Active' && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800 flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                                Active
                            </span>
                        )}
                        {verified && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800 flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">{type}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                        <span className="truncate">{info}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0 ml-auto sm:ml-0 flex-shrink-0">
                <button
                    onClick={() => showNotification(`Viewing activity for ${email}`, 'info')}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95" title="View Activity"
                >
                    <Activity className="w-4.5 h-4.5" />
                </button>
                <button
                    onClick={() => {
                        if (onEdit) {
                            onEdit();
                        } else {
                            showNotification(`Edit functionality for ${email} - Coming soon`, 'info');
                        }
                    }}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95" title="Edit Account"
                >
                    <Edit2 className="w-4.5 h-4.5" />
                </button>
                {accountId && (
                    <button
                        onClick={() => {
                            showConfirm(
                                `Are you sure you want to delete ${email}? This action cannot be undone.`,
                                () => {
                                    deleteEmailAccount(accountId);
                                    showNotification(`Email account ${email} has been deleted`, 'success');
                                }
                            );
                        }}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95" title="Delete Account"
                    >
                        <Trash2 className="w-4.5 h-4.5" />
                    </button>
                )}
            </div>
        </div>
    );
}
