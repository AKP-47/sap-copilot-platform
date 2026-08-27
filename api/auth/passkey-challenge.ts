import crypto from "crypto";
import { DESIGNATED_OWNER_USERNAME, DESIGNATED_OWNER_ID } from "../_lib/auth";

// Temporary memory store for active cryptographic challenges (expires in 2 minutes)
const activeChallenges = new Map<string, { challenge: string; expiresAt: number }>();

export function saveChallenge(challengeId: string, challenge: string) {
  activeChallenges.set(challengeId, {
    challenge,
    expiresAt: Date.now() + 2 * 60 * 1000 // 2 minutes
  });
}

export function verifyChallenge(challengeId: string, clientChallenge: string): boolean {
  const record = activeChallenges.get(challengeId);
  if (!record) return false;
  activeChallenges.delete(challengeId); // One-time use
  if (record.expiresAt < Date.now()) return false;
  return record.challenge === clientChallenge;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const rawChallenge = crypto.randomBytes(32).toString("base64url");
  const challengeId = crypto.randomBytes(16).toString("hex");

  saveChallenge(challengeId, rawChallenge);

  return res.status(200).json({
    success: true,
    challengeId,
    challenge: rawChallenge,
    rp: {
      name: "TagSkills Enterprise SAP Platform",
      id: req.headers?.host ? req.headers.host.split(":")[0] : "localhost"
    },
    user: {
      id: Buffer.from(DESIGNATED_OWNER_ID).toString("base64url"),
      name: DESIGNATED_OWNER_USERNAME,
      displayName: "Akshat Pandey (Website Owner)"
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" } // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform", // Touch ID / Face ID / Windows Hello
      userVerification: "preferred",
      residentKey: "preferred"
    },
    timeout: 60000
  });
}
