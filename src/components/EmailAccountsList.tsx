'use client';

import EmailAccountCard from './EmailAccountCard';

const accounts = [
    {
        email: "madhu.k@globopersona.com",
        type: "SMTP/IMAP" as const,
        status: "Active" as const,
        verified: true,
        info: "0/100 sent today",
    },
    {
        email: "test@globopersona.com",
        type: "SMTP/IMAP" as const,
        status: "Active" as const,
        verified: true,
        info: "0/100 sent today",
    },
    {
        email: "kotlamadhu0614@gmail.com",
        type: "Gmail OAuth" as const,
        status: "Active" as const,
        verified: true,
        info: "Last used: 9/15/2025",
    }
];

export default function EmailAccountsList() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Email Accounts</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your configured email accounts</p>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full border border-purple-100">
                    {accounts.length} accounts
                </span>
            </div>

            <div className="grid gap-4">
                {accounts.map((account, index) => (
                    <EmailAccountCard
                        key={account.email}
                        {...account}
                        isFirst={index === 0}
                    />
                ))}
            </div>
        </div>
    );
}
