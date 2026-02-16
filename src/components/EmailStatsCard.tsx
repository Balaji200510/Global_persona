'use client';

import { LucideIcon } from 'lucide-react';

interface EmailStatsCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
}

export default function EmailStatsCard({
    title,
    value,
    subtext,
    icon: Icon,
    iconColor,
    iconBgColor
}: EmailStatsCardProps) {
    return (
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex items-start gap-3 sm:gap-4 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${iconBgColor} ${iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1.5 sm:mt-2">{value}</h3>
                {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{subtext}</p>}
            </div>
        </div>
    );
}
