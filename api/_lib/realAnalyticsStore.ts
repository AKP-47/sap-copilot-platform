import fs from "fs";
import path from "path";

export interface RealTelemetryEvent {
  eventId: string;
  visitorId: string;
  sessionId: string;
  userName?: string;
  eventType: 
    | "PAGE_VIEW"
    | "SESSION_START"
    | "SESSION_HEARTBEAT"
    | "MODULE_VIEW"
    | "QUIZ_ATTEMPT"
    | "SCENARIO_ATTEMPT"
    | "SEARCH_QUERY"
    | "INDUSTRY_SELECT"
    | "LEVEL_SELECT"
    | "COPILOT_QUERY";
  path?: string;
  title?: string;
  metadata?: {
    moduleId?: string;
    moduleName?: string;
    quizId?: string;
    quizScore?: number;
    quizTotal?: number;
    query?: string;
    industryId?: string;
    industryName?: string;
    learningLevel?: string;
    deviceType?: "Desktop" | "Mobile" | "Tablet";
    browser?: string;
    os?: string;
    city?: string;
    country?: string;
  };
  timestamp: string;
  timestampMs: number;
}

const EVENTS_FILE_PATH = path.join(process.cwd(), ".analytics_events.json");

// In-memory array of real recorded events
let inMemoryEvents: RealTelemetryEvent[] = [];

/**
 * Load events from persistent disk storage if available
 */
function loadEventsFromDisk(): RealTelemetryEvent[] {
  try {
    if (fs.existsSync(EVENTS_FILE_PATH)) {
      const raw = fs.readFileSync(EVENTS_FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryEvents = parsed;
        return inMemoryEvents;
      }
    }
  } catch (err) {
    console.warn("Analytics store load exception:", err);
  }
  return inMemoryEvents;
}

// Initial load
loadEventsFromDisk();

/**
 * Appends a genuine telemetry event to the persistent event store
 */
export function recordRealEvent(event: Omit<RealTelemetryEvent, "eventId" | "timestamp" | "timestampMs">): RealTelemetryEvent {
  const timestampMs = Date.now();
  const timestamp = new Date(timestampMs).toISOString();
  const eventId = `evt_${timestampMs}_${Math.random().toString(36).substring(2, 9)}`;

  const fullEvent: RealTelemetryEvent = {
    ...event,
    eventId,
    timestamp,
    timestampMs,
    userName: event.userName?.trim() || "Anonymous Visitor"
  };

  inMemoryEvents.push(fullEvent);

  // Keep last 10,000 events in memory
  if (inMemoryEvents.length > 10000) {
    inMemoryEvents = inMemoryEvents.slice(-10000);
  }

  // Persist to disk
  try {
    fs.writeFileSync(EVENTS_FILE_PATH, JSON.stringify(inMemoryEvents, null, 2), "utf8");
  } catch (err) {
    console.warn("Analytics disk persist note (in-memory active):", err);
  }

  return fullEvent;
}

/**
 * Returns strictly real analytics computed exclusively from recorded events
 */
export function getRealOwnerAnalytics() {
  const events = inMemoryEvents;
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;

  // 1. Visitors & Sessions
  const uniqueVisitorIds = new Set<string>();
  const uniqueSessionIds = new Set<string>();
  const activeSessionIds = new Set<string>();
  const visitorProfiles = new Map<string, {
    id: string;
    name: string;
    firstSeen: number;
    lastActive: number;
    device: string;
    browser: string;
    city: string;
    country: string;
    level: string;
    eventsCount: number;
    completedLabs: number;
  }>();

  let totalPageViews = 0;
  let totalQuizAttempts = 0;
  let totalQuizScoreSum = 0;
  let totalQuizPossibleSum = 0;
  let totalScenarioCompletions = 0;
  let totalCopilotQueries = 0;

  // Module views map: moduleId -> { name, count, learners: Set<string> }
  const moduleMap = new Map<string, { name: string; views: number; learners: Set<string>; category: string }>();

  // Industry selections map: industryId -> { name, count }
  const industryMap = new Map<string, { name: string; count: number }>();

  // Search queries map: query -> count
  const searchMap = new Map<string, number>();

  // Device & Browser counts
  const deviceCounts = { Desktop: 0, Mobile: 0, Tablet: 0 };
  const browserCounts = new Map<string, number>();

  // Trend buckets by day (last 14 days)
  const dayBuckets = new Map<string, { visitors: Set<string>; pageViews: number; labCompletions: number }>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 24 * 60 * 60 * 1000);
    const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dayBuckets.set(key, { visitors: new Set<string>(), pageViews: 0, labCompletions: 0 });
  }

  // Process all recorded events
  for (const evt of events) {
    if (evt.visitorId) uniqueVisitorIds.add(evt.visitorId);
    if (evt.sessionId) uniqueSessionIds.add(evt.sessionId);

    // Active in last 5 minutes
    if (evt.timestampMs >= fiveMinutesAgo && evt.sessionId) {
      activeSessionIds.add(evt.sessionId);
    }

    // Visitor profile aggregation
    if (evt.visitorId) {
      const existing = visitorProfiles.get(evt.visitorId) || {
        id: evt.visitorId,
        name: evt.userName || "Anonymous Visitor",
        firstSeen: evt.timestampMs,
        lastActive: evt.timestampMs,
        device: evt.metadata?.deviceType || "Desktop",
        browser: evt.metadata?.browser || "Browser",
        city: evt.metadata?.city || "Unknown",
        country: evt.metadata?.country || "Online",
        level: evt.metadata?.learningLevel || "Beginner",
        eventsCount: 0,
        completedLabs: 0
      };

      existing.firstSeen = Math.min(existing.firstSeen, evt.timestampMs);
      existing.lastActive = Math.max(existing.lastActive, evt.timestampMs);
      if (evt.userName && evt.userName !== "Anonymous Visitor") existing.name = evt.userName;
      if (evt.metadata?.deviceType) existing.device = evt.metadata.deviceType;
      if (evt.metadata?.browser) existing.browser = evt.metadata.browser;
      if (evt.metadata?.learningLevel) existing.level = evt.metadata.learningLevel;
      if (evt.eventType === "SCENARIO_ATTEMPT" || evt.eventType === "QUIZ_ATTEMPT") existing.completedLabs++;
      existing.eventsCount++;
      visitorProfiles.set(evt.visitorId, existing);
    }

    // Daily trends
    const evtDateKey = new Date(evt.timestampMs).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const dayRecord = dayBuckets.get(evtDateKey);
    if (dayRecord) {
      if (evt.visitorId) dayRecord.visitors.add(evt.visitorId);
      if (evt.eventType === "PAGE_VIEW") dayRecord.pageViews++;
      if (evt.eventType === "SCENARIO_ATTEMPT" || evt.eventType === "QUIZ_ATTEMPT") dayRecord.labCompletions++;
    }

    // Metrics by event type
    if (evt.eventType === "PAGE_VIEW") {
      totalPageViews++;
      const dev = evt.metadata?.deviceType || "Desktop";
      if (dev in deviceCounts) deviceCounts[dev]++;
      const br = evt.metadata?.browser || "Other";
      browserCounts.set(br, (browserCounts.get(br) || 0) + 1);
    } else if (evt.eventType === "QUIZ_ATTEMPT") {
      totalQuizAttempts++;
      if (typeof evt.metadata?.quizScore === "number" && typeof evt.metadata?.quizTotal === "number" && evt.metadata.quizTotal > 0) {
        totalQuizScoreSum += evt.metadata.quizScore;
        totalQuizPossibleSum += evt.metadata.quizTotal;
      }
    } else if (evt.eventType === "SCENARIO_ATTEMPT") {
      totalScenarioCompletions++;
    } else if (evt.eventType === "COPILOT_QUERY") {
      totalCopilotQueries++;
    } else if (evt.eventType === "MODULE_VIEW") {
      const modId = evt.metadata?.moduleId || evt.path || "general";
      const modName = evt.metadata?.moduleName || evt.title || modId;
      const cur = moduleMap.get(modId) || { name: modName, views: 0, learners: new Set<string>(), category: "MM" };
      cur.views++;
      if (evt.visitorId) cur.learners.add(evt.visitorId);
      moduleMap.set(modId, cur);
    } else if (evt.eventType === "INDUSTRY_SELECT") {
      const indId = evt.metadata?.industryId || "general";
      const indName = evt.metadata?.industryName || indId;
      const cur = industryMap.get(indId) || { name: indName, count: 0 };
      cur.count++;
      industryMap.set(indId, cur);
    } else if (evt.eventType === "SEARCH_QUERY") {
      const q = evt.metadata?.query?.trim().toLowerCase();
      if (q) {
        searchMap.set(q, (searchMap.get(q) || 0) + 1);
      }
    }
  }

  // Format Daily Trends Array
  const visitorTrends = Array.from(dayBuckets.entries()).map(([date, item]) => ({
    date,
    visitors: item.visitors.size,
    pageViews: item.pageViews,
    labCompletions: item.labCompletions
  }));

  // Format Module Engagements
  const moduleEngagements = Array.from(moduleMap.entries()).map(([moduleId, val]) => ({
    moduleId,
    name: val.name,
    activeLearners: val.learners.size,
    views: val.views,
    category: val.category
  }));

  // Format Industry Usage
  const totalIndustrySelections = Array.from(industryMap.values()).reduce((sum, v) => sum + v.count, 0);
  const industryUsage = Array.from(industryMap.entries()).map(([industryId, val]) => ({
    industryId,
    industryName: val.name,
    selectionCount: val.count,
    percentage: totalIndustrySelections > 0 ? Math.round((val.count / totalIndustrySelections) * 100) : 0
  }));

  // Format Device Analytics
  const totalTrackedDevices = deviceCounts.Desktop + deviceCounts.Mobile + deviceCounts.Tablet;
  const deviceBreakdown = [
    { deviceType: "Desktop" as const, count: deviceCounts.Desktop, percentage: totalTrackedDevices > 0 ? Math.round((deviceCounts.Desktop / totalTrackedDevices) * 100) : 0 },
    { deviceType: "Mobile" as const, count: deviceCounts.Mobile, percentage: totalTrackedDevices > 0 ? Math.round((deviceCounts.Mobile / totalTrackedDevices) * 100) : 0 },
    { deviceType: "Tablet" as const, count: deviceCounts.Tablet, percentage: totalTrackedDevices > 0 ? Math.round((deviceCounts.Tablet / totalTrackedDevices) * 100) : 0 }
  ];

  // Format Browser Breakdown
  const totalTrackedBrowsers = Array.from(browserCounts.values()).reduce((a, b) => a + b, 0);
  const browserBreakdown = Array.from(browserCounts.entries()).map(([browser, count]) => ({
    browser,
    count,
    percentage: totalTrackedBrowsers > 0 ? Math.round((count / totalTrackedBrowsers) * 100) : 0
  }));

  // Format Recent Searches
  const topSearches = Array.from(searchMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  // Format Recent Activity (most recent 25 real events)
  const recentActivity = [...events].reverse().slice(0, 25).map(evt => {
    let description = "Visited page";
    if (evt.eventType === "PAGE_VIEW") description = `Viewed ${evt.title || evt.path || "page"}`;
    else if (evt.eventType === "MODULE_VIEW") description = `Opened module: ${evt.metadata?.moduleName || evt.title || evt.path}`;
    else if (evt.eventType === "QUIZ_ATTEMPT") description = `Submitted quiz: ${evt.metadata?.quizId || "Practice Assessment"} (Score: ${evt.metadata?.quizScore ?? 0}/${evt.metadata?.quizTotal ?? 0})`;
    else if (evt.eventType === "SCENARIO_ATTEMPT") description = `Attempted Scenario: ${evt.title || "Business Problem"}`;
    else if (evt.eventType === "SEARCH_QUERY") description = `Searched: "${evt.metadata?.query}"`;
    else if (evt.eventType === "INDUSTRY_SELECT") description = `Selected industry: ${evt.metadata?.industryName}`;
    else if (evt.eventType === "COPILOT_QUERY") description = `Queried AI Copilot: "${evt.metadata?.query || "Consultant explanation"}"`;
    else if (evt.eventType === "LEVEL_SELECT") description = `Selected level: ${evt.metadata?.learningLevel}`;

    const diffMinutes = Math.max(0, Math.floor((now - evt.timestampMs) / 60000));
    const timeDisplay = diffMinutes === 0 ? "Just now" : diffMinutes === 1 ? "1 min ago" : `${diffMinutes} mins ago`;

    return {
      id: evt.eventId,
      timestamp: timeDisplay,
      eventType: evt.eventType,
      description,
      userBadge: evt.userName || "Anonymous Visitor",
      learningLevel: evt.metadata?.learningLevel || "Beginner"
    };
  });

  // Format Visitor List
  const visitorList = Array.from(visitorProfiles.values())
    .sort((a, b) => b.lastActive - a.lastActive)
    .slice(0, 50)
    .map(p => {
      const diffMins = Math.max(0, Math.floor((now - p.lastActive) / 60000));
      const activeText = diffMins === 0 ? "Active now" : diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins / 60)}h ago`;
      return {
        id: p.id,
        name: p.name,
        device: `${p.device} (${p.browser})`,
        city: p.city,
        country: p.country,
        firstSeen: new Date(p.firstSeen).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        lastActive: activeText,
        level: p.level,
        completedLabs: p.completedLabs,
        eventsCount: p.eventsCount
      };
    });

  const avgQuizScore = totalQuizPossibleSum > 0 ? Math.round((totalQuizScoreSum / totalQuizPossibleSum) * 100) : null;

  return {
    isLive: true,
    totalEventsTracked: events.length,
    summary: {
      totalVisitors: uniqueVisitorIds.size,
      activeUsersNow: activeSessionIds.size,
      totalSessions: uniqueSessionIds.size,
      totalPageViews,
      totalScenarioCompletions,
      totalQuizAttempts,
      avgQuizScore,
      copilotQueriesCount: totalCopilotQueries
    },
    visitorTrends,
    moduleEngagements,
    industryUsage,
    deviceBreakdown,
    browserBreakdown,
    topSearches,
    recentActivity,
    visitorList
  };
}
