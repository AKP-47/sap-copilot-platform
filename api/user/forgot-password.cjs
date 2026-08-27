"use strict";
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
const KV_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/+$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const KV_KEY = "tagskills_registered_users";
const TMP_PATH = "/tmp/tagskills_users.json";

function readFromDisk() {
  try { if (fs.existsSync(TMP_PATH)) { const d = JSON.parse(fs.readFileSync(TMP_PATH, "utf8")); if (Array.isArray(d)) return d; } } catch {}
  try { const p = path.join(process.cwd(), ".registered_users.json"); if (fs.existsSync(p)) { const d = JSON.parse(fs.readFileSync(p, "utf8")); if (Array.isArray(d)) return d; } } catch {}
  return [];
}
function writeToDisk(u) { try { fs.writeFileSync(TMP_PATH, JSON.stringify(u), "utf8"); } catch {} }
async function loadUsers() {
  if (KV_URL && KV_TOKEN) { try { const r = await fetch(`${KV_URL}/get/${encodeURIComponent(KV_KEY)}`, { headers: { Authorization: `Bearer ${KV_TOKEN}` } }); if (r.ok) { const j = await r.json(); let val = j && j.result; if (typeof val === "string") { try { val = JSON.parse(val); } catch {} } if (typeof val === "string") { try { val = JSON.parse(val); } catch {} } if (Array.isArray(val) && val.length > 0) return val; } } catch {} }
  return readFromDisk();
}
async function saveUsers(u) {
  if (KV_URL && KV_TOKEN) { try { await fetch(`${KV_URL}/set/${encodeURIComponent(KV_KEY)}`, { method: "POST", headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify(JSON.stringify(u)) }); } catch {} }
  writeToDisk(u);
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") { res.statusCode = 405; res.end(JSON.stringify({ error: "Method not allowed." })); return; }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { res.statusCode = 400; res.end(JSON.stringify({ error: "Invalid JSON" })); return; } }
  const { email } = body || {};
  if (!email || !String(email).includes("@")) { res.statusCode = 400; res.end(JSON.stringify({ error: "Please enter a valid email address." })); return; }
  const cleanEmail = String(email).trim().toLowerCase();
  const users = await loadUsers();
  const user = users.find(u => u.email === cleanEmail);
  let demoCode;
  if (user) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetTokenHash = crypto.createHmac("sha256", JWT_SECRET).update(code).digest("hex");
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await saveUsers(users);
    if (!process.env.RESEND_API_KEY) demoCode = code;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ success: true, message: "If an account exists with this email, a 6-digit code has been generated.", demoCode }));
};
