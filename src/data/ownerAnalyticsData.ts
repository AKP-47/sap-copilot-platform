// Private Education Intelligence Analytics Store for Website Owner

export interface AnalyticsSummary {
  totalVisitors: number;
  activeUsersNow: number;
  registeredUsers: number;
  returningUsers: number;
  totalScenarioCompletions: number;
  totalQuizAttempts: number;
  avgSessionDurationMinutes: number;
  copilotQueriesCount: number;
}

export interface VisitorTrend {
  date: string;
  visitors: number;
  pageViews: number;
  labCompletions: number;
}

export interface ModuleEngagement {
  moduleId: string;
  name: string;
  activeLearners: number;
  completionRate: number;
  avgTimeSpentMin: number;
  category: "MM" | "EWM" | "INTEGRATION" | "SIMULATOR" | "CONSULTANT";
}

export interface IndustryUsageMetric {
  industryId: string;
  industryName: string;
  selectionCount: number;
  percentage: number;
  icon: string;
}

export interface DeviceAnalytics {
  deviceType: "Desktop" | "Mobile" | "Tablet";
  percentage: number;
  count: number;
}

export interface BrowserAnalytics {
  browser: string;
  percentage: number;
}

export interface RecentActivityItem {
  id: string;
  timestamp: string;
  eventType: "SCENARIO_COMPLETED" | "QUIZ_SUBMITTED" | "SIMULATOR_LAUNCHED" | "COPILOT_QUERY" | "LEVEL_CHANGED";
  description: string;
  userBadge: string;
  industryContext: string;
  learningLevel: string;
}

export interface VisitorRecord {
  id: string;
  city: string;
  country: string;
  device: string;
  firstSeen: string;
  lastActive: string;
  level: string;
  completedLabs: number;
}

export function getFallbackOwnerAnalyticsData() {
  const summary: AnalyticsSummary = {
    totalVisitors: 14820,
    activeUsersNow: 47,
    registeredUsers: 3940,
    returningUsers: 9680,
    totalScenarioCompletions: 18450,
    totalQuizAttempts: 32600,
    avgSessionDurationMinutes: 28.5,
    copilotQueriesCount: 14230
  };

  const visitorTrends: VisitorTrend[] = [
    { date: "Aug 14", visitors: 940, pageViews: 4200, labCompletions: 620 },
    { date: "Aug 15", visitors: 980, pageViews: 4500, labCompletions: 680 },
    { date: "Aug 16", visitors: 1050, pageViews: 4900, labCompletions: 740 },
    { date: "Aug 17", visitors: 1120, pageViews: 5200, labCompletions: 810 },
    { date: "Aug 18", visitors: 1080, pageViews: 5100, labCompletions: 790 },
    { date: "Aug 19", visitors: 1190, pageViews: 5600, labCompletions: 890 },
    { date: "Aug 20", visitors: 1250, pageViews: 5900, labCompletions: 940 },
    { date: "Aug 21", visitors: 1310, pageViews: 6200, labCompletions: 1020 },
    { date: "Aug 22", visitors: 1290, pageViews: 6100, labCompletions: 990 },
    { date: "Aug 23", visitors: 1380, pageViews: 6600, labCompletions: 1100 },
    { date: "Aug 24", visitors: 1450, pageViews: 7100, labCompletions: 1180 },
    { date: "Aug 25", visitors: 1520, pageViews: 7400, labCompletions: 1250 },
    { date: "Aug 26", visitors: 1610, pageViews: 7900, labCompletions: 1340 },
    { date: "Aug 27 (Today)", visitors: 890, pageViews: 4100, labCompletions: 680 }
  ];

  const moduleEngagements: ModuleEngagement[] = [
    { moduleId: "mm_p2p", name: "SAP MM Procure-to-Pay Cycle", activeLearners: 1240, completionRate: 86, avgTimeSpentMin: 45, category: "MM" },
    { moduleId: "ewm_posc", name: "SAP EWM POSC & Work Centers", activeLearners: 980, completionRate: 74, avgTimeSpentMin: 52, category: "EWM" },
    { moduleId: "business_reasoning", name: "Business -> SAP Reasoning Framework", activeLearners: 1420, completionRate: 91, avgTimeSpentMin: 38, category: "CONSULTANT" },
    { moduleId: "movement_lab", name: "Movement Type Lab (40+ Mvts)", activeLearners: 1110, completionRate: 82, avgTimeSpentMin: 34, category: "SIMULATOR" },
    { moduleId: "obyc_sim", name: "OBYC Automatic Account Determination", activeLearners: 890, completionRate: 69, avgTimeSpentMin: 48, category: "INTEGRATION" },
    { moduleId: "investigation_mode", name: "Consultant Investigation Workbench", activeLearners: 760, completionRate: 64, avgTimeSpentMin: 58, category: "CONSULTANT" },
    { moduleId: "interview_prep", name: "7-Tier Interview Prep Bank", activeLearners: 1350, completionRate: 88, avgTimeSpentMin: 42, category: "CONSULTANT" },
    { moduleId: "foundations", name: "Beginner Foundations Academy", activeLearners: 1620, completionRate: 95, avgTimeSpentMin: 30, category: "MM" }
  ];

  const industryUsage: IndustryUsageMetric[] = [
    { industryId: "automotive", industryName: "Automotive & Mobility", selectionCount: 4280, percentage: 29, icon: "🚗" },
    { industryId: "pharma", industryName: "Pharmaceuticals & Biotech", selectionCount: 3120, percentage: 21, icon: "💊" },
    { industryId: "retail", industryName: "Retail & E-Commerce", selectionCount: 2650, percentage: 18, icon: "🛍️" },
    { industryId: "food_beverage", industryName: "Food & Beverage", selectionCount: 2210, percentage: 15, icon: "🥛" },
    { industryId: "aerospace", industryName: "Aerospace & Defense", selectionCount: 1480, percentage: 10, icon: "✈️" },
    { industryId: "all_other", industryName: "Other Sectors (Chemicals, 3PL, Tech)", selectionCount: 1080, percentage: 7, icon: "🏭" }
  ];

  const deviceBreakdown: DeviceAnalytics[] = [
    { deviceType: "Desktop", percentage: 64, count: 9485 },
    { deviceType: "Mobile", percentage: 31, count: 4594 },
    { deviceType: "Tablet", percentage: 5, count: 741 }
  ];

  const browserBreakdown: BrowserAnalytics[] = [
    { browser: "Chrome", percentage: 58 },
    { browser: "Safari", percentage: 24 },
    { browser: "Edge", percentage: 12 },
    { browser: "Firefox", percentage: 6 }
  ];

  const recentActivity: RecentActivityItem[] = [
    {
      id: "act-1",
      timestamp: "2 mins ago",
      eventType: "SCENARIO_COMPLETED",
      description: "Completed Automotive Assembly Shortage (101 Quality Stock vs Unrestricted)",
      userBadge: "Learner #8942 (Bengaluru, India)",
      industryContext: "Automotive",
      learningLevel: "INTERMEDIATE"
    },
    {
      id: "act-2",
      timestamp: "5 mins ago",
      eventType: "COPILOT_QUERY",
      description: "Asked Copilot: 'Explain POSC vs LOSC storage control with high-bay rack example'",
      userBadge: "Learner #7104 (Munich, Germany)",
      industryContext: "Manufacturing",
      learningLevel: "PROFESSIONAL"
    },
    {
      id: "act-3",
      timestamp: "8 mins ago",
      eventType: "SIMULATOR_LAUNCHED",
      description: "Executed OBYC Simulation for Transaction Key BSX/WRX price variance (PRD)",
      userBadge: "Learner #9011 (Austin, USA)",
      industryContext: "Pharma",
      learningLevel: "INTERMEDIATE"
    },
    {
      id: "act-4",
      timestamp: "12 mins ago",
      eventType: "QUIZ_SUBMITTED",
      description: "Scored 100% on Beginner Foundations Academy (10/10 Correct)",
      userBadge: "Learner #9455 (London, UK)",
      industryContext: "Cross-Industry",
      learningLevel: "BEGINNER"
    },
    {
      id: "act-5",
      timestamp: "16 mins ago",
      eventType: "SCENARIO_COMPLETED",
      description: "Diagnosed Root Cause in Consultant Investigation Mode: Missing QA11 Usage Decision",
      userBadge: "Learner #6820 (Singapore)",
      industryContext: "Aerospace",
      learningLevel: "PROFESSIONAL"
    }
  ];

  const visitorList: VisitorRecord[] = [
    { id: "vis-8942", city: "Bengaluru", country: "India", device: "Desktop (Chrome)", firstSeen: "Aug 12, 2026", lastActive: "Just now", level: "INTERMEDIATE", completedLabs: 14 },
    { id: "vis-7104", city: "Munich", country: "Germany", device: "Desktop (Firefox)", firstSeen: "Aug 18, 2026", lastActive: "5m ago", level: "PROFESSIONAL", completedLabs: 22 },
    { id: "vis-9011", city: "Austin", country: "United States", device: "Desktop (Safari)", firstSeen: "Aug 22, 2026", lastActive: "8m ago", level: "INTERMEDIATE", completedLabs: 9 },
    { id: "vis-9455", city: "London", country: "United Kingdom", device: "Mobile (Safari iOS)", firstSeen: "Aug 25, 2026", lastActive: "12m ago", level: "BEGINNER", completedLabs: 4 },
    { id: "vis-6820", city: "Singapore", country: "Singapore", device: "Desktop (Chrome)", firstSeen: "Aug 10, 2026", lastActive: "16m ago", level: "PROFESSIONAL", completedLabs: 31 }
  ];

  return {
    summary,
    visitorTrends,
    moduleEngagements,
    industryUsage,
    deviceBreakdown,
    browserBreakdown,
    recentActivity,
    visitorList
  };
}
