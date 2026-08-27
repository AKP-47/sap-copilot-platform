import { recordRealEvent } from "./_lib/realAnalyticsStore";

function detectDeviceAndBrowser(userAgent: string = ""): { deviceType: "Desktop" | "Mobile" | "Tablet"; browser: string } {
  let deviceType: "Desktop" | "Mobile" | "Tablet" = "Desktop";
  const ua = userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = "Tablet";
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    deviceType = "Mobile";
  }

  let browser = "Chrome";
  if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("opr") || ua.includes("opera")) browser = "Opera";

  return { deviceType, browser };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { visitorId, sessionId, userName, eventType, path, title, metadata } = body || {};

  if (!visitorId || !sessionId || !eventType) {
    return res.status(400).json({ error: "visitorId, sessionId, and eventType are required." });
  }

  const userAgent = req.headers?.["user-agent"] || "";
  const detected = detectDeviceAndBrowser(userAgent);

  const enrichedMetadata = {
    ...metadata,
    deviceType: metadata?.deviceType || detected.deviceType,
    browser: metadata?.browser || detected.browser
  };

  const recorded = recordRealEvent({
    visitorId: String(visitorId),
    sessionId: String(sessionId),
    userName: userName ? String(userName) : undefined,
    eventType,
    path: path ? String(path) : undefined,
    title: title ? String(title) : undefined,
    metadata: enrichedMetadata
  });

  return res.status(200).json({
    success: true,
    eventId: recorded.eventId
  });
}
