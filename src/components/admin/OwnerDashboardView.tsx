import React, { useState, useEffect } from "react";
import { useOwnerAuth } from "../../context/OwnerAuthContext";
import { useSap } from "../../context/SapContext";
import {
  Users,
  GraduationCap,
  Mail,
  ShieldCheck,
  RefreshCw,
  LogOut,
  Search,
  Calendar,
  Activity,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  Inbox,
  UserCheck
} from "lucide-react";

interface RegisteredUserItem {
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
}

interface TelemetrySummary {
  activeUsersNow: number;
  totalSessions: number;
  totalPageViews: number;
  totalQuizAttempts: number;
  totalScenarioCompletions: number;
}

export const OwnerDashboardView: React.FC = () => {
  const { logoutOwner, fetchWithAuth } = useOwnerAuth();
  const { setCurrentView } = useSap();

  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUserItem[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetrySummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("ALL");

  const loadUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch registered users list
      const usersRes = await fetchWithAuth("/api/admin/users");
      if (usersRes.ok) {
        const usersJson = await usersRes.json();
        if (Array.isArray(usersJson.users)) {
          setRegisteredUsers(usersJson.users);
        }
      }

      // 2. Fetch active session summary
      const analyticsRes = await fetchWithAuth("/api/admin/analytics");
      if (analyticsRes.ok) {
        const analyticsJson = await analyticsRes.json();
        if (analyticsJson && analyticsJson.summary) {
          setTelemetry(analyticsJson.summary);
        }
      }

      setLoading(false);
    } catch {
      setError("Unable to connect to database. Please check your network.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadUserData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter users by search query and level
  const filteredUsers = registeredUsers.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesLevel = levelFilter === "ALL" || (u.learningLevel || "BEGINNER").toUpperCase() === levelFilter;
    return matchesSearch && matchesLevel;
  });

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
                <span>LIVE USER DATABASE</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              LEARNER SIGN-IN DIRECTORY & ACCOUNTS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-time directory of every student and professional who has registered and signed in to the TagSkills SAP platform.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadUserData}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center space-x-2 border border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Directory</span>
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
          <button onClick={loadUserData} className="underline font-bold hover:opacity-80">
            Retry Connection
          </button>
        </div>
      )}

      {/* Primary KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Registered Learners */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Signed-In Learners</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {registeredUsers.length}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Verified learner accounts</p>
        </div>

        {/* Active Learners Now */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Active Learners Now</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {telemetry ? telemetry.activeUsersNow : 0}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Studying in last 5 minutes</p>
        </div>

        {/* Total Sign-In Sessions */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Sign-In Sessions</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {telemetry ? telemetry.totalSessions : 0}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Learning sessions opened</p>
        </div>

        {/* Total Quiz Attempts */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Quizzes Completed</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
            {telemetry ? telemetry.totalQuizAttempts : 0}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Submitted assessments</p>
        </div>

      </div>

      {/* Main Registered Learners Directory Table Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Registered Accounts ({registeredUsers.length})
            </h2>
            <p className="text-xs text-slate-400">
              Learners who signed up via the Sign Up portal
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="ALL">All Learning Levels</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="PROFESSIONAL">Professional</option>
              <option value="CONSULTANT">Consultant</option>
              <option value="INTERVIEW">Interview Prep</option>
            </select>
          </div>
        </div>

        {/* Learners Table */}
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono">
                  <th className="pb-3 font-bold">Learner Name</th>
                  <th className="pb-3 font-bold">Email Address</th>
                  <th className="pb-3 font-bold">Registration Date</th>
                  <th className="pb-3 font-bold">Last Sign-In</th>
                  <th className="pb-3 font-bold">Learning Level</th>
                  <th className="pb-3 font-bold">Industry Focus</th>
                  <th className="pb-3 font-bold text-right">Labs Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="py-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    
                    {/* Name */}
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-xs font-black flex items-center justify-center shadow-sm">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{u.name}</div>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">{u.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 text-slate-600 dark:text-slate-300 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="py-3.5 text-slate-400 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Last Sign-In */}
                    <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>
                          {new Date(u.lastLoginAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {u.learningLevel || "BEGINNER"}
                      </span>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      {u.selectedIndustry || "Automotive"}
                    </td>

                    {/* Completed Labs */}
                    <td className="py-3.5 font-mono font-black text-right text-slate-900 dark:text-white">
                      {u.completedLabsCount}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-slate-200/50 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                {registeredUsers.length === 0 ? "No Registered Learners Yet" : "No Matching Learners"}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {registeredUsers.length === 0
                  ? "When students and professionals create accounts on the website, their names, email addresses, sign-in timestamps, and learning progress will appear here."
                  : "No registered accounts match your current search or filter criteria."}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Footer Return Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          ← Return to Learning Dashboard
        </button>

        <span className="text-[11px] font-mono text-slate-400">
          Owner Portal • TagSkills Academy
        </span>
      </div>

    </div>
  );
};
