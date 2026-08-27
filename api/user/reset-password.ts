import { resetUserPassword } from "../_lib/userStore";

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

  const { email, token, newPassword } = body || {};

  if (!email || !token || !newPassword) {
    return res.status(400).json({ error: "Email, reset verification code, and new password are required." });
  }

  const result = await resetUserPassword(email, token, newPassword);

  if (!result.success) {
    return res.status(400).json({ error: result.error || "Password reset failed." });
  }

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully! You can now sign in with your new password."
  });
}
