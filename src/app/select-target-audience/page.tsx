'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCampaign } from '@/context/CampaignContext';
import { useMapping } from '@/context/MappingContext';
import {
    Users,
    Search,
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    User,
    Briefcase,
    Building2,
    Mail
} from 'lucide-react';

export default function SelectTargetAudiencePage() {
    const router = useRouter();
    const { campaignData, setCampaignData } = useCampaign();
    const { emailLists } = useMapping();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Get contacts from the selected email list
    const contacts = useMemo(() => {
        if (!campaignData.audienceId) return [];
        
        const selectedList = emailLists.find(list => list.id === campaignData.audienceId);
        if (!selectedList || !selectedList.data || selectedList.data.length === 0) return [];

        // Transform list data into contact format
        return selectedList.data.map((row: any, index: number) => {
            // Try to find email, name, title, company fields from mappings or data
            const email = row.email || row.Email || row['email address'] || row['Email Address'] || '';
            const name = row.name || row.Name || row['full name'] || row['Full Name'] || row['contact name'] || 'Unknown';
            const title = row.title || row.Title || row['job title'] || row['Job Title'] || row.position || '';
            const company = row.company || row.Company || row['company name'] || row['Company Name'] || row.organization || '';

            return {
                id: `${selectedList.id}-${index}`,
                name: name || 'Unknown Contact',
                title: title || 'N/A',
                company: company || 'N/A',
                email: email || `contact${index + 1}@example.com`
            };
        }).filter((contact: any) => contact.email); // Only include contacts with email
    }, [campaignData.audienceId, emailLists]);

    useEffect(() => {
        // Hydrate from context if already selected
        if (campaignData.selectedContacts.length > 0) {
            setSelectedIds(campaignData.selectedContacts.map(c => c.id));
        }
    }, [campaignData.selectedContacts]);

    const toggleContact = (contact: typeof contacts[0]) => {
        if (selectedIds.includes(contact.id)) {
            setSelectedIds(prev => prev.filter(id => id !== contact.id));
        } else {
            setSelectedIds(prev => [...prev, contact.id]);
        }
    };

    const handleContinue = () => {
        const selectedContacts = contacts.filter(c => selectedIds.includes(c.id));
        setCampaignData(prev => ({
            ...prev,
            selectedContacts
        }));
        router.push('/email-campaigns/create/ai-preview');
    };

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFD] px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition-all font-medium mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Strategy Review
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 leading-tight">Select Target Audience</h1>
                                <p className="text-gray-500 font-medium">Select contacts to target for this campaign.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="px-5 py-2.5 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Selected Contacts</span>
                            <span className="text-xl font-black text-indigo-600">{selectedIds.length}</span>
                        </div>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, company or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Showing {filteredContacts.length} Contacts</span>
                    </div>
                </div>

                {/* Contacts Table */}
                {contacts.length === 0 ? (
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-indigo-50/20 p-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No Contacts Available</h3>
                        <p className="text-gray-500 text-sm">Please select an email list with contacts first, or upload a list with contact data.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-indigo-50/20 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                                        <th className="px-8 py-5 w-20">Select</th>
                                        <th className="px-6 py-5">Contact Name</th>
                                        <th className="px-6 py-5">Job Title</th>
                                        <th className="px-6 py-5">Company</th>
                                        <th className="px-6 py-5">Email Address</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredContacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        onClick={() => toggleContact(contact)}
                                        className={`group cursor-pointer transition-colors hover:bg-indigo-50/30 ${selectedIds.includes(contact.id) ? 'bg-indigo-50/50' : ''}`}
                                    >
                                        <td className="px-8 py-5">
                                            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center
                                                ${selectedIds.includes(contact.id)
                                                    ? 'bg-indigo-600 border-indigo-600 scale-110 shadow-lg shadow-indigo-100'
                                                    : 'bg-white border-gray-200 group-hover:border-indigo-300'}
                                            `}>
                                                {selectedIds.includes(contact.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{contact.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-3.5 h-3.5 text-gray-300" />
                                                {contact.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-indigo-600/70">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-3.5 h-3.5 text-indigo-200" />
                                                {contact.company}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-gray-200" />
                                                {contact.email}
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Selection:</span>
                        <div className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-black text-white shadow-lg shadow-indigo-100">
                            {selectedIds.length} CONTACTS
                        </div>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={selectedIds.length === 0}
                        className={`flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-black transition-all shadow-xl active:scale-95
                            ${selectedIds.length > 0
                                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}
                        `}
                    >
                        Continue with {selectedIds.length} Contacts <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
