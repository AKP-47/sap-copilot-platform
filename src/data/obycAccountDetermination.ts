export interface ObycRule {
  transactionKey: string;
  keyName: string;
  accountModifier?: string;
  description: string;
  debitCreditNature: string;
  sampleGlAccount: string;
  whenTriggered: string;
  sampleMovementTypes: string[];
}

export const OBYC_RULES: ObycRule[] = [
  {
    transactionKey: "BSX",
    keyName: "Inventory Posting (Balance Sheet)",
    description: "Debited or credited whenever physical valuated material inventory increases or decreases.",
    debitCreditNature: "Debit on GR / Stock Increase; Credit on GI / Stock Consumption",
    sampleGlAccount: "131000 (Raw Material Inventory Asset)",
    whenTriggered: "101 GR, 201 GI, 261 GI, 601 PGI, 561 Initial Upload",
    sampleMovementTypes: ["101", "102", "201", "261", "301", "501", "561", "601"]
  },
  {
    transactionKey: "WRX",
    keyName: "GR/IR Clearing Account (Temporary Liability)",
    description: "Acts as the interim clearing bridge between Goods Receipt (MIGO) and Invoice Verification (MIRO).",
    debitCreditNature: "Credit on 101 Goods Receipt; Debit on MIRO Invoice Posting",
    sampleGlAccount: "211000 (GR/IR Clearing Liability)",
    whenTriggered: "PO Goods Receipt (101) and Supplier Invoice Verification (MIRO)",
    sampleMovementTypes: ["101", "102", "122"]
  },
  {
    transactionKey: "GBB",
    keyName: "Offsetting Entry for Inventory Posting",
    accountModifier: "VBR (Consumption for Cost Center / Internal)",
    description: "Offsetting account used for internal goods issues to cost centers, orders, or asset projects.",
    debitCreditNature: "Debit on 201 GI (Expensed to P&L)",
    sampleGlAccount: "510000 (Raw Material Consumption Expense)",
    whenTriggered: "Goods Issue 201 to Cost Center, 261 to Production Order (VBO/VBR)",
    sampleMovementTypes: ["201", "261"]
  },
  {
    transactionKey: "GBB",
    keyName: "Offsetting Entry for Initial Stock Upload",
    accountModifier: "BSA (Initial Stock Cutover)",
    description: "Offsetting equity/clearing account used during initial stock upload at Go-Live cutover.",
    debitCreditNature: "Credit on 561 Initial Stock Upload",
    sampleGlAccount: "399999 (Data Migration Cutover Clearing)",
    whenTriggered: "Movement Type 561 / 563 / 565 at ERP Cutover Go-Live",
    sampleMovementTypes: ["561", "563", "565"]
  },
  {
    transactionKey: "PRD",
    keyName: "Price Differences",
    description: "Absorbs variances between standard price, PO price, and invoice price for Standard Price (S) materials.",
    debitCreditNature: "Debit if Invoice > Standard; Credit if Invoice < Standard",
    sampleGlAccount: "520000 (Price Difference Expense / Revenue)",
    whenTriggered: "101 GR when PO price <> Standard price, or MIRO when Invoice price <> PO price",
    sampleMovementTypes: ["101", "MIRO", "MR11"]
  }
];
