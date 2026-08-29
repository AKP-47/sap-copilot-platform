import crypto from "node:crypto";

const HASH_ITERS = 100000, HASH_KEYLEN = 64, HASH_DIGEST = "sha512";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const MAX_BODY_BYTES = 8192;

if (!process.env.JWT_SECRET) {
  console.warn("[SECURITY] JWT_SECRET env var is not set. Using default fallback — set this in Vercel environment variables.");
}

// ─── In-Lambda duplicate email registry ─────────────────────────────────────
// Module-level: persists across warm Lambda invocations.
// Stores HMAC fingerprints of registered emails (never plaintext).
const registeredEmailFingerprints = new Set();

function emailFingerprint(email) {
  return crypto.createHmac("sha256", JWT_SECRET).update(email).digest("hex");
}

// ─── Rate limiter (sliding window, per IP) ────────────────────────────────────
const rateLimitMap = new Map(); // ip -> [timestamp, ...]
const RATE_LIMIT = 5;           // max requests
const RATE_WINDOW = 60_000;     // per 60 seconds

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  hits.push(now);
  rateLimitMap.set(ip, hits);
  if (rateLimitMap.size > 5000) {
    // Prevent unbounded growth
    const oldest = [...rateLimitMap.keys()][0];
    rateLimitMap.delete(oldest);
  }
  return hits.length > RATE_LIMIT;
}

// ─── JWT signer ───────────────────────────────────────────────────────────────
function sign(payload) {
  const h = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const p = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${p}`).digest("base64url");
  return `${h}.${p}.${sig}`;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  // Rate limiting
  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp))
    return res.status(429).json({ error: "Too many registration attempts. Please wait a minute and try again." });

  // Body size limit
  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > MAX_BODY_BYTES)
    return res.status(413).json({ error: "Request body too large." });

  // Parse body
  let body = req.body;
  if (typeof body === "string") {
    if (body.length > MAX_BODY_BYTES)
      return res.status(413).json({ error: "Request body too large." });
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  // Input extraction + normalization
  const { name, email, password, learningLevel, selectedIndustry, privacyConsent, privacyConsentTimestamp, marketingConsent, marketingConsentTimestamp } = body || {};
  const cleanName  = String(name  || "").trim().slice(0, 120);
  const cleanEmail = String(email || "").trim().toLowerCase().slice(0, 254);
  const cleanPass  = String(password || "").trim();

  // Validation
  if (cleanName.length < 2)
    return res.status(400).json({ error: "Please enter your full name." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
    return res.status(400).json({ error: "Please enter a valid email address." });
  if (cleanPass.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  if (cleanPass.length > 128)
    return res.status(400).json({ error: "Password must be fewer than 128 characters." });

  // ── Server-side privacy consent check ───────────────────────────────────
  // Must be explicitly true — cannot be bypassed by the frontend
  if (privacyConsent !== true) {
    return res.status(400).json({
      error: "Please read and agree to the Privacy Policy before creating your account.",
      code: "PRIVACY_CONSENT_REQUIRED"
    });
  }

  // ── Duplicate email check (server-side, Lambda-scoped) ──────────────────
  const fingerprint = emailFingerprint(cleanEmail);
  if (registeredEmailFingerprints.has(fingerprint))
    return res.status(409).json({
      error: "An account with this email already exists. Please sign in instead.",
      code: "DUPLICATE_EMAIL"
    });

  // Register the fingerprint BEFORE async hashing to protect against race conditions
  // within this Lambda instance (two near-simultaneous requests)
  registeredEmailFingerprints.add(fingerprint);

  try {
    const salt      = crypto.randomBytes(32).toString("hex");
    const hash      = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
    const userId    = `usr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const createdAt = new Date().toISOString();

    // Credential token — permanent, signed, contains password hash (stored in client localStorage)
    const credentialToken = sign({
      type:                        "CREDENTIAL",
      sub:                         userId,
      name:                        cleanName,
      email:                       cleanEmail,
      salt,
      hash,
      createdAt,
      learningLevel:               learningLevel || "Beginner",
      selectedIndustry:            selectedIndustry || "Automotive",
      // Consent audit record
      privacyConsentAccepted:      true,
      privacyConsentTimestamp:     privacyConsentTimestamp || createdAt,
      marketingConsentAccepted:    marketingConsent === true,
      marketingConsentTimestamp:   marketingConsent === true ? (marketingConsentTimestamp || createdAt) : null,
      // fingerprintHint lets client detect cross-browser duplicates without exposing email
      fp:                          fingerprint.slice(0, 16)
    });

    // Session token — short-lived, no sensitive fields
    const iat = Math.floor(Date.now() / 1000);
    const sessionToken = sign({
      type:             "SESSION",
      sub:              userId,
      name:             cleanName,
      email:            cleanEmail,
      role:             "LEARNER",
      learningLevel:    learningLevel || "Beginner",
      selectedIndustry: selectedIndustry || "Automotive",
      iat,
      exp:              iat + 604800 // 7 days
    });

    return res.status(201).json({
      success:        true,
      message:        "Account created successfully! Welcome to SAP Copilot.",
      token:          sessionToken,
      credentialToken,
      user: {
        id:                userId,
        name:              cleanName,
        email:             cleanEmail,
        createdAt,
        learningLevel:     learningLevel  || "Beginner",
        selectedIndustry:  selectedIndustry || "Automotive",
        completedLabsCount: 0,
        quizzesTakenCount:  0,
        avgQuizScore:       null
      }
    });
  } catch (err) {
    // Roll back fingerprint if hashing failed
    registeredEmailFingerprints.delete(fingerprint);
    console.error("[signup] Internal error:", err?.message);
    return res.status(500).json({ error: "Registration failed due to a server error. Please try again." });
  }
}
