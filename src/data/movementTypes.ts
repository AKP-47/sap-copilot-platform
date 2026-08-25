import { MovementTypeEntry } from "../types/sap";

export const MOVEMENT_TYPES: MovementTypeEntry[] = [
  {
    code: "101",
    description: "Goods Receipt for Purchase Order or Order into Warehouse",
    businessPurpose: "Acknowledge physical receipt of ordered materials from a vendor or production line into valuated inventory.",
    whenUsed: "When vendor shipment arrives against a valid Purchase Order, or finished goods arrive from shop-floor Production Order.",
    stockImpact: {
      sourceStockType: "External Supplier / Vendor",
      targetStockType: "Unrestricted Use (01), Quality Inspection (02), or Blocked (03)",
      quantityEffect: "+ Quantity increases in Plant / Storage Location"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Inventory Asset Account (BSX)",
      creditAccount: "GR/IR Clearing Account (WRX)",
      transactionKeys: ["BSX", "WRX", "PRD (if price variance)", "KDM (if currency diff)"],
      valueImpact: "Increases Company Code Inventory Asset Balance; establishes temporary liability in GR/IR."
    },
    relatedProcess: "Procure-to-Pay (P2P) & Make-to-Stock (M2S)",
    relatedTcodes: ["MIGO", "MB01", "VL32N", "ME23N", "/SCWM/PRDI"],
    visualFlow: ["Purchase Order (ME21N)", "Inbound Delivery (VL31N)", "Goods Receipt 101 (MIGO)", "Stock & Quant Update (MARD / AQUA)", "Material Doc (MKPF/MSEG)", "Accounting Doc (BKPF/BSEG)"],
    industryScenarios: [
      {
        industry: "automotive",
        scenarioText: "An automotive assembly plant receives 500 brake calipers from Bosch under PO 4500010020. The shipment arrives with barcode labels.",
        challengeQuestion: "The receiving clerk scans the ASN barcode. If the material master is flagged for Batch Management, what will MIGO mandate during 101 GR?",
        options: [
          "MIGO will require a Batch Number (Internal or External vendor batch) before posting.",
          "The system will delete the PO line.",
          "The system will post directly to scrap.",
          "Batch number is never required during 101."
        ],
        correctIndex: 0,
        consultantReasoning: "When a material has the Batch Management indicator (MARC-XCHPF = 'X'), SAP strictly blocks 101 Goods Receipt until a valid Batch Number and Valuation are assigned for regulatory traceability."
      },
      {
        industry: "pharma",
        scenarioText: "A pharmaceutical vaccine manufacturer receives 10,000 vials of adjuvant. Because sterility is critical, goods must not be sold immediately.",
        challengeQuestion: "Into which stock type should Movement Type 101 post upon arrival?",
        options: [
          "Quality Inspection Stock (Stock Type 2 / QM Inspection Lot 01)",
          "Unrestricted Use Stock immediately available for sale",
          "Blocked Scrap Stock",
          "Non-valuated sample stock"
        ],
        correctIndex: 0,
        consultantReasoning: "Regulated pharma mandates that raw materials post into Quality Inspection stock (101 into QI) triggering a QM inspection lot. Stock cannot move to Unrestricted until Usage Decision (UD) 321 is approved."
      }
    ],
    interviewQuestions: [
      "What accounting document is generated when posting Movement Type 101 for a Purchase Order with Standard Price S and PO price higher than Standard?",
      "Debit: Inventory (BSX) at Standard Price; Credit: GR/IR (WRX) at PO Price; Debit: Price Difference (PRD) with variance amount.",
      "What is the difference between Movement Type 101 and 103?"
    ]
  },
  {
    code: "102",
    description: "Reversal of Goods Receipt for Purchase Order (Cancellation of 101)",
    businessPurpose: "Cancels an erroneously posted 101 Goods Receipt, reversing both inventory quantities and financial ledger entries exactly.",
    whenUsed: "When a warehouse clerk entered the wrong quantity, wrong batch, or wrong PO number during 101 MIGO.",
    stockImpact: {
      sourceStockType: "Unrestricted Use / Quality Inspection",
      targetStockType: "Zeroed (Removed from warehouse)",
      quantityEffect: "- Quantity decreases in Plant / Storage Location"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "GR/IR Clearing Account (WRX)",
      creditAccount: "Inventory Asset Account (BSX)",
      transactionKeys: ["WRX", "BSX", "PRD"],
      valueImpact: "Decreases Inventory Balance and offsets GR/IR liability."
    },
    relatedProcess: "Procure-to-Pay Reversal & Correction",
    relatedTcodes: ["MIGO", "MBST", "MB03"],
    visualFlow: ["Original 101 Mat Doc", "MIGO Cancellation (102)", "Stock Decrement (MARD)", "Reversed Accounting Doc (BKPF/BSEG)", "PO History EKBE Reset"],
    industryScenarios: [
      {
        industry: "aerospace",
        scenarioText: "Receiving clerk accidentally posted 101 GR for 50 titanium forgings under PO 4500088990 instead of PO 4500088991.",
        challengeQuestion: "How should the clerk rectify the error in SAP?",
        options: [
          "Post MIGO Cancellation with Movement Type 102 referencing the original 101 Material Document, then post 101 against the correct PO.",
          "Manually edit table MSEG in SE16N.",
          "Sell the parts to a scrap dealer.",
          "Post Goods Issue 201 to Cost Center."
        ],
        correctIndex: 0,
        consultantReasoning: "Standard SAP auditing strictly prohibits database deletions. Transaction MIGO 'Cancellation' (Movement Type 102) reverses the exact quantities and accounting lines, reopening the original PO schedule line."
      }
    ],
    interviewQuestions: [
      "Can you post a 102 reversal if the stock received in 101 has already been consumed in production (261)?",
      "No. SAP will throw Error M7021 (Deficit of SL Unrestricted-use stock) because physical stock is no longer available in that SLoc."
    ]
  },
  {
    code: "122",
    description: "Return Delivery to Vendor from Warehouse Stock",
    businessPurpose: "Physically ships rejected or defective goods back to the vendor after Goods Receipt has already been completed.",
    whenUsed: "When quality inspection detects defects in raw materials after 101 GR, or vendor requests return of recalled batches.",
    stockImpact: {
      sourceStockType: "Unrestricted Use or Quality Inspection",
      targetStockType: "Shipped back to Vendor",
      quantityEffect: "- Quantity removed from Plant / Storage Location"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "GR/IR Clearing Account (WRX)",
      creditAccount: "Inventory Asset Account (BSX)",
      transactionKeys: ["WRX", "BSX"],
      valueImpact: "Reduces inventory value and creates debit balance in GR/IR to offset incoming vendor credit memo."
    },
    relatedProcess: "Supplier Return & Quality Claim Processing",
    relatedTcodes: ["MIGO", "ME21N (Return PO)", "VL01NO"],
    visualFlow: ["Quality Defect Detected", "MIGO Return Delivery 122", "Return Delivery Note Generated", "Stock Decrement", "Credit Memo Expected in MIRO"],
    industryScenarios: [
      {
        industry: "food_beverage",
        scenarioText: "A shipment of 2,000 kg milk powder passed initial dock count but lab microbial test failed 2 days later.",
        challengeQuestion: "What is the correct movement type to return the 2,000 kg back to the dairy supplier referencing original PO?",
        options: [
          "Movement Type 122 (Return Delivery to Vendor)",
          "Movement Type 551 (Scrapping)",
          "Movement Type 201 (Cost Center GI)",
          "Movement Type 311 (Transfer Posting)"
        ],
        correctIndex: 0,
        consultantReasoning: "Movement Type 122 links directly to the original Material Document and PO, updating PO history with a return line and enabling financial credit settlement."
      }
    ],
    interviewQuestions: [
      "What is the difference between Movement Type 102 (Cancellation) and Movement Type 122 (Return Delivery)?",
      "102 is an administrative cancellation of a mistaken transaction (usually same day); 122 is a physical logistics return to supplier generating shipping return documents and vendor credit memo expectation."
    ]
  },
  {
    code: "201",
    description: "Goods Issue for Cost Center (Internal Consumption)",
    businessPurpose: "Withdraws material from warehouse inventory for internal departmental consumption, expensing the cost directly to a Cost Center.",
    whenUsed: "When maintenance, office, or engineering staff withdraw supplies (lubricants, gloves, spare parts) for internal use.",
    stockImpact: {
      sourceStockType: "Unrestricted Use Stock",
      targetStockType: "Consumed / Expensed (No longer in inventory)",
      quantityEffect: "- Quantity decreases in Plant / SLoc"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Cost Center Consumption Expense Account (GBB / VBR)",
      creditAccount: "Inventory Asset Account (BSX)",
      transactionKeys: ["GBB", "VBR", "BSX"],
      valueImpact: "Reduces Balance Sheet Inventory; increases Departmental P&L Operating Expense."
    },
    relatedProcess: "Internal Material Consumption (Cost Center Accounting)",
    relatedTcodes: ["MIGO", "MB1A", "MB51", "KS03"],
    visualFlow: ["Reservation (MB21)", "MIGO Goods Issue 201", "Stock Decrement (MARD)", "Controlling Doc (COPA/CO-OM)", "FI Expense Posting"],
    industryScenarios: [
      {
        industry: "mechanical",
        scenarioText: "The plant maintenance team withdraws \$1,500 worth of hydraulic oil for Machining Center #4.",
        challengeQuestion: "What mandatory Controlling (CO) object must be provided during MIGO 201?",
        options: [
          "A valid Cost Center (KOSTL) with open posting period in CO",
          "A Sales Order number",
          "A Customer Master number",
          "A Vendor Purchase Order"
        ],
        correctIndex: 0,
        consultantReasoning: "Movement Type 201 requires Account Assignment to a Cost Center (table EKKN / COBL) so the expense is debited to the department's budget."
      }
    ],
    interviewQuestions: [
      "Which OBYC transaction key and account modifier govern Movement Type 201 accounting determination?",
      "Transaction Key GBB with Account Modifier VBR (Internal goods issue to consumption / cost center)."
    ]
  },
  {
    code: "261",
    description: "Goods Issue for Production Order / Process Order (Component Consumption)",
    businessPurpose: "Issues raw materials and semi-finished components from warehouse storage to a Production Order on the shop floor.",
    whenUsed: "During manufacturing execution when components are staged or backflushed into a work order.",
    stockImpact: {
      sourceStockType: "Unrestricted Use in Raw/Component Storage Location",
      targetStockType: "Work In Process (WIP) on Shop Floor Order",
      quantityEffect: "- Quantity decreases in component SLoc; increases Order WIP"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Consumption of Raw Materials / Order Cost (GBB / VBO / VBR)",
      creditAccount: "Raw Material Inventory Asset Account (BSX)",
      transactionKeys: ["GBB", "VBO", "BSX"],
      valueImpact: "Credits Raw Material Inventory and debits Production Order WIP Balance."
    },
    relatedProcess: "Plan-to-Produce (P2P) & Manufacturing Execution",
    relatedTcodes: ["MIGO", "CO11N", "CO15", "MB1A", "CO02"],
    visualFlow: ["Production Order (CO01)", "Component Staging", "Goods Issue 261 (MIGO/Backflush)", "Order Cost Debit (AUFK)", "Inventory Decrement"],
    industryScenarios: [
      {
        industry: "electronics",
        scenarioText: "A PCB assembly line consumes 5,000 SMD capacitors for Production Order 1000450.",
        challengeQuestion: "If backflushing is configured on the Material Master (MARC-RGEKZ), when does Movement Type 261 post?",
        options: [
          "Automatically during Production Order Operation Confirmation (CO11N / CO15).",
          "Manually 3 days before manufacturing starts.",
          "During Purchase Order creation.",
          "During Customer Invoice creation."
        ],
        correctIndex: 0,
        consultantReasoning: "Backflushing automatically triggers Movement Type 261 goods issue in the background when the production worker confirms the manufacturing operation in CO11N."
      }
    ],
    interviewQuestions: [
      "What is the difference between Movement Type 261 and 262?",
      "261 is Goods Issue of components to a Production Order; 262 is the reversal (return of unused components from Order back to warehouse inventory)."
    ]
  },
  {
    code: "301",
    description: "Transfer Posting Plant to Plant (One-Step)",
    businessPurpose: "Transfers material stock between two different manufacturing plants in a single transaction step.",
    whenUsed: "When two plants are located in close physical proximity (e.g. across the street) and no transit delay exists.",
    stockImpact: {
      sourceStockType: "Plant A / Storage Location A",
      targetStockType: "Plant B / Storage Location B",
      quantityEffect: "- Qty in Supplying Plant; + Qty in Receiving Plant"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Receiving Plant Inventory Account (BSX)",
      creditAccount: "Supplying Plant Inventory Account (BSX) & Intercompany clearing if across CoCodes",
      transactionKeys: ["BSX", "AUM (if valuation difference)"],
      valueImpact: "Shifts inventory asset value between plant valuation areas; posts variance to AUM if standard prices differ."
    },
    relatedProcess: "Internal Logistics & Inter-Plant Transfer",
    relatedTcodes: ["MIGO", "MB1B", "MMBE"],
    visualFlow: ["MIGO Transfer Posting 301", "Stock Decrement Plant 1000", "Stock Increment Plant 2000", "Price Variance (AUM)", "FI Document"],
    industryScenarios: [
      {
        industry: "industrial",
        scenarioText: "Plant 1000 (Valuation Price \$10.00) transfers 100 units to Plant 2000 (Valuation Price \$12.00) via 301.",
        challengeQuestion: "How does SAP account for the \$2.00/unit valuation variance between the two plants?",
        options: [
          "Posts the \$200 total difference to Expense/Revenue from Stock Transfer account (Transaction Key AUM).",
          "Fails with error 'Prices do not match'.",
          "Deducts \$200 from vendor balance.",
          "Deletes the material in Plant 2000."
        ],
        correctIndex: 0,
        consultantReasoning: "When standard prices differ across plants, transaction key AUM (Expense/Revenue from Stock Transfer) absorbs the difference so both plant inventory ledgers reflect their respective standard valuations."
      }
    ],
    interviewQuestions: [
      "When would you choose a Two-Step Transfer (303/305 or STO 641) over a One-Step Transfer (301)?",
      "When plants are geographically distant and goods spend days on trucks/trains. Two-step tracks Stock-in-Transit (MARC-TRAME) for insurance and balance sheet accuracy."
    ]
  },
  {
    code: "311",
    description: "Transfer Posting Storage Location to Storage Location (One-Step)",
    businessPurpose: "Transfers stock between two storage locations within the SAME physical plant in a single step.",
    whenUsed: "Moving parts from Central Receiving SLoc 0001 to Shop Floor Assembly SLoc 0002.",
    stockImpact: {
      sourceStockType: "Plant 1000 / SLoc 0001",
      targetStockType: "Plant 1000 / SLoc 0002",
      quantityEffect: "- Qty in SLoc 0001; + Qty in SLoc 0002 (Total Plant stock unchanged)"
    },
    accountingImpact: {
      isFinancialPosting: false,
      valueImpact: "NO financial accounting document created (because valuation area is at Plant level, total plant inventory value remains identical)."
    },
    relatedProcess: "Internal Warehouse Replenishment",
    relatedTcodes: ["MIGO", "MB1B", "MMBE"],
    visualFlow: ["MIGO Transfer Posting 311", "Decrement SLoc 0001", "Increment SLoc 0002", "Material Doc Only (No FI Doc)"],
    industryScenarios: [
      {
        industry: "cpg",
        scenarioText: "Warehouse moves 200 cases from Bulk SLoc to Pick-Face SLoc within Plant 1000.",
        challengeQuestion: "Why is there NO accounting document generated for Movement Type 311?",
        options: [
          "Because Valuation Area is at Plant level; moving stock between SLocs inside the same plant does not alter total plant asset value.",
          "Because CPG materials are non-valuated.",
          "Because finance is bypassed in MIGO.",
          "Because the transaction is temporary."
        ],
        correctIndex: 0,
        consultantReasoning: "In standard SAP, Valuation Area is defined at Plant level (T001K). Since 311 occurs within the same plant, inventory asset balance sheet totals do not change, so no FI document (BKPF) is generated."
      }
    ],
    interviewQuestions: [
      "Does Movement Type 311 create an accounting document?",
      "Generally NO, unless split valuation with different valuation types is involved."
    ]
  },
  {
    code: "321",
    description: "Transfer Posting Quality Inspection to Unrestricted-Use Stock",
    businessPurpose: "Releases materials from Quality Inspection status to Unrestricted stock upon passing QC laboratory tests.",
    whenUsed: "When Quality Management (QM) issues a positive Usage Decision (UD), or warehouse clears inspected goods.",
    stockImpact: {
      sourceStockType: "Quality Inspection Stock (Stock Type 2)",
      targetStockType: "Unrestricted Use Stock (Stock Type 1)",
      quantityEffect: "Moves stock category from QI to Unrestricted"
    },
    accountingImpact: {
      isFinancialPosting: false,
      valueImpact: "Changes stock status; no balance sheet change unless split valuation applies."
    },
    relatedProcess: "Quality Management (QM) Release",
    relatedTcodes: ["MIGO", "QA11", "QA32", "MB1B"],
    visualFlow: ["QM Usage Decision (QA11)", "Stock Posting 321", "QI Stock Decrement", "Unrestricted Stock Increment"],
    industryScenarios: [
      {
        industry: "pharma",
        scenarioText: "Lab confirms 5,000 kg active ingredient meets USP purity standards.",
        challengeQuestion: "What transaction in SAP QM triggers Movement Type 321 automatically?",
        options: [
          "QA11 (Record Usage Decision with Stock Posting to Unrestricted)",
          "MM01 (Material Master)",
          "ME21N (Purchase Order)",
          "FB01 (FI Document)"
        ],
        correctIndex: 0,
        consultantReasoning: "When QM is active, Usage Decision in QA11 posts 321 movement type in the background, making stock available for production orders and MRP."
      }
    ],
    interviewQuestions: [
      "Can a user manually post Movement Type 321 in MIGO if QM Inspection Type 01 is active in Material Master?",
      "No. SAP blocks manual MIGO 321 posting and mandates that stock posting be executed via QM Usage Decision (QA11/QA32)."
    ]
  },
  {
    code: "501",
    description: "Receipt Without Purchase Order into Unrestricted-Use Stock",
    businessPurpose: "Receives materials into warehouse inventory without any reference to a Purchase Order or vendor contract.",
    whenUsed: "Receiving free vendor promotional samples, customer gifts, or legacy parts found during yard cleanup.",
    stockImpact: {
      sourceStockType: "External (No PO)",
      targetStockType: "Unrestricted Use Stock",
      quantityEffect: "+ Quantity increases in Plant / SLoc"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Inventory Asset Account (BSX)",
      creditAccount: "Other Operating Income / Consumption Account (GBB / ZOB)",
      transactionKeys: ["BSX", "GBB", "ZOB"],
      valueImpact: "Increases Company Code Inventory Asset and recognizes non-operating gain."
    },
    relatedProcess: "Unplanned Goods Receipt & Sample Ingestion",
    relatedTcodes: ["MIGO", "MB1C"],
    visualFlow: ["MIGO 501 (No PO)", "Enter Material & SLoc", "Stock Increment", "Debit Inventory (BSX) / Credit Gain (GBB-ZOB)"],
    industryScenarios: [
      {
        industry: "retail",
        scenarioText: "A supplier sends 50 free marketing display banners alongside a retail delivery.",
        challengeQuestion: "Why should Movement Type 501 be strictly restricted by user authorizations in a production environment?",
        options: [
          "Because it creates inventory and financial gains without procurement audit trails, creating fraud risk if abused.",
          "Because it deletes vendor master records.",
          "Because it halts MRP execution.",
          "Because it requires 10 approvers."
        ],
        correctIndex: 0,
        consultantReasoning: "501 bypasses PO controls, allowing users to introduce stock without buyer or manager PO approvals. Internal audit teams heavily scrutinize 501 postings."
      }
    ],
    interviewQuestions: [
      "What accounting entry is posted during Movement Type 501 for a valuated material?",
      "Debit: Inventory Asset Account (BSX); Credit: Other Operating Income / Gain from Free Goods (GBB / ZOB)."
    ]
  },
  {
    code: "561",
    description: "Initial Entry of Stock Balances (Cutover Go-Live)",
    businessPurpose: "Uploads opening inventory quantities and values into SAP during initial ERP system go-live cutover.",
    whenUsed: "During SAP Go-Live weekend migration when legacy ERP balances are uploaded into SAP S/4HANA.",
    stockImpact: {
      sourceStockType: "Legacy System Cutover Balance",
      targetStockType: "Unrestricted Use (561), Quality (563), or Blocked (565)",
      quantityEffect: "+ Initializes starting stock balance in SAP"
    },
    accountingImpact: {
      isFinancialPosting: true,
      debitAccount: "Inventory Asset Account (BSX)",
      creditAccount: "Initial Stock Upload / Cutover Clearing Account (GBB / BSA)",
      transactionKeys: ["BSX", "GBB", "BSA"],
      valueImpact: "Capitalizes opening inventory on SAP Balance Sheet against Cutover Equity/Clearing."
    },
    relatedProcess: "Cutover Migration & SAP System Implementation Go-Live",
    relatedTcodes: ["MIGO", "MB1C", "LSMW", "LTMC", "BAPI_GOODSMVT_CREATE"],
    visualFlow: ["Legacy Inventory Extract", "Cutover Upload Tool (LTMC/BAPI)", "MIGO 561 Posting", "Debit Inventory (BSX)", "Credit Migration Clearing (GBB-BSA)"],
    industryScenarios: [
      {
        industry: "automotive",
        scenarioText: "During SAP S/4HANA go-live weekend, 150,000 raw material lines worth \$45,000,000 must be uploaded before Monday 6 AM shift.",
        challengeQuestion: "Which transaction key in OBYC is credited during 561 stock upload?",
        options: [
          "GBB with Account Modifier BSA (Initial Stock Upload Clearing Account)",
          "WRX (GR/IR Clearing)",
          "PRD (Price Differences)",
          "BSX (Inventory Asset)"
        ],
        correctIndex: 0,
        consultantReasoning: "Transaction Key GBB modifier BSA represents the Inventory Data Migration Clearing account, which balances out against legacy general ledger opening balances."
      }
    ],
    interviewQuestions: [
      "Why must Movement Type 561 be locked or revoked from user roles after SAP Go-Live?",
      "561 is strictly a cutover tool. If left accessible in steady-state operations, users could inject untracked stock, distorting financials and violating SOX audit compliance."
    ]
  }
];
