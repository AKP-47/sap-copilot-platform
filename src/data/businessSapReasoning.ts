// =========================================================================
// SAP COPILOT & TAGSKILLS SIGNATURE FRAMEWORK: BUSINESS -> SAP REASONING
// =========================================================================

export interface BusinessProcessStep {
  stepNumber: number;
  title: string;
  whatHappens: string;
  whoPerforms: string;
  infoRequired: string;
  documentCreated: string;
  whatCanGoWrong: string;
}

export interface IndustryVariantData {
  industryName: string;
  whyItMatters: string;
  businessProblem: {
    headline: string;
    whatIsHappening: string;
    whyIsItAProblem: string;
    whoIsAffected: string;
    businessImpact: string;
  };
  businessProcessSteps: BusinessProcessStep[];
  sapConcept: {
    module: string;
    coreObjects: { name: string; role: string }[];
    processMapping: string;
  };
}

export interface DecisionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  critique: string;
}

export interface BusinessSapScenario {
  id: string;
  title: string;
  module: "MM" | "EWM" | "INTEGRATION";
  domain: string;
  supportedIndustries: string[];
  industryVariants: Record<string, IndustryVariantData>;
  decisionPrompt: {
    question: string;
    options: DecisionOption[];
  };
  consultantReasoning: {
    keyClue: string;
    businessDriver: string;
    sapReasoning: string;
    configDependencies: string;
  };
  solution: {
    sapSummary: string;
    visualFlow: string;
    configNuances: string;
  };
  consequences: {
    business: string[];
    sap: string[];
  };
  whatIfs: {
    question: string;
    outcome: string;
    consultantTradeOff: string;
  }[];
}

export const BUSINESS_SAP_SCENARIOS: BusinessSapScenario[] = [
  {
    "id": "scenario_mm_auto_shortage",
    "title": "Mitigating Assembly Line Stoppages & Inbound Receiving",
    "module": "MM",
    "domain": "Procurement & Quality Stock Control",
    "supportedIndustries": [
      "automotive",
      "aerospace",
      "pharma",
      "food_beverage",
      "retail",
      "electronics"
    ],
    "industryVariants": {
      "automotive": {
        "industryName": "Automotive & Mobility \ud83d\ude97",
        "whyItMatters": "Automotive assembly lines operate under strict Just-In-Time (JIT) schedules. An unannounced line stoppage costs over $25,000 per minute in idle robotics and factory labor overhead.",
        "businessProblem": {
          "headline": "Production Line Halts Due to Uninspected Brake Caliper Components",
          "whatIsHappening": "The main SUV assembly line has stalled because brake calipers are sitting on the receiving dock without authorization to move to the line-side bins.",
          "whyIsItAProblem": "Assembly technicians cannot mount wheels without safety-tested calipers. If cars cannot roll off the line, the entire plant comes to a complete standstill.",
          "whoIsAffected": "Line Workers, Plant Operations Manager, Logistics Dock Receiving Team, and Quality Control Engineers.",
          "businessImpact": "Immediate shipment delays to car dealerships, severe OEM SLA penalties, and $150,000+ in production downtime losses."
        },
        "businessProcessSteps": [
          {
            "stepNumber": 1,
            "title": "Demand Trigger",
            "whatHappens": "Assembly schedule determines requirement for 500 brake calipers for today's night shift.",
            "whoPerforms": "Production Planner",
            "infoRequired": "Bill of Materials (BOM), Production Order schedule, current stock level.",
            "documentCreated": "Material Requirement / Planned Order",
            "whatCanGoWrong": "Inaccurate lead-time assumptions lead to late procurement requests."
          },
          {
            "stepNumber": 2,
            "title": "Purchase Order",
            "whatHappens": "Binding purchase contract is sent to Tier-1 brake supplier with exact delivery window.",
            "whoPerforms": "Purchasing Officer",
            "infoRequired": "Supplier ID, agreed part price, delivery dock door, quality specs.",
            "documentCreated": "Purchase Order (PO)",
            "whatCanGoWrong": "Price mismatch or missing delivery tolerance keys delay supplier dispatch."
          },
          {
            "stepNumber": 3,
            "title": "Physical Truck Arrival",
            "whatHappens": "Supplier truck arrives at Dock Door 4. Pallets are offloaded and delivery note is inspected.",
            "whoPerforms": "Warehouse Receiving Clerk",
            "infoRequired": "PO Number, Vendor Delivery Note, Packing Slip, Pallet Count.",
            "documentCreated": "Physical Receiving Log / Dock Receipt",
            "whatCanGoWrong": "Damaged crates or mismatched PO quantities accepted without notation."
          },
          {
            "stepNumber": 4,
            "title": "Quality Verification",
            "whatHappens": "Safety-critical brake calipers must undergo metallurgical hardness and dimensional testing before assembly use.",
            "whoPerforms": "Quality Inspector",
            "infoRequired": "Technical inspection plan, caliper tolerances, sample size.",
            "documentCreated": "Quality Inspection Certificate",
            "whatCanGoWrong": "Uncertified parts slip directly to production line, risking vehicle brake failure recalls."
          },
          {
            "stepNumber": 5,
            "title": "Line-Side Staging",
            "whatHappens": "Approved parts are transported to the assembly station bins for immediate vehicle mounting.",
            "whoPerforms": "Material Handler / Forklift Driver",
            "infoRequired": "Production Supply Area (PSA) bin location, Kanban container ID.",
            "documentCreated": "Transfer Order / PSA Stock Transfer",
            "whatCanGoWrong": "Forklift drops parts at wrong station, causing false shortage alarms."
          }
        ],
        "sapConcept": {
          "module": "SAP MM (Materials Management) & SAP QM",
          "coreObjects": [
            {
              "name": "Purchase Requisition (ME51N)",
              "role": "Internal demand document triggered manually or via MRP Live."
            },
            {
              "name": "Purchase Order (ME21N)",
              "role": "Legally binding procurement contract sent to vendor."
            },
            {
              "name": "Goods Receipt (MIGO / Movement Type 101)",
              "role": "Records physical arrival into inventory and updates financial ledgers."
            },
            {
              "name": "Quality Inspection Stock (Stock Type Q)",
              "role": "Special stock status preventing reservation or consumption by production orders."
            },
            {
              "name": "Usage Decision (QA11 / Movement Type 321)",
              "role": "Formal QA release moving stock from Quality status to Unrestricted-Use."
            }
          ],
          "processMapping": "Business Delivery -> MIGO 101 (Posts to QI Stock) -> Inspection Lot 01 -> QA11 Usage Decision -> Movement 321 (Unrestricted) -> MIGO 261 (Goods Issue to Production)."
        }
      },
      "pharma": {
        "industryName": "Pharmaceuticals & Life Sciences \ud83d\udc8a",
        "whyItMatters": "Pharmaceutical manufacturing requires 100% adherence to FDA 21 CFR Part 11 and GMP standards. Using unverified active pharmaceutical ingredients (API) risks patient toxicity and immediate FDA plant shutdowns.",
        "businessProblem": {
          "headline": "Vaccine Production Delayed Awaiting Sterile Chemical Quarantine Clearance",
          "whatIsHappening": "Barrels of active stabilizer chemical have arrived at the receiving warehouse, but cannot be pumped into mixing reactors until laboratory bio-burden assays are validated.",
          "whyIsItAProblem": "Vaccine synthesis must run in precise batch sequences. Feeding unapproved chemical could contaminate 50,000 liters of sterile vaccine broth.",
          "whoIsAffected": "Formulation Scientists, QA Release Officers, Regulatory Affairs Director.",
          "businessImpact": "$2M batch scrap risk, regulatory audit citations, and critical hospital vaccine stockouts."
        },
        "businessProcessSteps": [
          {
            "stepNumber": 1,
            "title": "Sterile Demand Trigger",
            "whatHappens": "Batch production schedule triggers need for 200 kg of pure stabilizer with Certificate of Analysis (CoA).",
            "whoPerforms": "Formulation Planner",
            "infoRequired": "Recipe Master, Batch Potency requirements, SLED expiry buffer.",
            "documentCreated": "Process Order / Requisition",
            "whatCanGoWrong": "Ordering uncertified vendor grade chemical."
          },
          {
            "stepNumber": 2,
            "title": "Qualified Vendor PO",
            "whatHappens": "PO dispatched to FDA-approved validated chemical supplier with strict temperature logging requirements.",
            "whoPerforms": "Pharma Procurement Lead",
            "infoRequired": "FDA Vendor License, CoA specification clause, Cold-Chain parameters.",
            "documentCreated": "Validated Purchase Order",
            "whatCanGoWrong": "PO issued to non-validated backup vendor."
          },
          {
            "stepNumber": 3,
            "title": "Cold-Chain Dock Arrival",
            "whatHappens": "Temperature data loggers are downloaded at receiving dock. Barrels are cleaned and quarantined.",
            "whoPerforms": "Cleanroom Receiving Specialist",
            "infoRequired": "Temperature excursion log, Vendor Batch ID, Container Seals.",
            "documentCreated": "Quarantine Receiving Slip",
            "whatCanGoWrong": "Temperature spike went unnoticed during transit."
          },
          {
            "stepNumber": 4,
            "title": "Analytical Lab Testing",
            "whatHappens": "Samples are extracted in cleanroom booth for HPLC chromatography, purity assays, and sterility testing.",
            "whoPerforms": "QC Analytical Chemist",
            "infoRequired": "Pharmacopeia test protocols, reagent calibration, batch sample.",
            "documentCreated": "Laboratory Analytical Assay Certificate",
            "whatCanGoWrong": "False positive microbial contamination result delays release."
          },
          {
            "stepNumber": 5,
            "title": "Reactor Charging",
            "whatHappens": "Released chemical is piped into cleanroom sterile compounding vessel.",
            "whoPerforms": "Sterile Processing Operator",
            "infoRequired": "Process Order number, Released Batch Number, Potency factor.",
            "documentCreated": "Electronic Batch Record (eBR) Consumption",
            "whatCanGoWrong": "Operator scans wrong batch barcode."
          }
        ],
        "sapConcept": {
          "module": "SAP MM / QM / Batch Management",
          "coreObjects": [
            {
              "name": "Batch Master (MSC1N / MSC3N)",
              "role": "Maintains batch characteristics, SLED expiry, and batch status (Restricted/Unrestricted)."
            },
            {
              "name": "Goods Receipt (101 into Quality Stock)",
              "role": "Creates Inspection Lot Origin 01 and links batch to vendor CoA."
            },
            {
              "name": "Usage Decision (QA11)",
              "role": "Electronic signature compliant release releasing batch status to Unrestricted."
            },
            {
              "name": "Goods Issue (Movement 261 to Process Order)",
              "role": "Consumes active batch quantity and updates Electronic Batch Record."
            }
          ],
          "processMapping": "Inbound Delivery -> MIGO 101 (Batch Generated in QI Stock) -> QM Lot 01 Lab Tests -> QA11 Usage Decision (Move 321) -> Batch Release -> MIGO 261 Consumption."
        }
      },
      "food_beverage": {
        "industryName": "Food & Beverage \ud83e\udd5b",
        "whyItMatters": "Food ingredients are perishable with short Shelf-Life Expiration Dates (SLED). Allergen segregation and temperature controls are mandatory to prevent foodborne illness outbreaks and recalls.",
        "businessProblem": {
          "headline": "Fresh Milk Pallets Arrive at Dairy Plant with 7-Day Expiry Window",
          "whatIsHappening": "A tanker delivery of raw organic milk has arrived. It must undergo antibiotic and bacterial plate testing before transfer into pasteurization silos.",
          "whyIsItAProblem": "Raw milk spoils in hours without refrigerated processing. If antibiotic residues are present, milk cannot be used for cheese culture synthesis.",
          "whoIsAffected": "Dairy Plant Manager, Food Safety Officer, Cheese Master.",
          "businessImpact": "Loss of entire milk tanker, dairy spoilage waste, and breach of organic food safety standards."
        },
        "businessProcessSteps": [
          {
            "stepNumber": 1,
            "title": "Daily Milk Requirement",
            "whatHappens": "Daily cheese manufacturing schedule requires 15,000 Liters of Grade-A organic raw milk.",
            "whoPerforms": "Dairy Production Planner",
            "infoRequired": "Silo capacity, daily recipe targets, fat/protein ratios.",
            "documentCreated": "Daily Milk Demand Schedule",
            "whatCanGoWrong": "Ordering more milk than pasteurizer holding capacity."
          },
          {
            "stepNumber": 2,
            "title": "Farm Pickup & Transport",
            "whatHappens": "Refrigerated milk tanker collects milk from certified cooperative dairy farms.",
            "whoPerforms": "Logistics Milk Hauler",
            "infoRequired": "Farm batch IDs, tanker temperature log (must be < 4\u00b0C).",
            "documentCreated": "Milk Hauler Manifest",
            "whatCanGoWrong": "Tanker refrigeration compressor failure during transit."
          },
          {
            "stepNumber": 3,
            "title": "Dock Weighbridge & Rapid Assay",
            "whatHappens": "Tanker drives onto weighbridge. Lab technician draws sample for 10-minute snap antibiotic test.",
            "whoPerforms": "Food Safety Tech",
            "infoRequired": "Tanker gross weight, temperature probe reading, rapid test kit.",
            "documentCreated": "Receiving Inspection Assay",
            "whatCanGoWrong": "Unloading raw milk before antibiotic test strip confirms negative result."
          },
          {
            "stepNumber": 4,
            "title": "Silo Offloading & Pasteurization",
            "whatHappens": "Hoses connected to Silo 3; raw milk pumped through in-line plate pasteurizer.",
            "whoPerforms": "Silo Bay Operator",
            "infoRequired": "Silo destination ID, flow rate meter.",
            "documentCreated": "Silo Inbound Transfer Log",
            "whatCanGoWrong": "Pumping organic milk into conventional milk silo (cross-contamination)."
          },
          {
            "stepNumber": 5,
            "title": "Cheese Vat Compounding",
            "whatHappens": "Pasteurized milk metered into cheese vats with culture enzymes added.",
            "whoPerforms": "Cheese Production Operator",
            "infoRequired": "Process Order, Batch SLED expiration date, butterfat %.",
            "documentCreated": "Cheese Batch Record",
            "whatCanGoWrong": "Using expired batch due to lack of FEFO (First-Expired-First-Out) picking."
          }
        ],
        "sapConcept": {
          "module": "SAP MM & Catch Weight / SLED Management",
          "coreObjects": [
            {
              "name": "Catch Weight Management",
              "role": "Tracks milk in both volume (Liters) and physical weight (kg) to handle density fluctuations."
            },
            {
              "name": "SLED / Expiry Date Tracking",
              "role": "Enforces minimum remaining shelf life upon Goods Receipt."
            },
            {
              "name": "Movement Type 101 with QM Lot",
              "role": "Receives tanker volume into Quality Inspection holding status."
            },
            {
              "name": "FEFO Picking Strategy",
              "role": "Automatically directs production orders to consume earliest expiring batches first."
            }
          ],
          "processMapping": "Milk Inbound -> MIGO 101 (Batch SLED calculated) -> QA32 Rapid Test Clearance -> QA11 Usage Decision (321) -> Silo Storage -> FEFO Auto-Issue (261)."
        }
      }
    },
    "decisionPrompt": {
      "question": "The supplier delivery truck has arrived at the receiving dock. Quality inspection is mandatory by company policy before components can be mounted onto production orders. How should the Goods Receipt be posted in SAP?",
      "options": [
        {
          "id": "opt_a",
          "text": "Post Goods Receipt directly to Unrestricted-Use Stock (Stock Type: Unrestricted) so the factory can grab parts immediately.",
          "isCorrect": false,
          "critique": "Tempting because it eliminates warehouse waiting time, but dangerous! Posting to Unrestricted allows production workers to immediately consume unverified parts, bypassing mandatory safety testing and risking catastrophic product failures."
        },
        {
          "id": "opt_b",
          "text": "Post Goods Receipt to Quality Inspection Stock (Stock Type: Quality Inspection) with automatic QM inspection lot creation.",
          "isCorrect": true,
          "critique": "Exactly correct! Placing stock into Quality Inspection status (Stock Type Q) ensures the inventory is financially accounted for on the balance sheet, but locked in the software from being reserved or consumed by manufacturing until the Quality Inspector posts a formal Usage Decision."
        },
        {
          "id": "opt_c",
          "text": "Reject the truck at the gate and tell the supplier to perform quality inspection at their own factory before redelivering.",
          "isCorrect": false,
          "critique": "Incorrect business decision. The supplier was contracted for plant-level receiving inspection. Turning away the truck creates an immediate artificial shortage and stops production needlessly."
        },
        {
          "id": "opt_d",
          "text": "Post Goods Receipt directly into Blocked Stock (Movement Type 124) until an invoice arrives from the vendor.",
          "isCorrect": false,
          "critique": "Incorrect. Blocked Stock is reserved for damaged goods, defective materials, or rejected shipments\u2014not for routine incoming inspection. Furthermore, Goods Receipt is completely independent of vendor invoice arrival."
        }
      ]
    },
    "consultantReasoning": {
      "keyClue": "The scenario states: 'Quality inspection is mandatory before production use.'",
      "businessDriver": "Preventing defective raw materials from entering assembly lines while legally acknowledging receipt of goods to fulfill vendor contractual delivery terms.",
      "sapReasoning": "In SAP MM, Movement Type 101 automatically posts to Stock Type 'Q' (Quality Inspection) when an active Inspection Type (e.g. 01 - Goods receipt inspection for PO) is maintained in the Material Master QM View. This auto-generates a QM Inspection Lot (table QALS).",
      "configDependencies": "1. Material Master QM View: Active Inspection Type 01. 2. Post to Inspection Stock indicator ticked. 3. SPRO Automatic Account Determination (OBYC): BSX (Debit Inventory) and WRX (Credit GR/IR Clearing) account keys."
    },
    "solution": {
      "sapSummary": "Execute transaction MIGO -> Goods Receipt -> Purchase Order. Movement Type 101 is selected. System automatically directs quantity to Quality Inspection stock (Stock Type Q).",
      "visualFlow": "Purchase Order (ME21N) \u2794 Inbound Delivery / MIGO \u2794 Goods Receipt (101 in Stock Type Q) \u2794 QM Inspection Lot (QA32) \u2794 Results Recorded (QE51N) \u2794 Usage Decision (QA11 / Movement 321) \u2794 Unrestricted Stock \u2794 Production Goods Issue (261)",
      "configNuances": "If the business decides to bypass QM in the future for certified vendors, deactivating the 'Post to inspection stock' checkbox in Material Master will automatically redirect Movement 101 directly into Unrestricted stock without changing the Purchasing configuration."
    },
    "consequences": {
      "business": [
        "Assembly workers cannot mistakenly consume uninspected components.",
        "Supplier delivery commitment is fulfilled and on-time performance score is logged.",
        "Quality team receives an electronic worklist notification to test the batch immediately."
      ],
      "sap": [
        "Stock quantity in MMBE / MARD increases under column 'Quality Inspection'.",
        "Financial Ledger (BKPF/BSEG/ACDOCA) records Debit Inventory Asset (BSX) and Credit GR/IR Clearing (WRX).",
        "Purchase Order History (table EKBE) updates with Material Document number and quantity received."
      ]
    },
    "whatIfs": [
      {
        "question": "What if Quality Inspection finds that 20% of the delivered parts have hairline cracks?",
        "outcome": "In transaction QA11 (Usage Decision), the Inspector posts a partial stock transfer: 80% to Unrestricted Stock (321) and 20% to Blocked Stock (350) or Return Delivery to Vendor (Movement Type 122).",
        "consultantTradeOff": "Protects plant safety while allowing 80% of production to proceed without full line shutdown."
      },
      {
        "question": "What if the warehouse is EWM-managed instead of traditional IM?",
        "outcome": "Goods Receipt is posted against the Inbound Delivery in /SCWM/PRDI. An inspection document is created in EWM Quality Inspection Engine (QIE), and a Warehouse Task routes the pallet to an intermediate QA Work Center bin (POSC step QIS).",
        "consultantTradeOff": "Provides physical bin-level traceability during lab hold time, but requires RF terminal scanning at the work center."
      }
    ]
  },
  {
    "id": "scenario_ewm_food_putaway",
    "title": "Cold-Chain Perishable Warehouse Putaway Strategy",
    "module": "EWM",
    "domain": "Extended Warehouse Management & Storage Strategies",
    "supportedIndustries": [
      "food_beverage",
      "pharma",
      "retail",
      "chemicals",
      "logistics_3pl"
    ],
    "industryVariants": {
      "food_beverage": {
        "industryName": "Food & Cold Chain Logistics \u2744\ufe0f",
        "whyItMatters": "Dairy, frozen seafood, and ice cream degrade within 30 minutes if left on an ambient temperature receiving dock. Warehouse execution must automatically determine temperature-zoned storage bins without human guesswork.",
        "businessProblem": {
          "headline": "Frozen Food Pallets Melting on Ambient Receiving Dock",
          "whatIsHappening": "A truck offloaded 40 pallets of ice cream. Forklift drivers do not know which freezer aisles have space, leaving pallets sitting at +22\u00b0C ambient dock temperature.",
          "whyIsItAProblem": "Ice cream structure melts, crystalizes, and becomes unsellable. Dock congestion blocks subsequent incoming deliveries.",
          "whoIsAffected": "Warehouse Supervisors, Forklift Operators, Cold Chain Compliance Officer.",
          "businessImpact": "$80,000 inventory spoilage per incident, customer order cancellations, and health department safety violations."
        },
        "businessProcessSteps": [
          {
            "stepNumber": 1,
            "title": "Truck Offload & HU Creation",
            "whatHappens": "Frozen pallets are unloaded at refrigerated dock doors and labeled with Handling Unit (HU) SSCC barcodes.",
            "whoPerforms": "Dock Unloader",
            "infoRequired": "Inbound Delivery number, pallet barcode, temperature log.",
            "documentCreated": "Handling Unit (HU) Barcode Label",
            "whatCanGoWrong": "Driver fails to scan temperature log before offloading."
          },
          {
            "stepNumber": 2,
            "title": "System Bin Search (Putaway)",
            "whatHappens": "Software calculates the optimal deep-freeze storage bin based on temperature zone, pallet weight, and height.",
            "whoPerforms": "EWM Storage Control Engine",
            "infoRequired": "Material Master Storage Type indicator, Deep-Freeze bin capacity, aisle availability.",
            "documentCreated": "Warehouse Task (WT)",
            "whatCanGoWrong": "System routes frozen pallet to an ambient dry-goods rack due to missing material master master data."
          },
          {
            "stepNumber": 3,
            "title": "RF Terminal Forklift Dispatch",
            "whatHappens": "Warehouse Task appears instantly on the nearest reach-truck operator's RF barcode screen.",
            "whoPerforms": "Forklift Driver",
            "infoRequired": "Source bin (Dock 9010), Destination bin (Freezer -25\u00b0C Aisle 04-12-02).",
            "documentCreated": "RF Task Confirmation Screen",
            "whatCanGoWrong": "Forklift battery fails in sub-zero freezer room."
          },
          {
            "stepNumber": 4,
            "title": "Physical Bin Confirmation",
            "whatHappens": "Driver drives into deep freeze, places pallet into bin 04-12-02, and scans verification barcode on bin rack.",
            "whoPerforms": "Forklift Driver",
            "infoRequired": "Bin Verification Barcode tag.",
            "documentCreated": "Confirmed Warehouse Task (/SCWM/TO_CONF)",
            "whatCanGoWrong": "Driver scans verification barcode but places pallet in adjacent bin."
          }
        ],
        "sapConcept": {
          "module": "SAP EWM (Extended Warehouse Management)",
          "coreObjects": [
            {
              "name": "Inbound Delivery (/SCWM/PRDI)",
              "role": "Operational delivery document received from ERP via qRFC."
            },
            {
              "name": "Storage Type Search Sequence",
              "role": "SPRO configuration table (/SCWM/T334T) that determines which physical warehouse zone (e.g., Deep Freeze 0030) to search first."
            },
            {
              "name": "Putaway Strategy (Empty Bin / Addition to Stock)",
              "role": "Algorithm that selects the exact coordinate bin with available physical capacity."
            },
            {
              "name": "Warehouse Task (WT)",
              "role": "Instruction to move a specific handling unit from Source Bin (Dock Door) to Destination Bin (Rack)."
            },
            {
              "name": "Radio Frequency Framework (/SCWM/RFUI)",
              "role": "Mobile interface on forklift terminals providing step-by-step barcode scanning prompts."
            }
          ],
          "processMapping": "Inbound Delivery -> Storage Type Search Sequence (Determines Zone 0030 Deep Freeze) -> Putaway Strategy (Locates Empty Bin) -> Auto-Create Warehouse Task -> RFUI Confirmation."
        }
      }
    },
    "decisionPrompt": {
      "question": "The frozen pallets have arrived on the receiving dock. The warehouse manager needs the system to automatically direct forklift drivers to -25\u00b0C deep-freeze bins without requiring manual aisle selection. How is this configured in SAP EWM?",
      "options": [
        {
          "id": "opt_a",
          "text": "Tell forklift drivers to visually look for empty racks in the freezer and manually write down the bin numbers on paper clipboards.",
          "isCorrect": false,
          "critique": "Completely defeats the purpose of an enterprise ERP/EWM system. Manual paper tracking leads to misplaced pallets, stock discrepancies, and melted inventory."
        },
        {
          "id": "opt_b",
          "text": "Configure Storage Type Search Sequence and Putaway Control Indicator in Material Master to automatically determine Deep-Freeze Storage Type and Empty Bins.",
          "isCorrect": true,
          "critique": "Spot on! In SAP EWM, assigning a Putaway Control Indicator (PACI) in the Product Master maps the material to a Storage Type Search Sequence. When the Warehouse Task is created, EWM automatically checks capacity and reserves an empty bin in the -25\u00b0C Deep-Freeze zone."
        },
        {
          "id": "opt_c",
          "text": "Create an SAP GUI script that prints a shipping label with the word 'FREEZER' in bold font.",
          "isCorrect": false,
          "critique": "Printing a label does not allocate or reserve system bin capacity, nor does it guide the forklift driver to an available coordinate bin via RFUI."
        },
        {
          "id": "opt_d",
          "text": "Disable Goods Receipt in EWM and post standard MM inventory movements in transaction MB1C.",
          "isCorrect": false,
          "critique": "Transaction MB1C is obsolete in S/4HANA, and disabling EWM eliminates all physical bin-level controls and RF terminal execution."
        }
      ]
    },
    "consultantReasoning": {
      "keyClue": "The business problem requires automatic routing of temperature-sensitive materials to refrigerated storage bins without manual guesswork.",
      "businessDriver": "Protecting perishable cold-chain product integrity and maximizing warehouse labor putaway productivity.",
      "sapReasoning": "In SAP EWM, Putaway Strategy determination follows a strict hierarchy: Warehouse Number \u2794 Putaway Control Indicator (from Product Master) \u2794 Storage Type Search Sequence (SPRO table /SCWM/T334T) \u2794 Storage Bin Determination Rule (e.g., 'E - Empty Bin' or 'I - Addition to Existing Stock').",
      "configDependencies": "1. SPRO: Define Storage Type Search Sequence for Putaway. 2. Define Storage Bin Types and Weight/Volume Capacities. 3. Product Master /SCWM/MAT1: Maintain Storage Section and Putaway Control Indicators."
    },
    "solution": {
      "sapSummary": "Assign PACI 'FRZ1' to the ice cream Product Master. System triggers automatic Storage Type Search Sequence finding Storage Type '0030' (Deep Freeze), finds Empty Bin '04-12-02', and generates a Warehouse Task directly to the forklift RFUI terminal.",
      "visualFlow": "Inbound Delivery (/SCWM/PRDI) \u2794 Post Goods Receipt \u2794 Storage Type Search Sequence (/SCWM/T334T) \u2794 Putaway Strategy (Empty Bin) \u2794 Warehouse Task Created \u2794 RFUI Mobile Scan (/SCWM/RFUI) \u2794 Confirmed in Bin 04-12-02",
      "configNuances": "If the Deep Freeze storage type reaches 100% capacity, SPRO fallback search sequence can automatically redirect pallets to a secondary Backup Freezer Zone (0035) instead of failing task creation."
    },
    "consequences": {
      "business": [
        "Pallets are moved from dock to -25\u00b0C freezer in under 8 minutes, preventing any product melting.",
        "Forklift drivers never waste time searching for empty bins or arguing over rack assignments.",
        "Warehouse space utilization is maximized through computerized high-bay slotting."
      ],
      "sap": [
        "Available Stock table (/SCWM/AQUA) shows handling unit confirmed in destination bin.",
        "Storage Bin table (/SCWM/LAGP) updates occupancy status and weight capacity calculation.",
        "Warehouse Monitor (/SCWM/MON) displays Warehouse Task status 'C' (Confirmed) with exact timestamp and user ID."
      ]
    },
    "whatIfs": [
      {
        "question": "What if the primary deep-freeze storage type is completely full?",
        "outcome": "If configured in SPRO (/SCWM/T334T), EWM checks the next line item in the Storage Type Search Sequence (e.g., Overflow Cold Room 0035). If no backup is maintained, task creation errors with message 'No destination storage bin found'.",
        "consultantTradeOff": "Maintains cold chain safety while alerting warehouse supervisors to expedite outbound shipments."
      },
      {
        "question": "What if the product is hazardous (e.g. flammable industrial chemicals)?",
        "outcome": "EWM checks Hazardous Material Master data and Hazardous Storage Class rules (/SCWM/T334T) to block co-storage with food or oxidizers, directing stock to a dedicated fire-suppression bunker.",
        "consultantTradeOff": "100% regulatory EHS compliance, preventing industrial catastrophic chemical fires."
      }
    ]
  }
];
