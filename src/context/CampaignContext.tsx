'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface CampaignData {
    name: string;
    audienceId: string;
    audienceName: string;
    approach: string;
    step1Completed: boolean;
    step2Completed: boolean;
    aiStrategyInput: string;
    aiGeneratedContent: string;
    businessInfo: string;
    productDetails: string;
    painPoints: string;
    selectedContacts: Array<{
        id: string;
        name: string;
        title: string;
        company: string;
        email: string;
    }>;
    generatedPitches: Array<{
        id: string;
        contactId: string;
        subject: string;
        body: string;
        status: 'pending' | 'approved' | 'rejected';
    }>;
}

export interface SavedCampaign {
    id: string;
    name: string;
    status: 'Draft' | 'Completed' | 'Rejected';
    isAIPersonalized: boolean;
    recipients: number;
    sent: number;
    opens: number;
    clicks: number;
    bounces: number;
    revenue: number;
    createdAt: string;
}

interface Metrics {
    totalCampaigns: number;
    totalSent: number;
    totalOpens: number;
    totalClicks: number;
    totalBounces: number;
    totalRevenue: number;
    avgOpenRate: number;
    avgClickRate: number;
    bounceRate: number;
}

interface CampaignContextType {
    campaignData: CampaignData;
    setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
    savedCampaigns: SavedCampaign[];
    subscribers: number;
    metrics: Metrics;
    addCampaign: (campaign: SavedCampaign) => void;
    updateCampaignStatus: (id: string, status: 'Completed' | 'Rejected') => void;
    resetCampaign: () => void;
}

const defaultData: CampaignData = {
    name: '',
    audienceId: '',
    audienceName: '',
    approach: 'ai',
    step1Completed: false,
    step2Completed: false,
    aiStrategyInput: '',
    aiGeneratedContent: '',
    businessInfo: '',
    productDetails: '',
    painPoints: '',
    selectedContacts: [],
    generatedPitches: [],
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
    const [campaignData, setCampaignData] = useState<CampaignData>(defaultData);
    const [savedCampaigns, setSavedCampaigns] = useState<SavedCampaign[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('persona_saved_campaigns');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                // Ensure all loaded campaigns have an ID and valid structure
                const sanitized = data.map((c: any, idx: number) => ({
                    ...c,
                    id: c.id || `legacy-${idx}-${Date.now()}`,
                    // Ensure all required fields exist
                    name: c.name || 'Unnamed Campaign',
                    status: c.status || 'Draft',
                    isAIPersonalized: c.isAIPersonalized || false,
                    recipients: c.recipients || 0,
                    sent: c.sent || 0,
                    opens: c.opens || 0,
                    clicks: c.clicks || 0,
                    bounces: c.bounces || 0,
                    revenue: c.revenue || 0,
                    createdAt: c.createdAt || new Date().toISOString()
                }));
                setSavedCampaigns(sanitized);
            } catch (error) {
                // If parsing fails, start with empty state
                console.error('Error parsing saved campaigns:', error);
                setSavedCampaigns([]);
            }
        } else {
            // No stored data - start with empty state
            setSavedCampaigns([]);
        }

        const storedDraft = localStorage.getItem('persona_campaign_draft');
        if (storedDraft) {
            try {
                setCampaignData(JSON.parse(storedDraft));
            } catch (error) {
                console.error('Error parsing campaign draft:', error);
            }
        }

        setIsHydrated(true);
    }, []);

    // Persist to localStorage whenever savedCampaigns or campaignData changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('persona_saved_campaigns', JSON.stringify(savedCampaigns));
            localStorage.setItem('persona_campaign_draft', JSON.stringify(campaignData));
        }
    }, [savedCampaigns, campaignData, isHydrated]);

    const metrics = useMemo(() => {
        const completed = savedCampaigns.filter(c => c.status === 'Completed');
        const totalSent = completed.reduce((acc, c) => acc + (c.sent || 0), 0);
        const totalOpens = completed.reduce((acc, c) => acc + (c.opens || 0), 0);
        const totalClicks = completed.reduce((acc, c) => acc + (c.clicks || 0), 0);
        const totalBounces = completed.reduce((acc, c) => acc + (c.bounces || 0), 0);
        const totalRevenue = completed.reduce((acc, c) => acc + (c.revenue || 0), 0);

        return {
            totalCampaigns: savedCampaigns.length,
            totalSent,
            totalOpens,
            totalClicks,
            totalBounces,
            totalRevenue,
            avgOpenRate: totalSent > 0 ? (totalOpens / totalSent) * 100 : 0,
            avgClickRate: totalSent > 0 ? (totalClicks / totalSent) * 100 : 0,
            bounceRate: totalSent > 0 ? (totalBounces / totalSent) * 100 : 0,
        };
    }, [savedCampaigns]);

    // Calculate subscribers dynamically from completed campaigns
    const subscribers = useMemo(() => {
        return savedCampaigns
            .filter(c => c.status === 'Completed')
            .reduce((acc, c) => acc + (c.recipients || 0), 0);
    }, [savedCampaigns]);

    const addCampaign = (campaign: SavedCampaign) => {
        // Ensure campaign has all required fields
        const sanitizedCampaign: SavedCampaign = {
            id: campaign.id || Math.random().toString(36).substr(2, 9),
            name: campaign.name || 'Unnamed Campaign',
            status: campaign.status || 'Draft',
            isAIPersonalized: campaign.isAIPersonalized || false,
            recipients: campaign.recipients || 0,
            sent: campaign.sent || 0,
            opens: campaign.opens || 0,
            clicks: campaign.clicks || 0,
            bounces: campaign.bounces || 0,
            revenue: campaign.revenue || 0,
            createdAt: campaign.createdAt || new Date().toISOString()
        };
        setSavedCampaigns(prev => [sanitizedCampaign, ...prev]);
    };

    const updateCampaignStatus = (id: string, status: 'Completed' | 'Rejected') => {
        setSavedCampaigns(prev => prev.map(c =>
            c.id === id ? { ...c, status } : c
        ));
    };

    const resetCampaign = () => {
        setCampaignData(defaultData);
    };

    return (
        <CampaignContext.Provider value={{
            campaignData,
            setCampaignData,
            savedCampaigns,
            subscribers,
            metrics,
            addCampaign,
            updateCampaignStatus,
            resetCampaign
        }}>
            {children}
        </CampaignContext.Provider>
    );
}

export function useCampaign() {
    const context = useContext(CampaignContext);
    if (context === undefined) {
        throw new Error('useCampaign must be used within a CampaignProvider');
    }
    return context;
}
