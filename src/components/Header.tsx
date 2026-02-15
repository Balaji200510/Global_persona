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
        <header className="flex h-20 items-center justify-between px-8 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
            {/* Left: Toggle & Search */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    suppressHydrationWarning
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg w-72 lg:w-96 border border-gray-100 dark:border-gray-600 hover:border-indigo-100 dark:hover:border-indigo-500 transition-colors">
                    <Search className="w-5 h-5 mr-3" />
                    <input
                        type="text"
                        suppressHydrationWarning
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 dark:placeholder-gray-500 text-gray-700 dark:text-gray-200"
                    />
                </div>
            </div>

            {/* Right: Actions & Theme Toggle */}
            <div className="flex items-center gap-6">
                <button
                    type="button"
                    suppressHydrationWarning
                    className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
                </button>

                <button
                    type="button"
                    suppressHydrationWarning
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block"
                >
                    <Settings className="w-5 h-5" />
                </button>

                <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    suppressHydrationWarning
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                    aria-label="Toggle theme"
                >
                    {mounted && theme === 'dark' ? (
                        <Sun className="w-5 h-5" />
                    ) : (
                        <Moon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </header>
    );
}
