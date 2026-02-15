import { Layers, Eye, Edit, Trash2 } from 'lucide-react';

interface AccountRowProps {
    id: string;
    email: string;
    status: string;
    verified: boolean;
    protocol?: string;
    provider?: string;
    sentToday: number;
    dailyLimit: number;
    lastUsed?: string;
    className?: string; // for the background highlight
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export default function AccountRow({
    id,
    email,
    status,
    verified,
    protocol,
    provider,
    sentToday,
    dailyLimit,
    lastUsed,
    className = '',
    onDelete,
    onEdit
}: AccountRowProps) {
    if (!email) return null;
    return (
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 px-6 border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors ${className}`}>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-800">{email}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.toLowerCase() === 'active'
                        ? 'text-green-600 bg-green-50 border-green-100'
                        : 'text-gray-500 bg-gray-50 border-gray-100'
                        }`}>
                        {status}
                    </span>
                    {verified && (
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            Verified
                        </span>
                    )}
                    {provider && (
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                            {provider}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4 mt-1.5">
                    {protocol && (
                        <>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Layers className="w-3 h-3" />
                                {protocol}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        </>
                    )}
                    <span className="text-xs text-gray-400">
                        {sentToday}{dailyLimit > 0 ? `/${dailyLimit}` : ''} sent today
                    </span>
                    {lastUsed && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-xs text-gray-400">
                                Last used: {new Date(lastUsed).toLocaleDateString()}
                            </span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                    onClick={() => onEdit?.(id)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                    <Edit className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete?.(id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
