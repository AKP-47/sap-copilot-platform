import { verifyUserSessionToken, updateUserProfile } from "../_lib/userStore";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  const verification = verifyUserSessionToken(token);

  if (!verification.valid || !verification.payload) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }

  const userId = verification.payload.sub;

  if (req.method === "PUT" || req.method === "PATCH") {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON" });
      }
    }

    const { name, learningLevel, selectedIndustry } = body || {};
    const result = updateUserProfile(userId, { name, learningLevel, selectedIndustry });

    if (!result.success || !result.user) {
      return res.status(400).json({ error: result.error || "Profile update failed." });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        learningLevel: result.user.learningLevel,
        selectedIndustry: result.user.selectedIndustry,
        completedLabsCount: result.user.completedLabsCount,
        quizzesTakenCount: result.user.quizzesTakenCount,
        avgQuizScore: result.user.avgQuizScore
      }
    });
  }

  return res.status(200).json({
    success: true,
    user: verification.payload
  });
}
