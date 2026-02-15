'use client';

import EmailAccountsHeader from '@/components/EmailAccountsHeader';
import EmailStatsCard from '@/components/EmailStatsCard';
import EmailAccountsList from '@/components/EmailAccountsList';
import { CheckCircle2, Mail, Activity, Settings } from 'lucide-react';

export default function EmailAccountsPage() {
    const stats = [
        {
            title: "Active Accounts",
            value: "3",
            subtext: "of 3 total",
            icon: CheckCircle2,
            iconColor: "text-green-600",
            iconBgColor: "bg-green-50"
        },
        {
            title: "Daily Limit",
            value: "300",
            subtext: "emails per day",
            icon: Mail,
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-50"
        },
        {
            title: "Sent Today",
            value: "0",
            subtext: "across all accounts",
            icon: Activity,
            iconColor: "text-purple-600",
            iconBgColor: "bg-purple-50"
        },
        {
            title: "Utilization",
            value: "0%",
            subtext: "of daily capacity",
            icon: Settings,
            iconColor: "text-orange-600",
            iconBgColor: "bg-orange-50"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <EmailAccountsHeader />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <EmailStatsCard key={stat.title} {...stat} />
                ))}
            </div>

            <EmailAccountsList />
        </div>
    );
}
