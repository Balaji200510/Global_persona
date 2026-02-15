import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    subtext?: string;
    icon: LucideIcon;
    iconBgColor: string;
    iconColor: string;
}

export default function StatsCard({ title, value, subtext, icon: Icon, iconBgColor, iconColor }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
                <div className="text-3xl font-bold text-gray-800">{value}</div>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-lg ${iconBgColor} ${iconColor}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
