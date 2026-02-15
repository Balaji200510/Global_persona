interface MappingStatusCardProps {
    fieldCount?: number;
    totalFields?: number;
    requiredComplete?: boolean;
    totalRows?: number;
    percentage?: number;
}

export default function MappingStatusCard({
    fieldCount = 0,
    totalFields = 13,
    requiredComplete = false,
    totalRows = 0,
    percentage = 0
}: MappingStatusCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Mapping Status</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Fields Mapped</span>
                    <span className="text-sm font-bold text-gray-800">{fieldCount} of {totalFields}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Required Fields</span>
                    {requiredComplete ? (
                        <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Complete</span>
                    ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Incomplete</span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Total Rows</span>
                    <span className="text-sm font-bold text-gray-800">{totalRows}</span>
                </div>
                <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Progress</span>
                        <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
