export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  let body = req.body; if (typeof body === "string") { try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); } }
  const { visitorId, sessionId, eventType } = body || {};
  if (!visitorId || !sessionId || !eventType) return res.status(400).json({ error: "visitorId, sessionId, and eventType required." });
  return res.status(200).json({ success: true, eventId: `evt_${Date.now()}` });
}
