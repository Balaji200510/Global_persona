'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, RefreshCw, Mail, ShieldCheck, MailCheck, Search } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import AccountRow from '@/components/AccountRow';
import { useEmailAccount } from '@/context/EmailAccountContext';
import { useNotification } from '@/context/NotificationContext';

export default function EmailConfiguration() {
    const { emailAccounts, addEmailAccount, deleteEmailAccount, updateEmailAccount } = useEmailAccount();
    const { showNotification, showPrompt, showConfirm } = useNotification();
    const [mounted, setMounted] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAccountEmail, setNewAccountEmail] = useState('');
    const [newAccountProvider, setNewAccountProvider] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const statsData = useMemo(() => {
        const activeAccounts = emailAccounts.filter(acc => acc.status === 'active').length;
        const totalDailyLimit = emailAccounts
            .filter(acc => acc.status === 'active')
            .reduce((sum, acc) => sum + (acc.dailyLimit || 0), 0);
        const totalSentToday = emailAccounts.reduce((sum, acc) => sum + (acc.sentToday || 0), 0);
        const utilization = totalDailyLimit > 0 ? (totalSentToday / totalDailyLimit) * 100 : 0;

        return [
            {
                title: "Active Accounts",
                value: activeAccounts.toString(),
                subtext: emailAccounts.length > 0 ? `of ${emailAccounts.length} total` : undefined,
                icon: Mail,
                iconBgColor: "bg-green-100",
                iconColor: "text-green-600"
            },
            {
                title: "Daily Limit",
                value: totalDailyLimit.toLocaleString(),
                subtext: "emails per day",
                icon: ShieldCheck,
                iconBgColor: "bg-blue-100",
                iconColor: "text-blue-600"
            },
            {
                title: "Utilization",
                value: `${utilization.toFixed(1)}%`,
                subtext: totalDailyLimit > 0 ? `${totalSentToday} sent today` : undefined,
                icon: MailCheck,
                iconBgColor: "bg-purple-100",
                iconColor: "text-purple-600"
            },
        ];
    }, [emailAccounts]);

    const handleAddAccount = () => {
        setShowAddModal(true);
    };

    const handleSubmitAccount = () => {
        if (!newAccountEmail || !newAccountEmail.includes('@')) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const provider = newAccountProvider || 'Custom SMTP';
        const protocol = provider.toLowerCase().includes('gmail') ? 'OAuth' : 'SMTP';

        addEmailAccount({
            email: newAccountEmail,
            status: 'active',
            isVerified: false,
            provider,
            protocol,
            sentToday: 0,
            dailyLimit: 100,
            lastUsed: new Date().toISOString()
        });

        showNotification(`Email account ${newAccountEmail} added successfully`, 'success');
        setShowAddModal(false);
        setNewAccountEmail('');
        setNewAccountProvider('');
    };

    if (!mounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-gray-900">Email Configuration</h1>
                    </div>
                    <p className="text-sm text-gray-500">Manage your email accounts and relay settings</p>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => window.location.reload()} className="flex items-center justify-center p-2.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        data-add-account
                        onClick={handleAddAccount}
                        className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Email Account
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        subtext={stat.subtext}
                        icon={stat.icon}
                        iconBgColor={stat.iconBgColor}
                        iconColor={stat.iconColor}
                    />
                ))}
            </div>

            {/* Email Accounts Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Email Accounts</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your configured email accounts</p>
                    </div>
                    {emailAccounts.length > 0 && (
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                            {emailAccounts.length} {emailAccounts.length === 1 ? 'account' : 'accounts'}
                        </span>
                    )}
                </div>

                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                    {emailAccounts.length > 0 ? (
                        emailAccounts.map((account, idx) => (
                            <AccountRow
                                key={account.id}
                                id={account.id}
                                email={account.email}
                                status={account.status}
                                verified={account.isVerified}
                                protocol={account.protocol}
                                provider={account.provider}
                                sentToday={account.sentToday}
                                dailyLimit={account.dailyLimit}
                                lastUsed={account.lastUsed}
                                className={idx === 0 ? 'bg-orange-50/30' : ''}
                                onDelete={(id) => {
                                    const account = emailAccounts.find(acc => acc.id === id);
                                    showConfirm(
                                        `Are you sure you want to delete ${account?.email || 'this account'}? This action cannot be undone.`,
                                        () => {
                                            deleteEmailAccount(id);
                                            showNotification(`Email account ${account?.email || ''} has been deleted`, 'success');
                                        }
                                    );
                                }}
                                onEdit={(id) => {
                                    const account = emailAccounts.find(acc => acc.id === id);
                                    showNotification(`Edit functionality for ${account?.email || 'this account'} - Coming soon`, 'info');
                                }}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50/50">
                            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                <Mail className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No email accounts added</h3>
                            <p className="text-gray-500 text-sm mt-1 mb-8 max-w-sm">Add an account to start sending emails.</p>
                            <button
                                onClick={handleAddAccount}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Add Email Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Account Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 animate-scale-in">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Add Email Account</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={newAccountEmail}
                                    onChange={(e) => setNewAccountEmail(e.target.value)}
                                    placeholder="example@domain.com"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Provider (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={newAccountProvider}
                                    onChange={(e) => setNewAccountProvider(e.target.value)}
                                    placeholder="e.g., Gmail, Outlook, Custom SMTP"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmitAccount();
                                        } else if (e.key === 'Escape') {
                                            setShowAddModal(false);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewAccountEmail('');
                                    setNewAccountProvider('');
                                }}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitAccount}
                                disabled={!newAccountEmail.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
