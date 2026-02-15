'use client';

import { useMapping } from '@/context/MappingContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen } = useMapping();

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[260px]' : 'ml-0'}`}>
                <Header />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
