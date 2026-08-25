import { InterviewItem } from "../types/sap";

export const INTERVIEW_BANK: InterviewItem[] = [
  {
    id: "int-01",
    module: "MM",
    category: "Procurement",
    tier: "Basic",
    question: "What is the difference between a Purchase Requisition and a Purchase Order?",
    idealAnswer: "A Purchase Requisition (PR) is an internal request document created by a department or generated automatically by MRP to notify purchasing of a material need. It has no legal standing with suppliers. A Purchase Order (PO) is an external, legally binding commercial contract sent to a vendor specifying prices, quantities, delivery dates, and payment terms.",
    keyPhrasesExpected: ["Internal request vs External legal contract", "MRP generation", "Vendor commitment", "Document types NB vs PR"],
    consultantThinkingTip: "Highlight that PRs drive internal budget checks and approvals, whereas POs establish legal financial liability and authorize warehouse receiving.",
    followUpQuestions: ["Can a PO be created without a PR?", "What is transaction ME59N used for?"],
    difficultyScore: 2
  },
  {
    id: "int-02",
    module: "MM",
    category: "Inventory Management",
    tier: "Intermediate",
    question: "Explain the complete accounting flow of Movement Type 101 Goods Receipt and subsequent MIRO Invoice Verification with price variance.",
    idealAnswer: "At 101 GR: System posts Debit to Raw Material Inventory (BSX) at Standard Price and Credit to GR/IR Clearing (WRX) at PO Price. If PO price differs from standard, variance posts to Price Difference (PRD). At MIRO: System posts Debit to GR/IR Clearing (WRX) for the received amount and Credit to Vendor AP (BSEG posting key 31) for invoice amount. If invoice price exceeds PO price: Debit Price Difference (PRD) for the variance.",
    keyPhrasesExpected: ["Debit BSX", "Credit WRX", "PRD Price Difference", "Credit Vendor AP", "3-Way Match"],
    consultantThinkingTip: "Always explain whether Price Control is Standard (S) or Moving Average (V) because that changes how variances are absorbed.",
    followUpQuestions: ["What happens if Price Control is Moving Average V and stock exists?", "How does MR11 clear open GR/IR balances?"],
    difficultyScore: 5
  },
  {
    id: "int-03",
    module: "EWM",
    category: "Advanced EWM",
    tier: "Advanced",
    question: "What is POSC (Process-Oriented Storage Control) and how does it differ from LOSC (Layout-Oriented Storage Control)?",
    idealAnswer: "POSC defines multi-step business process movements (e.g. Unloading -> Deconsolidation -> Quality Inspection -> Final Putaway) executed at logical work centers. LOSC defines physical layout constraints where a movement between two bins must physically pass through intermediate conveyor drop points, pick points, or elevators (e.g. Rack -> Conveyor ID-Point -> Staging Area). POSC answers WHAT steps must occur; LOSC answers HOW to navigate the physical facility.",
    keyPhrasesExpected: ["External Process Steps (UNLD, DECO, QIS, PTWY)", "Intermediate Work Centers", "Physical layout / Conveyor ID-Points", "Storage Process profile"],
    consultantThinkingTip: "Mention that POSC and LOSC can be combined in the same warehouse execution path.",
    followUpQuestions: ["How does EWM automatically trigger the next task in POSC?", "What table stores POSC storage processes (/SCWM/TPROCS)?"],
    difficultyScore: 8
  },
  {
    id: "int-04",
    module: "INTEGRATION",
    category: "MM + EWM Integration",
    tier: "Consultant",
    question: "A client experiences an issue where Goods Receipt is posted in EWM, but the 101 Material Document in MM is not generated. How do you troubleshoot the end-to-end integration architecture?",
    idealAnswer: "1) Check EWM Inbound Delivery in /SCWM/PRDI on the PPF Actions tab to verify if action /SCWM/MSG_PRD_SEND_ERP was triggered and executed (Green vs Red). 2) If PPF failed, check execution log in SPPFP. 3) If PPF succeeded, check qRFC Outbound Queue in EWM (SMQ1) and Inbound Queue in S/4HANA ERP (SMQ2) for queue names DLV* or WM*. 4) Inspect queue error payload (e.g. Posting Period closed in ERP M7053, Batch missing, or locked user). 5) Resolve ERP issue and restart queue in SMQ2.",
    keyPhrasesExpected: ["PPF Action (/SCWM/MSG_PRD_SEND_ERP)", "qRFC SMQ1/SMQ2", "Queue name DLV*", "Posting period check (MMRV/MMPV)", "Re-processing queue"],
    consultantThinkingTip: "Demonstrates high-level technical integration architecture knowledge combining PPF, qRFC, and ERP background execution.",
    followUpQuestions: ["How do you configure PPF action scheduling in /SCWM/IMG?", "What function module handles delivery replication (/SCWM/INB_DLV_SAVEREPLICA)?"],
    difficultyScore: 10
  }
];
