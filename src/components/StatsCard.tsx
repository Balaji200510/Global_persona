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
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex items-start justify-between hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 uppercase tracking-wide">{title}</h3>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
                {subtext && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{subtext}</p>}
            </div>
            <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${iconBgColor} ${iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
    );
}
