import crypto from "crypto";
import fs from "fs";
import path from "path";
import { kvGet, kvSet } from "./serverlessDb";

const HASH_ITERATIONS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";
const SERVER_SECRET = process.env.JWT_SECRET || "tagskills-enterprise-sap-user-secret-prod-2026";
const USERS_FILE_PATH = path.join(process.cwd(), ".registered_users.json");
const KV_USERS_KEY = "tagskills_registered_users";

export interface RegisteredUserRecord {
  id: string;
  name: string;
  email: string;
  salt: string;
  hash: string;
  createdAt: string;
  lastLoginAt: string;
  learningLevel?: string;
  selectedIndustry?: string;
  completedLabsCount: number;
  quizzesTakenCount: number;
  avgQuizScore: number | null;
}

let inMemoryUsers: RegisteredUserRecord[] = [];

function loadUsersFromDisk(): RegisteredUserRecord[] {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const raw = fs.readFileSync(USERS_FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryUsers = parsed;
        return inMemoryUsers;
      }
    }
  } catch (err) {
    console.warn("User store load exception:", err);
  }
  return inMemoryUsers;
}

// Initial local load
loadUsersFromDisk();

// Attempt remote KV sync in background
kvGet<RegisteredUserRecord[]>(KV_USERS_KEY).then(remoteUsers => {
  if (Array.isArray(remoteUsers) && remoteUsers.length > 0) {
    inMemoryUsers = remoteUsers;
  }
}).catch(() => null);

function persistUsers() {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(inMemoryUsers, null, 2), "utf8");
  } catch {
    // Disk write might fail on serverless read-only filesystem, which is expected
  }

  // Persist to Serverless KV if configured
  kvSet(KV_USERS_KEY, inMemoryUsers).catch(() => null);
}

/**
 * Registers a new learner account with salted PBKDF2-SHA512 hash
 */
export async function registerNewUserAsync(params: {
  name: string;
  email: string;
  password: string;
  learningLevel?: string;
  selectedIndustry?: string;
}): Promise<{ success: boolean; user?: RegisteredUserRecord; error?: string; code?: string }> {
  // Sync latest from KV if available
  const remote = await kvGet<RegisteredUserRecord[]>(KV_USERS_KEY);
  if (Array.isArray(remote)) {
    inMemoryUsers = remote;
  }

  const cleanName = params.name?.trim();
  const cleanEmail = params.email?.trim().toLowerCase();
  const cleanPass = params.password?.trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: "Please enter your full name (at least 2 characters).", code: "INVALID_NAME" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { success: false, error: "Please enter a valid email address.", code: "INVALID_EMAIL" };
  }

  if (!cleanPass || cleanPass.length < 6) {
    return { success: false, error: "Password must be at least 6 characters.", code: "WEAK_PASSWORD" };
  }

  // Check duplicate email
  const existing = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return {
      success: false,
      error: "This email is already registered.",
      code: "DUPLICATE_EMAIL"
    };
  }

  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

  const newUser: RegisteredUserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    email: cleanEmail,
    salt,
    hash,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    learningLevel: params.learningLevel || "BEGINNER",
    selectedIndustry: params.selectedIndustry || "Automotive",
    completedLabsCount: 0,
    quizzesTakenCount: 0,
    avgQuizScore: null
  };

  inMemoryUsers.push(newUser);
  persistUsers();

  return { success: true, user: newUser };
}

export function registerNewUser(params: {
  name: string;
  email: string;
  password: string;
  learningLevel?: string;
  selectedIndustry?: string;
}): { success: boolean; user?: RegisteredUserRecord; error?: string; code?: string } {
  const cleanName = params.name?.trim();
  const cleanEmail = params.email?.trim().toLowerCase();
  const cleanPass = params.password?.trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: "Please enter your full name (at least 2 characters).", code: "INVALID_NAME" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { success: false, error: "Please enter a valid email address.", code: "INVALID_EMAIL" };
  }

  if (!cleanPass || cleanPass.length < 6) {
    return { success: false, error: "Password must be at least 6 characters.", code: "WEAK_PASSWORD" };
  }

  const existing = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return {
      success: false,
      error: "This email is already registered.",
      code: "DUPLICATE_EMAIL"
    };
  }

  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

  const newUser: RegisteredUserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    email: cleanEmail,
    salt,
    hash,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    learningLevel: params.learningLevel || "BEGINNER",
    selectedIndustry: params.selectedIndustry || "Automotive",
    completedLabsCount: 0,
    quizzesTakenCount: 0,
    avgQuizScore: null
  };

  inMemoryUsers.push(newUser);
  persistUsers();

  return { success: true, user: newUser };
}

/**
 * Authenticates user credentials
 */
export async function authenticateUserAsync(email: string, password: string): Promise<{ success: boolean; user?: RegisteredUserRecord; error?: string }> {
  const remote = await kvGet<RegisteredUserRecord[]>(KV_USERS_KEY);
  if (Array.isArray(remote)) {
    inMemoryUsers = remote;
  }

  return authenticateUser(email, password);
}

export function authenticateUser(email: string, password: string): { success: boolean; user?: RegisteredUserRecord; error?: string } {
  const cleanEmail = email?.trim().toLowerCase();
  const cleanPass = password?.trim();

  if (!cleanEmail || !cleanPass) {
    return { success: false, error: "Please provide both email and password." };
  }

  const user = inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return { success: false, error: "Incorrect email or password." };
  }

  const computedHash = crypto.pbkdf2Sync(cleanPass, user.salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

  try {
    const bufA = Buffer.from(computedHash, "hex");
    const bufB = Buffer.from(user.hash, "hex");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
      return { success: false, error: "Incorrect email or password." };
    }
  } catch {
    return { success: false, error: "Incorrect email or password." };
  }

  // Update last login timestamp
  user.lastLoginAt = new Date().toISOString();
  persistUsers();

  return { success: true, user };
}

/**
 * Updates user profile
 */
export function updateUserProfile(userId: string, updates: Partial<Pick<RegisteredUserRecord, "name" | "learningLevel" | "selectedIndustry">>): { success: boolean; user?: RegisteredUserRecord; error?: string } {
  const user = inMemoryUsers.find(u => u.id === userId);
  if (!user) {
    return { success: false, error: "User not found." };
  }

  if (updates.name && updates.name.trim().length >= 2) {
    user.name = updates.name.trim();
  }
  if (updates.learningLevel) {
    user.learningLevel = updates.learningLevel;
  }
  if (updates.selectedIndustry) {
    user.selectedIndustry = updates.selectedIndustry;
  }

  persistUsers();
  return { success: true, user };
}

/**
 * Returns all registered users
 */
export function getAllRegisteredUsers(): Omit<RegisteredUserRecord, "salt" | "hash">[] {
  return inMemoryUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    learningLevel: u.learningLevel,
    selectedIndustry: u.selectedIndustry,
    completedLabsCount: u.completedLabsCount,
    quizzesTakenCount: u.quizzesTakenCount,
    avgQuizScore: u.avgQuizScore
  }));
}

/**
 * Creates signed HMAC-SHA256 JWT session token for authenticated learner
 */
export function createUserSessionToken(user: RegisteredUserRecord): { token: string; expiresIn: number; expiresAt: string } {
  const iat = Math.floor(Date.now() / 1000);
  const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days session
  const exp = iat + expiresInSeconds;

  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: "LEARNER",
    learningLevel: user.learningLevel,
    selectedIndustry: user.selectedIndustry,
    iat,
    exp
  };

  const hEnc = Buffer.from(JSON.stringify(header)).toString("base64url");
  const pEnc = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SERVER_SECRET).update(`${hEnc}.${pEnc}`).digest("base64url");

  return {
    token: `${hEnc}.${pEnc}.${sig}`,
    expiresIn: expiresInSeconds,
    expiresAt: new Date(exp * 1000).toISOString()
  };
}

/**
 * Verifies user session token
 */
export function verifyUserSessionToken(token: string): { valid: boolean; payload?: any; error?: string } {
  if (!token || typeof token !== "string") return { valid: false, error: "Missing session token" };

  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false, error: "Malformed token" };

  const [h, p, s] = parts;
  const expSig = crypto.createHmac("sha256", SERVER_SECRET).update(`${h}.${p}`).digest("base64url");

  try {
    const bufA = Buffer.from(s);
    const bufB = Buffer.from(expSig);
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
      return { valid: false, error: "Invalid signature" };
    }
  } catch {
    return { valid: false, error: "Verification failure" };
  }

  try {
    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: "Session expired" };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Invalid payload format" };
  }
}
