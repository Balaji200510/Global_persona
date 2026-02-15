
interface StatPillProps {
    label: string;
    value: string;
    subtext?: string;
    tooltip?: string;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'amber' | 'indigo';
}

export default function StatPill({ label, value, subtext, tooltip, color }: StatPillProps) {
    const colorMap = {
        blue: 'bg-blue-50/80 border-blue-100',
        purple: 'bg-purple-50/80 border-purple-100',
        green: 'bg-emerald-50/80 border-emerald-100',
        orange: 'bg-orange-50/80 border-orange-100',
        amber: 'bg-amber-50/80 border-amber-100',
        indigo: 'bg-indigo-50/80 border-indigo-100',
    };

    return (
        <div
            className={`p-4 rounded-xl shadow-sm border ${colorMap[color]} flex flex-col justify-center min-w-[140px] flex-1 cursor-help transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            title={tooltip}
        >
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 opacity-80">{label}</h3>
            <div className="text-xl font-bold text-gray-800">{value}</div>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">{subtext}</p>
        </div>
    );
}
