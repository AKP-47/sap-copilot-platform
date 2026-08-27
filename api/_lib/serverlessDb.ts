import fs from "fs";
import path from "path";

/**
 * Universal Serverless Production Storage Adapter
 * 
 * Works across:
 * 1. Vercel KV / Upstash Redis REST API (Primary multi-container storage)
 * 2. Shared /tmp serverless storage
 * 3. Local filesystem storage
 */

const KV_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/+$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

const TMP_FILE = path.join("/tmp", ".tagskills_registered_users.json");
const LOCAL_FILE = path.join(process.cwd(), ".registered_users.json");

/**
 * Safely parse JSON that may be doubly-stringified
 */
function safeJsonParse<T>(input: any): T | null {
  if (input === null || input === undefined) return null;
  if (typeof input === "object") return input as T;

  if (typeof input === "string") {
    try {
      const firstPass = JSON.parse(input);
      if (typeof firstPass === "string") {
        try {
          return JSON.parse(firstPass) as T;
        } catch {
          return firstPass as unknown as T;
        }
      }
      return firstPass as T;
    } catch {
      return null;
    }
  }

  return null;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  // 1. Try remote KV/Redis REST API
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`
        }
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json && json.result !== undefined && json.result !== null) {
          const parsed = safeJsonParse<T>(json.result);
          if (parsed !== null) return parsed;
        }
      }
    } catch (err) {
      console.warn("[KV Get Remote Warning]:", err);
    }
  }

  // 2. Try /tmp filesystem storage
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf8");
      const parsed = safeJsonParse<T>(raw);
      if (parsed !== null) return parsed;
    }
  } catch {}

  // 3. Try local working directory
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      const raw = fs.readFileSync(LOCAL_FILE, "utf8");
      const parsed = safeJsonParse<T>(raw);
      if (parsed !== null) return parsed;
    }
  } catch {}

  return null;
}

export async function kvSet(key: string, value: any): Promise<boolean> {
  let ok = false;
  const serialized = typeof value === "string" ? value : JSON.stringify(value);

  // 1. Save to remote KV/Redis REST API if available
  if (KV_URL && KV_TOKEN) {
    try {
      // Standard Upstash Redis REST API format
      const res = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: serialized
      });

      if (res.ok) {
        ok = true;
      } else {
        // Fallback array format for older Upstash endpoints
        const fallbackRes = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify([serialized])
        });
        if (fallbackRes.ok) ok = true;
      }
    } catch (err) {
      console.warn("[KV Set Remote Warning]:", err);
    }
  }

  // 2. Save to /tmp filesystem
  try {
    fs.writeFileSync(TMP_FILE, serialized, "utf8");
    ok = true;
  } catch {}

  // 3. Save to local cwd filesystem
  try {
    fs.writeFileSync(LOCAL_FILE, serialized, "utf8");
    ok = true;
  } catch {}

  return ok;
}
