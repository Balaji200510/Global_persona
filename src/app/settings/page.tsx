'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import {
    User,
    Bell,
    Shield,
    Database,
    Mail,
    Globe,
    Save,
    Trash2
} from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const { showNotification, showConfirm } = useNotification();
    const [mounted, setMounted] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        bio: ''
    });

    // Load saved profile data from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('persona_profile_settings');
        if (saved) {
            try {
                setProfileData(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading profile settings:', error);
            }
        }
        setMounted(true);
    }, []);

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'billing', name: 'Billing & Usage', icon: Database },
        { id: 'connections', name: 'Connections', icon: Globe },
    ];

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Platform Settings</h1>
                <p className="text-gray-500 font-medium mt-1">Manage your account preferences and global configurations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 translate-x-1'
                                        : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                        <div className="p-10 border-b border-gray-50 bg-gray-50/30">
                            <h2 className="text-xl font-black text-gray-900 capitalize">{activeTab} Settings</h2>
                            <p className="text-sm text-gray-500 font-medium mt-1">Configure your {activeTab} information and preferences.</p>
                        </div>

                        <div className="p-10 flex-1 space-y-8">
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 pb-8 border-b border-gray-50">
                                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl border-4 border-white">
                                            A
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                                                Change Avatar
                                            </button>
                                            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Recommended: 400x400px</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileData.fullName}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                                                placeholder="Enter your full name"
                                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-300 dark:focus:border-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="Enter your email address"
                                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-300 dark:focus:border-blue-600 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 lg:col-span-2">
                                            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Bio</label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-300 dark:focus:border-blue-600 outline-none transition-all h-32 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab !== 'profile' && (
                                <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300">
                                        <Save className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 border-none uppercase tracking-tighter">{activeTab} Configuration</h3>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto">This section is currently under development. Settings will be available soon.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-10 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <button 
                                onClick={() => {
                                    showConfirm(
                                        'Are you sure you want to deactivate your account? This action cannot be undone.',
                                        () => {
                                            showNotification('Account deactivation feature coming soon', 'info');
                                        }
                                    );
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" /> Deactivate Account
                            </button>
                            <button 
                                onClick={() => {
                                    // Save to localStorage for persistence
                                    localStorage.setItem('persona_profile_settings', JSON.stringify(profileData));
                                    showNotification('Settings saved successfully', 'success');
                                }}
                                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-100"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
