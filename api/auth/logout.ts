import { revokeSessionToken } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (authHeader && typeof authHeader === "string") {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1]) {
      revokeSessionToken(match[1]);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Owner session invalidated and logged out successfully."
  });
}
