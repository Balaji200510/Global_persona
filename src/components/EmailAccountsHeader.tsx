'use client';

import { Plus, RefreshCw } from 'lucide-react';

export default function EmailAccountsHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Configuration</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your email accounts and SMTP settings</p>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                </button>
                <button
                    onClick={() => alert('Add Email Account Modal Placeholder')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-indigo-100"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Email Account</span>
                </button>
            </div>
        </div>
    );
}
