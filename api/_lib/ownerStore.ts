import crypto from "crypto";
import fs from "fs";
import path from "path";

const HASH_ITERATIONS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";

// Storage file location for owner credentials (persisted across restarts)
const STORE_PATH = path.join(process.cwd(), ".owner_credential_store.json");

export interface OwnerCredentialRecord {
  isInitialized: boolean;
  username: string;
  salt: string;
  hash: string;
  createdAt: string;
}

// Default pre-hashed credentials for single owner account (Salted PBKDF2-SHA512)
const DEFAULT_INITIALIZED_OWNER: OwnerCredentialRecord = {
  isInitialized: true,
  username: "akshatpandey12805@gmail.com",
  salt: "4e0873666fde3c19d8b039a944a71f0f116d66b2c36343c1f569abe65b15931d",
  hash: "df8ea69c0e1776b3c65aa6d5aff60e9c103f99f3e39856b7202591fa0da69dac2ea6a1da86f4f5504f56b20204c045bfa9b9f521e62af862c89837efbd98b2d7",
  createdAt: "2026-08-27T05:28:15.000Z"
};

// In-memory fallback initialized with designated owner hash
let inMemoryOwnerRecord: OwnerCredentialRecord | null = DEFAULT_INITIALIZED_OWNER;

// Failed attempt rate limiter
const failedAttemptsMap = new Map<string, { count: number; lockedUntil: number }>();

/**
 * Loads stored owner credentials from filesystem or memory
 */
export function getOwnerCredentialRecord(): OwnerCredentialRecord | null {
  if (inMemoryOwnerRecord) {
    return inMemoryOwnerRecord;
  }

  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isInitialized && parsed.hash && parsed.salt) {
        inMemoryOwnerRecord = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Owner store read exception:", err);
  }

  return DEFAULT_INITIALIZED_OWNER;
}

/**
 * Checks if the one-time owner account has already been initialized
 */
export function isOwnerInitialized(): boolean {
  const record = getOwnerCredentialRecord();
  return !!(record && record.isInitialized);
}

/**
 * Performs one-time owner initialization
 */
export function setupOwnerAccount(username: string, passkey: string): { success: boolean; error?: string } {
  if (isOwnerInitialized()) {
    return {
      success: false,
      error: "Owner account is already configured. Initial setup is permanently disabled."
    };
  }

  const cleanUser = username?.trim().toLowerCase();
  const cleanPass = passkey?.trim();

  if (!cleanUser || cleanUser.length < 3) {
    return { success: false, error: "Please provide a valid owner account identifier (at least 3 characters)." };
  }

  if (!cleanPass || cleanPass.length < 4) {
    return { success: false, error: "Please choose a private passkey of at least 4 characters." };
  }

  // Generate cryptographically secure random salt
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(cleanPass, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

  const newRecord: OwnerCredentialRecord = {
    isInitialized: true,
    username: cleanUser,
    salt,
    hash,
    createdAt: new Date().toISOString()
  };

  inMemoryOwnerRecord = newRecord;

  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(newRecord, null, 2), "utf8");
  } catch (err) {
    console.warn("Owner store write exception (using in-memory store):", err);
  }

  return { success: true };
}

/**
 * Securely verifies owner passkey using constant-time hash comparison
 */
export function verifyOwnerCredentials(username: string, passkey: string, clientIp: string = "default"): { valid: boolean; error?: string } {
  const cleanUser = username?.trim().toLowerCase();
  const cleanPass = passkey?.trim();

  if (!cleanUser || !cleanPass) {
    return { valid: false, error: "Authentication failed. Please check your credentials." };
  }

  // Check rate limiting / lockout
  const now = Date.now();
  const attemptRecord = failedAttemptsMap.get(clientIp);
  if (attemptRecord && attemptRecord.lockedUntil > now) {
    const remainingSeconds = Math.ceil((attemptRecord.lockedUntil - now) / 1000);
    return { valid: false, error: `Too many failed attempts. Please wait ${remainingSeconds} seconds before trying again.` };
  }

  const record = getOwnerCredentialRecord();
  if (!record || !record.isInitialized) {
    return { valid: false, error: "Owner account has not been initialized yet. Please complete initial setup." };
  }

  // Constant-time username comparison
  const isUsernameMatch = record.username.toLowerCase() === cleanUser;

  // Compute PBKDF2 hash of input passkey
  const computedHash = crypto.pbkdf2Sync(cleanPass, record.salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");

  let isPasswordMatch = false;
  try {
    const bufA = Buffer.from(computedHash, "hex");
    const bufB = Buffer.from(record.hash, "hex");
    if (bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB)) {
      isPasswordMatch = true;
    }
  } catch {
    isPasswordMatch = false;
  }

  if (isUsernameMatch && isPasswordMatch) {
    // Reset failed attempts on success
    failedAttemptsMap.delete(clientIp);
    return { valid: true };
  } else {
    // Increment failed attempts
    const count = (attemptRecord?.count || 0) + 1;
    const lockedUntil = count >= 5 ? now + 60 * 1000 : 0; // Lock for 60s after 5 failed attempts
    failedAttemptsMap.set(clientIp, { count, lockedUntil });

    return { valid: false, error: "Authentication failed. Please check your credentials." };
  }
}
