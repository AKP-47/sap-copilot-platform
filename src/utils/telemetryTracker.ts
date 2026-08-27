/**
 * Lightweight, privacy-conscious real telemetry tracker for TagSkills SAP Copilot
 */

const VISITOR_ID_KEY = "tagskills_telemetry_visitor_id";
const SESSION_ID_KEY = "tagskills_telemetry_session_id";
const USER_NAME_KEY = "tagskills_user_display_name";

function generateUUID(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = generateUUID("vis");
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return generateUUID("vis_fallback");
  }
}

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = generateUUID("sess");
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return generateUUID("sess_fallback");
  }
}

export function getVoluntaryUserName(): string | undefined {
  try {
    return localStorage.getItem(USER_NAME_KEY) || undefined;
  } catch {
    return undefined;
  }
}

export function setVoluntaryUserName(name: string): void {
  try {
    if (name && name.trim()) {
      localStorage.setItem(USER_NAME_KEY, name.trim());
    }
  } catch {
    // Ignore
  }
}

function detectDevice(): "Desktop" | "Mobile" | "Tablet" {
  if (typeof window === "undefined") return "Desktop";
  const w = window.innerWidth;
  if (w <= 640) return "Mobile";
  if (w <= 1024) return "Tablet";
  return "Desktop";
}

/**
 * Non-blocking event dispatch to backend telemetry ingestion endpoint
 */
export async function trackEvent(
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
    | "COPILOT_QUERY",
  payload: {
    path?: string;
    title?: string;
    metadata?: Record<string, any>;
  } = {}
) {
  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const userName = getVoluntaryUserName();

    const body = {
      visitorId,
      sessionId,
      userName,
      eventType,
      path: payload.path || window.location.pathname + window.location.search,
      title: payload.title || document.title,
      metadata: {
        ...payload.metadata,
        deviceType: detectDevice(),
        referrer: typeof document !== "undefined" ? document.referrer : ""
      }
    };

    // Fire and forget with keepalive
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true
    }).catch(() => {
      // Silent telemetry catch
    });
  } catch {
    // Non-blocking
  }
}

export function trackPageView(path: string, title?: string) {
  trackEvent("PAGE_VIEW", { path, title });
}

export function trackModuleView(moduleId: string, moduleName: string, category?: string) {
  trackEvent("MODULE_VIEW", {
    path: `/module/${moduleId}`,
    title: moduleName,
    metadata: { moduleId, moduleName, category }
  });
}

export function trackQuizAttempt(quizId: string, score: number, total: number) {
  trackEvent("QUIZ_ATTEMPT", {
    title: `Quiz: ${quizId}`,
    metadata: { quizId, quizScore: score, quizTotal: total }
  });
}

export function trackScenarioAttempt(scenarioId: string, title: string) {
  trackEvent("SCENARIO_ATTEMPT", {
    title: `Scenario: ${title}`,
    metadata: { scenarioId }
  });
}

export function trackSearchQuery(query: string) {
  if (!query || !query.trim()) return;
  trackEvent("SEARCH_QUERY", {
    metadata: { query: query.trim() }
  });
}

export function trackIndustrySelect(industryId: string, industryName: string) {
  trackEvent("INDUSTRY_SELECT", {
    metadata: { industryId, industryName }
  });
}

export function trackLevelSelect(level: string) {
  trackEvent("LEVEL_SELECT", {
    metadata: { learningLevel: level }
  });
}

export function trackCopilotQuery(query: string) {
  trackEvent("COPILOT_QUERY", {
    metadata: { query }
  });
}
