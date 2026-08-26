// =========================================================================
// SAP COPILOT & TAGSKILLS LEVEL-BASED ADAPTIVE CURRICULUM ARCHITECTURE
// =========================================================================

export type LearningTier = "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL";

export interface LevelCurriculumData {
  levelTitle: string;
  targetGoal: string;
  conceptSummary: string;
  businessContext: string;
  industryScenario: {
    industry: string;
    scenarioText: string;
  };
  sapProcess: {
    headline: string;
    steps: { step: string; desc: string }[];
  };
  decisionQuestion: {
    prompt: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      whyCorrect: string;
      whyOthersWrong: string;
    }[];
  };
  consultantReasoning: string;
  solution: string;
  consequences: {
    business: string;
    sap: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    whyAnalysis: {
      correct: string;
      wrongOptions: string[];
      consultantTip: string;
    };
  }[];
  nextChallenge: string;
}

export interface AdaptiveTopic {
  id: string;
  conceptName: string;
  category: string;
  levels: Record<LearningTier, LevelCurriculumData>;
}

export const ADAPTIVE_TOPICS: AdaptiveTopic[] = [
  {
    "id": "concept_mvt_101",
    "conceptName": "Movement Type 101 \u2013 Goods Receipt for Purchase Order",
    "category": "MM-IM & Procurement",
    "levels": {
      "BEGINNER": {
        "levelTitle": "Level 1: Fresher / Beginner",
        "targetGoal": "Build foundation: Learn what a Goods Receipt is, identify the business event, and understand basic terms.",
        "conceptSummary": "Movement Type 101 is the standard SAP code used when a company physically receives materials delivered by an external supplier against a Purchase Order.",
        "businessContext": "A company orders raw materials (e.g. 500 brake pads or 100 boxes of packaging). When the supplier's delivery truck arrives at the factory gate and unloads the goods, the company must record that the items have arrived.",
        "industryScenario": {
          "industry": "Automotive Manufacturing \ud83d\ude97",
          "scenarioText": "An automotive factory ordered 500 brake calipers from a local supplier. The delivery truck has arrived at the dock with the shipment. The warehouse receiving clerk needs to record that the physical boxes are now inside the factory warehouse."
        },
        "sapProcess": {
          "headline": "Basic Procure-to-Pay Sequence",
          "steps": [
            {
              "step": "1. Need Identified",
              "desc": "Factory realizes it needs 500 calipers."
            },
            {
              "step": "2. Purchase Order",
              "desc": "Purchasing department issues PO to supplier."
            },
            {
              "step": "3. Delivery",
              "desc": "Supplier ships goods to factory dock."
            },
            {
              "step": "4. Goods Receipt (101)",
              "desc": "Receiving clerk enters MIGO transaction using Movement 101."
            },
            {
              "step": "5. Inventory Updated",
              "desc": "Stock balance increases by 500 units."
            }
          ]
        },
        "decisionQuestion": {
          "prompt": "A warehouse clerk verifies that 500 calipers have physically arrived at the factory dock against Purchase Order #4500012345. What transaction and business event should be recorded in SAP?",
          "options": [
            {
              "id": "opt_a",
              "text": "Post Goods Receipt using Movement Type 101 in transaction MIGO.",
              "isCorrect": true,
              "whyCorrect": "Movement Type 101 is specifically designed in SAP to record the physical receipt of goods referencing an active Purchase Order.",
              "whyOthersWrong": "Posting an Invoice (MIRO) or Payment occurs later in the finance process after the physical delivery is verified."
            },
            {
              "id": "opt_b",
              "text": "Post an Outgoing Vendor Payment in transaction F110.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Payment occurs only after goods receipt and invoice verification are completed. Paying before receiving goods creates unhedged financial risk."
            },
            {
              "id": "opt_c",
              "text": "Create a Sales Order in transaction VA01.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Sales Orders are used when selling products to customers, not when receiving raw materials from vendors."
            },
            {
              "id": "opt_d",
              "text": "Delete the Purchase Order in transaction ME22N.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Deleting the PO would cancel the order in the system when the supplier has already successfully delivered the goods!"
            }
          ]
        },
        "consultantReasoning": "For beginners: Always identify the physical business event first! The material physically arrived at the dock \u2794 This is a Goods Receipt \u2794 In SAP MM, standard Goods Receipt for a PO is Movement Type 101.",
        "solution": "The warehouse clerk opens transaction MIGO, selects 'A01 - Goods Receipt' and 'R01 - Purchase Order', enters PO number 4500012345, checks the 'Item OK' box, and clicks Post. Movement 101 increases warehouse inventory.",
        "consequences": {
          "business": "The warehouse officially takes custody of 500 calipers, making them available for assembly lines.",
          "sap": "Material Document is created; inventory quantity in table MARD increases by 500."
        },
        "quiz": [
          {
            "question": "What is the primary purpose of Movement Type 101 in SAP MM?",
            "options": [
              "To record Goods Receipt against a Purchase Order or Production Order",
              "To issue materials to a scrap yard",
              "To print customer shipping invoices",
              "To transfer money to the vendor bank account"
            ],
            "correctIndex": 0,
            "whyAnalysis": {
              "correct": "Movement Type 101 is the universal SAP standard movement for Goods Receipt against PO/Production.",
              "wrongOptions": [
                "Option 2 is Movement Type 551 (Scrapping).",
                "Option 3 is handled in SD via transaction VF01.",
                "Option 4 is handled in FI via transaction F110."
              ],
              "consultantTip": "Remember: Inbound receipt from vendor = Movement 101."
            }
          }
        ],
        "nextChallenge": "Advance to Intermediate level to explore stock types (Unrestricted vs Quality Inspection) and financial ledger debit/credit postings."
      },
      "INTERMEDIATE": {
        "levelTitle": "Level 2: Intermediate Consultant",
        "targetGoal": "Understand process depth: Stock types (Unrestricted, QI, Blocked), 3-way matching prep, and automatic FI accounting determination.",
        "conceptSummary": "Movement Type 101 executes dual updates: physical stock status determination (Unrestricted vs Quality Inspection) and simultaneous double-entry financial posting via SPRO Automatic Account Determination (OBYC BSX/WRX).",
        "businessContext": "Receiving goods is not just about counting boxes; it involves quality validation, batch identification, valuation class mapping, and preparing for 3-way invoice matching in Accounts Payable.",
        "industryScenario": {
          "industry": "Pharmaceuticals & Biotech \ud83d\udc8a",
          "scenarioText": "A pharmaceutical facility receives 20 barrels of active chemical reagent. Company quality policy mandates laboratory purity assays before the chemicals can be dispensed into sterile vaccine compounding reactors."
        },
        "sapProcess": {
          "headline": "Integrated MM-QM-FI Document Flow",
          "steps": [
            {
              "step": "1. Inbound Receipt (101)",
              "desc": "MIGO posts goods into Quality Inspection Stock (Stock Type Q)."
            },
            {
              "step": "2. FI Accounting Post",
              "desc": "Debit Inventory Asset (BSX) / Credit GR/IR Clearing Liability (WRX)."
            },
            {
              "step": "3. QM Lot Generation",
              "desc": "System automatically creates Inspection Lot (Origin 01) in table QALS."
            },
            {
              "step": "4. Laboratory Testing",
              "desc": "Quality technician records assay results in transaction QE51N."
            },
            {
              "step": "5. Usage Decision (QA11)",
              "desc": "Usage Decision posts Movement 321 to transfer stock from Quality to Unrestricted."
            }
          ]
        },
        "decisionQuestion": {
          "prompt": "The pharmaceutical company receives 20 barrels of active reagent under Purchase Order #4500098765. The Material Master has an active Quality Inspection Type 01. How does Movement Type 101 behave during Goods Receipt?",
          "options": [
            {
              "id": "opt_a",
              "text": "The stock automatically posts into Quality Inspection Stock (Stock Type Q) and generates a QM Inspection Lot, preventing production consumption until Usage Decision (QA11) is posted.",
              "isCorrect": true,
              "whyCorrect": "Because Inspection Type 01 is active in Material Master QM View, SAP Movement 101 directs the stock into Quality Inspection status and creates an inspection lot in QALS.",
              "whyOthersWrong": "Bypassing QM into unrestricted would violate FDA GMP compliance and pharmaceutical quality protocols."
            },
            {
              "id": "opt_b",
              "text": "The stock posts directly to Unrestricted Use stock, and the Quality department receives a paper email.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Paper notifications lack system enforcement. If stock is posted to Unrestricted, production orders could immediately consume untested chemicals."
            },
            {
              "id": "opt_c",
              "text": "The Goods Receipt fails with error M7021 because QM materials cannot be received via MIGO.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "MIGO fully supports QM-managed materials and seamlessly triggers inspection lot creation in the background."
            },
            {
              "id": "opt_d",
              "text": "The system debits GR/IR clearing account and credits Customer Revenue.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Goods receipt debits Inventory Stock Asset (BSX) and credits GR/IR Clearing (WRX). Revenue accounts are only involved in customer sales billing."
            }
          ]
        },
        "consultantReasoning": "Intermediate reasoning: Look at the master data flags! Active Inspection Type 01 in Material Master QM view forces Movement 101 into Quality Inspection stock (Stock Type Q). Simultaneously, OBYC determines the debit to BSX (Inventory) and credit to WRX (GR/IR Clearing) based on the material's Valuation Class.",
        "solution": "MIGO 101 creates Material Document (table MKPF/MSEG) and Financial Document (BKPF/BSEG) with Debit BSX / Credit WRX. Stock sits in Quality status until QA11 Usage Decision posts Movement 321 to Unrestricted use.",
        "consequences": {
          "business": "Vaccine reactors are protected from unverified chemicals while supplier delivery terms are legally met.",
          "sap": "Table MARD shows stock under INSMK = '2' (Quality Inspection), and table EKBE logs PO history VGABE = '1'."
        },
        "quiz": [
          {
            "question": "Which Financial Accounting (FI) entry is generated during a standard Movement Type 101 Goods Receipt for valuated stock?",
            "options": [
              "Debit: Inventory Asset Account (BSX) | Credit: GR/IR Clearing Account (WRX)",
              "Debit: Vendor Account | Credit: Bank Clearing Account",
              "Debit: Cost of Goods Sold | Credit: Revenue Account",
              "Debit: Scrap Expense | Credit: Inventory Asset Account"
            ],
            "correctIndex": 0,
            "whyAnalysis": {
              "correct": "In SAP OBYC account determination, valuated GR increases inventory asset (Debit BSX) and sets up the liability for the upcoming vendor invoice (Credit WRX).",
              "wrongOptions": [
                "Option 2 is the Vendor Payment entry in F110.",
                "Option 3 is the PGI Goods Issue entry for a customer Sales Order.",
                "Option 4 is Movement Type 551 (Scrapping)."
              ],
              "consultantTip": "GR/IR Clearing (WRX) ensures interim balance sheet matching until MIRO invoice verification arrives."
            }
          }
        ],
        "nextChallenge": "Advance to Professional level to solve complex EWM integration failures, qRFC queue troubleshooting, and line-side PSA delivery bottlenecks."
      },
      "PROFESSIONAL": {
        "levelTitle": "Level 3: Professional / Senior Consultant",
        "targetGoal": "Consultant-grade architecture: S/4HANA EWM integration, POSC work center staging, qRFC queue troubleshooting, and root cause diagnosis.",
        "conceptSummary": "In modern S/4HANA Embedded EWM, Goods Receipt 101 is executed against Inbound Deliveries (/SCWM/PRDI), triggering Process-Oriented Storage Control (POSC), warehouse task creation rules (WOCR), and qRFC synchronization between MM and EWM.",
        "businessContext": "Enterprise manufacturing plants do not receive materials to generic storage locations. High-speed automotive, aerospace, and high-tech supply chains rely on automated conveyors, RF barcode scanning, and direct staging to Production Supply Areas (PSA).",
        "industryScenario": {
          "industry": "Aerospace & Defense \u2708\ufe0f",
          "scenarioText": "Apex Aerospace reports that 50 serialized titanium turbine blades were received at Dock 1 yesterday under Inbound Delivery #180004920. Physical parts arrived, but assembly line mechanics cannot see the components in the line-side PSA bin, halting jet engine assembly."
        },
        "sapProcess": {
          "headline": "S/4HANA EWM Embedded Architectural Flow",
          "steps": [
            {
              "step": "1. Inbound Delivery (VL31N)",
              "desc": "Replicates to EWM as Inbound Delivery Document in /SCWM/PRDI."
            },
            {
              "step": "2. PGR in EWM",
              "desc": "EWM posts Goods Receipt, triggering PPF action to update ERP MM via qRFC."
            },
            {
              "step": "3. POSC Step 1: Unload",
              "desc": "Warehouse Task moves pallet from Yard/Dock (9010) to Work Center."
            },
            {
              "step": "4. POSC Step 2: Quality Inspection",
              "desc": "QIE inspection document created; stock held in Work Center bin (9020)."
            },
            {
              "step": "5. POSC Step 3: PSA Putaway",
              "desc": "Upon UD, final Warehouse Task directs reaching truck to PSA Line Bin (0050)."
            }
          ]
        },
        "decisionQuestion": {
          "prompt": "As the Lead SAP EWM/MM Consultant, you investigate why production mechanics cannot access the titanium turbine blades. In transaction /SCWM/MON, you observe the Handling Units are physically located in Storage Type 9020 (QA Work Center) with Open Warehouse Task status 'B' (Waiting for Predecessor). What is the root cause?",
          "options": [
            {
              "id": "opt_a",
              "text": "The Quality Inspection Usage Decision was not confirmed in EWM/ERP, blocking the auto-creation of the subsequent POSC Putaway Warehouse Task to the production PSA bin.",
              "isCorrect": true,
              "whyCorrect": "In POSC (Process-Oriented Storage Control), Step 3 (Putaway) is dependent on the completion of Step 2 (Quality Inspection). Without a posted Usage Decision in QIE/QM, the subsequent Warehouse Task remains in waiting status 'B'.",
              "whyOthersWrong": "Forklift driver physical error or PO pricing errors do not explain the automated task predecessor dependency in /SCWM/MON."
            },
            {
              "id": "opt_b",
              "text": "The vendor delivery address on the Purchase Order header was misspelled.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Delivery address on PO has no effect on internal warehouse task predecessor logic once the material has physically arrived and been received."
            },
            {
              "id": "opt_c",
              "text": "The material must be deleted from table MARC and recreated using transaction MM01.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "Destructive and unnecessary. Master data deletion will corrupt existing transaction history and open deliveries."
            },
            {
              "id": "opt_d",
              "text": "The plant needs to revert from S/4HANA back to ECC 6.0.",
              "isCorrect": false,
              "whyCorrect": "",
              "whyOthersWrong": "S/4HANA Embedded EWM is the industry gold standard. Reverting ERP architecture due to an unconfirmed inspection lot is absurd."
            }
          ]
        },
        "consultantReasoning": "Senior Consultant Diagnosis: Check the task predecessor dependencies in /SCWM/ORDIM_O. Status 'B' indicates a POSC sequence bottleneck. The previous process step (Quality Inspection in Storage Type 9020) was executed physically in the lab, but the inspector forgot to post the electronic Usage Decision in transaction /SCWM/QIDCA or QA11. Posting the UD instantly releases the waiting warehouse task to the line-side PSA bin.",
        "solution": "Execute Usage Decision in /SCWM/QIDCA or QA11. S/4HANA triggers automatic PPF action, generating the final WT to move Handling Units from 9020 to PSA Bin 'PSA-AERO-01'. Forklift driver confirms task via RF terminal (/SCWM/RFUI).",
        "consequences": {
          "business": "Assembly line mechanics receive the titanium blades within 12 minutes, saving the OEM from a $500k jet engine delivery penalty.",
          "sap": "Warehouse Task status changes from 'B' (Waiting) to 'C' (Confirmed) in /SCWM/ORDIM_C; stock is valuated and unrestricted in both EWM (/SCWM/AQUA) and MM (MARD)."
        },
        "quiz": [
          {
            "question": "In S/4HANA Embedded EWM, when a Goods Receipt is posted against an Inbound Delivery in /SCWM/PRDI, how does the ERP MM Material Document get generated?",
            "options": [
              "Post Processing Framework (PPF) triggers a synchronous or asynchronous qRFC call that calls ERP BAPI_GOODSMVT_CREATE in the background",
              "The warehouse supervisor must manually open SAP GUI MIGO and type in the delivery number",
              "An overnight batch job scans for unposted deliveries every 24 hours",
              "EWM does not integrate with MM; stock is tracked exclusively in EWM tables"
            ],
            "correctIndex": 0,
            "whyAnalysis": {
              "correct": "Modern S/4HANA EWM uses PPF actions and transactional queues (qRFC) to immediately sync Goods Receipt status back to MM, generating the Universal Material Document (MATDOC) in real time.",
              "wrongOptions": [
                "Option 2 is manual double-entry, which S/4HANA integration eliminates.",
                "Option 3 would cause 24-hour inventory blindness.",
                "Option 4 is false; EWM is fully integrated with MM and FI."
              ],
              "consultantTip": "Monitor transaction SMQ2 (Inbound Queues) for any stuck queues with status 'SYSFAIL' during Go-Live stabilization."
            }
          }
        ],
        "nextChallenge": "Explore the Consultant Investigation Mode for complex multi-plant stock transport orders (STO) and Evaluated Receipt Settlement (ERS) automation."
      }
    }
  }
];
