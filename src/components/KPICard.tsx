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

    // We keep text color separate from progress bar color logic if needed, but here they align.
    // Actually, 'growth' color is purely based on positive/negative.
    // 'ProgressBar' color is based on the 'color' prop.

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100/50 hover:shadow-md hover:border-indigo-50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
                    <div className="text-2xl font-bold text-gray-800 tracking-tight">{value}</div>
                </div>
                {growth && (
                    <div className={`
                        flex items-center text-xs font-semibold px-2 py-1 rounded-full 
                        ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}
                    `}>
                        {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {growth}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <ProgressBar value={progressValue} color={color} />
            </div>
        </div>
    );
}
