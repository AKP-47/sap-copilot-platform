import crypto from "crypto";
import fs from "fs";
import path from "path";

const HASH_ITERS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const KV_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/+$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const KV_KEY = "tagskills_registered_users";
const TMP_PATH = "/tmp/tagskills_users.json";

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

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); } }
  const { email, token, newPassword } = body || {};

  if (!email || !token || !newPassword) {
    return res.status(400).json({ error: "Email, reset code, and new password are required." });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPass = String(newPassword).trim();
  if (cleanPass.length < 6) return res.status(400).json({ error: "New password must be at least 6 characters." });

  const users = await loadUsers();
  const user = users.find((u: any) => u.email === cleanEmail);
  if (!user || !user.resetTokenHash || !user.resetTokenExpiry) {
    return res.status(400).json({ error: "Invalid or expired reset code." });
  }
  if (Date.now() > user.resetTokenExpiry) {
    user.resetTokenHash = null; user.resetTokenExpiry = null;
    await saveUsers(users);
    return res.status(400).json({ error: "Reset code has expired. Please request a new one." });
  }

  const provided = crypto.createHmac("sha256", JWT_SECRET).update(String(token).trim()).digest("hex");
  if (provided !== user.resetTokenHash) {
    return res.status(400).json({ error: "Invalid reset code. Please check and try again." });
  }

  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  user.salt = salt; user.hash = hash;
  user.resetTokenHash = null; user.resetTokenExpiry = null;
  await saveUsers(users);

  return res.status(200).json({ success: true, message: "Password reset successfully! You can now sign in." });
}
