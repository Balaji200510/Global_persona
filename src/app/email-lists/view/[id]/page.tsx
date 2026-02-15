'use client';

import { useMapping } from '@/context/MappingContext';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, UserPlus, Filter, Download, Plus, ChevronRight, LayoutGrid, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import ContactsTable from '@/components/ContactsTable';

export default function ContactDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { emailLists } = useMapping();

    const listId = params.id as string;
    const currentList = emailLists.find(l => l.id === listId);

    if (!currentList) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-10">
                <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">List Not Found</h3>
                <p className="text-gray-500 text-sm mt-1 mb-6">The email list you're looking for doesn't exist or has been deleted.</p>
                <Link href="/email-lists">
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                        Go Back to Lists
                    </button>
                </Link>
            </div>
        );
    }

    const summaryCards = [
        { label: 'Active', value: currentList.validContacts ?? 0, icon: CheckCircle2, color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600' },
        { label: 'Unsubscribed', value: currentList.unsubscribeCount ?? 0, icon: AlertTriangle, color: 'amber', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
        { label: 'Bounced', value: currentList.bounceCount ?? 0, icon: XCircle, color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-600' },
        { label: 'Total Contacts', value: currentList.contactCount, icon: Users, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    ];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Link href="/email-lists" className="hover:text-indigo-600 transition-colors">Email Lists</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900">{currentList.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">Contact Details</h1>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                            {currentList.contactCount} Contacts
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Complete contact database with all {Object.keys(currentList.mappings).length} fields
                    </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-indigo-300 transition-all">
                        Create Segment
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-indigo-300 transition-all">
                        Start Campaign
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all">
                        <Plus className="w-3.5 h-3.5" /> Add Contact
                    </button>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        Contact List
                        <span className="text-xs font-medium text-gray-400">(Showing all contacts)</span>
                    </h2>
                </div>
                <ContactsTable data={currentList.data} mappings={currentList.mappings} />
            </div>

            {/* Bottom Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
                            <p className="text-2xl font-black text-gray-900">{card.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${card.bgColor} ${card.textColor}`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
