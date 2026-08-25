import { FlashcardItem } from "../types/sap";

export const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: "fc-01",
    category: "Master Data",
    module: "MM",
    frontQuestion: "Which transparent tables store General Material Master data vs Plant-specific data?",
    backAnswer: "MARA stores Client-level General Data (Base UoM, Material Group); MARC stores Plant-specific data (Purchasing Group, MRP parameters, Safety Stock).",
    keyTakeaway: "MARA = Client; MARC = Plant; MARD = Storage Location; MBEW = Valuation.",
    difficulty: "Easy"
  },
  {
    id: "fc-02",
    category: "Inventory & Accounting",
    module: "MM",
    frontQuestion: "What is the accounting entry for standard Goods Receipt (Movement Type 101) against a Purchase Order?",
    backAnswer: "Debit: Inventory Asset Account (Transaction Key BSX) | Credit: GR/IR Clearing Account (Transaction Key WRX)",
    keyTakeaway: "Establishes physical asset value and creates interim clearing liability.",
    difficulty: "Easy"
  },
  {
    id: "fc-03",
    category: "EWM Execution",
    module: "EWM",
    frontQuestion: "What is the difference between a Warehouse Task (WT) and a Warehouse Order (WO)?",
    backAnswer: "A Warehouse Task (WT) is a single atomic movement instruction from source bin to destination bin. A Warehouse Order (WO) is a work package that bundles one or more WTs according to Warehouse Order Creation Rules (WOCR) for worker execution.",
    keyTakeaway: "WT = atomic movement; WO = executable bundle for RF queue.",
    difficulty: "Medium"
  },
  {
    id: "fc-04",
    category: "Advanced EWM",
    module: "EWM",
    frontQuestion: "What does POSC stand for and what is its primary business function?",
    backAnswer: "Process-Oriented Storage Control. It manages multi-step warehouse handling (e.g. Unload -> Deconsolidate -> Quality Check -> Putaway) with automatic next-task creation.",
    keyTakeaway: "POSC coordinates station-to-station warehouse processes.",
    difficulty: "Hard"
  },
  {
    id: "fc-05",
    category: "Integration",
    module: "INTEGRATION",
    frontQuestion: "How do Availability Groups in EWM synchronize stock availability with ERP Storage Locations?",
    backAnswer: "Each EWM Storage Type is assigned an Availability Group (e.g. 001 for Receiving vs 002 for High-Rack). When a WT confirms putaway from 001 to 002, EWM triggers a Posting Change (Transfer 311) in ERP moving stock from ROD (Received on Dock) to AFS (Available for Sale).",
    keyTakeaway: "Availability Group maps EWM Stock Type to ERP Storage Location.",
    difficulty: "Hard"
  }
];
