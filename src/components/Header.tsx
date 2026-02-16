'use client';

import { Search, Bell, Settings, Menu, Moon, Sun } from 'lucide-react';
import { useMapping } from '@/context/MappingContext';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';

export default function Header() {
    const { setIsSidebarOpen, toggleSidebar } = useMapping();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 transition-all duration-300 shadow-sm">
            {/* Left: Toggle & Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <button
                    type="button"
                    suppressHydrationWarning
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="flex items-center text-gray-400 dark:text-gray-500 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-96 border border-gray-100 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <input
                        type="text"
                        suppressHydrationWarning
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 dark:placeholder-gray-500 text-gray-700 dark:text-gray-200"
                    />
                </div>
            </div>

            {/* Right: Actions & Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
                <button
                    type="button"
                    suppressHydrationWarning
                    className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse-slow"></span>
                </button>

                <button
                    type="button"
                    suppressHydrationWarning
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-110 active:scale-95 hidden sm:block"
                    aria-label="Settings"
                >
                    <Settings className="w-5 h-5" />
                </button>

                <div className="h-6 sm:h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1 sm:mx-2 hidden sm:block"></div>

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    suppressHydrationWarning
                    className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 active:scale-95 hover:shadow-md"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === 'dark' ? (
                        <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                        <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                </button>
            </div>
        </header>
    );
}
