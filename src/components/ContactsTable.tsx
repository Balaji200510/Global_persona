'use client';

import { CheckCircle2, MoreVertical, Search, Filter } from 'lucide-react';

interface ContactsTableProps {
    data: any[];
    mappings: Record<string, string>;
}

export default function ContactsTable({ data, mappings }: ContactsTableProps) {
    // Determine table headers based on mappings or raw keys
    const internalKeys = [
        { label: 'Email Address', key: 'email' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Job Title', key: 'job_title' },
        { label: 'Company', key: 'company' },
        { label: 'Website', key: 'website_url' },
        { label: 'Phone', key: 'phone_number' },
        { label: 'Address', key: 'address' },
        { label: 'City', key: 'city_name' },
        { label: 'State', key: 'state_name' },
        { label: 'Country', key: 'country_code' },
    ];

    const getCSVValue = (row: any, internalKey: string) => {
        const csvHeader = mappings[internalKey];
        return csvHeader ? row[csvHeader] : "—";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-indigo-300 transition-all">
                        <Filter className="w-3.5 h-3.5" /> Filters
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                        <tr className="bg-gray-50/50">
                            {internalKeys.map(k => (
                                <th key={k.key} className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{k.label}</th>
                            ))}
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                {internalKeys.map(k => (
                                    <td key={k.key} className="px-6 py-4">
                                        {k.key === 'email' ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                                                    {getCSVValue(row, 'email')?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate max-w-[150px]">
                                                    {getCSVValue(row, 'email')}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className={`text-sm ${k.key === 'company' || k.key === 'website_url' ? 'text-indigo-600 font-medium hover:underline cursor-pointer' : 'text-gray-600'}`}>
                                                {getCSVValue(row, k.key)}
                                            </span>
                                        )}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-green-100">
                                        Verified
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold text-gray-400">
                <p>SHOWING {data.length} OF {data.length} CONTACTS</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:border-indigo-300 transition-all disabled:opacity-50" disabled>PREVIOUS</button>
                    <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:border-indigo-300 transition-all disabled:opacity-50" disabled>NEXT</button>
                </div>
            </div>
        </div>
    );
}
