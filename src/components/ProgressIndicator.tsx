'use client';

interface ProgressIndicatorProps {
    step: number;
    totalSteps: number;
    percentage: number;
}

export default function ProgressIndicator({ step, totalSteps, percentage }: ProgressIndicatorProps) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</p>
                    <p className="text-sm font-bold text-gray-900">Step {step} of {totalSteps}</p>
                </div>
                <p className="text-lg font-black text-blue-600">{percentage}%</p>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 to-slate-700 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
