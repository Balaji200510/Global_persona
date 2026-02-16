
interface ListCardProps {
    title: string;
    description: string;
    validContacts: number;
    openRate: string;
    status: 'active' | 'inactive';
    quality: 'good' | 'average' | 'poor';
}

export default function ListCard({ title, description, validContacts, openRate, status, quality }: ListCardProps) {
    const statusColor = status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500';
    const qualityColor = quality === 'good' ? 'bg-blue-100 text-blue-700' : quality === 'average' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100/60 overflow-hidden hover:shadow-md transition-all group relative">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-600 via-blue-600 to-slate-700"></div>

            <div className="p-6 pt-8">
                {/* Header Badges */}
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${statusColor}`}>
                        {status}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${qualityColor}`}>
                        {quality}
                    </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
                <p className="text-xs text-gray-400 mb-6 line-clamp-2 min-h-[2.5em]">{description}</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <span className="block text-[10px] uppercase text-gray-400 font-semibold mb-0.5">Valid Contacts</span>
                        <span className="text-lg font-bold text-gray-700">{validContacts}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <span className="block text-[10px] uppercase text-gray-400 font-semibold mb-0.5">Open Rate</span>
                        <span className="text-lg font-bold text-gray-700">{openRate}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Area */}
            <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-xs font-medium text-gray-500">
                <span>{validContacts} Valid</span>
                {/* Placeholder for actions or date if needed, matching 'Bottom: Valid count' requirement */}
            </div>
        </div>
    );
}
