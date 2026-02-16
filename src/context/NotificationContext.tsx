'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextType {
    showNotification: (message: string, type?: NotificationType) => void;
    showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
    showPrompt: (message: string, placeholder: string, onConfirm: (value: string) => void, onCancel?: () => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void; onCancel?: () => void } | null>(null);
    const [promptDialog, setPromptDialog] = useState<{ message: string; placeholder: string; onConfirm: (value: string) => void; onCancel?: () => void } | null>(null);
    const [promptValue, setPromptValue] = useState('');

    const showNotification = (message: string, type: NotificationType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    const showConfirm = (message: string, onConfirm: () => void, onCancel?: () => void) => {
        setConfirmDialog({ message, onConfirm, onCancel });
    };

    const showPrompt = (message: string, placeholder: string, onConfirm: (value: string) => void, onCancel?: () => void) => {
        setPromptValue('');
        setPromptDialog({ message, placeholder, onConfirm, onCancel });
    };

    const handleConfirm = () => {
        if (confirmDialog) {
            confirmDialog.onConfirm();
            setConfirmDialog(null);
        }
    };

    const handleCancel = () => {
        if (confirmDialog?.onCancel) {
            confirmDialog.onCancel();
        }
        setConfirmDialog(null);
    };

    const handlePromptConfirm = () => {
        if (promptDialog) {
            promptDialog.onConfirm(promptValue);
            setPromptDialog(null);
            setPromptValue('');
        }
    };

    const handlePromptCancel = () => {
        if (promptDialog?.onCancel) {
            promptDialog.onCancel();
        }
        setPromptDialog(null);
        setPromptValue('');
    };

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5" />;
            case 'error':
                return <XCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'error':
                return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'warning':
                return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
            default:
                return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification, showConfirm, showPrompt }}>
            {children}
            
            {/* Notifications */}
            <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-fade-in ${getStyles(notification.type)}`}
                    >
                        {getIcon(notification.type)}
                        <p className="flex-1 text-sm font-medium">{notification.message}</p>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 hover:opacity-70 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirm Dialog */}
            {confirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 animate-scale-in">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Confirm Action</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{confirmDialog.message}</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Prompt Dialog */}
            {promptDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 animate-scale-in">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Enter Information</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{promptDialog.message}</p>
                        <input
                            type="text"
                            value={promptValue}
                            onChange={(e) => setPromptValue(e.target.value)}
                            placeholder={promptDialog.placeholder}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handlePromptConfirm();
                                } else if (e.key === 'Escape') {
                                    handlePromptCancel();
                                }
                            }}
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={handlePromptCancel}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePromptConfirm}
                                disabled={!promptValue.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

