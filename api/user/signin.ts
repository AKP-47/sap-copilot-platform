import { authenticateUserAsync, createUserSessionToken } from "../_lib/userStore";

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

  const { email, password } = body || {};

  const authResult = await authenticateUserAsync(email, password);

  if (!authResult.success || !authResult.user) {
    return res.status(401).json({
      error: authResult.error || "Incorrect email or password.",
      code: "INVALID_CREDENTIALS"
    });
  }

  const user = authResult.user;
  const session = createUserSessionToken(user);

  return res.status(200).json({
    success: true,
    message: "Signed in successfully. Welcome back!",
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
