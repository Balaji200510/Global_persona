'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Server, Shield, Activity, Save } from 'lucide-react';
import { EmailAccount } from '@/context/EmailAccountContext';

interface EmailAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (account: Omit<EmailAccount, 'id'>) => void;
    initialData?: EmailAccount;
    isEditing?: boolean;
}

export default function EmailAccountModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditing = false
}: EmailAccountModalProps) {
    const [formData, setFormData] = useState<Partial<EmailAccount>>({
        email: '',
        provider: 'Gmail',
        protocol: 'OAuth',
        dailyLimit: 500,
        status: 'active',
        isVerified: true,
        sentToday: 0
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(initialData);
        } else if (isOpen && !initialData) {
            // Reset form when opening for add
            setFormData({
                email: '',
                provider: 'Gmail',
                protocol: 'OAuth',
                dailyLimit: 500,
                status: 'active',
                isVerified: true,
                sentToday: 0
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.email) return;

        onSubmit({
            email: formData.email!,
            provider: formData.provider || 'Custom',
            protocol: formData.protocol || 'SMTP',
            status: formData.status as 'active' | 'inactive' || 'active',
            isVerified: formData.isVerified ?? true,
            sentToday: formData.sentToday || 0,
            dailyLimit: Number(formData.dailyLimit) || 0,
            lastUsed: formData.lastUsed
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {isEditing ? 'Edit Email Account' : 'Add Email Account'}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {isEditing ? 'Update account configuration' : 'Configure a new email sender'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {/* Provider */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Server className="w-4 h-4 text-gray-500" />
                                Provider
                            </label>
                            <select
                                value={formData.provider}
                                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                            >
                                <option value="Gmail">Gmail</option>
                                <option value="Outlook">Outlook</option>
                                <option value="Zoho">Zoho</option>
                                <option value="Custom">Custom SMTP</option>
                            </select>
                        </div>

                        {/* Protocol */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-gray-500" />
                                Protocol
                            </label>
                            <select
                                value={formData.protocol}
                                onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                            >
                                <option value="OAuth">OAuth 2.0</option>
                                <option value="SMTP">SMTP/IMAP</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {/* Daily Limit */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-gray-500" />
                                Daily Limit
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={formData.dailyLimit}
                                onChange={(e) => setFormData({ ...formData, dailyLimit: parseInt(e.target.value) })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-gray-500" />
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Save className="w-4 h-4" />
                            {isEditing ? 'Save Changes' : 'Add Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
