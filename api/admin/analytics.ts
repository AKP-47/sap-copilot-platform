import { authenticateOwnerRequest } from "../_lib/auth";
import { getRealOwnerAnalytics } from "../_lib/realAnalyticsStore";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  // Strictly enforce server-side Owner authentication
  const auth = authenticateOwnerRequest(req);

  if (!auth.authorized || !auth.payload) {
    return res.status(auth.status).json({
      error: auth.error || "Access Denied: Owner authorization required.",
      code: auth.status === 403 ? "FORBIDDEN" : "UNAUTHENTICATED"
    });
  }

  const data = getRealOwnerAnalytics();

  return res.status(200).json({
    success: true,
    isLive: true,
    totalEventsTracked: data.totalEventsTracked,
    owner: {
      displayName: "Website Owner",
      role: "OWNER"
    },
    summary: data.summary,
    visitorTrends: data.visitorTrends,
    moduleEngagements: data.moduleEngagements,
    industryUsage: data.industryUsage,
    deviceBreakdown: data.deviceBreakdown,
    browserBreakdown: data.browserBreakdown,
    topSearches: data.topSearches,
    recentActivity: data.recentActivity,
    visitorList: data.visitorList
  });
}
