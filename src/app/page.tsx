'use client';

import { useState, useEffect, useMemo } from 'react';
import KPICard from '@/components/KPICard';
import { ChevronDown } from 'lucide-react';
import { useCampaign } from '@/context/CampaignContext';

export default function Home() {
  const { savedCampaigns, metrics, subscribers } = useCampaign();
  const [mounted, setMounted] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Last 30 days');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMetrics = useMemo(() => {
    if (!mounted) return metrics;

    const now = new Date();
    let days = 30;
    if (timeFilter === 'Last 7 days') days = 7;

    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const filtered = savedCampaigns.filter(c => new Date(c.createdAt) >= cutoff && c.status === 'Completed');

    const totalSent = filtered.reduce((acc, c) => acc + c.sent, 0);
    const totalOpens = filtered.reduce((acc, c) => acc + c.opens, 0);
    const totalClicks = filtered.reduce((acc, c) => acc + c.clicks, 0);
    const totalBounces = filtered.reduce((acc, c) => acc + c.bounces, 0);
    const totalRevenue = filtered.reduce((acc, c) => acc + c.revenue, 0);

    return {
      totalCampaigns: savedCampaigns.filter(c => new Date(c.createdAt) >= cutoff).length,
      totalRevenue,
      avgOpenRate: totalSent > 0 ? (totalOpens / totalSent) * 100 : 0,
      avgClickRate: totalSent > 0 ? (totalClicks / totalSent) * 100 : 0,
      bounceRate: totalSent > 0 ? (totalBounces / totalSent) * 100 : 0,
    };
  }, [savedCampaigns, metrics, timeFilter, mounted]);

  const kpiData = [
    { title: "Total Campaigns", value: filteredMetrics.totalCampaigns.toString(), color: "blue", progress: filteredMetrics.totalCampaigns > 0 ? 100 : 0 },
    { title: "Active Subscribers", value: subscribers.toLocaleString(), color: "purple", progress: subscribers > 0 ? 100 : 0 },
    { title: "Avg Open Rate", value: `${filteredMetrics.avgOpenRate.toFixed(1)}%`, color: "green", progress: filteredMetrics.avgOpenRate },
    { title: "Avg Click Rate", value: `${filteredMetrics.avgClickRate.toFixed(1)}%`, color: "orange", progress: filteredMetrics.avgClickRate * 5 }, // Scaled progress for clicks
    { title: "Revenue Generated", value: `$${filteredMetrics.totalRevenue.toLocaleString()}`, color: "green", progress: filteredMetrics.totalRevenue > 0 ? 100 : 0 },
    { title: "Bounce Rate", value: `${filteredMetrics.bounceRate.toFixed(1)}%`, color: "red", progress: filteredMetrics.bounceRate * 10 }, // Scaled for bounce
  ] as const;

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Title Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6">
        <div className="animate-slide-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2">Welcome back! Here's your performance summary</p>
          <div className="flex items-center mt-3 sm:mt-4">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 mr-2 animate-pulse-slow shadow-lg shadow-green-500/50"></span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">All systems operational</span>
          </div>
        </div>

        {/* Mini KPI stats */}
        <div className="flex flex-wrap gap-3 sm:gap-4 w-full lg:w-auto animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center min-w-[100px] sm:min-w-[120px] hover:shadow-md hover:scale-105 transition-all duration-300">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Campaigns</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1.5">{filteredMetrics.totalCampaigns}</span>
          </div>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center min-w-[100px] sm:min-w-[120px] hover:shadow-md hover:scale-105 transition-all duration-300">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Subscribers</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1.5">{(subscribers / 1000).toFixed(1)}K</span>
          </div>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center min-w-[100px] sm:min-w-[120px] hover:shadow-md hover:scale-105 transition-all duration-300">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Open Rate</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1.5">{filteredMetrics.avgOpenRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Performance Overview Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Performance Overview</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1.5">Track your email marketing metrics in real-time</p>
        </div>
        <div className="relative group w-full sm:w-auto">
          <button
            suppressHydrationWarning
            className="flex items-center justify-between w-full sm:w-auto px-4 py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
          >
            <span>{timeFilter}</span>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="p-2 space-y-1">
              {['Last 7 days', 'Last 30 days', 'All time'].map(filter => (
                <button
                  key={filter}
                  suppressHydrationWarning
                  onClick={() => setTimeFilter(filter)}
                  className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${timeFilter === filter ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <KPICard
              title={kpi.title}
              value={kpi.value}
              color={kpi.color}
              progressValue={kpi.progress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
