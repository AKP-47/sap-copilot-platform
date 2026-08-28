const MAX_BODY_BYTES = 4096;

// Rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 60, RATE_WINDOW = 60_000;
function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  hits.push(now);
  rateLimitMap.set(ip, hits);
  if (rateLimitMap.size > 5000) rateLimitMap.delete([...rateLimitMap.keys()][0]);
  return hits.length > RATE_LIMIT;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp))
    return res.status(429).json({ error: "Rate limit exceeded." });

  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > MAX_BODY_BYTES) return res.status(413).json({ error: "Request too large." });

  let body = req.body;
  if (typeof body === "string") {
    if (body.length > MAX_BODY_BYTES) return res.status(413).json({ error: "Request too large." });
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { visitorId, sessionId, eventType } = body || {};
  if (!visitorId || !sessionId || !eventType)
    return res.status(400).json({ error: "visitorId, sessionId, and eventType are required." });

  return res.status(200).json({ success: true, eventId: `evt_${Date.now()}` });
}
