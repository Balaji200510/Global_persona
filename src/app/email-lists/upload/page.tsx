'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, FileText, Upload, AlertCircle } from 'lucide-react';
import FileUpload from '@/components/FileUploadZone';
import Papa from 'papaparse';
import { useMapping } from '@/context/MappingContext';

export default function UploadEmailPage() {
    const router = useRouter();
    const {
        file, setFile,
        listName, setListName,
        parsedData, setParsedData,
        headers, setHeaders,
    } = useMapping();

    // Local state for description since it's only needed here or maybe later? 
    // The prompt says "Persist CSV data", description is form data. 
    // Let's keep description local for now unless explicitly asked to persist across steps.
    const [description, setDescription] = useState('');

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setParsedData(results.data);
                if (results.meta.fields) {
                    setHeaders(results.meta.fields);
                }
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            }
        });
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                        <Link href="/email-lists" className="hover:text-indigo-600 transition-colors">Email Lists</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900">Upload Email List</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Upload Email List</h1>
                    <p className="text-sm text-gray-500 mt-1">Import contacts from CSV file</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Link href="/" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Dashboard</Link>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step 1 of 2</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section: Form & Upload */}
                <div className="lg:col-span-2 space-y-6">

                    {/* List Information Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">List Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">List Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all placeholder-gray-400"
                                    placeholder="e.g. Q1 Marketing Leads"
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm h-24 resize-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all placeholder-gray-400"
                                    placeholder="Describe the purpose of this list..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Upload CSV Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Upload CSV File</h2>
                        <FileUpload onFileSelect={handleFileSelect} selectedFile={file} />
                    </div>

                    {/* CSV Format Tips */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
                        <p className="leading-relaxed">
                            Ensure your CSV has headers in the first row. Common columns: <span className="font-semibold">Email, First Name, Last Name, Company, Title, Phone, Address, City, State, Country.</span>
                        </p>
                    </div>

                    <button
                        className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2
       ${file && listName ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-gray-300 cursor-not-allowed'}
     `}
                        disabled={!file || !listName}
                        onClick={() => router.push('/email-lists/field-mapping')}
                    >
                        Continue to Field Mapping <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>

                </div>

                {/* Right Section: Preview */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Preview</h2>
                        <p className="text-xs text-gray-400 mb-6">Live preview of your data</p>

                        <div className="flex-1 flex flex-col p-2 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 overflow-hidden">
                            {file && parsedData.length > 0 ? (
                                <div className="h-full flex flex-col">
                                    <div className="flex items-center gap-2 mb-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Selected File</p>
                                            <p className="text-xs font-bold text-gray-700 truncate">{file.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-auto bg-white rounded-lg border border-gray-100 shadow-inner">
                                        <table className="w-full text-[10px] border-collapse">
                                            <thead className="sticky top-0 bg-gray-50 z-10">
                                                <tr>
                                                    {headers.slice(0, 4).map((h: string) => (
                                                        <th key={h} className="px-3 py-2 text-left font-black text-gray-400 border-b border-gray-100 uppercase tracking-tighter truncate max-w-[80px]">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {parsedData.slice(0, 8).map((row: any, i: number) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                        {headers.slice(0, 4).map((h: string) => (
                                                            <td key={h} className="px-3 py-2 text-gray-600 border-b border-gray-50 truncate max-w-[80px]">
                                                                {row[h] || '—'}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 text-center font-medium">
                                        Showing first {Math.min(parsedData.length, 8)} rows of {parsedData.length} total
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-80">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">No data yet</h3>
                                    <p className="text-xs text-gray-500 mt-2">Upload a CSV file to see preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
