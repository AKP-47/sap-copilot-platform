// =========================================================================
// SAP COPILOT & TAGSKILLS ENTERPRISE CONNECTION MAP (END-TO-END FLOW)
// =========================================================================

export interface ProcessNode {
  id: string;
  step: number;
  title: string;
  module: string;
  icon: string;
  businessFunction: string;
  sapProcesses: string[];
  tcodes: string[];
  tables: string[];
  integrationPoints: string[];
  consultantTip: string;
}

export const ENTERPRISE_PROCESS_NODES: ProcessNode[] = [
  {
    "id": "customer",
    "step": 1,
    "title": "Customer Inquiry & Demand",
    "module": "Commercial / Market",
    "icon": "Users",
    "businessFunction": "Identifies client purchasing intent, product specification requirements, and requested delivery dates.",
    "sapProcesses": [
      "Customer Master Maintenance",
      "Sales Quotation (VA21)",
      "Credit Check Inquiry"
    ],
    "tcodes": [
      "VA21",
      "BP",
      "VD03"
    ],
    "tables": [
      "KNA1 (Customer Master)",
      "VBAK (Sales Doc Header)",
      "VBAP (Sales Doc Item)"
    ],
    "integrationPoints": [
      "Passes demand signals to Sales & Distribution (SD) and Demand Planning (IBP)."
    ],
    "consultantTip": "Always verify customer credit limit in BP/FD32 before confirming large sales orders."
  },
  {
    "id": "sales",
    "step": 2,
    "title": "Sales Order Booking",
    "module": "SAP SD (Sales & Distribution)",
    "icon": "ShoppingCart",
    "businessFunction": "Formalizes the legal customer sales contract, determines pricing, taxes, shipping points, and delivery dates.",
    "sapProcesses": [
      "Sales Order Creation (VA01)",
      "Available-to-Promise (ATP) Check",
      "Pricing Condition Technique (VK11)"
    ],
    "tcodes": [
      "VA01",
      "VA02",
      "VA03",
      "VK11"
    ],
    "tables": [
      "VBAK (Sales Header)",
      "VBAP (Sales Items)",
      "VBEP (Schedule Lines)",
      "KONV (Pricing Conditions)"
    ],
    "integrationPoints": [
      "Triggers Material Requirements Planning (MRP) demand reservation and sets up Outbound Delivery in EWM."
    ],
    "consultantTip": "Schedule lines in VBEP are where the confirmed delivery date is calculated based on factory lead time."
  },
  {
    "id": "planning",
    "step": 3,
    "title": "Demand Planning & MRP",
    "module": "SAP PP / IBP",
    "icon": "Calendar",
    "businessFunction": "Balances customer demand against available factory capacity and raw material inventories.",
    "sapProcesses": [
      "Material Requirements Planning Live (MD01N)",
      "Master Production Scheduling (MPS)",
      "BOM Explosion"
    ],
    "tcodes": [
      "MD01N",
      "MD04 (Stock/Req List)",
      "MD02",
      "CS03 (BOM)"
    ],
    "tables": [
      "MARC (Plant Data for Mat)",
      "MDKP (MRP Header)",
      "MDTB (MRP Items)",
      "MAST (BOM Link)"
    ],
    "integrationPoints": [
      "Generates Planned Orders (for in-house production) and Purchase Requisitions (for external purchasing)."
    ],
    "consultantTip": "In S/4HANA, MRP Live runs in-memory directly on the HANA DB, executing in seconds instead of overnight batch runs."
  },
  {
    "id": "procurement",
    "step": 4,
    "title": "Sourcing & Purchase Requisition",
    "module": "SAP MM-PUR (Purchasing)",
    "icon": "FileCheck",
    "businessFunction": "Identifies qualified suppliers, reviews purchasing contracts, and generates internal purchase requests.",
    "sapProcesses": [
      "Purchase Requisition (ME51N)",
      "Source of Supply Determination",
      "RFQ / Vendor Quotation (ME41)"
    ],
    "tcodes": [
      "ME51N",
      "ME52N",
      "ME57 (Assign Source)",
      "ME41"
    ],
    "tables": [
      "EBAN (Purchase Requisition)",
      "EINA (Purchasing Info Record Main)",
      "EINE (PIR Plant Data)",
      "EORD (Source List)"
    ],
    "integrationPoints": [
      "PRs are converted into Purchase Orders after multi-level managerial approval release strategy."
    ],
    "consultantTip": "Always maintain Source Lists (ME01) and Purchasing Info Records (ME11) to enable automatic PR-to-PO conversion."
  },
  {
    "id": "po",
    "step": 5,
    "title": "Purchase Order & Supplier EDI",
    "module": "SAP MM / SAP Ariba",
    "icon": "Send",
    "businessFunction": "Transmits binding purchase orders to external suppliers specifying prices, terms, and expected delivery windows.",
    "sapProcesses": [
      "Purchase Order Creation (ME21N)",
      "Release Strategy Approval (ME28 / ME29N)",
      "EDI 850 Order Dispatch"
    ],
    "tcodes": [
      "ME21N",
      "ME22N",
      "ME23N",
      "ME29N"
    ],
    "tables": [
      "EKKO (PO Header)",
      "EKPO (PO Items)",
      "EKET (PO Schedule Lines)",
      "EKBE (PO History)"
    ],
    "integrationPoints": [
      "Creates an open purchasing commitment in Financial Accounting (FI) and notifies the warehouse of inbound delivery."
    ],
    "consultantTip": "EKBE (Purchase Order History) tracks every subsequent Goods Receipt (101) and Invoice (MIRO) against that specific line item."
  },
  {
    "id": "inbound",
    "step": 6,
    "title": "Inbound Delivery Notification",
    "module": "SAP MM / LE-SHP",
    "icon": "Truck",
    "businessFunction": "Represents the Advanced Shipping Notification (ASN / EDI 856) sent by the supplier when the truck departs.",
    "sapProcesses": [
      "Inbound Delivery Creation (VL31N)",
      "Dock Door Appointment Scheduling",
      "Barcode HU Label Verification"
    ],
    "tcodes": [
      "VL31N",
      "VL32N",
      "VL33N",
      "VL06I"
    ],
    "tables": [
      "LIKP (Delivery Header)",
      "LIPS (Delivery Items)",
      "VEKP (Handling Unit Header)"
    ],
    "integrationPoints": [
      "Replicates from ERP into EWM as an Inbound Delivery Notification (/SCWM/PRDI) via qRFC."
    ],
    "consultantTip": "In modern EWM integration, Goods Receipt should be posted against the Inbound Delivery, NOT directly against the PO."
  },
  {
    "id": "gr",
    "step": 7,
    "title": "Goods Receipt & Physical Arrival",
    "module": "SAP MM-IM / Logistics",
    "icon": "PackageCheck",
    "businessFunction": "Physical truck arrives at the receiving dock. Staff verify quantities, inspect damage, and record official stock receipt.",
    "sapProcesses": [
      "MIGO Goods Receipt (Movement 101)",
      "Material Document Creation",
      "Automatic FI Posting (BSX / WRX)"
    ],
    "tcodes": [
      "MIGO",
      "MB51 (Mat Doc List)",
      "MMBE (Stock Overview)"
    ],
    "tables": [
      "MKPF (Mat Doc Header)",
      "MSEG (Mat Doc Items)",
      "MATDOC (S/4HANA Universal Doc)",
      "BKPF (FI Header)"
    ],
    "integrationPoints": [
      "Simultaneously increases inventory asset (Debit BSX) and creates GR/IR Clearing liability (Credit WRX) in FI."
    ],
    "consultantTip": "GR/IR Clearing Account (WRX) ensures that the company accounts for the inventory value before the vendor invoice arrives."
  },
  {
    "id": "ewm",
    "step": 8,
    "title": "Extended Warehouse Execution",
    "module": "SAP EWM (Warehouse Management)",
    "icon": "Warehouse",
    "businessFunction": "Controls physical warehouse movements: RF barcode scanning, complex POSC multi-step routing, and bin putaway.",
    "sapProcesses": [
      "Warehouse Task (WT) Creation",
      "Warehouse Order (WO) Assignment",
      "RF Terminal Confirmation (/SCWM/RFUI)"
    ],
    "tcodes": [
      "/SCWM/PRDI",
      "/SCWM/MON",
      "/SCWM/RFUI",
      "/SCWM/TO_CONF"
    ],
    "tables": [
      "/SCWM/ORDIM_O (Open WT)",
      "/SCWM/ORDIM_C (Confirmed WT)",
      "/SCWM/AQUA (Available Stock)",
      "/SCWM/LAGP (Storage Bins)"
    ],
    "integrationPoints": [
      "Updates available bin stock in EWM and syncs unrestricted stock status back to MM-IM storage location."
    ],
    "consultantTip": "POSC (Process-Oriented Storage Control) routes handling units through intermediate staging: Unload -> Decon -> Quality -> Putaway."
  },
  {
    "id": "qm",
    "step": 9,
    "title": "Quality Inspection & Usage Decision",
    "module": "SAP QM (Quality Management)",
    "icon": "CheckCircle2",
    "businessFunction": "Laboratory technicians sample received materials, record test metrics (pH, strength, dimensions), and approve for usage.",
    "sapProcesses": [
      "Inspection Lot Creation (Origin 01)",
      "Results Recording (QE51N)",
      "Usage Decision (QA11 / Movement 321)"
    ],
    "tcodes": [
      "QA11",
      "QA32",
      "QE51N",
      "QA03"
    ],
    "tables": [
      "QALS (Inspection Lot)",
      "QAMV (Inspection Specs)",
      "QASE (Sample Results)"
    ],
    "integrationPoints": [
      "Usage decision (UD) triggers automatic stock transfer from Quality Inspection Stock to Unrestricted Use (321)."
    ],
    "consultantTip": "If Quality fails, stock is transferred to Blocked Stock (124) or returned to vendor (Movement 122)."
  },
  {
    "id": "production",
    "step": 10,
    "title": "Production Consumption & Assembly",
    "module": "SAP PP / Shop Floor",
    "icon": "Factory",
    "businessFunction": "Warehouse issues raw materials to the manufacturing line (Movement 261), and the factory confirms finished goods.",
    "sapProcesses": [
      "Goods Issue to Production Order (261)",
      "Production Confirmation (CO11N)",
      "Finished Goods Receipt (101 / 131)"
    ],
    "tcodes": [
      "CO01",
      "CO11N",
      "MIGO (GI 261)",
      "MB1A"
    ],
    "tables": [
      "AFKO (Order Header)",
      "AFPO (Order Items)",
      "RESB (Reservations / Components)"
    ],
    "integrationPoints": [
      "Consumes raw material value (Debit Consumption GBB / Credit Raw Stock BSX) and credits Finished Goods to inventory."
    ],
    "consultantTip": "Backflushing automatically posts Movement 261 goods issue upon operation confirmation without manual MIGO scanning."
  },
  {
    "id": "invoice",
    "step": 11,
    "title": "3-Way Invoice Match & Accounts Payable",
    "module": "SAP MM-LIV / FI-AP",
    "icon": "Receipt",
    "businessFunction": "Accounts Payable receives the supplier's financial bill and performs automated 3-Way Matching against PO and Goods Receipt.",
    "sapProcesses": [
      "Logistics Invoice Verification (MIRO)",
      "3-Way Price & Quantity Match",
      "Vendor Liability Post (Debit WRX / Credit Vendor)"
    ],
    "tcodes": [
      "MIRO",
      "MIR4",
      "MRBR (Release Blocked Invoices)",
      "FBL1N"
    ],
    "tables": [
      "RBKP (Invoice Header)",
      "RSEG (Invoice Items)",
      "BSIK / BSAK (Vendor Open/Cleared Items)"
    ],
    "integrationPoints": [
      "Clears GR/IR account (Debit WRX) and creates vendor payable in FI (Credit Vendor Reconciliation Account)."
    ],
    "consultantTip": "If invoice price exceeds PO price beyond the tolerance limit (Tolerance Key PP in SPRO), MIRO places an automatic payment block."
  },
  {
    "id": "finance",
    "step": 12,
    "title": "Payment Clearing & Universal Journal",
    "module": "SAP FI / Treasury",
    "icon": "Landmark",
    "businessFunction": "Treasury executes automatic payment run (F110) to wire funds to the vendor, clearing open items on the balance sheet.",
    "sapProcesses": [
      "Automatic Payment Program (F110)",
      "Bank Ledger Reconciliation",
      "Universal Journal Line Consolidation"
    ],
    "tcodes": [
      "F110",
      "FAGLL03",
      "FBL1N",
      "FB03"
    ],
    "tables": [
      "ACDOCA (S/4HANA Universal Journal)",
      "BKPF (Accounting Doc Header)",
      "BSEG (Accounting Segment)"
    ],
    "integrationPoints": [
      "Debits Vendor Account and Credits Outgoing Bank Clearing Account, completing the entire Procure-to-Pay enterprise lifecycle."
    ],
    "consultantTip": "In S/4HANA, table ACDOCA holds both Financial Accounting (FI) and Controlling (CO) data in a single row without reconciliation ledgers."
  }
];
