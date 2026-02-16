'use client';

import { useMemo } from 'react';
import EmailAccountsHeader from '@/components/EmailAccountsHeader';
import EmailStatsCard from '@/components/EmailStatsCard';
import EmailAccountsList from '@/components/EmailAccountsList';
import { useEmailAccount } from '@/context/EmailAccountContext';
import { CheckCircle2, Mail, Activity, Settings } from 'lucide-react';

export default function EmailAccountsPage() {
    const { emailAccounts } = useEmailAccount();

    const stats = useMemo(() => {
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
                icon: CheckCircle2,
                iconColor: "text-green-600",
                iconBgColor: "bg-green-50"
            },
            {
                title: "Daily Limit",
                value: totalDailyLimit.toLocaleString(),
                subtext: "emails per day",
                icon: Mail,
                iconColor: "text-blue-600",
                iconBgColor: "bg-blue-50"
            },
            {
                title: "Sent Today",
                value: totalSentToday.toLocaleString(),
                subtext: "across all accounts",
                icon: Activity,
                iconColor: "text-purple-600",
                iconBgColor: "bg-purple-50"
            },
            {
                title: "Utilization",
                value: `${utilization.toFixed(1)}%`,
                subtext: totalDailyLimit > 0 ? "of daily capacity" : undefined,
                icon: Settings,
                iconColor: "text-orange-600",
                iconBgColor: "bg-orange-50"
            }
        ];
    }, [emailAccounts]);

    return (
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 animate-fade-in">
            <EmailAccountsHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                    <div
                        key={stat.title}
                        className="animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <EmailStatsCard {...stat} />
                    </div>
                ))}
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                <EmailAccountsList />
            </div>
        </div>
    );
}
