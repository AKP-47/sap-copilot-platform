import { verifyOwnerPassword, createOwnerSessionToken, verifySessionToken, revokeSessionToken, authenticateOwnerRequest, DESIGNATED_OWNER_USERNAME } from "./api/_lib/auth";
import { getOwnerAnalyticsData } from "./api/_lib/analyticsData";

console.log("===============================================================");
console.log("       STARTING OWNER-ONLY ACCESS SECURITY VERIFICATION TEST   ");
console.log("===============================================================");

let passCount = 0;
let failCount = 0;

function assert(description: string, condition: boolean) {
  if (condition) {
    console.log(`[PASS] ✓ ${description}`);
    passCount++;
  } else {
    console.error(`[FAIL] ✕ ${description}`);
    failCount++;
  }
}

// TEST 1: Password Verification
console.log("\n--- 1. Owner Credentials Verification ---");
assert("Rejects wrong password", verifyOwnerPassword("WrongPassword123") === false);
assert("Rejects empty password", verifyOwnerPassword("") === false);
assert("Accepts correct owner password", verifyOwnerPassword("TagSkills@Owner2026!") === true);

// TEST 2: Unauthenticated Request to Admin API
console.log("\n--- 2. Unauthenticated Request Blocking ---");
const unauthReq = { headers: {} };
const unauthResult = authenticateOwnerRequest(unauthReq);
assert("Blocks unauthenticated request with status 401", unauthResult.authorized === false && unauthResult.status === 401);

// TEST 3: Forged / Malformed Token Request
console.log("\n--- 3. Forged / Tampered Token Blocking ---");
const forgedToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiT1dORVIifQ.invalid_fake_signature";
const forgedReq = { headers: { authorization: `Bearer ${forgedToken}` } };
const forgedResult = authenticateOwnerRequest(forgedReq);
assert("Blocks forged/tampered token with 401", forgedResult.authorized === false && forgedResult.status === 401);

// TEST 4: Learner Role Token Blocking (403 Forbidden)
console.log("\n--- 4. Learner Token Attempting Admin API ---");
// Manually generate a signed token with role = "LEARNER"
import crypto from "crypto";
const secret = process.env.JWT_SECRET || "tagskills-sap-owner-jwt-secret-key-2026-secure-prod";
const learnerPayload = {
  sub: "learner-12345",
  username: "learner@student.com",
  role: "LEARNER",
  name: "Normal Learner",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
};
const headerEnc = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
const payloadEnc = Buffer.from(JSON.stringify(learnerPayload)).toString("base64url");
const sigEnc = crypto.createHmac("sha256", secret).update(`${headerEnc}.${payloadEnc}`).digest("base64url");
const learnerToken = `${headerEnc}.${payloadEnc}.${sigEnc}`;

const learnerReq = { headers: { authorization: `Bearer ${learnerToken}` } };
const learnerResult = authenticateOwnerRequest(learnerReq);
assert("Blocks learner token from admin API with 403 Forbidden", learnerResult.authorized === false && learnerResult.status === 403);

// TEST 5: Legitimate Owner Authentication
console.log("\n--- 5. Owner Session Generation & Authorization ---");
const ownerSession = createOwnerSessionToken(DESIGNATED_OWNER_USERNAME);
assert("Generates valid session token", typeof ownerSession.token === "string" && ownerSession.token.length > 50);

const ownerReq = { headers: { authorization: `Bearer ${ownerSession.token}` } };
const ownerResult = authenticateOwnerRequest(ownerReq);
assert("Owner authenticated successfully with role OWNER", ownerResult.authorized === true && ownerResult.payload?.role === "OWNER");

// TEST 6: Private Analytics Data Generation for Owner
console.log("\n--- 6. Private Analytics Payload Validation ---");
const analytics = getOwnerAnalyticsData();
assert("Analytics contains summary stats", analytics.summary.totalVisitors > 0);
assert("Analytics contains 14-day trends", analytics.visitorTrends.length === 14);
assert("Analytics contains industry breakdown", analytics.industryUsage.length > 0);
assert("Analytics contains live activity", analytics.recentActivity.length > 0);

// TEST 7: Logout / Token Revocation
console.log("\n--- 7. Session Revocation / Logout ---");
revokeSessionToken(ownerSession.token);
const postLogoutResult = authenticateOwnerRequest(ownerReq);
assert("Post-logout request is rejected (session invalidated on server)", postLogoutResult.authorized === false && postLogoutResult.status === 401);

console.log("\n===============================================================");
console.log(`TEST RESULTS: ${passCount} Passed, ${failCount} Failed.`);
console.log("===============================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
