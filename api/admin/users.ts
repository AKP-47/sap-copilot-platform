import { authenticateOwnerRequest } from "../_lib/auth";
import { getAllRegisteredUsers } from "../_lib/userStore";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  // Strictly enforce server-side Owner authentication
  const auth = authenticateOwnerRequest(req);

  if (!auth.authorized || !auth.payload) {
    return res.status(auth.status).json({
      error: auth.error || "Access Denied: Owner authorization required.",
      code: auth.status === 403 ? "FORBIDDEN" : "UNAUTHENTICATED"
    });
  }

  const users = getAllRegisteredUsers();

  return res.status(200).json({
    success: true,
    totalCount: users.length,
    users
  });
}
