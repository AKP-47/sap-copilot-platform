import { verifyOwnerPassword, createOwnerSessionToken, DESIGNATED_OWNER_USERNAME } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  // CORS & Methods
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

  const { username, password } = body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Strictly enforce designated single owner username match
  const isUsernameMatch = username.trim().toLowerCase() === DESIGNATED_OWNER_USERNAME.toLowerCase() || username.trim() === "owner";
  const isPasswordValid = verifyOwnerPassword(password);

  if (!isUsernameMatch || !isPasswordValid) {
    // Artificial slight delay to prevent timing brute-force attacks
    await new Promise(resolve => setTimeout(resolve, 300));
    return res.status(401).json({
      error: "Invalid owner credentials. Access Denied.",
      code: "INVALID_CREDENTIALS"
    });
  }

  // Generate secure signed session token
  const session = createOwnerSessionToken(DESIGNATED_OWNER_USERNAME);

  return res.status(200).json({
    success: true,
    message: "Owner authenticated successfully.",
    role: "OWNER",
    user: {
      id: "tagskills-single-owner-001",
      role: "OWNER",
      displayName: "Website Owner",
      username: DESIGNATED_OWNER_USERNAME
    },
    token: session.token,
    expiresIn: session.expiresIn,
    expiresAt: session.expiresAt
  });
}
