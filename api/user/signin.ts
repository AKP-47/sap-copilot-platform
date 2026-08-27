import crypto from "crypto";
import fs from "fs";
import path from "path";

// ─── Configuration ─────────────────────────────────────────────────────────
const HASH_ITERS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const KV_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/+$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const KV_KEY = "tagskills_registered_users";
const TMP_PATH = "/tmp/tagskills_users.json";

// ─── Storage helpers ────────────────────────────────────────────────────────
function readFromDisk(): any[] {
  try { if (fs.existsSync(TMP_PATH)) return JSON.parse(fs.readFileSync(TMP_PATH, "utf8")) || []; } catch {}
  try {
    const p = path.join(process.cwd(), ".registered_users.json");
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8")) || [];
  } catch {}
  return [];
}

function writeToDisk(users: any[]): void {
  try { fs.writeFileSync(TMP_PATH, JSON.stringify(users), "utf8"); } catch {}
  try { fs.writeFileSync(path.join(process.cwd(), ".registered_users.json"), JSON.stringify(users), "utf8"); } catch {}
}

async function loadUsers(): Promise<any[]> {
  if (KV_URL && KV_TOKEN) {
    try {
      const r = await fetch(`${KV_URL}/get/${encodeURIComponent(KV_KEY)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` }
      });
      if (r.ok) {
        const j = await r.json();
        let val = j?.result;
        if (typeof val === "string") { try { val = JSON.parse(val); } catch {} }
        if (typeof val === "string") { try { val = JSON.parse(val); } catch {} }
        if (Array.isArray(val) && val.length > 0) return val;
      }
    } catch {}
  }
  return readFromDisk();
}

async function saveUsers(users: any[]): Promise<void> {
  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/${encodeURIComponent(KV_KEY)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(JSON.stringify(users))
      });
    } catch {}
  }
  writeToDisk(users);
}

// ─── JWT helper ─────────────────────────────────────────────────────────────
function makeToken(user: any): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60;
  const h = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const p = Buffer.from(JSON.stringify({ sub: user.id, name: user.name, email: user.email, role: "LEARNER", iat, exp })).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${p}`).digest("base64url");
  return `${h}.${p}.${sig}`;
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); } }
  const { email, password } = body || {};

  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanPass = (password || "").trim();
  if (!cleanEmail || !cleanPass) return res.status(401).json({ error: "Email or password is incorrect. Please try again." });

  const users = await loadUsers();
  const user = users.find((u: any) => u.email === cleanEmail);
  if (!user || !user.salt || !user.hash) {
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });
  }

  try {
    const computed = crypto.pbkdf2Sync(cleanPass, user.salt, HASH_ITERS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
    const bufA = Buffer.from(computed, "hex");
    const bufB = Buffer.from(user.hash, "hex");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
      return res.status(401).json({ error: "Email or password is incorrect. Please try again." });
    }
  } catch {
    return res.status(401).json({ error: "Email or password is incorrect. Please try again." });
  }

  user.lastLoginAt = new Date().toISOString();
  await saveUsers(users);

  const token = makeToken(user);
  return res.status(200).json({
    success: true,
    message: "Signed in successfully. Welcome back!",
    token,
    user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, learningLevel: user.learningLevel, selectedIndustry: user.selectedIndustry, completedLabsCount: user.completedLabsCount || 0, quizzesTakenCount: user.quizzesTakenCount || 0, avgQuizScore: user.avgQuizScore ?? null }
  });
}
