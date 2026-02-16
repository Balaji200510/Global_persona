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
            {/* Overlay - shows when sidebar is open on mobile/tablet */}
            <div
                suppressHydrationWarning
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    } lg:hidden`}
                onClick={toggleSidebar}
            />

            <aside
                suppressHydrationWarning
                className={`fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col transition-all duration-300 ease-in-out z-50 w-[260px] sm:w-[280px] shadow-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header/Logo Section */}
                <div
                    className="h-16 sm:h-20 flex items-center px-4 sm:px-6 justify-between border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 via-blue-600 to-slate-800 dark:from-slate-600 dark:via-blue-500 dark:to-slate-700 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 shrink-0 animate-scale-in">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl text-gray-800 dark:text-gray-100 tracking-tight">Persona</span>
                    </div>
                    <button
                        suppressHydrationWarning
                        onClick={toggleSidebar}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-4 sm:py-6 px-3 sm:px-4 space-y-1.5 sm:space-y-2 overflow-y-auto overflow-x-hidden">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                    // Close sidebar on mobile/tablet when clicking nav items
                                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 group animate-fade-in ${isActive
                                    ? 'bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'text-blue-700 dark:text-blue-400 scale-110' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-200 group-hover:scale-110'}`} />
                                <span className="truncate text-sm sm:text-base">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section / Logout */}
                <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                        suppressHydrationWarning
                        onClick={() => {
                            // Close sidebar on mobile/tablet when clicking logout
                            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                setIsSidebarOpen(false);
                            }
                        }}
                        className={`flex items-center gap-3 w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]`}
                    >
                        <LogOut className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1" />
                        <span className="font-medium text-sm sm:text-base">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
