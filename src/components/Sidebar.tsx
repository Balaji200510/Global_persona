'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Mail,
    Send,
    BarChart2,
    Settings,
    LogOut,
    ChevronLeft,
    X
} from 'lucide-react';
import { useMapping } from '@/context/MappingContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useMapping();

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Email Lists', href: '/email-lists', icon: Users },
        { name: 'Email Accounts', href: '/email-accounts', icon: Mail },
        { name: 'Email Campaigns', href: '/email-campaigns', icon: Send },
        { name: 'Analytics', href: '/analytics', icon: BarChart2 },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            />

            <aside
                className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out z-50 w-[260px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header/Logo Section */}
                <div
                    className="h-20 flex items-center px-6 justify-between border-b border-gray-50 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900 shrink-0">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-800 dark:text-gray-100 tracking-tight">Persona</span>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200'}`} />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section / Logout */}
                <div className="p-4 border-t border-gray-50 dark:border-gray-700">
                    <button
                        suppressHydrationWarning
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group`}
                    >
                        <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-600 dark:group-hover:text-red-400" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
