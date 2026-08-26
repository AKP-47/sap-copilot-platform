// =========================================================================
// SAP COPILOT & TAGSKILLS CONSULTANT INVESTIGATION WORKBENCH CASES
// =========================================================================

export interface InvestigationTrack {
  id: string;
  name: string;
  icon: string;
  finding: string;
  clue: string;
  sapArtifact: string;
}

export interface InvestigationDiagnosis {
  id: string;
  title: string;
  isCorrect: boolean;
  feedback: string;
}

export interface InvestigationCase {
  id: string;
  client: string;
  industry: string;
  problemTitle: string;
  executiveBrief: string;
  tracks: InvestigationTrack[];
  diagnoses: InvestigationDiagnosis[];
  consultantSolution: {
    immediateFix: string;
    preventiveArchitecture: string;
  };
}

export const INVESTIGATION_CASES: InvestigationCase[] = [
  {
    "id": "case_auto_stockout",
    "client": "Apex Motors (Global Automotive OEM)",
    "industry": "Automotive & Mobility",
    "problemTitle": "Critical Assembly Line Shutdowns due to Missing Brake Calipers",
    "executiveBrief": "The Detroit assembly plant was forced to halt the main SUV production line for 4 hours yesterday because brake calipers were missing from line-side containers. The Plant VP is furious: SAP shows 1,500 units in stock on paper, yet line-side workers found empty bins. Diagnose what happened across the supply chain.",
    "tracks": [
      {
        "id": "track_po",
        "name": "Audit Open Purchase Orders & Supplier Deliveries",
        "icon": "FileText",
        "finding": "PO 4500089200 was issued 3 weeks ago for 2,000 calipers. The Tier-1 supplier shipped on time with ASN 80004122. Goods Receipt was posted 48 hours ago at Dock Door 4.",
        "clue": "Materials have physically arrived at the facility 2 days ago.",
        "sapArtifact": "EKKO / EKPO / MIGO Material Doc 5000184920"
      },
      {
        "id": "track_stock",
        "name": "Analyze Material Master & Stock Types in MMBE",
        "icon": "Layers",
        "finding": "MMBE Stock Overview shows 1,500 units in Plant 1000. However, the stock is sitting under 'Quality Inspection Stock', NOT 'Unrestricted Use'.",
        "clue": "Material is locked in Quality Inspection status (Stock Type Q). Production orders cannot consume it!",
        "sapArtifact": "MMBE / MARC / MARD (Inspection Lot 01000048291)"
      },
      {
        "id": "track_qm",
        "name": "Inspect Quality Management (QM) Lab Worklist",
        "icon": "CheckCircle2",
        "finding": "Inspection Lot 01000048291 was auto-created 48 hours ago upon Movement 101. Lab technicians performed ultrasonic thickness testing yesterday and recorded green results, but nobody posted the formal Usage Decision (QA11)!",
        "clue": "Lab passed the test, but omitted the final transaction step to transfer stock from Quality to Unrestricted (Movement 321).",
        "sapArtifact": "QA32 / QA11 / QALS"
      },
      {
        "id": "track_ewm",
        "name": "Inspect EWM Warehouse Monitor (/SCWM/MON) & Bins",
        "icon": "Warehouse",
        "finding": "In EWM, pallets are physically parked in Storage Type 9020 (QA Holding Area). Because no Usage Decision was received from ERP, no Warehouse Task was triggered to move stock to Line-Side PSA (Production Supply Area).",
        "clue": "Pallets are physically sitting 50 meters away in the QA holding bay, blocked by software status.",
        "sapArtifact": "/SCWM/MON -> Inbound -> Handling Units"
      },
      {
        "id": "track_mrp",
        "name": "Check MRP Parameters & Safety Stock in MD04",
        "icon": "TrendingDown",
        "finding": "Safety Stock was maintained as 0 units because the plant was operating under an aggressive 'Zero-Inventory' mandate with no buffer for lab processing lag.",
        "clue": "Zero safety stock left zero margin for a 48-hour QA administrative hold.",
        "sapArtifact": "MD04 / MARC-EISBE"
      }
    ],
    "diagnoses": [
      {
        "id": "diag_1",
        "title": "Supplier Failed to Deliver Goods",
        "isCorrect": false,
        "feedback": "Incorrect. Evidence from Track 1 shows the supplier shipped on time and Goods Receipt was posted 48 hours ago."
      },
      {
        "id": "diag_2",
        "title": "Administrative Bottleneck: Inspection Passed but Usage Decision (QA11) Was Not Posted + Zero Safety Stock Buffer",
        "isCorrect": true,
        "feedback": "Spot on! The physical parts arrived and passed quality tests, but the un-posted Usage Decision (QA11) kept stock locked in 'Quality Inspection' (Stock Type Q). Combined with zero safety stock, this caused an artificial stockout on the line."
      },
      {
        "id": "diag_3",
        "title": "Forklift Driver Misplaced the Pallets in the High-Rack Bins",
        "isCorrect": false,
        "feedback": "Incorrect. Track 4 shows pallets were accurately located in Storage Type 9020 (QA Hold). The blocker was software authorization, not physical loss."
      }
    ],
    "consultantSolution": {
      "immediateFix": "Execute transaction QA11 for Inspection Lot 01000048291, post Usage Decision 'A - Approved', triggering automatic Movement 321 to Unrestricted stock and auto-generating an urgent replenishment Warehouse Task to the assembly PSA.",
      "preventiveArchitecture": "1. Configure Automatic Usage Decision (Report RQAUTUD10) for certified vendors with flawless historical quality scores. 2. Establish a 1-day safety stock buffer (50 units) in Material Master to absorb standard lab turnaround time."
    }
  }
];
