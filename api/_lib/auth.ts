import crypto from "crypto";

// Server-side secret key for signing session tokens (Fallback to secure server runtime seed if env not provided)
const SERVER_SECRET = process.env.JWT_SECRET || process.env.OWNER_SECRET_KEY || "tagskills-sap-owner-jwt-secret-key-2026-secure-prod";

// Designated single authorized owner account
export const DESIGNATED_OWNER_USERNAME = process.env.OWNER_USERNAME || "owner@tagskills.com";
export const DESIGNATED_OWNER_ID = "tagskills-single-owner-001";

// Password hashing constants (PBKDF2 with SHA-512)
const HASH_ITERATIONS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";

// Default pre-hashed credentials for the single owner account
// Default credentials: Username = "owner@tagskills.com", Password = "TagSkills@Owner2026!"
const DEFAULT_SALT = "4f8a9b2c3d1e5f7a6b8c9d0e1f2a3b4c";
const DEFAULT_HASH = crypto.pbkdf2Sync("TagSkills@Owner2026!", DEFAULT_SALT, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

const OWNER_SALT = process.env.OWNER_PASSWORD_SALT || DEFAULT_SALT;
const OWNER_HASH = process.env.OWNER_PASSWORD_HASH || DEFAULT_HASH;

// Token blacklist for immediate revocation on logout
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
 * Verifies owner password using constant-time comparison against cryptographic hash
 */
export function verifyOwnerPassword(password: string): boolean {
  if (!password || typeof password !== "string") return false;
  
  // Also allow environment variable override for custom password without hash
  if (process.env.OWNER_PLAIN_PASSWORD && password === process.env.OWNER_PLAIN_PASSWORD) {
    return true;
  }

  const computedHash = crypto.pbkdf2Sync(password, OWNER_SALT, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  
  try {
    const hashBufferA = Buffer.from(computedHash, "hex");
    const hashBufferB = Buffer.from(OWNER_HASH, "hex");
    if (hashBufferA.length !== hashBufferB.length) return false;
    return crypto.timingSafeEqual(hashBufferA, hashBufferB);
  } catch {
    return false;
  }
}

/**
 * Creates a cryptographically signed HMAC-SHA256 JWT session token
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
 * Verifies session token, checks signature, expiration, revocation, and role
 */
export function verifySessionToken(token: string): { valid: boolean; payload?: TokenPayload; error?: string; status?: number } {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Authentication token missing", status: 401 };
  }

  if (revokedTokens.has(token)) {
    return { valid: false, error: "Session has been logged out / revoked", status: 401 };
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Malformed session token", status: 401 };
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  // Verify HMAC signature
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

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: "Session token expired. Please login again.", status: 401 };
    }

    // Strictly enforce role === "OWNER"
    if (payload.role !== "OWNER") {
      return { valid: false, error: "Access Denied: Owner privileges required.", status: 403 };
    }

    // Verify designated single owner identity
    if (payload.sub !== DESIGNATED_OWNER_ID) {
      return { valid: false, error: "Access Denied: Unauthorized owner account.", status: 403 };
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
 * Middleware helper for API routes: extracts Bearer token and enforces OWNER role
 */
export function authenticateOwnerRequest(req: any): { authorized: boolean; payload?: TokenPayload; error?: string; status: number } {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  
  if (!authHeader || typeof authHeader !== "string") {
    return { authorized: false, error: "Authentication required. No Bearer token provided.", status: 401 };
  }

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match || !match[1]) {
    return { authorized: false, error: "Invalid Authorization header format. Expected 'Bearer <token>'", status: 401 };
  }

  const token = match[1];
  const result = verifySessionToken(token);

  if (!result.valid || !result.payload) {
    return { authorized: false, error: result.error || "Access Denied", status: result.status || 401 };
  }

  return { authorized: true, payload: result.payload, status: 200 };
}
