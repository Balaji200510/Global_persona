import { FileText } from 'lucide-react';

interface FileInfoCardProps {
    fileName: string;
    fileSize: number;
    rowCount: number;
    columnCount: number;
    fieldCount: number;
}

export default function FileInfoCard({ fileName, fileSize, rowCount, columnCount, fieldCount }: FileInfoCardProps) {
    const formattedSize = fileSize ? (fileSize / 1024).toFixed(1) + ' KB' : '0 KB';

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{fileName || 'No file selected'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{formattedSize} • {rowCount} Rows • {columnCount} Columns</p>
                </div>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                {fieldCount} Fields Available
            </span>
        </div>
    );
}
