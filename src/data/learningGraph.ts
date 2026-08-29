// =========================================================================
// SAP MM CONSULTANT LEARNING GRAPH & TOPIC RELATIONSHIPS
// Connects prerequisites, related concepts, next recommended topics, and scenarios
// =========================================================================

export interface LearningGraphNode {
  topicId: string;
  title: string;
  level: "LEVEL_1" | "LEVEL_2" | "LEVEL_3" | "LEVEL_4" | "LEVEL_5";
  levelName: string;
  category: string;
  prerequisites: string[];
  unlocks: string[];
  relatedTopics: string[];
  keyQuestion: string;
  targetView: string;
  interviewTier: "Basic" | "Intermediate" | "Advanced" | "Scenario" | "Configuration" | "Troubleshooting" | "Consultant";
}

export const LEARNING_GRAPH: LearningGraphNode[] = [
  // ─── LEVEL 1: BEGINNER ──────────────────────────────────────────────────
  {
    topicId: "mm-s4hana-fundamentals",
    title: "SAP S/4HANA Fundamentals & Architecture",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Foundations",
    prerequisites: [],
    unlocks: ["mm-overview-business", "mm-enterprise-structure"],
    relatedTopics: ["mm-rise-grow-cloud", "mm-overview-business"],
    keyQuestion: "What is the architectural difference between classic ECC and S/4HANA in-memory computing?",
    targetView: "foundations",
    interviewTier: "Basic"
  },
  {
    topicId: "mm-overview-business",
    title: "SAP MM Overview & Business Functions",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Foundations",
    prerequisites: ["mm-s4hana-fundamentals"],
    unlocks: ["mm-enterprise-structure", "mm-material-master", "mm-business-partner"],
    relatedTopics: ["mm-enterprise-structure", "mm-procure-to-pay"],
    keyQuestion: "Why do enterprise organizations need SAP Materials Management, and how does it integrate with FI, CO, SD, and PP?",
    targetView: "mm",
    interviewTier: "Basic"
  },
  {
    topicId: "mm-enterprise-structure",
    title: "Enterprise Structure & Organizational Units",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Enterprise Structure",
    prerequisites: ["mm-overview-business"],
    unlocks: ["mm-material-master", "mm-business-partner", "mm-procure-to-pay"],
    relatedTopics: ["mm-material-master", "mm-obyc-account-determination"],
    keyQuestion: "How do Company Code, Plant, Storage Location, and Purchasing Organizations relate and assign in SPRO?",
    targetView: "mm",
    interviewTier: "Basic"
  },
  {
    topicId: "mm-material-master",
    title: "Material Master (MM01/MM02/MM03)",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Master Data",
    prerequisites: ["mm-enterprise-structure"],
    unlocks: ["mm-business-partner", "mm-procurement-master-data", "mm-procure-to-pay", "mm-inventory-goods-receipt"],
    relatedTopics: ["mm-business-partner", "mm-batch-management", "mm-mrp-planning"],
    keyQuestion: "What are the critical organizational views of Material Master, and how does Material Type (OMS2) control quantity and value updating?",
    targetView: "mm",
    interviewTier: "Basic"
  },
  {
    topicId: "mm-business-partner",
    title: "Business Partner (BP) & Customer-Vendor Integration (CVI)",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Master Data",
    prerequisites: ["mm-enterprise-structure"],
    unlocks: ["mm-procurement-master-data", "mm-procure-to-pay"],
    relatedTopics: ["mm-material-master", "mm-procurement-master-data"],
    keyQuestion: "How does the Business Partner concept replace classic vendor masters in S/4HANA, and what are the roles of FLVN00 and FLVN01?",
    targetView: "mm",
    interviewTier: "Basic"
  },
  {
    topicId: "mm-procurement-master-data",
    title: "Procurement Master Data (PIR & Source List)",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Master Data",
    prerequisites: ["mm-material-master", "mm-business-partner"],
    unlocks: ["mm-procure-to-pay", "mm-outline-agreements"],
    relatedTopics: ["mm-procure-to-pay", "mm-special-procurement"],
    keyQuestion: "How does a Purchasing Info Record (ME11) interact with a Source List (ME01) to automate vendor determination in Purchase Orders?",
    targetView: "mm",
    interviewTier: "Intermediate"
  },
  {
    topicId: "mm-procure-to-pay",
    title: "Procure-to-Pay (P2P) Complete Lifecycle",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Procurement",
    prerequisites: ["mm-material-master", "mm-procurement-master-data"],
    unlocks: ["mm-inventory-goods-receipt", "mm-outline-agreements", "mm-flexible-workflow", "mm-logistics-invoice-verification"],
    relatedTopics: ["mm-inventory-goods-receipt", "mm-logistics-invoice-verification", "mm-obyc-account-determination"],
    keyQuestion: "What is the complete document flow from Purchase Requisition to Payment, and what financial postings occur at GR and IR?",
    targetView: "mm",
    interviewTier: "Intermediate"
  },
  {
    topicId: "mm-inventory-goods-receipt",
    title: "Inventory Management & Goods Movements (MIGO)",
    level: "LEVEL_1",
    levelName: "Level 1 — Beginner",
    category: "Inventory Management",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-movement-types", "mm-special-procurement", "mm-obyc-account-determination"],
    relatedTopics: ["movement_lab", "mm-obyc-account-determination", "ewm"],
    keyQuestion: "What happens in SAP when Movement Type 101, 201, 261, or 311 is posted in MIGO?",
    targetView: "movement_lab",
    interviewTier: "Intermediate"
  },

  // ─── LEVEL 2: INTERMEDIATE ──────────────────────────────────────────────
  {
    topicId: "mm-outline-agreements",
    title: "Outline Agreements (Contracts & Scheduling Agreements)",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Procurement",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-pricing-procedure", "mm-special-procurement"],
    relatedTopics: ["mm-procure-to-pay", "mm-mrp-planning"],
    keyQuestion: "What is the functional difference between a Quantity Contract (MK), Value Contract (WK), and Scheduling Agreement (LP/LPA)?",
    targetView: "mm",
    interviewTier: "Intermediate"
  },
  {
    topicId: "mm-flexible-workflow",
    title: "Flexible Workflow & Release Strategies",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Procurement",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-consultant-challenges"],
    relatedTopics: ["mm-procure-to-pay", "mm-ricefw-specs"],
    keyQuestion: "How does S/4HANA Flexible Workflow for POs differ from classic Release Strategy (CEKKO)?",
    targetView: "mm",
    interviewTier: "Advanced"
  },
  {
    topicId: "mm-pricing-procedure",
    title: "Pricing Procedure & Condition Technique",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Configuration",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-obyc-account-determination", "mm-logistics-invoice-verification"],
    relatedTopics: ["mm-obyc-account-determination", "mm-logistics-invoice-verification"],
    keyQuestion: "How do Calculation Schema, Condition Types (PB00, FRA1), Access Sequences, and Schema Determination (OMFO) work together?",
    targetView: "mm",
    interviewTier: "Configuration"
  },
  {
    topicId: "mm-output-management-brf",
    title: "Output Management & BRF+ in S/4HANA",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Configuration",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-ricefw-specs"],
    relatedTopics: ["mm-procure-to-pay", "mm-ricefw-specs"],
    keyQuestion: "How does S/4HANA Output Management (OPD) using BRFplus decision tables replace classic NAST message determination?",
    targetView: "mm",
    interviewTier: "Configuration"
  },
  {
    topicId: "mm-service-procurement",
    title: "Service Procurement & Lean Services",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Procurement",
    prerequisites: ["mm-procure-to-pay"],
    unlocks: ["mm-logistics-invoice-verification"],
    relatedTopics: ["mm-procure-to-pay", "mm-logistics-invoice-verification"],
    keyQuestion: "How do S/4HANA Lean Services differ from classic Service Master (AC03) and Service Entry Sheets (ML81N)?",
    targetView: "mm",
    interviewTier: "Intermediate"
  },
  {
    topicId: "mm-batch-management",
    title: "Batch Management & Classification",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Inventory Management",
    prerequisites: ["mm-material-master", "mm-inventory-goods-receipt"],
    unlocks: ["mm-special-procurement", "ewm"],
    relatedTopics: ["mm-material-master", "ewm"],
    keyQuestion: "How is Batch Management configured at Client, Plant, or Material level, and how does SLED (Shelf Life Expiration Date) work?",
    targetView: "mm",
    interviewTier: "Intermediate"
  },
  {
    topicId: "mm-mrp-planning",
    title: "MRP & Material Requirements Planning (MRP Live)",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Planning",
    prerequisites: ["mm-material-master", "mm-procure-to-pay"],
    unlocks: ["mm-special-procurement", "mm-project-methodology"],
    relatedTopics: ["mm-material-master", "mm-outline-agreements"],
    keyQuestion: "How does MRP Live (MD01N) leverage in-memory HANA computing, and how do Reorder Point (VB) vs Deterministic (PD) planning types work?",
    targetView: "mm",
    interviewTier: "Advanced"
  },
  {
    topicId: "mm-special-procurement",
    title: "Special Procurement (Subcontracting, Consignment, Pipeline, STO, RTP)",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Special Procurement",
    prerequisites: ["mm-inventory-goods-receipt", "mm-procure-to-pay"],
    unlocks: ["mm-obyc-account-determination", "mm-ewm-integration-hub"],
    relatedTopics: ["movement_lab", "mm-obyc-account-determination", "integration"],
    keyQuestion: "What is the document flow, movement types, and accounting impact for Subcontracting (541/543/101), Consignment (101K/411K/MRKO), and STO (641/101)?",
    targetView: "mm",
    interviewTier: "Scenario"
  },
  {
    topicId: "mm-obyc-account-determination",
    title: "Automatic Account Determination & OBYC",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "FI Integration",
    prerequisites: ["mm-procure-to-pay", "mm-inventory-goods-receipt"],
    unlocks: ["mm-logistics-invoice-verification", "mm-consultant-challenges"],
    relatedTopics: ["obyc_sim", "mm-logistics-invoice-verification"],
    keyQuestion: "How does the system determine the exact GL Account during MIGO and MIRO using Chart of Accounts, Valuation Grouping Code, Valuation Class, and OBYC Transaction Keys (BSX, WRX, PRD, GBB)?",
    targetView: "obyc_sim",
    interviewTier: "Configuration"
  },
  {
    topicId: "mm-logistics-invoice-verification",
    title: "Logistics Invoice Verification (MIRO & 3-Way Match)",
    level: "LEVEL_2",
    levelName: "Level 2 — Intermediate",
    category: "Invoicing",
    prerequisites: ["mm-procure-to-pay", "mm-obyc-account-determination"],
    unlocks: ["mm-consultant-challenges", "mm-support-tickets"],
    relatedTopics: ["obyc_sim", "mm-procure-to-pay"],
    keyQuestion: "How does the 3-way match (PO vs GR vs Invoice) validate quantity and price tolerances in MIRO, and how does Evaluated Receipt Settlement (ERS) work?",
    targetView: "mm",
    interviewTier: "Troubleshooting"
  },

  // ─── LEVEL 3: ADVANCED ──────────────────────────────────────────────────
  {
    topicId: "mm-spro-customizing-deepdive",
    title: "SPRO Configuration & Functional Customizing",
    level: "LEVEL_3",
    levelName: "Level 3 — Advanced",
    category: "Configuration",
    prerequisites: ["mm-pricing-procedure", "mm-obyc-account-determination"],
    unlocks: ["mm-project-methodology", "mm-consultant-challenges"],
    relatedTopics: ["spro_guide", "mm-obyc-account-determination"],
    keyQuestion: "How do you configure custom PO document types, item categories, number ranges, and field selection control in SPRO?",
    targetView: "spro_guide",
    interviewTier: "Configuration"
  },
  {
    topicId: "mm-cross-module-troubleshooting",
    title: "Cross-Module Integration & Troubleshooting (RCA)",
    level: "LEVEL_3",
    levelName: "Level 3 — Advanced",
    category: "Troubleshooting",
    prerequisites: ["mm-obyc-account-determination", "mm-special-procurement"],
    unlocks: ["mm-support-tickets", "mm-consultant-challenges"],
    relatedTopics: ["error_doctor", "investigation"],
    keyQuestion: "What is the systematic methodology (What? Why? How? What can go wrong? How to investigate) when a cross-module posting fails between MM, FI, SD, and PP?",
    targetView: "error_doctor",
    interviewTier: "Troubleshooting"
  },

  // ─── LEVEL 4: CONSULTANT ────────────────────────────────────────────────
  {
    topicId: "mm-support-tickets",
    title: "Production Support & Incident Management (L1/L2/L3)",
    level: "LEVEL_4",
    levelName: "Level 4 — Consultant",
    category: "Consulting",
    prerequisites: ["mm-cross-module-troubleshooting", "mm-logistics-invoice-verification"],
    unlocks: ["mm-consultant-challenges", "mm-interview-engine"],
    relatedTopics: ["error_doctor", "investigation"],
    keyQuestion: "How do you triage P1/P2 tickets, manage SLAs, perform Root Cause Analysis (RCA), and deploy emergency transports to Production?",
    targetView: "investigation",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-consultant-challenges",
    title: "Consultant Mode: Client Problem Solving Simulator",
    level: "LEVEL_4",
    levelName: "Level 4 — Consultant",
    category: "Consulting",
    prerequisites: ["mm-support-tickets", "mm-special-procurement"],
    unlocks: ["mm-project-methodology", "mm-interview-engine"],
    relatedTopics: ["consultant_sim", "impact_sim"],
    keyQuestion: "When a client presents conflicting business constraints, how do you evaluate architectural trade-offs and articulate the optimal recommendation?",
    targetView: "consultant_sim",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-rise-grow-cloud",
    title: "RISE with SAP & GROW with SAP Cloud Transformation",
    level: "LEVEL_4",
    levelName: "Level 4 — Consultant",
    category: "Cloud Transformation",
    prerequisites: ["mm-s4hana-fundamentals"],
    unlocks: ["mm-project-methodology"],
    relatedTopics: ["foundations", "mm-project-methodology"],
    keyQuestion: "What factors dictate whether an enterprise should adopt RISE with SAP (Private Cloud) vs GROW with SAP (Public Cloud) vs 2-Tier Cloud ERP?",
    targetView: "mm",
    interviewTier: "Consultant"
  },

  // ─── LEVEL 5: PROJECT & ARCHITECT THINKING ──────────────────────────────
  {
    topicId: "mm-project-methodology",
    title: "SAP Activate Methodology & Implementation Lifecycle",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "Project Implementation",
    prerequisites: ["mm-consultant-challenges", "mm-rise-grow-cloud"],
    unlocks: ["mm-project-types-track", "mm-data-migration-ltmc", "mm-ricefw-specs"],
    relatedTopics: ["career", "consultant_sim"],
    keyQuestion: "What are the consultant deliverables and governance gates across the 6 Activate phases (Discover, Prepare, Explore, Realize, Deploy, Run)?",
    targetView: "career",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-project-types-track",
    title: "Implementation Project Types (Greenfield, Brownfield, Rollout)",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "Project Implementation",
    prerequisites: ["mm-project-methodology"],
    unlocks: ["mm-data-migration-ltmc"],
    relatedTopics: ["career", "consultant_sim"],
    keyQuestion: "How does the functional consultant's strategy and risk profile change across a Greenfield implementation vs Brownfield system conversion vs Global Plant Rollout?",
    targetView: "career",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-data-migration-ltmc",
    title: "Data Migration Strategy & Migration Cockpit (LTMC / LTMOM)",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "Data Migration",
    prerequisites: ["mm-project-methodology"],
    unlocks: ["mm-ricefw-specs", "mm-functional-documentation-lab"],
    relatedTopics: ["career", "wricef_builder"],
    keyQuestion: "What is the exact prerequisite sequence for data migration (BP -> Material -> PIR -> Source List -> Open POs -> Inventory 561) and how is triple-reconciliation executed?",
    targetView: "wricef_builder",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-ricefw-specs",
    title: "RICEFW Framework & Functional Specifications (FSD)",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "RICEFW",
    prerequisites: ["mm-project-methodology"],
    unlocks: ["mm-functional-documentation-lab", "mm-interview-engine"],
    relatedTopics: ["wricef_builder", "career"],
    keyQuestion: "How does a functional consultant author a comprehensive Functional Specification Document (FSD) for Reports, Interfaces, Conversions, Enhancements, Forms, and Workflows?",
    targetView: "wricef_builder",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-functional-documentation-lab",
    title: "Functional Documentation Laboratory (BRD, FDD, Cutover)",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "Documentation",
    prerequisites: ["mm-ricefw-specs"],
    unlocks: ["mm-interview-engine"],
    relatedTopics: ["study_notes", "wricef_builder"],
    keyQuestion: "How are BRD, FDD, Configuration Rationale, UAT test scripts, Cutover runbooks, and Hypercare defect logs structured and governed?",
    targetView: "study_notes",
    interviewTier: "Consultant"
  },
  {
    topicId: "mm-ewm-integration-hub",
    title: "MM + EWM End-to-End Deep Integration Hub",
    level: "LEVEL_5",
    levelName: "Level 5 — Project / Architect",
    category: "Integration",
    prerequisites: ["mm-special-procurement", "mm-inventory-goods-receipt"],
    unlocks: ["mm-interview-engine"],
    relatedTopics: ["integration", "ewm"],
    keyQuestion: "How do Purchase Orders, Inbound Deliveries, EWM Warehouse Requests, POSC/LOSC multi-step routing, and STOs integrate across the MM-EWM interface?",
    targetView: "integration",
    interviewTier: "Consultant"
  }
];
