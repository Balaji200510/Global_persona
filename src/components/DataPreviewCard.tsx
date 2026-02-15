interface DataPreviewCardProps {
    data: any;
    additionalFieldsCount?: number;
}

export default function DataPreviewCard({ data, additionalFieldsCount = 0 }: DataPreviewCardProps) {
    // This component will show a preview of mapped data. 
    // In a real scenario, this would use the `mappings` to keys from `data`.
    // For now, let's just try to fuzzy match or show what we have if the keys match the expected fields.
    // Or simpler: Just iterate the first N keys of the data if mappings aren't passed, but the requirement says "Sample of mapped contact data".
    // Since we don't pass mappings here yet, let's assume we want to show values from the CSV row that *might* correspond.

    // Better approach: Pass mappings to this card too? Or just dump the first row?
    // Requirement: "Display FIRST ROW values from CSV" matching specific fields.

    const displayFields = [
        "Email", "First Name", "Last Name", "Title", "Company", "Website"
    ];

    // Simple heuristic to find value
    const findValue = (fieldPart: string) => {
        if (!data) return "—";
        const key = Object.keys(data).find(k => k.toLowerCase().replace(/_/g, ' ').includes(fieldPart.toLowerCase()));
        return key ? data[key] : "—";
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">Data Preview</h2>
            <p className="text-xs text-gray-500 mb-2">Sample of mapped contact data</p>

            <div className="space-y-3">
                {displayFields.map((field, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-none">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24">{field}</span>
                        <span className="text-sm font-medium text-gray-800 flex-1 text-right truncate">
                            {findValue(field)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                <span className="text-xs font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer flex items-center justify-center gap-1">
                    + {additionalFieldsCount} more fields
                </span>
            </div>
        </div>
    );
}
