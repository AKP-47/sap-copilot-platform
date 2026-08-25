import { IntegrationFlow } from "../types/sap";

export const INTEGRATION_FLOWS: IntegrationFlow[] = [
  {
    id: "int-inbound-procurement",
    title: "Standard Procurement: PR -> PO -> Inbound Delivery -> EWM Putaway",
    processType: "Inbound Procurement",
    businessContext: "Procurement of raw materials or components from external vendor delivered into an EWM-managed warehouse facility.",
    integrationPoint: "Inbound Delivery replication via qRFC (Function Module /SCWM/INB_DLV_SAVEREPLICA) and Goods Receipt confirmation back via PPF action.",
    documentFlow: [
      {
        sequence: 1,
        stage: "Purchase Requisition (PR)",
        system: "MM",
        documentType: "PR (Doc Type NB)",
        tcode: "ME51N / MD04",
        teamAction: "Procurement / MRP identifies raw material deficit and creates PR.",
        tablesUpdated: ["EBAN"]
      },
      {
        sequence: 2,
        stage: "Purchase Order (PO)",
        system: "MM",
        documentType: "PO (Doc Type NB)",
        tcode: "ME21N / ME59N",
        teamAction: "Buyer converts PR to PO and dispatches EDI 850 / Output to Supplier.",
        tablesUpdated: ["EKKO", "EKPO", "EKET"]
      },
      {
        sequence: 3,
        stage: "Inbound Delivery Creation",
        system: "MM",
        documentType: "Inbound Delivery (Doc Type EL)",
        tcode: "VL31N / EDI 856 ASN",
        teamAction: "Supplier sends ASN; system generates Inbound Delivery in S/4HANA MM.",
        tablesUpdated: ["LIKP", "LIPS"]
      },
      {
        sequence: 4,
        stage: "qRFC Replication to EWM",
        system: "Integration Core (qRFC/CIF/PPF)",
        documentType: "EWM Inbound Delivery Notification (IDN / PRDI)",
        tcode: "SMQ2 (Inbound Queue) / /SCWM/PRDI",
        teamAction: "qRFC automatically replicates delivery header, items, and packaging data to EWM.",
        tablesUpdated: ["/SCDL/DB_PROCH_I", "/SCDL/DB_PROCI_I"]
      },
      {
        sequence: 5,
        stage: "EWM Goods Receipt & Handling Unit Check-In",
        system: "EWM",
        documentType: "EWM Goods Receipt Posting",
        tcode: "/SCWM/PRDI or /SCWM/RFUI",
        teamAction: "Warehouse receiving clerk verifies truck, unloads pallets, scans HUs, and posts GR in EWM.",
        tablesUpdated: ["/SCWM/HUHDR", "/SCWM/AQUA"]
      },
      {
        sequence: 6,
        stage: "Synchronous MM 101 Goods Receipt Confirmation",
        system: "MM",
        documentType: "Material Document (Movement Type 101) & Accounting Document",
        tcode: "Auto-posted via qRFC / PPF",
        teamAction: "EWM sends GR event back to ERP. MM automatically creates Material Document (101) and FI ledger entries (Debit Inventory BSX, Credit GR/IR WRX) into SLoc ROD.",
        tablesUpdated: ["MKPF", "MSEG", "BKPF", "BSEG", "EKBE"]
      },
      {
        sequence: 7,
        stage: "EWM Warehouse Task (WT) Putaway Execution",
        system: "EWM",
        documentType: "Warehouse Order / Task (WPT 1010)",
        tcode: "/SCWM/TODET / /SCWM/RFUI",
        teamAction: "Forklift driver executes putaway WT from Staging Door to High-Rack Storage Bin.",
        tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA", "/SCWM/LAGP"]
      },
      {
        sequence: 8,
        stage: "Posting Change from ROD to AFS (Availability Group sync)",
        system: "Integration Core (qRFC/CIF/PPF)",
        documentType: "Transfer Posting (Movement Type 311)",
        tcode: "Auto-triggered upon WT Confirmation",
        teamAction: "Upon putaway confirmation into Storage Type with Availability Group 002, EWM triggers ERP posting change moving stock from SLoc ROD to SLoc AFS.",
        tablesUpdated: ["MARD", "MSEG"]
      }
    ],
    mmPerspective: {
      responsibilities: [
        "Create and release PO (ME21N/ME29N)",
        "Monitor Inbound Delivery creation (VL06I)",
        "Review Material Document History in PO (ME23N EKBE)",
        "Execute Logistics Invoice Verification (MIRO) against 101 GR"
      ],
      documents: ["Purchase Requisition", "Purchase Order", "Inbound Delivery (EL)", "Material Document (101 & 311)", "Accounting Document"],
      criticalTcodes: ["ME21N", "VL31N", "VL06I", "MB51", "MMBE", "MIRO"]
    },
    ewmPerspective: {
      responsibilities: [
        "Receive and validate Inbound Delivery in /SCWM/PRDI",
        "Perform physical unloading and HU inspection at Receiving Door",
        "Execute Putaway Warehouse Tasks via RF Terminal (/SCWM/RFUI)",
        "Monitor open putaway tasks in Warehouse Monitor (/SCWM/MON)"
      ],
      documents: ["Inbound Delivery Request", "Inbound Delivery Document", "Handling Units", "Warehouse Tasks (WT)", "Warehouse Orders (WO)"],
      criticalTcodes: ["/SCWM/PRDI", "/SCWM/MON", "/SCWM/RFUI", "/SCWM/TODET_I"]
    },
    queueAndInterfaces: {
      queueType: "SMQ2 (Inbound)",
      functionModuleOrEvent: "/SCWM/INB_DLV_SAVEREPLICA & /SCWM/GOODSMVT_CREATE",
      commonQueueErrors: ["Delivery locked by user", "Batch master missing or characteristic valuation failed", "Storage location mapping missing in /SCWM/TMAPSTLOC"],
      resolution: "Unlock user in SM12, maintain batch in MSC1N, check storage location mapping in SPRO, then restart queue in SMQ2."
    },
    commonErrorsAndTroubleshooting: [
      {
        problem: "Inbound Delivery created in ERP (VL31N) does not appear in EWM (/SCWM/PRDI)",
        systemIdentified: "RFC Queue",
        rootCause: "qRFC stuck in SMQ1 (Outbound in ERP) or SMQ2 (Inbound in EWM) due to communication failure or distribution model issue.",
        fixAction: "Check SMQ1/SMQ2. Look for queue name DLV*. Inspect queue payload error log. Re-process after resolving data conflict."
      },
      {
        problem: "Goods Receipt posted in EWM, but PO History in MM is not updated with 101 GR",
        systemIdentified: "EWM",
        rootCause: "PPF Action /SCWM/MSG_PRD_SEND_ERP failed or ERP posting period is closed (M7053).",
        fixAction: "Check PPF Action status in /SCWM/PRDI (Header -> PPF tab). If red, execute SPPFP log. Ensure ERP posting period is open in MMRV/MMPV."
      }
    ]
  },
  {
    id: "int-outbound-sales",
    title: "Outbound Sales Fulfillment: Sales Order -> OBD -> EWM Wave/Pick/Pack/PGI",
    processType: "Outbound Sales",
    businessContext: "Customer order fulfillment involving sales scheduling, EWM wave management, picking, packing, staging, loading, and Post Goods Issue (PGI).",
    integrationPoint: "Outbound Delivery replication to EWM (BAPI_OUTBOUND_DELIVERY_CONFIRM_DEC) and PGI reversal synchronization.",
    documentFlow: [
      {
        sequence: 1,
        stage: "Sales Order (SO)",
        system: "MM",
        documentType: "Sales Order (Doc Type OR / SD)",
        tcode: "VA01 / VA02",
        teamAction: "Customer order entered with shipping plant and storage location AFS.",
        tablesUpdated: ["VBAK", "VBAP"]
      },
      {
        sequence: 2,
        stage: "Outbound Delivery (OBD) Creation",
        system: "MM",
        documentType: "Outbound Delivery (Doc Type LF)",
        tcode: "VL01N / VL10A",
        teamAction: "Shipping specialist creates OBD in ERP; system replicates delivery to EWM.",
        tablesUpdated: ["LIKP", "LIPS"]
      },
      {
        sequence: 3,
        stage: "EWM Wave Creation & Release",
        system: "EWM",
        documentType: "Wave & Outbound Delivery Order (ODO)",
        tcode: "/SCWM/WAVE / /SCWM/MON",
        teamAction: "EWM groups deliveries into Waves and releases WTs for picking.",
        tablesUpdated: ["/SCWM/WAVE", "/SCWM/ORDIM_O"]
      },
      {
        sequence: 4,
        stage: "Picking & Packing at Work Center",
        system: "EWM",
        documentType: "Warehouse Tasks & Shipping Handling Units",
        tcode: "/SCWM/RFUI / /SCWM/PACK",
        teamAction: "Workers pick goods to Pick-HUs, move to Packing Station, and pack into Shipping Cartons with SSCC labels.",
        tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/HUHDR"]
      },
      {
        sequence: 5,
        stage: "Staging, Loading & Post Goods Issue (PGI) in EWM",
        system: "EWM",
        documentType: "EWM PGI Posting",
        tcode: "/SCWM/PRDO / /SCWM/RFUI",
        teamAction: "Pallets staged at Door, loaded into truck, and PGI posted in EWM.",
        tablesUpdated: ["/SCWM/AQUA"]
      },
      {
        sequence: 6,
        stage: "Automated ERP PGI & FI Accounting Update",
        system: "MM",
        documentType: "Material Document (Movement Type 601) & Billing Document",
        tcode: "Auto-posted via qRFC / VF01",
        teamAction: "ERP posts Movement Type 601: Debit Cost of Goods Sold (COGS - GBB/VAX), Credit Finished Goods Inventory (BSX). Billing (VF01) can now execute.",
        tablesUpdated: ["MKPF", "MSEG", "BKPF", "BSEG", "VBRK", "VBRP"]
      }
    ],
    mmPerspective: {
      responsibilities: [
        "Monitor Outbound Delivery status (VL06O)",
        "Validate Movement Type 601 posting in material document history",
        "Generate Customer Invoice / Billing Document (VF01)"
      ],
      documents: ["Sales Order", "Outbound Delivery", "Material Document (601)", "Billing Document (VF01)"],
      criticalTcodes: ["VA01", "VL01N", "VL06O", "VF01", "MB51"]
    },
    ewmPerspective: {
      responsibilities: [
        "Group ODOs into Waves and monitor Wave Release (/SCWM/WAVE)",
        "Direct RF Picking and Packing (/SCWM/RFUI & /SCWM/PACK)",
        "Manage Shipping Staging Areas and Dock Doors (/SCWM/DOOR)",
        "Post Goods Issue (PGI) upon truck departure"
      ],
      documents: ["Outbound Delivery Order (ODO)", "Wave", "Pick-HUs", "Shipping HUs", "Loading Lists"],
      criticalTcodes: ["/SCWM/PRDO", "/SCWM/WAVE", "/SCWM/PACK", "/SCWM/MON"]
    },
    queueAndInterfaces: {
      queueType: "SMQ1 (Outbound)",
      functionModuleOrEvent: "/SCWM/OUTB_DLV_SAVEREPLICA & BAPI_OUTBOUND_DELIVERY_CONFIRM_DEC",
      commonQueueErrors: ["Delivery item quantity mismatch", "Batch determination missing in ERP", "Serial number lock in ERP"],
      resolution: "Validate picked batch and serial number consistency in /SCWM/MON before re-triggering queue in SMQ1."
    },
    commonErrorsAndTroubleshooting: [
      {
        problem: "Wave release fails with error: 'No stock available for picking'",
        systemIdentified: "EWM",
        rootCause: "Stock exists in EWM but is in Quality Inspection (Q4) or Blocked (B6) stock type, or already allocated to another open task.",
        fixAction: "Check Physical Stock in /SCWM/MON (/SCWM/AQUA). Release QM stock or trigger emergency replenishment from high-rack to pick-face."
      }
    ]
  },
  {
    id: "int-stock-transport-order",
    title: "Plant-to-Plant Stock Transport Order (STO): MM STO -> 641 GI -> EWM 101 GR",
    processType: "Stock Transport Order",
    businessContext: "Inter-plant replenishment moving inventory from Manufacturing Plant 1000 to Regional Distribution Center Plant 2000 (EWM managed).",
    integrationPoint: "Cross-system STO integration connecting MM Two-Step Stock Transfer (641 Stock-in-Transit) to EWM Inbound Delivery.",
    documentFlow: [
      {
        sequence: 1,
        stage: "Stock Transport Order Creation",
        system: "MM",
        documentType: "STO (Doc Type UB)",
        tcode: "ME21N",
        teamAction: "Receiving Plant 2000 creates STO requesting 1,000 units from Supplying Plant 1000.",
        tablesUpdated: ["EKKO", "EKPO"]
      },
      {
        sequence: 2,
        stage: "Outbound Delivery at Supplying Plant",
        system: "MM",
        documentType: "Outbound Delivery (Doc Type NL)",
        tcode: "VL10B / VL02N",
        teamAction: "Supplying Plant picks goods and posts Goods Issue (Movement Type 641).",
        tablesUpdated: ["LIKP", "LIPS", "MSEG"]
      },
      {
        sequence: 3,
        stage: "Stock-in-Transit Tracking (MARC-TRAME)",
        system: "MM",
        documentType: "Stock in Transit (MARC-TRAME)",
        tcode: "MB5T",
        teamAction: "Inventory is legally owned by receiving plant but physically on highway transit.",
        tablesUpdated: ["MARC"]
      },
      {
        sequence: 4,
        stage: "Inbound Delivery Replication to Receiving EWM",
        system: "Integration Core (qRFC/CIF/PPF)",
        documentType: "Inbound Delivery (Doc Type EL)",
        tcode: "Auto-replicated via Output",
        teamAction: "Inbound Delivery created in Receiving Plant 2000 and replicated to EWM Warehouse.",
        tablesUpdated: ["/SCDL/DB_PROCH_I"]
      },
      {
        sequence: 5,
        stage: "EWM Receipt & Putaway (Movement Type 101)",
        system: "EWM",
        documentType: "EWM GR & Putaway WT",
        tcode: "/SCWM/PRDI / /SCWM/RFUI",
        teamAction: "Receiving EWM posts GR, clearing Stock-in-Transit in MB5T and updating receiving plant inventory.",
        tablesUpdated: ["/SCWM/AQUA", "MSEG", "EKBE"]
      }
    ],
    mmPerspective: {
      responsibilities: ["Create STO (ME21N)", "Track Stock in Transit in MB5T", "Resolve intransit discrepancies"],
      documents: ["STO (UB)", "Outbound Delivery (NL)", "Inbound Delivery (EL)", "Stock in Transit Ledger"],
      criticalTcodes: ["ME21N", "VL10B", "MB5T", "MMBE"]
    },
    ewmPerspective: {
      responsibilities: ["Receive Inbound Delivery at receiving dock", "Post GR and execute RF putaway"],
      documents: ["EWM Inbound Delivery", "Handling Units", "Putaway WTs"],
      criticalTcodes: ["/SCWM/PRDI", "/SCWM/MON", "/SCWM/RFUI"]
    },
    queueAndInterfaces: {
      queueType: "SMQ2 (Inbound)",
      functionModuleOrEvent: "/SCWM/INB_DLV_SAVEREPLICA",
      commonQueueErrors: ["Plant / Valuation Area mismatch on receiving delivery"],
      resolution: "Ensure Supply Chain Unit in /SCMB/SCU is mapped to receiving Plant 2000."
    },
    commonErrorsAndTroubleshooting: [
      {
        problem: "Discrepancy in MB5T: Supplying plant shipped 100 units, but receiving EWM received 95 units (5 damaged/lost).",
        systemIdentified: "MM",
        rootCause: "Partial GR posted in EWM leaving 5 units stuck in Transit stock.",
        fixAction: "Post 5 units scrap or return via Movement Type 557 or adjustment via 642 reversal in supplying plant."
      }
    ]
  }
];
