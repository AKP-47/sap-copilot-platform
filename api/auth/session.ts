import { authenticateOwnerRequest } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const auth = authenticateOwnerRequest(req);

  if (!auth.authorized || !auth.payload) {
    return res.status(auth.status).json({
      authenticated: false,
      role: "LEARNER",
      error: auth.error || "Access Denied: Owner authorization required.",
      code: auth.status === 403 ? "FORBIDDEN" : "UNAUTHENTICATED"
    });
  }

  return res.status(200).json({
    authenticated: true,
    role: "OWNER",
    user: {
      id: auth.payload.sub,
      role: "OWNER",
      displayName: "Website Owner",
      username: auth.payload.username
    },
    expiresAt: new Date(auth.payload.exp * 1000).toISOString()
  });
}
