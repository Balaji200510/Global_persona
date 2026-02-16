'use client';

import { Plus, RefreshCw } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

interface EmailAccountsHeaderProps {
    onAddClick?: () => void;
}

export default function EmailAccountsHeader({ onAddClick }: EmailAccountsHeaderProps) {
    const { showNotification } = useNotification();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Email Configuration</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your email accounts and SMTP settings</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => showNotification('Email accounts refreshed', 'success')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-semibold hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                </button>
                <button
                    onClick={() => {
                        if (onAddClick) {
                            onAddClick();
                        } else {
                            showNotification('Add Account functionality coming soon', 'info');
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-blue-100"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Email Account</span>
                </button>
            </div>
        </div>
    );
}
