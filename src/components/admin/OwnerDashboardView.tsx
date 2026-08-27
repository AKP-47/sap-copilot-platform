import React, { useState, useEffect } from "react";
import { useOwnerAuth } from "../../context/OwnerAuthContext";
import { useSap } from "../../context/SapContext";
import {
  Users,
  GraduationCap,
  Mail,
  Eye,
  Activity,
  Award,
  Globe,
  Layers,
  HelpCircle,
  Laptop,
  Smartphone,
  Tablet,
  Search,
  RefreshCw,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  Inbox
} from "lucide-react";

interface RealOwnerAnalyticsData {
  isLive: boolean;
  totalEventsTracked: number;
  summary: {
    totalVisitors: number;
    activeUsersNow: number;
    totalSessions: number;
    totalPageViews: number;
    totalScenarioCompletions: number;
    totalQuizAttempts: number;
    avgQuizScore: number | null;
    copilotQueriesCount: number;
  };
  visitorTrends: Array<{
    date: string;
    visitors: number;
    pageViews: number;
    labCompletions: number;
  }>;
  moduleEngagements: Array<{
    moduleId: string;
    name: string;
    activeLearners: number;
    views: number;
    category: string;
  }>;
  industryUsage: Array<{
    industryId: string;
    industryName: string;
    selectionCount: number;
    percentage: number;
  }>;
  deviceBreakdown: Array<{
    deviceType: "Desktop" | "Mobile" | "Tablet";
    count: number;
    percentage: number;
  }>;
  browserBreakdown: Array<{
    browser: string;
    count: number;
    percentage: number;
  }>;
  topSearches: Array<{
    query: string;
    count: number;
  }>;
  recentActivity: Array<{
    id: string;
    timestamp: string;
    eventType: string;
    description: string;
    userBadge: string;
    learningLevel: string;
  }>;
  visitorList: Array<{
    id: string;
    name: string;
    device: string;
    city: string;
    country: string;
    firstSeen: string;
    lastActive: string;
    level: string;
    completedLabs: number;
    eventsCount: number;
  }>;
}

export const OwnerDashboardView: React.FC = () => {
  const { logoutOwner, fetchWithAuth, ownerUser } = useOwnerAuth();
  const { setCurrentView } = useSap();

  const [data, setData] = useState<RealOwnerAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    lastLoginAt: string;
    learningLevel?: string;
    selectedIndustry?: string;
    completedLabsCount: number;
    quizzesTakenCount: number;
    avgQuizScore: number | null;
  }>>([]);

  const [activeTab, setActiveTab] = useState<
    "overview" | "registered_users" | "modules" | "industries" | "searches" | "devices" | "live_feed" | "visitors"
  >("overview");

  const loadRealAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/api/admin/analytics");
      if (res.ok) {
        const json = await res.json();
        if (json && json.summary) {
          setData(json);
          // Also fetch registered users
          try {
            const usersRes = await fetchWithAuth("/api/admin/users");
            if (usersRes.ok) {
              const usersJson = await usersRes.json();
              if (Array.isArray(usersJson.users)) {
                setRegisteredUsers(usersJson.users);
              }
            }
          } catch (e) {
            console.warn("Registered users fetch error:", e);
          }
          setLoading(false);
          return;
        }
      }
      throw new Error("Unable to fetch telemetry from server.");
    } catch {
      setError("Analytics temporarily unavailable. Please verify backend connection.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealAnalytics();
    // Auto-refresh telemetry every 30 seconds
    const interval = setInterval(() => {
      loadRealAnalytics();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview & Trends", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "registered_users", label: `Registered Learners (${registeredUsers.length})`, icon: <GraduationCap className="w-4 h-4" /> },
    { id: "modules", label: "Module Views", icon: <Layers className="w-4 h-4" /> },
    { id: "industries", label: "Industries", icon: <Globe className="w-4 h-4" /> },
    { id: "searches", label: "Searches", icon: <Search className="w-4 h-4" /> },
    { id: "devices", label: "Devices & Tech", icon: <Laptop className="w-4 h-4" /> },
    { id: "live_feed", label: "Live Activity", icon: <Activity className="w-4 h-4" /> },
    { id: "visitors", label: "Visitor Telemetry", icon: <Users className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>RESTRICTED OWNER PORTAL</span>
              </span>

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>DATA SOURCE: LIVE PRODUCTION TELEMETRY</span>
              </span>

              {data && (
                <span className="text-xs font-mono text-slate-400">
                  ({data.totalEventsTracked} real events recorded)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              EDUCATION INTELLIGENCE & VISITOR ANALYTICS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Live, real-time analytics generated exclusively by actual users on the deployed TagSkills platform.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadRealAnalytics}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center space-x-2 border border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Telemetry</span>
            </button>

            <button
              onClick={logoutOwner}
              className="px-4 py-2.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-all flex items-center space-x-2 border border-rose-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadRealAnalytics} className="underline font-bold hover:opacity-80">
            Retry Connection
          </button>
        </div>
      )}

      {/* Primary KPI Grid (Pure Real Data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Unique Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {data ? data.summary.totalVisitors.toLocaleString() : "0"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Distinct visitor devices</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Active Now</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {data ? data.summary.activeUsersNow : "0"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Active in last 5 minutes</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Page Views</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {data ? data.summary.totalPageViews.toLocaleString() : "0"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Actual page impressions</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Quiz Attempts</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
            {data ? data.summary.totalQuizAttempts.toLocaleString() : "0"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            {data && data.summary.avgQuizScore !== null ? `Avg Score: ${data.summary.avgQuizScore}%` : "No quiz data yet"}
          </p>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? "bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 shadow-md"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">

        {/* 1. OVERVIEW & TRENDS */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">14-Day Visitor Trend</h3>
                  <p className="text-xs text-slate-400">Daily unique visitors recorded by telemetry</p>
                </div>
              </div>

              {data && data.visitorTrends.some(t => t.pageViews > 0 || t.visitors > 0) ? (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 items-end h-44 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                    {data.visitorTrends.map((t, idx) => {
                      const maxVisitors = Math.max(...data.visitorTrends.map(v => v.visitors), 1);
                      const heightPct = Math.max(8, Math.round((t.visitors / maxVisitors) * 100));
                      return (
                        <div key={idx} className="flex flex-col items-center h-full justify-end group">
                          <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                            {t.visitors}
                          </div>
                          <div
                            style={{ height: `${heightPct}%` }}
                            className="w-full max-w-[20px] rounded-t-lg bg-amber-400 group-hover:bg-amber-500 transition-all"
                          />
                          <span className="text-[9px] font-mono text-slate-400 truncate w-full text-center mt-2">
                            {t.date.split(" ")[1] || t.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                  <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Visitor Data Yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Daily trend charts will be automatically plotted here as real visitors interact with the deployed platform.
                  </p>
                </div>
              )}
            </div>

            {/* Engagement Summary */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Platform Engagement</h3>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Total Sessions</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {data ? data.summary.totalSessions : 0}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Scenarios Completed</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {data ? data.summary.totalScenarioCompletions : 0}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">AI Copilot Queries</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {data ? data.summary.copilotQueriesCount : 0}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 1.5 REGISTERED LEARNERS TAB */}
        {activeTab === "registered_users" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Registered Learners</h3>
                <p className="text-xs text-slate-400">Official student accounts registered on TagSkills SAP Copilot</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-500 border border-amber-400/30">
                Total: {registeredUsers.length}
              </span>
            </div>

            {registeredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="pb-3 font-bold">Learner Name</th>
                      <th className="pb-3 font-bold">Email Address</th>
                      <th className="pb-3 font-bold">Registered</th>
                      <th className="pb-3 font-bold">Learning Level</th>
                      <th className="pb-3 font-bold">Industry Focus</th>
                      <th className="pb-3 font-bold text-right">Completed Labs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {registeredUsers.map((u) => (
                      <tr key={u.id} className="py-2.5">
                        <td className="py-3 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span>{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-600 dark:text-slate-300 font-mono">{u.email}</td>
                        <td className="py-3 text-slate-400 font-mono">
                          {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                            {u.learningLevel || "BEGINNER"}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600 dark:text-slate-300">{u.selectedIndustry || "Automotive"}</td>
                        <td className="py-3 font-mono font-bold text-right text-slate-900 dark:text-white">
                          {u.completedLabsCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Registered Learners Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When learners create accounts via the Sign Up form, their registered details, level, and progress will appear here in real-time.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. MODULE ENGAGEMENTS */}
        {activeTab === "modules" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Module Views & Study Engagement</h3>
            
            {data && data.moduleEngagements.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.moduleEngagements.map((mod, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mod.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{mod.moduleId}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">{mod.views} views</span>
                      <p className="text-[10px] text-slate-400">{mod.activeLearners} learners</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <Layers className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Module Views Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Learning modules and simulators will be automatically cataloged and ranked here as learners study them.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. INDUSTRIES */}
        {activeTab === "industries" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Selected Industry Sectors</h3>
            
            {data && data.industryUsage.length > 0 ? (
              <div className="space-y-3">
                {data.industryUsage.map((ind, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-900 dark:text-white">{ind.industryName}</span>
                      <span className="text-amber-500">{ind.selectionCount} selections ({ind.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-750 overflow-hidden">
                      <div style={{ width: `${ind.percentage}%` }} className="h-full bg-amber-400 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <Globe className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Industry Selections Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Industry preferences (Automotive, Pharma, Retail, Aerospace, etc.) will appear here when selected by learners.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 4. SEARCHES */}
        {activeTab === "searches" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Search Queries</h3>
            
            {data && data.topSearches.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.topSearches.map((s, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">"{s.query}"</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-500">{s.count} searches</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <Search className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Search Queries Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Real terms searched in the header search bar (e.g. "101", "POSC", "MM01", "OBYC") will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 5. DEVICES & BROWSERS */}
        {activeTab === "devices" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Device Breakdown</h3>
              
              {data && data.deviceBreakdown.some(d => d.count > 0) ? (
                <div className="space-y-3">
                  {data.deviceBreakdown.map((dev, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-white">
                        {dev.deviceType === "Mobile" ? <Smartphone className="w-4 h-4 text-slate-400" /> : dev.deviceType === "Tablet" ? <Tablet className="w-4 h-4 text-slate-400" /> : <Laptop className="w-4 h-4 text-slate-400" />}
                        <span>{dev.deviceType}</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        {dev.count} ({dev.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center space-y-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                  <Laptop className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-400">No device telemetry recorded yet.</p>
                </div>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Browser Breakdown</h3>
              
              {data && data.browserBreakdown.length > 0 ? (
                <div className="space-y-3">
                  {data.browserBreakdown.map((br, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{br.browser}</span>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        {br.count} ({br.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center space-y-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                  <Globe className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-400">No browser telemetry recorded yet.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 6. LIVE ACTIVITY FEED */}
        {activeTab === "live_feed" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Real-Time Activity Stream</h3>
              <span className="text-xs text-slate-400 font-mono">Latest recorded events</span>
            </div>

            {data && data.recentActivity.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.recentActivity.map((act) => (
                  <div key={act.id} className="py-3.5 flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div className="flex-1 space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{act.description}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                        <span>{act.userBadge}</span>
                        <span>•</span>
                        <span>Level: {act.learningLevel}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <Activity className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Recent Activity</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Live activity will stream here in real-time as users open lessons, attempt quizzes, and run simulations.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 7. VISITOR TELEMETRY */}
        {activeTab === "visitors" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Unique Visitor Telemetry</h3>
            
            {data && data.visitorList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                      <th className="pb-3 font-bold">Visitor ID / Name</th>
                      <th className="pb-3 font-bold">Device & Browser</th>
                      <th className="pb-3 font-bold">First Seen</th>
                      <th className="pb-3 font-bold">Last Active</th>
                      <th className="pb-3 font-bold">Level</th>
                      <th className="pb-3 font-bold text-right">Labs Completed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.visitorList.map((v) => (
                      <tr key={v.id} className="py-2.5">
                        <td className="py-3 font-bold text-slate-900 dark:text-white">
                          <div>{v.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{v.id}</div>
                        </td>
                        <td className="py-3 text-slate-600 dark:text-slate-300">{v.device}</td>
                        <td className="py-3 text-slate-400 font-mono">{v.firstSeen}</td>
                        <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">{v.lastActive}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {v.level}
                          </span>
                        </td>
                        <td className="py-3 font-mono font-bold text-right text-slate-900 dark:text-white">
                          {v.completedLabs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
                <Users className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Visitor Telemetry Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Visitor sessions will appear here as users access the platform.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
