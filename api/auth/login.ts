import { verifyOwnerCredentials, createOwnerSessionToken, isOwnerInitialized } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON payload." });
    }
  }

  const { username, passkey, password } = body || {};
  const secretToVerify = passkey || password;

  if (!username || !secretToVerify) {
    return res.status(400).json({
      error: "Owner identifier and passkey are required.",
      code: "CREDENTIALS_REQUIRED"
    });
  }

  if (!isOwnerInitialized()) {
    return res.status(400).json({
      error: "Owner account has not been initialized yet. Please complete initial setup.",
      code: "NOT_INITIALIZED"
    });
  }

  const clientIp = req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "default";
  const authResult = verifyOwnerCredentials(username, secretToVerify, String(clientIp));

  if (!authResult.valid) {
    // Artificial 350ms delay to deter timing and brute-force attacks
    await new Promise(resolve => setTimeout(resolve, 350));
    return res.status(401).json({
      error: authResult.error || "Authentication failed. Please check your credentials.",
      code: "INVALID_CREDENTIALS"
    });
  }

  const session = createOwnerSessionToken(username.trim().toLowerCase());

  return res.status(200).json({
    success: true,
    message: "Owner authenticated successfully.",
    role: "OWNER",
    user: {
      id: "tagskills-single-owner-001",
      role: "OWNER",
      displayName: "Website Owner"
    },
    token: session.token,
    expiresIn: session.expiresIn,
    expiresAt: session.expiresAt
  });
}
