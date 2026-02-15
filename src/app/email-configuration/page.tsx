'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, RefreshCw, Mail, ShieldCheck, MailCheck, Search } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import AccountRow from '@/components/AccountRow';
import { useEmailAccount } from '@/context/EmailAccountContext';

export default function EmailConfiguration() {
    const { emailAccounts, addEmailAccount, deleteEmailAccount, updateEmailAccount } = useEmailAccount();
    const [mounted, setMounted] = useState(false);

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
        // Since there's no form provided in the request, we'll implement a basic "test" account adder
        // as per rule 6: "Push new account object into state"
        const email = `account-${emailAccounts.length + 1}@globopersona.com`;
        addEmailAccount({
            email,
            status: 'active',
            isVerified: true,
            provider: 'Global Persona',
            protocol: 'SMTP',
            sentToday: 0,
            dailyLimit: 100,
            lastUsed: new Date().toISOString()
        });
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
                    <button onClick={handleAddAccount} className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm gap-2">
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
                                onDelete={deleteEmailAccount}
                                onEdit={(id) => console.log('Edit account', id)}
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
        </div>
    );
}
