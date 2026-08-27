import { createPasswordResetToken } from "../_lib/userStore";

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

  const { email } = body || {};
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const result = await createPasswordResetToken(email);

  // Send email with reset token via Resend if configured
  if (result.token && process.env.RESEND_API_KEY) {
    try {
      const fromEmail = process.env.EMAIL_FROM || "TagSkills SAP Copilot <onboarding@resend.dev>";
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject: "🔐 Your SAP Copilot Password Reset Code",
          text: `Your single-use password reset verification code is: ${result.token}\n\nThis code expires in 15 minutes.`,
          html: `<div style="font-family: sans-serif; padding: 20px;"><p>Your single-use password reset verification code is: <strong style="font-size: 20px; letter-spacing: 2px;">${result.token}</strong></p><p>This code expires in 15 minutes.</p></div>`
        })
      });
    } catch (err) {
      console.warn("Reset email send exception:", err);
    }
  }

  return res.status(200).json({
    success: true,
    message: "If an account exists with this email, a 6-digit verification code has been generated.",
    // For local testing convenience if Resend is not yet connected
    demoCode: !process.env.RESEND_API_KEY ? result.token : undefined
  });
}
