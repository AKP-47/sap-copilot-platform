import { ScenarioProblem } from "../types/sap";

export const SCENARIO_BANK: ScenarioProblem[] = [
  {
    id: "scen-auto-01",
    title: "Automotive JIT Assembly Line Stoppage Crisis",
    module: "MM",
    industry: "automotive",
    difficulty: "Advanced",
    businessContext: "A Tier-1 automotive plant running high-speed chassis assembly is facing a line stoppage because 200 brake calipers arrived with damaged supplier barcode labels. The receiving clerk cannot post 101 GR in MIGO, and assembly workers cannot backflush components (261 GI). Every minute of downtime costs $15,000.",
    clientRequirement: "Design an emergency procedure to accept goods, enable shop-floor consumption immediately, maintain full lot traceability, and prevent financial inventory distortion.",
    stages: [
      {
        stageNumber: 1,
        stageTitle: "Immediate Receiving & Goods Acceptance",
        questionPrompt: "The barcode scanner fails to read vendor ASN labels. What should the receiving lead do to ingest the 200 units immediately?",
        options: [
          {
            id: "opt-1",
            text: "Manually create an internal batch in MSC1N, post MIGO 101 against the open PO entering the newly generated batch, and print internal SAP barcode labels.",
            sapImpact: "Increases stock, preserves batch traceability, and generates valid internal barcodes.",
            isOptimal: true,
            scoreWeight: 35,
            feedback: "Optimal. Manual batch generation in MSC1N maintains full compliance while unblocking MIGO 101."
          },
          {
            id: "opt-2",
            text: "Post Movement Type 501 without PO to bypass purchasing validation.",
            sapImpact: "Violates procurement audit, creates unlinked stock, and causes duplicate payments.",
            isOptimal: false,
            scoreWeight: 0,
            feedback: "High risk. 501 bypasses PO history and will corrupt 3-way invoice matching."
          }
        ]
      },
      {
        stageNumber: 2,
        stageTitle: "Shop Floor Production Line Unblocking",
        questionPrompt: "The assembly line is waiting to consume the parts for Production Order 500100. How should the parts be staged and consumed?",
        options: [
          {
            id: "opt-1",
            text: "Execute Transfer Posting 311 from Receiving SLoc 0001 to Production Staging SLoc 0002, then confirm operation in CO11N with backflush (261 GI).",
            sapImpact: "Maintains accurate SLoc inventory balance and updates Order WIP accurately.",
            isOptimal: true,
            scoreWeight: 35,
            feedback: "Correct. Transferring to shop-floor SLoc followed by standard backflushing ensures clean costing."
          },
          {
            id: "opt-2",
            text: "Consume stock using 201 to Cost Center to avoid logging the production order.",
            sapImpact: "Corrupts manufacturing variance calculation in CO-PC.",
            isOptimal: false,
            scoreWeight: 0,
            feedback: "Incorrect. Production consumption must always post to the Production Order (261) to track manufacturing variances."
          }
        ]
      },
      {
        stageNumber: 3,
        stageTitle: "Root Cause Prevention",
        questionPrompt: "What preventative configuration should be established with the supplier?",
        options: [
          {
            id: "opt-1",
            text: "Mandate EDI 856 ASN with GS1-128 barcode standards and configure Supplier Quality Notification (QM01) for label defect penalties.",
            sapImpact: "Enforces vendor compliance and automates inbound barcode scanning.",
            isOptimal: true,
            scoreWeight: 30,
            feedback: "Excellent consultant-level solution integrating EDI and QM vendor scoring."
          }
        ]
      }
    ],
    overallSolution: {
      correctApproach: "1) Manual batch generation (MSC1N) -> 2) MIGO 101 GR with internal label printing -> 3) Transfer Posting 311 to line SLoc -> 4) Backflush 261 GI -> 5) EDI 856 ASN enforcement with QM vendor defect notification.",
      sapReasoning: "Maintains complete audit trail across EKKO, MSEG, AUFK, and MBEW without manual ledger adjustments.",
      businessReasoning: "Eliminated line stoppage in under 12 minutes, saving $180,000 in potential OEM penalties while ensuring 100% recall traceability.",
      missedConceptsWarning: ["Never use 501 for standard PO goods.", "Never bypass Production Order backflushing with 201 Cost Center GI."],
      consultantTakeaway: "A great consultant balances emergency operational agility with strict financial and traceability compliance.",
      recommendedRevisionTopics: ["mm-inventory-goods-receipt", "mm-material-master", "Movement Type 261", "OBYC BSX/WRX"]
    }
  },
  {
    id: "scen-ewm-01",
    title: "Pharma Cold-Chain Putaway Strategy Failure",
    module: "EWM",
    industry: "pharma",
    difficulty: "Expert",
    businessContext: "A pharmaceutical vaccine manufacturer implements SAP EWM. During Inbound receipt of temperature-sensitive vaccines (require +2C to +8C), the system is mistakenly creating putaway warehouse tasks into Ambient High-Rack Storage Type 0020 (+20C) instead of Cold Vault 0030 (+4C). If vaccines stay in ambient temperatures for >2 hours, the entire $4.5M batch is ruined.",
    clientRequirement: "Diagnose why EWM putaway strategy failed, correct SPRO configuration and Master Data immediately, and configure fail-safe bin validation.",
    stages: [
      {
        stageNumber: 1,
        stageTitle: "Master Data & Search Sequence Audit",
        questionPrompt: "Where in SAP EWM does the system determine which Storage Type should be selected during Inbound Putaway?",
        options: [
          {
            id: "opt-1",
            text: "Putaway Control Indicator (PACI) in Warehouse Product Master (/SCWM/MAT1) evaluated against the Storage Type Search Sequence table in /SCWM/IMG.",
            sapImpact: "Directs bin search algorithm to the correct cold-storage type.",
            isOptimal: true,
            scoreWeight: 40,
            feedback: "Correct! The PACI + Warehouse Process Type determines the Storage Type Search Sequence in EWM."
          },
          {
            id: "opt-2",
            text: "In the Plant definition table T001W in ERP.",
            sapImpact: "Incorrect. EWM putaway logic is completely independent of T001W.",
            isOptimal: false,
            scoreWeight: 0,
            feedback: "Incorrect. Putaway search sequences are configured in EWM Customizing, not ERP Plant tables."
          }
        ]
      },
      {
        stageNumber: 2,
        stageTitle: "Customizing Fix & Emergency Re-routing",
        questionPrompt: "The consultant discovers that the Product Master was missing PACI 'COLD', causing the system to default to fallback PACI 'NORM' (Ambient). How should the open Warehouse Tasks be corrected?",
        options: [
          {
            id: "opt-1",
            text: "Update /SCWM/MAT1 with PACI 'COLD', cancel the open ambient WTs in /SCWM/MON, and re-create putaway WTs referencing the Inbound Delivery in /SCWM/TODET_I.",
            sapImpact: "Safely redirects tasks to Cold Vault Storage Type 0030.",
            isOptimal: true,
            scoreWeight: 40,
            feedback: "Optimal. Canceling open tasks and updating PACI ensures 100% automated routing into the Cold Vault."
          }
        ]
      },
      {
        stageNumber: 3,
        stageTitle: "Fail-Safe Safety Architecture",
        questionPrompt: "What additional EWM control should be activated to physically prevent an RF operator from ever confirming a cold item into an ambient bin?",
        options: [
          {
            id: "opt-1",
            text: "Activate Storage Section & Bin Type Capacity Checks with mandatory Temperature Class validation on Storage Types in /SCWM/IMG.",
            sapImpact: "Hard-stops RF confirmation if bin temperature class does not match material temperature requirement.",
            isOptimal: true,
            scoreWeight: 20,
            feedback: "Excellent! Hardware and RF level safety gates prevent human error."
          }
        ]
      }
    ],
    overallSolution: {
      correctApproach: "1) Maintain PACI 'COLD' in /SCWM/MAT1 -> 2) Configure Storage Type Search Sequence for PACI COLD -> 0030 -> 3) Cancel open tasks in /SCWM/MON -> 4) Re-create WTs -> 5) Activate Temperature Class validation.",
      sapReasoning: "EWM relies on PACI to execute Storage Type Search Sequences. Fallback strategies must be guarded with temperature class compatibility checks.",
      businessReasoning: "Protected $4.5M vaccine inventory from spoilage and established an audit-proof FDA compliant cold-chain workflow.",
      missedConceptsWarning: ["Always verify PACI assignment during cutover.", "Never allow open WTs to execute with wrong destination bins."],
      consultantTakeaway: "In life-sciences EWM, master data governance is literally a matter of patient safety.",
      recommendedRevisionTopics: ["ewm-org-structure", "ewm-warehouse-execution", "Storage Type Search Sequence", "RF Framework"]
    }
  }
];
