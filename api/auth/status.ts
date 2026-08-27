import { isOwnerInitialized } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const initialized = isOwnerInitialized();

  return res.status(200).json({
    success: true,
    isInitialized: initialized
  });
}
