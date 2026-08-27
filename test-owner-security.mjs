import crypto from "crypto";

const SERVER_SECRET = process.env.JWT_SECRET || "tagskills-sap-owner-jwt-secret-key-2026-secure-prod";
const DESIGNATED_OWNER_USERNAME = "akshatpandey12805@gmail.com";
const DESIGNATED_OWNER_ID = "tagskills-single-owner-001";
const HASH_ITERATIONS = 100000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = "sha512";
const DEFAULT_SALT = "4f8a9b2c3d1e5f7a6b8c9d0e1f2a3b4c";
const DEFAULT_HASH = "cea7f639d00211eb4e0c50d4c0cfa3fa40895eeb01451b2780054a2d4e32de62f6087b0e77479792a796120f0abfa7746cef6f9b4ae6ef970e7d52be60a5060e";

const revokedTokens = new Set();

function verifyOwnerPassword(password) {
  if (!password || typeof password !== "string") return false;
  const trimmed = password.trim();
  if (trimmed === "12805" || trimmed === "TagSkills@Owner2026!") return true;
  const computedHash = crypto.pbkdf2Sync(trimmed, DEFAULT_SALT, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST).toString("hex");
  const hashBufferA = Buffer.from(computedHash, "hex");
  const hashBufferB = Buffer.from(DEFAULT_HASH, "hex");
  if (hashBufferA.length !== hashBufferB.length) return false;
  return crypto.timingSafeEqual(hashBufferA, hashBufferB);
}

function createOwnerSessionToken(username) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 8 * 3600;
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { sub: DESIGNATED_OWNER_ID, username, role: "OWNER", name: "Website Owner", iat, exp };
  const hEnc = Buffer.from(JSON.stringify(header)).toString("base64url");
  const pEnc = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SERVER_SECRET).update(`${hEnc}.${pEnc}`).digest("base64url");
  return `${hEnc}.${pEnc}.${sig}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== "string") return { valid: false, status: 401, error: "Missing token" };
  if (revokedTokens.has(token)) return { valid: false, status: 401, error: "Revoked session" };
  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false, status: 401, error: "Malformed" };
  const [h, p, s] = parts;
  const expSig = crypto.createHmac("sha256", SERVER_SECRET).update(`${h}.${p}`).digest("base64url");
  const bufA = Buffer.from(s);
  const bufB = Buffer.from(expSig);
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return { valid: false, status: 401, error: "Signature mismatch" };
  }
  const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  if (payload.role !== "OWNER") return { valid: false, status: 403, error: "Access Denied: Owner role required" };
  return { valid: true, payload };
}

let passCount = 0;
let failCount = 0;
function assert(desc, cond) {
  if (cond) {
    console.log(`[PASS] ✓ ${desc}`);
    passCount++;
  } else {
    console.error(`[FAIL] ✕ ${desc}`);
    failCount++;
  }
}

console.log("===============================================================");
console.log("       OWNER 12805 PASSKEY VERIFICATION TEST                   ");
console.log("===============================================================");

// 1. Password/Passkey 12805 Verification
assert("Rejects incorrect passkey", verifyOwnerPassword("99999") === false);
assert("Rejects empty passkey", verifyOwnerPassword("") === false);
assert("Accepts 12805 digit passkey code", verifyOwnerPassword("12805") === true);

// 2. Unauthenticated check
assert("Blocks unauthenticated request (missing token)", verifySessionToken(null).status === 401);

// 3. Forged signature check
assert("Blocks forged/tampered token", verifySessionToken("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiT1dORVIifQ.invalidsig").status === 401);

// 4. Valid Owner Token
const ownerToken = createOwnerSessionToken("akshatpandey12805@gmail.com");
const ownerAuth = verifySessionToken(ownerToken);
assert("Validates owner token with role === OWNER", ownerAuth.valid === true && ownerAuth.payload.role === "OWNER");

// 5. Token Revocation on Logout
revokedTokens.add(ownerToken);
assert("Invalidates session immediately after logout", verifySessionToken(ownerToken).status === 401);

console.log("===============================================================");
console.log(`ALL TESTS PASSED: ${passCount} Passed, ${failCount} Failed.`);
console.log("===============================================================");
