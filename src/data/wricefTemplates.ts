export interface WricefTemplate {
  type: "Workflow" | "Report" | "Interface" | "Conversion" | "Enhancement" | "Form";
  title: string;
  sampleName: string;
  module: "MM" | "EWM";
  businessRequirement: string;
  functionalSpecificationSections: {
    sectionTitle: string;
    description: string;
    sampleContent: string;
  }[];
}

export const WRICEF_TEMPLATES: WricefTemplate[] = [
  {
    type: "Interface",
    title: "Inbound ASN Supplier EDI 856 to Inbound Delivery Interface",
    sampleName: "INT-MM-001: EDI 856 ASN to S/4HANA Inbound Delivery",
    module: "MM",
    businessRequirement: "Automate creation of Inbound Deliveries and Handling Units in SAP when suppliers dispatch Advanced Shipping Notifications.",
    functionalSpecificationSections: [
      {
        sectionTitle: "1. Business Objective & Scope",
        description: "Why this interface exists and business volume.",
        sampleContent: "Automate inbound receipt ingestion for 45 Tier-1 automotive suppliers, eliminating 15 hours of manual daily data entry."
      },
      {
        sectionTitle: "2. Trigger & Frequency",
        description: "How and when the interface executes.",
        sampleContent: "Event-driven via SAP Integration Suite / CPI receiving XML/EDIFACT DESADV message."
      },
      {
        sectionTitle: "3. Source to Target Field Mapping",
        description: "Mapping of incoming payload fields to SAP tables.",
        sampleContent: "EDI PO Number -> EKKO-EBELN; EDI Item -> EKPO-EBELP; EDI Shipped Qty -> LIPS-LFIMG; SSCC Pallet Barcode -> VEKP-EXIDV."
      },
      {
        sectionTitle: "4. Error Handling & Reprocessing",
        description: "How errors are caught and reprocessed.",
        sampleContent: "Errors logged to SAP Application Log (SLG1). Alerts sent to buyer email if PO is locked or invalid material number."
      }
    ]
  },
  {
    type: "Enhancement",
    title: "EWM Custom Putaway Bin Strategy BAdI",
    sampleName: "ENH-EWM-004: Heavy Component Floor Bin Allocation BAdI",
    module: "EWM",
    businessRequirement: "Enforce dynamic weight-based bin selection so items weighing >500 kg are strictly placed on Level 01 floor bins.",
    functionalSpecificationSections: [
      {
        sectionTitle: "1. Business Requirement",
        description: "Operational driver for custom logic.",
        sampleContent: "Forklifts cannot lift heavy engine blocks above 2 meters. Standard capacity check handles total weight but not tier-level restrictions."
      },
      {
        sectionTitle: "2. Technical Object & Enhancement Spot",
        description: "BAdI definition and method.",
        sampleContent: "BAdI: /SCWM/EX_CORE_PTS_BIN_SEARCH, Method: PUTAWAY_STRATEGY_BIN_SEARCH."
      },
      {
        sectionTitle: "3. Functional Logic & Pseudo-code",
        description: "Step-by-step logic for ABAP developer.",
        sampleContent: "Read product gross weight from /SCWM/MAT1. If Weight > 500 KG, filter candidate bins in /SCWM/LAGP where Coordinate Tier (Level) = '01'. Discard higher tiers."
      }
    ]
  }
];
