import { SapTopic } from "../types/sap";

export const MM_TOPICS: SapTopic[] = [
  {
    id: "mm-material-master",
    module: "MM",
    category: "Master Data",
    title: "Material Master (MM01 / MM02 / MM03)",
    subtitle: "The central data repository for all materials procured, manufactured, stored, and sold in SAP.",
    level: "BEGINNER",
    tags: ["Master Data", "Material Master", "MARA", "MARC", "MARD", "MBEW", "MM01", "Material Types"],
    pedagogy: {
      beginnerExplanation: "Think of the Material Master like a digital passport for every physical item in a company. Just like a passport holds your photo, nationality, and visa stamps across different countries, the Material Master holds an item's dimensions, purchasing rules, warehouse storage locations, and accounting values across different company departments.",
      formalDefinition: "The Material Master is the central source of data specific to a material, integrated across all logistics modules (MM, PP, SD, QM, PM, EWM, and FI/CO). It is structured hierarchically across organizational levels (Client, Plant, Storage Location, Warehouse Number).",
      whyUsed: [
        "Eliminates redundant data entry across purchasing, inventory, production, and finance",
        "Enforces consistent valuation, tax calculation, and inventory tracking",
        "Controls system behaviors (e.g. shelf-life checks, batch management, replenishment triggers)",
        "Serves as the foundational anchor for all transactional documents (PR, PO, GR, Invoice)"
      ],
      howItWorks: [
        "Material Type (e.g. ROH, HALB, FERT) controls which screen views appear, whether number assignment is internal or external, and whether inventory is updated by quantity and/or value.",
        "Industry Sector (e.g. Mechanical, Chemical, Retail) controls screen sequence and industry-specific fields.",
        "Organizational Levels determine where data applies: Client-level (Global Description, Base UoM), Plant-level (Purchasing Group, MRP parameters), SLoc-level (Storage Bin, Picking Area), Valuation-level (Price, Valuation Class)."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Select Industry Sector & Material Type",
          description: "Launch MM01, enter Material Code (or leave blank for internal numbering), choose Industry Sector and Material Type.",
          sapAction: "Transaction MM01 initiation",
          tcode: "MM01",
          tablesUpdated: ["MARA"]
        },
        {
          stepNumber: 2,
          title: "Select Departmental Views",
          description: "Choose relevant views: Basic Data 1 & 2, Purchasing, MRP 1-4, General Plant Data / Storage 1 & 2, Accounting 1 & 2.",
          sapAction: "View selection pop-up dialog",
          tcode: "MM01"
        },
        {
          stepNumber: 3,
          title: "Assign Organizational Levels",
          description: "Specify Plant (e.g., 1000) and Storage Location (e.g., 0001) for plant-specific and storage-specific views.",
          sapAction: "Org level specification",
          tcode: "MM01",
          tablesUpdated: ["MARC", "MARD"]
        },
        {
          stepNumber: 4,
          title: "Populate Mandatory Fields & Save",
          description: "Enter Base UoM, Material Group, Purchasing Group, Valuation Class, Price Control (Standard S or Moving Average V), and Save.",
          sapAction: "Database commit on SAVE",
          tcode: "MM01",
          tablesUpdated: ["MARA", "MARC", "MARD", "MBEW", "MAKT"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Table", name: "MARA", description: "General Material Data at Client level (Base UoM, Material Group, Gross/Net Weight)" },
        { objectType: "Table", name: "MAKT", description: "Material Short Descriptions in multiple languages (SPRAS key)" },
        { objectType: "Table", name: "MARC", description: "Plant-specific data (Purchasing Group, MRP type, Safety Stock, Batch Mgmt indicator)" },
        { objectType: "Table", name: "MARD", description: "Storage Location data (Current Stock, Physical Inventory status)" },
        { objectType: "Table", name: "MBEW", description: "Material Valuation data (Valuation Class, Price Control S/V, Moving Avg Price, Total Stock Value)" }
      ],
      relatedTcodes: ["MM01", "MM02", "MM03", "MM60", "MMAM", "MMBE", "OMS2", "OMSR"],
      fioriApps: [
        { appId: "F1602", appName: "Manage Product Master Data", fioriRole: "Master Data Specialist" },
        { appId: "F1990", appName: "Display Material", fioriRole: "Purchaser / Inventory Manager" }
      ],
      relatedTables: [
        { tableName: "MARA", description: "General Material Master Data", keyFields: ["MANDT", "MATNR"] },
        { tableName: "MARC", description: "Plant Data for Material", keyFields: ["MANDT", "MATNR", "WERKS"] },
        { tableName: "MARD", description: "Storage Location Data for Material", keyFields: ["MANDT", "MATNR", "WERKS", "LGORT"] },
        { tableName: "MBEW", description: "Material Valuation", keyFields: ["MANDT", "MATNR", "BWKEY", "BWTAR"] },
        { tableName: "MLGN", description: "WM Material Data per Warehouse Number", keyFields: ["MANDT", "MATNR", "LGNUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Logistics - General -> Material Master -> Basic Settings -> Material Types -> Define Attributes of Material Types (T-Code: OMS2)",
        criticalSettings: [
          "Quantity / Value Updating (MENGU / WERTU) per Valuation Area",
          "Field Selection Group assignment to control Required / Optional / Display / Suppress fields per Material Type and Transaction (OMSR / OMS9)",
          "Number Range Assignment (Internal vs External) per Material Type (MMNR)"
        ],
        mandatoryPrerequisites: ["Valuation Area setup (Company Code / Plant level)", "Material Groups (OMSF)", "Base Units of Measurement (CUNI)"],
        commonPitfalls: [
          "Forgetting to check 'Quantity Updating' and 'Value Updating' for a new Plant in OMS2, resulting in zero valuation postings during GR.",
          "Changing Base UoM after transactional postings have already occurred (SAP blocks this once stocks exist in MSEG/MBEW)."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "BMW Engine Plant (Plant 1000, Munich)",
        scenario: "Procurement engineer introduces a new Titanium Cylinder Head component. The component is classified under Material Type ROH (Raw Material), tracked with Valuation Class 3000 (Raw Materials), assigned Standard Price $450.00, and marked as Batch-Managed for safety tracking.",
        businessOutcome: "When 500 units arrive at receiving, the system automatically checks the batch requirement, validates standard cost vs PO price variance, and credits GR/IR Clearing while debiting Raw Material Inventory."
      },
      industryExamples: {
        automotive: "Engine components require Batch Management flag (MARC-XCHPF = 'X') and JIT delivery indicator.",
        aerospace: "Turbine blades mandate Serial Number Profile and Split Valuation based on flight-hour lifecycle condition.",
        pharma: "Active ingredients require Shelf Life Expiration Date (MARA-MHDHB) and Min Remaining Shelf Life (MARA-MHDRZ).",
        food_beverage: "Dairy ingredients require Catch Weight configuration (CWM) tracking both Cases and exact Kilograms.",
        mechanical: "Heavy steel plates use Dimension Views with Volume/Weight calculations for crane payload limits.",
        electronics: "SMD chips require Moisture Sensitivity Level (MSL) tracking and ESD storage attributes.",
        retail: "Generic Articles with Variants (e.g. T-Shirt with Size and Color matrix) in SAP Retail.",
        cpg: "Pallet layer packaging specifications linked to Material Master for automated AS/RS racking.",
        logistics_3pl: "Materials mapped with Custodian/Owner Partner Number in client-specific view.",
        construction: "Structural beams assigned to Project Stock (Q) and non-standard length measurements.",
        industrial: "Configurable Materials (KMAT) linked to Super BOM and Variant Configuration profiles."
      },
      scenarioQuestion: {
        prompt: "A purchasing clerk tries to create a Purchase Order for Material 'MAT-8840' at Plant 1000, but gets the error: 'Material MAT-8840 not maintained in plant 1000'. The material is already viewable in MM03. What is the root cause?",
        options: [
          "The material master exists only at Client level (Basic Data) and has not been extended to Plant 1000 (Purchasing / Plant views in MM01).",
          "The vendor is blocked for purchasing.",
          "The purchasing group is inactive in SPRO.",
          "The material type does not allow purchasing."
        ],
        correctIndex: 0,
        explanation: "In SAP, creating a material in MM01 with only Basic Data creates the MARA record (Client level), but does not create the MARC record (Plant level). To purchase or store in Plant 1000, the material must be extended to Plant 1000 using MM01."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Base Unit of Measure cannot be changed (Message ME051)",
          errorCode: "ME051",
          rootCause: "Stocks exist in the current or previous period, or open documents (PO, PR, Reservations) reference this material.",
          solutionSteps: [
            "Check stock in MMBE. Clear all stock via Goods Issue or Transfer Posting.",
            "Close or delete all open Purchase Orders (ME22N), PRs (ME52N), and Production Orders (CO02).",
            "Archive or clear material documents if period has closed, then execute MM02 to change UoM."
          ]
        },
        {
          errorOrIssue: "Error: No valuation data maintained for material MAT-100 (Message M3352)",
          errorCode: "M3352",
          rootCause: "Accounting 1 view (MBEW table) has not been extended for the target plant/valuation area.",
          solutionSteps: [
            "Open MM01, enter material code MAT-100, select Accounting 1 view.",
            "Specify Plant / Valuation Area.",
            "Enter Valuation Class, Price Control (S or V), and Standard/Moving Price, then Save."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What is the difference between Material Type and Industry Sector in SAP MM?",
          keyPoints: ["Material Type controls views, number range, and quantity/value updating", "Industry Sector controls screen sequence and industry-specific field selection"],
          sampleAnswer: "Material Type (e.g. ROH, FERT, HALB) defines the business nature of the material, controls which views appear, whether number ranges are internal/external, and if inventory updates by quantity and/or value. Industry Sector (e.g. Mechanical, Chemical) determines the screen sequence, field selection, and branch-specific layouts."
        },
        {
          tier: "Intermediate",
          question: "What happens in the background when a material is created with Material Type NLAG (Non-stock material) vs UNBW (Non-valuated material)?",
          keyPoints: ["NLAG: Neither quantity nor value updated in inventory (charged directly to consumption/cost center)", "UNBW: Quantity updated in MARD/MSEG, but value is zero (no accounting document on GR)"],
          sampleAnswer: "For NLAG, neither quantity nor value is tracked in warehouse inventory. When purchased, it requires an Account Assignment Category (e.g. Cost Center K) and is immediately expensed upon Goods Receipt. For UNBW, quantity is tracked in inventory (MARD), but value is not updated (no MBEW value update; expensed at PO receipt)."
        },
        {
          tier: "Advanced",
          question: "How does SAP determine whether a field in the Material Master is Mandatory, Optional, Display, or Suppressed?",
          keyPoints: ["OMSR / OMS9 Field Selection Groups", "Influenced by Material Type, Transaction Code, Industry Sector, and Plant"],
          sampleAnswer: "Field selection is governed by Field Selection Groups (OMSR). Each field belongs to a group, and its status (Hide, Display, Required, Optional) is evaluated based on Field Selection Reference keys combining Material Type (e.g., ROH), Transaction Code (e.g., MM01 vs MM03), Industry Sector, and Plant. The most restrictive rule wins (Hide > Display > Required > Optional)."
        },
        {
          tier: "Consultant",
          question: "A global client wants to change Price Control from Standard (S) to Moving Average (V) for 50,000 raw materials across 12 plants. What is your architectural assessment and recommendation?",
          keyPoints: ["Impact on inventory valuation during invoice variances", "Locking issues with Moving Average in high-volume environments", "CKM3 Material Ledger considerations in S/4HANA"],
          sampleAnswer: "For raw materials in high-transaction manufacturing, Moving Average (V) causes frequent inventory revaluations upon invoice price differences (MR11/MIRO). Under S/4HANA with Material Ledger active, SAP strongly recommends Standard Price (S) with Price Differences (PRD) posted separately to avoid table locking issues during simultaneous GRs. If the client insists, change must be done via MR21 or custom cutover program with all stocks zeroed or revalued at month-end closing."
        }
      ],
      consultantChallenge: {
        title: "Split Valuation Architecture for Regulated Aerospace Client",
        clientRequirement: "Client procures aircraft landing gear assemblies under a single material number. However, items can be: 1) Brand New from OEM ($50,000), 2) Overhauled/Recertified ($28,000), or 3) Damaged awaiting scrap ($2,000). All must reside in the same warehouse and plant without mixing costs.",
        architecturalOptions: [
          {
            optionName: "Option A: 3 Distinct Material Numbers (e.g. LG-NEW, LG-OVR, LG-DMG)",
            pros: ["Simple master data setup", "Standard MM01 creation"],
            cons: ["Triples material master count", "Breaks global BOMs and maintenance task lists requiring engineering change orders", "Complicates MRP planning"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: Split Valuation (Valuation Category C - Condition-based)",
            pros: ["Single Material Number across all engineering BOMs", "Maintains separate valuation records in MBEW for Valuation Types NEW, OVERHAULED, DAMAGED", "Accurate COGS & balance sheet valuation"],
            cons: ["Requires purchasing and warehouse users to select Valuation Type on every transaction (PO, GR, WT)"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement Split Valuation in SPRO (OMW1/OMW2/OMWC). Configure Valuation Category 'C' (Condition) with Valuation Types NEW, OVERHAULED, DAMAGED. Maintain header valuation record with Moving Average and child valuation records with Standard Prices. Configure EWM to map Valuation Types to Availability Groups/Stock Types."
      }
    }
  },
  {
    id: "mm-purchase-order",
    module: "MM",
    category: "Procurement",
    title: "Purchase Order & Sourcing (ME21N / ME22N / ME23N)",
    subtitle: "The legally binding procurement contract committing a supplier to deliver goods or services at agreed prices and terms.",
    level: "INTERMEDIATE",
    tags: ["Procurement", "Purchase Order", "ME21N", "EKKO", "EKPO", "Source Determination", "Release Strategy"],
    pedagogy: {
      beginnerExplanation: "Imagine placing a large Amazon order for your business. The Purchase Order (PO) is the official contract that lists the items, agreed unit price, delivery date, shipping address (Plant/Warehouse), and payment terms (e.g. Net 30 days). Once the vendor confirms, both parties are legally bound to that transaction.",
      formalDefinition: "A Purchase Order is a formal document sent by a buyer (Purchasing Organization) to a vendor (Business Partner/Supplier) requesting materials or services with specified quantities, prices, delivery schedules, shipping instructions, and account assignment details.",
      whyUsed: [
        "Establishes a legal commitment between company and vendor",
        "Authorizes receiving warehouse to accept delivery and create Goods Receipt (MIGO / Inbound Delivery)",
        "Acts as the financial foundation for 3-Way Invoice Matching (PO vs GR vs Invoice)",
        "Captures pricing conditions (gross price, discounts, freight, customs duties, surcharges)"
      ],
      howItWorks: [
        "A PO can be created manually (ME21N) or automatically converted from an approved Purchase Requisition (ME59N), RFQ Quotation (ME47), or MRP run.",
        "The system performs Source Determination using Purchasing Info Records (PIR), Source Lists (ME01), or Quota Arrangements (MEQ1).",
        "Pricing Procedure (Schema Calculation) calculates net price using condition technique (PB00, RA01, FRA1).",
        "If total PO value or specific criteria exceed thresholds, SAP triggers a Release Strategy (Approval Workflow) blocking output until approved."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Select Document Type & Vendor",
          description: "Choose Document Type (e.g. Standard NB, Subcontracting SC, Stock Transport UB) and enter Vendor / Business Partner code.",
          sapAction: "Header creation in ME21N",
          tcode: "ME21N",
          tablesUpdated: ["EKKO"]
        },
        {
          stepNumber: 2,
          title: "Enter Line Items, Plant & Storage Location",
          description: "Enter Material Number, PO Quantity, Delivery Date, Net Price, Plant, and Storage Location.",
          sapAction: "Item processing & condition determination",
          tcode: "ME21N",
          tablesUpdated: ["EKPO", "EKET", "KONV"]
        },
        {
          stepNumber: 3,
          title: "Verify Account Assignment & Limits (if applicable)",
          description: "For non-stock or service items, assign Account Assignment Category (K for Cost Center, P for Project/WBS, A for Asset).",
          sapAction: "Account assignment validation",
          tcode: "ME21N",
          tablesUpdated: ["EKKN"]
        },
        {
          stepNumber: 4,
          title: "Execute Release Strategy & Save",
          description: "Save the PO. If Release Strategy is configured, PO status is blocked until released in ME28 / ME29N.",
          sapAction: "Commit to database & workflow event trigger",
          tcode: "ME21N",
          tablesUpdated: ["EKKO", "EKPO", "NAST"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Table", name: "EKKO", description: "Purchasing Document Header (Doc Number EBELN, Vendor LIFNR, Purch Org EKORG, Purch Group EKGRP, Doc Date BEDAT)" },
        { objectType: "Table", name: "EKPO", description: "Purchasing Document Item (Material MATNR, Plant WERKS, Net Price NETPR, Quantity MENGE, UoM MEINS)" },
        { objectType: "Table", name: "EKET", description: "Purchasing Schedule Lines (Delivery Date EINDT, Scheduled Quantity MENGE)" },
        { objectType: "Table", name: "EKKN", description: "Account Assignment in Purchasing Document (GL Account SAKTO, Cost Center KOSTL, WBS Element PS_PSP_PNR)" },
        { objectType: "Table", name: "EKBE", description: "Purchasing Document History (Tracks GRs, IRs, and Down Payments against PO)" }
      ],
      relatedTcodes: ["ME21N", "ME22N", "ME23N", "ME28", "ME29N", "ME59N", "ME2M", "ME2L", "ME80FN"],
      fioriApps: [
        { appId: "F0842A", appName: "Manage Purchase Orders", fioriRole: "Purchaser" },
        { appId: "F0402A", appName: "Approve Purchase Orders", fioriRole: "Purchasing Manager / Executive" }
      ],
      relatedTables: [
        { tableName: "EKKO", description: "Purchasing Document Header", keyFields: ["MANDT", "EBELN"] },
        { tableName: "EKPO", description: "Purchasing Document Item", keyFields: ["MANDT", "EBELN", "EBELP"] },
        { tableName: "EKBE", description: "Purchasing Document History", keyFields: ["MANDT", "EBELN", "EBELP", "ZEKKN", "VGABE", "GJAHR", "BELNR", "BUZEI"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Materials Management -> Purchasing -> Purchase Order -> Define Document Types (T-Code: OMEC)",
        criticalSettings: [
          "Document Type Assignment (NB, UB, FO) with Number Ranges and Item Category validity",
          "Field Selection Reference Key per Document Type (e.g. NBF) controlling mandatory fields in ME21N",
          "Release Procedure for Purchase Orders with Classification (Classes, Characteristics via CT04/CL02, Release Groups, Release Codes, Release Strategies)"
        ],
        mandatoryPrerequisites: ["Purchasing Organization (OX08)", "Purchasing Groups (OME4)", "Vendor Master / BP (BP transaction)"],
        commonPitfalls: [
          "Configuring Release Strategy characteristics with inconsistent communication structure fields (CEKKO-GNETW vs CEKKO-NETPR), leading to strategy failure.",
          "Not maintaining exchange rates in OB08 when creating PO in foreign currency, causing pricing calculation errors."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Siemens Power Generation (Plant 2000, Charlotte)",
        scenario: "Procurement department orders 10 heavy gas turbine exhaust valves ($120,000 total) from an approved supplier. Because the value exceeds $100,000, Release Strategy 'S3' triggers, requiring electronic approval from the Plant Purchasing Director.",
        businessOutcome: "Once the Director releases the PO in Fiori app F0402A, an EDI 850 message / XML is automatically dispatched to the vendor, and an Inbound Delivery notification is expected in SAP."
      },
      industryExamples: {
        automotive: "Scheduling Agreements (LP/LPA) replacing daily POs for continuous JIT sequence parts delivery.",
        aerospace: "PO includes strict Certificate of Conformity (CoC) requirement and AS9100 quality clause codes.",
        pharma: "PO validates Quality Info Record (Q-Info) to ensure vendor is audited and certified for GMP API supply.",
        food_beverage: "PO specifies temperature monitoring threshold and maximum allowable days from production to receipt.",
        mechanical: "Subcontracting Purchase Order (Item Category L) sending raw casting components to vendor for machining.",
        electronics: "Vendor Consignment PO (Item Category K) where goods reside in buyer warehouse with zero financial liability until consumed.",
        retail: "Promotional Pre-Pack Purchase Orders containing multiple variant articles bundled under a single sales unit.",
        cpg: "Blanket Purchase Orders (Item Category B / Document Type FO) with validity periods for continuous packaging material supplies.",
        logistics_3pl: "Service Purchase Orders (Item Category D) procuring contracted freight handling and cross-docking services.",
        construction: "Third-Party Purchase Orders (TAS / Item Category S) where supplier delivers structural concrete directly to project site.",
        industrial: "Capital Asset PO with Account Assignment A (Asset Master) and investment order tracking."
      },
      scenarioQuestion: {
        prompt: "A buyer creates a standard PO (Doc Type NB) for 100 units of Material A. When attempting to perform Goods Receipt in MIGO, the system throws error: 'Document 4500001234 has not been released'. What must be done?",
        options: [
          "The PO must be approved/released using transaction ME29N or ME28 by authorized approver before GR can occur.",
          "The material master must be extended to storage location in MM01.",
          "The vendor must be unblocked in BP transaction.",
          "The buyer must delete and recreate the PO with Item Category U."
        ],
        correctIndex: 0,
        explanation: "When a PO is subject to a Release Strategy in SAP, its processing status is blocked (EKKO-FRGKE <> 'S'). The warehouse cannot post Goods Receipt (MIGO) until the required release codes have approved the document."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Net price must be greater than 0 (Message ME078)",
          errorCode: "ME078",
          rootCause: "No price was entered and no active Purchasing Info Record or Condition Record exists for this Vendor/Material/Purch Org combination.",
          solutionSteps: [
            "Check Item Conditions tab in ME21N and enter Condition PB00 (Gross Price).",
            "Or maintain an active Info Record in ME11 with valid validity dates and purchase organization."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What is the difference between a Purchase Requisition (PR) and a Purchase Order (PO)?",
          keyPoints: ["PR is an internal request for goods; PO is an external legally binding contract with a vendor"],
          sampleAnswer: "A Purchase Requisition (PR) is an internal document created by a department (or generated automatically by MRP) requesting materials or services. A Purchase Order (PO) is an external, legally binding document sent to a vendor specifying delivery dates, prices, and terms."
        },
        {
          tier: "Intermediate",
          question: "Explain the purpose of Item Categories in SAP Purchasing (e.g. Standard, K, L, S, D, U).",
          keyPoints: ["Controls procurement process flow, screen sequence, and stock/accounting behavior", "K=Consignment, L=Subcontracting, S=Third Party, D=Service, U=Stock Transport"],
          sampleAnswer: "Item Categories determine the specific procurement mechanism: Standard (blank) is regular purchase with inventory receipt; K (Consignment) receives vendor-owned stock at zero liability; L (Subcontracting) provides components to vendor to produce assembly; S (Third-party) triggers direct delivery from vendor to customer; D (Service) procures external services with Service Entry Sheets (ML81N); U (Stock Transfer) moves stock between plants."
        }
      ],
      consultantChallenge: {
        title: "Global Sourcing & Quota Arrangement Optimization",
        clientRequirement: "A global medical device manufacturer procures critical titanium micro-tubes. To mitigate supply disruption, corporate policy dictates: Vendor A (Germany) gets 60% of volume, Vendor B (Japan) gets 30%, and local Vendor C gets 10%. Daily MRP runs must automatically split purchase requisitions proportionally.",
        architecturalOptions: [
          {
            optionName: "Option A: Manual buyer splitting during PR to PO conversion in ME57",
            pros: ["No SPRO config required"],
            cons: ["Highly error-prone", "Relies on manual buyer calculations", "Causes stockouts if buyers miss quotas"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: Quota Arrangement (MEQ1) with MRP Quota Splitting Logic (SPRO/OMEQ)",
            pros: ["Fully automated MRP PR generation according to Quota Rating formula", "Maintains multi-sourcing resilience", "Auditable compliance"],
            cons: ["Requires maintaining quota arrangement master records (MEQ1) and MRP 2 view Quota Arrangement Usage '4'"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Maintain Quota Arrangement Usage in Material Master MRP 2 view (MARC-USEQU = '4' for PR & PO). Create Quota Arrangement in MEQ1 with Allocated Quotas: Vendor A = 60, Vendor B = 30, Vendor C = 10. The MRP engine calculates Quota Rating = (Quota Allocated Quantity + Quota Base Quantity) / Quota and automatically assigns the next planned order / PR to the vendor with the lowest rating."
      }
    }
  },
  {
    id: "mm-inventory-goods-receipt",
    module: "MM",
    category: "Inventory Management",
    title: "Goods Receipt & Inventory Management (MIGO / 101)",
    subtitle: "The physical acceptance and system recording of incoming goods, creating material and financial ledger entries.",
    level: "BEGINNER",
    tags: ["Inventory Management", "MIGO", "Goods Receipt", "Movement Type 101", "MSEG", "MKPF", "BKPF", "BSEG", "Stock Types"],
    pedagogy: {
      beginnerExplanation: "When a delivery truck arrives at the factory loading dock and unloads the boxes you ordered, the warehouse clerk counts the boxes and logs them into SAP using transaction MIGO (Goods Receipt). At that exact instant, your stock count increases on the computer, and the finance ledger automatically registers the new inventory value!",
      formalDefinition: "Goods Receipt (GR) is an inventory management transaction in SAP (executed via MIGO or BAPI_GOODSMVT_CREATE) that posts incoming goods against a reference document (Purchase Order, Inbound Delivery, Production Order, or without reference), updating physical stock levels (MSEG) and generating corresponding financial accounting documents (BKPF/BSEG).",
      whyUsed: [
        "Increases physical and book inventory quantities in real time",
        "Generates financial journal entry: Debit Inventory (BSX) and Credit GR/IR Clearing (WRX)",
        "Updates Purchase Order History (EKBE), showing delivered quantities and pending balances",
        "Triggers downstream processes like Quality Inspection (QM) or EWM Warehouse Tasks"
      ],
      howItWorks: [
        "User opens MIGO, selects transaction 'A01 Goods Receipt' with reference 'R01 Purchase Order', and inputs the PO number.",
        "System defaults line items from EKPO/EKET. User verifies delivery note, quantity, storage location, and batch.",
        "Movement Type 101 is applied. On clicking 'Post', SAP atomically generates a Material Document (MKPF/MSEG) and an Accounting Document (BKPF/BSEG).",
        "Stock is placed into Unrestricted Use, Quality Inspection, or Blocked stock depending on material master configuration."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Launch MIGO & Select Reference",
          description: "Select 'Goods Receipt' and 'Purchase Order\. Enter PO number and press Enter.",
          sapAction: "PO data extraction into MIGO screen",
          tcode: "MIGO",
          tablesUpdated: ["EKKO", "EKPO"]
        },
        {
          stepNumber: 2,
          title: "Verify Quantities, Storage Location & Batch",
          description: "Enter received quantity, destination Storage Location (e.g. 0001), and Batch / Expiry date if batch-managed.",
          sapAction: "Item verification & data entry",
          tcode: "MIGO"
        },
        {
          stepNumber: 3,
          title: "Flag 'Item OK' & Check Document",
          description: "Check the 'Item OK' checkbox at bottom of screen. Click 'Check' button to validate tolerances and period posting.",
          sapAction: "System consistency & tolerance check",
          tcode: "MIGO"
        },
        {
          stepNumber: 4,
          title: "Post Goods Receipt",
          description: "Click 'Post\. System generates Material Document number (e.g. 5000012345) and FI Accounting Document.",
          sapAction: "Database commit (atomic update)",
          tcode: "MIGO",
          tablesUpdated: ["MKPF", "MSEG", "BKPF", "BSEG", "EKBE", "MBEW", "MARD"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Table", name: "MKPF", description: "Material Document Header (Doc Number MBLNR, Fiscal Year MJAHR, Posting Date BUDAT, User USNAM)" },
        { objectType: "Table", name: "MSEG", description: "Material Document Item (Movement Type BWART, Material MATNR, Plant WERKS, SLoc LGORT, Quantity MENGE, D/C Indicator SHKZG)" },
        { objectType: "Table", name: "BKPF", description: "Accounting Document Header (Company Code BUKRS, Doc Number BELNR, Fiscal Year GJAHR)" },
        { objectType: "Table", name: "BSEG", description: "Accounting Document Item (GL Account HKOST, Amount DMBTR, Debit/Credit SHKZG)" },
        { objectType: "Table", name: "EKBE", description: "PO History line updated with VGABE = 1 (Goods Receipt)" }
      ],
      relatedTcodes: ["MIGO", "MB01", "MB03", "MBST", "MMBE", "MB51", "MB52", "OMJJ"],
      fioriApps: [
        { appId: "F1078", appName: "Post Goods Receipt for Purchasing Document", fioriRole: "Warehouse Clerk" },
        { appId: "F1595", appName: "Stock - Single Material", fioriRole: "Inventory Manager" }
      ],
      relatedTables: [
        { tableName: "MKPF", description: "Material Document Header", keyFields: ["MANDT", "MBLNR", "MJAHR"] },
        { tableName: "MSEG", description: "Material Document Segment (Items)", keyFields: ["MANDT", "MBLNR", "MJAHR", "ZEILE"] },
        { tableName: "MARD", description: "Storage Location Quantities", keyFields: ["MANDT", "MATNR", "WERKS", "LGORT"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Materials Management -> Inventory Management and Physical Inventory -> Goods Receipt -> Set Tolerance Limits (T-Code: OMC0 / OMJJ)",
        criticalSettings: [
          "Movement Type configuration in OMJJ (Field Selection, Account Grouping, Reversal rules)",
          "Tolerance Limits (B1 for Order Price Quantity, B2 for Overdelivery / Underdelivery)",
          "Automatic Account Determination (OBYC) for Transaction Keys BSX (Inventory Posting) and WRX (GR/IR Clearing)"
        ],
        mandatoryPrerequisites: ["Open Posting Periods in MMRV / MMPV and OB52", "Valuation Class in Material Master MBEW"],
        commonPitfalls: [
          "Posting date falling into a closed posting period, causing Error M7053 (Posting only possible in periods MM/YYYY and MM/YYYY).",
          "Account determination missing in OBYC for transaction key WRX or BSX for valuation class, causing Error M8034."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Mercedes-Benz Assembly Plant (Tuscaloosa)",
        scenario: "A shipment of 200 brake calipers arrives from Bosch under PO 4500098765. The receiving clerk scans the barcode in MIGO. The system verifies PO line 10 for 200 units at $80.00/unit.",
        businessOutcome: "Upon posting: Inventory increases by 200 units in Plant 1000 SLoc 0001. Financial ledger posts: Debit $16,000 to Raw Material Inventory (GL 131000 / BSX) and Credit $16,000 to GR/IR Clearing Account (GL 211000 / WRX)."
      },
      industryExamples: {
        automotive: "GR against Inbound Delivery (101 via VLA) linked to Advanced Shipping Notification (EDI 856 ASN).",
        aerospace: "GR posted into Quality Inspection stock (Stock Type 2) with mandatory inspection lot creation (01).",
        pharma: "GR captures Manufacturing Date, Expiration Date (SLED), and Vendor Batch Number; places stock in Quarantine.",
        food_beverage: "GR captures Dual Catch Weight quantities (e.g. 100 boxes = 2,450.50 kg total weight).",
        mechanical: "GR for Subcontracting PO (101 for finished assembly, automatically consumes component stock via 543).",
        electronics: "GR triggers automatic serial number generation for 100 high-end GPU processors.",
        retail: "Store-level Goods Receipt directly from Distribution Center truck via RF handheld device.",
        cpg: "Automated Goods Receipt triggered via RFID gate scan as pallet passes loading dock.",
        logistics_3pl: "GR logs warehouse receipt and updates Custodian client ledger for billable storage days.",
        construction: "GR posted with Account Assignment Q (WBS Element) directly to jobsite storage location.",
        industrial: "GR for Capital Machinery with automatic Asset Master capitalization."
      },
      scenarioQuestion: {
        prompt: "A warehouse clerk posts Goods Receipt for 50 units against a PO. Later, the supplier calls stating they accidentally delivered the wrong part. What is the standard SAP procedure to correct this?",
        options: [
          "Post a Return Delivery to Vendor using MIGO with Movement Type 122 (referencing original Material Document), or cancel the GR document via MIGO Movement Type 102.",
          "Delete the material document from table MSEG.",
          "Create a sales order and sell the goods back to the vendor.",
          "Post a scrap movement type 551 to remove stock."
        ],
        correctIndex: 0,
        explanation: "In SAP, you never delete database entries. To reverse a Goods Receipt immediately, post a document cancellation in MIGO with Movement Type 102 (or MBST). If goods are being shipped back to vendor after acceptance, post a Return Delivery with Movement Type 122."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Deficit of SL Unrestricted-use stock (Message M7021)",
          errorCode: "M7021",
          rootCause: "Attempting to reverse a GR (102/122) or issue stock when the current available unrestricted stock in that Plant/SLoc/Batch is less than the reversal quantity (often because stock was already consumed or moved).",
          solutionSteps: [
            "Check stock breakdown in MMBE and transaction history in MB51.",
            "If stock was moved to Quality Inspection or another SLoc, transfer it back to Unrestricted in the original SLoc first (via 321 or 311) before performing reversal."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What financial accounting entries are generated during a standard Purchase Order Goods Receipt (Movement Type 101)?",
          keyPoints: ["Debit: Inventory Account (BSX)", "Credit: GR/IR Clearing Account (WRX)"],
          sampleAnswer: "During a standard PO Goods Receipt (Movement Type 101), the accounting document records: Debit to Raw Material / Inventory Asset Account (Transaction Key BSX) and Credit to GR/IR (Goods Receipt / Invoice Receipt) Clearing Account (Transaction Key WRX). No cash or vendor liability is posted yet; vendor liability is posted during Invoice Verification (MIRO)."
        }
      ],
      consultantChallenge: {
        title: "Negative Stock & Real-Time Production Line Feeding",
        clientRequirement: "An automotive assembly plant consumes fasteners continuously on the shop floor. In high-speed assembly, production confirmation (261 GI) occurs before warehouse clerks can finish posting physical Goods Receipts (101 GR), causing constant 'M7021 Stock Deficit' transaction terminations.",
        architecturalOptions: [
          {
            optionName: "Option A: Disable real-time production confirmations and post manually at end of shift",
            pros: ["Avoids M7021 errors during shift"],
            cons: ["Destroys real-time WIP visibility", "Violates financial compliance", "Delays finished goods availability"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: Enable Negative Stock Allowance in SPRO for specific Storage Locations / Material Types (OMJ1)",
            pros: ["Allows seamless production line consumption without stopping line workers", "System automatically reconciles negative balance to positive when 101 GR is posted", "Maintains real-time manufacturing throughput"],
            cons: ["Requires strict daily reconciliation to prevent persistent negative inventory balances at month-end"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Activate Negative Stocks in SPRO: 1) Valuation Area level (OMJ1), 2) Storage Location level, and 3) Material Master Plant data view (MARC-XMCNG = 'X'). Restrict this strictly to line-side staging locations (e.g. SLoc 0002 Line Feed). Establish an automated daily monitoring job to ensure all GRs are posted before fiscal month-end closing."
      }
    }
  },
  {
    id: "mm-logistics-invoice-verification",
    module: "MM",
    category: "Logistics Invoice Verification",
    title: "Logistics Invoice Verification & 3-Way Match (MIRO / MR11)",
    subtitle: "Verification of vendor invoices against purchase orders and goods receipts, ensuring financial accuracy before vendor payment.",
    level: "PROFESSIONAL",
    tags: ["LIV", "MIRO", "3-Way Match", "GR/IR", "MR11", "MRBR", "RBKP", "RSEG", "Invoice Verification"],
    pedagogy: {
      beginnerExplanation: "When the supplier sends their bill (invoice) for payment, the finance team doesn't just pay it blindly. SAP performs a '3-Way Match' checking three things: 1) What did we order in the PO? 2) What did the warehouse physically receive in the GR? 3) What is the supplier charging us on the Invoice? If all three match, the invoice is approved for payment automatically!",
      formalDefinition: "Logistics Invoice Verification (LIV), executed via transaction MIRO, verifies vendor invoices for quantity, price, and mathematical correctness by comparing them against the Purchase Order (EKPO) and Goods Receipt history (EKBE). It posts the legal financial liability to Vendor Accounts Payable (BSIK/BSAK) and clears the GR/IR account.",
      whyUsed: [
        "Prevents overpayment, duplicate billing, or paying for unreceived goods",
        "Enforces the accounting 3-Way Match rule (PO vs GR vs Invoice)",
        "Automatically calculates quantity variances, price variances, cash discounts, and taxes",
        "Sets automated Payment Blocks if discrepancies exceed configured tolerance limits"
      ],
      howItWorks: [
        "In MIRO, the user enters Invoice Date, Reference PO Number, Gross Amount, and Tax Code.",
        "SAP pulls open GR quantities and expected PO prices from EKBE/EKPO.",
        "If invoice quantity matches delivered quantity and invoice price equals PO price, the balance is 0.00.",
        "On posting, SAP creates an Invoice Document (RBKP/RSEG) and an FI Document (BKPF/BSEG) debiting GR/IR Clearing and crediting Vendor AP."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Enter Invoice Header Data & PO Reference",
          description: "Open MIRO. Enter Invoice Date, Posting Date, Total Gross Amount, Tax Code, and reference PO number.",
          sapAction: "PO data & GR line item extraction",
          tcode: "MIRO",
          tablesUpdated: ["RBKP"]
        },
        {
          stepNumber: 2,
          title: "System Proposes Line Items",
          description: "System lists delivered line items with expected amounts. User adjusts invoice quantity or amount if partial.",
          sapAction: "Variance calculation & tolerance check",
          tcode: "MIRO",
          tablesUpdated: ["RSEG"]
        },
        {
          stepNumber: 3,
          title: "Verify Balance Indicator",
          description: "Ensure the Balance traffic light is GREEN (Balance = 0.00). If yellow/red, investigate price or tax discrepancy.",
          sapAction: "Financial balance verification",
          tcode: "MIRO"
        },
        {
          stepNumber: 4,
          title: "Post Invoice & Generate FI Document",
          description: "Click Post. SAP creates Invoice Document (RBKP) and FI Accounting Document (BKPF/BSEG), updating PO History.",
          sapAction: "Atomic commit & AP liability creation",
          tcode: "MIRO",
          tablesUpdated: ["RBKP", "RSEG", "BKPF", "BSEG", "EKBE"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Table", name: "RBKP", description: "Invoice Document Header (Doc Number BELNR, Fiscal Year GJAHR, Gross Amount RMWWR, Vendor LIFNR)" },
        { objectType: "Table", name: "RSEG", description: "Invoice Document Item (Item ZEILE, PO EBELN, PO Item EBELP, Invoiced Amount WRBTR, Invoiced Qty MENGE)" },
        { objectType: "Table", name: "BKPF", description: "FI Accounting Header" },
        { objectType: "Table", name: "BSEG", description: "FI Accounting Item (Vendor line item with posting key 31)" },
        { objectType: "Table", name: "EKBE", description: "PO History line updated with VGABE = 2 (Invoice Receipt)" }
      ],
      relatedTcodes: ["MIRO", "MIR4", "MIR7", "MRBR", "MR11", "MR8M", "OMR6"],
      fioriApps: [
        { appId: "F0859", appName: "Create Supplier Invoice", fioriRole: "Accounts Payable Accountant" },
        { appId: "F1626", appName: "Supplier Invoices List", fioriRole: "Accounts Payable Manager" }
      ],
      relatedTables: [
        { tableName: "RBKP", description: "Invoice Document Header", keyFields: ["MANDT", "BELNR", "GJAHR"] },
        { tableName: "RSEG", description: "Document Item: Incoming Invoice", keyFields: ["MANDT", "BELNR", "GJAHR", "BUZEI"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Materials Management -> Logistics Invoice Verification -> Invoice Block -> Set Tolerance Limits (T-Code: OMR6)",
        criticalSettings: [
          "Tolerance Keys: PP (Price Variance), DQ (Quantity Variance), BD (Small Differences), ST (Date Variance)",
          "Invoice Verification in Background settings",
          "Automatic Account Determination for Price Differences (PRD) and Exchange Rate Differences (KDB/KDY) in OBYC"
        ],
        mandatoryPrerequisites: ["Vendor Master with Payment Terms and Withholding Tax if applicable", "Tax Codes defined in FTXP"],
        commonPitfalls: [
          "Vendor invoice posted without GR-Based Invoice Verification flag (EKPO-WEBRE) checked, allowing invoice posting before physical goods arrival.",
          "Ignoring tolerance keys in OMR6 leading to unwanted automatic payment blocks on minor round-off cents."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Honeywell Aerospace Supplies",
        scenario: "Vendor delivers 100 titanium brackets ordered at $50.00/unit (Total $5,000). Goods receipt was posted for 100 units. Vendor sends invoice for 100 units at $52.00/unit (Total $5,200).",
        businessOutcome: "System detects $200 price variance exceeding tolerance key PP (configured at $50 max). Invoice posts to finance creating $5,200 Vendor liability, but automatically applies Payment Block 'R' (Invoice Verification). Invoice cannot be paid until released via MRBR."
      },
      industryExamples: {
        automotive: "Evaluated Receipt Settlement (ERS via MRRL) where invoices are generated automatically from GR without vendor paper bills.",
        aerospace: "Strict invoice matching with milestone progress billing for defense development contracts.",
        pharma: "Invoice verification linked to batch release; payment blocked if QC rejects sample.",
        food_beverage: "Catch Weight settlement balancing price against actual delivered net weight vs ordered nominal weight.",
        mechanical: "Subcontracting invoice verifying machining service charge separate from provided component valuation.",
        electronics: "High-volume EDI 810 electronic invoice ingestion with automated background posting.",
        retail: "Automated line-item matching for millions of store replenishment SKUs using tolerance grouping.",
        cpg: "Freight invoice verification against Transportation Management (TM) calculated accruals.",
        logistics_3pl: "Periodic self-billing for warehouse space usage and handling fees.",
        construction: "Progressive retention money deductions (e.g. 10% withheld until project commissioning).",
        industrial: "Capital equipment invoice with installment payments and bank guarantee verification."
      },
      scenarioQuestion: {
        prompt: "A Purchase Order has PO quantity = 100 units, Goods Receipt = 80 units. Vendor sends an invoice for 100 units. What will happen during MIRO if 'GR-Based Invoice Verification' is active?",
        options: [
          "System proposes quantity of 80 units. If user enters 100 units, system triggers a Quantity Variance error / block (Tolerance Key DQ).",
          "The system automatically posts GR for the remaining 20 units.",
          "The invoice is immediately rejected and deleted.",
          "The system changes the PO quantity to 120 units."
        ],
        correctIndex: 0,
        explanation: "When GR-Based Invoice Verification is active (EKPO-WEBRE = 'X'), SAP restricts invoice proposal strictly to delivered quantities. Invoicing for 100 units when only 80 were received creates a quantity variance that triggers a payment block under tolerance key DQ."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Balance is not zero: Difference: $15.00 (Message M8018)",
          errorCode: "M8018",
          rootCause: "The sum of line items plus tax does not equal the entered Gross Amount in invoice header.",
          solutionSteps: [
            "Check Tax Amount tab in MIRO; ensure 'Calculate Tax' is checked or correct tax is entered.",
            "Verify freight or unplanned delivery costs on Details tab.",
            "Adjust Gross Amount to match proposed total."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What is 3-Way Matching in SAP Logistics Invoice Verification?",
          keyPoints: ["Matching PO price/terms, GR received quantity, and Vendor Invoice billed quantity/price"],
          sampleAnswer: "3-Way Matching is the validation process where SAP compares: 1) Purchase Order (ordered quantity & agreed price), 2) Goods Receipt (physically received & accepted quantity), and 3) Vendor Invoice (billed quantity and requested price). Discrepancies beyond tolerance limits result in automated payment blocking."
        }
      ],
      consultantChallenge: {
        title: "High-Volume Automated E-Invoicing & Exception Handling",
        clientRequirement: "A multinational consumer goods company receives 150,000 vendor invoices per month. 85% match perfectly, but 15% have minor tax rounding differences of under $2.00 or freight surcharges, which cause thousands of manual payment blocks and overwhelm the AP accounting team.",
        architecturalOptions: [
          {
            optionName: "Option A: Increase AP team headcount to manually clear MRBR daily",
            pros: ["No system configuration changes"],
            cons: ["High ongoing operational cost", "Human error", "Late payment penalties"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: Configure Small Differences Tolerance (Key BD / ST) and Automatic Clearing in OMR6 & OBYC (DIF)",
            pros: ["Automatically absorbs minor rounding discrepancies up to $5.00 without blocking invoices", "Posts small differences to dedicated rounding P&L account (DIF)", "Frees AP team to focus solely on genuine fraud or major price discrepancies"],
            cons: ["Requires accounting audit approval for maximum allowed small difference threshold"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure Tolerance Key BD (Small Differences) in OMR6 with $5.00 threshold for automatic write-off. Map Transaction Key DIF (Small Differences) in OBYC to a specific Expense/Income rounding GL account."
      }
    }
  },
  {
    id: "mm-enterprise-structure",
    module: "MM",
    category: "Enterprise Structure",
    title: "MM Enterprise Structure & Org Levels (OX15 / OX02 / OX10 / OX08)",
    subtitle: "The foundational blueprint mapping a corporation's physical and legal entities into SAP organizational units.",
    level: "BEGINNER",
    tags: ["Enterprise Structure", "Client", "Company Code", "Plant", "Storage Location", "Purchasing Org", "Purchasing Group", "OX10", "OX08"],
    pedagogy: {
      beginnerExplanation: "Think of the SAP Enterprise Structure like a corporate organizational tree: At the very top is the Parent Corporation (Client/Company). Below that are Legal Financial Entities (Company Codes). Below each Company Code are Physical Factories and Warehouses (Plants & Storage Locations). Working across these are Procurement Offices (Purchasing Organizations & Groups) that buy raw materials for the plants.",
      formalDefinition: "The SAP MM Enterprise Structure represents the legal and organizational hierarchy of an enterprise in the SAP system, consisting of Client (MANDT), Company Code (BUKRS), Plant (WERKS), Storage Location (LGORT), Purchasing Organization (EKORG), and Purchasing Group (EKGRP).",
      whyUsed: [
        "Defines legal reporting boundaries for statutory balance sheets and P&L",
        "Establishes physical sites for inventory tracking, MRP execution, and production",
        "Determines procurement authority and supplier negotiation leverage",
        "Governs authorization and data security across global business divisions"
      ],
      howItWorks: [
        "Company Code (FI) is assigned to a Chart of Accounts and Currency.",
        "Plants (MM/PP/QM) are assigned to a single Company Code (OX18).",
        "Storage Locations (MM) are created directly under a Plant (OX09).",
        "Purchasing Organizations can be: Cross-Company-Code (Client-level), Cross-Plant (Company-Code level - OX01), or Plant-Specific (OX17).",
        "Purchasing Groups (buyer teams) are independent of org units and assigned at the document line level."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Legal Entities (Company & Company Code)",
          description: "Define Company in OX15, Company Code in OX02, and assign Company Code to Company in OX16.",
          sapAction: "Financial structure creation",
          tcode: "OX02 / OX15",
          tablesUpdated: ["T001", "T880"]
        },
        {
          stepNumber: 2,
          title: "Define Logistics Facilities (Plant & Storage Location)",
          description: "Define Plant in OX10 (copying from standard template), configure address, calendar, and define Storage Locations in OX09.",
          sapAction: "Plant & SLoc definition",
          tcode: "OX10 / OX09",
          tablesUpdated: ["T001W", "T001L"]
        },
        {
          stepNumber: 3,
          title: "Assign Plant to Company Code",
          description: "Execute OX18 to link Plant to Company Code. This establishes the financial valuation area linkage.",
          sapAction: "Plant assignment to Company Code",
          tcode: "OX18",
          tablesUpdated: ["T001K"]
        },
        {
          stepNumber: 4,
          title: "Define & Assign Purchasing Organizations",
          description: "Define Purchasing Organization in OX08, assign to Company Code (OX01) and Plants (OX17). Define Purchasing Groups in OME4.",
          sapAction: "Procurement structure assignment",
          tcode: "OX08 / OX01 / OX17",
          tablesUpdated: ["T024E", "T024W", "T024"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Org Unit", name: "Client", description: "Self-contained commercial and technical unit in SAP (Table T000)" },
        { objectType: "Org Unit", name: "Company Code", description: "Smallest organizational unit for which a complete set of financial accounts can be drawn (Table T001)" },
        { objectType: "Org Unit", name: "Plant", description: "Operational unit where materials are produced, procured, stored, and distributed (Table T001W)" },
        { objectType: "Org Unit", name: "Storage Location", description: "Sub-division of a plant where physical stock quantities are managed (Table T001L)" },
        { objectType: "Org Unit", name: "Purchasing Organization", description: "Organizational unit that negotiates procurement conditions with vendors (Table T024E)" },
        { objectType: "Org Unit", name: "Purchasing Group", description: "Key for a buyer or group of buyers responsible for specific procurement activities (Table T024)" }
      ],
      relatedTcodes: ["OX10", "OX09", "OX08", "OX01", "OX17", "OX18", "OME4", "EC01", "EC02"],
      fioriApps: [
        { appId: "F1595", appName: "Display Organizational Structure", fioriRole: "Enterprise Architect" }
      ],
      relatedTables: [
        { tableName: "T001", description: "Company Codes", keyFields: ["MANDT", "BUKRS"] },
        { tableName: "T001W", description: "Plants / Branches", keyFields: ["MANDT", "WERKS"] },
        { tableName: "T001L", description: "Storage Locations", keyFields: ["MANDT", "WERKS", "LGORT"] },
        { tableName: "T024E", description: "Purchasing Organizations", keyFields: ["MANDT", "EKORG"] },
        { tableName: "T024W", description: "Valid Purchasing Organizations for Plant", keyFields: ["MANDT", "WERKS", "EKORG"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Enterprise Structure -> Definition / Assignment -> Materials Management",
        criticalSettings: [
          "Valuation Area level determination in OX14 (Valuation at Plant level vs Company Code level; SAP strongly mandates Plant level)",
          "Plant Assignment to Company Code (OX18)",
          "Standard Purchasing Organization assignment for automated pipeline/consignment GR (OMKI / SPRO)"
        ],
        mandatoryPrerequisites: ["Factory Calendar (SCAL)", "Country & Currency keys (OY01/OY03)"],
        commonPitfalls: [
          "Creating a Plant without assigning it to a Company Code in OX18, causing transaction errors during material master creation.",
          "Forgetting to assign a Standard Purchasing Organization to a Plant in SPRO, which breaks automated consignment and pipeline settlement."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Tesla Global Manufacturing",
        scenario: "Tesla establishes Giga Texas in Austin. Client: 300 (Production System), Company Code: 1000 (Tesla US Corp - USD), Plant: 1200 (Austin Gigafactory), Storage Locations: 0001 (Raw Staging), 0002 (Battery Pack), 0003 (Finished Cybertrucks). Purchasing Org: 1000 (US Central Procurement).",
        businessOutcome: "All material receipts at Plant 1200 roll up into Tesla US Corp legal balance sheets, while global contracts negotiated by Purch Org 1000 automatically apply to Austin purchase orders."
      },
      industryExamples: {
        automotive: "Plant mapped to JIT Assembly line with dedicated line-side storage locations.",
        aerospace: "Secure bonded warehouse storage locations segregated from standard commercial inventory.",
        pharma: "Separate quarantine, cold-storage, and ambient storage locations under a single FDA-licensed plant.",
        food_beverage: "Temperature-zoned storage locations (Frozen -20C, Chilled +4C, Dry Ambient).",
        mechanical: "Project-specific staging locations mapped to assembly bays.",
        electronics: "Cleanroom ESD storage locations with controlled access authorizations.",
        retail: "Distribution Center Plant serving 500 individual Store Plants in SAP Retail.",
        cpg: "Co-packing contract manufacturing plants mapped as External Plants.",
        logistics_3pl: "Single physical warehouse partitioned into virtual plants/storage locations per client.",
        construction: "Temporary job-site plants created for multi-year infrastructure mega-projects.",
        industrial: "Global spare parts central distribution hub linked to regional service depot plants."
      },
      scenarioQuestion: {
        prompt: "A client has 3 manufacturing plants in the US and 2 in Germany. Can a single Purchasing Organization negotiate contracts and create POs for both US and German plants?",
        options: [
          "Yes, by configuring a Cross-Company-Code Purchasing Organization (assigned to Plants in OX17, but left unassigned to any single Company Code in OX01).",
          "No, SAP strictly requires one Purchasing Organization per Plant.",
          "No, Purchasing Organizations cannot cross international borders.",
          "Yes, but only if all plants share the exact same currency."
        ],
        correctIndex: 0,
        explanation: "In SAP, a Cross-Company-Code Purchasing Organization is defined in OX08 and assigned to multiple plants across different company codes in OX17, while leaving the assignment to Company Code (OX01) blank. This allows centralized strategic procurement across global entities."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Plant 2000 is not assigned to a Company Code",
          errorCode: "ORG-PLANT-01",
          rootCause: "Table T001K missing entry; Plant definition exists in OX10 but was not mapped in OX18.",
          solutionSteps: [
            "Open transaction OX18 (Assign Plant to Company Code).",
            "Click New Entries, enter Company Code (e.g. 1000) and Plant (e.g. 2000).",
            "Save in customizing transport request."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "Explain the hierarchy of Organizational Units in SAP MM.",
          keyPoints: ["Client -> Company Code -> Plant -> Storage Location", "Purchasing Organization & Purchasing Group"],
          sampleAnswer: "The MM hierarchy starts at the top with Client (global system instance), followed by Company Code (independent legal FI entity), Plant (physical manufacturing/distribution facility), and Storage Location (sub-area within a plant for physical inventory segregation). Purchasing Organization is the procurement entity that negotiates terms, and Purchasing Group represents the operational buyers."
        },
        {
          tier: "Intermediate",
          question: "What is a Standard Purchasing Organization and why is it needed?",
          keyPoints: ["Automated source determination for Consignment, Pipeline, and Stock Transport Orders", "Assigned in SPRO enterprise structure"],
          sampleAnswer: "A Standard Purchasing Organization is assigned to a plant in SPRO customizing. When transactions like Goods Receipt for Consignment or Pipeline materials occur, or during automated Stock Transport Orders and Source Determination, SAP needs a default purchasing organization to fetch info records and condition prices automatically. The system uses the designated Standard Purchasing Org."
        },
        {
          tier: "Consultant",
          question: "How would you design the enterprise structure for a multinational conglomerate with centralized procurement in Switzerland and decentralized local plants across 15 countries?",
          keyPoints: ["Central Global Purchasing Organization for framework contracts (WK/MK)", "Reference Purchasing Organizations in SPRO", "Local Purchasing Organizations for operational PO execution"],
          sampleAnswer: "I would design a Hybrid Multi-Tier Sourcing Model using Reference Purchasing Organizations: 1) Define a Central Global Purchasing Org in Switzerland (unassigned to any company code) to negotiate global contracts and volume discounts. 2) Define Local Purchasing Orgs for each country assigned to their respective local Company Codes and Plants. 3) Configure Reference Purchasing Organization links in SPRO (Assign Purch Org to Reference Purch Org in OMKI). Local buyers can reference global contracts while creating local POs in local currency with local tax codes."
        }
      ],
      consultantChallenge: {
        title: "Plant Reorganization & Merger Enterprise Design",
        clientRequirement: "Two acquired manufacturing subsidiaries (Plant 1010 and Plant 1020) currently belonging to two different legacy company codes must be merged under a single unified Company Code 1000 without losing 5 years of historical material inventory logs and open POs.",
        architecturalOptions: [
          {
            optionName: "Option A: Directly reassign Plant 1010/1020 to Company Code 1000 in OX18",
            pros: ["Quick single-step customizing change"],
            cons: ["FATAL ERROR: Corrupts GL balances, breaks existing open PO history in EKBE, creates open GR/IR mismatches in closed fiscal periods, causes severe table inconsistencies in MBEW/BSEG"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: Formal Cutover Migration: Zero out inventory, close open POs/PRs, create new Plants under CoCode 1000, and migrate balances",
            pros: ["100% financial and statutory compliance", "Clean audit trail with zero database corruption", "Full support for Material Ledger and S/4HANA Universal Journal ACDOCA"],
            cons: ["Requires structured cutover weekend and master data migration scripts"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Execute a structured Plant Migration: 1) Stop all open transactions and close all open POs, PRs, Production Orders, and Sales Orders. 2) Post Goods Issue (562 / scrapping) to zero out all physical inventory in legacy plants. 3) Reconcile and clear all GR/IR accounts (MR11/F.13). 4) Define new Plant codes under Company Code 1000. 5) Upload open master data and post initial inventory balances via Movement Type 561 under new Plants."
      }
    }
  }
];
