import { isOwnerInitialized, setupOwnerAccount, createOwnerSessionToken } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  if (isOwnerInitialized()) {
    return res.status(403).json({
      error: "Owner account is already configured. Setup is permanently locked.",
      code: "ALREADY_INITIALIZED"
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON payload." });
    }
  }

  const { username, passkey } = body || {};

  const setupResult = setupOwnerAccount(username, passkey);
  if (!setupResult.success) {
    return res.status(400).json({
      error: setupResult.error || "Failed to initialize owner account.",
      code: "SETUP_FAILED"
    });
  }

  const session = createOwnerSessionToken(username.trim().toLowerCase());

  return res.status(200).json({
    success: true,
    message: "Owner account initialized successfully.",
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
