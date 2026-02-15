'use client';

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
    );
}

export function CampaignCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-3 w-2/3">
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-full" />
                </div>
                <Skeleton className="h-10 w-10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9" />
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9" />
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
            <div className="pt-6 border-t border-gray-50 flex gap-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
            </div>
        </div>
    );
}
