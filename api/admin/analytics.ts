import { authenticateOwnerRequest } from "../_lib/auth";
import { getOwnerAnalyticsData } from "../_lib/analyticsData";

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

  const data = getOwnerAnalyticsData();

  return res.status(200).json({
    success: true,
    owner: {
      displayName: "Website Owner",
      role: "OWNER"
    },
    summary: data.summary,
    visitorTrends: data.visitorTrends,
    moduleEngagements: data.moduleEngagements,
    industryUsage: data.industryUsage,
    deviceBreakdown: data.deviceBreakdown,
    browserBreakdown: data.browserBreakdown
  });
}
