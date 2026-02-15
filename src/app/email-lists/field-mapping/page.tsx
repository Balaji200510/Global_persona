'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import FileInfoCard from '@/components/FileInfoCard';
import MappingStatusCard from '@/components/MappingStatusCard';
import DataPreviewCard from '@/components/DataPreviewCard';
import MappingRow from '@/components/MappingRow';
import MappingProgressBar from '@/components/MappingProgressBar';
import { useMapping } from '@/context/MappingContext';

// Define the required fields structure for this page
const REQUIRED_FIELDS = [
    { field: 'Email Address', key: 'email', required: true },
    { field: 'First Name', key: 'first_name', required: false },
    { field: 'Last Name', key: 'last_name', required: false },
    { field: 'Company', key: 'company', required: false },
    { field: 'Title', key: 'job_title', required: false },
    { field: 'Website', key: 'website_url', required: false },
    { field: 'Phone', key: 'phone_number', required: false },
    { field: 'Address', key: 'address', required: false },
    { field: 'City', key: 'city_name', required: false },
    { field: 'State', key: 'state_name', required: false },
    { field: 'Zip Code', key: 'zip_code', required: false },
    { field: 'Country', key: 'country_code', required: false },
    { field: 'Industry', key: 'industry', required: false },
];

import { useRouter } from 'next/navigation';

export default function FieldMappingPage() {
    const router = useRouter();
    const {
        file,
        parsedData,
        headers,
        mappings,
        setMappings,
        listName,
        addEmailList
    } = useMapping();

    const handleCreateList = () => {
        if (!mappings['email']) return;

        const newList = {
            id: Math.random().toString(36).substr(2, 9),
            name: listName || "Untitled List",
            description: "Imported CSV data",
            fileName: file?.name || "unknown.csv",
            contactCount: parsedData.length,
            validContacts: parsedData.length,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            data: parsedData,
            mappings: mappings
        };
        addEmailList(newList);
        router.push('/email-lists');
    };

    // Initialize auto-mapping on load if headers exist
    useEffect(() => {
        if (headers.length > 0 && Object.keys(mappings).length === 0) {
            const newMappings: Record<string, string> = {};
            REQUIRED_FIELDS.forEach(reqField => {
                // Try to find a header that matches
                const contentMatch = headers.find(h =>
                    h.toLowerCase().replace(/_/g, '').includes(reqField.key.replace(/_/g, '')) ||
                    h.toLowerCase() === reqField.field.toLowerCase()
                );
                if (contentMatch) {
                    newMappings[reqField.key] = contentMatch;
                }
            });
            setMappings(newMappings);
        }
    }, [headers]);

    const handleMappingChange = (fieldKey: string, matchedHeader: string) => {
        setMappings({
            ...mappings,
            [fieldKey]: matchedHeader
        });
    };

    // Derived State
    const mappedCount = Object.keys(mappings).length;
    const totalFields = REQUIRED_FIELDS.length; // Or "13" as per mockup if strict
    const totalRows = parsedData.length;
    const progressPercentage = Math.round((mappedCount / totalFields) * 100);
    const requiredMapped = mappings['email'] ? true : false;

    // For Preview: Update data preview based on mappings if possible, 
    // but the simplified DataPreviewCard just takes a raw row for now.
    // Ideally we transform the first row based on `mappings` to show "Mapped" view.
    // Let's create `previewData` by picking keys from the first row using the map.
    const rawPreviewRow = parsedData[0] || {};
    // Actually, DataPreviewCard currently does a fuzzy match on key names. 
    // Let's improve DataPreviewCard to take the MAPPED values if we pass mappings, or raw if not.
    // For exact mockup match "Display FIRST ROW values from CSV", passing raw row + mapping logic inside card or transforming here is key.
    // Let's pass a transformed object to DataPreviewCard where keys are the specific display fields.

    const previewData: any = {};
    if (parsedData.length > 0) {
        // This creates an object where keys are like "Email", "First Name" and values are from the CSV row
        // But DataPreviewCard expects data to have keys matching "Email Address", etc.
        // Let's just pass the raw row for now as that's what the previous step set up to suffice "fuzzy match". 
        // But to be precise: The preview card should show what we HAVE mapped.
        // If "First Name" is mapped to "fname_col", preview should show `row["fname_col"]`.

        const displayMap = {
            "Email": "email",
            "First Name": "first_name",
            "Last Name": "last_name",
            "Title": "job_title",
            "Company": "company",
            "Website": "website_url"
        };

        Object.entries(displayMap).forEach(([displayName, internalKey]) => {
            const csvCol = mappings[internalKey];
            if (csvCol) {
                previewData[displayName] = rawPreviewRow[csvCol]; // Use mapped column
            } else {
                previewData[displayName] = "—";
            }
        });
    }


    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Top Header Section */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                        <Link href="/email-lists/upload" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                            <ArrowLeft className="w-3 h-3" /> Back to Upload
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Field Mapping</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {totalRows} rows • {headers.length} columns • {REQUIRED_FIELDS.length} contact fields
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <Link href="/" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Dashboard</Link>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step 2 of 2</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar just below header */}
            <MappingProgressBar percentage={progressPercentage} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Main Section */}
                <div className="lg:col-span-2 space-y-6">
                    <FileInfoCard
                        fileName={file?.name || "No File"}
                        fileSize={file?.size || 0}
                        rowCount={totalRows}
                        columnCount={headers.length}
                        fieldCount={headers.length} // Available fields
                    />

                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Map CSV Columns to Contact Fields</h2>
                        <p className="text-sm text-gray-500 mt-1">Connect each CSV column to the appropriate contact field. Smart auto-mapping has been applied.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {REQUIRED_FIELDS.map((req, idx) => (
                            <MappingRow
                                key={req.key}
                                field={req.field}
                                required={req.required}
                                mappedColumn={mappings[req.key] || ''}
                                options={headers}
                                isHighlighted={idx === 0} // Highlight first row
                                onMappingChange={(val) => handleMappingChange(req.key, val)}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleCreateList}
                            className={`px-8 py-3 font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5
                                ${requiredMapped ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                            `}
                            disabled={!requiredMapped}
                        >
                            Create Email List &rarr;
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Card 1: Status */}
                    <MappingStatusCard
                        fieldCount={mappedCount}
                        totalFields={totalFields}
                        requiredComplete={requiredMapped}
                        totalRows={totalRows}
                        percentage={progressPercentage}
                    />

                    {/* Card 2: Data Preview */}
                    <DataPreviewCard
                        data={previewData}
                        additionalFieldsCount={Math.max(0, mappedCount - 6)}
                    />
                </div>
            </div>
        </div>
    );
}
