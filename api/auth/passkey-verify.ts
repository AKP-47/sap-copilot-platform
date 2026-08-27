import { createOwnerSessionToken, DESIGNATED_OWNER_USERNAME, verifyOwnerPassword } from "../_lib/auth";
import { verifyChallenge } from "./passkey-challenge";

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

  const { challengeId, clientChallenge, credentialId, clientPasskey } = body || {};

  // If verifying a WebAuthn biometric assertion with challenge
  if (challengeId && clientChallenge) {
    const isChallengeValid = verifyChallenge(challengeId, clientChallenge);
    if (!isChallengeValid) {
      return res.status(401).json({
        error: "Passkey challenge expired or invalid. Please try again.",
        code: "INVALID_CHALLENGE"
      });
    }
  } else if (clientPasskey) {
    // If verifying a Passkey / PIN directly
    const isPasskeyValid = verifyOwnerPassword(clientPasskey);
    if (!isPasskeyValid) {
      return res.status(401).json({
        error: "Invalid Security Passkey. Access Denied.",
        code: "INVALID_PASSKEY"
      });
    }
  } else {
    return res.status(400).json({
      error: "Missing passkey authentication payload.",
      code: "PAYLOAD_REQUIRED"
    });
  }

  // Issue signed Owner JWT session token
  const session = createOwnerSessionToken(DESIGNATED_OWNER_USERNAME);

  return res.status(200).json({
    success: true,
    message: "Passkey verified successfully. Access granted.",
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
