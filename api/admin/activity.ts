import { authenticateOwnerRequest } from "../_lib/auth";
import { getRealOwnerAnalytics } from "../_lib/realAnalyticsStore";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

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
    activity: data.recentActivity,
    activeUsersNow: data.summary.activeUsersNow
  });
}
