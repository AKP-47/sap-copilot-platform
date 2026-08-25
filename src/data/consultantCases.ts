import { ConsultantCase } from "../types/sap";

export const CONSULTANT_CASES: ConsultantCase[] = [
  {
    id: "case-01-auto-congestion",
    title: "Automotive EWM Greenfield: Putaway Bottlenecks & Missing Traceability",
    clientName: "Apex Motors Global (Detroit Plant)",
    industry: "automotive",
    module: "EWM",
    clientContext: "Apex Motors recently migrated from legacy SAP WM to SAP S/4HANA Embedded EWM. Since Go-Live 3 weeks ago, receiving docks are gridlocked with 400 un-putaway pallets. Forklift drivers are manually placing engines in arbitrary empty aisles. Production lines are starving for components, and the plant manager is threatening to roll back the ERP system.",
    problemStatement: "1) Inbound receiving door congestion with 4-hour queue delays. 2) System creates WTs to already-full bins. 3) Putaway travel distance is 3x higher than legacy WM. 4) Quality inspection lots are not releasing automatically.",
    businessImpact: "Risk of $2.4M weekly production penalty, severe safety hazards at receiving dock, and inventory accuracy dropped from 99.2% to 84.1%.",
    stage1Discovery: {
      instructions: "Formulate strategic diagnostic questions for the Plant Manager, Warehouse Lead, and Quality Director to identify core root causes.",
      questionOptions: [
        {
          id: "q1",
          question: "Has Bin Sorting (/SCWM/SBST) been executed for all Activity Areas after Go-Live bin master upload?",
          whyImportant: "Without bin sorting, EWM WOCR cannot optimize travel routes or follow physical aisle logic.",
          isCritical: true
        },
        {
          id: "q2",
          question: "What Capacity Check Method (1, 2, 3, 4) is active on High-Rack Storage Types in /SCWM/T331?",
          whyImportant: "If Capacity Check is set to '0' (No capacity check), EWM will suggest the same bin infinitely, causing physical overflows.",
          isCritical: true
        },
        {
          id: "q3",
          question: "Is POSC configured with Deconsolidation and Quality Work Centers?",
          whyImportant: "Identifies whether intermediate work centers are creating task bottlenecks.",
          isCritical: true
        },
        {
          id: "q4",
          question: "What color are the forklift trucks?",
          whyImportant: "Irrelevant to SAP functional consulting.",
          isCritical: false
        }
      ]
    },
    stage2MasterDataAudit: {
      instructions: "Audit the critical SAP master data tables and identify corrupt or unmaintained parameters.",
      dataObjectsToCheck: [
        {
          object: "Storage Bins Master (/SCWM/LAGP)",
          tcode: "/SCWM/LS03N",
          table: "/SCWM/LAGP",
          criticalField: "MAX_WEIGHT & MAX_VOL",
          issueFound: "9,000 bins have MAX_WEIGHT = 0.00, causing capacity checks to fail and defaulting to random search."
        },
        {
          object: "Warehouse Product Master (/SCWM/MAT1)",
          tcode: "/SCWM/MAT1",
          table: "/SCWM/MAT1",
          criticalField: "PACI (Putaway Control Indicator)",
          issueFound: "450 raw material SKUs have PACI left BLANK, defaulting to general bulk storage instead of high-bay racks."
        },
        {
          object: "Activity Area Bin Sorting",
          tcode: "/SCWM/SBST",
          table: "/SCWM/LAGPS",
          criticalField: "SRTSEQ (Sort Sequence)",
          issueFound: "Table /SCWM/LAGPS is completely EMPTY for Activity Area 'PUTAWAY'. Workers are directed in random order."
        }
      ]
    },
    stage3SproDiagnosis: {
      instructions: "Identify the exact SPRO customizing paths required to resolve the capacity checks, search sequences, and WOCR.",
      configOptions: [
        {
          id: "cfg-1",
          path: "SPRO -> SCM EWM -> Master Data -> Define Storage Types -> Storage Type 0010",
          settingName: "Capacity Check Method = 3 (Check based on Max Weight / Volume of Bin) & Mixed Storage = 2 (Several HUs of same product permitted)",
          proposedFix: "Activate Capacity Check Method 3 and enable HU Type check to prevent overfilling bins.",
          isCorrectPath: true
        },
        {
          id: "cfg-2",
          path: "SPRO -> SCM EWM -> Goods Receipt Process -> Strategies -> Storage Type Search -> Define Storage Type Search Sequence for Putaway",
          settingName: "Assign PACI 'AUTO_HIGH' to search Sequence 0010 (High Rack) -> 0020 (Overflow)",
          proposedFix: "Link PACI to structured multi-tier storage type sequence.",
          isCorrectPath: true
        }
      ]
    },
    stage4TestingAndCutover: {
      testScenarios: [
        "Test Script 1: Inbound Delivery of 10 Pallets with PACI 'AUTO_HIGH' - verify automated WT assignment to empty bins in Storage Type 0010.",
        "Test Script 2: Bin Capacity Overflow Test - verify system detects full bin and routes to next available bin in same aisle.",
        "Test Script 3: RF Confirmation via /SCWM/RFUI - verify travel route follows sorted zig-zag sequence."
      ],
      cutoverPrerequisites: [
        "Mass update /SCWM/LAGP bin capacities using /SCWM/LS10 / BAPI.",
        "Execute /SCWM/SBST for all Activity Areas.",
        "Mass update /SCWM/MAT1 PACIs using mass maintenance /SCWM/MASSMAT."
      ]
    },
    stage5ExecutivePitch: {
      executiveSummary: "By rectifying Storage Type Capacity Check Method 3, executing Activity Area Bin Sorting (/SCWM/SBST), and populating PACIs across 450 SKUs, dock congestion will be eliminated within 48 hours.",
      roiJustification: "Reduces forklift travel time by 42%, eliminates $2.4M in potential line stoppage risk, and restores inventory accuracy to >99.5%.",
      riskMitigation: "Zero downtime deployment over Saturday maintenance window with automated rollback script."
    }
  }
];
