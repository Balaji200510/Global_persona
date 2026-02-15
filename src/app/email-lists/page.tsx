'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Grid, List as ListIcon, RefreshCw, Upload } from 'lucide-react';
import StatPill from '@/components/StatPill';
import EmailListCard from '@/components/EmailListCard';
import { useMapping, EmailList } from '@/context/MappingContext';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';

export default function EmailListsPage() {
    const router = useRouter();
    const { emailLists, deleteEmailList, setFile, setParsedData, setHeaders, setListName } = useMapping();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFile(file);
        setListName(file.name.replace('.csv', ''));

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setParsedData(results.data);
                if (results.meta.fields) {
                    setHeaders(results.meta.fields);
                }
                router.push('/email-lists/upload');
            },
            error: (error: any) => {
                console.error("Error parsing CSV:", error);
            }
        });
    };

    const triggerUpload = () => {
        document.getElementById('file-upload-direct')?.click();
    };

    const filteredLists = useMemo(() => {
        return emailLists.filter((list: EmailList) => {
            const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                list.fileName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All Status' || list.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [emailLists, searchQuery, statusFilter]);

    const stats = useMemo(() => {
        const totalContacts = emailLists.reduce((acc: number, curr: EmailList) => acc + (curr.contactCount || 0), 0);
        const validated = emailLists.reduce((acc: number, curr: EmailList) => acc + (curr.validContacts || 0), 0);
        const bounced = emailLists.reduce((acc: number, curr: EmailList) => acc + (curr.bounceCount || 0), 0);
        const unsubscribed = emailLists.reduce((acc: number, curr: EmailList) => acc + (curr.unsubscribeCount || 0), 0);
        const avgQuality = totalContacts > 0 ? (validated / totalContacts) * 100 : 0;

        return [
            { label: 'Total Lists', value: emailLists.length.toString(), color: 'blue' as const, tooltip: 'Total number of email lists uploaded to the platform' },
            { label: 'Total Contacts', value: totalContacts.toLocaleString(), color: 'purple' as const, tooltip: 'Combined count of all contacts across all email lists' },
            { label: 'Validated', value: validated.toLocaleString(), color: 'green' as const, tooltip: 'Number of contacts that have been verified as active and deliverable' },
            { label: 'Avg. Quality', value: `${avgQuality.toFixed(1)}%`, color: 'orange' as const, tooltip: 'Percentage of validated contacts relative to total contacts' },
            { label: 'Bounced', value: bounced.toLocaleString(), color: 'amber' as const, tooltip: 'Total number of emails that failed to deliver (hard and soft bounces)' },
            { label: 'Unsubscribed', value: unsubscribed.toLocaleString(), color: 'indigo' as const, tooltip: 'Number of contacts who have opted out of receiving emails' },
        ];
    }, [emailLists]);

    if (!mounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hidden Input for direct upload */}
            <input
                id="file-upload-direct"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileSelect}
            />

            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Email Lists</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your email marketing lists</p>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => window.location.reload()} className="flex items-center justify-center p-2.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={triggerUpload}
                        className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 gap-2 border border-transparent hover:-translate-y-0.5"
                    >
                        <Upload className="w-4 h-4" />
                        Upload Email List
                    </button>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, index) => (
                    <StatPill
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        color={stat.color}
                        tooltip={stat.tooltip}
                    />
                ))}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search email lists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:flex-none appearance-none bg-gray-50 border-none rounded-lg text-sm px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-100 outline-none transition-all cursor-pointer font-bold text-gray-700"
                    >
                        <option>All Status</option>
                        <option>Validated</option>
                        <option>Draft</option>
                    </select>

                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>

                    <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden md:block"></div>

                    <div className="flex bg-gray-50 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <ListIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            {emailLists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No email lists uploaded yet</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-6">Start by uploading your first CSV file to build your audience.</p>
                    <Link href="/email-lists/upload">
                        <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                            Upload Email List
                        </button>
                    </Link>
                </div>
            ) : filteredLists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No matching lists found</h3>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredLists.map((list) => (
                        <EmailListCard key={list.id} list={list} onDelete={deleteEmailList} />
                    ))}
                </div>
            )}
        </div>
    );
}
