'use client';

import { useEmailAccount, EmailAccount } from '@/context/EmailAccountContext';
import EmailAccountCard from './EmailAccountCard';

interface EmailAccountsListProps {
    onEditClick?: (account: EmailAccount) => void;
}

export default function EmailAccountsList({ onEditClick }: EmailAccountsListProps) {
    const { emailAccounts } = useEmailAccount();

    const getAccountType = (provider?: string, protocol?: string): 'SMTP/IMAP' | 'Gmail OAuth' => {
        if (provider?.toLowerCase().includes('gmail') || protocol === 'OAuth') {
            return 'Gmail OAuth';
        }
        return 'SMTP/IMAP';
    };

    const getAccountInfo = (account: typeof emailAccounts[0]): string => {
        if (account.sentToday !== undefined && account.dailyLimit !== undefined) {
            return `${account.sentToday}/${account.dailyLimit} sent today`;
        }
        if (account.lastUsed) {
            const date = new Date(account.lastUsed);
            return `Last used: ${date.toLocaleDateString()}`;
        }
        return 'No activity';
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
                <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Email Accounts</h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">Manage your configured email accounts</p>
                </div>
                {emailAccounts.length > 0 && (
                    <span className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full border border-purple-100 dark:border-purple-800">
                        {emailAccounts.length} {emailAccounts.length === 1 ? 'account' : 'accounts'}
                    </span>
                )}
            </div>

            {emailAccounts.length > 0 ? (
                <div className="grid gap-3 sm:gap-4">
                    {emailAccounts.map((account, index) => (
                        <div
                            key={account.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <EmailAccountCard
                                email={account.email}
                                type={getAccountType(account.provider, account.protocol)}
                                status={account.status === 'active' ? 'Active' : 'Inactive'}
                                verified={account.isVerified}
                                info={getAccountInfo(account)}
                                isFirst={index === 0}
                                accountId={account.id}
                                onEdit={() => onEditClick?.(account)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No email accounts configured yet.</p>
                </div>
            )}
        </div>
    );
}
