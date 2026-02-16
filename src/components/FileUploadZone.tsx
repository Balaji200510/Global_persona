'use client';

import { useState } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

interface FileUploadZoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
}

export default function FileUploadZone({ onFileSelect, selectedFile }: FileUploadZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const { showNotification } = useNotification();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                onFileSelect(file);
                showNotification('CSV file uploaded successfully', 'success');
            } else {
                showNotification('Please upload a CSV file', 'error');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-gray-50/50
        ${isDragOver ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300'}
        ${selectedFile ? 'border-indigo-500 bg-indigo-50/10' : ''}
      `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
        >
            <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
            />

            {selectedFile ? (
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                        <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                        Uploaded Successfully
                    </p>
                </div>
            ) : (
                <>
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                        <Upload className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Click to upload</h3>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop your CSV file</p>
                    <div className="flex gap-3 mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Secure</span>
                        <span>•</span>
                        <span>Max 10MB</span>
                        <span>•</span>
                        <span>CSV only</span>
                    </div>
                </>
            )}
        </div>
    );
}
