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
    <div className="space-y-8">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back</p>
          <div className="flex items-center mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">All systems operational</span>
          </div>
        </div>

        {/* Mini KPI stats */}
        <div className="flex gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Campaigns</span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{filteredMetrics.totalCampaigns}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Subscribers</span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{(subscribers / 1000).toFixed(1)}K</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Open Rate</span>
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">{filteredMetrics.avgOpenRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Performance Overview Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Performance Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Track your email marketing metrics in real-time</p>
        </div>
        <div className="relative group">
          <button
            suppressHydrationWarning
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:border-indigo-200 dark:hover:border-indigo-500 transition-colors shadow-sm"
          >
            {timeFilter}
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2 space-y-1">
              {['Last 7 days', 'Last 30 days', 'All time'].map(filter => (
                <button
                  key={filter}
                  suppressHydrationWarning
                  onClick={() => setTimeFilter(filter)}
                  className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${timeFilter === filter ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            color={kpi.color}
            progressValue={kpi.progress}
          />
        ))}
      </div>
    </div>
  );
}
