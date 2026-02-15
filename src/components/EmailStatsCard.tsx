'use client';

import { LucideIcon } from 'lucide-react';

interface EmailStatsCardProps {
    title: string;
    value: string | number;
    subtext: string;
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all duration-200">
            <div className={`p-3 rounded-lg ${iconBgColor} ${iconColor}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                <p className="text-xs text-gray-400 mt-1">{subtext}</p>
            </div>
        </div>
    );
}
