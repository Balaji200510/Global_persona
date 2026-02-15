import Link from 'next/link';
import { Eye, Download, Trash2, CheckCircle2, MoreVertical } from 'lucide-react';
import { EmailList } from '@/context/MappingContext';

interface EmailListCardProps {
    list: EmailList;
    onDelete: (id: string) => void;
}

export default function EmailListCard({ list, onDelete }: EmailListCardProps) {
    const openRate = list.sentCount && list.sentCount > 0 ? ((list.opens || 0) / list.sentCount) * 100 : 0;
    const progress = list.contactCount > 0 ? (list.validContacts / list.contactCount) * 100 : 0;
    const formattedDate = list.createdAt ? new Date(list.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date';
    const dynamicStatus = progress === 100 ? 'Validated' : 'Draft';

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 group hover:shadow-xl hover:shadow-indigo-50/50 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border flex items-center gap-1.5 transition-colors ${dynamicStatus === 'Validated' ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-gray-500 bg-gray-50 border-gray-100'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dynamicStatus === 'Validated' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span> {dynamicStatus}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{list.name}</h3>
                <p className="text-xs text-gray-400 truncate">{list.description || 'No description provided'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2">
                <div className="space-y-1 group/stat cursor-help" title="Percentage of contacts that have been verified as active and reachable.">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover/stat:text-indigo-500 transition-colors">Valid Contacts</p>
                    <p className="text-lg font-black text-gray-800 tracking-tight">{list.validContacts.toLocaleString()}</p>
                </div>
                <div className="space-y-1 group/stat cursor-help" title="The ratio of unique opens to the total number of emails successfully delivered.">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover/stat:text-indigo-500 transition-colors">Open Rate</p>
                    <p className="text-lg font-black text-gray-800 tracking-tight">{openRate.toFixed(1)}%</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400 font-mono">
                    <span>VALIDATION PROGRESS</span>
                    <span className={progress === 100 ? 'text-green-600' : 'text-amber-600'}>{progress.toFixed(0)}% VALID</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[10px] text-gray-400 font-medium">{list.fileName || 'Unknown file'} • {formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <Link href={`/email-lists/view/${list.id}`} className="flex-1">
                    <button className="w-full py-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-gray-100/50">
                        <Eye className="w-3.5 h-3.5" /> View
                    </button>
                </Link>
                <div className="flex gap-2">
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg transition-all border border-gray-100/50">
                        <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => onDelete(list.id)}
                        className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all border border-gray-100/50"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
