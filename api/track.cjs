"use strict";

function detectDevice(ua) {
  ua = (ua || "").toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return { deviceType: "Tablet", browser: "Chrome" };
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return { deviceType: "Mobile", browser: "Chrome" };
  let browser = "Chrome";
  if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  return { deviceType: "Desktop", browser };
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") { res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed." })); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { res.statusCode = 400; res.end(JSON.stringify({ error: "Invalid JSON" })); return; } }

  const { visitorId, sessionId, eventType } = body || {};
  if (!visitorId || !sessionId || !eventType) { res.statusCode = 400; res.end(JSON.stringify({ error: "visitorId, sessionId, and eventType are required." })); return; }

  res.statusCode = 200;
  res.end(JSON.stringify({ success: true, eventId: `evt_${Date.now()}` }));
};
