import { Check, ChevronDown } from 'lucide-react';

interface MappingRowProps {
    field: string;
    required?: boolean;
    mappedColumn: string;
    options: string[];
    isHighlighted?: boolean;
    onMappingChange: (value: string) => void;
}

export default function MappingRow({ field, required, mappedColumn, options, isHighlighted, onMappingChange }: MappingRowProps) {
    return (
        <div className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-none transition-colors ${isHighlighted ? 'bg-green-50/40' : 'hover:bg-gray-50'}`}>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">{field}</span>
                    {required && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-100">
                            Required
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 w-1/2 justify-end">
                <div className="relative w-full max-w-[240px]">
                    <select
                        suppressHydrationWarning
                        className={`w-full appearance-none pl-4 pr-10 py-2.5 bg-white border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer shadow-sm
              ${isHighlighted ? 'border-green-300 ring-4 ring-green-50' : 'border-gray-200'}
            `}
                        value={mappedColumn}
                        onChange={(e) => onMappingChange(e.target.value)}
                    >
                        <option value="">Select Column...</option>
                        {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${mappedColumn ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-300'}`}>
                    <Check className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
