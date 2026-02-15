'use client';

import { ChevronDown, Users } from 'lucide-react';
import { useMapping } from '@/context/MappingContext';

interface AudienceSelectDropdownProps {
    value: string;
    onChange: (id: string) => void;
}

export default function AudienceSelectDropdown({ value, onChange }: AudienceSelectDropdownProps) {
    const { emailLists } = useMapping();

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Target Audience</label>
            <div className="relative group">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full appearance-none bg-white border rounded-xl px-4 py-3.5 text-sm text-gray-700 outline-none transition-all cursor-pointer group-hover:border-indigo-200
                        ${value
                            ? 'border-indigo-100 ring-2 ring-indigo-50'
                            : 'border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400'}
                    `}
                >
                    <option value="" disabled>Select an email list</option>
                    {emailLists.length > 0 ? (
                        emailLists.map((list) => (
                            <option key={list.id} value={list.id} className="py-2">
                                {list.name} ({list.contactCount.toLocaleString()} contacts)
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No lists available. Please upload one first.</option>
                    )}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2 text-gray-400 group-hover:text-indigo-500 transition-colors">
                    <Users className="w-4 h-4" />
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Choose the audience you want to target with this campaign</p>
        </div>
    );
}
