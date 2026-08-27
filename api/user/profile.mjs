import crypto from "node:crypto";
const JWT_SECRET = process.env.JWT_SECRET || "tagskills-sap-copilot-secret-2026";
function verifyToken(token) {
  if (!token || typeof token !== "string") return { valid: false };
  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false };
  const [h, p, s] = parts;
  try {
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${p}`).digest("base64url");
    const bufA = Buffer.from(s, "base64url"), bufB = Buffer.from(expected, "base64url");
    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) return { valid: false };
    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return { valid: false };
    return { valid: true, payload };
  } catch { return { valid: false }; }
}
export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  const authHeader = (req.headers?.authorization || req.headers?.Authorization || "");
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const { valid, payload } = verifyToken(token);
  if (!valid || !payload) return res.status(401).json({ error: "Invalid or expired session." });
  return res.status(200).json({ success: true, user: { id: payload.sub, name: payload.name, email: payload.email, learningLevel: payload.learningLevel, selectedIndustry: payload.selectedIndustry, completedLabsCount: 0, quizzesTakenCount: 0, avgQuizScore: null } });
}
