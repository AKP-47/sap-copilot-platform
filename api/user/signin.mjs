import crypto from "node:crypto";

const HASH_ITERS = 100000, HASH_KEYLEN = 64, HASH_DIGEST = "sha512";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const MAX_BODY_BYTES = 8192;

// ─── Rate limiter ────────────────────────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT = 10, RATE_WINDOW = 60_000;
function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW);
  hits.push(now);
  rateLimitMap.set(ip, hits);
  if (rateLimitMap.size > 5000) rateLimitMap.delete([...rateLimitMap.keys()][0]);
  return hits.length > RATE_LIMIT;
}

// ─── JWT helpers ──────────────────────────────────────────────────────────────
function verifyAndDecode(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  try {
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${p}`).digest("base64url");
    const bufA = Buffer.from(s, "base64url"), bufB = Buffer.from(expected, "base64url");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) return null;
    return JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  } catch { return null; }
}

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

  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  if (isRateLimited(clientIp))
    return res.status(429).json({ error: "Too many sign-in attempts. Please wait a minute and try again." });

  const contentLength = parseInt(req.headers["content-length"] || "0", 10);
  if (contentLength > MAX_BODY_BYTES) return res.status(413).json({ error: "Request body too large." });

  let body = req.body;
  if (typeof body === "string") {
    if (body.length > MAX_BODY_BYTES) return res.status(413).json({ error: "Request body too large." });
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { email, password, credentialToken } = body || {};
  const cleanEmail = String(email || "").trim().toLowerCase().slice(0, 254);
  const cleanPass  = String(password || "").trim();

  if (!cleanEmail || !cleanPass)
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });

  if (!credentialToken)
    return res.status(401).json({
      error: "No account found for this email in this browser. Please register first.",
      code: "NO_CREDENTIAL"
    });

  // Verify credential token — server-signed, tamper-proof
  const cred = verifyAndDecode(credentialToken);
  if (!cred || cred.type !== "CREDENTIAL")
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });

  // Email must match
  if (cred.email !== cleanEmail)
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });

  // Verify password
  try {
    const computed = crypto.pbkdf2Sync(cleanPass, cred.salt, HASH_ITERS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
    const bufA = Buffer.from(computed, "hex"), bufB = Buffer.from(cred.hash, "hex");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB))
      return res.status(401).json({ error: "Email or password is incorrect. Please try again." });
  } catch {
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });
  }

  // Issue new session token
  const iat = Math.floor(Date.now() / 1000);
  const sessionToken = sign({
    type:             "SESSION",
    sub:              cred.sub,
    name:             cred.name,
    email:            cred.email,
    role:             "LEARNER",
    learningLevel:    cred.learningLevel,
    selectedIndustry: cred.selectedIndustry,
    iat,
    exp:              iat + 604800
  });

  return res.status(200).json({
    success: true,
    message: "Signed in successfully. Welcome back!",
    token:   sessionToken,
    user: {
      id:                cred.sub,
      name:              cred.name,
      email:             cred.email,
      createdAt:         cred.createdAt,
      learningLevel:     cred.learningLevel,
      selectedIndustry:  cred.selectedIndustry,
      completedLabsCount: 0,
      quizzesTakenCount:  0,
      avgQuizScore:       null
    }
  });
}
