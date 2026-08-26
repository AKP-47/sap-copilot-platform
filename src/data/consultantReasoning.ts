// =========================================================================
// SAP COPILOT & TAGSKILLS CONSULTANT REASONING & SIMULATOR ENGINE
// =========================================================================

export interface ConceptDna {
  id: string;
  name: string;
  module: string;
  businessPurpose: string;
  businessTrigger: string;
  documentFlow: string;
  stockImpact: string;
  accountingImpact: string;
  integrationPoints: string[];
  industryExamples: { industry: string; case: string }[];
  commonMistakes: string[];
  interviewRelevance: string;
  consultantConsiderations: string;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  baseScenario: string;
  baseState: string;
  mutation: string;
  changedProcess: string;
  sapOutcome: string;
  consultantTradeOff: string;
}

export interface ImpactSimulatorModel {
  id: string;
  title: string;
  category: string;
  description: string;
  parameterName: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  impactMetrics: {
    low: { range: string; carryingCost: string; stockoutRisk: string; productionContinuity: string; consultantAnalysis: string };
    medium: { range: string; carryingCost: string; stockoutRisk: string; productionContinuity: string; consultantAnalysis: string };
    high: { range: string; carryingCost: string; stockoutRisk: string; productionContinuity: string; consultantAnalysis: string };
  };
}

export const CONCEPT_DNA_BANK: ConceptDna[] = [
  {
    "id": "mvt_101",
    "name": "Movement Type 101 \u2013 Goods Receipt for Purchase Order",
    "module": "SAP MM-IM / Logistics",
    "businessPurpose": "Records the physical delivery of purchased goods from an external supplier into warehouse or plant inventory.",
    "businessTrigger": "Supplier delivery truck arrives at receiving dock with delivery note referencing valid Purchase Order.",
    "documentFlow": "Purchase Requisition -> Purchase Order (ME21N) -> Inbound Delivery (VL31N) -> Material Document (101) -> Accounting Doc (BKPF) -> Invoice (MIRO)",
    "stockImpact": "Increases Unrestricted Use (or Quality Inspection Stock if QM active) at Plant & Storage Location level in table MARD/MATDOC.",
    "accountingImpact": "Debit: Inventory Stock Account (BSX) | Credit: GR/IR Clearing Liability Account (WRX) based on OBYC configuration.",
    "integrationPoints": [
      "MM Purchasing (Updates EKBE PO History)",
      "Financial Accounting (FI General Ledger)",
      "EWM (Generates /SCWM/PRDI or WT)",
      "Quality Management (Creates QALS Inspection Lot)"
    ],
    "industryExamples": [
      {
        "industry": "Automotive",
        "case": "Receiving 500 brake caliper assemblies JIT at assembly dock."
      },
      {
        "industry": "Pharma",
        "case": "Receiving 20 barrels of active pharmaceutical ingredient (API) into quarantine stock."
      },
      {
        "industry": "Retail",
        "case": "Cross-dock receiving of 100 cartons of footwear for immediate store redistribution."
      }
    ],
    "commonMistakes": [
      "Posting Goods Receipt without verifying PO unit of measure conversion (e.g., cases vs pieces).",
      "Posting directly into Unrestricted stock when material requires mandatory QM inspection (Origin 01).",
      "Failing to enter vendor delivery note number in field LFSNR, preventing future invoice matching in MIRO."
    ],
    "interviewRelevance": "High (Asked in 95% of SAP MM interviews: 'What FI postings occur during 101, and how does GR/IR clearing work?')",
    "consultantConsiderations": "Check SPRO automatic account determination (OBYC BSX/WRX), valuation class in Material Master (Accounting 1 tab), and tolerance keys for under/overdelivery in PO item."
  },
  {
    "id": "posc_inbound",
    "name": "POSC \u2013 Process-Oriented Storage Control",
    "module": "SAP EWM (Extended Warehouse Management)",
    "businessPurpose": "Orchestrates multi-step warehouse routing for complex physical processing before materials reach their final storage bin.",
    "businessTrigger": "Inbound handling unit requires multiple intermediate work center stops (Unload -> Decon -> Quality -> Putaway).",
    "documentFlow": "Inbound Delivery (/SCWM/PRDI) -> Inbound HU -> Step 1 (UNLD) -> Step 2 (DECO) -> Step 3 (QIS) -> Step 4 (PUTW) -> Final Storage Bin",
    "stockImpact": "Transfers stock between intermediate storage bins (e.g., 9010 Dock -> 9020 Work Center -> 0030 High Rack) while preserving HU integrity.",
    "accountingImpact": "No FI impact during internal bin movements; FI postings occur at Goods Receipt (101) and final PGI.",
    "integrationPoints": [
      "EWM Work Center Architecture (/SCWM/WORKC)",
      "Quality Management (/SCWM/QIDCA)",
      "Radio Frequency Framework (/SCWM/RFUI)"
    ],
    "industryExamples": [
      {
        "industry": "Aerospace",
        "case": "Unloading large wooden crate -> Unpacking to cleanroom tray -> Ultrasonic thickness inspection -> Cleanroom high-bay bin."
      },
      {
        "industry": "Retail",
        "case": "Mixed pallet receipt -> Deconsolidation into store-specific totes -> Value-Added Service labeling -> Final sorting."
      },
      {
        "industry": "Pharma",
        "case": "Temperature-controlled pallet -> Sampling booth QA test -> Label serialization -> Cold storage room."
      }
    ],
    "commonMistakes": [
      "Missing destination bin definition for intermediate Work Centers in transaction /SCWM/WORKC.",
      "Forgetting to check the 'Auto-WT' indicator in /SCWM/TPOSC for automatic creation of next step task upon previous step confirmation.",
      "Confusing POSC (process-driven steps) with LOSC (physical layout obstacles like elevators and conveyor junctions)."
    ],
    "interviewRelevance": "Critical (Core question in every senior SAP EWM interview: 'Explain the difference between POSC and LOSC with an enterprise scenario.')",
    "consultantConsiderations": "Maintain External Steps (UNLD, DECO, QIS, PUTW), map them to Internal Process Steps in SPRO, assign to Warehouse Process Type (WPT), and verify storage type search sequences."
  }
];
export const WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    "id": "wi_qm_active",
    "title": "What If Quality Inspection Is NOT Required?",
    "baseScenario": "Automotive supplier delivers brake pads with mandatory QM inspection.",
    "baseState": "Movement 101 posts to Quality Inspection Stock. Stock is locked until QA11 Usage Decision.",
    "mutation": "Business decides the supplier is certified (ISO/TS certified dock-to-stock program).",
    "changedProcess": "Deactivate Inspection Type 01 in Material Master (QM View).",
    "sapOutcome": "Movement 101 posts directly to Unrestricted Use stock. Production lines can immediately reserve and consume materials with zero QA hold time.",
    "consultantTradeOff": "Eliminates warehouse holding bottlenecks and labor costs, but transfers quality risk downstream to the assembly line."
  },
  {
    "id": "wi_batch_managed",
    "title": "What If the Material Is Batch-Managed with Expiry (SLED)?",
    "baseScenario": "Standard packaging cartons received without batch tracking.",
    "baseState": "Inventory is tracked only as total quantity per storage location.",
    "mutation": "Client starts producing perishable pharmaceutical syrup requiring FDA batch tracing and expiry dates.",
    "changedProcess": "Activate 'Batch management' in Material Master (Purchasing/Work scheduling tab). Maintain Shelf Life data in Plant data/stor. 1 view.",
    "sapOutcome": "At Goods Receipt (101), SAP enforces entry of Batch Number and Manufacture/Expiry Date. EWM automatically picks using FEFO (First Expired First Out) strategy.",
    "consultantTradeOff": "Achieves 100% regulatory audit compliance and prevents expired shipments, but increases warehouse receiving scan time by ~15 seconds per pallet."
  },
  {
    "id": "wi_overdelivery",
    "title": "What If the Supplier Delivers 1,200 Units for a 1,000 Unit PO?",
    "baseScenario": "PO exists for 1,000 pieces of raw steel sheets with 0% overdelivery tolerance.",
    "baseState": "Warehouse clerk attempts to post MIGO 101 for 1,200 units. System errors with message M7022: 'PU Overdelivery tolerance exceeded'.",
    "mutation": "Buyer agrees with supplier to accept up to 25% surplus due to bulk production lot efficiency.",
    "changedProcess": "In PO Item (ME22N Delivery Tab), set 'Overdelivery tolerance' to 20.0% or tick 'Unlimited Overdelivery'.",
    "sapOutcome": "MIGO 101 successfully posts 1,200 units. PO history updates to 1,200 received. FI records inventory asset for 1,200 units at PO unit price.",
    "consultantTradeOff": "Prevents delivery trucks from being turned away at the gate, but increases company working capital expenditure beyond initial budget."
  }
];
export const IMPACT_SIMULATORS: ImpactSimulatorModel[] = [
  {
    "id": "safety_stock_sim",
    "title": "Safety Stock Optimization Trade-Off",
    "category": "Inventory Management & MRP",
    "description": "Evaluate how increasing or decreasing Safety Stock affects Working Capital, Stockout Risk, and Plant Production Continuity.",
    "parameterName": "Safety Stock (Units)",
    "defaultValue": 100,
    "minValue": 10,
    "maxValue": 500,
    "step": 10,
    "impactMetrics": {
      "low": {
        "range": "10 \u2013 40 Units (Lean JIT Strategy)",
        "carryingCost": "Low ($1,200 / year)",
        "stockoutRisk": "High (35% probability during supplier delays)",
        "productionContinuity": "Vulnerable to line stoppages",
        "consultantAnalysis": "Suitable ONLY for local Tier-1 suppliers with 2-hour delivery response and 99.8% on-time performance."
      },
      "medium": {
        "range": "50 \u2013 150 Units (Balanced Buffer)",
        "carryingCost": "Moderate ($4,500 / year)",
        "stockoutRisk": "Low (2% probability)",
        "productionContinuity": "Stable and resilient",
        "consultantAnalysis": "Recommended enterprise baseline balancing liquidity against supply chain volatility."
      },
      "high": {
        "range": "160 \u2013 500 Units (Conservative / Critical Spares)",
        "carryingCost": "High ($18,000 / year)",
        "stockoutRisk": "Near Zero (0.01%)",
        "productionContinuity": "100% Guaranteed",
        "consultantAnalysis": "Recommended for overseas suppliers (e.g. 6-week sea freight) or critical un-substitutable custom tooling."
      }
    }
  },
  {
    "id": "posc_steps_sim",
    "title": "POSC Work Center Routing Complexity",
    "category": "EWM Warehouse Execution",
    "description": "Analyze the trade-off between direct dock-to-bin putaway vs multi-step work center inspection and deconsolidation.",
    "parameterName": "POSC Process Steps Count",
    "defaultValue": 2,
    "minValue": 1,
    "maxValue": 4,
    "step": 1,
    "impactMetrics": {
      "low": {
        "range": "1 Step (Direct Putaway: Unload -> Final Bin)",
        "carryingCost": "Fastest dock-to-stock time (8 minutes per pallet)",
        "stockoutRisk": "Quality risk if supplier delivers defective goods",
        "productionContinuity": "Highest dock throughput",
        "consultantAnalysis": "Best for pre-inspected standard homogeneous pallets."
      },
      "medium": {
        "range": "2-3 Steps (Unload -> Decon -> Putaway)",
        "carryingCost": "Standard dock-to-stock time (25 minutes per pallet)",
        "stockoutRisk": "High accuracy of mixed handling units",
        "productionContinuity": "Optimal store/line-side sorting",
        "consultantAnalysis": "Standard enterprise practice for multi-SKU supplier pallets."
      },
      "high": {
        "range": "4 Steps (Unload -> Decon -> 100% Lab Quality -> Packing -> Putaway)",
        "carryingCost": "Extended dock-to-stock time (90 minutes per pallet)",
        "stockoutRisk": "Zero quality defects entering manufacturing",
        "productionContinuity": "Regulated compliance",
        "consultantAnalysis": "Mandatory for Pharmaceuticals (GMP), Aerospace, and Hazardous Chemicals."
      }
    }
  }
];
