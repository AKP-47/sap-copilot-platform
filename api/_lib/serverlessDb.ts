/**
 * Serverless Production Database Adapter for Vercel
 * Supports Vercel KV / Upstash Redis REST API with zero external dependencies
 */

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export async function kvGet<T>(key: string): Promise<T | null> {
  if (!KV_URL || !KV_TOKEN) return null;

  try {
    const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`
      }
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.result) {
      if (typeof json.result === "string") {
        try {
          return JSON.parse(json.result) as T;
        } catch {
          return json.result as unknown as T;
        }
      }
      return json.result as T;
    }
    return null;
  } catch (err) {
    console.warn("KV Get exception:", err);
    return null;
  }
}

export async function kvSet(key: string, value: any): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;

  try {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    const res = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([serialized])
    });

    return res.ok;
  } catch (err) {
    console.warn("KV Set exception:", err);
    return false;
  }
}
