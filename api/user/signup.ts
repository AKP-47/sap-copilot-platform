import { registerNewUser, createUserSessionToken } from "../_lib/userStore";
import { sendOwnerNewUserAlert } from "../_lib/notificationService";

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
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { name, email, password, learningLevel, selectedIndustry } = body || {};

  const regResult = registerNewUser({
    name,
    email,
    password,
    learningLevel,
    selectedIndustry
  });

  if (!regResult.success || !regResult.user) {
    return res.status(400).json({
      error: regResult.error || "Account creation failed.",
      code: regResult.code || "REGISTRATION_FAILED"
    });
  }

  const user = regResult.user;

  // Send server-side notification to Website Owner
  sendOwnerNewUserAlert({
    name: user.name,
    email: user.email,
    registeredAt: user.createdAt,
    learningLevel: user.learningLevel,
    selectedIndustry: user.selectedIndustry
  }).catch(err => console.warn("Owner alert error:", err));

  const session = createUserSessionToken(user);

  return res.status(201).json({
    success: true,
    message: "Account created successfully! Welcome to SAP Copilot.",
    token: session.token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      learningLevel: user.learningLevel,
      selectedIndustry: user.selectedIndustry,
      completedLabsCount: user.completedLabsCount,
      quizzesTakenCount: user.quizzesTakenCount,
      avgQuizScore: user.avgQuizScore
    }
  });
}
