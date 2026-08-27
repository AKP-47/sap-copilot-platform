import { recordRealEvent } from "./realAnalyticsStore";

export interface NewUserRegistrationPayload {
  name: string;
  email: string;
  registeredAt: string;
  learningLevel?: string;
  learningInterests?: string;
  selectedIndustry?: string;
}

// In-memory deduplication set to avoid duplicate notification triggers
const notifiedUsersSet = new Set<string>();

export async function sendOwnerNewUserAlert(user: NewUserRegistrationPayload): Promise<{ sent: boolean; method: string; note?: string }> {
  const cleanEmail = user.email.toLowerCase().trim();

  // Deduplication check
  if (notifiedUsersSet.has(cleanEmail)) {
    console.info(`[NOTIFICATION DEDUP] Notification already sent for ${cleanEmail}. Skipping duplicate.`);
    return { sent: true, method: "DEDUP_SKIPPED", note: "Notification already sent for this user." };
  }

  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || "akshatpandey12805@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY || "";
  const fromEmail = process.env.EMAIL_FROM || "TagSkills SAP Copilot <onboarding@resend.dev>";

  const timestampFormatted = new Date(user.registeredAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium"
  });

  const level = user.learningLevel || "Beginner";
  const interests = user.learningInterests || user.selectedIndustry || "SAP MM & SAP EWM";

  // Exact Subject Requested by Owner
  const emailSubject = "🎉 New SAP Copilot Registration";

  // Exact Plain Text Body Requested by Owner
  const emailBodyText = `New learner registered on TagSkills SAP Copilot.

Name: ${user.name}
Email: ${user.email}
Learning Level: ${level}
Learning Interests: ${interests}
Registration Time: ${timestampFormatted}
`;

  // Professional Clean HTML Email
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New SAP Copilot Registration</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 32px 16px; color: #f8fafc;">
  <div style="max-width: 580px; margin: 0 auto; background: #1e293b; border-radius: 20px; border: 1px solid #334155; padding: 36px 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
    
    <!-- Brand Header -->
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="display: inline-block; background: #ffffff; padding: 8px 16px; border-radius: 12px; margin-bottom: 16px;">
        <span style="color: #0f172a; font-weight: 900; font-size: 16px; letter-spacing: -0.5px;">TagSkills Academy</span>
      </div>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0 0 8px 0; letter-spacing: -0.5px;">
        🎉 New SAP Copilot Registration
      </h1>
      <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5;">
        New learner registered on TagSkills SAP Copilot.
      </p>
    </div>

    <!-- Registration Details Card -->
    <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; width: 140px; border-bottom: 1px solid #1e293b;">Name:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 700; border-bottom: 1px solid #1e293b;">${user.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Email:</td>
          <td style="padding: 10px 0; color: #38bdf8; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 600; border-bottom: 1px solid #1e293b;">${user.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Learning Level:</td>
          <td style="padding: 10px 0; color: #fbbf24; font-weight: 700; border-bottom: 1px solid #1e293b;">${level}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #1e293b;">Learning Interests:</td>
          <td style="padding: 10px 0; color: #e2e8f0; font-weight: 600; border-bottom: 1px solid #1e293b;">${interests}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-weight: 600;">Registration Time:</td>
          <td style="padding: 10px 0; color: #cbd5e1;">${timestampFormatted}</td>
        </tr>
      </table>
    </div>

    <!-- Footer Platform Tag -->
    <div style="text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; padding-top: 20px;">
      <strong style="color: #94a3b8;">TagSkills Intelligent SAP MM & EWM Learning Platform</strong><br>
      Automated Owner Notification System
    </div>
  </div>
</body>
</html>
`;

  // 1. Record real event in telemetry store
  recordRealEvent({
    visitorId: `usr_${user.email}`,
    sessionId: `sess_${Date.now()}`,
    userName: user.name,
    eventType: "PAGE_VIEW",
    path: "/registered",
    title: `New Learner: ${user.name}`,
    metadata: {
      learningLevel: level,
      industryName: interests,
      city: "Registered Learner",
      country: user.email
    }
  });

  // Mark as notified in dedup set
  notifiedUsersSet.add(cleanEmail);

  // 2. Dispatch via Resend API
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [ownerEmail],
          subject: emailSubject,
          text: emailBodyText,
          html: emailHtml
        })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        console.info(`[RESEND EMAIL DELIVERED] To: ${ownerEmail} (ID: ${data?.id})`);
        return { sent: true, method: "RESEND_API", note: `Delivered to ${ownerEmail} (ID: ${data?.id})` };
      } else {
        console.warn("[Resend API Response Error]", res.status, data);
        return { sent: false, method: "RESEND_ERROR", note: data?.message || "Resend error" };
      }
    } catch (e: any) {
      console.warn("Resend fetch exception:", e);
      return { sent: false, method: "NETWORK_ERROR", note: e?.message };
    }
  }

  // 3. If API key not set yet, log in serverless stdout
  console.info(`[SERVER NOTIFICATION TO ${ownerEmail}]\n${emailBodyText}`);
  return {
    sent: false,
    method: "PENDING_API_KEY",
    note: "Set RESEND_API_KEY in Vercel to receive emails in your inbox."
  };
}
