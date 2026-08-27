import fs from "fs";
import path from "path";

/**
 * Multi-layer Serverless Production Database Adapter
 * 1. Vercel KV / Upstash Redis REST API (Primary for multi-region serverless)
 * 2. Shared /tmp filesystem storage (For warm lambda instances)
 * 3. Local filesystem storage (For development)
 */

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

const TMP_FILE = path.join("/tmp", ".registered_users.json");
const LOCAL_FILE = path.join(process.cwd(), ".registered_users.json");

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
        const json = await res.json();
        if (json && json.result !== undefined && json.result !== null) {
          if (typeof json.result === "string") {
            try {
              return JSON.parse(json.result) as T;
            } catch {
              return json.result as unknown as T;
            }
          }
          return json.result as T;
        }
      }
    } catch (err) {
      console.warn("[KV Get Remote Error]:", err);
    }
  }

  // 2. Fallback to /tmp filesystem
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf8");
      return JSON.parse(raw) as T;
    }
  } catch {}

  // 3. Fallback to local cwd filesystem
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      const raw = fs.readFileSync(LOCAL_FILE, "utf8");
      return JSON.parse(raw) as T;
    }
  } catch {}

  return null;
}

export async function kvSet(key: string, value: any): Promise<boolean> {
  let ok = false;
  const serialized = typeof value === "string" ? value : JSON.stringify(value, null, 2);

  // 1. Write to remote KV/Redis REST API
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([typeof value === "string" ? value : JSON.stringify(value)])
      });
      if (res.ok) ok = true;
    } catch (err) {
      console.warn("[KV Set Remote Error]:", err);
    }
  }

  // 2. Write to /tmp filesystem
  try {
    fs.writeFileSync(TMP_FILE, serialized, "utf8");
    ok = true;
  } catch {}

  // 3. Write to local cwd filesystem
  try {
    fs.writeFileSync(LOCAL_FILE, serialized, "utf8");
    ok = true;
  } catch {}

  return ok;
}
