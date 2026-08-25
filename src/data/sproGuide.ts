import { SproNode } from "../types/sap";

export const SPRO_GUIDE: SproNode[] = [
  {
    id: "spro-mm-mat-types",
    title: "Define Attributes of Material Types",
    module: "MM",
    tcodeShortcut: "OMS2",
    path: ["SPRO", "Logistics - General", "Material Master", "Basic Settings", "Material Types", "Define Attributes of Material Types"],
    purpose: "Configures screen view sequence, internal/external number ranges, and quantity/value updating per valuation area.",
    keyTables: ["T134", "T134M"],
    criticalFields: ["MENGU (Quantity Updating)", "WERTU (Value Updating)", "KKREF (Account Category Reference)"],
    bestPracticeTip: "Always copy from SAP standard material types (e.g. ROH, HALB, FERT) to preserve mandatory field selection reference keys.",
    dependencies: ["Valuation Area setup (OX14)", "Number Ranges (MMNR)"]
  },
  {
    id: "spro-mm-po-rel",
    title: "Define Release Procedure for Purchase Orders",
    module: "MM",
    tcodeShortcut: "OMEC / SPRO",
    path: ["SPRO", "Materials Management", "Purchasing", "Purchase Order", "Release Procedure for Purchase Orders"],
    purpose: "Establishes multi-level electronic approval workflow for POs based on value, plant, or purchasing organization.",
    keyTables: ["T16FB", "T16FC", "T16FD", "T16FS"],
    criticalFields: ["FRGGR (Release Group)", "FRGCO (Release Code)", "FRGKE (Release Indicator)", "Changeability Flag (4 or 6)"],
    bestPracticeTip: "Ensure characteristics in CT04 link to CEKKO table fields with identical data types to prevent classification runtime errors.",
    dependencies: ["Classification System (CT04 / CL02)", "Authorization Objects (M_EINK_FRG)"]
  },
  {
    id: "spro-ewm-whse-def",
    title: "Define Warehouse Number in EWM",
    module: "EWM",
    tcodeShortcut: "/SCWM/IMG",
    path: ["SPRO", "SCM Extended Warehouse Management", "Extended Warehouse Management", "Master Data", "Define Warehouse Number"],
    purpose: "Defines the 4-character EWM Warehouse Number, assigning default time zone, unit of measure, and weight/volume units.",
    keyTables: ["/SCWM/T300", "/SCWM/T300T"],
    criticalFields: ["LGNUM (Warehouse Number)", "SCU (Supply Chain Unit)", "CUSTODIAN (Business Partner)"],
    bestPracticeTip: "Always map Supply Chain Unit with correct geographic coordinates to enable accurate travel distance calculations.",
    dependencies: ["Supply Chain Unit definition (/SCMB/SCU)", "Business Partner Custodian"]
  },
  {
    id: "spro-ewm-posc-def",
    title: "Define Process-Oriented Storage Control (POSC)",
    module: "EWM",
    tcodeShortcut: "/SCWM/IMG",
    path: ["SPRO", "SCM Extended Warehouse Management", "Extended Warehouse Management", "Cross-Process Settings", "Storage Control", "Define Process-Oriented Storage Control"],
    purpose: "Defines multi-step storage processes assembling external steps (UNLD, DECO, QIS, PTWY) with automated next-task triggering.",
    keyTables: ["/SCWM/TPROCS", "/SCWM/TSTEP"],
    criticalFields: ["PROCS (Storage Process)", "STEP (External Process Step)", "AUTO_WT (Auto WT Creation Indicator)"],
    bestPracticeTip: "Ensure Work Centers mapped to steps have valid Inbound/Outbound storage bins defined in /SCWM/TWORKC.",
    dependencies: ["Work Centers (/SCWM/TWORKC)", "Storage Types (/SCWM/T331)"]
  }
];
