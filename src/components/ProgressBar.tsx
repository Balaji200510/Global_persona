interface ProgressBarProps {
    value: number;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
    className?: string; // allow passing group-hover classes from parent if needed, or handle hover internally
}

export default function ProgressBar({ value, color }: ProgressBarProps) {
    const colorMap = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-emerald-500', // using emerald for vibrant green
        orange: 'bg-orange-500',
        red: 'bg-red-500',
    };

    return (
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
                className={`h-full rounded-full ${colorMap[color]} transition-all duration-1000 ease-out`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
}
