import crypto from "crypto";
import { isOwnerInitialized, setupOwnerAccount, verifyOwnerCredentials, getOwnerCredentialRecord } from "./ownerStore";

export { isOwnerInitialized, setupOwnerAccount, verifyOwnerCredentials };

const SERVER_SECRET = process.env.JWT_SECRET || process.env.OWNER_SECRET_KEY || "tagskills-enterprise-sap-owner-secret-key-prod-2026";
export const DESIGNATED_OWNER_ID = "tagskills-single-owner-001";

// Token revocation store for immediate logout
const revokedTokens = new Set<string>();

export interface TokenPayload {
  sub: string;
  username: string;
  role: "OWNER" | "LEARNER";
  name: string;
  iat: number;
  exp: number;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 JWT session token for the owner
 */
export function createOwnerSessionToken(username: string): { token: string; expiresIn: number; expiresAt: string } {
  const iat = Math.floor(Date.now() / 1000);
  const expiresInSeconds = 8 * 60 * 60; // 8 hours session expiration
  const exp = iat + expiresInSeconds;

  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload: TokenPayload = {
    sub: DESIGNATED_OWNER_ID,
    username: username,
    role: "OWNER",
    name: "Website Owner",
    iat,
    exp
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  return {
    token,
    expiresIn: expiresInSeconds,
    expiresAt: new Date(exp * 1000).toISOString()
  };
}

/**
 * Verifies session token, checking HMAC signature, expiry, revocation, and role === "OWNER"
 */
export function verifySessionToken(token: string): { valid: boolean; payload?: TokenPayload; error?: string; status?: number } {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Authentication token missing", status: 401 };
  }

  if (revokedTokens.has(token)) {
    return { valid: false, error: "Session has been logged out", status: 401 };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Malformed session token", status: 401 };
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", SERVER_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  try {
    const sigBufferA = Buffer.from(signature);
    const sigBufferB = Buffer.from(expectedSignature);
    if (sigBufferA.length !== sigBufferB.length || !crypto.timingSafeEqual(sigBufferA, sigBufferB)) {
      return { valid: false, error: "Invalid token signature", status: 401 };
    }
  } catch {
    return { valid: false, error: "Signature verification failure", status: 401 };
  }

  try {
    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload: TokenPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: "Session expired. Please login again.", status: 401 };
    }

    if (payload.role !== "OWNER" || payload.sub !== DESIGNATED_OWNER_ID) {
      return { valid: false, error: "Access Denied: Owner privileges required.", status: 403 };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Invalid token payload", status: 401 };
  }
}

/**
 * Revokes a session token upon logout
 */
export function revokeSessionToken(token: string): boolean {
  if (token) {
    revokedTokens.add(token);
    return true;
  }
  return false;
}

/**
 * Middleware helper for API routes: enforces Bearer token verification
 */
export function authenticateOwnerRequest(req: any): { authorized: boolean; payload?: TokenPayload; error?: string; status: number } {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  
  if (!authHeader || typeof authHeader !== "string") {
    return { authorized: false, error: "Authentication required. No Bearer token provided.", status: 401 };
  }

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match || !match[1]) {
    return { authorized: false, error: "Invalid Authorization header format.", status: 401 };
  }

  const token = match[1];
  const result = verifySessionToken(token);

  if (!result.valid || !result.payload) {
    return { authorized: false, error: result.error || "Access Denied", status: result.status || 401 };
  }

  return { authorized: true, payload: result.payload, status: 200 };
}
