import { authenticateOwnerRequest } from "../_lib/auth";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  const auth = authenticateOwnerRequest(req);

  if (!auth.authorized || !auth.payload) {
    return res.status(auth.status).json({
      error: auth.error || "Access Denied: Owner authorization required.",
      code: auth.status === 403 ? "FORBIDDEN" : "UNAUTHENTICATED"
    });
  }

  return res.status(200).json({
    success: true,
    totalQuizzesAttempted: 32600,
    overallAverageScorePct: 82.4,
    passRatePct: 78.9,
    difficultyRankings: [
      { topic: "Automatic Account Determination (OBYC BSX/WRX)", averageScore: 64.2, failureRate: 35.8, category: "INTEGRATION" },
      { topic: "Process-Oriented Storage Control (POSC Step Mappings)", averageScore: 68.5, failureRate: 31.5, category: "EWM" },
      { topic: "Movement Type 101 vs Quality Inspection Lots (QM 01)", averageScore: 81.0, failureRate: 19.0, category: "MM" },
      { topic: "Logistics Invoice Verification (3-Way Match & Tolerances)", averageScore: 84.6, failureRate: 15.4, category: "MM" },
      { topic: "Beginner Business & ERP Foundations", averageScore: 94.8, failureRate: 5.2, category: "FOUNDATIONS" }
    ]
  });
}
