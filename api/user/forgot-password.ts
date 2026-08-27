import crypto from "crypto";
import fs from "fs";
import path from "path";

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
  const { email } = body || {};
  if (!email || !String(email).includes("@")) return res.status(400).json({ error: "Please enter a valid email address." });

  const cleanEmail = String(email).trim().toLowerCase();
  const users = await loadUsers();
  const user = users.find((u: any) => u.email === cleanEmail);

  let demoCode: string | undefined;
  if (user) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = crypto.createHmac("sha256", JWT_SECRET).update(code).digest("hex");
    user.resetTokenHash = codeHash;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await saveUsers(users);
    // Only expose code in dev (no RESEND configured)
    if (!process.env.RESEND_API_KEY) demoCode = code;
  }

  return res.status(200).json({
    success: true,
    message: "If an account exists with this email, a 6-digit code has been generated.",
    demoCode
  });
}
