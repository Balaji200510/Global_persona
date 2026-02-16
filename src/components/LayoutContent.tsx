'use client';

import { useMapping } from '@/context/MappingContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen } = useMapping();

    return (
        <div className="flex min-h-screen transition-colors duration-300">
            <Sidebar />
            {/* On desktop (lg), apply margin when sidebar is open. On mobile, sidebar overlays, so no margin needed */}
            <div 
                suppressHydrationWarning
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[260px]' : ''}`}
            >
                <Header />
                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
