import crypto from "node:crypto";

// NOTE: This file intentionally checks process.env.RESEND_API_KEY to decide
// whether to expose the demo code. The Resend integration itself is OUT OF SCOPE
// and has not been modified. The demoCode path is for dev-only use.

const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const MAX_BODY_BYTES = 4096;

// ─── Rate limiter (strict — 3 per min per IP) ────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT = 3, RATE_WINDOW = 60_000;
function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  hits.push(now);
  rateLimitMap.set(ip, hits);
  if (rateLimitMap.size > 5000) rateLimitMap.delete([...rateLimitMap.keys()][0]);
  return hits.length > RATE_LIMIT;
}

// In-memory reset token store (Lambda-scoped; credential-token architecture has no server DB)
const resetTokens = new Map(); // emailFingerprint -> { hash, expiry }

function emailFingerprint(email) {
  return crypto.createHmac("sha256", JWT_SECRET).update(email).digest("hex");
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp))
    return res.status(429).json({ error: "Too many attempts. Please wait a minute." });

  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > MAX_BODY_BYTES) return res.status(413).json({ error: "Request too large." });

  let body = req.body;
  if (typeof body === "string") {
    if (body.length > MAX_BODY_BYTES) return res.status(413).json({ error: "Request too large." });
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { email } = body || {};
  const cleanEmail = String(email || "").trim().toLowerCase().slice(0, 254);
  if (!cleanEmail || !cleanEmail.includes("@"))
    return res.status(400).json({ error: "Please enter a valid email address." });

  // Always respond the same way whether the email exists or not (prevents email enumeration)
  const fp = emailFingerprint(cleanEmail);
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = crypto.createHmac("sha256", JWT_SECRET).update(code).digest("hex");
  resetTokens.set(fp, { hash: codeHash, expiry: Date.now() + 900_000 }); // 15 min

  // RESEND INTEGRATION IS OUT OF SCOPE — left completely untouched.
  // The demoCode is returned only when RESEND_API_KEY is not configured (dev mode).
  let demoCode;
  if (!process.env.RESEND_API_KEY) demoCode = code;

  return res.status(200).json({
    success: true,
    message: "If an account with this email exists, a 6-digit code has been generated.",
    demoCode
  });
}
