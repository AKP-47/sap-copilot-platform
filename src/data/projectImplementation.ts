// =========================================================================
// SAP MM PROJECT IMPLEMENTATION, METHODOLOGIES & CONSULTANT READINESS
// Source material aligned with TagSkills SAP S/4HANA Project Implementation Guide
// =========================================================================

export interface ImplementationPhase {
  phaseNumber: number;
  name: "Discover" | "Prepare" | "Explore" | "Realize" | "Deploy" | "Run";
  tagline: string;
  keyObjectives: string[];
  consultantDeliverables: string[];
  sampleActivities: string[];
  governanceGates: string[];
  commonPitfalls: string[];
}

export interface ProjectTypeProfile {
  id: "greenfield" | "brownfield" | "rollout" | "migration" | "enhancement" | "support";
  title: string;
  subtitle: string;
  whenUsed: string;
  coreStrategy: string;
  mmConsultantRole: string;
  keyPhasesAndFocus: string[];
  dataStrategy: string;
  topRisks: string[];
  realWorldProjectScenario: {
    client: string;
    background: string;
    challenge: string;
    consultantActionPlan: string[];
    outcome: string;
  };
}

export interface DataMigrationObject {
  sequenceOrder: number;
  objectName: string;
  category: "Master Data" | "Open Transactional Data" | "Inventory Balances";
  dependencies: string[];
  sapTool: string;
  stagingTableOrTemplate: string;
  keyFields: string[];
  validationRules: string[];
  reconciliationMethod: string;
  typicalErrors: {
    errorText: string;
    cause: string;
    resolution: string;
  }[];
}

export interface SupportTicketItem {
  id: string;
  tier: "L1 Support" | "L2 Support" | "L3 Support";
  priority: "P1 - Critical (4h SLA)" | "P2 - High (8h SLA)" | "P3 - Medium (24h SLA)" | "P4 - Low (72h SLA)";
  category: "Procurement" | "Inventory" | "Invoicing (LIV)" | "Workflow" | "Integration";
  ticketSummary: string;
  userDescription: string;
  impactOnBusiness: string;
  tcodesInvolved: string[];
  rootCauseInvestigation: {
    step1CollectInfo: string;
    step2CheckConfigOrData: string;
    step3RootCause: string;
    step4Resolution: string;
  };
  preventiveAction: string;
}

export interface RicefwTypeGuide {
  letter: "R" | "I" | "C" | "E" | "F" | "W";
  name: string;
  purpose: string;
  consultantResponsibilities: string[];
  abapDeveloperCollaboration: string;
  keyTechnologies: string[];
  sampleMmRequirements: {
    title: string;
    businessNeed: string;
    functionalSpecSummary: string;
    tablesAndLogic: string;
  }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SAP ACTIVATE METHODOLOGY PHASES (6 Core Lifecycle Stages)
// ─────────────────────────────────────────────────────────────────────────────
export const SAP_ACTIVATE_PHASES: ImplementationPhase[] = [
  {
    phaseNumber: 1,
    name: "Discover",
    tagline: "Explore cloud capabilities, evaluate business cases, and define transformation roadmap",
    keyObjectives: [
      "Experience SAP S/4HANA through free trial or standard value realization assessments",
      "Identify high-impact business improvements using SAP Signavio Process Insights",
      "Formulate project charter, executive business case, and strategic direction (RISE vs GROW vs Private Cloud)"
    ],
    consultantDeliverables: [
      "High-Level Solution Scope Statement",
      "Digital Transformation Roadmap & Business Value Assessment",
      "Architecture Recommendation Note (RISE with SAP / GROW with SAP)"
    ],
    sampleActivities: [
      "Review client legacy pain points in procurement (e.g. maverick buying, slow GR)",
      "Demonstrate standard SAP Fiori apps to business stakeholders",
      "Execute SAP Readiness Check to assess custom code & financial conversion impact"
    ],
    governanceGates: ["Strategic Alignment Sign-off", "Budget & Sponsorship Approval"],
    commonPitfalls: ["Failing to define executive ownership", "Treating Discover as a generic vendor presentation"]
  },
  {
    phaseNumber: 2,
    name: "Prepare",
    tagline: "Mobilize project team, provision starter systems, and align governance framework",
    keyObjectives: [
      "Establish Project Management Office (PMO), RACI matrix, and working team structure",
      "Provision SAP S/4HANA Cloud Starter System with pre-activated Best Practices",
      "Conduct Project Kick-off and train the core customer team on SAP Activate and Fiori navigation"
    ],
    consultantDeliverables: [
      "Project Charter & Team Mobilization Plan",
      "Fit-to-Standard Workshop Schedule & Scope List",
      "Initial Project Backlog (in SAP Cloud ALM / Jira)"
    ],
    sampleActivities: [
      "Set up user IDs for the core business process owners in the Starter System",
      "Review Scope Items (e.g. 22Z Direct Procurement, 1N8 Batch Management, 1V8 Stock Transfer)",
      "Establish team communication protocols and project change control board"
    ],
    governanceGates: ["Project Kick-off Completed", "Starter System Provisioned and Verified"],
    commonPitfalls: ["Jumping directly into configuration without training the customer on standard concepts", "Lack of clear business process owner representation"]
  },
  {
    phaseNumber: 3,
    name: "Explore",
    tagline: "Drive Fit-to-Standard workshops to validate standard processes and capture Delta requirements",
    keyObjectives: [
      "Demonstrate standard SAP Best Practice processes in live system workshops",
      "Identify Delta requirements (Gaps) where business cannot run on standard out-of-the-box logic",
      "Classify all Gaps into Configuration (SPRO), In-App Extensibility, BTP Side-by-Side apps, or RICEFW specifications"
    ],
    consultantDeliverables: [
      "Business Requirement Document (BRD) & Signed-off Process Flows",
      "Functional Specification Documents (FSD) for all approved RICEFW items",
      "Sprint Planning Backlog & Traceability Matrix (RTM)",
      "Data Migration Approach Document & Cutover Strategy"
    ],
    sampleActivities: [
      "Walkthrough end-to-end P2P flow: PR -> Release Strategy -> PO -> MIGO -> MIRO with client team",
      "Document client-specific PO print layout requirements and approval matrix limits",
      "Establish organizational structure blueprint (Company Code, Plant, SLoc, Purchasing Org)"
    ],
    governanceGates: ["Fit-to-Standard Workshop Sign-off", "Scope Baseline Locked (Change Control Active)"],
    commonPitfalls: ["Accepting customer requests for legacy custom screens without challenging with standard Fiori alternatives (Clean Core breach)", "Vague functional specs lacking exact table-field mapping"]
  },
  {
    phaseNumber: 4,
    name: "Realize",
    tagline: "Build, configure, integrate, test, and prepare data in iterative sprints",
    keyObjectives: [
      "Execute SPRO configuration in Development (DEV) system and transport to Quality (QAS)",
      "Develop and unit-test all approved RICEFW objects (Reports, Interfaces, Conversions, Enhancements, Forms, Workflows)",
      "Execute System Integration Testing (SIT) and User Acceptance Testing (UAT)",
      "Perform mock data migrations using SAP S/4HANA Migration Cockpit (LTMC / LTMOM)"
    ],
    consultantDeliverables: [
      "Configuration Rationale Document (CRD) with transport log",
      "Completed & Tested RICEFW Functional Specs with Unit Test logs",
      "SIT & UAT Test Scripts with signed execution results and Defect Log",
      "Data Migration Load Files & Reconciliation Sheets (Mock 1 & Mock 2)"
    ],
    sampleActivities: [
      "Configure OBYC automatic account determination (BSX, WRX, PRD, GBB, FR1) and verify with Finance team",
      "Coordinate with ABAP developers to build custom PO Form (Adobe Forms) and supplier EDI 850 interface",
      "Train key business users on executing end-to-end UAT test scenarios in QAS system"
    ],
    governanceGates: ["UAT Sign-off from Business Process Owners", "Mock Data Migration 2 Reconciliation >99.9%"],
    commonPitfalls: ["Incomplete SIT causing defects during UAT", "Postponing data cleansing until the last sprint", "Inadequate transport management discipline"]
  },
  {
    phaseNumber: 5,
    name: "Deploy",
    tagline: "Execute cutover activities, migrate production data, train end-users, and Go-Live",
    keyObjectives: [
      "Execute the hour-by-hour Cutover Runbook (infrastructure lockdown, delta data extract, upload, reconciliation)",
      "Conduct comprehensive End-User Training (EUT) with role-based quick reference guides",
      "Obtain formal Go/No-Go decision from executive steering committee",
      "Switch production operations to SAP S/4HANA and open the system for live transactions"
    ],
    consultantDeliverables: [
      "Hour-by-Hour Cutover Runbook & Tracking Sheet",
      "Production Data Migration Sign-off & Financial GL Trial Balance Match",
      "End-User Training Manuals & Standard Operating Procedures (SOPs)",
      "Go-Live Authorization Protocol"
    ],
    sampleActivities: [
      "Execute initial inventory upload (Movement Type 561) in Production with strict quantity/value balancing",
      "Load open Purchase Orders via Migration Cockpit and verify release status and delivered quantities",
      "Stand by on the manufacturing floor and receiving docks on Day 1 Go-Live to support real-time MIGO postings"
    ],
    governanceGates: ["Go/No-Go Decision Gate", "Cutover Verification & Production Open Sign-off"],
    commonPitfalls: ["Incomplete cutover simulation leading to cutover weekend timeline overrun", "Failure to lock down legacy ERP during final data extraction"]
  },
  {
    phaseNumber: 6,
    name: "Run",
    tagline: "Provide hypercare support, stabilize operations, optimize performance, and handover to AMS",
    keyObjectives: [
      "Deliver 24/7 or dedicated on-site Hypercare support for 30-90 days post Go-Live",
      "Triage and resolve Day-1 production tickets (L1/L2/L3) within agreed SLAs",
      "Conduct formal Knowledge Transfer (KT) and handover documentation to Application Management Services (AMS)",
      "Perform first Month-End and Quarter-End Financial Closing (GR/IR clearing MR11, Physical Inventory)"
    ],
    consultantDeliverables: [
      "Hypercare Incident Log & Root Cause Analysis (RCA) Reports",
      "AMS Handover Dossier (Configuration Guides, Interface Catalogs, Batch Job Schedules)",
      "First Month-End Closing Support Protocol & Lessons Learned Document"
    ],
    sampleActivities: [
      "Monitor daily inbound IDocs (WE02/BD87) for supplier ASN failures and resolve mapping errors",
      "Assist accounting team during first MIRO invoice payment run and verify GR/IR balances in F.13/MR11",
      "Conduct knowledge transfer sessions with offshore support team on custom PO release workflows"
    ],
    governanceGates: ["Hypercare Exit Criteria Met", "Formal Project Closure and AMS Sign-off"],
    commonPitfalls: ["Exiting hypercare prematurely before the first successful month-end close", "Unresolved root causes leading to recurring daily support tickets"]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. PROJECT TYPES DEEP-DIVE
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECT_TYPES_DATA: ProjectTypeProfile[] = [
  {
    id: "greenfield",
    title: "Greenfield Implementation (New Implementation)",
    subtitle: "Complete net-new installation of SAP S/4HANA starting with a clean slate",
    whenUsed: "Organizations adopting SAP for the first time, or legacy ECC customers with severe technical debt choosing a complete redesign.",
    coreStrategy: "Adopt standard SAP Best Practices, eliminate legacy custom modifications, and build a Clean Core architecture from ground up.",
    mmConsultantRole: "Lead enterprise structure definition (Company Code, Plant, SLoc, Purchasing Org), conduct Fit-to-Standard workshops, configure SPRO P2P from scratch, and lead full master/transactional data migration.",
    keyPhasesAndFocus: [
      "Explore: Fit-to-Standard validation against standard Best Practice scope items",
      "Realize: Clean SPRO IMG configuration and side-by-side BTP extensions",
      "Deploy: Full master data & open items migration via SAP Migration Cockpit"
    ],
    dataStrategy: "Clean master data upload (BP, Material, Info Records) + Open transactional documents only (Open POs, Open Deliveries, Stock 561). Historical closed POs remain in legacy archive.",
    topRisks: [
      "Scope creep if business attempts to rebuild old non-standard legacy screens",
      "Change resistance from end users accustomed to legacy tools"
    ],
    realWorldProjectScenario: {
      client: "BioPharm Global Consumables",
      background: "Scaling enterprise replacing 3 disparate legacy ERPs with one unified SAP S/4HANA Cloud system.",
      challenge: "Business users wanted 45 custom fields added to the Material Master and wanted PO approvals to mimic an outdated 8-tier paper hierarchy.",
      consultantActionPlan: [
        "Challenged legacy custom fields during Explore workshops — mapped 38 fields to standard SAP fields (MARA/MARC) and created only 7 via Fiori Custom Fields App.",
        "Demonstrated S/4HANA Flexible Workflow for POs with automatic condition routing, replacing the complex paper hierarchy with a 2-tier dynamic rule.",
        "Delivered a 100% Clean Core solution with zero core table modifications."
      ],
      outcome: "Successful go-live in 20 weeks with 92% standard best practice adoption."
    }
  },
  {
    id: "brownfield",
    title: "Brownfield Conversion (System Conversion)",
    subtitle: "1-step technical and functional conversion of an existing live ECC 6.0 system into S/4HANA",
    whenUsed: "Existing SAP ECC customers who want to retain decades of customized business logic, historical data (closed POs, old invoices), and minimize business disruption.",
    coreStrategy: "Execute prerequisite preparation (CVI conversion, S/4HANA Simplification Item checks, Financial ACDOCA table merge), run Software Update Manager (SUM) with Database Migration Option (DMO), and remediate custom ABAP code.",
    mmConsultantRole: "Execute Customer-Vendor Integration (CVI) to convert all LFA1/LFB1 vendors into Business Partners (BP), adjust custom code referencing replaced tables (e.g. MSEG/MKPF -> MATDOC, KONV -> PRCD_ELEMENTS), and configure S/4HANA Output Management (OPD/BRF+).",
    keyPhasesAndFocus: [
      "Prepare: SAP Readiness Check, CVI Pre-check, Simplification Item Catalog analysis",
      "Realize: CVI Synchronization (MDS_LOAD_COCKPIT), SUM/DMO conversion run in Sandbox",
      "Deploy: Production conversion over an extended cutover weekend"
    ],
    dataStrategy: "All master data, transactional history, and open items are converted in-place directly in the database. No external migration files needed.",
    topRisks: [
      "CVI synchronization errors (missing tax numbers, duplicate bank accounts, invalid postal codes)",
      "Custom ABAP code crashing due to obsolete SELECT statements on replaced tables",
      "Cutover weekend runtime exceeding the business downtime window"
    ],
    realWorldProjectScenario: {
      client: "EuroSteel Heavy Engineering",
      background: "Running SAP ECC 6.0 EHP6 on DB2 with 800,000 historical POs and 4,500 active suppliers.",
      challenge: "CVI pre-check failed for 1,200 vendor records due to overlapping account groups and duplicate tax IDs.",
      consultantActionPlan: [
        "Created an automated CVI data cleansing workbook to standardize tax numbers and reconcile duplicate vendor postal codes.",
        "Configured BP Grouping and Number Range alignment (Same Numbering where possible) in SPRO.",
        "Executed 3 dry-run conversion dress rehearsals, reducing cutover downtime from 48 hours to 26 hours."
      ],
      outcome: "Full system conversion completed over a weekend with 100% historical PO and invoice preservation."
    }
  },
  {
    id: "rollout",
    title: "Global Template Rollout",
    subtitle: "Deploying an established corporate SAP S/4HANA template to new plants, legal entities, or countries",
    whenUsed: "Multinational corporation acquiring a new business unit or building a new manufacturing facility in a new geographical region.",
    coreStrategy: "Enforce 80-90% global template standard processes while configuring 10-20% local statutory, legal, tax, and language requirements.",
    mmConsultantRole: "Create new Plant and Storage Location organizational units under existing Company Code, define new Purchasing Organization links, configure local tax codes and withholding taxes, and lead local user training and cutover.",
    keyPhasesAndFocus: [
      "Fit-Gap Analysis: Compare local plant operations against Global Template",
      "Localization Configuration: Local tax procedure (TAXINJ/TAXINN), E-Invoicing, local currency",
      "Data Migration: Local plant stock 561 upload and local open PO extraction"
    ],
    dataStrategy: "Extend global material master records to the new Plant (MARC/MARD) and create new local Business Partners (FLVN01 purchasing role for local suppliers).",
    topRisks: [
      "Local plant demanding unauthorized deviations from the corporate global template",
      "Statutory compliance gaps (e.g. GST in India, CFDI in Mexico, SAF-T in Europe)"
    ],
    realWorldProjectScenario: {
      client: "TransWorld FMCG Corporation",
      background: "Corporate template running in Germany; rolling out to a newly constructed manufacturing plant in Pune, India.",
      challenge: "Plant required local India GST calculation rules, HSN codes on Material Master, and local Vendor Consignment processes.",
      consultantActionPlan: [
        "Configured new Plant 2000 under existing Company Code, extended Global Material codes with mandatory HSN/SAC codes in Basic Data 1.",
        "Configured GST tax condition types (JCGST, JSGST, JIGST) in MM Pricing Procedure.",
        "Conducted end-to-end UAT with local warehouse supervisors for MIGO Goods Receipt with E-Way Bill capture."
      ],
      outcome: "Successful plant rollout in 14 weeks with 100% compliance with India GST regulations."
    }
  },
  {
    id: "support",
    title: "Support & AMS (Application Management Services)",
    subtitle: "Ongoing operational maintenance, incident resolution, bug fixing, and continuous improvement",
    whenUsed: "Post go-live steady-state operations across global enterprise landscapes.",
    coreStrategy: "Strict ITIL framework with defined SLAs for L1 (Helpdesk), L2 (Functional Configuration), and L3 (Complex RCA, Code Fix, Architectural change).",
    mmConsultantRole: "Investigate production incidents, perform root cause analysis (RCA), resolve stuck workflows, fix IDoc communication failures, resolve OBYC financial posting blocks, and implement minor change requests (CRs).",
    keyPhasesAndFocus: [
      "Ticket Triage: Prioritize P1/P2/P3/P4 tickets based on business revenue impact",
      "Root Cause Analysis: Inspect tables (EKKO, EKPO, BSEG, CDHDR), user authorizations, and SPRO",
      "Release Management: Bundle bug fixes and transport via Change Request into Production"
    ],
    dataStrategy: "Maintain data integrity, resolve stuck transactional queues (SMQ1/SMQ2), and run periodic GR/IR clearing maintenance (MR11).",
    topRisks: [
      "Applying quick temporary data patches without fixing underlying configuration or master data root cause",
      "SLA breaches on critical P1 production outages (e.g. warehouse receiving blocked)"
    ],
    realWorldProjectScenario: {
      client: "Global Logistics & Assembly Hub",
      background: "Live SAP S/4HANA production system processing 25,000 MIGO goods receipts daily.",
      challenge: "P1 Critical Incident: MIGO goods receipts failing across 4 plants with error 'Account determination for entry 1000 GBB ____ 3000 not possible'. Assembly lines faced imminent shutdown.",
      consultantActionPlan: [
        "Immediately analyzed transaction MIGO, identified Movement Type 551 (Scrapping) was being posted with a newly created Raw Material (Valuation Class 3000).",
        "Checked T-Code OBYC -> Transaction Key GBB -> Account Modifier VNG (Scrapping). Discovered the GL Account was missing for Valuation Class 3000.",
        "Coordinated with FI Lead, updated SPRO OBYC mapping in DEV, generated emergency transport, tested in QAS, and imported to PRD within 45 minutes (within 4h P1 SLA)."
      ],
      outcome: "P1 resolved, MIGO unblocked, zero assembly line stoppage, root cause documented with automated SPRO validation guardrail."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. SAP MM DATA MIGRATION TRACK (LTMC / Migration Cockpit)
// ─────────────────────────────────────────────────────────────────────────────
export const DATA_MIGRATION_SEQUENCE: DataMigrationObject[] = [
  {
    sequenceOrder: 1,
    objectName: "Business Partner (Suppliers / Vendors)",
    category: "Master Data",
    dependencies: ["Company Code", "Purchasing Organization", "Payment Terms", "Reconciliation Accounts"],
    sapTool: "SAP S/4HANA Migration Cockpit (T-Code: LTMC / Fiori App F3473)",
    stagingTableOrTemplate: "SIF_VENDOR / Migration Cockpit XML Template",
    keyFields: ["BP Role (FLVN00, FLVN01)", "Supplier Account Group", "Tax Number / VAT ID", "Recon Account", "Purchasing Currency", "Payment Terms"],
    validationRules: [
      "Postal code format must match country validation rule",
      "Tax number must be validated against statutory format",
      "Reconciliation Account must exist in Chart of Accounts and have open item management enabled"
    ],
    reconciliationMethod: "Record count comparison (Legacy extract vs BUT000/LFA1/LFB1) + Sample audit of 50 suppliers across different account groups.",
    typicalErrors: [
      {
        errorText: "Account Group not assigned to BP Grouping in CVI",
        cause: "SPRO mapping between legacy vendor account group and S/4HANA BP Grouping is missing.",
        resolution: "Configure T-Code SPRO -> Cross-Application Components -> Master Data Synchronization -> Customer/Vendor Integration (CVI) -> Define BP Grouping and Assign Number Ranges."
      }
    ]
  },
  {
    sequenceOrder: 2,
    objectName: "Material Master",
    category: "Master Data",
    dependencies: ["Units of Measurement (CUNI)", "Material Groups (OMSF)", "Material Types (OMS2)", "Valuation Classes"],
    sapTool: "SAP S/4HANA Migration Cockpit (Migration Object: Product)",
    stagingTableOrTemplate: "SIF_PRODUCT / Migration Cockpit XML Template",
    keyFields: ["Material Code", "Material Type", "Base UoM", "Material Group", "Plant", "Storage Location", "Purchasing Group", "Valuation Class", "Price Control (S/V)", "Moving Avg / Standard Price"],
    validationRules: [
      "Base UoM must match ISO code in SAP table T006",
      "Valuation Class must be permitted for the assigned Material Type in SPRO table T025",
      "Standard Price / Moving Average Price must be greater than zero for valuated materials"
    ],
    reconciliationMethod: "Total count match in MARA/MARC/MBEW + Total inventory baseline valuation check against legacy GL inventory balance.",
    typicalErrors: [
      {
        errorText: "Unit of Measure PCE not recognized",
        cause: "Legacy export used 'PCE' while SAP system expects 'PC' (ISO code EA).",
        resolution: "Add a value mapping rule in LTMC / LTMOM to map legacy 'PCE' -> SAP 'PC'."
      }
    ]
  },
  {
    sequenceOrder: 3,
    objectName: "Purchasing Info Record (PIR)",
    category: "Master Data",
    dependencies: ["Business Partner (Supplier)", "Material Master", "Purchasing Organization", "Plant"],
    sapTool: "SAP S/4HANA Migration Cockpit (Migration Object: Purchasing Info Record)",
    stagingTableOrTemplate: "SIF_INFO_REC / Migration XML",
    keyFields: ["Supplier Number", "Material Number", "Purchasing Org", "Plant", "Info Category (0 Standard, 2 Consignment, 3 Subcontracting, 4 Pipeline)", "Net Price", "Currency", "Planned Delivery Time", "Tax Code"],
    validationRules: [
      "Both Supplier and Material must already exist in target system",
      "Net price must be positive and currency must match Purchasing Org currency",
      "Planned Delivery Time must be between 0 and 999 days"
    ],
    reconciliationMethod: "Row count comparison in tables EINA (General Data) and EINE (Purchasing Org Data).",
    typicalErrors: [
      {
        errorText: "Material not maintained in plant 1000",
        cause: "Material master was loaded at Client level but missing Plant-level extension in MARC.",
        resolution: "Extend material master to target plant before executing PIR migration."
      }
    ]
  },
  {
    sequenceOrder: 4,
    objectName: "Source List",
    category: "Master Data",
    dependencies: ["Material Master", "Supplier BP", "Purchasing Organization", "Purchasing Info Record"],
    sapTool: "SAP S/4HANA Migration Cockpit / LSMW / Direct Input BAPI",
    stagingTableOrTemplate: "Migration XML Template / BAPI_SOURCELIST_CREATE",
    keyFields: ["Material", "Plant", "Valid From", "Valid To", "Supplier", "Purchasing Org", "Fixed Supplier Indicator", "Blocked Supplier Indicator", "MRP Indicator"],
    validationRules: [
      "Valid From date must be earlier than Valid To date",
      "Validity periods for the same supplier must not overlap",
      "Material must have 'Source List Requirement' flag checked if enforced"
    ],
    reconciliationMethod: "Compare active records count in table EORD against legacy approved vendor list.",
    typicalErrors: [
      {
        errorText: "Validity period overlaps with existing source list record",
        cause: "Duplicate date ranges in the source Excel load file.",
        resolution: "Cleanse date ranges in load file so each supplier has distinct non-overlapping validity windows."
      }
    ]
  },
  {
    sequenceOrder: 5,
    objectName: "Open Purchase Orders (Open POs)",
    category: "Open Transactional Data",
    dependencies: ["Business Partner", "Material Master", "Purchasing Org", "Payment Terms", "Tax Codes", "GL Accounts"],
    sapTool: "SAP S/4HANA Migration Cockpit (Migration Object: Purchase Order - Open Items)",
    stagingTableOrTemplate: "SIF_PO / Migration XML",
    keyFields: ["Legacy PO Number", "PO Document Type (NB/ZNB)", "Supplier", "Purchasing Org", "Plant", "Material", "Open Quantity (Ordered minus Delivered)", "PO Net Price", "Delivery Date", "Account Assignment Category", "Tax Code"],
    validationRules: [
      "Only PO line items with remaining open quantity (MENGE > WEMNG) should be migrated",
      "Delivery Date must be in the future or within current fiscal period",
      "Do NOT migrate historical closed POs into live transaction tables"
    ],
    reconciliationMethod: "Sum of Open PO Quantity and Open PO Financial Commitment in EKKO/EKPO compared to legacy cutover extract report.",
    typicalErrors: [
      {
        errorText: "Delivery date is in the past",
        cause: "Legacy PO had an unfulfilled delivery date from months ago.",
        resolution: "Set default delivery date to Cutover Date + Planned Delivery Time in migration transformation rule."
      }
    ]
  },
  {
    sequenceOrder: 6,
    objectName: "Initial Inventory Balances (Stock Upload)",
    category: "Inventory Balances",
    dependencies: ["Material Master with Accounting View", "Storage Locations", "Valuation Class", "Inventory GL Accounts (BSX)"],
    sapTool: "Movement Type 561 / BAPI_GOODSMVT_CREATE / Migration Cockpit",
    stagingTableOrTemplate: "Direct Input BAPI / CSV Upload / Migration Cockpit",
    keyFields: ["Material Number", "Plant", "Storage Location", "Stock Type (Unrestricted, QI, Blocked)", "Quantity", "Batch Number", "Valuation Type (for split valuation)", "Unit of Measure"],
    validationRules: [
      "Total quantity uploaded per material must equal physical count sign-off sheet",
      "Inventory financial balance resulting from 561 (Debit Inventory BSX, Credit Initial Stock Takeoff offsetting account) must match general ledger trial balance to the exact cent",
      "Storage location must be valid and non-EWM managed for classic 561, or mapped to EWM staging bin for EWM initial load"
    ],
    reconciliationMethod: "Triple-reconciliation: 1) Physical stock sheet quantity vs MB52/MMBE, 2) MATDOC material document valuation vs legacy inventory ledger, 3) Trial balance GL Account (BSX) vs Finance Cutover balance.",
    typicalErrors: [
      {
        errorText: "Stock balance discrepancy between subledger and general ledger",
        cause: "Standard price in Material Master was updated after inventory upload file was generated.",
        resolution: "Lock Material Master price changes in SPRO during cutover weekend until 561 upload is completed and reconciled."
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. RICEFW SPECIFICATION FRAMEWORK & FUNCTIONAL CONSULTANT ROLE
// ─────────────────────────────────────────────────────────────────────────────
export const RICEFW_FRAMEWORK: RicefwTypeGuide[] = [
  {
    letter: "R",
    name: "Reports",
    purpose: "Extract, analyze, and present data where standard SAP reports (e.g. ME2N, MB52) do not satisfy business analytical needs.",
    consultantResponsibilities: [
      "Identify exact business reporting gaps during Fit-to-Standard workshops",
      "Define Selection Screen parameters (Plant, Date Range, Purchasing Group)",
      "Specify exact table-field logic (e.g. EKKO, EKPO, EKBE, MATDOC) and calculation rules",
      "Define output layout format (ALV Grid, Fiori Analytical Card, Excel download)"
    ],
    abapDeveloperCollaboration: "Provide ABAPer with pseudo-code, inner/outer join rules, index recommendations to prevent full table scans, and authorization checks (AUTHORITY-CHECK OBJECT 'M_BEST_WRK').",
    keyTechnologies: ["SAP Core Data Services (CDS Views)", "Fiori Elements List Report", "Classic ABAP ALV Grid (REUSE_ALV_GRID_DISPLAY)"],
    sampleMmRequirements: [
      {
        title: "Vendor On-Time In-Full (OTIF) Delivery Performance Report",
        businessNeed: "Procurement VP requires real-time dashboard comparing PO scheduled delivery date against MIGO goods receipt posting date across top 100 suppliers.",
        functionalSpecSummary: "Custom CDS View extracting EKET (PO Delivery Schedule), EKBE (PO History), and LFA1 (Supplier Name). Calculates OTIF %: (On-Time Quantity / Total Ordered Quantity) * 100.",
        tablesAndLogic: "Join EKKO -> EKPO -> EKET -> EKBE (VGABE = '1'). Logic: Compare EKBE-BUDAT with EKET-EINDT. Flag as On-Time if BUDAT <= EINDT."
      }
    ]
  },
  {
    letter: "I",
    name: "Interfaces",
    purpose: "Bi-directional electronic data exchange between SAP S/4HANA and external third-party systems (e.g. Supplier EDI, 3PL Warehouse, Coupa, Ariba).",
    consultantResponsibilities: [
      "Define interface trigger events (e.g. PO Save, GR Confirmation, ASN Inbound)",
      "Create detailed Field-by-Field Mapping Sheet between SAP fields and external schema (EDI 850/855/856)",
      "Define error handling protocol, notification email alerts, and failed transaction reprocessing rules"
    ],
    abapDeveloperCollaboration: "Define IDoc message types (e.g. ORDERS05, DESADV), partner profiles (WE20), BAPIs, or REST/OData API endpoints in SAP Gateway (SEGW).",
    keyTechnologies: ["IDocs / ALE", "OData / REST APIs", "SAP BTP Integration Suite (Cloud Integration / CPI)", "qRFC (SMQ1/SMQ2)"],
    sampleMmRequirements: [
      {
        title: "Electronic Purchase Order Outbound Interface (EDI 850 / ORDERS05)",
        businessNeed: "Automatically transmit approved Purchase Orders to suppliers electronically upon final release.",
        functionalSpecSummary: "Output Management trigger via BRFplus / NAST generates outbound IDoc ORDERS05. Transmitted via SAP BTP Integration Suite to supplier portal.",
        tablesAndLogic: "Extracts EKKO (Header), EKPO (Line Items), EKKN (Account Assignment), and EDIDC (Control Record). Maps EKKO-EBELN -> E1EDK01-BELNR, EKPO-MATNR -> E1EDP19-IDTNR."
      }
    ]
  },
  {
    letter: "C",
    name: "Conversions",
    purpose: "Programs and scripts designed to extract, transform, cleanse, and upload legacy data into SAP S/4HANA during cutover.",
    consultantResponsibilities: [
      "Prepare data mapping specifications between legacy fields and SAP data dictionary",
      "Define data transformation rules (e.g. legacy vendor code 'V-100' -> SAP BP '100050')",
      "Execute validation test loads in sandbox and sign off reconciliation reports with business"
    ],
    abapDeveloperCollaboration: "Configure SAP Migration Cockpit rules in LTMOM, or develop custom pre-validation extraction ABAP programs.",
    keyTechnologies: ["SAP S/4HANA Migration Cockpit (LTMC / LTMOM)", "Direct Input BAPIs (BAPI_PO_CREATE1, BAPI_MATERIAL_SAVEDATA)", "CSV / Staging Tables"],
    sampleMmRequirements: [
      {
        title: "Open Purchase Order Data Migration Conversion",
        businessNeed: "Extract remaining unfulfilled PO lines from legacy Oracle system, validate against new S/4HANA Material Codes, and create open POs in S/4HANA.",
        functionalSpecSummary: "Transformation script maps legacy vendor IDs to newly generated S/4HANA BP IDs using lookup table. Uploads via BAPI_PO_CREATE1 with Migration Document Type 'ZOPN'.",
        tablesAndLogic: "Validates against MARC (Plant status) and LFB1 (Company Code vendor status). Post-load checks compare total open commitments."
      }
    ]
  },
  {
    letter: "E",
    name: "Enhancements",
    purpose: "Injecting custom business logic into standard SAP transactions without modifying standard SAP source code.",
    consultantResponsibilities: [
      "Determine exact business requirement and identify standard validation gaps",
      "Search for standard SAP enhancement hooks (BAdIs, User Exits, Customer Exits, Enhancement Spots)",
      "Specify exact trigger conditions and error message numbers (SE91) displayed to user"
    ],
    abapDeveloperCollaboration: "Provide developer with BAdI name (e.g. ME_PROCESS_PO_CUST), method to implement (e.g. CHECK, PROCESS_ITEM), and precise validation logic.",
    keyTechnologies: ["Business Add-Ins (BAdIs)", "Enhancement Spots (Implicit / Explicit)", "Customer Exits (SMOD/CMOD)", "In-App Key User Extensibility"],
    sampleMmRequirements: [
      {
        title: "Custom Purchase Order Validation (Block POs exceeding Budget Limit)",
        businessNeed: "Prevent buyers from saving Purchase Orders for Plant 1000 if the order line net value exceeds $50,000 without mandatory Attachment / Quotation Reference.",
        functionalSpecSummary: "Implement BAdI ME_PROCESS_PO_CUST method CHECK. If EKPO-NETWR > 50000 and EKPO-SUBMI is blank, raise Error Message ZMM_001: 'Quotation reference required for orders above $50k'.",
        tablesAndLogic: "Inspects MEPOITEM-NETPR and MEPOITEM-KNTTP. Throws error preventing document commit until condition is satisfied."
      }
    ]
  },
  {
    letter: "F",
    name: "Forms",
    purpose: "Printable and electronic business documents generated for external or internal communication (e.g. Purchase Order printout, Goods Receipt slip).",
    consultantResponsibilities: [
      "Provide graphic designer / developer with visual layout mockup showing header logo, company address, line items, and terms & conditions footer",
      "Define dynamic logic: show/hide pricing for subcontracting, print tax breakdown per line item, multi-language translation rules",
      "Test print outputs across different printer drivers and PDF preview channels"
    ],
    abapDeveloperCollaboration: "Map S/4HANA data interface to Adobe Form context schema and coordinate with Form developer on JavaScript / FormCalc formatting.",
    keyTechnologies: ["Adobe Forms (XFA / PDF-based Print Forms)", "SmartForms (Classic)", "SAP S/4HANA Output Management (OPD)"],
    sampleMmRequirements: [
      {
        title: "Official Corporate Purchase Order Adobe Form",
        businessNeed: "Professional branded Purchase Order PDF document sent to suppliers with dynamic QR code, digital signature block, and legal terms.",
        functionalSpecSummary: "Adobe Form interface pulling EKKO (PO Header), EKPO (Items), ADRC (Vendor Address), T001W (Plant Address). Triggers on PO Release via OPD Output Channel 'EMAIL'.",
        tablesAndLogic: "Formats line items table with Material description, HSN code, Quantity, Unit Price, Line Total, and Tax Summary box."
      }
    ]
  },
  {
    letter: "W",
    name: "Workflows",
    purpose: "Automated routing of business documents for review, electronic approval, or rejection across managerial hierarchies.",
    consultantResponsibilities: [
      "Define approval matrix: Threshold amounts, cost center approvers, purchasing group routing rules, and escalation timeouts",
      "Specify email notification templates sent to approvers' inbox and mobile devices (My Inbox Fiori App)",
      "Define rejection handling: Return document to buyer with mandatory rejection reason comment"
    ],
    abapDeveloperCollaboration: "Configure S/4HANA Flexible Workflow in Fiori App 'Manage Workflows for Purchase Orders' or configure classic Workflow template WS20000075 in SWDD.",
    keyTechnologies: ["S/4HANA Flexible Workflow", "SAP Fiori App 'My Inbox' (F0862)", "Classic SAP Business Workflow (SWDD / SWDD_CONFIG)"],
    sampleMmRequirements: [
      {
        title: "Multi-Tier S/4HANA Flexible Workflow for Purchase Orders",
        businessNeed: "POs <= $10k auto-approved; $10k - $50k requires Procurement Manager approval; > $50k requires Plant Director and CFO approval.",
        functionalSpecSummary: "Configured via Fiori App 'Manage Workflows for Purchase Orders' (Scenario ID: WS00800238). Evaluates preconditions on Total Net Amount and Plant.",
        tablesAndLogic: "Evaluates EKKO-RLWRT (Total Release Value). Dispatches work items to SAP Fiori 'My Inbox' with Push Notifications."
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. PRODUCTION SUPPORT TICKETS (L1 / L2 / L3 Simulator Bank)
// ─────────────────────────────────────────────────────────────────────────────
export const PRODUCTION_SUPPORT_TICKETS: SupportTicketItem[] = [
  {
    id: "tkt-mm-001",
    tier: "L2 Support",
    priority: "P1 - Critical (4h SLA)",
    category: "Inventory",
    ticketSummary: "MIGO Goods Receipt blocked for Plant 1000 with error 'Account determination for entry 1000 BSX ____ 3000 not possible'",
    userDescription: "Receiving dock staff at Munich Engine Plant cannot post Goods Receipt for 200 units of raw materials arriving from Bosch. Physical trucks are waiting at the dock gate.",
    impactOnBusiness: "Trucks backing up at warehouse gate; production assembly line will run out of cylinder heads within 3 hours.",
    tcodesInvolved: ["MIGO", "OBYC", "MM03", "FS00"],
    rootCauseInvestigation: {
      step1CollectInfo: "Check material number in PO (MAT-1040), verify Valuation Class assigned in Accounting 1 view in MM03 (Valuation Class: 3000 Raw Materials). Check Company Code (1000) Chart of Accounts (INT).",
      step2CheckConfigOrData: "Launch T-Code OBYC -> select Transaction Key BSX (Inventory Posting) -> enter Chart of Accounts INT. Check if Valuation Class 3000 has a GL Account assigned.",
      step3RootCause: "Finance recently created a new Chart of Accounts extension but omitted the GL Account mapping for Valuation Class 3000 under Transaction Key BSX in SPRO.",
      step4Resolution: "Maintain GL Account 200000 (Raw Material Inventory) for Valuation Class 3000 under OBYC BSX. Transport to PRD. MIGO goods receipt posted successfully."
    },
    preventiveAction: "Implement SPRO transport checklist requiring dual sign-off between MM Lead and FI Lead whenever a new Valuation Class is introduced."
  },
  {
    id: "tkt-mm-002",
    tier: "L2 Support",
    priority: "P2 - High (8h SLA)",
    category: "Workflow",
    ticketSummary: "Purchase Order #4500089201 stuck in 'In Release' status; approver cannot see work item in Fiori My Inbox",
    userDescription: "Buyer created a $120,000 PO for capital machinery yesterday. The Purchasing Director is ready to approve, but the document does not appear in their Fiori My Inbox.",
    impactOnBusiness: "Supplier cannot begin machine fabrication; scheduled delivery date at risk.",
    tcodesInvolved: ["ME23N", "SWIA", "SWI1", "SWI6", "SU01"],
    rootCauseInvestigation: {
      step1CollectInfo: "Open PO in ME23N, check Header -> 'Release Strategy' or 'Flexible Workflow' tab. Verify current release state and designated approver user ID.",
      step2CheckConfigOrData: "Launch SWIA / SWI1 to inspect the workflow instance container. Check if the work item was generated and who is listed in the 'Selected Agents' list.",
      step3RootCause: "The designated Purchasing Director changed roles last week. The new Director's user ID was maintained in HR master data but was missing the structural authorization role 'SAP_MM_BCR_PURCHASING_DIRECTOR_T' in SU01.",
      step4Resolution: "Assigned the authorization role to the new Director in SU01 and forwarded the stuck work item via T-Code SWIA to the new user ID. PO approved immediately."
    },
    preventiveAction: "Integrate HR role provisioning workflow so that changes in managerial positions automatically trigger SAP authorization role updates."
  },
  {
    id: "tkt-mm-003",
    tier: "L3 Support",
    priority: "P2 - High (8h SLA)",
    category: "Invoicing (LIV)",
    ticketSummary: "MIRO Invoice Verification blocked with price variance error 'M8 081 Maximum price tolerance exceeded'",
    userDescription: "Accounts Payable clerk is attempting to post vendor invoice for PO #4500078401. PO price was $100/unit, but supplier invoiced $112/unit for 500 units ($6,000 total variance). System blocks posting.",
    impactOnBusiness: "Supplier threatening to hold future shipments until invoice is processed.",
    tcodesInvolved: ["MIRO", "MR11", "OMRX", "ME22N", "MRBR"],
    rootCauseInvestigation: {
      step1CollectInfo: "Inspect PO line item in ME23N (Net Price: $100.00). Check Goods Receipt history in EKBE (500 units received at $100.00). Check Invoice entered in MIRO ($112.00/unit).",
      step2CheckConfigOrData: "Check Tolerance Keys in T-Code OMRX for Company Code 1000. Key PP (Price Variance) tolerance is set to maximum 5% ($5.00 limit). Current variance is 12% ($12.00/unit).",
      step3RootCause: "Supplier applied an unapproved freight surcharge directly to the unit price rather than invoicing freight as a separate line item. System correctly triggered standard S/4HANA price tolerance control.",
      step4Resolution: "Option A: If surcharge was agreed by procurement, Buyer amends PO in ME22N with new price condition and re-submits for workflow release. Option B: Accounts Payable posts invoice with blocking indicator, then Buyer releases block in T-Code MRBR after commercial dispute resolution."
    },
    preventiveAction: "Educate supplier portal users on submitting separate planned freight delivery costs rather than inflating base purchase order item unit prices."
  }
];
