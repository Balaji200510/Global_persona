'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EmailList {
    id: string;
    name: string;
    description: string;
    fileName: string;
    contactCount: number;
    validContacts: number;
    bounceCount?: number;
    unsubscribeCount?: number;
    sentCount?: number;
    opens?: number;
    status?: 'Active' | 'Inactive';
    createdAt: string;
    data: any[];
    mappings: Record<string, string>;
}

interface MappingContextType {
    file: File | null;
    setFile: (file: File | null) => void;
    parsedData: any[];
    setParsedData: (data: any[]) => void;
    headers: string[];
    setHeaders: (headers: string[]) => void;
    listName: string;
    setListName: (name: string) => void;
    mappings: Record<string, string>;
    setMappings: (mappings: Record<string, string>) => void;
    emailLists: EmailList[];
    addEmailList: (list: EmailList) => void;
    deleteEmailList: (id: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
}

const MappingContext = createContext<MappingContextType | undefined>(undefined);

export function MappingProvider({ children }: { children: ReactNode }) {
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [listName, setListName] = useState('');
    const [mappings, setMappings] = useState<Record<string, string>>({});
    const [emailLists, setEmailLists] = useState<EmailList[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initial load from localStorage
    React.useEffect(() => {
        const stored = localStorage.getItem('persona_email_lists');
        if (stored) {
            setEmailLists(JSON.parse(stored));
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage
    React.useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('persona_email_lists', JSON.stringify(emailLists));
        }
    }, [emailLists, isHydrated]);

    const addEmailList = (list: EmailList) => {
        setEmailLists(prev => [list, ...prev]);
    };

    const deleteEmailList = (id: string) => {
        setEmailLists(prev => prev.filter(l => l.id !== id));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <MappingContext.Provider
            value={{
                file, setFile,
                parsedData, setParsedData,
                headers, setHeaders,
                listName, setListName,
                mappings, setMappings,
                emailLists, addEmailList,
                deleteEmailList,
                isSidebarOpen, setIsSidebarOpen,
                toggleSidebar
            }}
        >
            {children}
        </MappingContext.Provider>
    );
}

export function useMapping() {
    const context = useContext(MappingContext);
    if (context === undefined) {
        throw new Error('useMapping must be used within a MappingProvider');
    }
    return context;
}
