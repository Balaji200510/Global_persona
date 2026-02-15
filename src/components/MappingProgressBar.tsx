interface MappingProgressBarProps {
    percentage: number;
}

export default function MappingProgressBar({ percentage }: MappingProgressBarProps) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}
