interface ProgressBarProps {
    value: number;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
    className?: string;
}

export default function ProgressBar({ value, color }: ProgressBarProps) {
    const colorGradients = {
        blue: 'bg-gradient-to-r from-blue-600 via-blue-500 to-slate-600',
        purple: 'bg-gradient-to-r from-slate-700 via-indigo-600 to-slate-700',
        green: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700',
        orange: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700',
        red: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700',
    };

    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <div className="w-full bg-gray-100 dark:bg-gray-700/50 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
            <div
                className={`h-full rounded-full ${colorGradients[color]} transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
                style={{ width: `${clampedValue}%` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
        </div>
    );
}
