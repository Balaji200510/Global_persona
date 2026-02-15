'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EmailAccount {
    id: string;
    email: string;
    status: 'active' | 'inactive';
    provider?: string;
    protocol?: string;
    isVerified: boolean;
    sentToday: number;
    dailyLimit: number;
    lastUsed?: string;
}

interface EmailAccountContextType {
    emailAccounts: EmailAccount[];
    addEmailAccount: (account: Omit<EmailAccount, 'id'>) => void;
    deleteEmailAccount: (id: string) => void;
    updateEmailAccount: (id: string, updates: Partial<EmailAccount>) => void;
}

const EmailAccountContext = createContext<EmailAccountContextType | undefined>(undefined);

export function EmailAccountProvider({ children }: { children: ReactNode }) {
    const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('persona_email_accounts');
        if (stored) {
            setEmailAccounts(JSON.parse(stored));
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('persona_email_accounts', JSON.stringify(emailAccounts));
        }
    }, [emailAccounts, isHydrated]);

    const addEmailAccount = (accountData: Omit<EmailAccount, 'id'>) => {
        const newAccount: EmailAccount = {
            ...accountData,
            id: Date.now().toString(),
        };
        setEmailAccounts(prev => [...prev, newAccount]);
    };

    const deleteEmailAccount = (id: string) => {
        setEmailAccounts(prev => prev.filter(acc => acc.id !== id));
    };

    const updateEmailAccount = (id: string, updates: Partial<EmailAccount>) => {
        setEmailAccounts(prev => prev.map(acc =>
            acc.id === id ? { ...acc, ...updates } : acc
        ));
    };

    return (
        <EmailAccountContext.Provider value={{
            emailAccounts,
            addEmailAccount,
            deleteEmailAccount,
            updateEmailAccount
        }}>
            {children}
        </EmailAccountContext.Provider>
    );
}

export function useEmailAccount() {
    const context = useContext(EmailAccountContext);
    if (context === undefined) {
        throw new Error('useEmailAccount must be used within an EmailAccountProvider');
    }
    return context;
}
