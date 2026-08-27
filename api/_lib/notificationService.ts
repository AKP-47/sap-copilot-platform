import { recordRealEvent } from "./realAnalyticsStore";

export interface NewUserRegistrationPayload {
  name: string;
  email: string;
  registeredAt: string;
  learningLevel?: string;
  selectedIndustry?: string;
}

export async function sendOwnerNewUserAlert(user: NewUserRegistrationPayload): Promise<{ sent: boolean; method: string; note?: string }> {
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || "akshatpandey12805@gmail.com";
  const emailApiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY || "";
  const sendgridApiKey = process.env.SENDGRID_API_KEY || "";
  const fromEmail = process.env.EMAIL_FROM || "TagSkills SAP Copilot <onboarding@resend.dev>";

  const timestampFormatted = new Date(user.registeredAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium"
  });

  const emailSubject = "🎓 New SAP Copilot User Registration";
  const emailBodyText = `NEW USER REGISTERED

Name: ${user.name}

Email: ${user.email}

Registration Time: ${timestampFormatted}

Platform:
TagSkills SAP Copilot
`;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New SAP Copilot User Registration</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-w-md; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #0f172a; font-size: 22px; font-weight: 800; margin: 0 0 6px 0;">
        🎓 New SAP Copilot User Registration
      </h1>
      <p style="color: #64748b; font-size: 13px; margin: 0;">
        A new learner has registered on TagSkills SAP Copilot
      </p>
    </div>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Name:</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${user.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0; color: #0284c7; font-family: monospace; font-weight: 600;">${user.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Registration Time:</td>
          <td style="padding: 8px 0; color: #0f172a;">${timestampFormatted}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Platform:</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">TagSkills SAP Copilot</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px;">
      TagSkills Enterprise SAP MM & EWM Learning Platform
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
    title: `New Learner Account: ${user.name}`,
    metadata: {
      learningLevel: user.learningLevel,
      industryName: user.selectedIndustry,
      city: "Registered Learner",
      country: user.email
    }
  });

  // 2. If Resend / EMAIL_API_KEY is available (Primary Transactional Provider)
  if (emailApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${emailApiKey}`,
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
        console.info(`[TRANSACTIONAL EMAIL SENT] To: ${ownerEmail} via Resend API (ID: ${data?.id})`);
        return { sent: true, method: "RESEND_API", note: `Delivered via Resend (ID: ${data?.id})` };
      } else {
        console.warn("[Resend API Error]", res.status, data);
      }
    } catch (e) {
      console.warn("Resend notification error:", e);
    }
  }

  // 3. If SendGrid API key is available (Secondary Transactional Provider)
  if (sendgridApiKey) {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sendgridApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ownerEmail }] }],
          from: { email: "notifications@tagskills.com", name: "TagSkills SAP Copilot" },
          subject: emailSubject,
          content: [
            { type: "text/plain", value: emailBodyText },
            { type: "text/html", value: emailHtml }
          ]
        })
      });

      if (res.ok) {
        console.info(`[TRANSACTIONAL EMAIL SENT] To: ${ownerEmail} via SendGrid API`);
        return { sent: true, method: "SENDGRID_API" };
      }
    } catch (e) {
      console.warn("SendGrid notification error:", e);
    }
  }

  // 4. Default: Log alert in serverless log
  console.info(`[SERVER NOTIFICATION TO ${ownerEmail}]\n${emailBodyText}`);

  return {
    sent: false,
    method: "PENDING_API_KEY",
    note: "Set EMAIL_API_KEY (from resend.com) in Vercel Environment Variables to receive transactional emails directly in your inbox."
  };
}
