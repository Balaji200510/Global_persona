import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface KPICardProps {
    title: string;
    value: string;
    growth?: string;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
    progressValue?: number; // 0-100
}

export default function KPICard({ title, value, growth, color, progressValue = 70 }: KPICardProps) {
    const isPositive = growth?.startsWith('+');

    const colorGradients = {
        blue: 'from-blue-500 to-indigo-600',
        purple: 'from-purple-500 to-indigo-600',
        green: 'from-emerald-500 to-teal-600',
        orange: 'from-orange-500 to-amber-600',
        red: 'from-red-500 to-rose-600',
    };

    return (
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2 uppercase tracking-wide">{title}</h3>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300">
                        {value}
                    </div>
                </div>
                {growth && (
                    <div className={`
                        flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-full transition-all duration-200
                        ${isPositive ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}
                        group-hover:scale-110
                    `}>
                        {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 mr-1 animate-pulse-slow" />
                        ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 mr-1 animate-pulse-slow" />
                        )}
                        {growth}
                    </div>
                )}
            </div>

            <div className="mt-4 sm:mt-5">
                <ProgressBar value={progressValue} color={color} />
            </div>
        </div>
    );
}
