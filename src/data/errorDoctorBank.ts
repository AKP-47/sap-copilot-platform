import { ErrorDoctorItem } from "../types/sap";

export const ERROR_DOCTOR_DATA: ErrorDoctorItem[] = [
  {
    id: "err-m7021",
    errorCode: "M7021",
    title: "Deficit of SL Unrestricted-use stock [QTY] [UoM] [PLANT] [SLOC]",
    module: "MM",
    messageText: "Deficit of SL Unrestricted-use stock 50 EA 1000 0001",
    typicalTrigger: "Occurs during Goods Issue (201, 261, 601), Transfer Posting (311, 301), or GR Reversal (102, 122) when system stock is insufficient.",
    rootCauseAnalysis: "Physical or book inventory in table MARD/MSEG is lower than the requested withdrawal quantity. This happens if stock was already consumed, reserved, or moved to another SLoc/Batch.",
    stepByStepFix: [
      "1. Open transaction MMBE and inspect stock breakdown for Material, Plant, and Storage Location.",
      "2. Check Material Document History in MB51 to verify if another user issued or transferred the stock.",
      "3. If stock is in Quality Inspection (QI) or Blocked, transfer it to Unrestricted via QA11 or MIGO 321/343.",
      "4. If stock is physically present but missing in system, post 101 GR against PO or investigate missing production confirmation."
    ],
    tcodesToCheck: ["MMBE", "MB51", "MB52", "MIGO"],
    sproPathToVerify: "SPRO -> MM -> Inventory Management -> Goods Issue -> Allow Negative Stocks (OMJ1) if shop-floor line feeding allows temporary deficit."
  },
  {
    id: "err-m7053",
    errorCode: "M7053",
    title: "Posting only possible in periods [MM/YYYY] and [MM/YYYY] in company code [BUKRS]",
    module: "MM",
    messageText: "Posting only possible in periods 07/2026 and 06/2026 in company code 1000",
    typicalTrigger: "Occurs at the beginning of a new calendar month when warehouse or purchasing users attempt to post MIGO, MIRO, or EWM goods movements before period closing.",
    rootCauseAnalysis: "Materials Management posting period has not been rolled over to the current calendar month in table MARV.",
    stepByStepFix: [
      "1. Check current open MM periods using transaction MMRV.",
      "2. Execute Period Closing transaction MMPV to shift the open period to the current month.",
      "3. Verify that Financial Accounting (FI) posting periods are also opened in transaction OB52.",
      "4. Re-try the MIGO or EWM posting."
    ],
    tcodesToCheck: ["MMRV", "MMPV", "OB52"],
    sproPathToVerify: "SPRO -> Financial Accounting -> Financial Accounting Global Settings -> Ledgers -> Fiscal Year and Posting Periods -> Open and Close Posting Periods"
  },
  {
    id: "err-ewm-todet002",
    errorCode: "/SCWM/UI_TODET002",
    title: "No storage bin found for putaway",
    module: "EWM",
    messageText: "Could not determine destination storage bin for warehouse task creation",
    typicalTrigger: "Occurs during Inbound Putaway WT creation in /SCWM/PRDI, /SCWM/TODET_I, or RF Putaway.",
    rootCauseAnalysis: "1) Storage Type Search Sequence failed to find an active storage type, or 2) All candidate bins in Storage Type are fully occupied / exceed weight or volume limits, or 3) Bins are locked for putaway (/SCWM/LAGP-SKZUA = 'X').",
    stepByStepFix: [
      "1. Check Putaway Control Indicator (PACI) in Warehouse Product Master (/SCWM/MAT1).",
      "2. Verify Storage Type Search Sequence in /SCWM/IMG for PACI + Warehouse Process Type.",
      "3. Open /SCWM/MON -> Storage Bins, and check if candidate bins are full, blocked, or missing capacity figures.",
      "4. Create new bins via /SCWM/LS10 or execute bin sorting /SCWM/SBST."
    ],
    tcodesToCheck: ["/SCWM/MAT1", "/SCWM/MON", "/SCWM/LS02N", "/SCWM/SBST"],
    sproPathToVerify: "SPRO -> SCM EWM -> Goods Receipt Process -> Strategies -> Storage Type Search"
  },
  {
    id: "err-smq2-queue-hang",
    errorCode: "SYSFAIL-QRFC",
    title: "qRFC Queue Stuck in SMQ2: /SCWM/INB_DLV_SAVEREPLICA",
    module: "EWM",
    messageText: "Status SYSFAIL: RFC error during delivery replication from ERP to EWM",
    typicalTrigger: "Occurs when an Inbound Delivery (VL31N) or Outbound Delivery (VL01N) fails to replicate between ERP and EWM.",
    rootCauseAnalysis: "Master data mismatch between ERP and EWM (e.g. Product not extended in EWM, Plant-to-SCU mapping missing, or delivery is locked by user in ERP).",
    stepByStepFix: [
      "1. Open transaction SMQ2 in EWM (or ERP). Locate stuck queue starting with DLV*.",
      "2. Double click the queue entry to view the exact error log message.",
      "3. If product is missing in EWM, execute /SCWM/MAT1 / CFM1-CFM2 (Core Interface) to replicate product master.",
      "4. Once root cause data is fixed, select the queue entry in SMQ2 and click 'Activate Queue' (F6)."
    ],
    tcodesToCheck: ["SMQ2", "SMQ1", "SM12", "/SCWM/MAT1"],
    sproPathToVerify: "SPRO -> SCM EWM -> Interfaces -> ERP Integration"
  }
];
