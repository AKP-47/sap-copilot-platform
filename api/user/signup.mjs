import crypto from "node:crypto";

const HASH_ITERS = 100000, HASH_KEYLEN = 64, HASH_DIGEST = "sha512";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";

function sign(payload) {
  const h = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const p = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${p}`).digest("base64url");
  return `${h}.${p}.${sig}`;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); } }

  const { name, email, password, learningLevel, selectedIndustry } = body || {};
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPass = (password || "").trim();

  if (cleanName.length < 2)
    return res.status(400).json({ error: "Please enter your full name." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
    return res.status(400).json({ error: "Please enter a valid email address." });
  if (cleanPass.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters." });

  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  // Credential token: permanent signed record of the account (contains hash+salt)
  const credentialToken = sign({
    type: "CREDENTIAL",
    sub: userId,
    name: cleanName,
    email: cleanEmail,
    salt,
    hash,
    createdAt,
    learningLevel: learningLevel || "Beginner",
    selectedIndustry: selectedIndustry || "Automotive"
  });

  // Session token: short-lived access token (no sensitive data)
  const iat = Math.floor(Date.now() / 1000);
  const sessionToken = sign({
    type: "SESSION",
    sub: userId,
    name: cleanName,
    email: cleanEmail,
    role: "LEARNER",
    learningLevel: learningLevel || "Beginner",
    selectedIndustry: selectedIndustry || "Automotive",
    iat,
    exp: iat + 604800
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully! Welcome to SAP Copilot.",
    token: sessionToken,
    credentialToken,
    user: {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      createdAt,
      learningLevel: learningLevel || "Beginner",
      selectedIndustry: selectedIndustry || "Automotive",
      completedLabsCount: 0,
      quizzesTakenCount: 0,
      avgQuizScore: null
    }
  });
}
