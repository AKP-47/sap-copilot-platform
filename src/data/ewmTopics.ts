import { SapTopic } from "../types/sap";

export const EWM_TOPICS: SapTopic[] = [

  // =========================================================================
  // 1. ORGANIZATIONAL STRUCTURE & MASTER DATA
  // =========================================================================
  {
    id: "ewm-org-structure",
    module: "EWM",
    category: "Organizational Structure",
    subcategory: "Warehouse Structure",
    title: "EWM Warehouse Structure & Hierarchy (/SCWM/IMG)",
    subtitle: "The multi-tier structural design mapping physical storage racks, activity zones, doors, and work centers in SAP EWM.",
    level: "BEGINNER",
    tags: ["EWM Org Structure", "Warehouse Number", "Storage Type", "Storage Section", "Storage Bin", "Activity Area", "Work Center", "/SCWM/LS01N"],
    relatedTopics: ["ewm-bins-sorting", "ewm-master-data", "ewm-scu-mapping", "ewm-intelligent-putaway"],
    ewmMonitorNode: "Storage Bins / Storage Types",
    configurationView: {
      prerequisites: ["ERP Plant and Storage Locations created (OX10 / OX09)", "Supply Chain Unit created (/SCMB/SCU)", "Business Partner Custodian created"],
      configObjects: ["Warehouse Number (/SCWM/T300)", "Storage Type (/SCWM/T331)", "Storage Section (/SCWM/T333)", "Storage Bin Structure (/SCWM/T337)"],
      determinationLogic: ["Warehouse Number mapped to ERP Plant + Storage Location combination in /SCWM/TMAPSTLOC.", "Storage Type determined via Putaway/Stock Removal Control strategies.", "Storage Section determined via Section Determination Indicator."],
      assignmentSteps: [
        "1. Define 4-character Warehouse Number in SPRO under Extended Warehouse Management -> Master Data.",
        "2. Assign Supply Chain Unit and Custodian Business Partner to Warehouse Number.",
        "3. Define Storage Types with roles (Standard, Staging, Work Center, Door, Production Supply).",
        "4. Subdivide Storage Types into Storage Sections."
      ],
      executionSteps: ["Create Storage Bins (/SCWM/LS01N or mass /SCWM/LS10)", "Perform Bin Sorting (/SCWM/SBST)", "View physical stock in /SCWM/MON"],
      testingProcedure: ["Create Inbound Delivery and verify Warehouse Number assignment.", "Verify bin search determination in /SCWM/TODET_I."],
      troubleshooting: ["Error: Warehouse Number not assigned to SCU -> Verify /SCMB/SCU and /SCWM/T300.", "Error: Storage Type role invalid -> Verify Storage Type Role in /SCWM/T331."]
    },
    pedagogy: {
      beginnerExplanation: "Think of an EWM warehouse like a massive airport. The airport code is the Warehouse Number. Terminals are Storage Types (High Rack, Bulk, Cold Vault). Gate concourses are Storage Sections, and the exact seat number is the Storage Bin coordinate. Boarding gates and luggage carousels are Doors and Work Centers.",
      formalDefinition: "The SAP Extended Warehouse Management (EWM) organizational structure models physical and operational warehouse elements. It comprises Warehouse Number (/SCWM/T300), Storage Type (/SCWM/T331), Storage Section (/SCWM/T333), Storage Bin (/SCWM/LAGP), Activity Area (/SCWM/TACTA), Work Center (/SCWM/TWORKC), Door, Staging Area, and Staging Area Group.",
      whyUsed: [
        "Enables hyper-precise bin-level inventory tracking and volumetric capacity management",
        "Drives automated Warehouse Task (WT) putaway and picking routing algorithms",
        "Segregates warehouse processes (picking, putaway, physical inventory, replenishment) via Activity Areas",
        "Optimizes resource travel distance, fork-truck pathing, and wave release"
      ],
      howItWorks: [
        "A 4-character EWM Warehouse Number (e.g. W001) is assigned to ERP Plant and Storage Locations via Supply Chain Unit (SCU) and Business System mapping.",
        "Storage Types define physical/logical characteristics (e.g. High Rack, Bulk, Pallet, Staging, Fast-Mover, Mezzanine).",
        "Storage Bins are master data objects with exact 3D coordinates (X, Y, Z), bin type, max weight, and volume limits.",
        "Activity Areas group bins for specific operations (e.g., PUTAWAY, PICKING, INVENTORY) and determine the sequence (Bin Sorting /SCWM/SBST) for warehouse workers."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define EWM Warehouse Number",
          description: "Define 4-character Warehouse Number in SPRO and assign Supply Chain Unit (SCU) and Custodian Business Partner.",
          sapAction: "SPRO Warehouse Definition",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T300"]
        },
        {
          stepNumber: 2,
          title: "Define Storage Types & Sections",
          description: "Configure Storage Types (Role: Standard, Staging, Work Center, Door, Yard) and subdivide into Storage Sections.",
          sapAction: "Storage Type Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T331", "/SCWM/T333"]
        },
        {
          stepNumber: 3,
          title: "Create Storage Bins Master Data",
          description: "Generate bins via template (/SCWM/LS10) or single creation (/SCWM/LS01N), defining coordinate strings, bin types, and max weight.",
          sapAction: "Bin Master Data creation",
          tcode: "/SCWM/LS01N",
          tablesUpdated: ["/SCWM/LAGP"]
        },
        {
          stepNumber: 4,
          title: "Define Activity Areas & Execute Bin Sorting",
          description: "Create Activity Areas, assign bin ranges, and run Bin Sorting (/SCWM/SBST) to generate picking sequence paths.",
          sapAction: "Activity Area & Sorting run",
          tcode: "/SCWM/SBST",
          tablesUpdated: ["/SCWM/TACTA", "/SCWM/LAGPS"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "EWM Org Unit", name: "Warehouse Number", description: "Top-level 4-character EWM facility identifier (Table /SCWM/T300)" },
        { objectType: "EWM Org Unit", name: "Storage Type", description: "Physical/spatial sub-area (e.g. 0010 High Rack, 0020 Bulk) (Table /SCWM/T331)" },
        { objectType: "EWM Org Unit", name: "Storage Section", description: "Subdivision of Storage Type (e.g. Fast moving section vs Slow moving) (Table /SCWM/T333)" },
        { objectType: "Master Data", name: "Storage Bin", description: "Lowest addressable physical location coordinate (Table /SCWM/LAGP)" },
        { objectType: "Logical Unit", name: "Activity Area", description: "Logical grouping of storage bins for specific warehouse activities (Table /SCWM/TACTA)" }
      ],
      relatedTcodes: ["/SCWM/LS01N", "/SCWM/LS02N", "/SCWM/LS03N", "/SCWM/LS10", "/SCWM/SBST", "/SCWM/MON", "/SCWM/SECT", "/SCWM/ACT"],
      fioriApps: [
        { appId: "F3124", appName: "Manage Storage Bins", fioriRole: "Warehouse Master Data Specialist" },
        { appId: "F2064", appName: "Warehouse Monitor", fioriRole: "Warehouse Supervisor" }
      ],
      relatedTables: [
        { tableName: "/SCWM/T300", description: "EWM Warehouse Numbers", keyFields: ["MANDT", "LGNUM"] },
        { tableName: "/SCWM/T331", description: "Storage Types", keyFields: ["MANDT", "LGNUM", "LGTYP"] },
        { tableName: "/SCWM/LAGP", description: "Storage Bins Master Table", keyFields: ["MANDT", "LGNUM", "LGTYP", "LGBER", "LGPLA"] },
        { tableName: "/SCWM/AQUA", description: "Available Physical Stock (Quant)", keyFields: ["MANDT", "LGNUM", "MATID", "LGTYP", "LGPLA", "HUIDENT"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Master Data -> Define Warehouse Number & Storage Types",
        criticalSettings: [
          "Storage Type Role (Standard Warehouse, Pick Point, Staging Area, Work Center, Door, Production Supply)",
          "Putaway & Stock Removal Control (Capacity check method, Mixed storage allowance, HU requirement)",
          "Availability Group assignment to Storage Types for ERP SLoc synchronization"
        ],
        mandatoryPrerequisites: ["Supply Chain Unit (SCU) created in /SCMB/SCU", "Business Partner for Warehouse Custodian"],
        commonPitfalls: [
          "Forgetting to execute Bin Sorting (/SCWM/SBST) after creating new bins, which causes Warehouse Tasks to fail with 'No Activity Area path found'.",
          "Mismatched Availability Groups between Storage Type and ERP Storage Location, causing stock desynchronization."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "DHL Supply Chain Multi-Client Hub (Chicago, IL)",
        scenario: "DHL configures a 500,000 sq ft facility in EWM. Warehouse Number: CH01. Storage Type 0010 (VNA Very Narrow Aisle, 15m high, 30,000 bins), Storage Type 0020 (Mezzanine Flow Racks for e-commerce eaches), Storage Type 0030 (Cold Vault 2-8C).",
        businessOutcome: "Automated RF putaway routes pharmaceutical items strictly to Cold Vault bins with capacity limits, while small electronics route to Mezzanine flow racks with pick-to-light sorting."
      },
      industryExamples: {
        automotive: "Production Supply Area (PSA) storage types located directly adjacent to assembly line robots.",
        aerospace: "Secure, high-value cage storage types with biometric access restrictions.",
        pharma: "Storage sections partitioned by clean-room classification and temperature validation zones.",
        food_beverage: "Drive-in bulk storage types for FIFO pallet stacks of canned beverages.",
        mechanical: "Heavy-floor open storage types with 10-ton crane lift capacity parameters.",
        electronics: "ESD-protected micro-bins with humidity control logging.",
        retail: "Dynamic forward pick-face storage types with automated replenishment from reserve high-racks.",
        cpg: "Double-deep automated high-bay warehouse (AS/RS) storage types.",
        logistics_3pl: "Activity Areas partitioned by client contract to prevent stock commingling.",
        construction: "Outdoor yard GPS-coordinate based storage bins for structural steel.",
        industrial: "Cantilever rack storage types for oversized pipes and tubing."
      },
      scenarioQuestion: {
        prompt: "A warehouse supervisor creates 500 new storage bins in Storage Type 0010 using /SCWM/LS10. However, when outbound picking warehouse tasks are created, the system leaves the bin sorting sequence random instead of following the optimized aisle route. Why?",
        options: [
          "The supervisor forgot to execute Bin Sorting transaction /SCWM/SBST for the corresponding Activity Area and Warehouse Number.",
          "The bins are missing gross weight capacity.",
          "The material master does not have a warehouse product view.",
          "The warehouse order creation rule was deleted."
        ],
        correctIndex: 0,
        explanation: "In SAP EWM, creating bins creates the physical master record (/SCWM/LAGP). But for the system to know the optimal travel route during picking or putaway, the bins must be sorted within their Activity Area using transaction /SCWM/SBST (Sort Storage Bins). Without this, sorting table /SCWM/LAGPS is empty."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: No storage bin found for putaway (/SCWM/UI_TODET 002)",
          errorCode: "/SCWM/UI_TODET002",
          rootCause: "Storage Type Search Sequence or Storage Section determination failed, or candidate bins exceed max weight/volume capacity.",
          solutionSteps: [
            "Check Warehouse Product (/SCWM/MAT1) Putaway Control Indicator (PACI).",
            "Verify Storage Type Search Sequence in /SCWM/IMG for PACI + Warehouse Process Type.",
            "Verify bin capacity limits and check if candidate bins in /SCWM/LAGP are occupied or blocked."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What is the difference between a Storage Type and a Storage Section in SAP EWM?",
          keyPoints: ["Storage Type is a major physical/logical warehouse zone; Storage Section is a subdivision based on operational criteria like fast/slow moving or weight"],
          sampleAnswer: "A Storage Type is a primary physical or logical subdivision of an EWM warehouse with distinct technological and operational characteristics (e.g. High-Bay Rack, Bulk Area, Staging Bay). A Storage Section is a granular subdivision within a single Storage Type used for bin determination."
        },
        {
          tier: "Intermediate",
          question: "What is an Activity Area in EWM and how does it differ from a Storage Type?",
          keyPoints: ["Activity Area is a logical grouping of bins for specific operations (Picking, Putaway, Physical Inventory)", "Enables bin sorting and work package assignment independent of physical storage type boundaries"],
          sampleAnswer: "A Storage Type represents physical infrastructure, whereas an Activity Area is an operational, logical construct used to group bins for specific warehouse activities (e.g. Activity Area 'PICK' vs 'PUTAWAY' vs 'INVENTORY'). A single Activity Area can span across multiple Storage Types."
        },
        {
          tier: "Consultant",
          question: "How do Availability Groups in EWM link to ERP Storage Locations, and how does this govern Non-Valuated vs Valuated stock synchronization?",
          keyPoints: ["Availability Group (e.g. 001 vs 002) mapped to ERP Storage Location (e.g. ROD vs AFS)", "Stock Type in EWM (F1, F2, Q3, B5) derived from Availability Group"],
          sampleAnswer: "In EWM, stock is held under EWM Stock Types (e.g. F1 'Unrestricted in Putaway / ROD' vs F2 'Unrestricted in Warehouse / AFS'). Each Storage Type is assigned an Availability Group. When a Warehouse Task confirms putaway from Door (001) into High-Rack (002), EWM automatically triggers a Posting Change (Transfer Posting 311) in S/4HANA via qRFC to synchronize financial and MRP availability."
        }
      ],
      consultantChallenge: {
        title: "Multi-Temperature Cold Chain Warehouse Architecture",
        clientRequirement: "A global biopharmaceutical distributor is designing an EWM greenfield warehouse with 3 distinct temperature zones: Ultra-Deep Freeze (-80C), Cold Vault (+2C to +8C), and Ambient (+15C to +25C). Stock must never be routed to the wrong zone, and putaway must enforce strict weight and cubic volume capacity checks.",
        architecturalOptions: [
          {
            optionName: "Option A: Single Storage Type with temperature codes in bin descriptions",
            pros: ["Fewer storage types in SPRO"],
            cons: ["Zero automated putaway validation", "High risk of $2M vaccine spoilage due to human routing error", "Audit non-compliance with FDA 21 CFR"],
            recommendationLevel: "Not Advised"
          },
          {
            optionName: "Option B: 3 Dedicated Storage Types with Putaway Control Indicators (PACI) and Storage Type Search Sequences",
            pros: ["100% automated fail-safe bin determination", "Enforces volumetric capacity checks in /SCWM/T331", "Full FDA audit compliance and validation"],
            cons: ["Requires maintaining PACI on all product masters (/SCWM/MAT1)"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Create 3 Storage Types: 0080 (-80C Ultra), 0002 (+2 to +8C Vault), 0020 (Ambient). Define PACIs: PACI_UDF, PACI_CLD, PACI_AMB. Configure Storage Type Search Sequences in SPRO so PACI_CLD only searches Storage Type 0002. Activate Capacity Check Method 3 on Storage Types."
      }
    }
  },
  {
    id: "ewm-bins-sorting",
    module: "EWM",
    category: "Organizational Structure",
    subcategory: "Storage Bins & Sorting",
    title: "Storage Bins, Activity Areas & Bin Sorting (/SCWM/LS01N / /SCWM/SBST)",
    subtitle: "Coordinate structure definition, mass generation, activity area assignment, and travel-path sorting in SAP EWM.",
    level: "INTERMEDIATE",
    tags: ["Storage Bins", "Bin Coordinates", "Activity Area", "Bin Sorting", "/SCWM/LS10", "/SCWM/SBST", "/SCWM/LAGPS"],
    relatedTopics: ["ewm-org-structure", "ewm-intelligent-putaway", "ewm-wocr-advanced-outbound"],
    ewmMonitorNode: "Storage Bins / Activity Areas",
    configurationView: {
      prerequisites: ["Warehouse Number and Storage Types created", "Activity Areas defined in SPRO"],
      configObjects: ["Storage Bin Structure (/SCWM/T337)", "Activity Area (/SCWM/TACTA)", "Bin Sorting Table (/SCWM/LAGPS)"],
      determinationLogic: ["Activity Area assigned to Storage Bins via bin coordinate ranges in /SCWM/SECT.", "Bin Sorting calculates sequential path numbers for each bin per Activity Area and Activity."],
      assignmentSteps: [
        "1. Define Storage Bin Structure in SPRO (Aisle, Stack, Level template).",
        "2. Mass generate bins in /SCWM/LS10 or individual creation in /SCWM/LS01N.",
        "3. Assign Storage Bins to Activity Area in /SCWM/SECT.",
        "4. Execute Sort Storage Bins transaction /SCWM/SBST for Activity Areas."
      ],
      executionSteps: ["Verify sorted entries in /SCWM/LAGPS table", "Create Warehouse Task and verify route sequence"],
      testingProcedure: ["Execute /SCWM/SBST in test mode, check sequence log.", "Simulate Warehouse Order creation and check task sorting order."],
      troubleshooting: ["Error: Bin not sorted -> Execute /SCWM/SBST for specific Activity Area and Activity (e.g. PICK/PTWY)."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine GPS street navigation for a warehouse forklift. Without street names and numbers, the driver wanders randomly. Storage Bins are exact street addresses (Aisle 02, Rack 04, Level 01). Bin Sorting is the GPS algorithm that maps the shortest zig-zag driving path through aisles so the driver never backtracks!",
      formalDefinition: "Storage Bins (/SCWM/LAGP) are the lowest physical spatial units where products and handling units are stored. Activity Areas (/SCWM/TACTA) group bins logically for operations. Bin Sorting (/SCWM/SBST) populates table /SCWM/LAGPS with sequence numbers determining optimal worker routing.",
      whyUsed: [
        "Enables 3D spatial addressing across Aisles, Stacks, and Levels",
        "Reduces worker travel distance by up to 50% through optimized zig-zag or one-way routing",
        "Feeds Warehouse Order Creation Rules (WOCR) with sorted task sequences",
        "Governs physical inventory count route sequencing"
      ],
      howItWorks: [
        "Bin Coordinate templates (e.g. AA-SS-LL where AA=Aisle, SS=Stack, LL=Level) are configured in /SCWM/LS10.",
        "Bins inherit attributes: Bin Type, Max Weight, Max Volume, Max Capacity, Verification Code.",
        "Transaction /SCWM/SECT assigns coordinate ranges to Activity Areas.",
        "Transaction /SCWM/SBST sorts bins based on Aisle Direction (One-Way, Alternate, Zig-Zag) and updates /SCWM/LAGPS."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Coordinate Template in /SCWM/LS10",
          description: "Define Structure (e.g. Aisle 01-20, Stack 01-50, Level 01-05).",
          sapAction: "Template definition",
          tcode: "/SCWM/LS10",
          tablesUpdated: ["/SCWM/T337"]
        },
        {
          stepNumber: 2,
          title: "Generate Storage Bins Master Records",
          description: "Execute mass creation. System creates 5,000 bins in /SCWM/LAGP with coordinate keys.",
          sapAction: "Mass Bin Creation",
          tcode: "/SCWM/LS10",
          tablesUpdated: ["/SCWM/LAGP"]
        },
        {
          stepNumber: 3,
          title: "Assign Bins to Activity Area",
          description: "Map bin ranges to Activity Area 'PICK' and 'PUTAWAY'.",
          sapAction: "Activity Area Mapping",
          tcode: "/SCWM/SECT",
          tablesUpdated: ["/SCWM/TACTA"]
        },
        {
          stepNumber: 4,
          title: "Execute Bin Sorting (/SCWM/SBST)",
          description: "Run /SCWM/SBST to calculate optimal travel paths and populate /SCWM/LAGPS.",
          sapAction: "Bin Sorting Execution",
          tcode: "/SCWM/SBST",
          tablesUpdated: ["/SCWM/LAGPS"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Storage Bin", description: "Addressable rack coordinate (Table /SCWM/LAGP)" },
        { objectType: "Org Unit", name: "Activity Area", description: "Logical work zone grouping bins (Table /SCWM/TACTA)" },
        { objectType: "System Table", name: "Bin Sort Sequence Table", description: "Stores sorted travel sequence (Table /SCWM/LAGPS)" }
      ],
      relatedTcodes: ["/SCWM/LS01N", "/SCWM/LS02N", "/SCWM/LS10", "/SCWM/SBST", "/SCWM/SECT", "/SCWM/MON"],
      fioriApps: [{ appId: "F3124", appName: "Manage Storage Bins", fioriRole: "Warehouse Master Data Lead" }],
      relatedTables: [
        { tableName: "/SCWM/LAGP", description: "Storage Bins", keyFields: ["MANDT", "LGNUM", "LGTYP", "LGBER", "LGPLA"] },
        { tableName: "/SCWM/LAGPS", description: "Sorted Storage Bins per Activity Area", keyFields: ["MANDT", "LGNUM", "ACT_AREA", "ACT_TYPE", "LGPLA"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Master Data -> Storage Bins -> Define Storage Bin Structures",
        criticalSettings: ["Bin Type Assignment", "Max Weight & Volume per Bin", "Activity Area sorting parameters (Alternating vs One-way)"],
        mandatoryPrerequisites: ["Storage Types and Storage Sections configured in /SCWM/IMG"],
        commonPitfalls: ["Creating bins manually without assigning them to an Activity Area, rendering them invisible to WOCR picking runs."]
      },
      realWorldBusinessExample: {
        companyContext: "Nike Mega DC (Memphis, TN)",
        scenario: "Nike operates 120 aisles with 150,000 bins. Bin sorting configures snake/zig-zag routing for footwear picking.",
        businessOutcome: "Order pickers complete 40 picks/hour compared to 22 picks/hour under unsorted random routing."
      },
      industryExamples: {
        automotive: "High-bay engine block bins mapped with crane access types.",
        aerospace: "High-security lockbox bins requiring verification check digits.",
        pharma: "Clean-room bins categorized by HEPA airflow rating.",
        food_beverage: "Floor pallet drop bins with deep gravity roller channels.",
        mechanical: "Heavy-floor bins with max weight capacity of 20,000 KG.",
        electronics: "Anti-static micro-bins in vertical automated carousel.",
        retail: "Forward pick-face bins with pick-to-light LED address sensors.",
        cpg: "Double-deep high-rack bins for full pallet slip-sheet loads.",
        logistics_3pl: "Client-partitioned bin ranges segregated by contract code.",
        construction: "Outdoor yard GPS-coordinate based storage bins.",
        industrial: "Cantilever rack arm bins for 12-meter steel beams."
      },
      scenarioQuestion: {
        prompt: "Why must Bin Sorting (/SCWM/SBST) be re-executed whenever new storage bins are added to an existing Storage Type?",
        options: [
          "Because the new bins exist in /SCWM/LAGP but have no sequence number in table /SCWM/LAGPS, causing WTs for these bins to be unsequenced.",
          "Because ERP needs to know the storage bin coordinates.",
          "Because the purchase order will be blocked.",
          "Because physical inventory will delete the bins."
        ],
        correctIndex: 0,
        explanation: "Creating bins only updates the master table /SCWM/LAGP. Sorting (/SCWM/SBST) is required to calculate their position in the Activity Area path (/SCWM/LAGPS)."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: No sorting exists for Activity Area PICK (Message /SCWM/WOCR 023)",
          errorCode: "/SCWM/WOCR023",
          rootCause: "Table /SCWM/LAGPS is missing entries for Activity Area and Activity combination.",
          solutionSteps: [
            "Open transaction /SCWM/SBST.",
            "Enter Warehouse Number and Activity Area.",
            "Select Activity 'PICK' and click Execute.",
            "Verify log confirms entries created in /SCWM/LAGPS."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What is the purpose of the Verification Field / Check Digit on a Storage Bin in EWM?",
          keyPoints: ["Scanned via RF to verify operator is at correct bin without scanning full coordinate", "Prevents picking from adjacent wrong shelf"],
          sampleAnswer: "A Verification Code (Check Digit) is an encoded string (e.g. 3 digits) on the bin label. When an RF operator arrives at a bin, EWM prompts for the verification code. Scanning or typing this confirms physical presence at the correct bin, preventing picks from incorrect adjacent bins."
        }
      ],
      consultantChallenge: {
        title: "Optimizing High-Volume E-Commerce Pick Paths",
        clientRequirement: "An e-commerce retailer has 50 parallel aisles. Pickers currently walk down one aisle, exit, walk all the way back around, and enter the next aisle, doubling walk time.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure Alternate / Snake (Zig-Zag) Bin Sorting in /SCWM/SBST",
            pros: ["Picker enters Aisle 1 ascending, crosses over, and traverses Aisle 2 descending", "Eliminates empty return walk time", "Increases pick rate by 35%"],
            cons: ["Aisles must have sufficient width for two-way cart passing"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure SPRO -> Master Data -> Storage Bins -> Define Sort Sequence for Activity Areas with 'Alternating' path direction. Run /SCWM/SBST."
      }
    }
  },
  {
    id: "ewm-master-data",
    module: "EWM",
    category: "Master Data",
    subcategory: "Product & Business Partner",
    title: "Warehouse Product Master & Business Partner (/SCWM/MAT1 / BP)",
    subtitle: "Warehouse-specific product views, Putaway/Stock Removal Control Indicators, Packaging data, and Business Partner roles in EWM.",
    level: "BEGINNER",
    tags: ["Warehouse Product", "Master Data", "/SCWM/MAT1", "BP", "PACI", "SRCI", "Party Entitled to Dispose", "Owner"],
    relatedTopics: ["ewm-scu-mapping", "ewm-intelligent-putaway", "ewm-hu-management"],
    ewmMonitorNode: "Product / Warehouse Product",
    configurationView: {
      prerequisites: ["Material Master created in ERP (MM01)", "Business Partners created in BP"],
      configObjects: ["Putaway Control Indicator (PACI)", "Stock Removal Control Indicator (SRCI)", "Party Entitled to Dispose (PED)"],
      determinationLogic: ["PACI in /SCWM/MAT1 determines Storage Type Search Sequence during putaway.", "SRCI determines picking search sequence.", "Owner and PED govern legal ownership."],
      assignmentSteps: [
        "1. Create Business Partner in transaction BP with roles CRM004 (Supply Chain Unit) and BBP000 (Vendor/Customer).",
        "2. Replicate Material from ERP via Core Interface (CIF) or CDS replication.",
        "3. Maintain Warehouse Data in /SCWM/MAT1 (PACI, SRCI, Process Type Determination Indicator, Preferred UoM)."
      ],
      executionSteps: ["Verify /SCWM/MAT1 record", "Check Product view in /SCWM/MON"],
      testingProcedure: ["Test putaway WT creation and confirm PACI is read."],
      troubleshooting: ["Error: Product not maintained in warehouse -> Execute /SCWM/MAT1 to extend warehouse view."]
    },
    pedagogy: {
      beginnerExplanation: "While the general ERP Material Master knows the product price and purchasing rules, the EWM Warehouse Product Master knows how to handle the item on the shop floor: Does it need a forklift? Can it be stacked 5 high? Which high-rack aisle does it belong in? It also tracks who owns the inventory (Owner vs Party Entitled to Dispose).",
      formalDefinition: "The EWM Warehouse Product Master (/SCWM/MAT1) extends the general product master with warehouse-specific execution data: Putaway Control Indicators (PACI), Stock Removal Control Indicators (SRCI), Process Type Determination Indicators (PTDI), Handling Unit Types, and Cycle Counting physical inventory indicators.",
      whyUsed: [
        "Governs automated putaway and picking strategy execution",
        "Differentiates legal stock Owner (Owner) from operational disposer (Party Entitled to Dispose - PED)",
        "Enables Handling Unit calculation via Packaging Specifications",
        "Defines slotting, replenishment thresholds, and cycle counting intervals"
      ],
      howItWorks: [
        "Material is replicated from ERP (MARA/MARC) into EWM (/SAPAPO/MATKEY).",
        "In /SCWM/MAT1, warehouse specialist maintains Warehouse-specific data for Warehouse Number (e.g. W001) and Party Entitled to Dispose (BP 1000).",
        "During delivery processing, EWM reads /SCWM/MAT1 attributes to derive Warehouse Process Type and Search Sequences."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Extend Warehouse Product in /SCWM/MAT1",
          description: "Enter Product, Warehouse Number, and Party Entitled to Dispose.",
          sapAction: "Launch /SCWM/MAT1",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SAPAPO/MATKEY", "/SCWM/MAT1"]
        },
        {
          stepNumber: 2,
          title: "Maintain Putaway / Stock Removal Indicators",
          description: "Assign PACI (e.g. HIGH_RACK) and SRCI (e.g. FIFO_STD).",
          sapAction: "Maintain Strategy Indicators",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SCWM/MAT1"]
        },
        {
          stepNumber: 3,
          title: "Assign Packaging & Slotting Parameters",
          description: "Define Preferred UoM, Handling Unit Type, and Max Storage Period.",
          sapAction: "Save Warehouse Product",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SCWM/MAT1"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Warehouse Product", description: "Warehouse-specific attributes (Table /SCWM/MAT1)" },
        { objectType: "Master Data", name: "Business Partner", description: "Legal entity for Owner & Custodian (Table BUT000)" }
      ],
      relatedTcodes: ["/SCWM/MAT1", "BP", "/SCWM/MASSMAT", "/SCWM/MON"],
      fioriApps: [{ appId: "F1602", appName: "Manage Product Master Data", fioriRole: "Master Data Lead" }],
      relatedTables: [
        { tableName: "/SAPAPO/MATKEY", description: "Product Master Global Table", keyFields: ["MANDT", "MATID"] },
        { tableName: "/SCWM/MAT1", description: "Warehouse Product Views", keyFields: ["MANDT", "MATID", "LGNUM", "ENTITLED"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Master Data -> Product",
        criticalSettings: ["PACI / SRCI definitions", "Party Entitled to Dispose determination rules in /SCWM/TMAPSTLOC"],
        mandatoryPrerequisites: ["Business Partner Custodian and Plant mapped in SPRO"],
        commonPitfalls: ["Leaving Party Entitled to Dispose unassigned in /SCWM/MAT1, causing delivery replication failures."]
      },
      realWorldBusinessExample: {
        companyContext: "L'Oréal Cosmetics Hub",
        scenario: "L'Oréal maintains 12,000 beauty SKUs. /SCWM/MAT1 maintains PACI 'TEMP_CONTROLLED' for organic serums and SRCI 'FEFO' for batch-managed perfumes.",
        businessOutcome: "Automated FIFO/FEFO picking ensures zero expired shipments reach retail stores."
      },
      industryExamples: {
        automotive: "PACI assigned for oversized engine cradles vs small fastener boxes.",
        aerospace: "Serialized parts linked to mandatory serial number profile.",
        pharma: "Storage condition indicators enforcing 2-8C cold vault putaway.",
        food_beverage: "Catch weight product profile maintained for dual-unit billing.",
        mechanical: "High gross weight flag enforcing crane lifting resource.",
        electronics: "Moisture Sensitivity Level (MSL) indicator in product master.",
        retail: "Variant article mapping to parent generic product.",
        cpg: "Case layer palletization parameters defined in packaging view.",
        logistics_3pl: "Party Entitled to Dispose mapped distinctly per client contract.",
        construction: "Project stock (Q) indicator enabled for heavy steel.",
        industrial: "KMAT configurable product components mapped to BOM."
      },
      scenarioQuestion: {
        prompt: "What is the difference between 'Owner' and 'Party Entitled to Dispose' in SAP EWM Master Data?",
        options: [
          "Owner is the legal financial owner of the stock; Party Entitled to Dispose is the operational plant authorized to manage and consume the stock.",
          "They are identical terms with no system distinction.",
          "Owner is the forklift driver; PED is the warehouse manager.",
          "Owner is the customer; PED is the supplier."
        ],
        correctIndex: 0,
        explanation: "In EWM (especially 3PL scenarios), the Owner is the commercial legal entity that owns the inventory. The Party Entitled to Dispose (PED) represents the ERP Plant that has operational rights to allocate, move, and consume the stock."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Product MAT-100 does not exist in warehouse W001 (/SCWM/DELIVERY 045)",
          errorCode: "/SCWM/DELIVERY045",
          rootCause: "Material exists in ERP but warehouse view /SCWM/MAT1 has not been created for Warehouse W001.",
          solutionSteps: [
            "Open transaction /SCWM/MAT1.",
            "Enter Product, Warehouse Number W001, and PED.",
            "Maintain PACI/SRCI and click Save."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "How does the Process Type Determination Indicator (PTDI) in /SCWM/MAT1 control warehouse execution?",
          keyPoints: ["PTDI + Document Type + Item Type determines the Warehouse Process Type (WPT)"],
          sampleAnswer: "The Process Type Determination Indicator (PTDI) in /SCWM/MAT1 classifies the product (e.g. Standard, Dangerous Goods, High-Value). In customizing (/SCWM/TWPT_DET), EWM combines the PTDI with the Delivery Document Type and Item Type to determine the exact Warehouse Process Type (e.g. 1010 Putaway vs 1015 Hazardous Putaway)."
        }
      ],
      consultantChallenge: {
        title: "Mass Migration of 100,000 Warehouse Products",
        clientRequirement: "During S/4HANA Go-Live, client must create 100,000 /SCWM/MAT1 records across 4 warehouses with custom PACI, SRCI, and Cycle Counting indicators within a 4-hour cutover window.",
        architecturalOptions: [
          {
            optionName: "Option A: Mass Maintenance Tool (/SCWM/MASSMAT) or BAPI_MAT_MAINTAIN",
            pros: ["High throughput parallelized batch execution", "Full error logging in SLG1", "Zero manual data entry"],
            cons: ["Requires pre-validated upload flat file"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Utilize SAP S/4HANA Migration Cockpit (LTMC/Migrate Your Data) with staging tables or /SCWM/MASSMAT. Execute in 8 parallel background jobs."
      }
    }
  },
  {
    id: "ewm-scu-mapping",
    module: "EWM",
    category: "Master Data",
    subcategory: "Supply Chain Unit",
    title: "Supply Chain Unit (SCU) & Business System Mapping (/SCMB/SCU)",
    subtitle: "Geographical location modeling, business system mapping, custodian assignment, and timezone synchronization in SAP EWM.",
    level: "INTERMEDIATE",
    tags: ["Supply Chain Unit", "SCU", "/SCMB/SCU", "Business System", "Custodian", "Timezone", "ERP Integration"],
    relatedTopics: ["ewm-org-structure", "ewm-master-data", "ewm-inbound-fundamentals"],
    ewmMonitorNode: "Master Data / Supply Chain Unit",
    configurationView: {
      prerequisites: ["Logical Systems defined in BD54", "RFC destinations configured in SM59"],
      configObjects: ["Supply Chain Unit (/SCMB/SCU)", "Business System (/SCMB/TBUSSYS)", "Warehouse to SCU Mapping (/SCWM/T300)"],
      determinationLogic: ["Warehouse Number inherits geographical coordinates and timezone from assigned SCU.", "ERP Plant mapped to SCU in /SCMB/SCUMAP."],
      assignmentSteps: [
        "1. Create SCU in /SCMB/SCU with business type 'Warehouse' or 'Plant'.",
        "2. Maintain address, geographical coordinates, and timezone.",
        "3. Assign Business Partner to SCU.",
        "4. Assign SCU to Warehouse Number in /SCWM/T300."
      ],
      executionSteps: ["Verify SCU hierarchy in /SCMB/SCU", "Test delivery replication from ERP Plant mapped to SCU"],
      testingProcedure: ["Create Inbound Delivery in ERP and verify SCU determination in EWM."],
      troubleshooting: ["Error: SCU not assigned to warehouse -> Check /SCWM/T300.", "Error: Timezone mismatch -> Synchronize STZAC in ERP and EWM."]
    },
    pedagogy: {
      beginnerExplanation: "A Supply Chain Unit (SCU) is the real-world physical location anchor in SAP EWM. It represents the physical GPS coordinates, street address, and timezone of a factory or warehouse, allowing the system to calculate travel times, truck appointments, and operating calendars.",
      formalDefinition: "The Supply Chain Unit (SCU), managed via transaction /SCMB/SCU, is an organizational master data entity representing a physical location. It links EWM Warehouse Numbers to ERP Plants, Shipping Points, and Customers, providing address data, geographical coordinates, timezones, and business partner relationships.",
      whyUsed: [
        "Anchors physical location coordinates for distance and travel time calculation",
        "Synchronizes timezones across global ERP and EWM systems",
        "Enables integration between EWM, Transportation Management (TM), and ERP Logistics",
        "Mandatory prerequisite for defining an EWM Warehouse Number"
      ],
      howItWorks: [
        "An SCU is created with a unique code (e.g. SCU_PLANT1000).",
        "It is assigned business roles (e.g. Warehouse, Plant, Shipping Point, Vendor).",
        "The SCU is assigned to the Warehouse Number in /SCWM/IMG, establishing the facility's operational calendar and timezone."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Create Supply Chain Unit in /SCMB/SCU",
          description: "Enter SCU Code, Description, and select Type (Location).",
          sapAction: "SCU Creation",
          tcode: "/SCMB/SCU",
          tablesUpdated: ["/SCMB/TOBJCAT"]
        },
        {
          stepNumber: 2,
          title: "Maintain Address & Timezone",
          description: "Enter street address, postal code, country, and Timezone (e.g. EST / CET).",
          sapAction: "Address Maintenance",
          tcode: "/SCMB/SCU",
          tablesUpdated: ["ADRC"]
        },
        {
          stepNumber: 3,
          title: "Assign SCU to Warehouse Number",
          description: "Assign SCU in /SCWM/IMG -> Master Data -> Define Warehouse Number.",
          sapAction: "Warehouse Assignment",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T300"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Supply Chain Unit", description: "Physical location master (Table /SCMB/TOBJCAT)" },
        { objectType: "Org Unit", name: "Warehouse Number", description: "EWM Facility ID (Table /SCWM/T300)" }
      ],
      relatedTcodes: ["/SCMB/SCU", "/SCMB/SCUMAP", "/SCWM/IMG", "SM59"],
      fioriApps: [{ appId: "F1595", appName: "Display Organizational Structure", fioriRole: "Enterprise Architect" }],
      relatedTables: [
        { tableName: "/SCMB/TOBJCAT", description: "Supply Chain Unit Master", keyFields: ["MANDT", "LOCID"] },
        { tableName: "/SCWM/T300", description: "Warehouse Numbers", keyFields: ["MANDT", "LGNUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Basis -> Master Data -> Location -> Define Supply Chain Unit",
        criticalSettings: ["SCU Type (Warehouse / Plant)", "Timezone alignment (TZONE)", "Factory Calendar assignment"],
        mandatoryPrerequisites: ["Business Partners created in BP transaction"],
        commonPitfalls: ["Creating an SCU with incorrect timezone, causing delivery schedule line calculation errors and premature wave release."]
      },
      realWorldBusinessExample: {
        companyContext: "FedEx Global Logistics Hub",
        scenario: "FedEx defines SCU_MEMPHIS with Timezone CST and Operating Calendar US_FEDEX. EWM Warehouse W001 is mapped to this SCU.",
        businessOutcome: "All wave releases, dock appointments, and PGI timestamps automatically align to central standard time without UTC conversion drift."
      },
      industryExamples: {
        automotive: "SCU mapped to assembly plant gate for truck check-in.",
        aerospace: "SCU with FAA certified facility coordinates.",
        pharma: "SCU with DEA and FDA licensed facility address.",
        food_beverage: "SCU linking temperature logger upload stations.",
        mechanical: "SCU linking heavy crane loading bays.",
        electronics: "SCU linking high-security bonded yard.",
        retail: "SCU mapping regional DC to 500 retail store locations.",
        cpg: "SCU linking co-manufacturing plant.",
        logistics_3pl: "SCUs partitioned per tenant client.",
        construction: "Temporary jobsite SCU created for mega-project.",
        industrial: "Central distribution hub SCU."
      },
      scenarioQuestion: {
        prompt: "Why does an EWM Inbound Delivery fail to replicate when the ERP Plant has no mapping in table /SCWM/TMAPSTLOC or /SCMB/SCUMAP?",
        options: [
          "Because EWM cannot determine which Warehouse Number and Supply Chain Unit correspond to the ERP Plant and Storage Location.",
          "Because the Purchase Order price was missing.",
          "Because the material has no stock.",
          "Because the printer is offline."
        ],
        correctIndex: 0,
        explanation: "Table /SCWM/TMAPSTLOC maps ERP Plant + Storage Location to EWM Warehouse Number and Availability Group. Without this mapping, delivery replication fails in qRFC."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: No Supply Chain Unit found for Warehouse W001",
          errorCode: "SCU-ERR-01",
          rootCause: "Warehouse Number definition in /SCWM/T300 is missing assigned SCU.",
          solutionSteps: [
            "Open SPRO -> EWM -> Master Data -> Define Warehouse Number.",
            "Select Warehouse W001.",
            "Enter valid SCU in field 'Supply Chain Unit' and Save."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What is the relationship between an SCU, a Business Partner, and a Warehouse Number in EWM?",
          keyPoints: ["SCU defines physical location; BP defines legal entity / role; Warehouse Number is the operational EWM facility linked to both"],
          sampleAnswer: "The Supply Chain Unit (SCU) represents the physical address and timezone of the site. A Business Partner (BP) represents the legal entity (Custodian/Owner). The Warehouse Number in /SCWM/T300 links to the SCU for location/time and to the BP as Custodian."
        }
      ],
      consultantChallenge: {
        title: "Cross-Timezone Global Hub Architecture",
        clientRequirement: "A single global S/4HANA instance hosts plants across Tokyo (UTC+9), Frankfurt (UTC+1), and New York (UTC-5). Wave creation and shipping must reflect local warehouse working hours.",
        architecturalOptions: [
          {
            optionName: "Option A: Maintain dedicated SCUs with local Timezones and Factory Calendars for each Warehouse Number",
            pros: ["100% accurate local scheduling", "Eliminates timezone conversion errors in wave planning", "Supports local holiday calendars"],
            cons: ["Requires careful maintenance of SCU calendars"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Create SCU_TYO (JST), SCU_FRA (CET), SCU_NYC (EST) in /SCMB/SCU. Assign each to its respective Warehouse Number in /SCWM/T300."
      }
    }
  },

  // =========================================================================
  // 3. INBOUND PROCESSING & INTELLIGENT PUTAWAY
  // =========================================================================
  {
    id: "ewm-inbound-fundamentals",
    module: "EWM",
    category: "Inbound",
    subcategory: "Inbound Fundamentals",
    title: "Inbound Fundamentals & Delivery Processing (/SCWM/PRDI)",
    subtitle: "Complete inbound lifecycle from ERP Purchase Order to Inbound Delivery replication, Goods Receipt, Warehouse Request, and WT/WO Creation.",
    level: "BEGINNER",
    tags: ["Inbound Fundamentals", "Purchase Order", "Inbound Delivery", "Goods Receipt", "Warehouse Request", "Warehouse Task", "Warehouse Order", "/SCWM/PRDI"],
    relatedTopics: ["ewm-intelligent-putaway", "ewm-posc-inbound", "ewm-hu-management", "ewm-queue-management"],
    ewmMonitorNode: "Inbound Deliveries / Inbound Delivery Orders",
    processDiagram: {
      title: "Complete Inbound Procurement & EWM Execution Flow",
      nodes: [
        { id: "1", label: "Purchase Order (ERP)", system: "MM", tcode: "ME21N", description: "Purchasing contract created" },
        { id: "2", label: "Inbound Delivery (ERP)", system: "MM", tcode: "VL31N", description: "Supplier ASN ingested" },
        { id: "3", label: "qRFC Delivery Replication", system: "Integration", tcode: "SMQ2", description: "Replicated to EWM" },
        { id: "4", label: "Inbound Delivery in EWM", system: "EWM", tcode: "/SCWM/PRDI", description: "Warehouse Request active" },
        { id: "5", label: "Post Goods Receipt", system: "EWM", tcode: "/SCWM/PRDI / RF", description: "Stock quant created at dock" },
        { id: "6", label: "Warehouse Task Creation", system: "EWM", tcode: "/SCWM/TODET_I", description: "Putaway WT calculated" },
        { id: "7", label: "Warehouse Order Bundling", system: "EWM", tcode: "/SCWM/WOCR", description: "WOCR bundles tasks to WO" },
        { id: "8", label: "Putaway Confirmation", system: "EWM", tcode: "/SCWM/RFUI", description: "Final bin confirmed" }
      ]
    },
    configurationView: {
      prerequisites: ["ERP Integration configured via qRFC", "Document Types mapped between ERP (EL) and EWM (INB / PDI)", "Warehouse Process Type 1010 defined"],
      configObjects: ["EWM Delivery Document Type (/SCDL/TDETDOC)", "Warehouse Process Type (/SCWM/TWPT)", "Control for Inbound Delivery (/SCWM/TINB)"],
      determinationLogic: ["ERP Delivery Type 'EL' mapped to EWM Delivery Document Type 'INB' and Item Type 'INBI'.", "Warehouse Process Type 1010 determined based on Delivery Item Type + Process Type Determination Indicator."],
      assignmentSteps: [
        "1. Map ERP Document Type 'EL' to EWM Document Type 'INB' in SPRO Interfaces -> ERP Integration.",
        "2. Define Warehouse Process Type 1010 for Inbound Putaway.",
        "3. Configure PPF Actions for auto-task creation upon Goods Receipt."
      ],
      executionSteps: ["Create Inbound Delivery in VL31N", "Open /SCWM/PRDI in EWM", "Post GR", "Create WTs and confirm via RF"],
      testingProcedure: ["End-to-end testing from ME21N to /SCWM/PRDI to /SCWM/RFUI.", "Check /SCWM/MON delivery status."],
      troubleshooting: ["Error: Delivery not replicated -> Check SMQ2 queue in EWM.", "Error: WPT not determined -> Check /SCWM/TWPT_DET."]
    },
    pedagogy: {
      beginnerExplanation: "When a supplier truck arrives at the warehouse, the warehouse needs an official receiving document to check what was promised versus what arrived. The ERP Inbound Delivery becomes an EWM Warehouse Request. Goods Receipt logs the boxes on the dock, and Warehouse Tasks tell the forklift driver exactly which shelf to put each box on.",
      formalDefinition: "Inbound Processing in SAP EWM handles the receipt of goods into the warehouse. It encompasses the replication of ERP Inbound Deliveries (/SCDL/DB_PROCH_I), posting Goods Receipt (/SCWM/PRDI), creating Warehouse Tasks (/SCWM/ORDIM_O), and bundling them into Warehouse Orders (/SCWM/WHO) for RF-guided putaway execution.",
      whyUsed: [
        "Provides end-to-end traceability of incoming vendor shipments against Purchase Orders",
        "Enables Advanced Shipping Notification (ASN) verification and Handling Unit tracking",
        "Automates putaway strategy calculation to maximize warehouse storage utilization",
        "Updates ERP inventory and financial accounts synchronously via qRFC"
      ],
      howItWorks: [
        "Supplier ASN triggers Inbound Delivery creation in ERP (VL31N / EDI 856).",
        "Delivery replicates to EWM via qRFC function module /SCWM/INB_DLV_SAVEREPLICA.",
        "EWM generates an Inbound Delivery Document (ID / PRDI) representing the Warehouse Request.",
        "Warehouse clerk unloads pallets, scans HUs, and posts Goods Receipt (/SCWM/PRDI or RFUI).",
        "System evaluates Warehouse Process Type 1010, executes Putaway Strategies, and generates Warehouse Tasks.",
        "WOCR bundles tasks into Warehouse Orders assigned to RF Queues for driver confirmation."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Purchase Order & Inbound Delivery in ERP",
          description: "Buyer creates PO (ME21N). Vendor sends ASN, creating Inbound Delivery (VL31N).",
          sapAction: "ERP Delivery Creation",
          tcode: "ME21N / VL31N",
          tablesUpdated: ["EKKO", "LIKP", "LIPS"]
        },
        {
          stepNumber: 2,
          title: "qRFC Delivery Replication to EWM",
          description: "Delivery replicates to EWM creating Inbound Delivery Request (IDR) and Inbound Delivery (ID).",
          sapAction: "Delivery Replication",
          tcode: "SMQ2 / /SCWM/PRDI",
          tablesUpdated: ["/SCDL/DB_PROCH_I", "/SCDL/DB_PROCI_I"]
        },
        {
          stepNumber: 3,
          title: "Post Goods Receipt in EWM",
          description: "Warehouse clerk inspects goods and clicks 'Post GR' in /SCWM/PRDI or scans via RF.",
          sapAction: "Goods Receipt Posting",
          tcode: "/SCWM/PRDI",
          tablesUpdated: ["/SCWM/AQUA", "/SCWM/HUHDR"]
        },
        {
          stepNumber: 4,
          title: "Warehouse Task & Order Creation",
          description: "System calculates destination bins, creates WTs (/SCWM/ORDIM_O), and bundles into WOs.",
          sapAction: "Task & Order Generation",
          tcode: "/SCWM/TODET_I",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/WHO"]
        },
        {
          stepNumber: 5,
          title: "RF Putaway Confirmation",
          description: "Driver scans destination bin barcode in /SCWM/RFUI. Task confirms, updating stock.",
          sapAction: "WT Confirmation",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA", "/SCWM/LAGP"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Object", name: "Inbound Delivery", description: "Warehouse Request document in EWM (Table /SCDL/DB_PROCH_I)" },
        { objectType: "Transactional Object", name: "Warehouse Task (WT)", description: "Putaway movement instruction (Table /SCWM/ORDIM_O)" },
        { objectType: "Transactional Object", name: "Warehouse Order (WO)", description: "Work package assigned to RF queue (Table /SCWM/WHO)" }
      ],
      relatedTcodes: ["/SCWM/PRDI", "/SCWM/TODET_I", "/SCWM/RFUI", "/SCWM/MON", "VL31N", "ME21N"],
      fioriApps: [{ appId: "F3120", appName: "Maintain Inbound Deliveries", fioriRole: "Receiving Specialist" }],
      relatedTables: [
        { tableName: "/SCDL/DB_PROCH_I", description: "Inbound Delivery Header", keyFields: ["MANDT", "DOCID"] },
        { tableName: "/SCDL/DB_PROCI_I", description: "Inbound Delivery Items", keyFields: ["MANDT", "DOCID", "ITEMID"] },
        { tableName: "/SCWM/ORDIM_O", description: "Open Warehouse Tasks", keyFields: ["MANDT", "LGNUM", "TANUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Receipt Process -> Inbound Delivery",
        criticalSettings: ["Delivery Document Type mapping", "WPT Determination (/SCWM/TWPT_DET)", "PPF Action Profile for Inbound Delivery (/SCWM/PRD_IN)"],
        mandatoryPrerequisites: ["qRFC distribution model configured in BD64", "Warehouse Product created in /SCWM/MAT1"],
        commonPitfalls: ["Failing to maintain WPT determination for item type INBI, resulting in manual task creation requirement."]
      },
      realWorldBusinessExample: {
        companyContext: "BMW Engine Plant (Munich)",
        scenario: "Bosch delivers 400 fuel injectors under ASN 18000450. EWM creates Inbound Delivery 100089. Clerk clicks Post GR; system auto-triggers WTs to Storage Type 0010.",
        businessOutcome: "Total dock-to-stock time reduced from 3 hours to 18 minutes."
      },
      industryExamples: {
        automotive: "Inbound ASN triggering automatic Handling Unit generation and dock door appointment scheduling.",
        aerospace: "Inbound delivery requiring mandatory serial number capture for all 50 turbine fasteners.",
        pharma: "Inbound receipt capturing manufacturer batch, production date, and SLED with cold-vault putaway.",
        food_beverage: "Catch weight dual-unit capture (boxes vs net kg) during dock receiving.",
        mechanical: "Heavy casting delivery requiring overhead crane resource assignment.",
        electronics: "High-value component receipt requiring security cage scan and tamper seal check.",
        retail: "Cross-docking inbound receipt directly transferred to store outbound staging doors.",
        cpg: "Full pallet RFID tunnel gate scan posting instant 100-pallet Goods Receipt.",
        logistics_3pl: "Custodian owner account logged for multi-client space billing.",
        construction: "Project stock (Q) receipt routed to job-site open laydown yard.",
        industrial: "Machinery spares receipt with warranty tag attachment."
      },
      scenarioQuestion: {
        prompt: "An inbound shipment of 10 pallets arrives at the dock. The clerk creates the Inbound Delivery in /SCWM/PRDI and clicks 'Post GR'. What happens to the stock in EWM at that exact instant before putaway tasks are created?",
        options: [
          "Physical stock quants (/SCWM/AQUA) are created in the Inbound Staging Storage Type (e.g. 9010 Receiving Door) with Availability Group 001 (ROD).",
          "Stock is immediately placed into high-rack bins in ERP.",
          "Stock is deleted from system until confirmed.",
          "The Purchase Order is closed and archived."
        ],
        correctIndex: 0,
        explanation: "Posting Goods Receipt creates physical stock quants at the receiving door staging storage type under Availability Group 001 (ROD - Received on Dock). Subsequent putaway WTs move the stock to the final storage bin."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Inbound Delivery in ERP does not replicate to EWM /SCWM/PRDI",
          errorCode: "QRFC-INB-01",
          rootCause: "Stuck queue in SMQ2 or missing partner profile / distribution model.",
          solutionSteps: [
            "Open transaction SMQ2 in EWM.",
            "Look for queue name DLV* or WM*.",
            "Inspect error message (e.g. missing product master or locked table).",
            "Resolve data conflict and click 'Activate Queue' (F6)."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "What is the difference between an Inbound Delivery Request (IDR) and an Inbound Delivery (ID) in EWM?",
          keyPoints: ["IDR is the replicated interface document; ID is the active execution document for GR and WTs"],
          sampleAnswer: "The Inbound Delivery Request (IDR) is the incoming interface message from ERP. The system converts IDR into an Inbound Delivery Document (ID), which is the active execution document in /SCWM/PRDI where Goods Receipt, Handling Unit management, and Warehouse Task creation take place."
        }
      ],
      consultantChallenge: {
        title: "High-Throughput Autonomous Inbound Receiving Design",
        clientRequirement: "A retail distribution center receives 1,200 supplier pallets daily. Management wants zero manual computer clicks at the receiving dock: truck arrives -> driver unloads pallets onto conveyor -> RFID scans pallet SSCC -> system must automatically post GR, calculate optimal high-bay bin, and dispatch autonomous mobile robot (AMR).",
        architecturalOptions: [
          {
            optionName: "Option A: Full Automation via PPF Actions + Automatic WT Creation + Material Flow System (MFS) Telegram Integration",
            pros: ["100% touchless receiving", "Eliminates dock clerk labor", "Achieves 12-second dock-to-storage dispatch SLA"],
            cons: ["Requires high-reliability RFID hardware and Telegram interface configuration (/SCWM/MFS)"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure PPF Action on Inbound Delivery to automatically post Goods Receipt upon RFID scan. Configure PPF to trigger automatic Putaway WT creation (WPT 1010). Integrate EWM MFS to transmit telegrams to AMR fleet management system."
      }
    }
  },
  {
    id: "ewm-intelligent-putaway",
    module: "EWM",
    category: "Inbound",
    subcategory: "Intelligent Putaway",
    title: "Intelligent Putaway Strategies & Bin Allocation (/SCWM/IMG)",
    subtitle: "Advanced putaway strategies, dynamic capacity check methods, storage type/section search sequences, and smart bin-level optimization in smart warehouse environments.",
    level: "PROFESSIONAL",
    tags: ["Putaway Strategies", "Intelligent Putaway", "Capacity Check", "Storage Type Search", "Storage Section Determination", "Bin Determination", "Smart Warehouse", "PACI"],
    relatedTopics: ["ewm-inbound-fundamentals", "ewm-posc-inbound", "ewm-hu-management", "ewm-robotics-automation"],
    ewmMonitorNode: "Storage Bins / Putaway Strategies",
    configurationView: {
      prerequisites: ["Storage Types, Sections, and Bins created", "Putaway Control Indicators (PACI) defined", "Warehouse Process Types defined"],
      configObjects: ["Storage Type Search Sequence (/SCWM/T334T)", "Storage Section Determination Table (/SCWM/T334B)", "Storage Bin Type Determination (/SCWM/T334E)", "Capacity Check Methods (1, 2, 3, 4)"],
      determinationLogic: [
        "1. EWM reads PACI from Warehouse Product Master (/SCWM/MAT1) + Warehouse Process Type -> determines Storage Type Search Sequence.",
        "2. Section Determination Indicator + Water Hazard / Fast-Mover flag -> determines Storage Section.",
        "3. HU Type + Storage Type -> determines Storage Bin Type.",
        "4. Strategy Rule (Empty Bin, Addition to Existing Stock, Near Fixed Bin, Pallet/Bulk) finds empty bin with sufficient capacity."
      ],
      assignmentSteps: [
        "1. Define Putaway Control Indicator (PACI) in SPRO Goods Receipt Process -> Strategies.",
        "2. Configure Storage Type Search Sequence assigning priority list of Storage Types.",
        "3. Configure Storage Section Search Sequence.",
        "4. Assign Capacity Check Method on Storage Type (e.g. Method 3 - Max Weight / Volume).",
        "5. Assign PACI to Warehouse Product Master in /SCWM/MAT1."
      ],
      executionSteps: ["Create Putaway WT in /SCWM/TODET_I", "System executes 4-step search sequence and proposes optimal bin"],
      testingProcedure: ["Simulate putaway with full vs empty bins.", "Verify capacity overflow logic routes to next storage type in sequence."],
      troubleshooting: ["Error: /SCWM/UI_TODET002 No storage bin found -> Check PACI, Search Sequence, and bin capacity limits."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine checking in at a luxury hotel. The receptionist doesn't put you in an arbitrary room! VIP guests get presidential suites, families get adjoining rooms, and heavy luggage goes to ground floor rooms. Intelligent Putaway is SAP EWM's smart receptionist: it analyzes box weight, height, temperature needs, and velocity, and picks the perfect rack coordinate automatically!",
      formalDefinition: "Intelligent Putaway in SAP EWM is the automated 4-tier algorithmic engine that determines the optimal destination storage bin for incoming materials based on: 1) Storage Type Search Sequence, 2) Storage Section Determination, 3) Storage Bin Type Determination, and 4) Putaway Strategies with Dynamic Capacity Checks.",
      whyUsed: [
        "Maximizes cubic warehouse space utilization and prevents structural rack overloading",
        "Eliminates human errors in bin selection (e.g. putting heavy pallets on fragile top tiers)",
        "Enforces product segregation rules (e.g. allergens, flammables, hazardous chemicals)",
        "Accelerates future picking speed by placing fast-movers near conveyor exits"
      ],
      howItWorks: [
        "Step 1 (Storage Type): Evaluates PACI (Product Master) + WPT -> selects candidate Storage Types (e.g. 0010 High Rack -> 0020 Overflow).",
        "Step 2 (Storage Section): Evaluates Section Indicator -> selects section (e.g. Fast-moving section vs Slow-moving section).",
        "Step 3 (Bin Type): Evaluates Handling Unit Type (e.g. Euro Pallet E1 vs Industrial Pallet IP) -> matches compatible Bin Types (e.g. B1 vs B2).",
        "Step 4 (Bin Selection): Evaluates Putaway Strategy (Empty Bin 'L', Addition to Stock 'I', Bulk 'B', General 'G') and validates Capacity Check Method (Weight, Volume, Key Figure, Maximum HU Count)."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "PACI & Warehouse Process Type Evaluation",
          description: "System reads PACI 'HIGH_RACK' from /SCWM/MAT1 and evaluates WPT 1010.",
          sapAction: "Strategy Initiation",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SCWM/MAT1"]
        },
        {
          stepNumber: 2,
          title: "Storage Type Search Sequence Execution",
          description: "Evaluates priority list: 1st Storage Type 0010 (High Rack), 2nd Storage Type 0020 (Overflow).",
          sapAction: "Search Sequence Traversal",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T334T"]
        },
        {
          stepNumber: 3,
          title: "Storage Section & Bin Type Matching",
          description: "Filters candidate bins matching Section 'FAST' and Bin Type compatible with Euro Pallet E1.",
          sapAction: "Section & Bin Type Filter",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T334B", "/SCWM/T334E"]
        },
        {
          stepNumber: 4,
          title: "Dynamic Capacity Check & Bin Allocation",
          description: "Calculates remaining bin weight & volume capacity. Selects first empty bin '01-04-02' and reserves it.",
          sapAction: "Atomic Bin Reservation",
          tcode: "/SCWM/TODET_I",
          tablesUpdated: ["/SCWM/LAGP", "/SCWM/ORDIM_O"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Putaway Control Indicator (PACI)", description: "Master data key driving storage type search (Table /SCWM/T334T)" },
        { objectType: "Customizing Object", name: "Storage Type Search Sequence", description: "Priority order of storage types for putaway" },
        { objectType: "Master Data", name: "Storage Bin Capacity", description: "Max weight and volume attributes (Table /SCWM/LAGP)" }
      ],
      relatedTcodes: ["/SCWM/MAT1", "/SCWM/LS02N", "/SCWM/TODET_I", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F3124", appName: "Manage Storage Bins", fioriRole: "Warehouse Master Data Specialist" }],
      relatedTables: [
        { tableName: "/SCWM/T334T", description: "Storage Type Search Sequences", keyFields: ["MANDT", "LGNUM", "SRCH_SEQ"] },
        { tableName: "/SCWM/T334B", description: "Storage Section Determination", keyFields: ["MANDT", "LGNUM", "LGTYP", "SEC_IND"] },
        { tableName: "/SCWM/LAGP", description: "Storage Bins", keyFields: ["MANDT", "LGNUM", "LGTYP", "LGBER", "LGPLA"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Receipt Process -> Strategies -> Storage Type Search",
        criticalSettings: [
          "Capacity Check Method: 0 (No check), 1 (Check based on Max Weight), 2 (Check based on Max Volume), 3 (Weight & Volume), 4 (Key Figure)",
          "Mixed Storage Indicator: 1 (Mixed storage allowed), 2 (Several HUs of same product permitted), Blank (No mixed storage)",
          "Allow Addition to Existing Stock (X)"
        ],
        mandatoryPrerequisites: ["PACIs defined in SPRO", "Bins created with Max Weight / Volume in /SCWM/LS10"],
        commonPitfalls: ["Leaving Capacity Check Method at '0' in high-bay storage types, resulting in system assigning 20 heavy pallets to the exact same bin coordinate."]
      },
      realWorldBusinessExample: {
        companyContext: "Samsung Electronics Regional DC",
        scenario: "Arriving OLED TV pallets weigh 450 kg and measure 1.8m height. EWM Putaway strategy evaluates PACI 'TV_LARGE', verifies HU Type 'PAL_OLED', checks weight capacity (max 1,000 kg), and allocates Lower Level 01 bin in Storage Type 0010.",
        businessOutcome: "Zero rack collapses, 100% compliance with OSHA weight guidelines, and automated conveyor route optimization."
      },
      industryExamples: {
        automotive: "Heavy engine blocks allocated exclusively to ground-level Level 01 bins.",
        aerospace: "Serialized titanium components allocated to secure climate-controlled vaults.",
        pharma: "Strict FEFO putaway segregation ensuring cold-chain stock never enters ambient zones.",
        food_beverage: "Allergen matrix determination preventing peanut-containing pallets from sharing bins with dairy.",
        mechanical: "Capacity check enforcing 15-ton floor load limit per bay.",
        electronics: "Humidity-controlled storage section determination for sensitive IC chips.",
        retail: "Fast-mover products automatically allocated to low-tier forward pick bins.",
        cpg: "Double-deep automated crane bin determination (front bin vs rear bin allocation).",
        logistics_3pl: "Owner-partitioned storage type determination.",
        construction: "Oversized structural beams allocated to GPS outdoor bins.",
        industrial: "Cantilever rack arm bin determination based on product length."
      },
      scenarioQuestion: {
        prompt: "A warehouse receives a pallet of 100 units. Storage Type 0010 has available bins, but the system fails with error: 'No storage bin found for putaway (/SCWM/UI_TODET 002)'. Investigation shows PACI is maintained. What is the most probable cause?",
        options: [
          "The candidate bins in Storage Type 0010 have Max Gross Weight set to 500 KG, but the received pallet weighs 650 KG, causing the Capacity Check Method 3 to reject all candidate bins.",
          "The material master Base UoM was changed.",
          "The vendor was not created in ERP.",
          "The customer sales order was blocked."
        ],
        correctIndex: 0,
        explanation: "When Capacity Check (Method 1, 2, 3, or 4) is active on the Storage Type, EWM evaluates whether the incoming HU weight/volume fits within the bin limits (/SCWM/LAGP-MAX_WEIGHT). If the pallet exceeds capacity, the bin search fails unless an overflow storage type is configured in the search sequence."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: No destination storage bin determined (/SCWM/UI_TODET002)",
          errorCode: "/SCWM/UI_TODET002",
          rootCause: "PACI missing in product master, or search sequence exhausted with all candidate bins full.",
          solutionSteps: [
            "Check /SCWM/MAT1 for active Putaway Control Indicator.",
            "Inspect SPRO Storage Type Search Sequence table /SCWM/T334T.",
            "Open /SCWM/MON -> Storage Bins to check occupancy and capacity limits.",
            "Add overflow Storage Type to search sequence in SPRO."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "Explain the 4 Capacity Check Methods available on Storage Types in SAP EWM.",
          keyPoints: ["Method 1: Max Weight", "Method 2: Max Volume", "Method 3: Weight + Volume", "Method 4: Capacity Key Figure based on product/packaging"],
          sampleAnswer: "In SAP EWM Storage Type customizing (/SCWM/T331), Capacity Check Methods control bin filling: Method 1 checks total weight against bin max weight; Method 2 checks total volume against bin max volume; Method 3 checks both weight and volume simultaneously; Method 4 uses a dimensionless Capacity Key Figure where each product unit consumes capacity points up to the bin maximum capacity."
        }
      ],
      consultantChallenge: {
        title: "Dynamic Slotting & Velocity-Based Putaway Architecture",
        clientRequirement: "A retail client with 80,000 SKUs experiences fast shifts in demand (e.g. promotional items suddenly spike 500% in velocity). Management wants EWM to automatically allocate incoming promotional goods to front-row pick-face bins without manual master data adjustments.",
        architecturalOptions: [
          {
            optionName: "Option A: Implement SAP EWM Slotting & Rearrangement (/SCWM/SLOT)",
            pros: ["System analyzes past demand and calculates optimal Storage Section Determination Indicators automatically", "Automatically updates /SCWM/MAT1 with optimized PACIs and section indicators", "Reduces total picking travel distance by 40%"],
            cons: ["Requires configuring condition technique for slotting and running scheduled background batch jobs"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Activate SAP EWM Slotting (/SCWM/SLOT). Configure Condition Tables based on Product Velocity Code (ABC/XYZ analysis). Schedule periodic slotting run to update Putaway and Section Indicators in /SCWM/MAT1."
      }
    }
  },

  // =========================================================================
  // 4. HANDLING UNIT & PACKAGING SPECIFICATION
  // =========================================================================
  {
    id: "ewm-hu-management",
    module: "EWM",
    category: "Handling Unit & Packaging",
    subcategory: "Handling Unit Management",
    title: "Handling Unit Management & Packaging Material Types (/SCWM/PACK)",
    subtitle: "Complete architecture for Packaging Material Types in ERP & EWM, Number Ranges, HU Types, HU Type Groups, Nested HUs, and Unpacking methods.",
    level: "PROFESSIONAL",
    tags: ["Handling Unit", "HU Management", "Packaging Material Type", "HU Type", "HU Type Group", "Nested HU", "SSCC", "/SCWM/PACK", "/SCWM/ADHU"],
    relatedTopics: ["ewm-packspec-config", "ewm-inbound-fundamentals", "ewm-posc-inbound"],
    ewmMonitorNode: "Handling Units / Physical Stock",
    configurationView: {
      prerequisites: ["Packaging Materials created in ERP (Material Type VERP)", "Packaging Material Types defined in ERP and EWM"],
      configObjects: ["Packaging Material Type (/SCWM/TPMAT)", "HU Type (/SCWM/THUTYP)", "HU Type Group (/SCWM/THUTYPG)", "HU Number Range (/SCWM/HUID)"],
      determinationLogic: [
        "Packaging Material Type governs tare weight, max allowed weight/volume, and closed/open container flag.",
        "HU Type (e.g. E1 Euro Pallet) assigned to Storage Type to enforce bin physical compatibility.",
        "HU Type Group assigned to Storage Bin Types to govern which pallets fit into which rack openings."
      ],
      assignmentSteps: [
        "1. Define Packaging Material Type in ERP (SPRO Logistics - General -> Handling Unit Management) and EWM (/SCWM/TPMAT).",
        "2. Define HU Internal Number Ranges (/SCWM/HUID) and SSCC generation rules.",
        "3. Define HU Types (e.g. E1 Euro, IP Industrial, CTN Carton) and HU Type Groups.",
        "4. Assign HU Type Group to Storage Bin Types in /SCWM/IMG -> Goods Receipt -> Strategies.",
        "5. Assign HU Type to Storage Types."
      ],
      executionSteps: ["Create HU via Pack Work Center /SCWM/PACK or RFUI", "Perform Nested HU creation (Cartons on Pallet)", "Unpack via /SCWM/UNPACK"],
      testingProcedure: ["Pack products into HU, verify tare/gross weight calculation.", "Move HU to Storage Type and verify HU Type validation."],
      troubleshooting: ["Error: HU Type E1 not permitted in Storage Type 0010 -> Check /SCWM/THUTYPT."]
    },
    pedagogy: {
      beginnerExplanation: "A Handling Unit (HU) is a physical box, carton, crate, or pallet that has a unique scannable license plate (barcode). Just like a shipping container has its own ID separate from the shoes or televisions inside it, an HU tracks both the packaging container and the exact materials packed inside. Nested HUs are boxes inside a master pallet!",
      formalDefinition: "A Handling Unit (HU) in SAP EWM is a physical unit consisting of packaging materials (e.g. Pallet, Box) and the goods contained within. It has a globally unique identification number (SSCC - Serial Shipping Container Code). The HU Header (/SCWM/HUHDR) tracks tare weight, volume, dimension, and status, while HU Items (/SCWM/HUITM) track product quants.",
      whyUsed: [
        "Enables single-scan movement of multi-item pallets without scanning individual SKUs",
        "Maintains accurate tare, gross weight, and volume calculations for transport compliance",
        "Supports multi-level nesting (Products -> Cartons -> Pallet -> Shipping Container)",
        "Drives automated Storage Bin Type compatibility checks during putaway"
      ],
      howItWorks: [
        "Packaging Material is created in MM01 under Material Type VERP (Packaging).",
        "Packaging Material Type defines physical properties (closed container, max weight, stacking factor).",
        "When packing in /SCWM/PACK or RFUI, EWM creates an HU record in /SCWM/HUHDR.",
        "System calculates: Gross Weight = Net Weight of Products + Tare Weight of Packaging Material.",
        "HU Type Groups validate whether the HU can enter specific high-rack bins."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Packaging Material Type in ERP & EWM",
          description: "Configure Packaging Material Type '0001' (Pallets) and assign Number Ranges.",
          sapAction: "Customizing Definition",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPMAT"]
        },
        {
          stepNumber: 2,
          title: "Define HU Types & HU Type Groups",
          description: "Create HU Type 'E1' (Euro Pallet 1200x800) and assign to Group 'PAL_STD'.",
          sapAction: "HU Type Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/THUTYP", "/SCWM/THUTYPG"]
        },
        {
          stepNumber: 3,
          title: "Assign HU Type to Storage Bin Types",
          description: "Map HU Type Group 'PAL_STD' to Bin Type 'B1' (Standard Pallet Bin).",
          sapAction: "Bin Type Compatibility",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/THUTYPB"]
        },
        {
          stepNumber: 4,
          title: "Execute Packing & Nested HU Creation",
          description: "In /SCWM/PACK, create 4 Carton HUs and pack them onto 1 Master Pallet HU.",
          sapAction: "Pack Execution",
          tcode: "/SCWM/PACK",
          tablesUpdated: ["/SCWM/HUHDR", "/SCWM/HUITM"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Object", name: "Handling Unit Header", description: "Physical container identifier and attributes (Table /SCWM/HUHDR)" },
        { objectType: "Transactional Object", name: "Handling Unit Item", description: "Product quantity quant packed in HU (Table /SCWM/HUITM)" },
        { objectType: "Master Data", name: "Packaging Material", description: "VERP material master for boxes and pallets (Table MARA/MARC)" }
      ],
      relatedTcodes: ["/SCWM/PACK", "/SCWM/ADHU", "/SCWM/RFUI", "/SCWM/MON", "/SCWM/CANCHU"],
      fioriApps: [{ appId: "F3125", appName: "Pack Outbound Deliveries", fioriRole: "Packer" }],
      relatedTables: [
        { tableName: "/SCWM/HUHDR", description: "Handling Unit Header", keyFields: ["MANDT", "LGNUM", "HUIDENT"] },
        { tableName: "/SCWM/HUITM", description: "Handling Unit Item Content", keyFields: ["MANDT", "LGNUM", "HUIDENT", "ITEMID"] },
        { tableName: "/SCWM/TPMAT", description: "Packaging Material Types", keyFields: ["MANDT", "TRATY"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Handling Units",
        criticalSettings: [
          "HU Number Range Definition (/SCWM/HUID) - Internal vs External SSCC-18 generator",
          "Assign Packaging Material Type to Element Type in Packaging Specification",
          "HU Requirement on Storage Type: Mandatory (X), Optional (Blank), Not Allowed (1)"
        ],
        mandatoryPrerequisites: ["Material Master created for Packaging Material with VERP material type"],
        commonPitfalls: ["Failing to map Packaging Material Type between ERP and EWM, causing Inbound ASN HUs to fail replication."]
      },
      realWorldBusinessExample: {
        companyContext: "Nestlé Confectionery Plant",
        scenario: "Nestlé packs 24 chocolate bars into a Carton HU (HU_BOX_01). 50 Cartons are then packed onto a Euro Pallet (HU_PAL_99).",
        businessOutcome: "Forklift driver scans 1 master SSCC barcode; system moves 1,200 chocolate bars atomically in 0.5 seconds."
      },
      industryExamples: {
        automotive: "KLT standardized reusable plastic containers nested inside metal stillages.",
        aerospace: "Shock-monitored sealed flight-case HUs with tamper indicators.",
        pharma: "Insulated thermal shipper HUs with integrated temperature data logger serials.",
        food_beverage: "Returnable plastic crates (RPC) for fresh produce with deposit tracking.",
        mechanical: "Heavy wooden skids bolted for machinery components.",
        electronics: "Anti-static ESD tote boxes with conductive barcoding.",
        retail: "Tote boxes for eaches nested onto roll cages for retail store delivery.",
        cpg: "Stretch-wrapped slip-sheet pallet HUs.",
        logistics_3pl: "Client-branded outer cartons packed on standard CHEP pallets.",
        construction: "Steel strap bundles treated as non-standard HUs.",
        industrial: "Steel drum quad-packs strapped on wooden spill pallets."
      },
      scenarioQuestion: {
        prompt: "A warehouse operator attempts to unpack a nested Handling Unit containing 10 Cartons on a Pallet in /SCWM/PACK. The system issues an error preventing unpacking. What is the most probable reason?",
        options: [
          "An open Warehouse Task exists against the Parent Pallet HU or one of its child Cartons.",
          "The material master has no standard cost.",
          "The customer invoice was posted.",
          "The vendor ASN was deleted."
        ],
        correctIndex: 0,
        explanation: "In SAP EWM, Handling Units with active/open Warehouse Tasks (/SCWM/ORDIM_O) are locked for physical re-packaging or unpacking until the task is confirmed or cancelled."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Handling Unit Type E1 is not allowed in Storage Type 0010",
          errorCode: "/SCWM/HU004",
          rootCause: "Table /SCWM/THUTYPT does not permit HU Type E1 in the target Storage Type.",
          solutionSteps: [
            "Open SPRO -> Cross-Process Settings -> Handling Units -> Basics -> Assign Handling Unit Types to Storage Types.",
            "Add entry for Warehouse W001, Storage Type 0010, and HU Type E1.",
            "Save customizing and re-try putaway task."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What is the difference between a Simple HU and a Nested HU in SAP EWM?",
          keyPoints: ["Simple HU contains products only; Nested HU contains lower-level child HUs inside a parent/higher-level HU"],
          sampleAnswer: "A Simple Handling Unit consists of one packaging material directly containing product quants (e.g. 50 shirts inside a box). A Nested Handling Unit has a hierarchical multi-tier structure where child HUs are packed into a parent HU (e.g. 20 boxes packed onto 1 wooden pallet)."
        }
      ],
      consultantChallenge: {
        title: "Global SSCC-18 Barcode Generation Architecture",
        clientRequirement: "A global manufacturer must generate GS1-compliant SSCC-18 (Serial Shipping Container Code) barcodes with EAN.UCC International Company Prefix for 500,000 outbound pallets annually.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure EWM SSCC Number Range Object /SCWM/SSCC with ILN Basis and Check-Digit Algorithm",
            pros: ["100% GS1 compliant", "Automatic modulo-10 check digit calculation", "Direct integration with EDI 856 ASN"],
            cons: ["Requires company prefix registration with GS1"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure SPRO -> Cross-Process Settings -> Handling Units -> Basics -> Define SSCC Number Ranges. Assign GS1 Company Prefix and Extension Digit."
      }
    }
  },
  {
    id: "ewm-packspec-config",
    module: "EWM",
    category: "Handling Unit & Packaging",
    subcategory: "Packaging Specification",
    title: "Packaging Specification Configuration & Determination (/SCWM/PACKSPEC)",
    subtitle: "Complete architecture for Packaging Specification Group, Level Types, Level Sets, Element Groups, Elements, Work Steps, Condition Tables, Access Sequences, and Determination Procedures.",
    level: "CONSULTANT",
    tags: ["Packaging Specification", "PackSpec", "Condition Technique", "Level Type", "Level Set", "Element Group", "Work Step", "Access Sequence", "/SCWM/PACKSPEC"],
    relatedTopics: ["ewm-hu-management", "ewm-intelligent-putaway", "ewm-posc-inbound", "ewm-vas-inbound"],
    ewmMonitorNode: "Master Data / Packaging Specifications",
    configurationView: {
      prerequisites: ["Packaging Material Types created", "Condition Technique components defined"],
      configObjects: [
        "Packaging Specification Group (/SCWM/TPS_PS_GRP)",
        "Level Type (/SCWM/TPS_LVLTYP)",
        "Level Set (/SCWM/TPS_LVLSET)",
        "Element Group (/SCWM/TPS_ELMGRP)",
        "Element (/SCWM/TPS_ELM)",
        "Work Step (/SCWM/TPS_WRKSTP)",
        "Determination Procedure, Condition Types, Access Sequences"
      ],
      determinationLogic: [
        "1. Determination Procedure (e.g. 0IBD for Inbound / 0OBD for Outbound) evaluates Condition Types.",
        "2. Condition Type (e.g. 0PAL) reads Access Sequence (e.g. 0PAL -> Whse + Product).",
        "3. Condition Record links Product + Vendor to Packaging Specification ID.",
        "4. EWM automatically calculates: 1 Pallet = 10 Layers = 50 Cartons = 500 Pieces."
      ],
      assignmentSteps: [
        "1. Define Packaging Specification Group in SPRO.",
        "2. Define Level Types (e.g. 1-Product, 2-Carton, 3-Pallet) and assign to Level Set.",
        "3. Define Element Groups (Main Packaging Material, Auxiliary Packaging Material) and Elements.",
        "4. Define Work Steps (e.g. Wrap with stretch film, Apply fragile label).",
        "5. Configure Condition Tables, Access Sequences, Condition Types, and Determination Procedure.",
        "6. Create Packaging Specification in /SCWM/PACKSPEC and activate condition record."
      ],
      executionSteps: ["Create Inbound Delivery", "System executes automatic packaging specification determination", "Automatic HU generation"],
      testingProcedure: ["Execute /SCWM/PACKSPEC determination test.", "Verify delivery items auto-pack into expected HUs."],
      troubleshooting: ["Error: PackSpec not determined -> Check condition record validity dates and activation status."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine LEGO assembly instructions or an IKEA packing manual. It tells you: 'Put 10 screws in small bag A, put 5 bags in box B, and stack 20 boxes on pallet C, then wrap with plastic film.' A Packaging Specification (PackSpec) is SAP EWM's digital packing recipe that automates how items must be packaged, labeled, and palletized!",
      formalDefinition: "A Packaging Specification (/SCWM/PACKSPEC) is an EWM master data object structured via Condition Technique that defines multi-level packaging instructions. It specifies Levels (e.g. Piece, Box, Pallet), Elements (Packaging Materials, Auxiliary Materials), Quantities, Dimensions, and Work Steps (VAS/Packing instructions) used for automatic HU creation, Deconsolidation, and Putaway.",
      whyUsed: [
        "Automates inbound palletization and Handling Unit creation from vendor ASNs",
        "Drives Process-Oriented Storage Control (POSC) deconsolidation thresholds",
        "Calculates rounded warehouse task quantities (Full Pallet vs Carton vs Piece)",
        "Provides standardized work step instructions for warehouse operators at Pack Work Centers"
      ],
      howItWorks: [
        "WHAT: A 4-tier hierarchy: PackSpec Header -> Level Set -> Levels -> Element Groups -> Elements / Work Steps.",
        "WHY: Enables automatic calculation of packaging structures without manual operator input.",
        "WHERE: Configured in SPRO under Extended Warehouse Management -> Master Data -> Packaging Specification.",
        "HOW: Determination Procedure evaluates Condition Records matching Delivery Header/Item attributes."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Level Types & Level Sets in SPRO",
          description: "Configure Level Type 1 (Carton) and Level Type 2 (Pallet). Group into Level Set 'STD_PAL'.",
          sapAction: "Customizing Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPS_LVLTYP", "/SCWM/TPS_LVLSET"]
        },
        {
          stepNumber: 2,
          title: "Define Element Groups & Work Steps",
          description: "Define Element Group 'BOX' (Cardboard) and 'PAL' (Wood). Define Work Step 'STR_WRAP'.",
          sapAction: "Element Configuration",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPS_ELMGRP", "/SCWM/TPS_WRKSTP"]
        },
        {
          stepNumber: 3,
          title: "Configure Condition Technique for PackSpec",
          description: "Define Field Catalog, Condition Table (Warehouse + Product), Access Sequence, Condition Type, and Procedure.",
          sapAction: "Condition Determination Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPS_CNDPRC"]
        },
        {
          stepNumber: 4,
          title: "Create & Activate PackSpec in /SCWM/PACKSPEC",
          description: "Create PackSpec 100056: 1 Pallet = 40 Cartons = 400 Pieces. Create Condition Record and click Activate.",
          sapAction: "Master Data Activation",
          tcode: "/SCWM/PACKSPEC",
          tablesUpdated: ["/SCWM/TPS_HDR", "/SCWM/TPS_LVL"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Packaging Specification", description: "Multi-level packing instruction master (Table /SCWM/TPS_HDR)" },
        { objectType: "Customizing Object", name: "Level Set", description: "Template defining hierarchy of packaging levels (Table /SCWM/TPS_LVLSET)" },
        { objectType: "Customizing Object", name: "Condition Procedure", description: "Condition determination engine for PackSpec (Table /SCWM/TPS_CNDPRC)" }
      ],
      relatedTcodes: ["/SCWM/PACKSPEC", "/SCWM/PS_ANALYZE", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F3126", appName: "Manage Packaging Specifications", fioriRole: "Packaging Engineer" }],
      relatedTables: [
        { tableName: "/SCWM/TPS_HDR", description: "Packaging Specification Header", keyFields: ["MANDT", "GUID_PS"] },
        { tableName: "/SCWM/TPS_LVL", description: "PackSpec Levels", keyFields: ["MANDT", "GUID_PS", "LVLSEQ"] },
        { tableName: "/SCWM/TPS_ELM", description: "PackSpec Elements", keyFields: ["MANDT", "GUID_PS", "ELMSEQ"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Master Data -> Packaging Specification",
        criticalSettings: [
          "Assign Packaging Material Type to Element Type",
          "Condition Maintenance Group definition",
          "Activation Status: PackSpec must be in status 'Active' to be determined by delivery engine"
        ],
        mandatoryPrerequisites: ["Packaging Materials created in /SCWM/MAT1"],
        commonPitfalls: [
          "Creating the Packaging Specification but forgetting to click 'Activate' (Status remains 'Inactive'), preventing determination.",
          "Missing rounding quantity flag, causing system to split single pallets into arbitrary eaches."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Unilever Household Products",
        scenario: "Unilever configures PackSpec for Laundry Detergent: Level 1 = 1 Bottle; Level 2 = 6 Bottles / Box (Box Material: CTN_06); Level 3 = 60 Boxes / Pallet (Pallet: EUR_PAL, Work Step: Apply Corner Protectors).",
        businessOutcome: "When ASN arrives for 3,600 bottles, EWM auto-generates 10 Master Pallet HUs containing 600 Box HUs instantly."
      },
      industryExamples: {
        automotive: "Level 1: 50 Bolts in KLT box; Level 2: 24 KLT boxes on Euro Stillages with dust cover.",
        aerospace: "PackSpec specifying nitrogen-purged protective anti-corrosion outer bag.",
        pharma: "PackSpec specifying validated Styrofoam box + 4 gel refrigerant packs + temperature indicator.",
        food_beverage: "PackSpec defining 24 cans per shrink-wrapped tray, 80 trays per pallet.",
        mechanical: "PackSpec specifying heavy wooden crate with desiccant bags and VCI paper lining.",
        electronics: "PackSpec defining ESD anti-static bubble wrap and anti-static outer carton.",
        retail: "PackSpec defining retail display shelf-ready packaging (SRP).",
        cpg: "PackSpec defining multi-pack promotional shrink wrapping.",
        logistics_3pl: "PackSpec customized per client account code.",
        construction: "PackSpec defining bundle banding with steel straps.",
        industrial: "PackSpec defining 4 drums on secondary containment spill pallet."
      },
      scenarioQuestion: {
        prompt: "A consultant creates a Packaging Specification in /SCWM/PACKSPEC and maintains the condition record. However, during Inbound Delivery creation, no Handling Units are auto-generated. What is the most common reason?",
        options: [
          "The Packaging Specification was created but its Status was not set to 'Active' (it remains in 'Draft/Inactive' status), or the Determination Procedure was not assigned to the Delivery Document Type.",
          "The Purchase Order was not paid.",
          "The storage bin coordinate was missing.",
          "The user does not have SAP_ALL authorization."
        ],
        correctIndex: 0,
        explanation: "Packaging Specifications have an explicit lifecycle status. If a PackSpec is not explicitly activated, or if the Condition Determination Procedure is not assigned to the Delivery Document Type in customizing, determination returns negative."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Packaging Specification not determined during Inbound Receiving",
          errorCode: "PACKSPEC-DET-01",
          rootCause: "Condition record missing, expired validity date, or inactive PackSpec status.",
          solutionSteps: [
            "Open transaction /SCWM/PACKSPEC.",
            "Search for PackSpec by Product and verify Status is 'Active' (Green Icon).",
            "Open Condition Records tab and verify valid date range encompasses current date.",
            "Run Determination Analysis tool /SCWM/PS_ANALYZE."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the architecture of Level Types, Level Sets, and Element Groups in SAP EWM Packaging Specifications.",
          keyPoints: ["Level Type represents packaging tier (Box, Pallet); Level Set groups levels; Element Groups define materials (Carton, Pallet) and auxiliary items (film, foam)"],
          sampleAnswer: "In SAP EWM Packaging Specification customizing, a Level Type defines the operational packaging hierarchy (e.g. Level 1 = Retail Each, Level 2 = Case Box, Level 3 = Pallet). A Level Set bundles these Level Types into a reusable structure. Within each Level, Element Groups define the physical components: Main Packaging Materials (e.g. EUR Pallet), Auxiliary Materials (e.g. corner guards, stretch film), and Work Steps (e.g. strapping, labeling)."
        }
      ],
      consultantChallenge: {
        title: "Dynamic Deconsolidation Trigger via Packaging Specification",
        clientRequirement: "Client receives mixed pallets from overseas vendors. Some pallets contain only 1 SKU (Single-product pallets -> Putaway directly to High Rack), while others contain 5 different SKUs (Mixed pallets -> Must be routed to Deconsolidation Station first).",
        architecturalOptions: [
          {
            optionName: "Option A: Maintain Packaging Specifications with Max Products per HU and POSC Process Step Routing",
            pros: ["System automatically detects mixed HUs during Goods Receipt", "Single-product pallets bypass Decon station, saving 4 hours of handling", "Mixed pallets automatically route to Work Center via POSC"],
            cons: ["Requires PackSpec maintenance for all incoming supplier packaging profiles"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure Process-Oriented Storage Control (POSC) with Deconsolidation Step (DECO). Configure PackSpec with Deconsolidation indicator. EWM evaluates whether incoming HU matches PackSpec single-SKU profile or triggers DECO."
      }
    }
  },

  // =========================================================================
  // 5. ADVANCED INBOUND — POSC, DECONSOLIDATION, VAS, LOSC & ROBOTICS
  // =========================================================================
  {
    id: "ewm-posc-inbound",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Process-Oriented Storage Control",
    title: "Process-Oriented Storage Control (POSC) Inbound Flow (/SCWM/TPROCS)",
    subtitle: "Multi-step inbound warehouse routing (Unload -> Deconsolidate -> Quality Inspection -> Putaway) with automatic next-task creation and exception handling.",
    level: "CONSULTANT",
    tags: ["POSC", "Process-Oriented Storage Control", "External Process Steps", "Storage Process", "IB01", "IB02", "IB03", "/SCWM/TPROCS", "/SCWM/DCONS"],
    relatedTopics: ["ewm-deconsolidation", "ewm-vas-inbound", "ewm-losc", "ewm-intelligent-putaway"],
    ewmMonitorNode: "Handling Units / Storage Processes",
    processDiagram: {
      title: "POSC 4-Step Inbound Flow",
      nodes: [
        { id: "1", label: "Step 1: UNLD (Unloading)", system: "EWM", tcode: "/SCWM/RFUI", description: "Truck Door (9010) -> Receiving Dock (9020)" },
        { id: "2", label: "Step 2: DECO (Deconsolidation)", system: "EWM", tcode: "/SCWM/DCONS", description: "Move to Work Center 8010 to unpack mixed HUs" },
        { id: "3", label: "Step 3: QIS (Quality Inspection)", system: "EWM", tcode: "/SCWM/QINSP", description: "Move to QA Sampling Area 8020" },
        { id: "4", label: "Step 4: PTWY (Final Putaway)", system: "EWM", tcode: "/SCWM/RFUI", description: "Move child HUs to High-Rack Bins 0010" }
      ]
    },
    configurationView: {
      prerequisites: ["Storage Types for Doors (9010), Staging (9020), Work Centers (8010/8020), High-Rack (0010) defined", "External Process Steps defined in SPRO"],
      configObjects: ["External Process Steps (UNLD, DECO, QIS, PTWY)", "Storage Process (/SCWM/TPROCS)", "Process-Oriented Storage Control Table (/SCWM/TPOSC)"],
      determinationLogic: [
        "1. Inbound Delivery Item Type + Process Type Determination Indicator -> determines Warehouse Process Type (WPT e.g. 1010).",
        "2. WPT assigns Storage Process 'INB1'.",
        "3. Storage Process 'INB1' contains sequential steps: UNLD -> DECO -> QIS -> PTWY.",
        "4. Confirming WT for step 'n' automatically triggers creation of WT for step 'n+1'."
      ],
      assignmentSteps: [
        "1. Define External Process Steps (UNLD, DECO, QIS, PTWY) in SPRO Cross-Process Settings -> Storage Control.",
        "2. Define Storage Process (e.g. INB1) and assign external steps with sequence numbers.",
        "3. Assign Destination Storage Type/Section/Bin or Work Center to each external step in POSC table.",
        "4. Assign Storage Process INB1 to Warehouse Process Type 1010."
      ],
      executionSteps: [
        "Post GR for Inbound Delivery",
        "Confirm Unload WT to Staging",
        "EWM automatically creates WT to Deconsolidation Station",
        "Complete Deconsolidation in /SCWM/DCONS",
        "EWM automatically creates final Putaway WT"
      ],
      testingProcedure: ["Confirm step 1 WT and verify open step 2 WT appears in /SCWM/MON.", "Check HU status shows next process step."],
      troubleshooting: ["Error: Next POSC task not created -> Verify previous WT confirmed with no open exceptions, and check /SCWM/TPOSC customizing."]
    },
    pedagogy: {
      beginnerExplanation: "Think of an airport baggage handling system. When a suitcase lands, it doesn't go straight to the owner. Step 1: Baggage handlers unload it from the plane onto a cart. Step 2: Customs inspects it. Step 3: It moves to carousel 4. Step 4: Passenger picks it up. POSC is SAP EWM's automated orchestrator that guides boxes through intermediate stations (Unload -> Unpack -> Inspect -> Putaway) automatically!",
      formalDefinition: "Process-Oriented Storage Control (POSC) in SAP EWM is a multi-step execution engine that coordinates complex, intermediate warehouse activities (External Steps: UNLD, DECO, QIS, PTWY, VAS, PACK) between source and final destination. Each confirmed warehouse task triggers the subsequent task in the defined storage process (/SCWM/TPROCS).",
      whyUsed: [
        "Automates multi-touch warehouse workflows without manual supervisor task dispatching",
        "Enforces mandatory quality checks, deconsolidation, and labeling before stock is put away",
        "Maintains complete physical visibility of pallets at intermediate work centers in /SCWM/MON",
        "Coordinates seamlessly with Layout-Oriented Storage Control (LOSC) for automated conveyors"
      ],
      howItWorks: [
        "A Storage Process (e.g. INB1) is defined with sequential External Steps: Step 1 (UNLD), Step 2 (DECO), Step 3 (QIS), Step 4 (PTWY).",
        "Warehouse Process Type (WPT 1010) is assigned Storage Process INB1.",
        "When Inbound Delivery is received, EWM creates WT for Step 1 (Move pallet from Truck Door 9010 to Staging 9020).",
        "When RF operator confirms Step 1, EWM reads /SCWM/TPOSC, sees Step 2 is DECO, and automatically creates WT to Decon Work Center 8010.",
        "When deconsolidation is completed in /SCWM/DCONS, EWM automatically creates final Putaway WT to High-Rack 0010."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define External Process Steps & Storage Process in SPRO",
          description: "Define Steps UNLD, DECO, QIS, PTWY. Create Storage Process 'INB1' and assign steps 10, 20, 30, 40.",
          sapAction: "Storage Control Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPROCS"]
        },
        {
          stepNumber: 2,
          title: "Configure POSC Routing Table (/SCWM/TPOSC)",
          description: "Map Warehouse + Storage Process INB1 + Step DECO -> Destination Storage Type 8010 (Work Center).",
          sapAction: "POSC Matrix Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPOSC"]
        },
        {
          stepNumber: 3,
          title: "Assign Storage Process to Warehouse Process Type",
          description: "Assign Storage Process INB1 to WPT 1010 in /SCWM/TWPT.",
          sapAction: "WPT Storage Process Assignment",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TWPT"]
        },
        {
          stepNumber: 4,
          title: "Execute Multi-Step Inbound Flow",
          description: "Post GR -> Confirm Unload WT -> EWM auto-creates Decon WT -> Confirm Decon -> EWM auto-creates Putaway WT.",
          sapAction: "POSC Automated Task Progression",
          tcode: "/SCWM/PRDI / /SCWM/DCONS",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/ORDIM_C", "/SCWM/HUHDR"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "External Process Step", description: "Standard business step code (e.g. UNLD, DECO, QIS, PTWY) (Table /SCWM/TPROCS_STEP)" },
        { objectType: "Customizing Object", name: "Storage Process", description: "Sequence of external steps for a warehouse flow (Table /SCWM/TPROCS)" },
        { objectType: "Master Data", name: "Work Center", description: "Physical station for DECO, VAS, or QA (Table /SCWM/TWORKC)" }
      ],
      relatedTcodes: ["/SCWM/TPROCS", "/SCWM/DCONS", "/SCWM/QINSP", "/SCWM/PRDI", "/SCWM/MON", "/SCWM/RFUI"],
      fioriApps: [
        { appId: "F3127", appName: "Deconsolidate Handling Units", fioriRole: "Deconsolidation Specialist" },
        { appId: "F2064", appName: "Warehouse Monitor", fioriRole: "Warehouse Supervisor" }
      ],
      relatedTables: [
        { tableName: "/SCWM/TPROCS", description: "Storage Processes", keyFields: ["MANDT", "LGNUM", "PROCS"] },
        { tableName: "/SCWM/TPOSC", description: "Process-Oriented Storage Control Rules", keyFields: ["MANDT", "LGNUM", "PROCS", "STEP"] },
        { tableName: "/SCWM/HUHDR", description: "Handling Unit Header (Tracks Current Process Step)", keyFields: ["MANDT", "LGNUM", "HUIDENT"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Storage Control -> Process-Oriented Storage Control",
        criticalSettings: [
          "Internal Step vs External Step mapping (e.g. External Step 'UNLD' mapped to Internal Step 'IB01')",
          "Auto-WT Creation Flag: Ensure 'Create Automatic Follow-Up WT' is checked",
          "Work Center Storage Type and Bin assignment in /SCWM/TPOSC"
        ],
        mandatoryPrerequisites: ["Work Center Storage Types created (Role: Work Center) in /SCWM/T331"],
        commonPitfalls: [
          "Forgetting to check the 'Auto-WT' flag in /SCWM/TPOSC, causing process to stall after step 1 confirmation with no follow-up task created.",
          "Missing intermediate work center storage bin master data, causing WT creation to fail with 'Destination bin not found'."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Boeing Commercial Airplanes Distribution",
        scenario: "Boeing receives high-precision titanium fasteners. Storage Process INB_AERO is triggered: Step 1 Unload -> Step 2 Quality Inspection (Spectrometer metallurgy check at Work Center QC01) -> Step 3 Putaway to high-security Vault.",
        businessOutcome: "Zero uninspected aerospace parts can ever enter inventory because POSC physically blocks final putaway until QC station confirms release."
      },
      industryExamples: {
        automotive: "Inbound JIT stillages: UNLD -> Deconsolidation -> Line-Side Staging.",
        aerospace: "Inbound avionics: UNLD -> Certificate of Conformance (CoC) Validation -> Clean Room Putaway.",
        pharma: "Inbound vaccine vials: UNLD -> Temperature Log Download -> Sampling -> Cold Vault Putaway.",
        food_beverage: "Inbound dairy: UNLD -> USDA Inspection -> Catch Weight Weighing -> Chiller Putaway.",
        mechanical: "Inbound heavy casting: UNLD -> Dimensional Laser Audit -> Heavy Crane Bay.",
        electronics: "Inbound silicon wafers: UNLD -> ESD Static Check -> Clean-Room Carousel.",
        retail: "Inbound mixed apparel: UNLD -> Deconsolidation (Repack by store SKU) -> Mezzanine Flow Rack.",
        cpg: "Inbound pallet loads: UNLD -> Stretch Wrap & Corner Board VAS -> High-Bay AS/RS.",
        logistics_3pl: "Inbound multi-client pallets: UNLD -> Customs Clearance -> Client Segregation.",
        construction: "Inbound steel rebar: UNLD -> Length Verification -> Outdoor Laydown.",
        industrial: "Inbound hydraulic pumps: UNLD -> Pressure Bench Testing -> Reserve Storage."
      },
      scenarioQuestion: {
        prompt: "A warehouse executes POSC with steps UNLD -> DECO -> PTWY. The operator confirms the Unload WT. However, the follow-up WT to the Deconsolidation Work Center is NOT created automatically. What is the most likely configuration issue?",
        options: [
          "In table /SCWM/TPOSC, the checkbox 'Automatic WT Creation' is unchecked for Step DECO, or the Work Center has no active destination bin maintained.",
          "The material master price was zero.",
          "The truck license plate was missing.",
          "The customer credit limit was exceeded."
        ],
        correctIndex: 0,
        explanation: "In POSC customizing (/SCWM/TPOSC), each external step requires the 'Auto-WT' flag to be active and a valid destination storage type/bin (or Work Center). If this is missing, EWM will not automatically create the next task upon confirmation of the previous step."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Follow-up Warehouse Task not created after step confirmation",
          errorCode: "POSC-FOLLOWUP-01",
          rootCause: "Table /SCWM/TPOSC missing next step definition, or 'Auto-WT' flag disabled.",
          solutionSteps: [
            "Open SPRO -> Cross-Process Settings -> Storage Control -> Define Process-Oriented Storage Control.",
            "Verify Storage Process entry for current Warehouse Number.",
            "Check that Step 'DECO' has 'Auto-WT' enabled and points to Work Center storage type 8010.",
            "Confirm that destination bin exists in /SCWM/LAGP."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "What is the technical and architectural difference between POSC and LOSC in SAP EWM?",
          keyPoints: ["POSC represents business process steps (Unload, Decon, Quality, VAS); LOSC represents physical transport constraints (Conveyors, Elevators, Pick Points)"],
          sampleAnswer: "POSC (Process-Oriented Storage Control) is business-process driven: it moves material through logical business stations (e.g. Unload -> Deconsolidate -> Quality Check -> Putaway) regardless of physical layout. LOSC (Layout-Oriented Storage Control) is physical-infrastructure driven: it manages intermediate routing constraints (e.g. Forklift -> Conveyor Infeed -> Automatic Crane -> Pick Point) required to physically move goods from point A to point B."
        }
      ],
      consultantChallenge: {
        title: "Multi-Step Quality Gate with Dynamic Decision Routing",
        clientRequirement: "A medical device manufacturer receives implants. 100% of lots must go to Quality Inspection (QIS). If QA Passes, POSC must route to High-Rack (0010). If QA Fails, POSC must dynamically re-route the pallet to Quarantine Vault (0099) and alert Regulatory Compliance.",
        architecturalOptions: [
          {
            optionName: "Option A: Integrate POSC with Quality Management (QM) Usage Decision and Exception Code Routing",
            pros: ["100% automated decision branching based on QA Usage Decision (UD)", "Quarantine stock automatically locked with Stock Type Q3/B5", "Zero risk of defective implants entering general distribution"],
            cons: ["Requires configuring Inspection Rules in /SCWM/QRSETUP and QM Usage Decision codes"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure Inspection Rule in /SCWM/QRSETUP. In POSC, configure Step QIS with follow-up action derived from QM Usage Decision. Usage Decision 'Accept' triggers PTWY to 0010; 'Reject' triggers Transfer Posting to 0099."
      }
    }
  },
  {
    id: "ewm-deconsolidation",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Deconsolidation",
    title: "Deconsolidation Process & Work Center Execution (/SCWM/DCONS)",
    subtitle: "Unpacking mixed supplier pallets, destination activity area segregation, and putaway HU generation in SAP EWM.",
    level: "PROFESSIONAL",
    tags: ["Deconsolidation", "Decon", "Work Center", "/SCWM/DCONS", "Mixed Pallet", "Putaway HU", "POSC Step DECO"],
    relatedTopics: ["ewm-posc-inbound", "ewm-hu-management", "ewm-packspec-config"],
    ewmMonitorNode: "Work Centers / Deconsolidation",
    configurationView: {
      prerequisites: ["Work Center Storage Type defined (Role: Work Center)", "POSC configured with Step DECO"],
      configObjects: ["Work Center Layout (/SCWM/TWORKC_LAY)", "Work Center Definition (/SCWM/TWORKC)", "Deconsolidation Indicator in /SCWM/T331"],
      determinationLogic: [
        "1. EWM analyzes Inbound Delivery items on a single HU. If items belong to different Activity Areas or Storage Types, Deconsolidation is triggered.",
        "2. HU routed to Work Center 8010 via POSC.",
        "3. Operator scans source HU in /SCWM/DCONS, scans new destination HUs, and transfers items.",
        "4. Closing destination HUs generates individual Putaway WTs."
      ],
      assignmentSteps: [
        "1. Define Work Center Storage Type (Role: Work Center) in /SCWM/T331.",
        "2. Define Work Center Layout and Work Center master in /SCWM/TWORKC.",
        "3. Assign Inbound Section and Outbound Section to Work Center.",
        "4. Assign Work Center to POSC Step DECO."
      ],
      executionSteps: [
        "Confirm Unload WT to Decon Work Center",
        "Open /SCWM/DCONS, enter Warehouse and Work Center",
        "Scan mixed Source HU",
        "Create Destination Putaway HUs and transfer products",
        "Click 'Complete Deconsolidation' -> Final Putaway WTs created"
      ],
      testingProcedure: ["Receive mixed pallet with 2 products belonging to different storage types.", "Verify DECO step is required in /SCWM/MON."],
      troubleshooting: ["Error: Deconsolidation not possible -> Verify no open tasks exist on source HU items."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine receiving a giant Amazon mystery box containing a computer monitor, 3 shirts, and a bag of coffee beans. You can't put that single box on the shelf! You must take it to a packing table (Work Center), unpack it, and put the monitor in the electronics aisle, the shirts in apparel, and the coffee in the pantry. That's Deconsolidation!",
      formalDefinition: "Deconsolidation in SAP EWM (/SCWM/DCONS) is the process of breaking down a mixed Handling Unit (containing products destined for different Activity Areas, Storage Types, or maximum weight/volume limits) into separate, single-destination Putaway Handling Units at a designated Work Center.",
      whyUsed: [
        "Prevents forklift drivers from criss-crossing the entire warehouse to put away 1 mixed pallet",
        "Enforces product segregation (e.g. hazardous chemicals vs food products)",
        "Enables repackaging into standardized rack-compatible totes or boxes",
        "Automates generation of individual putaway warehouse tasks upon closing destination HUs"
      ],
      howItWorks: [
        "WHEN REQUIRED: Deconsolidation is triggered when: 1) Products in an HU belong to different Activity Areas, 2) Number of items exceeds Decon threshold, 3) Packaging Specification mandates repackaging.",
        "EXECUTION: Mixed HU arrives at Work Center 8010. Operator opens /SCWM/DCONS.",
        "Operator scans Source HU, scans new Destination HUs (e.g. Tote 1 for Aisle 1, Tote 2 for Aisle 2), and confirms item quantities.",
        "When finished, operator clicks 'Complete Deconsolidation'. System creates direct putaway tasks for each new destination HU."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "System Evaluates Deconsolidation Necessity",
          description: "During Inbound GR, system checks destination Activity Areas. Finds Product A goes to High Rack 0010, Product B goes to Mezzanine 0020.",
          sapAction: "Decon Determination",
          tcode: "/SCWM/PRDI",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 2,
          title: "Routing to Deconsolidation Work Center",
          description: "POSC generates WT moving mixed HU from Staging to Work Center 8010.",
          sapAction: "Move to Work Center",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/AQUA", "/SCWM/HUHDR"]
        },
        {
          stepNumber: 3,
          title: "Repack Items in /SCWM/DCONS",
          description: "Operator scans Source HU in /SCWM/DCONS, creates Destination HU 101 and 102, and drags items into respective HUs.",
          sapAction: "Item Transfer",
          tcode: "/SCWM/DCONS",
          tablesUpdated: ["/SCWM/HUITM"]
        },
        {
          stepNumber: 4,
          title: "Complete Deconsolidation & Generate Putaway WTs",
          description: "Operator clicks 'Complete Deconsolidation'. System creates 2 separate Putaway WTs for Destination HUs.",
          sapAction: "Close & Release HUs",
          tcode: "/SCWM/DCONS",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/HUHDR"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Work Center", description: "Deconsolidation station (Table /SCWM/TWORKC)" },
        { objectType: "Transactional Object", name: "Source Handling Unit", description: "Incoming mixed supplier pallet" },
        { objectType: "Transactional Object", name: "Destination Handling Unit", description: "New single-activity area putaway tote/box" }
      ],
      relatedTcodes: ["/SCWM/DCONS", "/SCWM/PACK", "/SCWM/WORKC", "/SCWM/MON"],
      fioriApps: [{ appId: "F3127", appName: "Deconsolidate Handling Units", fioriRole: "Deconsolidation Specialist" }],
      relatedTables: [
        { tableName: "/SCWM/TWORKC", description: "Work Centers", keyFields: ["MANDT", "LGNUM", "WORKCENTER"] },
        { tableName: "/SCWM/HUHDR", description: "Handling Units", keyFields: ["MANDT", "LGNUM", "HUIDENT"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Master Data -> Work Center -> Define Work Center",
        criticalSettings: [
          "Work Center Layout: /SCWM/DCONS standard screen layout",
          "Deconsolidation Threshold: Max items per HU before DECO is mandatory",
          "Default Inbound / Outbound Staging Bins for Work Center"
        ],
        mandatoryPrerequisites: ["Work Center Storage Type defined in /SCWM/T331"],
        commonPitfalls: ["Failing to assign an Outbound Staging Bin to the Work Center, preventing system from creating follow-up putaway tasks."]
      },
      realWorldBusinessExample: {
        companyContext: "Target Distribution Center (Indianapolis, IN)",
        scenario: "Overseas supplier ships mixed container containing electronics, kitchenware, and sporting goods on shared pallets. EWM routes pallets to 10 Deconsolidation stations.",
        businessOutcome: "Decon operators unpack and sort 800 items/hour into aisle-specific rolling totes, eliminating 14 miles of daily forklift deadhead travel."
      },
      industryExamples: {
        automotive: "Deconsolidating mixed supplier bins into specialized assembly line kitting trays.",
        aerospace: "Deconsolidating airframe fastener kits into barcoded bin cups.",
        pharma: "Deconsolidating temperature-monitored master cartons into clean-room storage totes.",
        food_beverage: "Deconsolidating mixed fruit pallet into ambient vs refrigerated bins.",
        mechanical: "Deconsolidating spare parts assortments into heavy drawer storage.",
        electronics: "Deconsolidating reel packs into automated vertical carousel trays.",
        retail: "Deconsolidating multi-SKU apparel boxes into store pick-faces.",
        cpg: "Deconsolidating promotional display kits.",
        logistics_3pl: "Deconsolidating multi-tenant freight for cross-dock sortation.",
        construction: "Deconsolidating hardware fittings into job bins.",
        industrial: "Deconsolidating pneumatic valve kits."
      },
      scenarioQuestion: {
        prompt: "When does SAP EWM automatically decide that an incoming Handling Unit MUST undergo Deconsolidation instead of direct putaway?",
        options: [
          "When the products or quantities packed inside the HU are destined for more than one distinct Activity Area or Storage Type, or when the HU exceeds the configured maximum item threshold.",
          "When the truck arrives after 5:00 PM.",
          "When the vendor has an open credit memo.",
          "When the purchasing document is a contract."
        ],
        correctIndex: 0,
        explanation: "EWM compares the destination Activity Areas of all items on the incoming HU. If items must go to different Activity Areas, or if the number of items exceeds the Deconsolidation threshold in customizing, EWM sets the POSC step to DECO."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Work Center 8010 has no destination bin for follow-up putaway",
          errorCode: "DECO-BIN-01",
          rootCause: "Work Center definition in /SCWM/WORKC is missing Outbound Section/Bin assignment.",
          solutionSteps: [
            "Open transaction /SCWM/WORKC.",
            "Select Warehouse W001 and Work Center 8010.",
            "Maintain valid Outbound Bin (e.g. 8010-OUT).",
            "Save customizing."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "How do you complete Deconsolidation in /SCWM/DCONS and what happens to the inventory quants in the background?",
          keyPoints: ["Transfer items from Source HU to Destination HU", "Click Complete Deconsolidation", "System creates Putaway WT for each Destination HU and clears Source HU"],
          sampleAnswer: "In transaction /SCWM/DCONS, the operator scans the Source HU, creates Destination HUs, and transfers items. Clicking 'Complete Deconsolidation' updates the HU hierarchy, changes the HU status from 'In Deconsolidation' to 'Deconsolidation Completed', and triggers the next POSC step (PTWY) by generating putaway warehouse tasks for each destination HU."
        }
      ],
      consultantChallenge: {
        title: "Automated Conveyor Loop Deconsolidation Station Integration",
        clientRequirement: "Client wants automated conveyor diverts: Pallet arrives at sensor -> Scanner detects mixed SKUs -> Diverts pallet to Decon Spur 1. If single SKU -> Diverts pallet directly to AS/RS High-Bay elevator.",
        architecturalOptions: [
          {
            optionName: "Option A: Combine EWM MFS (Material Flow System) with POSC Deconsolidation Determination",
            pros: ["100% automated physical routing on conveyor loop", "Reduces conveyor congestion by 30%", "Sub-second PLC telegram processing"],
            cons: ["Requires configuring MFS Communication Points and Telegram structures (/SCWM/MFS)"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure MFS Communication Point decision rule. EWM checks if incoming HU requires POSC step DECO. If true, MFS sends telegram directing divert to Decon Spur 1; otherwise sends telegram to AS/RS infeed."
      }
    }
  },
  {
    id: "ewm-vas-inbound",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Value Added Services",
    title: "Value Added Services (VAS) Inbound Execution (/SCWM/VAS_I)",
    subtitle: "Kitting, special labeling, ticketing, security tagging, and customer-specific packaging in automated distribution centers.",
    level: "CONSULTANT",
    tags: ["VAS", "Value Added Services", "Kitting", "Special Labeling", "VAS Order", "/SCWM/VAS_I", "/SCWM/VASEXEC", "Work Center"],
    relatedTopics: ["ewm-posc-inbound", "ewm-packspec-config", "ewm-deconsolidation"],
    ewmMonitorNode: "Work Centers / Value Added Services",
    configurationView: {
      prerequisites: ["Packaging Specifications with VAS Work Steps created", "VAS Work Center defined in /SCWM/TWORKC"],
      configObjects: ["VAS Order Template", "Relevance for VAS in Inbound Delivery", "POSC Step VAS"],
      determinationLogic: [
        "1. Packaging Specification contains Work Steps (e.g. Apply RFID Security Tag).",
        "2. Inbound Delivery creation evaluates PackSpec and automatically generates a VAS Order (/SCWM/VAS_I).",
        "3. POSC routes the HU to VAS Work Center (Step VAS).",
        "4. Operator executes work instructions in /SCWM/VASEXEC and confirms VAS Order."
      ],
      assignmentSteps: [
        "1. Define VAS Work Center in SPRO under Master Data -> Work Center.",
        "2. Configure Packaging Specification with Work Steps in /SCWM/PACKSPEC.",
        "3. Define VAS Order Number Ranges and Document Types.",
        "4. Assign Storage Process with step VAS to Warehouse Process Type."
      ],
      executionSteps: [
        "Inbound Delivery generates VAS Order automatically",
        "Confirm WT to VAS Work Center",
        "Execute and complete VAS Order in /SCWM/VASEXEC",
        "EWM generates follow-up Putaway WT"
      ],
      testingProcedure: ["Create Inbound Delivery and verify VAS Order appears in /SCWM/MON.", "Complete VAS Order and verify step completion."],
      troubleshooting: ["Error: VAS Order not created -> Check PackSpec Work Step assignment and VAS relevance in Delivery Document Type."]
    },
    pedagogy: {
      beginnerExplanation: "Value Added Services (VAS) is warehouse customization work done before goods hit the shelf or customer. Examples include sewing retail price tags onto shirts, gluing warning stickers onto electronics, assembling 3-in-1 holiday gift sets, or putting tamper-evident holographic seals on perfume bottles. EWM manages these work orders digitally!",
      formalDefinition: "Value Added Services (VAS) in SAP EWM coordinates operational activities such as labeling, kitting, assembling, customer-specific packaging, and quality certification. Managed via VAS Orders (/SCWM/VAS_I) and executed at VAS Work Centers (/SCWM/VASEXEC), VAS integrates directly with POSC to govern intermediate material movement.",
      whyUsed: [
        "Provides standardized, auditable work instructions to warehouse operators",
        "Tracks labor time, auxiliary material consumption, and VAS completion status",
        "Ensures compliance with major retail vendor compliance manuals (e.g. Walmart, Amazon labeling)",
        "Automates intermediate routing through POSC without manual task creation"
      ],
      howItWorks: [
        "Packaging Specification defines Level Work Steps (e.g. 'Affix Warning Label XYZ-123').",
        "Upon Inbound Delivery creation, EWM generates a VAS Order linked to the delivery items.",
        "POSC routes the incoming HU to the VAS Work Center (External Step VAS).",
        "Operator opens /SCWM/VASEXEC, reads digital work instructions, applies labels, and clicks 'Confirm VAS'.",
        "Confirming the VAS Order updates the POSC step and automatically generates the putaway warehouse task to the final storage bin."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Work Steps in Packaging Specification",
          description: "In /SCWM/PACKSPEC, add Work Step 'LBL_FRAGILE' with detailed instructions.",
          sapAction: "PackSpec VAS Maintenance",
          tcode: "/SCWM/PACKSPEC",
          tablesUpdated: ["/SCWM/TPS_WRKSTP"]
        },
        {
          stepNumber: 2,
          title: "Automatic VAS Order Generation",
          description: "Inbound Delivery creation evaluates PackSpec and auto-generates VAS Order 500012.",
          sapAction: "VAS Order Creation",
          tcode: "/SCWM/PRDI",
          tablesUpdated: ["/SCWM/VAS_HDR", "/SCWM/VAS_ITM"]
        },
        {
          stepNumber: 3,
          title: "Route HU to VAS Work Center via POSC",
          description: "POSC generates WT moving pallet from Receiving Dock to VAS Station 8030.",
          sapAction: "Move to VAS Station",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "Execute & Confirm VAS Order",
          description: "Operator performs labeling in /SCWM/VASEXEC, confirms work. System triggers Putaway WT.",
          sapAction: "VAS Execution Confirmation",
          tcode: "/SCWM/VASEXEC",
          tablesUpdated: ["/SCWM/VAS_HDR", "/SCWM/ORDIM_O"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Object", name: "VAS Order", description: "Execution document containing work steps and status (Table /SCWM/VAS_HDR)" },
        { objectType: "Master Data", name: "Work Step", description: "Standardized operational instruction in PackSpec" },
        { objectType: "Master Data", name: "VAS Work Center", description: "Physical workbench for labeling/kitting" }
      ],
      relatedTcodes: ["/SCWM/VAS_I", "/SCWM/VAS_O", "/SCWM/VASEXEC", "/SCWM/PACKSPEC", "/SCWM/MON"],
      fioriApps: [{ appId: "F3128", appName: "Execute Value Added Services", fioriRole: "VAS Specialist" }],
      relatedTables: [
        { tableName: "/SCWM/VAS_HDR", description: "VAS Order Header", keyFields: ["MANDT", "LGNUM", "VAS_ID"] },
        { tableName: "/SCWM/VAS_ITM", description: "VAS Order Items & Work Steps", keyFields: ["MANDT", "LGNUM", "VAS_ID", "ITEM_NO"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Value-Added Services (VAS)",
        criticalSettings: [
          "Define Number Ranges for VAS Orders",
          "Assign VAS Relevance to Inbound Delivery Item Types",
          "Work Center Layout configured for /SCWM/VASEXEC"
        ],
        mandatoryPrerequisites: ["Packaging Specifications with active Work Steps"],
        commonPitfalls: ["Forgetting to assign the VAS Order Type in Delivery Customizing, preventing automatic VAS Order generation."]
      },
      realWorldBusinessExample: {
        companyContext: "Zara / Inditex Fashion Logistics",
        scenario: "Zara receives 50,000 blazers from Turkey. Inbound VAS Order triggers Work Center 8030: 1) Attach security anti-theft ink tags, 2) Apply euro price barcode stickers, 3) Place on wooden display hangers.",
        businessOutcome: "Garments arrive at retail stores 100% floor-ready, allowing instant display on retail racks within 5 minutes of store truck arrival."
      },
      industryExamples: {
        automotive: "Applying custom VIN barcode labels and rust-inhibitor spray to transmission gears.",
        aerospace: "Applying laser-etched 2D DataMatrix UID tags to titanium aircraft components.",
        pharma: "Applying localized multilingual dosage instructions and tamper-evident holographic seals.",
        food_beverage: "Applying promotional 'Buy 1 Get 1 Free' neck collars onto wine bottles.",
        mechanical: "Applying corrosion-proof plastic dip coating to threaded fittings.",
        electronics: "Flashing country-specific firmware onto smart home routers at receiving dock.",
        retail: "Sewing localized retail brand tags onto imported clothing.",
        cpg: "Shrink-wrapping multi-packs with promotional coupon inserts.",
        logistics_3pl: "Applying customer-specific retail compliance shipping labels.",
        construction: "Applying reflective safety markings to scaffolding tubes.",
        industrial: "Assembling valve repair kits containing 8 O-rings and lubricant grease pack."
      },
      scenarioQuestion: {
        prompt: "A company wants EWM to automatically create a VAS Order whenever an Inbound Delivery contains products requiring special labeling. What two components are mandatory in master data and customizing?",
        options: [
          "An active Packaging Specification containing the required Work Step, and Inbound Delivery Item Type customizing with VAS Relevance activated.",
          "A vendor invoice and a purchase requisition.",
          "A plant maintenance order and equipment master.",
          "A production version and routing."
        ],
        correctIndex: 0,
        explanation: "VAS Orders are generated by the delivery engine evaluating the Packaging Specification. The PackSpec must contain the Work Step, and the Delivery Item Type must be configured as 'Relevance for VAS' in SPRO."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: VAS Order status remains 'Open' preventing final putaway",
          errorCode: "VAS-STAT-01",
          rootCause: "Operator forgot to click 'Complete VAS' in transaction /SCWM/VASEXEC.",
          solutionSteps: [
            "Open transaction /SCWM/VASEXEC or /SCWM/MON -> Value-Added Services.",
            "Select the active VAS Order.",
            "Confirm all work steps are checked green and click 'Complete'.",
            "Verify follow-up Putaway WT is created in /SCWM/MON."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "How does Kit-to-Stock differ from Kit-to-Order in SAP EWM Value Added Services?",
          keyPoints: ["Kit-to-Stock creates finished kits in warehouse inventory based on Production Order; Kit-to-Order creates kits during outbound picking based on Sales Order"],
          sampleAnswer: "Kit-to-Stock is an inventory-building process where component materials are issued and assembled into a finished Kit header product in warehouse stock (triggered by a Production Order or ERP Kit Order). Kit-to-Order is a customer-demand-driven process where components are picked individually and assembled at a VAS Work Center during outbound sales order processing before packing and shipping."
        }
      ],
      consultantChallenge: {
        title: "Dynamic High-Speed Kitting-on-the-Fly Architecture",
        clientRequirement: "A cosmetic client sells promotional beauty boxes containing 5 items. The components arrive from 5 different suppliers. Management wants to assemble 20,000 holiday kits in 3 days using temporary seasonal workers with zero SAP system experience.",
        architecturalOptions: [
          {
            optionName: "Option A: Design Simplified Fiori VAS App (F3128) with Barcode Poka-Yoke Validation",
            pros: ["Touchscreen interface with pictorial work instructions", "100% barcode verification ensures zero missing items in kit", "Seasonal worker training time reduced from 4 hours to 5 minutes"],
            cons: ["Requires Fiori Launchpad setup and barcode verification profile in SPRO"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Deploy SAP Fiori 'Execute Value Added Services' (F3128). Configure Packaging Specification with pictorial step attachments. Enforce scan verification for each of the 5 components before allowing kit completion."
      }
    }
  },
  {
    id: "ewm-losc",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Layout-Oriented Storage Control",
    title: "Layout-Oriented Storage Control (LOSC) & Material Flow (/SCWM/IMG)",
    subtitle: "Physical routing constraints, conveyor loops, elevators, pick points, and the architectural interplay between POSC and LOSC.",
    level: "CONSULTANT",
    tags: ["LOSC", "Layout-Oriented Storage Control", "Conveyor", "Elevator", "Intermediate Bin", "Pick Point", "MFS", "/SCWM/IMG"],
    relatedTopics: ["ewm-posc-inbound", "ewm-robotics-automation", "ewm-intelligent-putaway"],
    ewmMonitorNode: "Material Flow System / Warehouse Tasks",
    configurationView: {
      prerequisites: ["Intermediate Storage Types (Conveyor Infeed, Elevator, Crane Pick Point) defined", "Physical warehouse layout mapped"],
      configObjects: ["Layout-Oriented Storage Control Table (/SCWM/TLOSC)", "Intermediate Storage Sections and Bins"],
      determinationLogic: [
        "1. When a WT is created from Source Storage Type 'A' to Destination Storage Type 'B', EWM checks table /SCWM/TLOSC.",
        "2. If an intermediate hop is defined (e.g. Hop 1: Staging -> Conveyor Infeed 0090), EWM splits movement into physical sub-tasks.",
        "3. Confirming task 1 at Intermediate Bin automatically creates task 2 to final bin."
      ],
      assignmentSteps: [
        "1. Define Intermediate Storage Types (e.g. 0090 Conveyor Infeed, 0095 Crane Pick Point) in SPRO.",
        "2. Define Intermediate Bins in /SCWM/LS01N.",
        "3. Configure table /SCWM/TLOSC entering: Source Type + Destination Type + Intermediate Bin + Warehouse Process Type for follow-up.",
        "4. Test movement from Source to Destination."
      ],
      executionSteps: [
        "Create Putaway WT from Staging to High Rack",
        "System forces Destination Bin to be Conveyor Infeed (Intermediate Bin)",
        "Forklift confirms pallet to Conveyor Infeed",
        "Automatic crane/conveyor confirms next leg to High-Bay bin"
      ],
      testingProcedure: ["Create task and verify intermediate bin is populated in /SCWM/ORDIM_O.", "Confirm first leg and verify second leg activates."],
      troubleshooting: ["Error: Intermediate bin full -> Configure dynamic LOSC routing or buffer zones."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you want to drive your car from England to France. You can't drive across the ocean! You must drive to Dover (Intermediate Hop 1), put your car on the Eurotunnel Train (Intermediate Hop 2), cross the channel to Calais, and then drive to Paris (Final Destination). LOSC is SAP EWM's navigation system that handles physical physical obstacles like conveyors, elevators, and cranes!",
      formalDefinition: "Layout-Oriented Storage Control (LOSC) in SAP EWM manages physical transport constraints and routing through intermediate storage locations (e.g. Conveyor Infeeds, Elevators, High-Bay Pick Points, AGV Transfer Stations). When moving from Source to Destination is physically impossible in a single direct movement, LOSC splits the movement into sequential sub-tasks (/SCWM/TLOSC).",
      whyUsed: [
        "Models real-world automated material handling systems (AS/RS, Conveyor Networks, Spiral Chutes)",
        "Prevents forklifts from attempting direct delivery into automated crane-only aisles",
        "Enables multi-modal warehouse transportation (Forklift -> Conveyor -> Crane -> AMR)",
        "Works seamlessly in tandem with POSC business process steps"
      ],
      howItWorks: [
        "In table /SCWM/TLOSC, a rule states: When moving from Source Type 9020 (Receiving Staging) to Destination Type 0010 (High Rack), route through Intermediate Bin 'CONV-IN-01' in Storage Type 0090.",
        "When putaway WT is created, EWM sets the WT destination to 'CONV-IN-01'.",
        "Forklift driver drops pallet at 'CONV-IN-01' and confirms WT.",
        "Upon confirmation, EWM automatically creates Leg 2 WT (from 'CONV-IN-01' to High-Rack Bin '01-14-03') executed by the automated stacker crane."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Intermediate Storage Types & Bins",
          description: "Create Storage Type 0090 (Conveyor Infeed) and bin 'IN-FEED-01'.",
          sapAction: "Storage Type Customizing",
          tcode: "/SCWM/IMG / /SCWM/LS01N",
          tablesUpdated: ["/SCWM/T331", "/SCWM/LAGP"]
        },
        {
          stepNumber: 2,
          title: "Configure LOSC Routing Table in SPRO",
          description: "Maintain entry: Whse W001, Source Type 9020, Dest Type 0010 -> Intermediate Bin 'IN-FEED-01'.",
          sapAction: "LOSC Matrix Definition",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TLOSC"]
        },
        {
          stepNumber: 3,
          title: "Warehouse Task Creation with Intermediate Hop",
          description: "System creates WT. Destination is automatically set to Intermediate Bin 'IN-FEED-01'.",
          sapAction: "WT Generation",
          tcode: "/SCWM/TODET_I",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "Confirmation of Leg 1 & Auto-Trigger of Leg 2",
          description: "Forklift confirms Leg 1 to Infeed. System auto-generates Leg 2 to High Rack for Crane execution.",
          sapAction: "Leg Progression",
          tcode: "/SCWM/RFUI / MFS",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/ORDIM_O"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "LOSC Table", description: "Source-to-Destination routing rules (Table /SCWM/TLOSC)" },
        { objectType: "Master Data", name: "Intermediate Storage Bin", description: "Conveyor infeed, elevator, or pick point coordinate" },
        { objectType: "Sub-System", name: "Material Flow System (MFS)", description: "PLC communication interface for automated conveyors" }
      ],
      relatedTcodes: ["/SCWM/TLOSC", "/SCWM/MFS", "/SCWM/MON", "/SCWM/LS01N"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor", fioriRole: "Warehouse Supervisor" }],
      relatedTables: [
        { tableName: "/SCWM/TLOSC", description: "Layout-Oriented Storage Control", keyFields: ["MANDT", "LGNUM", "SRC_LGTYP", "DST_LGTYP"] },
        { tableName: "/SCWM/ORDIM_O", description: "Open Warehouse Tasks (Shows Intermediate Bins)", keyFields: ["MANDT", "LGNUM", "TANUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Storage Control -> Layout-Oriented Storage Control",
        criticalSettings: [
          "Intermediate Storage Type and Bin definition",
          "Warehouse Process Type for follow-up leg (e.g. Crane WPT 1011)",
          "Whole-HU vs Partial-Quantity movement rules"
        ],
        mandatoryPrerequisites: ["Intermediate Storage Bins created in /SCWM/LS01N"],
        commonPitfalls: ["Configuring circular LOSC routes (A -> B -> A), causing endless recursive task creation loops."]
      },
      realWorldBusinessExample: {
        companyContext: "Audi Automated Logistics Center (Ingolstadt)",
        scenario: "Audi operates a 40-meter high automated AS/RS high-bay warehouse. Forklifts cannot physically enter the crane aisles. LOSC routes incoming engine pallets from Receiving -> Conveyor Infeed 01 -> Crane Pick Point -> AS/RS Bin.",
        businessOutcome: "Zero forklift-crane collisions, 100% automated pallet intake at 240 pallets/hour."
      },
      industryExamples: {
        automotive: "Forklift drops body panels at elevator infeed -> Elevator moves to 2nd floor -> AGV picks up.",
        aerospace: "High-security clean room pass-through airlock managed as LOSC intermediate bin.",
        pharma: "Cold chain automated spiral conveyor loop connecting freezer to ambient packaging.",
        food_beverage: "Automated pallet monorail transport connecting production bottling plant to warehouse.",
        mechanical: "Heavy transfer car moving 10-ton dies across factory bays.",
        electronics: "Vertical lift module (VLM) tray infeed buffer.",
        retail: "Overhead garment-on-hanger (GOH) monorail transport.",
        cpg: "Automated pallet wrapper infeed conveyor.",
        logistics_3pl: "Mezzanine freight elevator intermediate routing.",
        construction: "Outdoor gantry crane transfer station.",
        industrial: "Automated guided vehicle transfer spur."
      },
      scenarioQuestion: {
        prompt: "A warehouse implements both POSC (Process-Oriented) and LOSC (Layout-Oriented). When a warehouse task is created to move an HU from Deconsolidation (POSC Step DECO) to High-Rack (POSC Step PTWY), which storage control rule takes precedence?",
        options: [
          "POSC determines WHAT business step to do next (PTWY to High Rack), and LOSC determines HOW to physically get there (routing through intermediate Conveyor Infeed).",
          "LOSC deletes the POSC steps.",
          "POSC overrides and disables LOSC completely.",
          "The system randomly chooses between POSC and LOSC."
        ],
        correctIndex: 0,
        explanation: "POSC and LOSC work in a nested hierarchy. POSC determines the overarching business process steps (e.g. move from DECO Work Center to final High-Rack Storage Type). For that specific POSC movement, LOSC checks if physical intermediate hops (e.g. Conveyor Infeed) are required to complete the transit."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Warehouse Task created with wrong intermediate bin coordinate",
          errorCode: "LOSC-ROUT-01",
          rootCause: "Generic entry in /SCWM/TLOSC matching before specific source/destination rule.",
          solutionSteps: [
            "Open SPRO -> Cross-Process Settings -> Storage Control -> Define Layout-Oriented Storage Control.",
            "Verify the sequence of rules for Warehouse W001.",
            "Ensure specific Source Storage Type + Destination Storage Type entry exists with exact intermediate bin."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "How does EWM handle task confirmation when an intermediate bin in an LOSC chain is blocked or occupied?",
          keyPoints: ["EWM Material Flow System (MFS) exception handling", "Dynamic alternative intermediate bin routing or task postponement"],
          sampleAnswer: "When an intermediate conveyor infeed bin is blocked, EWM can be configured with alternative intermediate routing in /SCWM/TLOSC, or the Material Flow System (MFS) raises an exception telegram (e.g. ''Conveyor Optical Sensor Blocked''). EWM holds Leg 2 task creation and diverts incoming pallets to an overflow buffer lane until the infeed bin clears."
        }
      ],
      consultantChallenge: {
        title: "Multi-Floor Mezzanine Vertical Elevator Routing Architecture",
        clientRequirement: "An e-commerce distribution center has 4 mezzanine floors. Pickers on Floor 3 pick eaches into totes. Completed totes must be routed down a vertical spiral elevator to Ground Floor Packing. If Spiral Elevator 1 is down for maintenance, system must dynamically failover to Spiral Elevator 2.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure Multi-Hop LOSC with MFS Dynamic Alternate Intermediate Bins and Resource Exception Handling",
            pros: ["100% automated elevator failover", "Zero line stoppages during maintenance", "Real-time PLC telegram monitoring in /SCWM/MON"],
            cons: ["Requires full MFS configuration and PLC handshake testing"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure LOSC rules for Floor 3 to Ground Floor. Assign primary intermediate bin 'ELEV-01' and secondary failover bin 'ELEV-02'. Enable MFS telegram error exception code to re-route active WTs upon sensor fault."
      }
    }
  },
  {
    id: "ewm-robotics-automation",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Robotics & AGV/AMR",
    title: "Robotics Integration, AGVs & AMRs in SAP EWM (/SCWM/MFS)",
    subtitle: "Autonomous Mobile Robots (AMR), Automated Guided Vehicles (AGV), Material Flow System (MFS), and touchless warehouse execution.",
    level: "CONSULTANT",
    tags: ["Robotics", "AGV", "AMR", "Autonomous Mobile Robots", "MFS", "Material Flow System", "Smart Warehouse", "Industry 4.0", "/SCWM/MFS"],
    relatedTopics: ["ewm-losc", "ewm-posc-inbound", "ewm-wocr-advanced-outbound", "ewm-intelligent-putaway"],
    ewmMonitorNode: "Material Flow System / Telegrams",
    processDiagram: {
      title: "SAP EWM to AMR Fleet Manager Telegram Architecture",
      nodes: [
        { id: "1", label: "EWM Warehouse Task Created", system: "EWM", tcode: "/SCWM/TODET_I", description: "Task generated for pallet movement" },
        { id: "2", label: "EWM MFS Telegram Generator", system: "EWM MFS", tcode: "/SCWM/MFS", description: "Builds Move Order Telegram (MOVE_REQ)" },
        { id: "3", label: "TCP/IP Socket Interface", system: "Interface", tcode: "SM59", description: "Transmits binary/JSON telegram to Fleet Manager" },
        { id: "4", label: "AMR Fleet Manager (ROS/REST)", system: "Robotics Fleet", tcode: "Fleet API", description: "Dispatches nearest robot to pickup coordinates" },
        { id: "5", label: "Robot Executes Physical Move", system: "AMR Hardware", tcode: "SLAM Lidar", description: "Navigates warehouse avoiding obstacles" },
        { id: "6", label: "Confirmation Telegram Received", system: "EWM MFS", tcode: "/SCWM/MON", description: "EWM confirms Warehouse Task automatically" }
      ]
    },
    configurationView: {
      prerequisites: ["EWM MFS License & SPRO activated", "PLC / Fleet Manager TCP/IP RFC destination configured in SM59"],
      configObjects: ["Programmable Logic Controller (PLC) Master (/SCWM/T313G)", "Communication Points (/SCWM/T313P)", "Telegram Structure Types (/SCWM/T313S)"],
      determinationLogic: [
        "1. Resource Type 'AMR' assigned to EWM MFS PLC.",
        "2. Warehouse Task assigned to AMR Queue.",
        "3. MFS triggers Function Module /SCWM/MFS_TELEGRAM_CREATE.",
        "4. Fleet Manager receives coordinates (Source Bin X/Y/Z -> Destination Bin X/Y/Z) and executes."
      ],
      assignmentSteps: [
        "1. Define PLC in SPRO under Extended Warehouse Management -> Material Flow System (MFS).",
        "2. Define Communication Points, Conveyor Segments, and Telegram Buffer.",
        "3. Define Resource Type 'AMR' and assign to PLC.",
        "4. Configure Telegram handshake (MOVE_REQ, MOVE_ACK, TASK_CONFIRM)."
      ],
      executionSteps: [
        "Create Putaway/Picking WT assigned to AMR Queue",
        "EWM MFS transmits telegram to Robot Fleet Manager",
        "Robot executes physical transport",
        "EWM receives completion telegram and confirms task"
      ],
      testingProcedure: ["Simulate telegram exchange via /SCWM/MFS_SIM.", "Check Telegram Buffer in /SCWM/MON -> Material Flow System."],
      troubleshooting: ["Error: Telegram timeout -> Check TCP/IP socket connection in SM59 and Fleet Manager listener port."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine hailing an Uber, but for warehouse boxes! In a smart warehouse, instead of a human forklift driver driving down the aisle, SAP EWM sends a digital dispatch message to a fleet of autonomous mobile robots (AMRs). The robot glides across the floor, slides underneath a pallet, lifts it with hydraulic lifters, navigates around humans using laser radar (LIDAR), and drops it off at the packing station!",
      formalDefinition: "Robotics and AGV/AMR Integration in SAP EWM connects Autonomous Guided Vehicles (AGVs) and Autonomous Mobile Robots (AMRs) to the warehouse execution engine via the SAP EWM Material Flow System (MFS) or direct REST/WebSocket APIs (SAP Warehouse Robotics). EWM dispatches Warehouse Tasks as machine-readable telegrams and receives real-time confirmation upon physical delivery.",
      whyUsed: [
        "Achieves 24/7 continuous lights-out warehouse operations with zero human fatigue",
        "Increases picking productivity by 300% via Goods-to-Person (G2P) robotic delivery",
        "Eliminates forklift accidents and product damage via precision SLAM LIDAR navigation",
        "Dynamically scales fleet capacity during peak seasons without permanent labor overhead"
      ],
      howItWorks: [
        "TYPES OF ROBOTS:",
        "1. AGV (Automated Guided Vehicle): Follows fixed magnetic floor strips, optical QR codes, or wire tracks.",
        "2. AMR (Autonomous Mobile Robot): Uses LiDAR, SLAM navigation, and 3D cameras to dynamically map routes and dodge moving obstacles.",
        "3. Goods-to-Person (G2P) Robots: Carry entire high-density storage pods directly to stationary human pickers.",
        "4. Autonomous Forklifts (AFRs): High-reach automated mast trucks for 15-meter rack putaway.",
        "WORKFLOW: Warehouse Order created -> Assigned to AMR Resource Queue -> EWM MFS sends Telegram (Source/Dest Coordinates) -> Robot navigates -> Robot confirms -> EWM closes Warehouse Task."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define PLC & Communication Channel in SPRO",
          description: "Configure PLC 'AMR_FLEET_01' with TCP/IP connection parameters in /SCWM/MFS.",
          sapAction: "PLC Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/T313G"]
        },
        {
          stepNumber: 2,
          title: "Define AMR Resource & Resource Group",
          description: "Create Resource Type 'ROBOT_AMR' and assign to Resource Group 'AMR_GRP'.",
          sapAction: "Resource Setup",
          tcode: "/SCWM/RSRC",
          tablesUpdated: ["/SCWM/RSRC"]
        },
        {
          stepNumber: 3,
          title: "Warehouse Task Creation & Telegram Dispatch",
          description: "WT created for outbound picking. MFS converts WT into machine telegram MOVE_REQ and transmits via socket.",
          sapAction: "Telegram Transmission",
          tcode: "/SCWM/MON",
          tablesUpdated: ["/SCWM/MFSTEL"]
        },
        {
          stepNumber: 4,
          title: "Robotic Execution & Automatic Task Confirmation",
          description: "Robot navigates to bin, picks pallet, drops at Staging Bay. Sends CONFIRM telegram; EWM confirms WT.",
          sapAction: "Atomic Confirmation",
          tcode: "/SCWM/MON",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "System Module", name: "Material Flow System (MFS)", description: "Direct sub-second PLC/Robotics communication layer" },
        { objectType: "Master Data", name: "PLC Master", description: "Robot Fleet Controller definition (Table /SCWM/T313G)" },
        { objectType: "Master Data", name: "Communication Point", description: "Pickup and dropoff waypoint coordinate in EWM" }
      ],
      relatedTcodes: ["/SCWM/MFS", "/SCWM/MFS_SIM", "/SCWM/MON", "/SCWM/RSRC", "/SCWM/IMG"],
      fioriApps: [
        { appId: "F2064", appName: "Warehouse Monitor - MFS Telegrams", fioriRole: "Automation Engineer" }
      ],
      relatedTables: [
        { tableName: "/SCWM/T313G", description: "PLC Master Records", keyFields: ["MANDT", "LGNUM", "PLC"] },
        { tableName: "/SCWM/MFSTEL", description: "MFS Telegram Buffer Log", keyFields: ["MANDT", "LGNUM", "PLC", "TDOBJ"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Material Flow System (MFS)",
        criticalSettings: [
          "Define Telegram Types (MOVE, ACK, CANCEL, STATUS)",
          "Sequence Number checking to prevent dropped telegrams",
          "Exception Codes for Robot Obstacle Blocked / Battery Low"
        ],
        mandatoryPrerequisites: ["TCP/IP connection configured in SM59 to Fleet Management Server"],
        commonPitfalls: [
          "Setting MFS telegram timeout too low, causing EWM to re-send duplicate dispatch commands while robot is mid-transit.",
          "Mismatched coordinate systems between EWM Storage Bin keys and Robot SLAM map coordinate frames."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "Amazon Robotics Fulfillment Center / Mercedes-Benz Factory 56",
        scenario: "Mercedes-Benz Factory 56 operates 300 AMRs integrated with SAP EWM. As soon as a car assembly stage is scheduled, EWM dispatches AMRs carrying steering wheels directly to the line-side mechanic.",
        businessOutcome: "100% paperless, zero-forklift shop floor with 99.98% on-time parts delivery."
      },
      industryExamples: {
        automotive: "AMRs delivering sequencing kitting carts to assembly line workers.",
        aerospace: "Heavy-payload omnidirectional AGVs transporting jet engines between test cells.",
        pharma: "Hermetically sealed clean-room AMRs moving sterile vials between isolators.",
        food_beverage: "Laser-guided automated forklift AGVs stacking heavy beverage pallets in dark warehouse.",
        mechanical: "Tugger AGVs pulling train of casting trailers.",
        electronics: "Cobot AMRs with robotic arms picking micro-components from bins.",
        retail: "Goods-to-Person (G2P) pods moving to pick stations during Black Friday surges.",
        cpg: "Automated pallet wrapper infeed AMR delivery.",
        logistics_3pl: "Shared AMR fleet dynamically partitioned across multi-client aisles.",
        construction: "Ruggedized outdoor yard AGVs for pipe transport.",
        industrial: "Automated battery charging swap stations integrated with EWM resource status."
      },
      scenarioQuestion: {
        prompt: "How does SAP EWM distinguish between tasks intended for human RF forklift drivers versus tasks intended for autonomous mobile robots (AMRs)?",
        options: [
          "Through Queue Determination and Resource Type assignment: tasks requiring robotic execution are assigned to an AMR Queue linked to an MFS PLC, while human tasks are assigned to RF Queues.",
          "Through material cost.",
          "Through customer postal code.",
          "Through the purchase order header text."
        ],
        correctIndex: 0,
        explanation: "Queue Determination criteria (Source/Dest Activity Area, WPT) routes tasks to specific Queues. Queues assigned to Resource Type 'AMR' trigger MFS telegram dispatch to the robot controller, while Queues assigned to Resource Type 'FORKLIFT' appear on human RF screens."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: AMR Telegram failed: No response from PLC within 3000ms",
          errorCode: "MFS-TIMEOUT-01",
          rootCause: "Network latency or Fleet Management Server socket listener down.",
          solutionSteps: [
            "Open /SCWM/MON -> Material Flow System -> Communication Channel.",
            "Verify Channel Status is 'Active' (Green). If red, click 'Restart Channel'.",
            "Test ping to Robot Fleet Manager IP in SM59.",
            "Resend failed telegram from MFS Telegram Buffer."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the architectural difference between SAP EWM MFS direct integration vs SAP Warehouse Robotics (cloud BTP service).",
          keyPoints: ["EWM MFS communicates directly via TCP/IP telegrams to PLCs on-premise; SAP Warehouse Robotics uses cloud ROS2 / REST APIs with standardized robot drivers"],
          sampleAnswer: "SAP EWM Material Flow System (MFS) is an on-premise sub-second telegram engine communicating directly over raw TCP/IP sockets to Programmable Logic Controllers (PLCs) and warehouse control systems (WCS). SAP Warehouse Robotics (built on SAP BTP) provides a modern cloud-native layer utilizing ROS2 (Robot Operating System) and standardized REST/WebSocket APIs to orchestrate diverse multi-vendor AMR fleets with minimal on-premise PLC coding."
        }
      ],
      consultantChallenge: {
        title: "Heterogeneous Multi-Vendor Robot Fleet Orchestration",
        clientRequirement: "A global logistics hub has 50 KUKA heavy-payload AGVs for full pallets and 120 Geek+ Goods-to-Person AMRs for small eaches. Both fleets must execute tasks dispatched from a single SAP EWM S/4HANA instance without operational overlap or gridlock.",
        architecturalOptions: [
          {
            optionName: "Option A: Segregate by Storage Type, Activity Area, and Dedicated MFS PLC Communication Channels with VDA 5050 Standard Protocol",
            pros: ["100% interoperability using industry-standard VDA 5050 AGV interface", "Independent queue scaling for heavy vs light tasks", "Zero vendor lock-in"],
            cons: ["Requires both fleet managers to support VDA 5050 connector"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure 2 PLCs in /SCWM/MFS: PLC_KUKA (Heavy Pallet Activity Area) and PLC_GEEK (G2P Small Parts Activity Area). Implement VDA 5050 JSON payload format over MQTT/WebSockets. Route tasks via Activity Area Queue Determination."
      }
    }
  },

  // =========================================================================
  // 7. OUTBOUND PROCESSING & INTELLIGENT PICKING
  // =========================================================================
  {
    id: "ewm-outbound-master-data",
    module: "EWM",
    category: "Outbound",
    subcategory: "Prerequisites & Master Data",
    title: "Outbound Master Data & Prerequisites (BP / AFS / Sales Views)",
    subtitle: "Customer Business Partner extension (FLCU00/FLCU01), Material Sales Views, AFS (Available for Sale) Storage Location mapping, and Shipping Points.",
    level: "BEGINNER",
    tags: ["Outbound Master Data", "Business Partner", "Customer Role", "AFS Storage Location", "Sales Views", "Shipping Point", "OVAL"],
    relatedTopics: ["ewm-outbound-process", "ewm-master-data", "ewm-scu-mapping"],
    ewmMonitorNode: "Master Data / Business Partner",
    configurationView: {
      prerequisites: ["ERP Sales Organization and Distribution Channels defined (OVX5)", "Shipping Point created (OVXD)"],
      configObjects: ["Customer Role (FLCU00 / FLCU01)", "Material Sales Views (MVKE)", "ERP Storage Location to EWM Mapping (/SCWM/TMAPSTLOC)"],
      determinationLogic: [
        "Customer BP must have Sales Area data maintained to allow Sales Order entry in VA01.",
        "Material must have Sales Org / Dist Channel views maintained and extend to AFS Storage Location (Availability Group 002).",
        "Shipping Point in ERP determines EWM Warehouse Number."
      ],
      assignmentSteps: [
        "1. Create Business Partner in transaction BP and extend to roles FLCU00 (FI Customer) and FLCU01 (Sales Customer).",
        "2. Extend Material Master in MM01 with Sales Views (Sales Org 1, Sales Org 2, Sales General/Plant).",
        "3. Map ERP Shipping Point to EWM Supply Chain Unit (SCU) in /SCMB/SCUMAP.",
        "4. Assign AFS Storage Location to Availability Group 002 in /SCWM/TMAPSTLOC."
      ],
      executionSteps: ["Verify Customer BP in transaction BP", "Check Material Sales & Plant views in MM03", "Create test Sales Order in VA01"],
      testingProcedure: ["Create Sales Order (VA01) and Outbound Delivery (VL01N) and verify EWM replication."],
      troubleshooting: ["Error: Customer not extended to Sales Area -> Open BP and add FLCU01 role.", "Error: Material not maintained in plant -> Extend in MM01."]
    },
    pedagogy: {
      beginnerExplanation: "Before you can ship a package from your warehouse to a customer, the system needs to know three foundational things: 1) Who is buying it and where do they live? (Customer Business Partner), 2) Are the goods commercially sellable and packed properly? (Material Sales Views), and 3) Is the stock in a bin that is cleared for shipping? (Available for Sale / AFS Storage Location).",
      formalDefinition: "Outbound Master Data and Prerequisites in SAP EWM establish the commercial and logistics master records required for order fulfillment. It encompasses Business Partner Customer roles (FLCU00/FLCU01), Material Sales & Plant views (MARA/MVKE/MARC), Shipping Point to SCU mapping, and the assignment of ERP Available for Sale (AFS) Storage Locations to EWM Availability Group 002.",
      whyUsed: [
        "Ensures sales orders can only be fulfilled from unrestricted, sellable inventory (AFS)",
        "Drives automatic Shipping Point and Warehouse Number determination during delivery creation",
        "Maintains customer-specific delivery terms, incoterms, and packaging preferences",
        "Enables qRFC replication of outbound delivery orders into EWM"
      ],
      howItWorks: [
        "Customer BP is extended with Sales Area data (Sales Org, Dist Channel, Division) and Shipping Conditions.",
        "Material Master is extended with Plant data and Sales Views, specifying Gross/Net weight and delivery plant.",
        "When a Sales Order is created in VA01, ERP checks ATP (Available to Promise) in the AFS storage location.",
        "Creating Outbound Delivery (VL01N) replicates the document to EWM via qRFC to create the Warehouse Request."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Extend Customer Business Partner",
          description: "In transaction BP, extend customer to FLCU01 (Customer) and maintain Sales Area & Shipping Conditions.",
          sapAction: "BP Extension",
          tcode: "BP",
          tablesUpdated: ["KNA1", "KNVV", "BUT000"]
        },
        {
          stepNumber: 2,
          title: "Maintain Material Sales & Plant Views",
          description: "In MM01, maintain Sales Org 1/2 and General Plant views with Shipping Point Group and Loading Group.",
          sapAction: "Material Extension",
          tcode: "MM01",
          tablesUpdated: ["MARA", "MVKE", "MARC"]
        },
        {
          stepNumber: 3,
          title: "Verify AFS Storage Location Mapping",
          description: "Verify Plant + Storage Location '1002' (AFS) is mapped to Availability Group '002' in EWM.",
          sapAction: "Storage Location Mapping Check",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TMAPSTLOC"]
        },
        {
          stepNumber: 4,
          title: "Create Test Sales Order & Outbound Delivery",
          description: "Execute VA01 and VL01N. Confirm delivery replicates to EWM /SCWM/PRDO.",
          sapAction: "Integration Smoke Test",
          tcode: "VA01 / VL01N",
          tablesUpdated: ["VBAK", "VBAP", "LIKP", "LIPS"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Customer Business Partner", description: "Ship-to party commercial entity (Table BUT000/KNA1)" },
        { objectType: "Master Data", name: "Material Sales Views", description: "Commercial sales & shipping parameters (Table MVKE)" },
        { objectType: "Customizing Object", name: "Shipping Point", description: "Logistics dispatch location in ERP (Table TVST)" }
      ],
      relatedTcodes: ["BP", "MM01", "MM02", "VA01", "VL01N", "/SCWM/PRDO", "/SCWM/TMAPSTLOC"],
      fioriApps: [{ appId: "F0842A", appName: "Manage Customer Master Data", fioriRole: "Master Data Specialist" }],
      relatedTables: [
        { tableName: "KNVV", description: "Customer Sales Data", keyFields: ["MANDT", "KUNNR", "VKORG", "VTWEG", "SPART"] },
        { tableName: "MVKE", description: "Material Sales Data", keyFields: ["MANDT", "MATNR", "VKORG", "VTWEG"] },
        { tableName: "/SCWM/TMAPSTLOC", description: "ERP SLoc to EWM Whse / Avail Group", keyFields: ["MANDT", "PLANT", "LGORT"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Integration with Other SAP Components -> Extended Warehouse Management -> Basic Settings for EWM Routing",
        criticalSettings: [
          "Shipping Point to Warehouse Number assignment",
          "Map Storage Location to Availability Group 002 (AFS)",
          "Customer Shipping Conditions (Standard, Express, Overnight)"
        ],
        mandatoryPrerequisites: ["ERP Sales Org, Dist Channel, Plant, and Shipping Point created"],
        commonPitfalls: ["Failing to extend Material Master to the AFS Storage Location (MARD), causing ATP check to fail in VA01."]
      },
      realWorldBusinessExample: {
        companyContext: "Apple Online Store Operations",
        scenario: "Apple sets up high-volume B2C customer master data with 1-Day Priority Express shipping conditions. Material Master for iPhone 16 is extended to Plant 1000, AFS SLoc 1002, and mapped to EWM Warehouse AP01.",
        businessOutcome: "Customer clicks 'Buy Now' -> Sales order instantly passes ATP -> Outbound delivery replicates to EWM in 400ms for wave picking."
      },
      industryExamples: {
        automotive: "OEM Customer BP linked to EDI 850 / 830 delivery schedule agreements.",
        aerospace: "Airline Customer BP requiring mandatory certificate of conformance (CoC).",
        pharma: "Hospital Customer BP with validated state pharmacy license and DEA registration.",
        food_beverage: "Supermarket Customer BP with strict pallet overhang and height restrictions.",
        mechanical: "Distributor BP requiring export wooden crating packaging view.",
        electronics: "Retailer BP with mandatory serial number capture on invoice requirement.",
        retail: "Store BP mapped to replenishment delivery type.",
        cpg: "Wholesaler BP requiring CHEP pallet exchange account.",
        logistics_3pl: "Client-specific customer master data partitioning.",
        construction: "Job-site contractor BP with specific delivery window instructions.",
        industrial: "Factory BP linked to consignment fill-up sales view."
      },
      scenarioQuestion: {
        prompt: "A sales clerk creates a Sales Order in VA01. However, when attempting to create the Outbound Delivery in VL01N, the system throws an error stating: 'No delivery-relevant items found'. What is the most probable cause in master data?",
        options: [
          "The Material Master is missing the Sales General/Plant view with Item Category Group (e.g. NORM) or the Delivery Plant is not maintained on the sales order line item.",
          "The vendor was not created.",
          "The company code has no profit center.",
          "The bank master is missing."
        ],
        correctIndex: 0,
        explanation: "For a line item to be delivery-relevant in ERP, the material master must have Item Category Group 'NORM' in the Sales General/Plant view, and the line item must have an active Delivery Plant and confirmed schedule line."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Customer not maintained in Sales Org 1000 Dist Channel 10",
          errorCode: "V1-234",
          rootCause: "Customer BP only exists in General role (000000) or FI role (FLCU00) without Sales Customer role (FLCU01).",
          solutionSteps: [
            "Open transaction BP.",
            "Switch to role FLCU01 (Customer).",
            "Click 'Sales and Distribution' button.",
            "Enter Sales Org 1000, Dist Channel 10, Division 00 and Save."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Basic",
          question: "Why must stock be moved from ROD to AFS in EWM before it can be picked for an outbound sales order?",
          keyPoints: ["ROD (001) is non-sellable receiving stock; AFS (002) is unrestricted, MRP-available sellable stock"],
          sampleAnswer: "In SAP EWM integration, the Received on Dock (ROD) storage location represents goods physically at the warehouse door that may still require putaway or inspection. The Available for Sale (AFS) storage location represents unrestricted inventory. The ERP ATP (Available to Promise) engine only commits stock from the AFS storage location for sales order picking."
        }
      ],
      consultantChallenge: {
        title: "Multi-Plant Outbound Sourcing from Single EWM Warehouse",
        clientRequirement: "A mega distribution center fulfills orders for 3 separate ERP Plants (Plant 1000 Automotive, Plant 2000 Aftermarket, Plant 3000 International). Management wants all 3 plants to share a single EWM Warehouse Number W001 without inventory commingling.",
        architecturalOptions: [
          {
            optionName: "Option A: Map All 3 ERP Plants to Warehouse W001 in /SCWM/TMAPSTLOC with Party Entitled to Dispose (PED) Segregation",
            pros: ["Single unified physical warehouse facility", "100% stock ownership transparency by legal plant", "Shared forklift fleet and wave management"],
            cons: ["Requires Party Entitled to Dispose maintenance on all product masters"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "In /SCWM/TMAPSTLOC, map Plant 1000, 2000, and 3000 to Warehouse W001. EWM tracks stock by Owner / Party Entitled to Dispose. Sales orders from Plant 1000 strictly consume Plant 1000 stock."
      }
    }
  },
  {
    id: "ewm-outbound-process",
    module: "EWM",
    category: "Outbound",
    subcategory: "Outbound Process Flow",
    title: "Complete Outbound Process Flow (SO -> OBD -> Pick -> Pack -> Stage -> Load -> PGI)",
    subtitle: "End-to-end outbound order fulfillment from Sales Order and Outbound Delivery replication to Warehouse Orders, Picking, Packing, Staging, Loading, and Post Goods Issue in SAP EWM.",
    level: "PROFESSIONAL",
    tags: ["Outbound Process", "Sales Order", "Outbound Delivery", "Warehouse Request", "Picking", "Packing", "Staging", "Loading", "PGI", "/SCWM/PRDO", "VL01N"],
    relatedTopics: ["ewm-outbound-master-data", "ewm-intelligent-picking", "ewm-wocr-advanced-outbound", "ewm-outbound-reversal"],
    ewmMonitorNode: "Outbound Deliveries / Outbound Delivery Orders",
    processDiagram: {
      title: "End-to-End Outbound Order Fulfillment Architecture",
      nodes: [
        { id: "1", label: "Sales Order (ERP)", system: "SD", tcode: "VA01", description: "Customer order booked" },
        { id: "2", label: "Outbound Delivery (ERP)", system: "LE-SHP", tcode: "VL01N", description: "Shipping document created" },
        { id: "3", label: "qRFC Replication to EWM", system: "Integration", tcode: "SMQ2", description: "Replicated to /SCWM/PRDO" },
        { id: "4", label: "Outbound Delivery Order (ODO)", system: "EWM", tcode: "/SCWM/PRDO", description: "Warehouse Request active" },
        { id: "5", label: "Wave Management & WOCR", system: "EWM", tcode: "/SCWM/WAVE", description: "Tasks grouped into Warehouse Orders" },
        { id: "6", label: "Picking Execution", system: "EWM", tcode: "/SCWM/RFUI", description: "Stock picked to Pick-HU" },
        { id: "7", label: "Packing & Shipping HU", system: "EWM", tcode: "/SCWM/PACK", description: "Shipping label applied" },
        { id: "8", label: "Staging & Loading", system: "EWM", tcode: "/SCWM/LOAD", description: "Loaded onto truck at Door 9030" },
        { id: "9", label: "Post Goods Issue (PGI)", system: "EWM", tcode: "/SCWM/PRDO", description: "Stock reduced, ERP updated" }
      ]
    },
    configurationView: {
      prerequisites: ["ERP Integration configured via qRFC", "Outbound Delivery Document Types mapped (LF -> OUTB / ODO)", "Warehouse Process Type 2010 defined"],
      configObjects: ["EWM Delivery Document Type (/SCDL/TDETDOC)", "Warehouse Process Type (/SCWM/TWPT)", "PPF Action Profile /SCWM/OUT_PRD"],
      determinationLogic: [
        "ERP Delivery Type 'LF' mapped to EWM Document Type 'OUTB' and Item Type 'OUTBI'.",
        "WPT 2010 determined based on Delivery Item Type + Process Type Determination Indicator.",
        "Picking WTs created from Stock Removal Strategies (FIFO/LIFO/Quantity)."
      ],
      assignmentSteps: [
        "1. Map ERP Delivery 'LF' to EWM 'OUTB' in SPRO Interfaces -> ERP Integration.",
        "2. Define Warehouse Process Type 2010 (Stock Removal).",
        "3. Configure Outbound POSC (Pick -> Pack -> Stage -> Load).",
        "4. Assign PPF Action Profile /SCWM/OUT_PRD to trigger auto-GI or shipping document print."
      ],
      executionSteps: [
        "Create Sales Order (VA01) & Outbound Delivery (VL01N)",
        "Open /SCWM/PRDO in EWM",
        "Create & confirm Picking WTs via RF",
        "Pack in /SCWM/PACK",
        "Confirm Staging and Loading (/SCWM/LOAD)",
        "Click 'Post Goods Issue' in /SCWM/PRDO"
      ],
      testingProcedure: ["Execute complete cycle from VA01 to /SCWM/PRDO PGI.", "Verify Goods Issue status updates in ERP VL03N."],
      troubleshooting: ["Error: Delivery not replicated -> Check SMQ2.", "Error: PGI blocked -> Verify all WTs confirmed and HUs loaded."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine ordering a laptop online. Step 1: Your order is booked (Sales Order). Step 2: The warehouse gets a picking slip (Outbound Delivery). Step 3: A picker walks to aisle 4 and takes the laptop from the shelf (Picking). Step 4: The laptop is put into a padded shipping box with bubble wrap and your address label (Packing). Step 5: The box is moved near loading dock door 5 (Staging). Step 6: It's loaded into the delivery truck (Loading). Step 7: The truck drives away, removing the laptop from inventory (Post Goods Issue). That's the Outbound Process!",
      formalDefinition: "Outbound Processing in SAP EWM coordinates the end-to-end shipping lifecycle. It begins with the replication of ERP Outbound Deliveries (/SCDL/DB_PROCH_O) into Outbound Delivery Requests (ODR) and Outbound Delivery Orders (ODO), followed by Wave release, Picking Warehouse Tasks (/SCWM/ORDIM_O), Packing (/SCWM/PACK), Staging (Storage Type 9020), Loading (/SCWM/LOAD), and Post Goods Issue (PGI) updating ERP financials and inventory.",
      whyUsed: [
        "Ensures 100% on-time, accurate fulfillment of customer sales orders",
        "Optimizes picking labor through wave bundling, batch picking, and zone picking",
        "Enforces barcode validation at packing and loading to eliminate shipping errors",
        "Updates ERP inventory, Cost of Goods Sold (COGS), and customer billing synchronously"
      ],
      howItWorks: [
        "Sales Order in ERP triggers Outbound Delivery (VL01N).",
        "Replicated to EWM as an Outbound Delivery Order (ODO / PRDO).",
        "ODO items are assigned to a Wave (/SCWM/WAVE).",
        "Wave release generates Picking Warehouse Tasks based on Stock Removal Strategies (FIFO).",
        "Operators pick items using RF scanners (/SCWM/RFUI) into Pick-HUs.",
        "Pick-HUs move to Pack Station (/SCWM/PACK) for consolidation into Shipping HUs with carrier labels.",
        "HUs move to Staging Bay (Storage Type 9020) and are loaded onto the truck (/SCWM/LOAD).",
        "Post Goods Issue (PGI) is posted, closing the delivery and updating S/4HANA stock."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Sales Order & Outbound Delivery in ERP",
          description: "Sales Order created (VA01). Delivery generated (VL01N) and replicated via qRFC.",
          sapAction: "ERP Delivery Creation",
          tcode: "VA01 / VL01N",
          tablesUpdated: ["VBAK", "LIKP", "LIPS"]
        },
        {
          stepNumber: 2,
          title: "Outbound Delivery Order in EWM",
          description: "EWM generates ODO document in /SCWM/PRDO. Status is 'Open for Execution'.",
          sapAction: "ODO Generation",
          tcode: "/SCWM/PRDO",
          tablesUpdated: ["/SCDL/DB_PROCH_O", "/SCDL/DB_PROCI_O"]
        },
        {
          stepNumber: 3,
          title: "Wave Release & Picking Task Creation",
          description: "Wave releases picking tasks. System finds FIFO stock and groups into Warehouse Orders.",
          sapAction: "Task Generation",
          tcode: "/SCWM/WAVE / /SCWM/TODET_O",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/WHO"]
        },
        {
          stepNumber: 4,
          title: "RF Picking & Packing",
          description: "Picker confirms items via /SCWM/RFUI into Pick-HU. Pack station packs into Shipping HU.",
          sapAction: "Pick & Pack",
          tcode: "/SCWM/RFUI / /SCWM/PACK",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/HUHDR"]
        },
        {
          stepNumber: 5,
          title: "Staging, Loading & Post Goods Issue (PGI)",
          description: "HU moved to Staging (9020), loaded to Door (9030), and PGI posted. Stock leaves warehouse.",
          sapAction: "PGI Posting",
          tcode: "/SCWM/PRDO / /SCWM/LOAD",
          tablesUpdated: ["/SCWM/AQUA", "LIKP", "MATDOC"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Object", name: "Outbound Delivery Order (ODO)", description: "Active execution warehouse request in EWM (Table /SCDL/DB_PROCH_O)" },
        { objectType: "Transactional Object", name: "Picking Warehouse Task", description: "Instruction to remove stock from rack to pick-HU (Table /SCWM/ORDIM_O)" },
        { objectType: "Transactional Object", name: "Shipping Handling Unit", description: "Outbound customer-labeled shipping box/pallet (Table /SCWM/HUHDR)" }
      ],
      relatedTcodes: ["/SCWM/PRDO", "/SCWM/WAVE", "/SCWM/PACK", "/SCWM/LOAD", "/SCWM/RFUI", "/SCWM/MON", "VL01N", "VA01"],
      fioriApps: [
        { appId: "F3129", appName: "Pick Outbound Deliveries", fioriRole: "Picker" },
        { appId: "F3125", appName: "Pack Outbound Deliveries", fioriRole: "Packer" }
      ],
      relatedTables: [
        { tableName: "/SCDL/DB_PROCH_O", description: "Outbound Delivery Order Header", keyFields: ["MANDT", "DOCID"] },
        { tableName: "/SCDL/DB_PROCI_O", description: "Outbound Delivery Order Items", keyFields: ["MANDT", "DOCID", "ITEMID"] },
        { tableName: "/SCWM/ORDIM_O", description: "Open Picking Tasks", keyFields: ["MANDT", "LGNUM", "TANUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Issue Process -> Outbound Delivery",
        criticalSettings: [
          "Document Type mapping (LF -> OUTB / ODO)",
          "Warehouse Process Type Determination (/SCWM/TWPT_DET)",
          "Automatic PGI upon Loading Confirmation setting"
        ],
        mandatoryPrerequisites: ["Material extended to AFS Storage Location", "Picking Strategies configured in SPRO"],
        commonPitfalls: ["Attempting to post PGI in /SCWM/PRDO while picking or loading warehouse tasks are still in status 'Open' (Yellow)."]
      },
      realWorldBusinessExample: {
        companyContext: "Cisco Systems Global Distribution",
        scenario: "Cisco ships 50 Enterprise Catalyst Switches to a European bank under Delivery 80004510. EWM creates ODO -> Wave release creates Picking WTs -> RF picker scans serial numbers at bin -> Pack station generates shipping labels -> Truck loaded at Door 12 -> PGI posted.",
        businessOutcome: "Total order-to-ship cycle time under 45 minutes with 100% serial number tracking."
      },
      industryExamples: {
        automotive: "Just-In-Time (JIT) sequence picking and loading directly into specialized carrier trailers.",
        aerospace: "Serialized aircraft avionics picking with mandatory dual-inspector sign-off before PGI.",
        pharma: "FEFO picking of refrigerated medicines packed in validated temperature-controlled shippers.",
        food_beverage: "Full pallet picking of perishable dairy with maximum shelf-life remaining validation.",
        mechanical: "Heavy crane picking of 5-ton machinery assemblies into export crates.",
        electronics: "High-value smartphone picking with automated 1D/2D IMEI barcode recording.",
        retail: "Multi-store wave batch picking with sortation on automated tilt-tray sorter.",
        cpg: "Full pallet cross-dock loading directly from receiving dock to outbound store truck.",
        logistics_3pl: "Carrier-partitioned staging lane assignment based on FedEx, UPS, and DHL routes.",
        construction: "Staging bundles of structural rebar at outdoor flatbed truck bays.",
        industrial: "Pick-and-pack fulfillment of field service repair kits."
      },
      scenarioQuestion: {
        prompt: "A warehouse operator tries to click 'Post Goods Issue' on an Outbound Delivery Order in /SCWM/PRDO, but the PGI button is disabled (greyed out). What is the most common reason?",
        options: [
          "The picking warehouse tasks for the delivery are still open (unconfirmed), or the goods have not been confirmed into the required Staging/Loading area.",
          "The customer's bank account was not verified.",
          "The material master price was too high.",
          "The sales order had no delivery note text."
        ],
        correctIndex: 0,
        explanation: "In SAP EWM, Goods Issue status is strictly dependent on execution status. PGI cannot be posted until all warehouse tasks for picking (and loading, if POSC is active) are 100% confirmed (/SCWM/ORDIM_C)."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: PGI posted in EWM but ERP delivery Goods Movement Status remains 'Not yet started'",
          errorCode: "QRFC-PGI-01",
          rootCause: "Stuck outbound qRFC queue in transaction SMQ1 (EWM) or SMQ2 (ERP).",
          solutionSteps: [
            "Open transaction SMQ1 in EWM.",
            "Look for queue name DLV* or GI* in status SYSFAIL or RETRY.",
            "Double-click queue to inspect error (e.g. ERP posting period closed or valuation error).",
            "Resolve underlying ERP error and unlock queue in SMQ1."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What is the difference between an Outbound Delivery Request (ODR) and an Outbound Delivery Order (ODO) in SAP EWM?",
          keyPoints: ["ODR is the incoming replicated interface message; ODO is the active warehouse execution document"],
          sampleAnswer: "The Outbound Delivery Request (ODR) is the interface document received from ERP via qRFC. EWM converts the ODR into an Outbound Delivery Order (ODO). The ODO is the central execution document in transaction /SCWM/PRDO where wave assignment, warehouse task generation, picking, packing, and Goods Issue are performed."
        }
      ],
      consultantChallenge: {
        title: "Autonomous Touchless Outbound PGI Architecture",
        clientRequirement: "A 3PL distribution center ships 500 truckloads daily. As soon as the forklift driver places the final pallet into the truck and scans the door barcode, the system must automatically confirm loading, post PGI in EWM, post Goods Issue in S/4HANA, and trigger the EDI 856 ASN to the customer instantly without human desktop interaction.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure Auto-PGI upon Loading Confirmation via PPF Action Profile /SCWM/OUT_PRD and RF Loading Step",
            pros: ["100% touchless real-time execution from RF scanner", "Eliminates administrative clerk labor at shipping office", "Instant EDI 856 ASN dispatch to customer"],
            cons: ["Requires high data accuracy since PGI is instant upon last pallet scan"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "In SPRO -> Goods Issue Process -> Outbound Delivery -> Define Process Profile for Delivery Order, set 'Auto Goods Issue upon Loading'. When RF driver scans the final pallet at Door 9030 in /SCWM/RFUI, EWM auto-executes PGI and fires PPF ASN."
      }
    }
  },
  {
    id: "ewm-intelligent-picking",
    module: "EWM",
    category: "Outbound",
    subcategory: "Intelligent Picking",
    title: "Intelligent Picking Strategies & Stock Selection (/SCWM/IMG)",
    subtitle: "Stock Removal Strategies (FIFO, LIFO, FEFO, Quantity-Based, Fixed Bin), Stock Selection rules, Process Codes, and Cancel Picking in SAP EWM.",
    level: "PROFESSIONAL",
    tags: ["Picking Strategies", "Intelligent Picking", "FIFO", "LIFO", "FEFO", "Quantity-Based Picking", "Stock Selection", "Process Codes", "Cancel Picking", "/SCWM/CANCP"],
    relatedTopics: ["ewm-outbound-process", "ewm-wocr-advanced-outbound", "ewm-outbound-reversal"],
    ewmMonitorNode: "Stock / Physical Stock",
    configurationView: {
      prerequisites: ["Stock Removal Control Indicators (SRCI) defined", "Storage Types with picking strategies configured"],
      configObjects: ["Storage Type Search Sequence for Stock Removal (/SCWM/T334E)", "Stock Removal Strategies (FIFO, LIFO, FEFO, Large/Small Quantity)"],
      determinationLogic: [
        "1. Product Master SRCI + Warehouse Process Type -> determines Storage Type Search Sequence for Picking.",
        "2. Storage Type Strategy (e.g. FIFO) sorts candidate quants by Goods Receipt Date/Time in /SCWM/AQUA.",
        "3. Quantity-Based strategy selects Small-Parts bin for eaches vs Bulk High-Rack for full pallets.",
        "4. Process Codes handle pick denials (e.g. Bin empty, Damaged product)."
      ],
      assignmentSteps: [
        "1. Define Stock Removal Control Indicator (SRCI) in SPRO Goods Issue -> Strategies.",
        "2. Configure Storage Type Search Sequence for Stock Removal.",
        "3. Configure Stock Removal Strategy rule (FIFO / FEFO / Quantity) on Storage Type.",
        "4. Assign SRCI to Product Master in /SCWM/MAT1."
      ],
      executionSteps: ["Release Wave / Create Picking WT in /SCWM/TODET_O", "System evaluates FIFO/FEFO and proposes exact source bin"],
      testingProcedure: ["Receive 2 pallets at different times; verify oldest pallet is proposed for picking."],
      troubleshooting: ["Error: System proposes wrong pallet -> Check GR Date in /SCWM/AQUA and SRCI customizing."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're buying milk at the grocery store. The store clerk always puts the oldest milk at the front of the shelf so it gets sold before it expires (FIFO - First In, First Out). If a customer orders 5 loose cans of soda, the picker takes them from the small shelf; if they order 500 cases, the forklift gets a full pallet from the high rack (Quantity-Based Picking). That's Intelligent Picking!",
      formalDefinition: "Intelligent Picking in SAP EWM is the algorithmic stock removal engine that determines which specific physical quants (/SCWM/AQUA) and storage bins should be picked to fulfill outbound demand. It evaluates Stock Removal Strategies (FIFO, LIFO, FEFO, Large/Small Quantity, Fixed Bin), Stock Determination rules, and handles exception codes (/SCWM/CANCP) during physical execution.",
      whyUsed: [
        "Enforces strict inventory rotation rules (FIFO/FEFO) to prevent material obsolescence and spoilage",
        "Optimizes picking efficiency via Quantity-Based breakdown (Full Pallet vs Case vs Each)",
        "Handles real-world shop-floor exceptions via Process Codes (Pick Denial, Damaged Stock)",
        "Enables seamless Cancel Picking (/SCWM/CANCP) when customer orders are altered"
      ],
      howItWorks: [
        "FIFO (First In, First Out): Sorts quants in /SCWM/AQUA by Goods Receipt Date/Time ascending. Oldest stock picked first.",
        "FEFO (First Expired, First Out): Sorts batch quants by Shelf Life Expiration Date (SLED). Earliest expiry picked first.",
        "Quantity-Based Picking: If order qty >= Full Pallet (e.g. 500 EA), picks from Bulk Storage Type 0020. If order qty < 500 EA, picks from Forward Pick Face 0030.",
        "Process Codes: If operator arrives at bin and finds 0 stock, enters Process Code 'BIDN' (Pick Denial). EWM cancels task and automatically creates a new task from an alternative bin."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "SRCI & Search Sequence Evaluation",
          description: "System reads SRCI 'FIFO_STD' from /SCWM/MAT1 and evaluates WPT 2010.",
          sapAction: "Strategy Evaluation",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SCWM/MAT1"]
        },
        {
          stepNumber: 2,
          title: "Quant Sorting (FIFO / FEFO)",
          description: "System filters candidate bins in Storage Type 0010 and sorts by /SCWM/AQUA-WDATU ascending.",
          sapAction: "Quant Sorting",
          tcode: "/SCWM/TODET_O",
          tablesUpdated: ["/SCWM/AQUA"]
        },
        {
          stepNumber: 3,
          title: "Warehouse Task Creation",
          description: "System selects oldest Quant at Bin '01-02-04' and creates Picking WT.",
          sapAction: "WT Creation",
          tcode: "/SCWM/TODET_O",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "RF Execution & Process Code Handling",
          description: "Picker scans bin barcode in /SCWM/RFUI. If damaged, enters Process Code 'DIFF' (Difference to Difference Analyzer).",
          sapAction: "RF Pick & Exception",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/DIFF_ANALYZER"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Master Data", name: "Stock Removal Control Indicator (SRCI)", description: "Product strategy key driving picking search" },
        { objectType: "Customizing Object", name: "Process Code", description: "Exception handling code for pick denial or damage (Table /SCWM/TPCD)" },
        { objectType: "Transactional Object", name: "Available Stock Quant", description: "Physical stock quant record (Table /SCWM/AQUA)" }
      ],
      relatedTcodes: ["/SCWM/TODET_O", "/SCWM/CANCP", "/SCWM/DIFF_ANALYZER", "/SCWM/RFUI", "/SCWM/MON"],
      fioriApps: [{ appId: "F3129", appName: "Pick Outbound Deliveries", fioriRole: "Picker" }],
      relatedTables: [
        { tableName: "/SCWM/AQUA", description: "Available Physical Stock Quants", keyFields: ["MANDT", "LGNUM", "MATID", "WDATU", "VFDAT"] },
        { tableName: "/SCWM/TPCD", description: "Process Codes & Exception Handlers", keyFields: ["MANDT", "LGNUM", "PCOD"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Issue Process -> Strategies -> Stock Removal Strategies",
        criticalSettings: [
          "Strategy Flag on Storage Type: 'F' (FIFO based on GR Date), 'E' (FEFO based on Expiry Date), 'Q' (Quantity Based)",
          "Process Code assignment to Exception Business Contexts (e.g. BIDN for Pick Denial)",
          "Rounding rule for Full Pallet vs Layer vs Each"
        ],
        mandatoryPrerequisites: ["Stock Removal Search Sequences defined in /SCWM/IMG"],
        commonPitfalls: ["Forgetting to maintain Process Codes in SPRO, leaving RF pickers stranded with no way to proceed when a bin is physically empty."]
      },
      realWorldBusinessExample: {
        companyContext: "Novartis Pharmaceuticals Hub",
        scenario: "Novartis ships insulin vials. EWM picking strategy evaluates FEFO: Batch A (Expires Nov 2026) vs Batch B (Expires May 2026). EWM strictly routes picker to Batch B bins.",
        businessOutcome: "Zero expired medication shipped, 100% regulatory compliance with health authorities."
      },
      industryExamples: {
        automotive: "FIFO picking ensuring older rubber gaskets and seals are consumed before newer batches.",
        aerospace: "Strict lot-controlled picking enforcing FAA shelf-life compliance for aviation adhesives.",
        pharma: "FEFO (First Expired, First Out) automated batch allocation.",
        food_beverage: "Dynamic catch weight quantity-based picking (Full Case vs Partial Weight).",
        mechanical: "Large quantity picking from heavy bulk yard vs small quantity from shelving.",
        electronics: "FIFO picking of battery packs to avoid degradation.",
        retail: "Quantity-based picking: Full pallet loads picked directly from high bay to shipping door.",
        cpg: "Promotional batch selection with specific packaging graphics.",
        logistics_3pl: "Client-specific picking rotation rules.",
        construction: "Oldest lot steel rebar picking.",
        industrial: "LIFO picking used only for specific non-aging heavy aggregate bulk silos."
      },
      scenarioQuestion: {
        prompt: "An RF picker arrives at Storage Bin 02-05-01 to pick 10 units of Material A, but discovers the bin is physically damaged and empty. The picker enters Process Code 'BIDN' (Pick Denial). What happens in the background in SAP EWM?",
        options: [
          "The current picking task is cancelled with an exception, the missing inventory is flagged for Physical Inventory / Difference Analyzer, and EWM automatically creates a new Warehouse Task from an alternative storage bin containing Material A.",
          "The customer order is cancelled and deleted.",
          "The entire warehouse is locked.",
          "The forklift is deactivated."
        ],
        correctIndex: 0,
        explanation: "Entering a Pick Denial process code (e.g. BIDN) cancels the active task, posts an internal discrepancy to the Difference Analyzer, and triggers automatic re-determination to generate a replacement task from the next available bin in the search sequence."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: No stock found for picking (/SCWM/UI_TODET 003)",
          errorCode: "/SCWM/UI_TODET003",
          rootCause: "Physical stock exists but is locked by open tasks, assigned to wrong Availability Group, or batch is blocked.",
          solutionSteps: [
            "Open /SCWM/MON -> Stock and Bin -> Physical Stock.",
            "Verify Stock Type is F2 (Unrestricted AFS).",
            "Check if stock is already reserved by another open Warehouse Task in /SCWM/ORDIM_O.",
            "Inspect Batch Status in /SCWM/BAT."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "How does Quantity-Based Stock Removal Strategy work in SAP EWM and how does it prevent broken pallets in bulk storage?",
          keyPoints: ["Evaluates delivery item quantity against product packaging levels; routes large quantities to Bulk/High-Bay and small quantities to Forward Pick Face"],
          sampleAnswer: "Quantity-Based Stock Removal utilizes the Packaging Specification or Warehouse Product Master rounding quantities. If the requested quantity equals or exceeds a Full Pallet (e.g. 500 EA), EWM directs the picking WT to the Bulk/High-Bay Storage Type (0020) to remove the whole pallet without breaking packaging. If the quantity is smaller (e.g. 15 EA), EWM directs the task to the Forward Pick Face (0030) to pick individual eaches."
        }
      ],
      consultantChallenge: {
        title: "Dynamic AI-Powered Batch Allocation for Perishable Cold-Chain Logistics",
        clientRequirement: "A dairy distributor supplies fresh yogurt with 21-day shelf life. Different retail customers have different contractual shelf-life agreements: Customer A (Walmart) requires minimum 14 days remaining; Customer B (Local Bodega) accepts 5 days remaining. System must automatically pick matching batches without manual order manipulation.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure Customer-Specific Minimum Remaining Shelf Life (MRSL) in Customer Master and Batch Determination in EWM",
            pros: ["100% automated customer compliance", "Prevents $500,000 annual retail chargeback penalties", "Zero manual batch selection"],
            cons: ["Requires maintaining customer condition records in SPRO Batch Determination"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Configure Condition Technique for Batch Determination in EWM. Assign Customer Minimum Remaining Shelf Life (MRSL). When wave releases, EWM FEFO algorithm filters out batches failing the customer's specific MRSL threshold."
      }
    }
  },
  {
    id: "ewm-outbound-reversal",
    module: "EWM",
    category: "Outbound",
    subcategory: "Reversals & Exceptions",
    title: "Outbound Reversals & Exception Handling (/SCWM/CANCP / /SCWM/PRDO)",
    subtitle: "Cancel Picking, Loading Reversal, PGI Reversal, and Exception Code management in SAP EWM.",
    level: "PROFESSIONAL",
    tags: ["Outbound Reversal", "Cancel Picking", "Loading Reversal", "PGI Reversal", "Exception Codes", "/SCWM/CANCP", "/SCWM/UNLOAD", "/SCWM/PRDO"],
    relatedTopics: ["ewm-outbound-process", "ewm-intelligent-picking", "ewm-wocr-advanced-outbound"],
    ewmMonitorNode: "Outbound Deliveries / Exceptions",
    configurationView: {
      prerequisites: ["Outbound Deliveries with confirmed tasks", "Reversal Warehouse Process Types configured (e.g. 2019 / 2020)"],
      configObjects: ["Cancel Picking Tool (/SCWM/CANCP)", "PGI Cancellation in /SCWM/PRDO", "Exception Codes (/SCWM/TEXC)"],
      determinationLogic: [
        "1. If Goods Issue is posted -> Execute 'Cancel Goods Issue' in /SCWM/PRDO (triggers Reverse GI in ERP).",
        "2. If goods are loaded -> Execute Loading Reversal (/SCWM/UNLOAD or RF) to return HUs to Staging.",
        "3. If goods are picked -> Execute Cancel Picking (/SCWM/CANCP) to generate Return-to-Stock putaway WTs."
      ],
      assignmentSteps: [
        "1. Define Warehouse Process Type for Stock Return in SPRO (e.g. WPT 2019 Return to Rack).",
        "2. Assign Default Return Storage Type in /SCWM/CANCP settings.",
        "3. Configure Exception Codes for Reversal (e.g. CANC, RETR)."
      ],
      executionSteps: [
        "In /SCWM/PRDO: Click Outbound Delivery -> Reverse Goods Issue",
        "In /SCWM/MON: Execute Loading Reversal",
        "Open /SCWM/CANCP: Select Delivery, generate Return-to-Storage WTs and confirm"
      ],
      testingProcedure: ["Execute complete pick and PGI, then perform 3-stage reverse back to original rack bin."],
      troubleshooting: ["Error: Reverse PGI blocked -> Verify ERP billing document is cancelled first (VF11)."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're at the airport, checked your bags, and are sitting on the plane. Suddenly the pilot announces the flight is cancelled! The airline can't just leave your luggage on the plane: Step 1: Cancel flight departure (PGI Reversal). Step 2: Unload bags from plane to cart (Loading Reversal). Step 3: Put bags back into baggage storage (Cancel Picking). That's Outbound Reversals in SAP EWM!",
      formalDefinition: "Outbound Reversal in SAP EWM is the structured multi-tier procedure for undoing warehouse execution steps when a customer cancels or alters an order. It encompasses PGI Reversal (/SCWM/PRDO), Loading Reversal (/SCWM/UNLOAD), and Cancel Picking (/SCWM/CANCP), generating return warehouse tasks to restore stock to its original storage bins.",
      whyUsed: [
        "Provides safe, auditable rollbacks for customer cancellations, damaged freight, and billing holds",
        "Restores inventory to Available for Sale (AFS) status in ERP and EWM",
        "Clears locked handling units from loading doors and staging bays",
        "Synchronizes financial reversals between EWM and S/4HANA Finance"
      ],
      howItWorks: [
        "Stage 1 (Reverse PGI): In /SCWM/PRDO, click Outbound Delivery -> Reverse Goods Issue. EWM sends qRFC to ERP, reversing the Material Document (Movement Type 602 in ERP).",
        "Stage 2 (Reverse Loading): Unload HUs from Door (9030) back to Staging Bay (9020).",
        "Stage 3 (Cancel Picking / Return to Stock): In transaction /SCWM/CANCP, select ODO items. EWM generates Return Putaway WTs directing the HUs back to their original High-Rack bins (0010)."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Reverse Post Goods Issue (PGI Reversal)",
          description: "In /SCWM/PRDO, select ODO, click Outbound Delivery -> Reverse Goods Issue. Reverses ERP Material Document.",
          sapAction: "PGI Reversal",
          tcode: "/SCWM/PRDO",
          tablesUpdated: ["/SCDL/DB_PROCH_O", "MATDOC"]
        },
        {
          stepNumber: 2,
          title: "Loading Reversal",
          description: "In /SCWM/MON or RFUI, unload HUs from Truck Door 9030 back to Staging Bay 9020.",
          sapAction: "Unload Execution",
          tcode: "/SCWM/UNLOAD / /SCWM/MON",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/HUHDR"]
        },
        {
          stepNumber: 3,
          title: "Cancel Picking via /SCWM/CANCP",
          description: "Open transaction /SCWM/CANCP, select ODO line items, and generate Return-to-Storage tasks.",
          sapAction: "Return Task Generation",
          tcode: "/SCWM/CANCP",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "Confirm Return Putaway WT",
          description: "Operator scans original High-Rack bin in /SCWM/RFUI. Stock restored to unrestricted AFS.",
          sapAction: "Stock Restoration",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Tool", name: "Cancel Picking Tool", description: "Generates return warehouse tasks (Transaction /SCWM/CANCP)" },
        { objectType: "Customizing Object", name: "Return Process Type", description: "Warehouse Process Type for return to rack (e.g. WPT 2019)" }
      ],
      relatedTcodes: ["/SCWM/CANCP", "/SCWM/PRDO", "/SCWM/UNLOAD", "/SCWM/MON", "VF11"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Deliveries", fioriRole: "Shipping Lead" }],
      relatedTables: [
        { tableName: "/SCDL/DB_PROCH_O", description: "Outbound Delivery Order Header", keyFields: ["MANDT", "DOCID"] },
        { tableName: "/SCWM/ORDIM_O", description: "Open Return Tasks", keyFields: ["MANDT", "LGNUM", "TANUM"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Issue Process -> Cancel Picking",
        criticalSettings: [
          "Define Warehouse Process Type for Stock Return (e.g. 2019)",
          "Default Storage Type for Returned Goods",
          "Unpack Option during Cancel Picking"
        ],
        mandatoryPrerequisites: ["ERP Billing Document must be cancelled in VF11 prior to PGI Reversal"],
        commonPitfalls: ["Attempting to reverse PGI in EWM while the ERP Billing Document is still active, causing qRFC error 'Invoice already exists'."]
      },
      realWorldBusinessExample: {
        companyContext: "Dell Technologies Logistics",
        scenario: "Customer cancels order for 100 customized servers 10 minutes after the truck was loaded at the dock. Dell shipping clerk executes Reverse PGI -> Unload Door 04 -> Cancel Picking /SCWM/CANCP.",
        businessOutcome: "All 100 servers returned to high-security inventory within 25 minutes without accounting discrepancies."
      },
      industryExamples: {
        automotive: "Reversing loaded trailer when assembly plant pushes JIT delivery window by 2 days.",
        aerospace: "Unloading serialized parts when export compliance license requires re-verification.",
        pharma: "Reversing PGI when cold-chain truck refrigeration unit fails before departure.",
        food_beverage: "Returning pallet loads to chiller after customer cancels delivery route.",
        mechanical: "Cancelling picking for heavy casting due to customer engineering change order.",
        electronics: "Unloading smartphones when credit card fraud flag is triggered.",
        retail: "Reversing store replenishment wave due to store power outage.",
        cpg: "Restoring promotional pallets to reserve storage.",
        logistics_3pl: "Handling client shipment hold requests.",
        construction: "Returning steel beams to laydown yard.",
        industrial: "Cancelling picking for maintenance spares."
      },
      scenarioQuestion: {
        prompt: "A customer cancels an order after Goods Issue was already posted in EWM and S/4HANA. When the clerk attempts to click 'Reverse Goods Issue' in /SCWM/PRDO, EWM issues an error from ERP. What is the prerequisite step in ERP?",
        options: [
          "The ERP Billing Document (Invoice) must be cancelled first in transaction VF11 before the delivery Goods Issue can be reversed.",
          "The Purchase Order must be deleted.",
          "The material standard cost must be modified.",
          "The storage bin must be deleted."
        ],
        correctIndex: 0,
        explanation: "In SAP ERP/S4HANA SD integration, an Outbound Delivery with an active Billing Document (Invoice) cannot have its Goods Issue reversed. The invoice must first be cancelled in transaction VF11."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Cannot reverse Goods Issue: Invoice 90001234 already created in ERP",
          errorCode: "VF-PGI-REV-01",
          rootCause: "ERP Billing Document exists for the outbound delivery.",
          solutionSteps: [
            "Open SAP ERP / S4HANA GUI.",
            "Run transaction VF11 (Cancel Billing Document).",
            "Enter Invoice number 90001234 and post cancellation.",
            "Return to EWM /SCWM/PRDO and click 'Reverse Goods Issue'."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the complete 3-step sequence to fully reverse an outbound shipment where goods were picked, packed, staged, loaded, and PGI was posted.",
          keyPoints: ["Step 1: Reverse PGI in /SCWM/PRDO; Step 2: Unload HUs in /SCWM/UNLOAD; Step 3: Execute Cancel Picking in /SCWM/CANCP to return stock to bins"],
          sampleAnswer: "To fully reverse a completed shipment: 1) Cancel the ERP invoice in VF11 if already billed, then execute 'Reverse Goods Issue' in /SCWM/PRDO to roll back the material document. 2) Execute Loading Reversal in /SCWM/UNLOAD to move HUs from the truck door (9030) back to the staging area (9020). 3) Execute transaction /SCWM/CANCP (Cancel Picking) to generate return-to-storage warehouse tasks that physically put the stock back into high-rack storage bins."
        }
      ],
      consultantChallenge: {
        title: "Automated Return-to-Storage Strategy Optimization",
        clientRequirement: "When picking is cancelled for high-velocity e-commerce eaches, client does not want workers walking all the way back to high-bay reserve racks. Instead, system must dynamically return items to the nearest Forward Pick Face bin if capacity exists.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure Cancel Picking WPT 2019 to evaluate Putaway Strategies with Forward Pick Face Search Sequence",
            pros: ["Saves 80% walking time during stock return", "Restocks fast-mover pick-faces immediately", "Optimizes warehouse floor ergonomics"],
            cons: ["Requires Forward Pick Face bins to have active capacity checking"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "In /SCWM/CANCP customizing, assign Return WPT 2019 configured with Storage Type Search Sequence that prioritizes Forward Pick Face (0030) before Reserve High-Rack (0010)."
      }
    }
  },

  // =========================================================================
  // 8. ADVANCED OUTBOUND — WOCR, POSC & ROBOTICS
  // =========================================================================
  {
    id: "ewm-wocr-advanced-outbound",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Warehouse Order Creation Rules",
    title: "Warehouse Order Creation Rules (WOCR) & Advanced Outbound (/SCWM/WOCR)",
    subtitle: "WOCR architecture, Filters, Limits, Activity Area assignment, Bin Sorting sequence, Search Sequence for Rules, and POSC at WOCR level.",
    level: "CONSULTANT",
    tags: ["WOCR", "Warehouse Order Creation Rule", "Activity Area", "Bin Sorting", "Limits", "Filters", "Storage Process at WOCR", "/SCWM/WOCR", "/SCWM/SBST"],
    relatedTopics: ["ewm-outbound-process", "ewm-intelligent-picking", "ewm-posc-inbound", "ewm-bins-sorting"],
    ewmMonitorNode: "Warehouse Orders / WOCR",
    configurationView: {
      prerequisites: ["Activity Areas created and bins sorted (/SCWM/SBST)", "Warehouse Process Types defined"],
      configObjects: [
        "Creation Rule (/SCWM/TWOCR)",
        "Filters (Item Filter, Subtotal Filter)",
        "Limits (Max Weight, Max Volume, Max Items, Max Time)",
        "Search Sequence for Creation Rules (/SCWM/TWOCR_DET)"
      ],
      determinationLogic: [
        "1. EWM selects candidate Warehouse Tasks for a Wave/ODO.",
        "2. Reads Search Sequence for Creation Rules based on Activity Area + WPT.",
        "3. Applies Filters (e.g. separate fragile vs heavy items).",
        "4. Applies Limits (e.g. stop adding tasks when total weight reaches 500 KG or 20 items).",
        "5. Assigns Storage Process (POSC: Pick -> Pack -> Stage -> Load) at WOCR level."
      ],
      assignmentSteps: [
        "1. Define Filters and Limits in SPRO under Cross-Process Settings -> Warehouse Order.",
        "2. Define Creation Rule (e.g. RULE_STD) and assign Filter + Limit + Storage Process.",
        "3. Define Search Sequence for Creation Rules.",
        "4. Assign Search Sequence to Activity Area in /SCWM/TWOCR_DET."
      ],
      executionSteps: ["Release Wave", "System evaluates WOCR rules and creates optimized Warehouse Orders (/SCWM/WHO)"],
      testingProcedure: ["Simulate WOCR creation in /SCWM/WOCR_SIM.", "Verify WO task grouping respects limits in /SCWM/MON."],
      troubleshooting: ["Error: WO contains too many tasks -> Check Limits in /SCWM/TWOCR."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're shopping at a supermarket. You have a small shopping basket. You can't put 50 giant watermelon in one basket! Once your basket has 10 items or weighs 15 kg, you must start a new basket. A Warehouse Order Creation Rule (WOCR) is SAP EWM's packaging optimizer: it bundles individual picking tasks into perfectly sized work packages (Warehouse Orders) so a worker or robot never gets overloaded!",
      formalDefinition: "Warehouse Order Creation Rules (WOCR), configured via /SCWM/WOCR and /SCWM/TWOCR_DET, govern how open Warehouse Tasks (/SCWM/ORDIM_O) are bundled into executable work packages called Warehouse Orders (/SCWM/WHO). WOCR evaluates Item Filters, Subtotal Filters, Capacity Limits (Weight, Volume, Items, Processing Time), Bin Sorting sequences (/SCWM/SBST), and assigns Outbound Storage Processes (POSC).",
      whyUsed: [
        "Prevents physical overloading of picking carts, pallet jacks, and forklift limits",
        "Optimizes picking routes by grouping adjacent bins within the same Activity Area",
        "Segregates incompatible products (e.g. heavy liquids vs fragile glass items)",
        "Assigns outbound multi-step POSC storage processes directly to picking orders"
      ],
      howItWorks: [
        "1. Tasks are selected by Wave release.",
        "2. Search Sequence for Creation Rules evaluates Activity Area + WPT to find the matching WOCR.",
        "3. Filter: Evaluates item compatibility (e.g. Non-hazardous vs Hazardous).",
        "4. Limit: Checks maximum thresholds: Max Weight = 500 KG, Max Volume = 1.5 M3, Max Tasks = 30.",
        "5. Bundling: Tasks are packed into Warehouse Order #1 until limit is reached; next tasks start Warehouse Order #2.",
        "6. Sorting: Tasks within each WO are sorted based on /SCWM/LAGPS bin travel path."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Limits in SPRO",
          description: "Define Limit 'LIM_CART': Max Gross Weight = 300 KG, Max Volume = 1.2 M3, Max Items = 25.",
          sapAction: "Limit Definition",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TLIMIT"]
        },
        {
          stepNumber: 2,
          title: "Define Warehouse Order Creation Rule (WOCR)",
          description: "Create Rule 'WOCR_PICK_STD', assign Limit 'LIM_CART', and assign Outbound Storage Process 'OUT1'.",
          sapAction: "WOCR Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TWOCR"]
        },
        {
          stepNumber: 3,
          title: "Assign Search Sequence per Activity Area",
          description: "In /SCWM/TWOCR_DET, map Warehouse W001 + Activity Area 'PICK' + WPT 2010 -> Creation Rule 'WOCR_PICK_STD'.",
          sapAction: "WOCR Determination Matrix",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TWOCR_DET"]
        },
        {
          stepNumber: 4,
          title: "Wave Execution & WO Creation",
          description: "Release Wave. EWM bundles 100 picking tasks into 4 perfectly balanced Warehouse Orders.",
          sapAction: "Automated Bundling",
          tcode: "/SCWM/WAVE",
          tablesUpdated: ["/SCWM/WHO", "/SCWM/ORDIM_O"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Creation Rule (WOCR)", description: "Bundling template and logic (Table /SCWM/TWOCR)" },
        { objectType: "Customizing Object", name: "WOCR Limit", description: "Max weight, volume, task, and time constraints (Table /SCWM/TLIMIT)" },
        { objectType: "Transactional Object", name: "Warehouse Order (WO)", description: "Final work package executed by RF resource (Table /SCWM/WHO)" }
      ],
      relatedTcodes: ["/SCWM/WOCR", "/SCWM/WOCR_SIM", "/SCWM/SBST", "/SCWM/MON", "/SCWM/WHO"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Warehouse Orders", fioriRole: "Warehouse Supervisor" }],
      relatedTables: [
        { tableName: "/SCWM/TWOCR", description: "Warehouse Order Creation Rules", keyFields: ["MANDT", "LGNUM", "RULE"] },
        { tableName: "/SCWM/TLIMIT", description: "WOCR Limits", keyFields: ["MANDT", "LGNUM", "LIMIT"] },
        { tableName: "/SCWM/WHO", description: "Warehouse Orders Header", keyFields: ["MANDT", "LGNUM", "WHO"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Warehouse Order",
        criticalSettings: [
          "Assign Storage Process at WOCR level for Outbound POSC execution",
          "Item Filter vs Subtotal Filter assignment",
          "Consolidation Group compatibility check"
        ],
        mandatoryPrerequisites: ["Bin Sorting (/SCWM/SBST) executed for all Activity Areas"],
        commonPitfalls: [
          "Forgetting to maintain Search Sequence for Creation Rules in /SCWM/TWOCR_DET, causing EWM to fall back to the default DEF rule with no limits.",
          "Setting limits too low (e.g. 1 task per WO), creating thousands of single-task WOs and overwhelming RF queues."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "IKEA Distribution Center",
        scenario: "IKEA picks flat-pack furniture. WOCR configures Limit 'FLAT_PALLET': Max Weight = 800 KG, Max Length = 2.4m. Heavy wardrobes are bundled into separate WOs for tugger trucks, while small screws are bundled into picking carts.",
        businessOutcome: "Zero cart tipping accidents, 40% reduction in warehouse floor traffic congestion."
      },
      industryExamples: {
        automotive: "WOCR grouping parts by assembly line station sequence.",
        aerospace: "WOCR enforcing maximum 5 serialized avionics boxes per security cart.",
        pharma: "WOCR strictly segregating controlled substances into high-security lockbox WOs.",
        food_beverage: "WOCR grouping heavy beverage cases on bottom of pallet, chips on top.",
        mechanical: "WOCR capping total weight to 10-ton overhead crane limit.",
        electronics: "WOCR grouping electrostatic-sensitive devices into anti-static tote WOs.",
        retail: "WOCR optimizing store aisle walk sequence for retail replenishment.",
        cpg: "WOCR full pallet slip-sheet load bundling.",
        logistics_3pl: "WOCR grouping tasks strictly by client contract account.",
        construction: "WOCR grouping rebar by job-site drop coordinates.",
        industrial: "WOCR grouping maintenance spares by emergency severity code."
      },
      scenarioQuestion: {
        prompt: "Why is an Outbound Storage Process (POSC: Pick -> Pack -> Stage -> Load) assigned at the Warehouse Order Creation Rule (WOCR) level rather than strictly at the Warehouse Process Type level?",
        options: [
          "Because different items within the same Outbound Delivery may require different physical outbound paths (e.g. Small items need Packing Station, while Full Pallets bypass Packing and go directly to Staging). Assigning POSC at WOCR level allows dynamic process selection based on packaging.",
          "Because ERP does not support POSC.",
          "Because the customer address is required.",
          "Because the sales order item was rejected."
        ],
        correctIndex: 0,
        explanation: "Assigning Storage Processes at the WOCR level gives EWM maximum operational flexibility. A single Outbound Delivery containing both full pallets and loose eaches can have full pallets bundled under WOCR_BULK (Direct to Staging) while loose items are bundled under WOCR_CART (Routes to Pack Station via POSC)."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Warehouse Orders created with default rule 'DEF' ignoring configured limits",
          errorCode: "WOCR-DET-01",
          rootCause: "Table /SCWM/TWOCR_DET is missing entry for Warehouse Number + Activity Area + WPT combination.",
          solutionSteps: [
            "Open SPRO -> Cross-Process Settings -> Warehouse Order -> Define Search Sequence for Creation Rules.",
            "Add entry mapping Warehouse W001, Activity Area 'PICK', and WPT 2010 to your custom Creation Rule.",
            "Test in /SCWM/WOCR_SIM."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the purpose of Item Filters vs Subtotal Filters in SAP EWM Warehouse Order Creation Rules.",
          keyPoints: ["Item Filter filters individual tasks based on product/attributes before bundling; Subtotal Filter evaluates cumulative properties (weight, volume, length) of the grouped tasks"],
          sampleAnswer: "In WOCR customizing, an Item Filter evaluates individual Warehouse Tasks (e.g. filtering out hazardous materials or items exceeding 50 KG so they are not mixed with standard goods). A Subtotal Filter evaluates the cumulative sum of all tasks assigned to a potential Warehouse Order (e.g. evaluating total weight or total volume) to determine when the WO has reached its capacity limit."
        }
      ],
      consultantChallenge: {
        title: "Dynamic AI-Powered Wave-to-Cartonization WOCR Engine",
        clientRequirement: "An apparel retailer ships 80,000 orders daily. Each order consists of 1 to 4 garments. Management wants EWM to calculate the exact shipping box size (Small, Medium, Large) during wave release and create WOs that pick directly into the final shipping carton (Pick-to-Box) without requiring a separate packing station.",
        architecturalOptions: [
          {
            optionName: "Option A: Activate EWM Cartonization Planning (/SCWM/CAP) integrated with WOCR and Pick-to-Box Execution",
            pros: ["Eliminates separate packing work center entirely, saving 35% labor cost", "Pick-HUs are created as pre-labeled shipping cartons", "Automatic box size calculation based on product 3D dimensions"],
            cons: ["Requires maintaining precise 3D dimensions (L, W, H) in Material Master (/SCWM/MAT1)"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Activate Cartonization Planning in /SCWM/CAP. In WOCR, configure Pick-to-Box creation rule. EWM calculates carton size, generates Pick-HU barcode, and dispatches picking task directly into the shipping carton."
      }
    }
  },
  {
    id: "ewm-robotics-outbound",
    module: "EWM",
    category: "Advanced EWM",
    subcategory: "Robotics Outbound",
    title: "Robotics in Outbound Picking, Staging & Loading (/SCWM/MFS)",
    subtitle: "Goods-to-Person (G2P) picking robots, Autonomous Forklifts, outbound conveyor sorters, and robotic palletizers.",
    level: "CONSULTANT",
    tags: ["Robotics Outbound", "G2P", "Goods-to-Person", "AMR Outbound", "Automated Staging", "Robotic Palletizer", "/SCWM/MFS"],
    relatedTopics: ["ewm-robotics-automation", "ewm-wocr-advanced-outbound", "ewm-outbound-process"],
    ewmMonitorNode: "Material Flow System / Outbound",
    configurationView: {
      prerequisites: ["Goods-to-Person Work Centers defined", "MFS Telegrams mapped for Outbound Picking"],
      configObjects: ["G2P Pick Station Layout", "AMR Outbound Queues", "MFS Telegram Interface (MOVE_PICK)"],
      determinationLogic: [
        "1. WOCR assigns picking tasks to G2P Robotic Queue.",
        "2. EWM MFS sends telegram to Robot Fleet Manager to fetch mobile storage rack.",
        "3. Robot brings rack to human pick station. Screen displays pick location with Pick-to-Light LED.",
        "4. Picker confirms eaches into shipping tote; robot returns rack to dense storage grid."
      ],
      assignmentSteps: [
        "1. Define G2P Pick Station in /SCWM/TWORKC.",
        "2. Configure MFS PLC communication channels for Robot Fleet Manager.",
        "3. Assign WOCR rules to route small parts to G2P Robotic Activity Area.",
        "4. Configure Pick-to-Light integration."
      ],
      executionSteps: [
        "Release Outbound Wave",
        "EWM MFS dispatches G2P AMRs to fetch product pods",
        "Picker confirms items at G2P screen",
        "Completed shipping totes routed to automated sorter"
      ],
      testingProcedure: ["Simulate G2P picking order in /SCWM/MFS_SIM.", "Verify robot dispatch telegrams in /SCWM/MON."],
      troubleshooting: ["Error: Pod delivery delayed -> Check AMR queue priority and traffic congestion in Fleet Manager."]
    },
    pedagogy: {
      beginnerExplanation: "In a traditional warehouse, a human picker walks 12 miles a day through huge aisles to find items (Person-to-Goods). In a smart robotic warehouse, the human stands comfortably at an ergonomic workstation, and autonomous mobile robots (AMRs) bring entire mobile storage shelving racks directly to the picker (Goods-to-Person)! The picker takes the item, and the robot zips away!",
      formalDefinition: "Outbound Robotics in SAP EWM connects Goods-to-Person (G2P) robotic pod systems, autonomous mobile picking carts, robotic layer palletizers, and automated guided vehicles (AGVs) to the outbound fulfillment workflow via the SAP EWM Material Flow System (MFS) and REST/ROS2 robotics connectors.",
      whyUsed: [
        "Increases human picker throughput from 80 lines/hour to 450 lines/hour (400% surge)",
        "Eliminates 95% of human walking time and worker physical strain",
        "Achieves 99.999% pick accuracy via integrated Pick-to-Light laser pointers",
        "Enables ultra-dense mobile pod storage with zero permanent pedestrian aisle waste"
      ],
      howItWorks: [
        "1. Outbound Wave releases picking tasks assigned to G2P Activity Area.",
        "2. EWM MFS sends telegrams to AMR Fleet Manager.",
        "3. AMR drives under mobile shelving pod #842, lifts pod, and carries it to Pick Station 01.",
        "4. EWM screen shows: 'Pick 2 units from Bin Row 3, Compartment B'. Laser pointer illuminates exact compartment.",
        "5. Human picker puts item into shipping tote and presses confirmation button. Robot rotates or returns pod to grid."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Wave Release to G2P Activity Area",
          description: "Wave releases 500 e-commerce orders assigned to G2P Robotic Storage Type 0050.",
          sapAction: "Wave Release",
          tcode: "/SCWM/WAVE",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/WHO"]
        },
        {
          stepNumber: 2,
          title: "MFS Telegram Dispatch to Robot Fleet",
          description: "EWM MFS generates MOVE_POD telegrams with Pod ID and Station ID.",
          sapAction: "Telegram Generation",
          tcode: "/SCWM/MON",
          tablesUpdated: ["/SCWM/MFSTEL"]
        },
        {
          stepNumber: 3,
          title: "Pod Delivery & Ergonomic Pick Execution",
          description: "Robot delivers pod to Work Center. Operator picks item using Pick-to-Light validation.",
          sapAction: "G2P Picking",
          tcode: "/SCWM/RFUI / G2P App",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA"]
        },
        {
          stepNumber: 4,
          title: "Automated Staging & Shipping Dispatch",
          description: "Finished shipping totes are carried by conveyor/AMR directly to truck loading bay.",
          sapAction: "Outbound Dispatch",
          tcode: "/SCWM/PRDO",
          tablesUpdated: ["/SCWM/ORDIM_C"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "G2P Work Center", description: "Stationary picking station (Table /SCWM/TWORKC)" },
        { objectType: "System Interface", name: "MFS Telegram Interface", description: "Real-time robotics messaging socket (Table /SCWM/T313G)" }
      ],
      relatedTcodes: ["/SCWM/MFS", "/SCWM/MON", "/SCWM/WAVE", "/SCWM/PRDO", "/SCWM/RSRC"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Robotics MFS", fioriRole: "Automation Architect" }],
      relatedTables: [
        { tableName: "/SCWM/T313G", description: "PLC / Fleet Managers", keyFields: ["MANDT", "LGNUM", "PLC"] },
        { tableName: "/SCWM/MFSTEL", description: "MFS Telegram Log", keyFields: ["MANDT", "LGNUM", "PLC", "TDOBJ"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Material Flow System (MFS)",
        criticalSettings: [
          "G2P Pick Station Ergonomic Screen Layout",
          "Pod Queue Sequence Optimization to minimize robot wait times",
          "Automatic tote induction and divert telegram logic"
        ],
        mandatoryPrerequisites: ["AMR Fleet Management Server configured in SM59"],
        commonPitfalls: ["Failing to synchronize pod rotation telegrams, causing robot to present the wrong side of the shelving unit to the human picker."]
      },
      realWorldBusinessExample: {
        companyContext: "Alibaba / Shein Mega Fulfillment Hub",
        scenario: "Shein operates 800 AMRs in a 1,000,000 sq ft facility. EWM dispatches 150,000 fast-fashion items daily across 40 G2P pick stations.",
        businessOutcome: "Average order pick time reduced from 45 minutes to 3.5 minutes with 99.99% accuracy."
      },
      industryExamples: {
        automotive: "G2P robots delivering hardware fastener bins to kitting benches.",
        aerospace: "Autonomous tugger AGVs transporting titanium wing spars to outbound crating.",
        pharma: "Robotic picking cells handling sealed narcotic blister packs in secure cage.",
        food_beverage: "Robotic layer de-palletizers building rainbow mixed pallets of soft drinks.",
        mechanical: "Heavy-payload AGVs staging finished diesel engines at shipping bays.",
        electronics: "High-speed Delta robotic arms picking microchips into anti-static tubes.",
        retail: "G2P mobile pods fulfilling omnichannel e-commerce orders.",
        cpg: "Automated pallet wrapper infeed AMR delivery.",
        logistics_3pl: "Multi-tenant robotic fulfillment grid.",
        construction: "Automated guided flatbed vehicles transporting precast concrete.",
        industrial: "Robotic crane picking steel coils onto outbound railcars."
      },
      scenarioQuestion: {
        prompt: "In a Goods-to-Person (G2P) robotic EWM warehouse, how does the system ensure the picker takes the item from the correct bin compartment on the mobile pod?",
        options: [
          "EWM sends compartment coordinates to the Pick Station Pick-to-Light controller, illuminating a laser dot on the exact compartment while displaying the pick quantity on screen.",
          "The picker guesses based on weight.",
          "The robot speaks the coordinate out loud.",
          "The customer confirms the compartment remotely."
        ],
        correctIndex: 0,
        explanation: "In G2P pick stations, EWM integrates with Pick-to-Light / Put-to-Light systems. When the robot presents the pod, EWM triggers the optical laser pointer to illuminate the specific compartment and displays the pick quantity on the terminal screen."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Pick-to-Light sensor failed to illuminate at G2P Station 03",
          errorCode: "MFS-PTL-01",
          rootCause: "Communication timeout between EWM MFS and Pick-to-Light hardware gateway.",
          solutionSteps: [
            "Open /SCWM/MON -> Material Flow System -> Communication Channel.",
            "Verify PTL Gateway channel status.",
            "Restart PTL listener in /SCWM/MFS.",
            "Fallback to manual RF screen confirmation if hardware fault persists."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "How does EWM Wave Management optimize robot fleet utilization in a Goods-to-Person warehouse?",
          keyPoints: ["Wave grouping aggregates orders requesting SKUs from the same pod, minimizing total pod movements across the floor"],
          sampleAnswer: "In a G2P warehouse, EWM Wave Management groups customer orders containing products stored on the same physical mobile pod into the same wave. When that pod is brought to a pick station, multiple customer orders are picked in a single pod presentation, reducing total robot travel distance by up to 60%."
        }
      ],
      consultantChallenge: {
        title: "Autonomous 3D High-Bay Shuttle + G2P Hybrid Architecture",
        clientRequirement: "A luxury watch manufacturer has 100,000 high-value SKUs. They require a 3D automated shuttle grid (AutoStore/Cuby) integrated with SAP EWM that retrieves bins in under 8 seconds and delivers them to automated robotic picking arms.",
        architecturalOptions: [
          {
            optionName: "Option A: Direct Integration via EWM MFS Telegram Protocol to 3D Shuttle Controller and Vision-Guided Robotic Arm",
            pros: ["Sub-second task dispatching", "Zero human hands touch the luxury watches", "100% video-recorded pick validation"],
            cons: ["Requires high-precision robotic vision AI calibration"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement SAP EWM MFS. Map 3D Shuttle Grid as Storage Type 0060 (Role: Automated High-Bay). Dispatch picking tasks via MFS to Shuttle PLC. Integrate robotic arm vision controller for pick confirmation."
      }
    }
  },

  // =========================================================================
  // 9. PHYSICAL INVENTORY
  // =========================================================================
  {
    id: "ewm-pi-fundamentals",
    module: "EWM",
    category: "Physical Inventory",
    subcategory: "PI Fundamentals",
    title: "Physical Inventory Fundamentals & Types (/SCWM/PI_CREATE)",
    subtitle: "Complete architecture for Annual Inventory, Continuous Inventory, Cycle Counting, Ad-Hoc counting, and Dynamic Physical Inventory in SAP EWM.",
    level: "BEGINNER",
    tags: ["Physical Inventory", "PI Fundamentals", "Cycle Counting", "Annual Inventory", "Ad-Hoc PI", "Dynamic PI", "/SCWM/PI_CREATE", "/SCWM/PI_COUNT"],
    relatedTopics: ["ewm-pi-area-execution", "ewm-pi-configuration", "ewm-queue-management"],
    ewmMonitorNode: "Physical Inventory / PI Documents",
    processDiagram: {
      title: "Physical Inventory 5-Stage Lifecycle",
      nodes: [
        { id: "1", label: "Create PI Document", system: "EWM", tcode: "/SCWM/PI_CREATE", description: "PI Doc & Items created" },
        { id: "2", label: "Bin Locking / Blocking", system: "EWM", tcode: "/SCWM/PI_COUNT", description: "Bins locked for stock movements" },
        { id: "3", label: "Physical Count Entry", system: "EWM", tcode: "/SCWM/PI_COUNT / RF", description: "Counter records actual stock" },
        { id: "4", label: "Post Difference to EWM", system: "EWM", tcode: "/SCWM/PI_POST", description: "Updates EWM physical quants" },
        { id: "5", label: "Difference Analyzer Posting", system: "Integration", tcode: "/SCWM/DIFF_ANALYZER", description: "Posts GI/GR to ERP General Ledger" }
      ]
    },
    configurationView: {
      prerequisites: ["Physical Inventory Areas defined in SPRO", "Tolerance Groups assigned to users and warehouse"],
      configObjects: ["PI Document Types (e.g. HL - Storage Bin Specific, PL - Product Specific)", "Number Ranges for PI Documents (/SCWM/PI_NR)", "Cycle Counting Indicators"],
      determinationLogic: [
        "1. PI Document Type determines whether count is Bin-Specific (/SCWM/PI_CREATE) or Product-Specific.",
        "2. Cycle Counting reads indicator (A=Monthly, B=Quarterly, C=Yearly) from /SCWM/MAT1.",
        "3. Locking indicator blocks bins from concurrent putaway/picking while count document is active."
      ],
      assignmentSteps: [
        "1. Define Physical Inventory Document Types and Number Ranges in SPRO.",
        "2. Assign PI Area to Activity Area in /SCWM/IMG.",
        "3. Configure Tolerance Groups with value and percentage limits.",
        "4. Assign Cycle Counting intervals in /SCWM/MAT1."
      ],
      executionSteps: [
        "Create PI Document in /SCWM/PI_CREATE",
        "Print count sheet or dispatch to RF Queue",
        "Enter count in /SCWM/PI_COUNT or /SCWM/RFUI",
        "Post PI Document in /SCWM/PI_POST",
        "Analyze differences in /SCWM/DIFF_ANALYZER"
      ],
      testingProcedure: ["Create PI document for test bin, enter intentional discrepancy, and verify Difference Analyzer entry."],
      troubleshooting: ["Error: Bin locked by open PI document -> Complete count in /SCWM/PI_COUNT or delete PI document in /SCWM/PI_CHANGE."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine running a bakery. At the end of every week, you count how many bags of flour and sugar are physically left in the storage room and compare that number against your digital records. If your computer thought you had 10 bags but you only found 8, you lost 2 bags. Physical Inventory (PI) in SAP EWM is the formal process of physically counting warehouse items to ensure 100% stock accuracy!",
      formalDefinition: "Physical Inventory (PI) in SAP EWM (/SCWM/PI_CREATE) is the legal and operational auditing framework for validating physical stock against system book inventory. It supports multiple methodologies: Annual Inventory, Continuous Inventory, Cycle Counting (ABC classification), Ad-Hoc Inventory, Putaway Physical Inventory, and Low Stock Checks.",
      whyUsed: [
        "Ensures legal and financial accounting compliance for balance sheet stock valuation",
        "Identifies inventory shrinkage, theft, breakage, and misplacement in real time",
        "Prevents warehouse pick denials caused by ghost stock records",
        "Optimizes counting labor by focusing on high-value fast-movers via Cycle Counting"
      ],
      howItWorks: [
        "TYPES OF PHYSICAL INVENTORY:",
        "1. Annual Physical Inventory: All storage bins counted on a single balance sheet key date.",
        "2. Continuous Physical Inventory: Bins counted continuously throughout the fiscal year.",
        "3. Cycle Counting: High-value/fast-moving materials (Class A) counted monthly; Class B quarterly; Class C annually.",
        "4. Ad-Hoc Physical Inventory: Operator initiates unplanned count on an individual suspect bin immediately.",
        "5. Putaway Physical Inventory: Operator counts existing stock in a bin during the putaway of a new pallet.",
        "6. Low Stock Check: When a picking task reduces bin stock below a threshold, operator verifies remaining count."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Create Physical Inventory Document",
          description: "In /SCWM/PI_CREATE, select Storage Bins or Cycle Counting indicator. System creates PI Document.",
          sapAction: "PI Doc Creation",
          tcode: "/SCWM/PI_CREATE",
          tablesUpdated: ["/SCWM/PI_ITEM"]
        },
        {
          stepNumber: 2,
          title: "Count Execution via RF Scanner",
          description: "Count clerk opens /SCWM/RFUI -> Physical Inventory. Scans bin and enters counted quantity.",
          sapAction: "RF Count Entry",
          tcode: "/SCWM/RFUI / /SCWM/PI_COUNT",
          tablesUpdated: ["/SCWM/PI_COUNT"]
        },
        {
          stepNumber: 3,
          title: "Post Difference in EWM",
          description: "In /SCWM/PI_POST, clerk posts the count. EWM adjusts physical quant (/SCWM/AQUA) and unlocks bin.",
          sapAction: "EWM Stock Adjustment",
          tcode: "/SCWM/PI_POST",
          tablesUpdated: ["/SCWM/AQUA", "/SCWM/DIFF_ANALYZER"]
        },
        {
          stepNumber: 4,
          title: "Financial Reconciliation in Difference Analyzer",
          description: "Inventory Controller reviews variances in /SCWM/DIFF_ANALYZER and posts adjustment to ERP General Ledger.",
          sapAction: "Financial GL Posting",
          tcode: "/SCWM/DIFF_ANALYZER",
          tablesUpdated: ["MATDOC", "BKPF", "BSEG"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Object", name: "Physical Inventory Document", description: "Count document header and items (Table /SCWM/PI_ITEM)" },
        { objectType: "Customizing Object", name: "Physical Inventory Area", description: "Subdivision governing counting rules (Table /SCWM/TPI_AREA)" },
        { objectType: "Financial Tool", name: "Difference Analyzer", description: "Reconciles EWM quantities with ERP General Ledger (Table /SCWM/DIFF_ANALYZER)" }
      ],
      relatedTcodes: ["/SCWM/PI_CREATE", "/SCWM/PI_COUNT", "/SCWM/PI_POST", "/SCWM/DIFF_ANALYZER", "/SCWM/MON", "/SCWM/PI_CHANGE"],
      fioriApps: [
        { appId: "F3130", appName: "Count Physical Inventory", fioriRole: "Inventory Clerk" },
        { appId: "F3131", appName: "Manage Physical Inventory Documents", fioriRole: "Inventory Controller" }
      ],
      relatedTables: [
        { tableName: "/SCWM/PI_ITEM", description: "Physical Inventory Items", keyFields: ["MANDT", "LGNUM", "DOCID", "ITEMID"] },
        { tableName: "/SCWM/PI_COUNT", description: "Physical Inventory Count Results", keyFields: ["MANDT", "LGNUM", "DOCID", "COUNTID"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Physical Inventory",
        criticalSettings: [
          "Define Physical Inventory Document Types and Number Ranges",
          "Locking Concept: Set Bin Lock during document creation or first count",
          "Tolerance Groups for Users and Warehouse"
        ],
        mandatoryPrerequisites: ["Activity Areas mapped to Physical Inventory Areas"],
        commonPitfalls: ["Creating PI documents without locking bins, allowing pickers to remove stock mid-count and creating false discrepancy variances."]
      },
      realWorldBusinessExample: {
        companyContext: "Rolex / Richemont Luxury Watch Vault",
        scenario: "Rolex uses Cycle Counting Class A for $40,000 gold watch movements. Every Class A bin is counted weekly via RF scanners. Variances exceeding $500 require Supervisor biometric approval.",
        businessOutcome: "99.998% inventory valuation accuracy across $500M in vault stock."
      },
      industryExamples: {
        automotive: "Continuous inventory for engine block racks using automated drone barcode scanning.",
        aerospace: "Strict FAA-mandated 100% physical audit of serialized structural bolts.",
        pharma: "DEA Schedule II controlled substance double-blind daily physical count.",
        food_beverage: "Low stock physical inventory check executed automatically during picking.",
        mechanical: "Annual physical inventory of heavy casting open yard.",
        electronics: "Ad-hoc physical inventory triggered immediately when ESD seal is broken.",
        retail: "Cycle counting of high-theft apparel designer items.",
        cpg: "Full pallet visual count in automated AS/RS high-bay warehouse.",
        logistics_3pl: "Client-specific quarterly balance sheet inventory audits.",
        construction: "Outdoor yard GPS-tagged rebar physical count.",
        industrial: "Cycle counting of pneumatic valves and seals."
      },
      scenarioQuestion: {
        prompt: "What is the key functional difference between posting a Physical Inventory document in /SCWM/PI_POST versus posting in the Difference Analyzer (/SCWM/DIFF_ANALYZER)?",
        options: [
          "/SCWM/PI_POST adjusts the physical inventory quants in EWM and unlocks the storage bin, while /SCWM/DIFF_ANALYZER writes the financial inventory adjustment (Movement Type 711/712) to the S/4HANA General Ledger.",
          "/SCWM/PI_POST deletes the material master; Difference Analyzer creates a purchase order.",
          "They are identical and execute the same table update.",
          "/SCWM/PI_POST is only for raw materials."
        ],
        correctIndex: 0,
        explanation: "SAP EWM uses a 2-step financial decoupling architecture. Step 1 (/SCWM/PI_POST) corrects the warehouse shop-floor physical quants (/SCWM/AQUA) immediately so warehouse operations can resume. Step 2 (/SCWM/DIFF_ANALYZER) allows inventory controllers to review variances and write the financial accounting adjustment to S/4HANA Finance."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Storage Bin 01-04-02 is locked by Physical Inventory Document 100045",
          errorCode: "PI-BIN-LOCK-01",
          rootCause: "An active unposted PI document has placed a physical movement lock on the bin.",
          solutionSteps: [
            "Open transaction /SCWM/PI_COUNT or /SCWM/MON -> Physical Inventory.",
            "Complete the physical count and post via /SCWM/PI_POST.",
            "Alternatively, delete the uncounted PI document in /SCWM/PI_CHANGE to immediately release the bin lock."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What is a Double-Blind Physical Inventory Count in SAP EWM and when is it used?",
          keyPoints: ["Counter is NOT shown the book inventory quantity on the RF screen, forcing an honest physical count"],
          sampleAnswer: "A Double-Blind Count is configured in the Physical Inventory Area settings by unchecking 'Display Book Quantity'. When the RF count clerk arrives at the bin, the screen displays a blank input field without revealing whether the system expects 5 units or 500 units. This eliminates cognitive bias and prevents workers from simply confirming the expected quantity without actually counting."
        }
      ],
      consultantChallenge: {
        title: "Autonomous Aerial Drone Physical Inventory in 15-Meter High-Bay Warehouse",
        clientRequirement: "A 3PL facility with 60,000 pallet bins in 15-meter high-racks currently spends $250,000 annually renting scissor lifts for human inventory counters. Management wants autonomous flying drones to scan all 60,000 bins overnight and update SAP EWM automatically.",
        architecturalOptions: [
          {
            optionName: "Option A: Integrate Autonomous Drone Fleet with EWM Physical Inventory OData / REST APIs",
            pros: ["Completes 60,000 bin inventory in 6 hours overnight", "Eliminates human height safety hazards", "Automatic Difference Analyzer posting for variances"],
            cons: ["Requires high-resolution optical barcode reading cameras on drones"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Create EWM PI documents via scheduled batch job. Transmit bin list to Drone Fleet Controller via OData API. Drones scan barcodes and post actual counts directly to /SCWM/PI_COUNT API. Variances route to Difference Analyzer."
      }
    }
  },
  {
    id: "ewm-pi-area-execution",
    module: "EWM",
    category: "Physical Inventory",
    subcategory: "PI Area & Execution",
    title: "Physical Inventory Area & Execution Rules (/SCWM/IMG)",
    subtitle: "Putaway PI, Low Stock Check (LS Check), Display Quantity flag, HU Complete, Print Objects, Permitted Document Types, and Period of Bin Check.",
    level: "PROFESSIONAL",
    tags: ["PI Area", "Low Stock Check", "LS Check", "Putaway PI", "Display Quantity", "HU Complete", "Period of Bin Check", "/SCWM/IMG"],
    relatedTopics: ["ewm-pi-fundamentals", "ewm-pi-configuration", "ewm-queue-management"],
    ewmMonitorNode: "Physical Inventory / PI Areas",
    configurationView: {
      prerequisites: ["Activity Areas defined", "Storage Types defined"],
      configObjects: ["Physical Inventory Area (/SCWM/TPI_AREA)", "Assignment of PI Area to Activity Area", "Low Stock Check Threshold"],
      determinationLogic: [
        "1. Bins in Storage Type inherit PI Area attributes from their assigned Activity Area.",
        "2. Low Stock Check (LS Check) triggers when picking task reduces bin quantity below threshold.",
        "3. Display Quantity flag controls blind count vs displayed book quantity.",
        "4. Period of Bin Check enforces maximum days between consecutive counts."
      ],
      assignmentSteps: [
        "1. Define Physical Inventory Area in SPRO (e.g. PIA_HIGH_RACK).",
        "2. Configure flags: LS Check (X), Putaway PI (X), Display Quantity (Blank for Blind).",
        "3. Assign PI Area to Activity Area in /SCWM/IMG -> Physical Inventory.",
        "4. Test Low Stock Check during RF picking."
      ],
      executionSteps: ["Pick item reducing bin below threshold", "RF screen prompts: 'Low Stock Check: Verify remaining count'", "Enter actual count and confirm"],
      testingProcedure: ["Execute pick reducing bin to 2 units; verify RF triggers automatic Low Stock Check."],
      troubleshooting: ["Error: Low Stock Check not prompting -> Verify LS Check flag and threshold in PI Area customizing."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're taking soda cans out of a fridge. When you take the 2nd to last can, you can easily glance into the fridge and say: 'Yep, exactly 1 can left!' That is a Low Stock Check (LS Check). Instead of sending a dedicated auditor with a clipboard, SAP EWM asks the picker to count the bin at the exact moment when it's almost empty and takes 2 seconds to count!",
      formalDefinition: "The Physical Inventory Area (/SCWM/TPI_AREA) in SAP EWM defines the governing parameters for inventory execution within an Activity Area. It configures Putaway Physical Inventory, Low Stock Checks (LS Check), Blind Counting (Display Quantity), Handling Unit Completeness checks (HU Complete), and the Maximum Period of Bin Check.",
      whyUsed: [
        "Drastically reduces counting labor by embedding micro-counts into standard picking tasks (Low Stock PI)",
        "Eliminates counting errors through double-blind counting enforcement",
        "Validates empty bins automatically without separate audit visits",
        "Tracks time elapsed since last count to ensure 100% annual compliance"
      ],
      howItWorks: [
        "LOW STOCK CHECK (LS CHECK): In SPRO, Low Stock Threshold is set to 3 EA. Picker confirms task leaving 2 EA in bin. RF terminal immediately interrupts with: 'Low Stock Check: Please enter remaining quantity in bin'.",
        "PUTAWAY PI: When putting away a pallet into a bin that already contains partial stock, RF prompts operator to verify existing quantity.",
        "DISPLAY QUANTITY: If unchecked (Blind Count), RF screen hides expected quantity.",
        "HU COMPLETE: If checked, operator only needs to verify the external Handling Unit SSCC label without opening and counting individual internal pieces."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Physical Inventory Area in SPRO",
          description: "Create PI Area 'PIA_01'. Set Low Stock Check = '1' (Active), Display Qty = Blank (Blind Count).",
          sapAction: "PI Area Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPI_AREA"]
        },
        {
          stepNumber: 2,
          title: "Assign PI Area to Activity Area",
          description: "Map Activity Area 'PICK' to PI Area 'PIA_01' in /SCWM/IMG.",
          sapAction: "Activity Area Mapping",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TPI_ACT"]
        },
        {
          stepNumber: 3,
          title: "Trigger Low Stock Check during RF Picking",
          description: "Picker confirms picking task reducing bin quantity to 1. RF prompts for Low Stock Count.",
          sapAction: "RF LS Check Trigger",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/PI_COUNT"]
        },
        {
          stepNumber: 4,
          title: "Automatic PI Document Creation & Confirmation",
          description: "System auto-generates Ad-Hoc PI Document in the background, logs count, and updates /SCWM/LAGP-IDATU.",
          sapAction: "Auto PI Doc Log",
          tcode: "/SCWM/MON",
          tablesUpdated: ["/SCWM/PI_ITEM", "/SCWM/LAGP"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Physical Inventory Area", description: "Governing count parameters per Activity Area (Table /SCWM/TPI_AREA)" },
        { objectType: "System Attribute", name: "Last Count Date (IDATU)", description: "Timestamp on Storage Bin master record (Table /SCWM/LAGP)" }
      ],
      relatedTcodes: ["/SCWM/IMG", "/SCWM/RFUI", "/SCWM/MON", "/SCWM/LS02N"],
      fioriApps: [{ appId: "F3130", appName: "Count Physical Inventory", fioriRole: "Inventory Clerk" }],
      relatedTables: [
        { tableName: "/SCWM/TPI_AREA", description: "Physical Inventory Areas", keyFields: ["MANDT", "LGNUM", "PI_AREA"] },
        { tableName: "/SCWM/LAGP", description: "Storage Bins (Contains IDATU Last Inventory Date)", keyFields: ["MANDT", "LGNUM", "LGTYP", "LGPLA"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Physical Inventory -> Define Physical Inventory Area",
        criticalSettings: [
          "Low Stock Check (LS Check) Activation & Threshold limit",
          "Display Quantity Indicator (Blind vs Visible Book Quantity)",
          "Period of Bin Check (Max days before bin is flagged as overdue for count)"
        ],
        mandatoryPrerequisites: ["Activity Areas created in /SCWM/TACTA"],
        commonPitfalls: ["Setting Low Stock Check threshold too high (e.g. 50 units), causing pickers to spend 5 minutes counting large bins during outbound rush hours."]
      },
      realWorldBusinessExample: {
        companyContext: "Lego Group Distribution Center (Billund)",
        scenario: "Lego implements Low Stock Check (threshold <= 5 boxes) across 80,000 forward pick bins. In 1 year, pickers complete 240,000 micro-counts during standard picking runs.",
        businessOutcome: "94% of all warehouse inventory is audited automatically without hiring external temporary count auditors."
      },
      industryExamples: {
        automotive: "Low stock check verifying last remaining engine gasket in flow rack.",
        aerospace: "Putaway PI verifying existing serialized seals before adding new lot.",
        pharma: "HU Complete check scanning outer SSCC tamper barcode on cold vaccine boxes.",
        food_beverage: "Period of bin check enforcing 30-day maximum count interval for dairy.",
        mechanical: "Low stock check on heavy fasteners.",
        electronics: "Blind counting on reels of microchips.",
        retail: "Low stock check triggered when garment rack is down to last 2 shirts.",
        cpg: "HU Complete check on stretch-wrapped full pallet loads.",
        logistics_3pl: "Client-specific PI area rules.",
        construction: "Outdoor yard bin check period tracking.",
        industrial: "Ad-hoc count trigger when hydraulic fitting bin is below threshold."
      },
      scenarioQuestion: {
        prompt: "A warehouse manager wants to eliminate human counting bias by ensuring RF workers never see how many units the system expects in a bin during inventory counts. Which setting in SPRO achieves this?",
        options: [
          "In the Physical Inventory Area definition (/SCWM/TPI_AREA), leave the 'Display Book Quantity' checkbox unchecked.",
          "Delete the material master.",
          "Change the user password.",
          "Disable RF scanners."
        ],
        correctIndex: 0,
        explanation: "Leaving 'Display Book Quantity' unchecked in the Physical Inventory Area customizing forces a blind count. The RF screen will display an empty quantity field, requiring the worker to physically count and enter the true number."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: RF picking task blocked with mandatory Low Stock Check prompt",
          errorCode: "LS-CHECK-01",
          rootCause: "Picker confirmed quantity that dropped bin stock below threshold.",
          solutionSteps: [
            "Count remaining items in bin.",
            "Enter number on RF screen (or enter 0 if completely empty).",
            "Confirm task. System creates background PI record and completes picking."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "What is 'HU Complete' in Physical Inventory Area settings and how does it optimize pallet warehouse counting?",
          keyPoints: ["Allows counter to confirm entire Handling Unit by scanning external SSCC barcode without unpacking internal pieces"],
          sampleAnswer: "The 'HU Complete' indicator in Physical Inventory Area customizing allows the inventory clerk to verify intact, sealed Handling Units (such as stretch-wrapped pallets or tamper-sealed boxes) by simply scanning the external HU barcode. If the barcode is valid and undamaged, EWM assumes the internal contents match book inventory, accelerating high-bay pallet counts by 90%."
        }
      ],
      consultantChallenge: {
        title: "Dynamic AI Risk-Based Inventory Sampling Architecture",
        clientRequirement: "Client has 200,000 storage bins. They cannot count all bins every month. Management wants an AI algorithm to analyze historical error rates, picker turnover, and SKU velocity, and dynamically flag the top 5% highest-risk bins for automated weekly count generation.",
        architecturalOptions: [
          {
            optionName: "Option A: Implement SAP EWM Cycle Counting with Dynamic Velocity Re-Classification and Ad-Hoc Sampling Jobs",
            pros: ["Focuses 80% of counting effort on the 5% highest-risk inventory", "Detects 90% of shrinkage before customer shipment errors occur", "Reduces total counting labor by 65%"],
            cons: ["Requires periodic ABC classification update batch job"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement ABC Cycle Counting in /SCWM/MAT1. Schedule weekly background job using /SCWM/PI_CREATE with dynamic criteria (High Velocity, Discrepancy History, Period Since Last Count > 60 days)."
      }
    }
  },
  {
    id: "ewm-pi-configuration",
    module: "EWM",
    category: "Physical Inventory",
    subcategory: "Configuration & Reconciliation",
    title: "Physical Inventory Configuration & Difference Analyzer (/SCWM/DIFF_ANALYZER)",
    subtitle: "SPRO configuration, Number Ranges, Cycle Counting, Tolerance Groups, Difference Analyzer reconciliation, and ERP General Ledger posting.",
    level: "CONSULTANT",
    tags: ["Difference Analyzer", "PI Configuration", "Tolerance Group", "Posting Change", "Movement Type 711", "Movement Type 712", "/SCWM/DIFF_ANALYZER", "/SCWM/PI_POST"],
    relatedTopics: ["ewm-pi-fundamentals", "ewm-pi-area-execution", "ewm-queue-management"],
    ewmMonitorNode: "Physical Inventory / Difference Analyzer",
    configurationView: {
      prerequisites: ["ERP Integration configured for Movement Types 711 / 712", "Tolerance Groups defined in SPRO"],
      configObjects: ["Tolerance Groups for Difference Analyzer (/SCWM/TTOLGRP)", "Standard Reason Codes (/SCWM/TREASON)", "PI Number Ranges (/SCWM/PI_NR)"],
      determinationLogic: [
        "1. When /SCWM/PI_POST executes, discrepancies exceeding User Tolerance Group route to /SCWM/DIFF_ANALYZER.",
        "2. Difference Analyzer posting triggers qRFC to ERP creating Material Document (711 Stock Loss / 712 Stock Gain).",
        "3. Standard Reason Codes categorize shrinkage (e.g. 01 Theft, 02 Damage, 03 Supplier Mispack)."
      ],
      assignmentSteps: [
        "1. Define Tolerance Groups for Users (Max Absolute Value, Max Percentage) in SPRO.",
        "2. Assign Tolerance Groups to User IDs in /SCWM/USER.",
        "3. Define Standard Reason Codes in /SCWM/IMG -> Physical Inventory.",
        "4. Configure ERP Movement Types 711 / 712 mapping in /SCWM/TMAPSTLOC."
      ],
      executionSteps: [
        "Post count in /SCWM/PI_POST",
        "Open transaction /SCWM/DIFF_ANALYZER",
        "Select Warehouse and Product, assign Reason Code",
        "Click 'Post to ERP' -> S/4HANA Finance document generated"
      ],
      testingProcedure: ["Post count variance of $5,000; verify it requires Supervisor Tolerance Group in Difference Analyzer."],
      troubleshooting: ["Error: User not authorized to post variance -> Increase user limit in Tolerance Group customizing."]
    },
    pedagogy: {
      beginnerExplanation: "When you count inventory and discover that $10,000 worth of computer chips are missing, you can't just delete them quietly! A senior finance manager must investigate: Was it stolen? Was it damaged? Did a supplier under-ship? The Difference Analyzer is SAP EWM's supreme court for inventory discrepancies: it holds variances in quarantine until a financial manager audits and approves the balance sheet loss!",
      formalDefinition: "The Difference Analyzer (/SCWM/DIFF_ANALYZER) in SAP EWM is the financial reconciliation cockpit that decouples physical warehouse quantity adjustments from ERP general ledger postings. Discrepancies exceeding configured User Tolerance Groups (/SCWM/TTOLGRP) are held in the Difference Analyzer until authorized, generating ERP Material Documents (Movement Types 711/712) and GL accounting entries.",
      whyUsed: [
        "Prevents rogue warehouse workers from writing off expensive inventory without supervisory approval",
        "Enforces dual-control separation of duties between physical counters and financial controllers",
        "Categorizes root causes of inventory shrinkage via Standard Reason Codes",
        "Synchronizes EWM inventory quants with S/4HANA Financial Accounting (FI/CO)"
      ],
      howItWorks: [
        "1. Worker counts bin in /SCWM/PI_COUNT and enters count showing 8 units instead of 10 (Variance: -2 units, -$2,000).",
        "2. /SCWM/PI_POST immediately adjusts EWM physical quants so warehouse operations can continue.",
        "3. Because -$2,000 exceeds the worker's $500 Tolerance Group, the variance is sent to /SCWM/DIFF_ANALYZER.",
        "4. Inventory Controller opens /SCWM/DIFF_ANALYZER, reviews audit history, selects Reason Code '02 - Transit Damage', and clicks 'Post to ERP'.",
        "5. EWM sends qRFC to S/4HANA, posting Movement Type 711 (GI Physical Inventory Loss) to Inventory Loss GL Account."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Tolerance Groups in SPRO",
          description: "Create Tolerance Group 'CLERK' (Max $500 / 5%) and 'MANAGER' (Max $50,000 / 25%).",
          sapAction: "Tolerance Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TTOLGRP"]
        },
        {
          stepNumber: 2,
          title: "Assign Tolerance Group to User Master",
          description: "In /SCWM/USER, assign Tolerance Group 'CLERK' to user JOHN_DOE.",
          sapAction: "User Tolerance Mapping",
          tcode: "/SCWM/USER",
          tablesUpdated: ["/SCWM/TUSER"]
        },
        {
          stepNumber: 3,
          title: "Post Count Variance to Difference Analyzer",
          description: "User posts count in /SCWM/PI_POST. EWM adjusts physical quant and creates record in /SCWM/DIFF_ANALYZER.",
          sapAction: "Difference Interception",
          tcode: "/SCWM/PI_POST",
          tablesUpdated: ["/SCWM/DIFF_ANALYZER"]
        },
        {
          stepNumber: 4,
          title: "Financial Posting in /SCWM/DIFF_ANALYZER",
          description: "Manager reviews variance, enters Reason Code 'DAMG', and posts. Generates S/4HANA Material Doc (711).",
          sapAction: "ERP Financial Posting",
          tcode: "/SCWM/DIFF_ANALYZER",
          tablesUpdated: ["MATDOC", "BKPF", "BSEG"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Financial Tool", name: "Difference Analyzer", description: "Inventory variance reconciliation cockpit (Transaction /SCWM/DIFF_ANALYZER)" },
        { objectType: "Customizing Object", name: "Tolerance Group", description: "Value and percentage threshold limits (Table /SCWM/TTOLGRP)" },
        { objectType: "Customizing Object", name: "Standard Reason Code", description: "Shrinkage classification code (Table /SCWM/TREASON)" }
      ],
      relatedTcodes: ["/SCWM/DIFF_ANALYZER", "/SCWM/PI_POST", "/SCWM/USER", "/SCWM/MON", "MB51"],
      fioriApps: [{ appId: "F3131", appName: "Manage Physical Inventory Documents", fioriRole: "Inventory Controller" }],
      relatedTables: [
        { tableName: "/SCWM/TTOLGRP", description: "Tolerance Groups", keyFields: ["MANDT", "LGNUM", "TOLGRP"] },
        { tableName: "/SCWM/DIFF_ANALYZER", description: "Difference Analyzer Queue Records", keyFields: ["MANDT", "LGNUM", "DIFF_ID"] },
        { tableName: "/SCWM/TREASON", description: "Standard Reason Codes", keyFields: ["MANDT", "LGNUM", "REASON"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Physical Inventory -> Define Tolerance Groups",
        criticalSettings: [
          "User Tolerance Groups (Max Total Value per Document, Max Value per Item)",
          "Difference Analyzer Tolerance Groups",
          "ERP Movement Type Mapping (711 Loss / 712 Gain)"
        ],
        mandatoryPrerequisites: ["ERP Integration active for Physical Inventory differences"],
        commonPitfalls: ["Failing to periodically clear the Difference Analyzer, resulting in millions of dollars in unposted ledger discrepancies accumulating over quarters."]
      },
      realWorldBusinessExample: {
        companyContext: "Sony PlayStation European Hub",
        scenario: "During quarterly count, 5 PS5 consoles ($2,500 total) are missing from Storage Bin 04-12-01. Count clerk posts count; variance lands in /SCWM/DIFF_ANALYZER. Security audits CCTV, finds theft, and Finance Director approves the write-off with Reason Code 'THEFT'.",
        businessOutcome: "Complete SOX compliance audit trail with zero unapproved inventory write-downs."
      },
      industryExamples: {
        automotive: "Writing off damaged body panels dropped by forklift during transit.",
        aerospace: "Investigating variance on titanium fasteners requiring FAA discrepancy report.",
        pharma: "Regulatory mandatory DEA reporting for any controlled substance difference > 0.",
        food_beverage: "Posting shrinkage due to expired dairy spoilage (Reason Code 'EXPIRED').",
        mechanical: "Writing off scrapped machining castings.",
        electronics: "Difference analyzer tracking ESD damage during assembly.",
        retail: "Reconciling retail store return differences.",
        cpg: "Posting pallet wrapper damage write-offs.",
        logistics_3pl: "Generating client inventory insurance claim reports from Difference Analyzer.",
        construction: "Accounting for damaged outdoor lumber.",
        industrial: "Reconciling scrap valve differences."
      },
      scenarioQuestion: {
        prompt: "A warehouse clerk with Tolerance Group 'CLERK' (Max value $500) attempts to post a Physical Inventory difference of -$3,200 in /SCWM/DIFF_ANALYZER. The system throws error: 'Exceeds user tolerance limit'. What must occur to post this difference to the General Ledger?",
        options: [
          "A supervisor or financial manager with a higher Tolerance Group (e.g. 'MANAGER' allowing up to $50,000) must log into /SCWM/DIFF_ANALYZER and execute the posting.",
          "The clerk must delete the warehouse number.",
          "The material must be marked as free of charge.",
          "The difference is automatically deleted after 24 hours."
        ],
        correctIndex: 0,
        explanation: "In SAP EWM Physical Inventory security, postings in /SCWM/DIFF_ANALYZER are strictly governed by User Tolerance Groups. If a variance exceeds the user's maximum permitted value, a user with a higher tolerance group must approve and post the financial adjustment."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Difference Analyzer posting failed in ERP: Posting period 08/2026 closed",
          errorCode: "M7-053",
          rootCause: "ERP Financial posting period (MMPV / OB52) is closed for the material movement date.",
          solutionSteps: [
            "Open ERP GUI transaction MMPV / OB52.",
            "Open current posting period for Company Code and Plant.",
            "Return to /SCWM/DIFF_ANALYZER and click 'Post to ERP' again."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Which ERP Movement Types are triggered when posting inventory losses and inventory gains from the SAP EWM Difference Analyzer?",
          keyPoints: ["Movement Type 711 for Inventory Loss (Stock Reduction); Movement Type 712 for Inventory Gain (Stock Increase)"],
          sampleAnswer: "When posting from the EWM Difference Analyzer (/SCWM/DIFF_ANALYZER), EWM communicates via qRFC to S/4HANA Inventory Management. Negative variances (inventory loss) trigger Movement Type 711 (GI Physical Inventory Loss), crediting Inventory and debiting Inventory Loss Account. Positive variances (inventory gain) trigger Movement Type 712 (GR Physical Inventory Gain), debiting Inventory and crediting Inventory Gain Account."
        }
      ],
      consultantChallenge: {
        title: "Automated Root-Cause Analytics Cockpit for Difference Analyzer",
        clientRequirement: "A retail client experiences $4M in annual inventory shrinkage across 10 warehouses. Management wants a real-time analytics dashboard embedded into the Difference Analyzer that automatically correlates shrinkage with specific pickers, vendors, shifts, and storage aisles to detect systematic theft rings.",
        architecturalOptions: [
          {
            optionName: "Option A: Build CDS Analytical Views on /SCWM/DIFF_ANALYZER and /SCWM/PI_COUNT and deploy SAP Fiori Analytics App",
            pros: ["Real-time shrinkage heatmap by warehouse aisle and shift", "Automated anomaly detection alerts sent to Security", "Reduces annual theft losses by 45%"],
            cons: ["Requires CDS view development and SAP Analytics Cloud / Fiori KPI setup"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Develop custom CDS Views joining /SCWM/DIFF_ANALYZER, /SCWM/ORDIM_C (last confirmed picker), and /SCWM/LAGP (Aisle). Expose via SAP Fiori KPI Tile 'Warehouse Loss & Shrinkage Cockpit'."
      }
    }
  },

  // =========================================================================
  // 10. QUEUE & RESOURCE MANAGEMENT
  // =========================================================================
  {
    id: "ewm-queue-management",
    module: "EWM",
    category: "Queue & Resource Management",
    subcategory: "Queue Management",
    title: "Queue Management & Determination Criteria (/SCWM/QMAN / /SCWM/IMG)",
    subtitle: "Queue Types, Queue Definition, Determination Criteria (Source/Dest Activity Area, Activity, WPT, Bin Access Type), Access Sequences, and Queues for Physical Inventory.",
    level: "PROFESSIONAL",
    tags: ["Queue Management", "Queue Determination", "Activity Area", "WPT", "Bin Access Type", "Queue Access Sequence", "/SCWM/QMAN", "/SCWM/IMG"],
    relatedTopics: ["ewm-resource-management", "ewm-rf-framework", "ewm-wocr-advanced-outbound"],
    ewmMonitorNode: "Resource Management / Queues",
    configurationView: {
      prerequisites: ["Activity Areas defined", "Warehouse Process Types defined", "Resource Groups configured"],
      configObjects: ["Queue Definition (/SCWM/TQUEUE)", "Queue Determination Criteria Table (/SCWM/TQD_DET)", "Queue Access Sequence"],
      determinationLogic: [
        "1. When a Warehouse Order is created, EWM evaluates Queue Determination table /SCWM/TQD_DET.",
        "2. Determination criteria: Source Activity Area + Destination Activity Area + Activity (PICK/PTWY) + WPT + Bin Access Type.",
        "3. Access Sequence searches from most specific rule to generic fallback rule.",
        "4. WO is placed into the determined Queue (e.g. QUEUE_FORKLIFT_01)."
      ],
      assignmentSteps: [
        "1. Define Queues (e.g. INB_HIGH, OUT_PICK, OUT_MEZZ, PI_QUEUE) in SPRO under Cross-Process Settings -> Resource Management -> Define Queues.",
        "2. Define Queue Determination Criteria assigning Source/Dest Activity Area, WPT, and Bin Access Type.",
        "3. Configure Queue Determination Access Sequence.",
        "4. Test task creation and verify Queue assignment in /SCWM/MON."
      ],
      executionSteps: ["Create Warehouse Task", "System evaluates criteria and assigns task to Queue", "RF worker logs into Queue and receives work"],
      testingProcedure: ["Create picking task in Mezzanine; verify task routes to QUEUE_MEZZ."],
      troubleshooting: ["Error: Task assigned to blank queue -> Add generic fallback rule in /SCWM/TQD_DET."]
    },
    pedagogy: {
      beginnerExplanation: "Think of an airport taxi dispatcher or a bank teller line. Customers don't wander randomly! Standard customers wait in Queue 1, VIP customers in Queue 2, and Foreign Currency exchanges go to Queue 3. A Queue in SAP EWM is a digital work waiting line: it groups warehouse tasks by equipment type (Forklift vs Hand Cart) and location (High Rack vs Mezzanine) so the right worker gets the right job!",
      formalDefinition: "Queue Management in SAP EWM (/SCWM/QMAN) organizes and dispatches Warehouse Orders to mobile RF resources. When a Warehouse Order is generated, EWM determines its Queue based on a 5-tier matrix: Source Activity Area, Destination Activity Area, Activity (e.g. PICK, PUTAWAY, INVENTORY), Warehouse Process Type (WPT), and Bin Access Type.",
      whyUsed: [
        "Ensures tasks requiring specialized equipment (e.g. High-Reach Forklift) are only assigned to qualified drivers",
        "Prevents workers on Foot Carts from being assigned 1,000 KG high-bay pallet tasks",
        "Enables System-Guided task dispatching to maximize warehouse throughput",
        "Prioritizes urgent customer waves and rush orders dynamically"
      ],
      howItWorks: [
        "DETERMINATION CRITERIA:",
        "1. Source Activity Area: Where the goods are picked from.",
        "2. Destination Activity Area: Where the goods are taken to.",
        "3. Activity: The operation code (e.g. PICK, PTWY, INT_MOVE, PI).",
        "4. Warehouse Process Type (WPT): e.g. 1010 Putaway vs 2010 Picking vs 3010 Scrapping.",
        "5. Bin Access Type: e.g. Manual Reach (Level 1) vs Narrow Aisle Turret Truck (Levels 2-8).",
        "EXECUTION: When WO is created, EWM matches criteria in table /SCWM/TQD_DET and assigns Queue. Driver logs into RF, selects Queue, and receives tasks sequentially."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Queues in SPRO",
          description: "Create Queues: 'Q_INB_PALLET', 'Q_OUT_MEZZ', 'Q_OUT_VNA', 'Q_PHYS_INV'.",
          sapAction: "Queue Definition",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TQUEUE"]
        },
        {
          stepNumber: 2,
          title: "Configure Queue Determination Matrix",
          description: "In /SCWM/TQD_DET, map: Source Area 'MEZZ' + Activity 'PICK' -> Queue 'Q_OUT_MEZZ'.",
          sapAction: "Determination Matrix Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TQD_DET"]
        },
        {
          stepNumber: 3,
          title: "Warehouse Order Assignment",
          description: "WOCR generates picking order. EWM evaluates matrix and assigns WO to 'Q_OUT_MEZZ'.",
          sapAction: "Automated WO Queuing",
          tcode: "/SCWM/WOCR",
          tablesUpdated: ["/SCWM/WHO"]
        },
        {
          stepNumber: 4,
          title: "RF Resource Task Execution",
          description: "Operator logs into RF terminal, selects 'Q_OUT_MEZZ', and system displays next optimal task.",
          sapAction: "RF Queue Execution",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/RSRC"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Queue", description: "Logical work waiting line for tasks (Table /SCWM/TQUEUE)" },
        { objectType: "Customizing Object", name: "Queue Determination Matrix", description: "5-criteria mapping table (Table /SCWM/TQD_DET)" },
        { objectType: "Transactional Object", name: "Warehouse Order", description: "Executable work package assigned to Queue (Table /SCWM/WHO)" }
      ],
      relatedTcodes: ["/SCWM/QMAN", "/SCWM/RSRC", "/SCWM/RFUI", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Queues & Resources", fioriRole: "Warehouse Supervisor" }],
      relatedTables: [
        { tableName: "/SCWM/TQUEUE", description: "Queues Master Table", keyFields: ["MANDT", "LGNUM", "QUEUE"] },
        { tableName: "/SCWM/TQD_DET", description: "Queue Determination Rules", keyFields: ["MANDT", "LGNUM", "SRC_AA", "DST_AA", "ACTIVITY", "PROCS"] },
        { tableName: "/SCWM/WHO", description: "Warehouse Orders (Contains Assigned Queue)", keyFields: ["MANDT", "LGNUM", "WHO"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Resource Management -> Define Queue Determination",
        criticalSettings: [
          "Queue Determination Access Sequence priority",
          "Operating Mode (Manual Selection vs System Guided)",
          "Queue Assignment for Physical Inventory Tasks"
        ],
        mandatoryPrerequisites: ["Activity Areas and Storage Bin Access Types defined"],
        commonPitfalls: ["Forgetting to maintain a generic fallback rule (All fields blank -> DEFAULT_QUEUE), causing unassigned tasks to sit invisible in /SCWM/MON."]
      },
      realWorldBusinessExample: {
        companyContext: "Costco Wholesale Depot",
        scenario: "Costco operates a 30-foot high-bay rack warehouse. Forklift tasks in Aisle 1-20 (VNA Very Narrow Aisle) are routed to Q_VNA_CRANE. Ground-level pallet jack picks are routed to Q_FLOOR_JACK.",
        businessOutcome: "Zero ground pickers receive high-bay tasks, 100% equipment safety compliance."
      },
      industryExamples: {
        automotive: "Queues dedicated to JIT tugger train line-side supply.",
        aerospace: "High-security queue restricted to certified defense cleared operators.",
        pharma: "Cold-chain queue dedicated to operators with thermal suits.",
        food_beverage: "Deep freezer queue with maximum 30-minute exposure time limits.",
        mechanical: "Heavy 20-ton crane queue.",
        electronics: "Clean-room ESD cart queue.",
        retail: "E-commerce rush wave priority queue.",
        cpg: "Full pallet slip-sheet forklift queue.",
        logistics_3pl: "Client-partitioned billing queues.",
        construction: "Outdoor yard all-terrain forklift queue.",
        industrial: "Emergency line-down repair spares queue."
      },
      scenarioQuestion: {
        prompt: "A warehouse supervisor notices that when picking tasks are created for Storage Type 0020 (Mezzanine Floor), the tasks have no Queue assigned and sit unassigned in /SCWM/MON. What is the root cause?",
        options: [
          "Table /SCWM/TQD_DET is missing an entry matching Source Activity Area 'MEZZ' and Activity 'PICK'.",
          "The material master description was missing.",
          "The customer's email was invalid.",
          "The printer ran out of paper."
        ],
        correctIndex: 0,
        explanation: "When a Warehouse Order is generated, EWM searches table /SCWM/TQD_DET for a matching rule. If no rule matches the Source/Dest Activity Area, Activity, and WPT, and no generic fallback rule exists, the WO is created with a blank Queue."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Warehouse Order created with blank Queue (Unassigned)",
          errorCode: "QUEUE-DET-01",
          rootCause: "Missing entry in Queue Determination Table /SCWM/TQD_DET.",
          solutionSteps: [
            "Open SPRO -> Cross-Process Settings -> Resource Management -> Define Queue Determination.",
            "Add entry for Warehouse W001, matching Activity Area and Activity.",
            "Add generic fallback entry (All criteria blank -> Q_DEFAULT) to catch unclassified tasks."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "Explain the 5 criteria evaluated by SAP EWM to determine a Queue for a Warehouse Order.",
          keyPoints: ["1. Source Activity Area, 2. Destination Activity Area, 3. Activity (e.g. PICK/PTWY), 4. Warehouse Process Type (WPT), 5. Bin Access Type"],
          sampleAnswer: "To assign a Warehouse Order to a Queue, SAP EWM evaluates: 1) Source Activity Area (where goods originate), 2) Destination Activity Area (where goods are going), 3) Activity (e.g. PICK, PUTAWAY, INVENTORY, INTERNAL), 4) Warehouse Process Type (WPT e.g. 1010 vs 2010), and 5) Bin Access Type (e.g. Manual ground reach vs High-rack crane). EWM matches these against table /SCWM/TQD_DET using a prioritized Access Sequence."
        }
      ],
      consultantChallenge: {
        title: "Dynamic Congestion-Based Queue Balancing Architecture",
        clientRequirement: "A distribution center has 2 identical mezzanine pick zones (Zone North and Zone South). If Zone North queue has 50 waiting tasks while Zone South has only 5 tasks, system must dynamically balance and redirect incoming picking orders to available pickers.",
        architecturalOptions: [
          {
            optionName: "Option A: Implement EWM Workload Balancing & Dynamic Queue Sequences (/SCWM/QMAN)",
            pros: ["Prevents picker bottlenecks and idle worker time", "Reduces total wave completion time by 28%", "100% automated real-time queue re-allocation"],
            cons: ["Requires configuring Resource Queue Sequences in /SCWM/RSRC"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "In /SCWM/RSRC, assign multiple Queues to Resource Groups with prioritized Queue Sequences. When primary Queue 'Q_NORTH' is empty or locked, EWM System-Guided selection immediately feeds tasks from secondary Queue 'Q_SOUTH'."
      }
    }
  },
  {
    id: "ewm-resource-management",
    module: "EWM",
    category: "Queue & Resource Management",
    subcategory: "Resource Management",
    title: "Resource Management & Execution Architecture (/SCWM/RSRC / /SCWM/USER)",
    subtitle: "Resource Types, Resource Groups, HU Type Groups for Resources, User assignment, Resource-to-Queue sequences, and execution interplay.",
    level: "CONSULTANT",
    tags: ["Resource Management", "Resource Type", "Resource Group", "User Assignment", "Queue Sequence", "System Guided", "/SCWM/RSRC", "/SCWM/USER"],
    relatedTopics: ["ewm-queue-management", "ewm-rf-framework", "ewm-wocr-advanced-outbound"],
    ewmMonitorNode: "Resource Management / Resources",
    configurationView: {
      prerequisites: ["Queues defined in /SCWM/TQUEUE", "Users created in SAP system (SU01)"],
      configObjects: [
        "Resource Type (/SCWM/TRSRCTYPE)",
        "Resource Group (/SCWM/TRSRCGROUP)",
        "Resource Master (/SCWM/RSRC)",
        "User to Resource Assignment (/SCWM/USER)"
      ],
      determinationLogic: [
        "1. Resource Type defines physical capabilities (Max Weight, Bin Access Type, Speed, Display Profile).",
        "2. Resource Group defines operational pool (e.g. FORKLIFT_POOL, MEZZ_PICKERS).",
        "3. Queue Sequence assigned to Resource Group defines priority order of Queues.",
        "4. User logs into RF (/SCWM/RFUI), selects Resource, and receives tasks from assigned Queue Sequence."
      ],
      assignmentSteps: [
        "1. Define Resource Types (e.g. FORKLIFT, PALLET_JACK, AMR, CART) in SPRO.",
        "2. Define Resource Groups in SPRO and assign Queue Sequence.",
        "3. Create Resource Master in transaction /SCWM/RSRC.",
        "4. Assign User to Resource in /SCWM/USER."
      ],
      executionSteps: [
        "Worker logs into /SCWM/RFUI",
        "System recognizes User / Resource assignment",
        "Selects 'System Guided' -> EWM dispatches highest priority task from Queue Sequence",
        "Task confirmed -> Next task dispatched"
      ],
      testingProcedure: ["Assign 2 queues to resource sequence; verify tasks from Queue 1 are offered before Queue 2."],
      troubleshooting: ["Error: User cannot log in -> Check User-to-Resource assignment in /SCWM/USER."]
    },
    pedagogy: {
      beginnerExplanation: "In a warehouse, you have different tools and different people: forklift trucks, electric pallet jacks, pushcarts, and mobile robots. A Resource is the digital profile of a specific vehicle or worker. Just like a heavy truck driver shouldn't be given a small shopping cart, EWM Resource Management ensures each vehicle and worker only receives tasks matching their physical strength and equipment capabilities!",
      formalDefinition: "Resource Management in SAP EWM (/SCWM/RSRC) governs the physical execution entities (workers, forklifts, AGVs, automated cranes) operating in the warehouse. It structures Resource Types (equipment capabilities), Resource Groups (operational teams), Queue Sequences (prioritized task queues), and User Master mappings (/SCWM/USER) to drive System-Guided execution.",
      whyUsed: [
        "Enforces equipment safety limits (e.g. weight, volume, height reach) during task assignment",
        "Maximizes worker utilization via automated System-Guided task dispatching",
        "Tracks individual worker productivity, travel time, and task confirmation timestamps in /SCWM/MON",
        "Coordinates seamless task handover between human forklift operators and automated robots"
      ],
      howItWorks: [
        "RESOURCE HIERARCHY:",
        "1. Resource Type: Defines physical parameters (e.g. FORK_HIGH: Max Weight 2000 KG, Height 12m, Bin Access Type B1/B2).",
        "2. Resource Group: Groups resources performing similar functions (e.g. GRP_HIGHBAY_DRIVERS).",
        "3. Queue Sequence: Assigns priority list of Queues to the Resource Group (e.g. Priority 1: Q_EMERGENCY_PUTAWAY -> Priority 2: Q_STANDARD_PUTAWAY -> Priority 3: Q_PICKING).",
        "4. Execution: When a driver logs into /SCWM/RFUI, EWM automatically evaluates the Queue Sequence and delivers the highest priority task."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Resource Types & Groups in SPRO",
          description: "Define Type 'FORKLIFT_01' (Bin Access: High-Rack). Define Group 'GRP_FORKLIFT'.",
          sapAction: "Resource Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TRSRCTYPE", "/SCWM/TRSRCGROUP"]
        },
        {
          stepNumber: 2,
          title: "Assign Queue Sequence to Resource Group",
          description: "Assign Queues: 1. Q_PUTAWAY_HIGH, 2. Q_PICK_HIGH, 3. Q_REPLENISHMENT.",
          sapAction: "Queue Sequence Mapping",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TRSCQ"]
        },
        {
          stepNumber: 3,
          title: "Create Resource Master in /SCWM/RSRC",
          description: "Create Resource 'FORK_01' under Warehouse W001 and assign to Group 'GRP_FORKLIFT'.",
          sapAction: "Resource Master Creation",
          tcode: "/SCWM/RSRC",
          tablesUpdated: ["/SCWM/RSRC"]
        },
        {
          stepNumber: 4,
          title: "Assign User to Resource & Execute System-Guided RF",
          description: "In /SCWM/USER, assign User 'JSMITH' to 'FORK_01'. Driver logs into RFUI -> System Guided -> Tasks delivered.",
          sapAction: "System Guided Execution",
          tcode: "/SCWM/USER / /SCWM/RFUI",
          tablesUpdated: ["/SCWM/TUSER", "/SCWM/ORDIM_C"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Resource Type", description: "Equipment technical classification (Table /SCWM/TRSRCTYPE)" },
        { objectType: "Customizing Object", name: "Resource Group", description: "Team/fleet pool with assigned Queue Sequence (Table /SCWM/TRSRCGROUP)" },
        { objectType: "Master Data", name: "Resource Master", description: "Physical vehicle/worker identity (Table /SCWM/RSRC)" }
      ],
      relatedTcodes: ["/SCWM/RSRC", "/SCWM/USER", "/SCWM/RFUI", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Resources", fioriRole: "Operations Lead" }],
      relatedTables: [
        { tableName: "/SCWM/RSRC", description: "Resource Master Data", keyFields: ["MANDT", "LGNUM", "RSRC"] },
        { tableName: "/SCWM/TRSRCTYPE", description: "Resource Types", keyFields: ["MANDT", "LGNUM", "RSRCTYPE"] },
        { tableName: "/SCWM/TUSER", description: "User to Resource Assignment", keyFields: ["MANDT", "UNAME"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Cross-Process Settings -> Resource Management",
        criticalSettings: [
          "HU Type Group for Resources (Validates which pallet types the forklift can lift)",
          "Bin Access Type compatibility",
          "Interleaving: Enabling alternating Putaway and Picking tasks on the same trip"
        ],
        mandatoryPrerequisites: ["Queues defined and mapped in SPRO"],
        commonPitfalls: ["Failing to assign a Queue Sequence to the Resource Group, resulting in 'No tasks available in queue' message on RF screens."]
      },
      realWorldBusinessExample: {
        companyContext: "Home Depot Distribution Center",
        scenario: "Home Depot implements Task Interleaving on Forklift Resources: A driver drops an inbound lumber pallet at Aisle 14 (Putaway), and instead of driving back empty, EWM instantly dispatches a picking task in Aisle 15 (Picking).",
        businessOutcome: "Forklift deadhead empty travel reduced by 42%, increasing overall fleet throughput by 30%."
      },
      industryExamples: {
        automotive: "Forklift resource assigned to heavy engine stillages with max weight 5,000 KG.",
        aerospace: "Biometrically verified resource assigned to classified military component queue.",
        pharma: "Clean-room certified resource with stainless steel cart profile.",
        food_beverage: "Heated-cab forklift resource assigned exclusively to -25C freezer queue.",
        mechanical: "Overhead 20-ton crane resource with crane operator user mapping.",
        electronics: "Anti-static wrist-strap verified resource profile.",
        retail: "Seasonal temporary worker resource pool assigned to forward pick face.",
        cpg: "Double-pallet clamp truck resource profile.",
        logistics_3pl: "Client-contract certified resource groups.",
        construction: "Outdoor rough-terrain telehandler resource.",
        industrial: "Hazardous chemical respirator certified resource profile."
      },
      scenarioQuestion: {
        prompt: "How does Task Interleaving in SAP EWM Resource Management optimize forklift productivity?",
        options: [
          "It alternates between putaway and picking tasks during a single round trip (e.g. put away a pallet in Aisle 5, then immediately pick a pallet from Aisle 6), minimizing empty travel distance.",
          "It makes the forklift drive twice as fast.",
          "It cancels all open customer orders.",
          "It shuts down the warehouse at lunch."
        ],
        correctIndex: 0,
        explanation: "Task Interleaving optimizes vehicle travel efficiency by combining putaway and picking tasks in the same zone. Instead of driving empty back to the receiving dock after a putaway, EWM assigns a nearby picking or replenishment task to utilize the return trip."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: RF Screen shows: 'No Warehouse Tasks available' despite 50 open orders in /SCWM/MON",
          errorCode: "RSRC-NOTASK-01",
          rootCause: "The open tasks are in Queues not included in the Resource Group's Queue Sequence, or the Resource Type cannot access the target bins.",
          solutionSteps: [
            "Open /SCWM/MON -> Resource Management -> Resources.",
            "Verify Resource Group assigned to your resource.",
            "Check SPRO -> Resource Management -> Define Queue Sequence and ensure the open queues are added.",
            "Verify Bin Access Type on Storage Bins matches Resource Type."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the complete execution interplay between Warehouse Tasks, Warehouse Orders, Queues, Resources, and RF Users in SAP EWM.",
          keyPoints: ["WT is atomic task; WOCR bundles WTs into WO; Queue Determination assigns WO to Queue; Resource Group has Queue Sequence; RF User logs in as Resource to execute WO"],
          sampleAnswer: "In SAP EWM execution architecture: 1) Individual stock movements exist as Warehouse Tasks (/SCWM/ORDIM_O). 2) Warehouse Order Creation Rules (WOCR) bundle these tasks into executable Warehouse Orders (/SCWM/WHO). 3) Queue Determination assigns the WO to a specific Queue based on activity area and process type. 4) A Resource Group has an assigned Queue Sequence establishing priority. 5) A physical worker or robot logs in as a Resource in /SCWM/RFUI (mapped via /SCWM/USER) and executes the Warehouse Orders sequentially."
        }
      ],
      consultantChallenge: {
        title: "Dynamic Real-Time RTLS Indoor GPS Forklift Fleet Dispatching",
        clientRequirement: "A 2,000,000 sq ft logistics park has 150 forklifts equipped with Ultra-Wideband (UWB) Real-Time Location System (RTLS) sensors. When an urgent rush order arrives, EWM must dispatch the task to the physically nearest qualified forklift based on real-time sub-meter GPS coordinates.",
        architecturalOptions: [
          {
            optionName: "Option A: Integrate RTLS Indoor Positioning with EWM Travel Distance Calculation and Dynamic Resource Assignment API",
            pros: ["Dispatches tasks to the physically closest vehicle in real time", "Reduces average task dispatch latency by 50%", "Saves 1,200 driving miles daily across 150 forklifts"],
            cons: ["Requires UWB anchor infrastructure and RTLS middleware bridge"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement Travel Distance Calculation in EWM. Integrate RTLS positioning coordinates via EWM Resource API. EWM calculates real-time Euclidean/network distance from forklift position to pick bin and assigns task dynamically."
      }
    }
  },

  // =========================================================================
  // 11. RADIO FREQUENCY (RF) FRAMEWORK & SIMULATION
  // =========================================================================
  {
    id: "ewm-rf-framework",
    module: "EWM",
    category: "Radio Frequency (RF)",
    subcategory: "RF Framework Architecture",
    title: "Radio Frequency (RF) Framework & Screen Architecture (/SCWM/RFUI)",
    subtitle: "Complete RF architecture, Screen Layers (Display Profile, Business Logic, Content Provider, Presentation Profile, Personalization Profile, Device mapping), and System-Guided execution.",
    level: "CONSULTANT",
    tags: ["RF Framework", "Radio Frequency", "Display Profile", "Presentation Profile", "Business Logic Layer", "Content Provider", "Personalization Profile", "/SCWM/RFUI"],
    relatedTopics: ["ewm-rf-execution-sim", "ewm-queue-management", "ewm-resource-management"],
    ewmMonitorNode: "Resource Management / RF Users",
    configurationView: {
      prerequisites: ["Presentation Devices defined (Screen Resolution 8x40, 16x20, GUI, Fiori)", "Resource Types created"],
      configObjects: [
        "Display Profile (/SCWM/TRF_DISP_PROF)",
        "Presentation Profile (/SCWM/TRF_PRES_PROF)",
        "Personalization Profile (/SCWM/TRF_PERS_PROF)",
        "Presentation Device Mapping (/SCWM/TRF_DEV)"
      ],
      determinationLogic: [
        "1. When user launches /SCWM/RFUI, EWM detects client terminal resolution and Presentation Device.",
        "2. Presentation Device determines Display Profile (e.g. Character-based 8x40 vs Graphical GUI).",
        "3. Presentation Profile determines available menu transactions (Inbound, Outbound, Internal, PI).",
        "4. Personalization Profile allows customizing screen field positions, hidden buttons, and default verification codes."
      ],
      assignmentSteps: [
        "1. Define Display Profile (Screen lines, columns, font scaling) in SPRO Mobile Data Entry.",
        "2. Define Presentation Profile and assign standard or custom RF Menus.",
        "3. Define Presentation Device and assign Display Profile + Presentation Profile.",
        "4. Assign Presentation Device to Resource Type or User Master."
      ],
      executionSteps: [
        "Launch transaction /SCWM/RFUI (or WebDynpro / Fiori Mobile Client)",
        "Log in with User, Warehouse, Resource, and Presentation Device",
        "Navigate hierarchical menus: 01 Inbound -> 02 Putaway -> 01 Putaway by WO",
        "Scan barcodes to execute tasks"
      ],
      testingProcedure: ["Test /SCWM/RFUI with different Display Profiles (8x40 vs Graphical) and verify screen rendering."],
      troubleshooting: ["Error: RF Screen layout distorted -> Check Display Profile lines/columns in /SCWM/TRF_DISP_PROF."]
    },
    pedagogy: {
      beginnerExplanation: "Think of an RF scanner like a smartphone app for warehouse workers. A forklift driver holding a ruggedized barcode scanner needs huge buttons, high-contrast text, and zero clutter because they are wearing thick gloves in a dark aisle. The SAP EWM RF Framework is the behind-the-scenes engine that customizes the scanner screen size, buttons, and menus to fit any scanner hardware!",
      formalDefinition: "The Radio Frequency (RF) Framework in SAP EWM (/SCWM/RFUI) is a decoupled 5-layer screen and execution architecture that drives mobile barcode terminals, vehicle-mounted terminals (VMT), and voice headsets. It separates the Business Logic Layer, Content Provider, Display Profile, Presentation Profile, Personalization Profile, and Presentation Device mapping.",
      whyUsed: [
        "Enables 100% paperless, real-time scanning execution across all warehouse operations",
        "Adapts dynamically to diverse hardware: rugged handhelds (Zebra/Honeywell), truck screens, tablets, and wearable rings",
        "Enforces barcode verification (Poka-Yoke) to prevent picking or putting away at incorrect bins",
        "Supports both System-Guided execution (system pushes optimal task) and Manual Queue selection"
      ],
      howItWorks: [
        "THE 5 SCREEN ARCHITECTURE LAYERS:",
        "1. Business Logic Layer: Standard ABAP classes that execute database validations (e.g. check if scanned product matches delivery).",
        "2. Content Provider: Formats internal data into screen fields (Data Dictionary structures).",
        "3. Display Profile: Defines physical screen dimensions (e.g. 8 Lines x 40 Characters, Touchscreen Graphical, or Fiori UI5).",
        "4. Presentation Profile: Governs the menu tree hierarchy (e.g. Menu 01 Inbound, 02 Outbound, 03 Internal, 04 Physical Inventory).",
        "5. Personalization Profile: Customer-specific layout overrides (hide optional fields, rearrange button positions, auto-tab on scan).",
        "6. Presentation Device: Maps hardware terminal ID to Display and Presentation profiles."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Display Profile in SPRO",
          description: "Define Display Profile '**' (Standard GUI) and '01' (8x40 Character Mode).",
          sapAction: "Display Customizing",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TRF_DISP_PROF"]
        },
        {
          stepNumber: 2,
          title: "Define Presentation Profile & Menus",
          description: "Configure standard Menu hierarchy (/SCWM/RFMENU) with Inbound, Outbound, and PI options.",
          sapAction: "Menu Hierarchy Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TRF_PRES_PROF"]
        },
        {
          stepNumber: 3,
          title: "Define Presentation Device & Resource Mapping",
          description: "Create Device 'RF_ZEBRA_01' with Display Profile '01' and assign to Resource Type 'FORKLIFT'.",
          sapAction: "Device Assignment",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TRF_DEV"]
        },
        {
          stepNumber: 4,
          title: "Execute Mobile Scanning via /SCWM/RFUI",
          description: "Launch /SCWM/RFUI. Log in, select System-Guided, scan bin barcode, confirm item.",
          sapAction: "Mobile RF Execution",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Display Profile", description: "Screen dimension and scaling settings (Table /SCWM/TRF_DISP_PROF)" },
        { objectType: "Customizing Object", name: "Presentation Profile", description: "Menu tree and navigation paths (Table /SCWM/TRF_PRES_PROF)" },
        { objectType: "Transactional Screen", name: "RF Terminal Cockpit", description: "Mobile terminal execution transaction (/SCWM/RFUI)" }
      ],
      relatedTcodes: ["/SCWM/RFUI", "/SCWM/RFMENU", "/SCWM/RSRC", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - RF Sessions", fioriRole: "IT Systems Engineer" }],
      relatedTables: [
        { tableName: "/SCWM/TRF_DISP_PROF", description: "RF Display Profiles", keyFields: ["MANDT", "DISP_PROF"] },
        { tableName: "/SCWM/TRF_PRES_PROF", description: "RF Presentation Profiles", keyFields: ["MANDT", "PRES_PROF"] },
        { tableName: "/SCWM/TRF_DEV", description: "RF Presentation Devices", keyFields: ["MANDT", "DEV"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Mobile Data Entry",
        criticalSettings: [
          "Define Verification Profiles (Mandatory scan of Bin, Product, Batch, or HU)",
          "Step Flow & Subscreen sequence",
          "Function Key Mapping (F1 Help, F4 List, F7 Back, F8 More)"
        ],
        mandatoryPrerequisites: ["Presentation Profiles and Display Profiles created in SPRO"],
        commonPitfalls: ["Hardcoding screen sizes in ABAP rather than using the Display Profile framework, breaking rendering on different scanner screen models."]
      },
      realWorldBusinessExample: {
        companyContext: "Walmart Logistics Centers",
        scenario: "Walmart equips 5,000 forklift drivers with vehicle-mounted touchscreen tablets running /SCWM/RFUI. Presentation Profile customizes large touch buttons (F1 Confirm, F2 Skip, F3 Exception) with high-visibility yellow backgrounds.",
        businessOutcome: "Scanning error rate dropped to 0.001%, with 100% real-time task confirmation across 140 distribution centers."
      },
      industryExamples: {
        automotive: "RF scanner with integrated ring scanner for hands-free sequencing picking.",
        aerospace: "Secure encrypted RF terminal enforcing biometric thumbprint login.",
        pharma: "Clean-room sealed, alcohol-wipeable RF terminal with batch barcode verification.",
        food_beverage: "Freezer-rated RF scanner with heated optical scan window operating at -30C.",
        mechanical: "Long-range laser RF scanner reading 2D barcodes from 15 meters away on top rack bays.",
        electronics: "Anti-static ESD-certified mobile computer.",
        retail: "Wearable wrist-mounted mobile terminal for e-commerce picking.",
        cpg: "Forklift-mounted ruggedized tablet terminal.",
        logistics_3pl: "Multi-language RF presentation profile (English, Spanish, French, Polish).",
        construction: "Sunlight-readable high-nit rugged outdoor terminal.",
        industrial: "Intrinsically safe ATEX-certified RF terminal for explosive chemical environments."
      },
      scenarioQuestion: {
        prompt: "A warehouse implements new Zebra Android touch computers with a graphical display alongside legacy character-based 8x40 scanners. How does the SAP EWM RF Framework support both devices simultaneously without separate ABAP coding?",
        options: [
          "By defining two different Display Profiles in SPRO (one Character-based, one Graphical Touchscreen) and assigning them to their respective Presentation Devices in /SCWM/TRF_DEV.",
          "By creating two separate SAP systems.",
          "By buying new material master records.",
          "By turning off barcode scanning."
        ],
        correctIndex: 0,
        explanation: "The EWM RF Framework completely decouples business logic from screen presentation. The exact same business logic transaction (e.g. Putaway) automatically renders via the Character Display Profile on legacy screens and via the Graphical/Fiori Display Profile on modern touchscreen devices."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: RF Screen navigation loop / Subscreen flow error (/SCWM/RF_DE 012)",
          errorCode: "/SCWM/RF_DE012",
          rootCause: "Customized Step Flow in SPRO Mobile Data Entry has broken logical transaction link.",
          solutionSteps: [
            "Open SPRO -> Mobile Data Entry -> Define Step Flow.",
            "Inspect the logical transaction sequence for the active Presentation Profile.",
            "Ensure the Next Step and Function Key definitions point to valid subscreens."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the architectural layers of the SAP EWM RF Framework and how Verification Profiles enforce Poka-Yoke quality control.",
          keyPoints: ["5 layers: Business Logic, Content Provider, Display Profile, Presentation Profile, Personalization; Verification Profile enforces mandatory scanning of check digits, bins, or EAN barcodes"],
          sampleAnswer: "The EWM RF Framework is structured into 5 decoupled layers: 1) Business Logic Layer (ABAP core), 2) Content Provider (data structures), 3) Display Profile (screen dimensions/scaling), 4) Presentation Profile (menu trees), and 5) Personalization Profile (user overrides). Verification Profiles attached to RF screens enforce Poka-Yoke mistake-proofing by requiring mandatory scans of specific attributes (e.g. verifying a 3-digit bin check digit or EAN barcode) before allowing the worker to confirm the warehouse task."
        }
      ],
      consultantChallenge: {
        title: "Voice-Directed Hands-Free RF Warehouse Architecture",
        clientRequirement: "A frozen food distributor operating at -25C wants to eliminate handheld barcode scanners entirely. Pickers wearing heavy thermal gloves must receive tasks via spoken audio headset instructions and confirm tasks by speaking check-digit numbers into a microphone (Pick-by-Voice).",
        architecturalOptions: [
          {
            optionName: "Option A: Integrate Voice Middleware (e.g. Vocollect/Honeywell Voice) directly with SAP EWM RF Framework via SAP Certified Voice Direct Connector",
            pros: ["100% hands-free, eyes-free picking", "Increases pick speed by 25% in freezing temperatures", "Zero screen manipulation required by worker"],
            cons: ["Requires noise-canceling headsets and voice grammar template mapping"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement SAP EWM Voice Interface in SPRO Mobile Data Entry. Assign Voice Presentation Profile. EWM transmits text fields as speech synthesizer prompts and converts worker voice responses into RF verification confirmation events."
      }
    }
  },
  {
    id: "ewm-rf-execution-sim",
    module: "EWM",
    category: "Radio Frequency (RF)",
    subcategory: "RF Simulation",
    title: "Interactive RF Warehouse Execution Simulator (/SCWM/RFUI)",
    subtitle: "Interactive, step-by-step mobile scanner simulation covering Queue selection, Resource login, Task delivery, Source Bin scan, Destination Bin scan, and confirmation.",
    level: "INTERMEDIATE",
    tags: ["RF Simulator", "RFUI", "Barcode Scanner", "Task Confirmation", "Verification Code", "Step-by-Step RF", "/SCWM/RFUI"],
    relatedTopics: ["ewm-rf-framework", "ewm-queue-management", "ewm-resource-management"],
    ewmMonitorNode: "Resource Management / RF Terminal",
    processDiagram: {
      title: "Interactive RF Warehouse Task Execution Flow",
      nodes: [
        { id: "1", label: "RF Terminal Login", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Enter User: JSMITH, Resource: FORK_01" },
        { id: "2", label: "Queue Selection", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Select 'System Guided' or Queue 'Q_PUTAWAY'" },
        { id: "3", label: "Task Delivered", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Display: 'Go to Receiving Door 9010, Pick Pallet HU 100089'" },
        { id: "4", label: "Scan Source HU / Bin", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Scan Barcode: '9010-01-01' -> Verified" },
        { id: "5", label: "Transit to Destination", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Display: 'Deliver to High-Rack Bin: 01-14-02'" },
        { id: "6", label: "Scan Verification Code", system: "RF Terminal", tcode: "/SCWM/RFUI", description: "Scan Bin Check Digit '742' -> Verified" },
        { id: "7", label: "Task Confirmed", system: "EWM Core", tcode: "/SCWM/MON", description: "Stock quant updated to High-Rack in 0.2s" }
      ]
    },
    configurationView: {
      prerequisites: ["Warehouse Tasks generated in /SCWM/ORDIM_O", "Verification Profiles active in SPRO"],
      configObjects: ["Verification Profile (/SCWM/TVERIF)", "Barcode Specification (/SCWM/TBC)", "RF Screen Template"],
      determinationLogic: [
        "1. RF terminal prompts operator for mandatory verification fields in sequence.",
        "2. If scanned barcode does not match target, terminal beeps and blocks progression.",
        "3. Successful verification updates /SCWM/ORDIM_O to confirmed status /SCWM/ORDIM_C."
      ],
      assignmentSteps: [
        "1. Define Verification Profile in SPRO Mobile Data Entry.",
        "2. Assign Verification Profile to Warehouse Process Type or Storage Type.",
        "3. Test scan sequence in /SCWM/RFUI."
      ],
      executionSteps: [
        "Log into /SCWM/RFUI",
        "Select System Guided Task",
        "Scan Source Bin / HU",
        "Scan Destination Bin Check Digit",
        "Confirm task"
      ],
      testingProcedure: ["Simulate scanning incorrect bin barcode; verify error message 'Scanned bin does not match target bin'."],
      troubleshooting: ["Error: Scanner reads barcode but field does not advance -> Enable 'Auto Enter / Carriage Return' on hardware scanner settings."]
    },
    pedagogy: {
      beginnerExplanation: "This interactive simulator allows you to experience the exact screen-by-screen workflow of a real SAP EWM warehouse forklift driver holding a Zebra mobile computer. You will log in, accept an automated putaway task, scan the physical pallet barcode, navigate to the assigned high-rack aisle, scan the bin verification check digit, and confirm the stock movement!",
      formalDefinition: "The Interactive RF Warehouse Execution Simulator (/SCWM/RFUI) models the complete mobile runtime environment in SAP EWM. It emulates screen prompts, barcode input validation, verification check-digit algorithms, exception code triggers, and atomic database confirmation of Warehouse Tasks (/SCWM/ORDIM_O to /SCWM/ORDIM_C).",
      whyUsed: [
        "Provides hands-on practical experience with the primary tool used by 90% of warehouse shop-floor personnel",
        "Demonstrates real-time Poka-Yoke error prevention during barcode scanning",
        "Illustrates System-Guided task delivery without manual paper picking sheets",
        "Validates how warehouse task confirmation synchronously updates inventory in /SCWM/MON"
      ],
      howItWorks: [
        "Step 1: Driver logs in with User ID 'JSMITH' and Resource 'FORK_01'.",
        "Step 2: Driver clicks '01 System Guided'. EWM finds highest priority task in Queue 'Q_PUTAWAY_HIGH'.",
        "Step 3: Screen displays: 'Pick Pallet HU 800109 at Door 9010-01'. Driver scans HU barcode.",
        "Step 4: Screen displays destination: 'Drive to Aisle 01, Rack 14, Level 02 (Bin 01-14-02)'.",
        "Step 5: Driver arrives at bin and scans the 3-digit Check Digit '742'.",
        "Step 6: EWM confirms the task, moves stock quant to 01-14-02, and immediately displays the next task."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "RF Login & Initialization",
          description: "Enter User, Warehouse W001, Resource FORK_01, and Device ZEBRA01.",
          sapAction: "RF Login",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/RSRC"]
        },
        {
          stepNumber: 2,
          title: "System-Guided Task Dispatch",
          description: "System queries /SCWM/WHO and delivers highest priority open putaway task.",
          sapAction: "Task Dispatch",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 3,
          title: "Scan & Verify Source Location",
          description: "Driver scans pallet barcode. System validates against target HU in task.",
          sapAction: "Source Scan",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "Scan Destination Check Digit & Confirm",
          description: "Driver scans Destination Bin Check Digit. Task confirmed; quant updated.",
          sapAction: "Atomic Confirmation",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA", "/SCWM/LAGP"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Interactive Simulator", name: "RF Terminal Simulator", description: "Virtual mobile scanner interface" },
        { objectType: "Master Data", name: "Bin Check Digit", description: "Verification barcode on storage bin label" }
      ],
      relatedTcodes: ["/SCWM/RFUI", "/SCWM/MON", "/SCWM/RSRC", "/SCWM/LS03N"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor", fioriRole: "Warehouse Supervisor" }],
      relatedTables: [
        { tableName: "/SCWM/ORDIM_O", description: "Open Tasks", keyFields: ["MANDT", "LGNUM", "TANUM"] },
        { tableName: "/SCWM/ORDIM_C", description: "Confirmed Tasks", keyFields: ["MANDT", "LGNUM", "TANUM"] },
        { tableName: "/SCWM/AQUA", description: "Stock Quants", keyFields: ["MANDT", "LGNUM", "MATID", "LGPLA"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Mobile Data Entry -> Verification Control",
        criticalSettings: [
          "Mandatory Verification: Source Bin (X), Source HU (X), Destination Bin (X)",
          "Allow Difference / Exception Code Entry (F7)",
          "Auto-Tabulation on Barcode Scan"
        ],
        mandatoryPrerequisites: ["Active Warehouse Tasks in /SCWM/ORDIM_O"],
        commonPitfalls: ["Operator accidentally scanning the bin coordinate text instead of the check digit barcode when Verification Profile requires check digit."]
      },
      realWorldBusinessExample: {
        companyContext: "Procter & Gamble Mega Hub",
        scenario: "P&G deploys 300 RF terminals executing 450,000 barcode scans daily. By enforcing Check Digit scanning at every high-bay bin, wrong-bin putaways were reduced from 120 per week to exactly 0.",
        businessOutcome: "100% accurate inventory location tracking, saving $1.2M annually in lost-pallet search time."
      },
      industryExamples: {
        automotive: "RF scanning JIT container barcode at assembly line drop-point.",
        aerospace: "RF scanning serial number on jet turbine blades.",
        pharma: "RF scanning 2D GS1 DataMatrix batch barcode with expiry date.",
        food_beverage: "RF scanning catch-weight scale barcode.",
        mechanical: "RF scanning heavy crate asset tag.",
        electronics: "RF scanning reel 2D barcode at surface-mount feeder.",
        retail: "RF scanning e-commerce pick cart tote barcode.",
        cpg: "RF scanning full pallet SSCC label.",
        logistics_3pl: "RF multi-client cross-dock scan.",
        construction: "RF outdoor yard GPS coordinate scan.",
        industrial: "RF scanning maintenance spare part bin."
      },
      scenarioQuestion: {
        prompt: "During an RF putaway task, the worker arrives at destination bin 01-14-02, but scans the adjacent bin label 01-14-03 by mistake. What does the SAP EWM RF terminal do?",
        options: [
          "The terminal sounds an error beep, displays message 'Scanned bin does not match target bin', and blocks the worker from confirming the task until the correct bin is scanned.",
          "The system automatically renames the storage rack.",
          "The system moves the warehouse to the other bin silently.",
          "The task is deleted."
        ],
        correctIndex: 0,
        explanation: "Poka-Yoke Verification Profiles enforce strict validation. If the scanned barcode does not exactly match the expected target bin coordinate or check digit in the Warehouse Task record, EWM rejects the input and locks progression until corrected."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: RF Screen locks with error 'Invalid Barcode Format'",
          errorCode: "RF-BC-ERR-01",
          rootCause: "Hardware scanner is transmitting leading/trailing prefix characters not configured in Barcode Specification (/SCWM/TBC).",
          solutionSteps: [
            "Open transaction /SCWM/TBC (Barcode Types).",
            "Verify AI (Application Identifier) prefix rules (e.g. GS1-128 prefix '00' for SSCC).",
            "Adjust hardware scanner profile to strip unneeded non-printable characters."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "How does 'System-Guided' execution differ from 'Manual Queue Selection' in SAP EWM /SCWM/RFUI?",
          keyPoints: ["System-Guided automatically pushes the single highest-priority task based on wave and queue sequences; Manual Queue allows the worker to choose which queue to work from"],
          sampleAnswer: "In Manual Queue Selection, the worker chooses a specific Queue from a list and selects tasks manually. In System-Guided execution, the worker simply presses 'System Guided'; EWM analyzes the Resource Group's Queue Sequence, wave deadlines, and task priorities, and automatically serves the single optimal Warehouse Order directly to the screen, preventing workers from cherry-picking easy tasks."
        }
      ],
      consultantChallenge: {
        title: "Augmented Reality (AR) Smart-Glasses Pick-by-Vision Architecture",
        clientRequirement: "A high-tech electronics distributor wants pickers to wear augmented reality smart glasses (e.g. Google Glass / Vuzix) running SAP EWM. The glasses must project a green virtual bounding box directly over the exact physical bin shelf in the picker's field of view and scan barcodes via the built-in camera hands-free.",
        architecturalOptions: [
          {
            optionName: "Option A: Deploy SAP EWM AR Mobile App communicating with EWM via OData REST APIs and Real-Time Optical Computer Vision",
            pros: ["100% hands-free picking with zero handheld equipment", "Reduces search time by 40% via heads-up visual navigation arrows", "Camera scans barcodes automatically as picker looks at bin"],
            cons: ["Requires smart-glasses hardware fleet management and battery swapping stations"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Develop SAP Fiori/OData client for Android-based AR smart glasses. Connect to EWM Warehouse Order OData API. AR app overlays bin coordinate HUD graphics and triggers camera barcode confirmation on gaze."
      }
    }
  },

  // =========================================================================
  // 12. WAREHOUSE MOVEMENTS — REPLENISHMENT, SCRAP, ADHU & ADPROD
  // =========================================================================
  {
    id: "ewm-replenishment",
    module: "EWM",
    category: "Warehouse Movements",
    subcategory: "Replenishment",
    title: "Replenishment Strategies & Execution (/SCWM/REPL / /SCWM/IMG)",
    subtitle: "Planned Replenishment, Order-Related Replenishment, Automatic Replenishment, Direct Replenishment, Storage Type level, and Storage Bin level configuration.",
    level: "PROFESSIONAL",
    tags: ["Replenishment", "Planned Replenishment", "Order-Related Replenishment", "Automatic Replenishment", "Direct Replenishment", "Min/Max Quantity", "/SCWM/REPL"],
    relatedTopics: ["ewm-scrapping-posting-change", "ewm-intelligent-picking", "ewm-wocr-advanced-outbound"],
    ewmMonitorNode: "Stock / Replenishment",
    configurationView: {
      prerequisites: ["Forward Pick Face (0030) and Reserve High-Rack (0010) storage types defined", "Min/Max Quantities maintained in /SCWM/MAT1 or /SCWM/BINMAT"],
      configObjects: ["Replenishment Control (/SCWM/TREPL)", "Replenishment Warehouse Process Type (e.g. 3010)", "Replenishment Strategies (Planned, Order-Related, Direct)"],
      determinationLogic: [
        "1. Planned: When stock in Forward Pick Face drops below Minimum Quantity, EWM creates WT to replenish up to Maximum Quantity.",
        "2. Order-Related: Wave release detects insufficient pick-face stock to fulfill outbound orders, triggering immediate replenishment.",
        "3. Direct: RF picker confirms pick task that drops bin below threshold, instantly triggering background replenishment WT."
      ],
      assignmentSteps: [
        "1. Define Replenishment Control for Storage Type in SPRO.",
        "2. Maintain Min Qty, Max Qty, and Replenishment Qty in /SCWM/MAT1 (Storage Type level) or /SCWM/BINMAT (Bin level).",
        "3. Define Warehouse Process Type 3010 for Internal Replenishment.",
        "4. Schedule background job /SCWM/REPL or trigger via Wave."
      ],
      executionSteps: [
        "Stock in pick bin drops below Min Qty",
        "Execute /SCWM/REPL (or automatic background batch job)",
        "EWM generates Replenishment WTs from Reserve Rack to Pick Face",
        "Forklift driver confirms replenishment tasks via RF"
      ],
      testingProcedure: ["Pick stock to reduce bin below Min Qty; run /SCWM/REPL and verify WT created."],
      troubleshooting: ["Error: No replenishment task created -> Check Min/Max quantities in /SCWM/MAT1 and verify reserve stock exists in /SCWM/AQUA."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're running a grocery store shelf. The shelf only holds 20 jars of peanut butter (Forward Pick Face). When customers buy 15 jars and only 5 are left (Minimum Quantity), an employee brings a fresh cardboard box of 15 jars from the back warehouse room (Reserve Storage) to fill the shelf back up to 20 (Maximum Quantity). That is Replenishment!",
      formalDefinition: "Replenishment in SAP EWM (/SCWM/REPL) is the internal stock transfer mechanism that refills forward picking areas from reserve high-bay storage. It supports 4 distinct methodologies: Planned Replenishment (Min/Max thresholds), Order-Related Replenishment (wave-driven demand), Automatic Replenishment (triggered during task confirmation), and Direct Replenishment.",
      whyUsed: [
        "Prevents picker stockouts at forward pick faces during high-volume shipping waves",
        "Optimizes ergonomic warehouse space: small convenient pick shelves backed by massive high-bay reserve racks",
        "Automates internal inventory balancing without manual inventory audits",
        "Reduces order picking travel time by keeping fast-moving inventory stocked near shipping doors"
      ],
      howItWorks: [
        "TYPES OF REPLENISHMENT:",
        "1. Planned Replenishment: Scheduled batch job runs /SCWM/REPL. Scans Storage Type 0030. If Current Stock + Open Inbound Tasks < Minimum Quantity, calculates Replenishment Qty = Max Qty - Current Stock. Creates WT from Reserve 0010 to Pick Face 0030.",
        "2. Order-Related Replenishment: Wave release checks demand for 100 units. Pick Face only has 30 units. System immediately generates Replenishment WT for 70 units before releasing picking tasks.",
        "3. Automatic Replenishment: RF picker confirms picking task. If bin stock drops below threshold, EWM automatically triggers replenishment task in the background.",
        "4. Direct Replenishment: Used for fixed pick bins in pick-to-light operations."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Maintain Min/Max Thresholds in /SCWM/MAT1",
          description: "In /SCWM/MAT1, maintain Storage Type 0030: Min Qty = 10 EA, Max Qty = 50 EA, Replen Qty = 40 EA.",
          sapAction: "Master Data Maintenance",
          tcode: "/SCWM/MAT1",
          tablesUpdated: ["/SCWM/MAT1"]
        },
        {
          stepNumber: 2,
          title: "Stock Drops Below Minimum Threshold",
          description: "Outbound picking reduces bin stock from 50 EA to 6 EA (Below Min Qty 10 EA).",
          sapAction: "Stock Reduction",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/AQUA"]
        },
        {
          stepNumber: 3,
          title: "Execute Replenishment Run in /SCWM/REPL",
          description: "Run /SCWM/REPL. EWM calculates shortage of 44 EA, rounds to 40 EA, and creates WT from Reserve 0010.",
          sapAction: "Replenishment Task Generation",
          tcode: "/SCWM/REPL",
          tablesUpdated: ["/SCWM/ORDIM_O"]
        },
        {
          stepNumber: 4,
          title: "Forklift Driver Confirms Replenishment",
          description: "Driver picks pallet from High-Rack 0010 and confirms into Pick-Face 0030 via RF scanner.",
          sapAction: "Task Confirmation",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/AQUA"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Replenishment Strategy", description: "Min/Max calculation rules (Table /SCWM/TREPL)" },
        { objectType: "Master Data", name: "Min/Max Thresholds", description: "Storage Type or Bin specific stock targets (Table /SCWM/MAT1 / /SCWM/BINMAT)" },
        { objectType: "Transactional Object", name: "Replenishment Warehouse Task", description: "Internal transfer movement task (WPT 3010)" }
      ],
      relatedTcodes: ["/SCWM/REPL", "/SCWM/BINMAT", "/SCWM/MAT1", "/SCWM/MON", "/SCWM/IMG"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Replenishment", fioriRole: "Inventory Lead" }],
      relatedTables: [
        { tableName: "/SCWM/TREPL", description: "Replenishment Control per Storage Type", keyFields: ["MANDT", "LGNUM", "LGTYP"] },
        { tableName: "/SCWM/BINMAT", description: "Fixed Bin Product Assignment & Min/Max", keyFields: ["MANDT", "LGNUM", "LGTYP", "LGPLA", "MATID"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Internal Warehouse Movements -> Replenishment Control",
        criticalSettings: [
          "Replenishment Strategy: 1 (Planned), 2 (Order-Related), 3 (Automatic), 4 (Direct)",
          "Rounding Rule for Full Box / Layer / Pallet",
          "Include Open Inbound Tasks in Min Quantity calculation"
        ],
        mandatoryPrerequisites: ["Min and Max quantities maintained in /SCWM/MAT1 or /SCWM/BINMAT"],
        commonPitfalls: ["Failing to account for 'Open Inbound Tasks' in replenishment calculation, causing EWM to generate duplicate replenishment tasks for the same bin."]
      },
      realWorldBusinessExample: {
        companyContext: "Target Omnichannel DC",
        scenario: "Target operates 1,200 forward pick bins for cosmetics. Scheduled batch job /SCWM/REPL runs every 60 minutes. As soon as pick bins drop below 20 units, high-reach forklifts replenish them from top reserve high-bay racks.",
        businessOutcome: "Pick-face stockouts reduced by 99.4%, eliminating 2,500 picker delay hours during peak holiday shipping."
      },
      industryExamples: {
        automotive: "Order-related replenishment feeding assembly line kitting areas before shift start.",
        aerospace: "Planned replenishment of airframe rivets to mechanic point-of-use bins.",
        pharma: "Replenishment of clean-room picking flow racks from temperature-controlled reserve vault.",
        food_beverage: "Direct replenishment of beverage pick tunnels from gravity roller reserve racks.",
        mechanical: "Replenishment of hardware fasteners to assembly benches.",
        electronics: "Automatic replenishment of micro-component reels to surface-mount pick carts.",
        retail: "Nightly planned replenishment refilling e-commerce pick faces for morning waves.",
        cpg: "Full pallet replenishment to case-pick mezzanine flow racks.",
        logistics_3pl: "Client-contract replenishment threshold management.",
        construction: "Replenishment of construction hardware bins from bulk yard.",
        industrial: "Replenishment of machine maintenance consumables."
      },
      scenarioQuestion: {
        prompt: "In a retail warehouse, an outbound wave release requires 150 units of Product A. Forward Pick Bin 01 has only 30 units in stock. What type of replenishment automatically creates a task to move 120 units from reserve high-racks before picking begins?",
        options: [
          "Order-Related Replenishment",
          "Planned Replenishment",
          "Annual Inventory",
          "Cycle Counting"
        ],
        correctIndex: 0,
        explanation: "Order-Related Replenishment is triggered specifically by outbound demand (e.g. Wave release or Outbound Delivery Order creation). When the picking engine detects that current pick-face stock is insufficient to satisfy the wave, it calculates the exact deficit and generates an urgent Order-Related Replenishment task."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: /SCWM/REPL runs but generates 0 replenishment tasks despite empty pick bins",
          errorCode: "REPL-NOTASK-01",
          rootCause: "Reserve storage types have 0 available stock, or reserve stock is blocked by open tasks or quality inspection status.",
          solutionSteps: [
            "Open /SCWM/MON -> Stock and Bin -> Physical Stock.",
            "Verify Product has unrestricted stock in Reserve Storage Type 0010.",
            "Check if reserve stock is locked by open putaway tasks or QM inspection.",
            "Verify Stock Removal Strategy for Replenishment WPT 3010."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Advanced",
          question: "Explain the difference between Storage Type level replenishment vs Storage Bin level (Fixed Bin) replenishment in SAP EWM.",
          keyPoints: ["Storage Type level (/SCWM/MAT1) evaluates total stock in the storage type; Fixed Bin level (/SCWM/BINMAT) evaluates min/max stock in a specific fixed bin coordinate"],
          sampleAnswer: "In Storage Type level replenishment, Min/Max quantities are maintained in the Warehouse Product Master (/SCWM/MAT1). EWM monitors the cumulative total stock across the entire storage type. In Fixed Bin replenishment, Min/Max quantities are maintained for specific bin coordinates in /SCWM/BINMAT (Fixed Storage Bins). EWM monitors that individual physical bin and creates replenishment tasks specifically to replenish that fixed coordinate when it drops below minimum."
        }
      ],
      consultantChallenge: {
        title: "Predictive AI Replenishment Engine for Flash-Sale Volatility",
        clientRequirement: "An e-commerce retailer runs 2-hour lightning flash sales where 10,000 units of a single SKU can be ordered within 30 minutes. Standard min/max replenishment is too slow and causes massive picker stockout queues. System must pre-replenish forward pick faces 30 minutes BEFORE the flash sale begins based on promotional schedules.",
        architecturalOptions: [
          {
            optionName: "Option A: Integrate SAP Promotion Management / IBP with EWM Pre-Replenishment Wave Batch Jobs",
            pros: ["100% stock availability during lightning flash sales", "Eliminates picker wait bottlenecks", "Pre-stages inventory during low-activity shift hours"],
            cons: ["Requires promotion calendar interface to trigger pre-replenishment WTs"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Create dynamic Pre-Replenishment program triggered 1 hour prior to flash sale. Program reads promotional forecast quantity, generates bulk replenishment tasks from Reserve 0010 to Flash Pick Stage 0035, and ensures 100% stock availability."
      }
    }
  },
  {
    id: "ewm-scrapping-posting-change",
    module: "EWM",
    category: "Warehouse Movements",
    subcategory: "Scrapping & Posting Changes",
    title: "Scrapping Process & Stock Posting Changes (/SCWM/ADHU / /SCWM/ADPROD)",
    subtitle: "Stock Status Transformations, Scrapping to Scrap Bin (Movement Type 551), ADHU (Posting Change for HU), ADPROD (Posting Change for Product), and ERP synchronization.",
    level: "PROFESSIONAL",
    tags: ["Scrapping", "Posting Change", "Stock Type Transformation", "ADHU", "ADPROD", "Movement Type 551", "/SCWM/ADHU", "/SCWM/ADPROD", "/SCWM/POST"],
    relatedTopics: ["ewm-replenishment", "ewm-master-data", "ewm-pi-configuration"],
    ewmMonitorNode: "Stock / Posting Changes",
    configurationView: {
      prerequisites: ["Scrapping Warehouse Process Type 4010 defined", "Scrap Storage Type / Bin defined (e.g. Storage Type 9040, Bin SCRAP-BIN)"],
      configObjects: ["Posting Change Document Types (/SCDL/TDETDOC)", "Warehouse Process Type 4010 (Scrapping)", "Stock Types (F2 Unrestricted, B5 Blocked, Q3 Quality, S6 Scrap)"],
      determinationLogic: [
        "1. ADHU transforms entire Handling Unit stock status; ADPROD transforms partial product quantity.",
        "2. Moving stock to Scrap Storage Type 9040 triggers Posting Change to Stock Type S6 (Scrap).",
        "3. Posting Goods Issue from Scrap Bin triggers ERP Movement Type 551 (GI Scrapping) via qRFC."
      ],
      assignmentSteps: [
        "1. Define Scrap Storage Type 9040 (Role: Scrap / Staging) in /SCWM/T331.",
        "2. Define Scrapping Warehouse Process Type 4010 and assign ERP Movement Type 551.",
        "3. Define Stock Types F2, B5, Q3, S6 and map to Availability Groups.",
        "4. Configure Posting Change Document Type 'TW' in /SCDL/TDETDOC."
      ],
      executionSteps: [
        "Open /SCWM/ADPROD or /SCWM/ADHU",
        "Select Product/HU, enter Source Bin and Target Stock Type (e.g. S6) / Target Bin (SCRAP-BIN)",
        "Execute Posting Change -> WT created and confirmed",
        "Post Goods Issue to write off scrap in S/4HANA (551)"
      ],
      testingProcedure: ["Execute /SCWM/ADPROD for 5 damaged units; verify ERP Material Document 551 is posted."],
      troubleshooting: ["Error: Scrap GI blocked -> Check ERP cost center assignment for Movement Type 551."]
    },
    pedagogy: {
      beginnerExplanation: "Sometimes goods in a warehouse get damaged, expire, or break. You can't sell broken bottles of wine! Step 1: You change the digital tag on the box from 'Sellable' to 'Scrap / Damaged' (Posting Change). Step 2: You physically carry the broken box to the giant garbage dumpster bin behind the warehouse (Scrapping). Step 3: Finance writes off the loss as scrap (Movement Type 551). That's Scrapping & Posting Changes!",
      formalDefinition: "Scrapping and Posting Changes in SAP EWM (/SCWM/ADPROD / /SCWM/ADHU) govern the transformation of stock status (e.g. Unrestricted F2 -> Blocked B5 -> Scrap S6) and the write-off of obsolete/damaged materials. Moving stock to the designated Scrap Storage Type (9040) triggers Goods Issue with ERP Movement Type 551 (GI Scrapping to Cost Center).",
      whyUsed: [
        "Immediately quarantines damaged, contaminated, or expired stock from being picked for customer orders",
        "Provides audit-compliant write-off procedures for hazardous waste and environmental disposal",
        "Enables partial-quantity status changes (/SCWM/ADPROD) and full-pallet status changes (/SCWM/ADHU)",
        "Synchronizes warehouse physical stock status with S/4HANA Financial Accounting and Controlling (CO)"
      ],
      howItWorks: [
        "POSTING CHANGE METHODS:",
        "1. ADPROD (/SCWM/ADPROD): Executes a posting change for a loose product or partial quantity (e.g. change 10 out of 50 units in Bin 01-02-03 from Unrestricted F2 to Blocked B5).",
        "2. ADHU (/SCWM/ADHU): Executes a posting change for an entire Handling Unit (e.g. change an entire pallet of 500 units to Quality Inspection Q3 atomically).",
        "3. SCRAPPING: Operator creates WT moving damaged stock to Scrap Storage Type 9040 (Bin: SCRAP-ZONE). When scrap truck arrives, clicking Goods Issue in /SCWM/MON sends qRFC to ERP, posting Movement Type 551 to the Scrap Expense Cost Center."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Identify Damaged Stock in Warehouse",
          description: "Forklift driver discovers crushed pallet in Storage Bin 02-10-04.",
          sapAction: "Damage Identification",
          tcode: "/SCWM/MON",
          tablesUpdated: ["/SCWM/AQUA"]
        },
        {
          stepNumber: 2,
          title: "Execute Posting Change in /SCWM/ADHU",
          description: "In /SCWM/ADHU, select Pallet HU 800450. Change Destination Stock Type to S6 (Scrap Stock).",
          sapAction: "Stock Status Change",
          tcode: "/SCWM/ADHU",
          tablesUpdated: ["/SCWM/AQUA", "/SCWM/HUHDR"]
        },
        {
          stepNumber: 3,
          title: "Move Pallet to Scrap Storage Type 9040",
          description: "System generates WT moving pallet from High-Rack to Scrap Disposal Area 9040.",
          sapAction: "Transfer to Scrap Bin",
          tcode: "/SCWM/RFUI",
          tablesUpdated: ["/SCWM/ORDIM_C", "/SCWM/LAGP"]
        },
        {
          stepNumber: 4,
          title: "Post Scrapping Goods Issue to S/4HANA",
          description: "In /SCWM/MON -> Stock -> Scrap Area, click 'Post Goods Issue'. ERP posts Movement Type 551 to Scrap Cost Center.",
          sapAction: "ERP Financial Write-Off",
          tcode: "/SCWM/MON",
          tablesUpdated: ["MATDOC", "BKPF", "BSEG"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Transactional Tool", name: "ADHU / ADPROD", description: "Direct Posting Change transactions in EWM" },
        { objectType: "Customizing Object", name: "Stock Type", description: "EWM Inventory Status (F2 Unrestricted, B5 Blocked, S6 Scrap)" },
        { objectType: "Financial Movement", name: "ERP Movement Type 551", description: "Goods Issue for Scrapping to Cost Center" }
      ],
      relatedTcodes: ["/SCWM/ADHU", "/SCWM/ADPROD", "/SCWM/POST", "/SCWM/MON", "MB51"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - Posting Changes", fioriRole: "Inventory Lead" }],
      relatedTables: [
        { tableName: "/SCWM/AQUA", description: "Physical Stock Quants (Contains CAT Stock Type)", keyFields: ["MANDT", "LGNUM", "MATID", "CAT", "LGPLA"] },
        { tableName: "/SCDL/DB_PROCH_O", description: "Posting Change Documents", keyFields: ["MANDT", "DOCID"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Internal Warehouse Movements -> Scrapping",
        criticalSettings: [
          "Define Scrap Storage Type (Role: Scrapping / Staging)",
          "Default Cost Center and G/L Account for Scrapping in ERP OBYC / OKB9",
          "Stock Type Mapping in /SCWM/TMAPSTLOC"
        ],
        mandatoryPrerequisites: ["Scrapping Warehouse Process Type 4010 created in /SCWM/TWPT"],
        commonPitfalls: ["Failing to maintain a default Cost Center in ERP for Movement Type 551, causing the qRFC scrap queue to hang with error 'Account assignment mandatory'."]
      },
      realWorldBusinessExample: {
        companyContext: "Heineken Brewery Distribution",
        scenario: "During forklift transit, 2 pallets of bottled beer are dropped and shattered. Warehouse supervisor executes /SCWM/ADHU -> moves to Scrap Zone 9040 -> clicks Post GI. EWM triggers ERP Movement Type 551 with Cost Center CC_BREW_SCRAP.",
        businessOutcome: "Damaged inventory written off immediately, preventing shattered glass hazards and updating financial profit & loss accounts."
      },
      industryExamples: {
        automotive: "Scrapping defective stamping metal parts with steel scrap recycler certificate.",
        aerospace: "Strict certified destruction and incineration of life-limited titanium aircraft parts.",
        pharma: "Witnessed biohazard destruction of expired narcotic batches with DEA Form 41.",
        food_beverage: "Scrapping spoiled produce with municipal compost certificate.",
        mechanical: "Scrapping rusted machine castings.",
        electronics: "Scrapping cracked silicon wafers to e-waste precious metal recovery.",
        retail: "Writing off unsellable customer returns.",
        cpg: "Scrapping crushed shampoo bottles.",
        logistics_3pl: "Generating client chargeback reports for damaged freight.",
        construction: "Writing off warped timber.",
        industrial: "Scrapping failed hydraulic hoses."
      },
      scenarioQuestion: {
        prompt: "What is the key functional difference between transaction /SCWM/ADHU and transaction /SCWM/ADPROD in SAP EWM?",
        options: [
          "/SCWM/ADHU executes a posting change or movement for an entire Handling Unit (all contents transformed together), while /SCWM/ADPROD executes a posting change for a specific product or partial quantity without requiring an entire HU.",
          "/SCWM/ADHU is for outbound; ADPROD is for inbound.",
          "/SCWM/ADHU deletes the material master.",
          "They are identical transactions."
        ],
        correctIndex: 0,
        explanation: "Transaction /SCWM/ADHU is Handling Unit-centric: it transforms the stock type or location of the entire HU and all products contained within it in a single step. Transaction /SCWM/ADPROD is Product-centric: it allows the operator to select specific product quants, batches, or partial quantities within a bin or HU to undergo a posting change."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Scrapping GI failed in ERP: Account assignment for Cost Center required",
          errorCode: "CO-CCA-551",
          rootCause: "ERP Movement Type 551 requires a valid Cost Center which is missing in transaction OKB9 or default customizing.",
          solutionSteps: [
            "Open ERP GUI transaction OKB9.",
            "Maintain entry mapping Company Code, Cost Element (Scrap Expense G/L), and Default Cost Center.",
            "Return to EWM SMQ1 and activate the stuck queue."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Intermediate",
          question: "What happens in S/4HANA Finance and Inventory Management when you execute a Scrapping process in SAP EWM?",
          keyPoints: ["EWM stock quant is deleted/reduced; qRFC triggers ERP Movement Type 551, crediting Inventory Asset Account and debiting Scrap Expense G/L with Cost Center assignment"],
          sampleAnswer: "When scrapping is executed in EWM, the physical stock quant (/SCWM/AQUA) in the Scrap Storage Type is cleared. EWM sends a synchronous qRFC to S/4HANA, posting an Inventory Management Material Document with Movement Type 551 (GI Scrapping). S/4HANA Finance generates an accounting document that credits the Inventory Balance Sheet Account and debits the Scrap Expense Account assigned to the designated Cost Center."
        }
      ],
      consultantChallenge: {
        title: "Hazardous Chemical Scrapping with Dual Electronic Signature Compliance",
        clientRequirement: "A chemical plant scraps hazardous toxic reagents. Regulatory EPA and OSHA laws mandate that scrapping cannot be posted without two independent certified chemical safety officers authenticating with biometric electronic signatures in the system.",
        architecturalOptions: [
          {
            optionName: "Option A: Configure SAP EWM Digital Signature Framework with 2-Person Rule (4-Eyes Principle) on Scrapping Warehouse Process Type 4010",
            pros: ["100% EPA / OSHA audit compliance", "Tamper-proof digital cryptographic signature log", "Prevents unauthorized toxic waste disposal"],
            cons: ["Requires configuring Digital Signature Tool in SPRO Cross-Application Components"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Activate Digital Signature Framework in SPRO for EWM Scrapping WPT 4010. Configure Signature Strategy with 2-Person Rule (Signer 1: Warehouse Lead, Signer 2: EHS Chemical Officer). EWM blocks PGI until both cryptographic signatures are verified."
      }
    }
  },

  // =========================================================================
  // 13. POST PROCESSING FRAMEWORK (PPF)
  // =========================================================================
  {
    id: "ewm-ppf-architecture",
    module: "EWM",
    category: "Post Processing Framework (PPF)",
    subcategory: "PPF Architecture & Setup",
    title: "Post Processing Framework (PPF) Architecture & Setup (SPPFP / /SCWM/IMG)",
    subtitle: "Complete PPF setup, Application Area (/SCWM/WME, /SCDL/DELIVERY), Action Profile, Action Definition, Determination Procedure, Condition Records, and Processing Times.",
    level: "CONSULTANT",
    tags: ["PPF", "Post Processing Framework", "Action Profile", "Action Definition", "Determination Procedure", "Condition Technique", "SPPFP", "/SCWM/PRD_IN", "/SCWM/OUT_PRD"],
    relatedTopics: ["ewm-inbound-fundamentals", "ewm-outbound-process", "ewm-wave-management"],
    ewmMonitorNode: "Tools / PPF Actions",
    configurationView: {
      prerequisites: ["EWM Application Areas (/SCWM/WME, /SCDL/DELIVERY) active", "Condition Maintenance Groups defined"],
      configObjects: [
        "Application Profile (/SCWM/WME)",
        "Action Profile (e.g. /SCWM/PRD_IN, /SCWM/OUT_PRD)",
        "Action Definition (e.g. AUTO_WT_CREATE, PRINT_SHP_LBL, SEND_ASN)",
        "Determination Procedure, Condition Tables, Access Sequences, Condition Records"
      ],
      determinationLogic: [
        "1. Event in EWM (e.g. Inbound Delivery Saved or GR Posted) triggers PPF engine.",
        "2. PPF evaluates Action Profile assigned to the Delivery Document Type.",
        "3. Condition Technique evaluates Condition Records to decide if Action should execute.",
        "4. Processing Time governs when action executes: 1 (Immediate during update task), 2 (When document saved), 3 (Scheduled background batch job / RSPPFPROCESS)."
      ],
      assignmentSteps: [
        "1. Define Action Profile and Action Definitions in transaction SPPFP / SPRO.",
        "2. Configure Method Calls (BAdI Implementation / Class Methods) for actions.",
        "3. Configure Determination Procedure, Condition Tables, and Access Sequences.",
        "4. Assign Action Profile to Delivery Document Type in /SCDL/TDETDOC.",
        "5. Create Condition Records in /SCWM/DLVPPFC."
      ],
      executionSteps: [
        "Trigger delivery event (e.g. Post GR or Click Pack)",
        "PPF engine evaluates condition records",
        "Action executes (e.g. auto-creates putaway WT or prints barcode label)",
        "View action log in SPPFP or /SCWM/MON"
      ],
      testingProcedure: ["Execute delivery action and verify PPF green status in /SCWM/MON -> Tools -> PPF Actions."],
      troubleshooting: ["Error: Action in Yellow status (Not processed) -> Run background report RSPPFPROCESS or verify Processing Time setting."]
    },
    pedagogy: {
      beginnerExplanation: "Think of setting up smart home automation rules on your phone: 'IF motion sensor detects front door opens (Trigger), THEN turn on hallway light AND send notification to my watch (Actions)'. The Post Processing Framework (PPF) is SAP EWM's smart automation engine: whenever an event happens (e.g. a truck arrives or a box is packed), PPF automatically prints shipping labels, sends emails, creates warehouse tasks, or dispatches EDI messages without human clicks!",
      formalDefinition: "The Post Processing Framework (PPF) in SAP EWM is the standardized event-driven automation middleware (Application Areas: /SCWM/WME and /SCDL/DELIVERY). It evaluates Action Profiles, Action Definitions, and Condition Techniques to automatically trigger business actions: Automatic Warehouse Task Creation, Printing (Labels/Loading Lists), EDI ASN Messages, and Status Transitions.",
      whyUsed: [
        "Automates touchless warehouse operations (e.g. auto-creating putaway WTs upon Goods Receipt)",
        "Controls printing of barcode labels, bill of lading (BOL), and packing slips",
        "Triggers asynchronous outbound EDI 856 Advanced Shipping Notifications to customers",
        "Decouples heavy background processes from interactive user screen transactions for maximum performance"
      ],
      howItWorks: [
        "WHAT TRIGGERS PPF: System events like Saving Delivery (/SCDL/DELIVERY), Posting Goods Receipt, Confirming Pick Task, or Posting Goods Issue.",
        "HOW DETERMINATION WORKS: PPF reads the Action Profile assigned to the Delivery Type. It queries Condition Tables (via Access Sequence) matching fields like Warehouse Number, Carrier, Document Type, or Customer. If a match is found, the Action Definition is scheduled.",
        "HOW ACTIONS ARE EXECUTED: Action calls a Method / ABAP Class (e.g. /SCWM/CL_PPF_ACTION_INB) that executes the actual business logic.",
        "PROCESSING TIMES: 1 (Immediate during LUW), 2 (Immediate when saved), 3 (Scheduled background processing via RSPPFPROCESS)."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Action Profile & Action Definition in SPPFP",
          description: "In Action Profile /SCWM/PRD_IN, define Action 'AUTO_WT_PUTAWAY' with Processing Time '4' (Immediate on commit).",
          sapAction: "PPF Profile Definition",
          tcode: "SPPFP / /SCWM/IMG",
          tablesUpdated: ["PPFTTRIGDEF", "PPFTCONDEF"]
        },
        {
          stepNumber: 2,
          title: "Configure Condition Technique for PPF",
          description: "Define Field Catalog, Condition Table (Warehouse + Doc Type), Access Sequence, and Determination Procedure.",
          sapAction: "Condition Determination Setup",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCWM/TCND_PROC"]
        },
        {
          stepNumber: 3,
          title: "Assign Action Profile to Delivery Document Type",
          description: "In SPRO Delivery Customizing, assign Action Profile /SCWM/PRD_IN to Document Type 'INB'.",
          sapAction: "Delivery Action Assignment",
          tcode: "/SCWM/IMG",
          tablesUpdated: ["/SCDL/TDETDOC"]
        },
        {
          stepNumber: 4,
          title: "Create Condition Record in /SCWM/DLVPPFC",
          description: "Create Condition Record: For Warehouse W001 + Doc Type INB -> Trigger Action 'AUTO_WT_PUTAWAY'.",
          sapAction: "Condition Record Creation",
          tcode: "/SCWM/DLVPPFC",
          tablesUpdated: ["/SCWM/DCOND_REC"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "System Framework", name: "Post Processing Framework (PPF)", description: "Event-driven automation engine" },
        { objectType: "Customizing Object", name: "Action Profile", description: "Container of action definitions (e.g. /SCWM/PRD_IN)" },
        { objectType: "Customizing Object", name: "Action Definition", description: "Specific automated action (e.g. AUTO_WT_CREATE)" }
      ],
      relatedTcodes: ["SPPFP", "/SCWM/DLVPPFC", "RSPPFPROCESS", "/SCWM/MON", "/SCWM/PRDI", "/SCWM/PRDO"],
      fioriApps: [{ appId: "F2064", appName: "Warehouse Monitor - PPF Actions", fioriRole: "System Administrator" }],
      relatedTables: [
        { tableName: "PPFTTRIGDEF", description: "PPF Action Trigger Definitions", keyFields: ["NAME", "APPLNAME"] },
        { tableName: "PPFTCONDEF", description: "PPF Action Conditions", keyFields: ["NAME", "APPLNAME"] },
        { tableName: "/SCDL/TDETDOC", description: "Delivery Types mapped to Action Profiles", keyFields: ["MANDT", "DOC_TYPE"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> Cross-Application Components -> Processes and Tools for Enterprise Applications -> Post Processing Framework",
        criticalSettings: [
          "Processing Time: 1 (Processing using selection report), 2 (Immediate processing), 3 (Processing when document is saved)",
          "Schedule Condition vs Start Condition (Schedule decides IF action is created; Start decides WHEN action can run)",
          "Action Merging: Prevent duplicate actions for the same document"
        ],
        mandatoryPrerequisites: ["Application Areas /SCWM/WME and /SCDL/DELIVERY active"],
        commonPitfalls: [
          "Setting Processing Time to '1' (Report) and forgetting to schedule background job RSPPFPROCESS, causing all actions to sit unprocessed in Yellow status.",
          "Missing Condition Records in /SCWM/DLVPPFC, resulting in actions never being triggered."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "FedEx Freight / Amazon Fulfillment",
        scenario: "When an outbound delivery is packed in /SCWM/PACK, PPF Action 'PRINT_LABEL' triggers instantly, transmitting a ZPL barcode print stream to the thermal printer in 80ms while firing an EDI 856 ASN telegram to the customer.",
        businessOutcome: "100% automated touchless shipping documentation, zero manual print clicks."
      },
      industryExamples: {
        automotive: "PPF triggering EDI 856 ASN with VDA 4913 format upon Outbound PGI.",
        aerospace: "PPF auto-printing Certificate of Conformance (CoC) documents upon delivery packing.",
        pharma: "PPF auto-generating temperature logger calibration PDF report upon Inbound GR.",
        food_beverage: "PPF triggering automated pallet tag printing upon catch-weight confirmation.",
        mechanical: "PPF triggering bill of lading (BOL) print at dock gate.",
        electronics: "PPF transmitting serialized IMEI lists via API to warranty database.",
        retail: "PPF auto-creating putaway warehouse tasks upon ASN receipt.",
        cpg: "PPF triggering automated stretch-wrapper PLC telegram upon pallet pack.",
        logistics_3pl: "PPF generating client billing event records upon truck departure.",
        construction: "PPF printing weatherproof outdoor metal tags.",
        industrial: "PPF dispatching maintenance inspection notification."
      },
      scenarioQuestion: {
        prompt: "A consultant configures an automated PPF action to print shipping labels upon Outbound Packing. In testing, the action is created, but its status remains Yellow (Not Processed) and no label prints until the user runs report RSPPFPROCESS manually. Why?",
        options: [
          "The Action Definition in SPPFP has its Processing Time configured as '1 - Processing using selection report' instead of '4 - Immediate processing during update task'.",
          "The printer is out of toner.",
          "The customer did not sign the contract.",
          "The sales order was deleted."
        ],
        correctIndex: 0,
        explanation: "Processing Time '1' (Processing using selection report) puts the action into a pending queue that requires program RSPPFPROCESS to run. For real-time automated execution (such as label printing upon packing), the Processing Time must be configured as '4 - Immediate Processing' in SPPFP."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: PPF Action shows Red status (Error in processing) in /SCWM/MON",
          errorCode: "PPF-EXEC-ERR",
          rootCause: "Underlying method call failed (e.g. spool printer offline, locked document, or missing mandatory email address).",
          solutionSteps: [
            "Open /SCWM/MON -> Tools -> PPF Actions.",
            "Select the Red action and click 'Display Action Log'.",
            "Read specific error message in log (e.g. Spool error or missing condition).",
            "Fix root issue and click 'Repeat Processing' (F8)."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "Explain the difference between a Schedule Condition and a Start Condition in SAP EWM PPF Action Definitions.",
          keyPoints: ["Schedule Condition determines IF the action should be created/planned; Start Condition determines WHEN/IF a planned action is allowed to execute"],
          sampleAnswer: "In the Post Processing Framework (PPF), a Schedule Condition evaluates whether an action should be generated at all when the document is created or changed (e.g. 'Is this delivery for Warehouse W001?'). A Start Condition evaluates whether a scheduled action has met the prerequisites to actually execute (e.g. 'Is the picking status of the delivery set to 100% Complete?')."
        }
      ],
      consultantChallenge: {
        title: "High-Throughput Asynchronous PDF Document Generation Engine",
        clientRequirement: "A mega fulfillment center prints 100,000 packing slips and customs export invoices daily. Synchronous printing causes desktop screen freezes of 3 to 5 seconds per pack scan, frustrating operators.",
        architecturalOptions: [
          {
            optionName: "Option A: Decouple PDF Generation via PPF Asynchronous Background Queue (Processing Time 1) with Scheduled Parallel Spool Workers",
            pros: ["Reduces packing station screen latency to < 100ms", "Parallelizes document rendering across 8 background SAP application servers", "Eliminates operator desktop freezing"],
            cons: ["Requires scheduling recurring RSPPFPROCESS job running every 10 seconds"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "In SPPFP, set Processing Time to '1' for complex export invoices. Schedule RSPPFPROCESS running every 5 seconds across parallel background work processes. Pack station screens confirm instantly without waiting for PDF rendering."
      }
    }
  },

  // =========================================================================
  // 14. WAVE MANAGEMENT & SIMULATION
  // =========================================================================
  {
    id: "ewm-wave-management",
    module: "EWM",
    category: "Wave Management",
    subcategory: "Wave Management & Simulation",
    title: "Wave Management & Interactive Simulation (/SCWM/WAVE)",
    subtitle: "Complete Wave architecture, Wave Templates, Automatic Wave Generation (Condition Technique), Pick Denial, Cut-Off Times, and Interactive Wave Simulation.",
    level: "CONSULTANT",
    tags: ["Wave Management", "Wave Template", "Automatic Wave Creation", "Condition Technique", "Pick Denial", "Cut-Off Time", "/SCWM/WAVE", "/SCWM/WDG_RULES"],
    relatedTopics: ["ewm-outbound-process", "ewm-intelligent-picking", "ewm-wocr-advanced-outbound", "ewm-ppf-architecture"],
    ewmMonitorNode: "Outbound Deliveries / Waves",
    processDiagram: {
      title: "Interactive Wave Management & Release Simulation Flow",
      nodes: [
        { id: "1", label: "Customer Orders Ingested", system: "SD / ERP", tcode: "VA01 / VL01N", description: "50 Outbound Delivery Orders replicated" },
        { id: "2", label: "Wave Template Determination", system: "EWM", tcode: "/SCWM/WDG_RULES", description: "Condition Technique matches Route / Carrier / Time" },
        { id: "3", label: "Wave Creation (Auto / Manual)", system: "EWM", tcode: "/SCWM/WAVE", description: "Deliveries pooled into Wave #8001" },
        { id: "4", label: "Wave Release (Cut-Off Time)", system: "EWM", tcode: "/SCWM/WAVE", description: "Stock Removal Strategy & WOCR triggered" },
        { id: "5", label: "Warehouse Tasks & Orders Generated", system: "EWM", tcode: "/SCWM/TODET_O", description: "Picking tasks assigned to RF Queues" },
        { id: "6", label: "Batch Picking & Consolidation", system: "EWM", tcode: "/SCWM/RFUI", description: "Pickers execute multi-order pick" },
        { id: "7", label: "Pack, Stage & Load at Door", system: "EWM", tcode: "/SCWM/LOAD", description: "Staged at outbound door for 2:00 PM truck" },
        { id: "8", label: "Post Goods Issue (PGI)", system: "EWM", tcode: "/SCWM/PRDO", description: "Truck departs, wave closed" }
      ]
    },
    configurationView: {
      prerequisites: ["Outbound Delivery Orders created", "Wave Templates configured in SPRO / /SCWM/WAVET"],
      configObjects: [
        "Wave Template (/SCWM/WAVET)",
        "Wave Type & Wave Category (/SCWM/TWAVETYP)",
        "Automatic Wave Generation Condition Tables, Access Sequences, and Determination Procedures (/SCWM/TCND_WAVE)"
      ],
      determinationLogic: [
        "1. When Outbound Delivery is created/replicated, EWM evaluates Wave Determination Procedure.",
        "2. Condition Records match criteria: Warehouse + Route + Carrier + Departure Time + Customer Priority.",
        "3. System automatically assigns ODO items to the matching Wave Template.",
        "4. Wave releases automatically at scheduled Cut-Off Time or manually via /SCWM/WAVE."
      ],
      assignmentSteps: [
        "1. Define Wave Types and Wave Categories in SPRO Goods Issue -> Wave Management.",
        "2. Define Wave Templates in transaction /SCWM/WAVET maintaining Cut-Off Times and Release Schedules.",
        "3. Configure Condition Tables, Access Sequences, and Determination Procedures for Wave Assignment.",
        "4. Maintain Condition Records in /SCWM/WDG_RULES.",
        "5. Assign Determination Procedure to Outbound Delivery Document Type."
      ],
      executionSteps: [
        "Create Outbound Deliveries",
        "System auto-assigns items to Wave #8001",
        "At Cut-Off Time (e.g. 14:00), background job /SCWM/R_WAVE_RELEASE executes",
        "Picking tasks and Warehouse Orders generated",
        "Monitor wave execution in /SCWM/MON"
      ],
      testingProcedure: ["Create 3 deliveries matching Route 'EAST_COAST'; verify all 3 group into same Wave in /SCWM/WAVE."],
      troubleshooting: ["Error: Deliveries not assigned to wave -> Check condition record in /SCWM/WDG_RULES and verify delivery schedule line date."]
    },
    pedagogy: {
      beginnerExplanation: "Imagine you're baking pizzas for 50 customers. If you bake each pizza one by one, you'll be cooking all night! Instead, you group orders: all 15 pepperoni pizzas go into the oven at 12:00 PM (Wave 1), all 20 cheese pizzas go in at 1:00 PM (Wave 2). Wave Management in SAP EWM groups hundreds of customer orders by truck departure time or carrier (e.g. 'All FedEx Ground orders leaving at 2:00 PM') so workers pick all items together in one efficient wave!",
      formalDefinition: "Wave Management in SAP EWM (/SCWM/WAVE) is the outbound workload optimization engine that pools multiple Outbound Delivery Order (ODO) items into batches called Waves based on shared logistical criteria: Carrier, Route, Departure Time, Customer Priority, or Activity Area. Waves are released automatically at configured Cut-Off Times to generate Warehouse Tasks and Orders.",
      whyUsed: [
        "Eliminates single-order picking inefficiencies by enabling high-density batch picking",
        "Synchronizes warehouse picking completion with fixed truck departure schedules (Cut-Off Times)",
        "Smooths warehouse labor capacity across daily shifts, preventing peak-hour dock gridlock",
        "Coordinates seamlessly with Pick Denial logic to re-route blocked tasks to alternative waves"
      ],
      howItWorks: [
        "AUTOMATIC WAVE GENERATION: Uses Condition Technique (/SCWM/WDG_RULES). When ODO replicates from ERP, EWM evaluates: Warehouse + Shipping Condition + Route + Departure Time -> assigns matching Wave Template.",
        "WAVE TEMPLATE ATTRIBUTES: 1) Cut-Off Time (Deadline when orders stop being added), 2) Release Time (When picking WTs are generated), 3) Picking Completion Time, 4) Staging Completion Time, 5) Loading/Departure Time.",
        "WAVE RELEASE: Can be released Manually (/SCWM/WAVE) or Automatically via background job /SCWM/R_WAVE_RELEASE.",
        "PICK DENIAL IN WAVES: If a picker finds an empty bin during wave execution, entering Pick Denial can automatically trigger replenishment or split the item to a subsequent wave."
      ],
      stepByStepProcess: [
        {
          stepNumber: 1,
          title: "Define Wave Templates in /SCWM/WAVET",
          description: "Create Wave Template 'FEDEX_1400' (FedEx Ground 2:00 PM departure, Cut-Off: 11:00 AM, Release: 11:30 AM).",
          sapAction: "Wave Template Setup",
          tcode: "/SCWM/WAVET",
          tablesUpdated: ["/SCWM/TWAVET"]
        },
        {
          stepNumber: 2,
          title: "Maintain Wave Determination Rules",
          description: "In /SCWM/WDG_RULES, maintain rule: Carrier 'FEDEX' + Route 'R01' -> Template 'FEDEX_1400'.",
          sapAction: "Determination Rules Setup",
          tcode: "/SCWM/WDG_RULES",
          tablesUpdated: ["/SCWM/DCOND_REC"]
        },
        {
          stepNumber: 3,
          title: "Automatic Wave Assignment",
          description: "50 customer sales orders arrive. EWM auto-groups all 50 deliveries into Wave #90014.",
          sapAction: "Automated Grouping",
          tcode: "/SCWM/PRDO",
          tablesUpdated: ["/SCWM/WAVEHDR", "/SCWM/WAVEITM"]
        },
        {
          stepNumber: 4,
          title: "Wave Release & WOCR Execution",
          description: "At 11:30 AM, Wave #90014 releases. EWM runs Stock Removal Strategies and WOCR, generating 12 Warehouse Orders.",
          sapAction: "Wave Release",
          tcode: "/SCWM/WAVE",
          tablesUpdated: ["/SCWM/ORDIM_O", "/SCWM/WHO"]
        }
      ],
      sapObjectsInvolved: [
        { objectType: "Customizing Object", name: "Wave Template", description: "Time schedule and grouping template (Table /SCWM/TWAVET)" },
        { objectType: "Transactional Object", name: "Wave Header", description: "Active batch of delivery items (Table /SCWM/WAVEHDR)" },
        { objectType: "Transactional Object", name: "Wave Item", description: "Individual delivery line item assigned to wave (Table /SCWM/WAVEITM)" }
      ],
      relatedTcodes: ["/SCWM/WAVE", "/SCWM/WAVET", "/SCWM/WDG_RULES", "/SCWM/MON", "/SCWM/PRDO", "/SCWM/TODET_O"],
      fioriApps: [
        { appId: "F2064", appName: "Warehouse Monitor - Waves", fioriRole: "Wave Planner" }
      ],
      relatedTables: [
        { tableName: "/SCWM/WAVEHDR", description: "Wave Header Records", keyFields: ["MANDT", "LGNUM", "WAVE"] },
        { tableName: "/SCWM/WAVEITM", description: "Wave Item Assignment", keyFields: ["MANDT", "LGNUM", "WAVE", "WAVEITM"] },
        { tableName: "/SCWM/TWAVET", description: "Wave Templates Master", keyFields: ["MANDT", "LGNUM", "TEMPLATE"] }
      ],
      configurationPerspective: {
        sproPath: "SPRO -> SCM Extended Warehouse Management -> Extended Warehouse Management -> Goods Issue Process -> Wave Management",
        criticalSettings: [
          "Define Wave Types & Categories",
          "Locking during Wave Release",
          "Wave Capacity Limits (Max Weight / Volume / Items per Wave)"
        ],
        mandatoryPrerequisites: ["Condition Tables and Access Sequences created for Wave Determination"],
        commonPitfalls: [
          "Setting Wave Cut-Off time after the truck departure time, causing picking tasks to be generated after the truck has already left.",
          "Not scheduling background job /SCWM/R_WAVE_RELEASE, requiring manual release clicks for every wave."
        ]
      },
      realWorldBusinessExample: {
        companyContext: "DHL Express Regional Hub",
        scenario: "DHL operates 6 scheduled daily waves: 06:00 (Early Express), 09:00 (Morning Priority), 12:00 (Noon Standard), 15:00 (Afternoon Freight), 18:00 (Evening Next-Day), 21:00 (Night Air). EWM automatically slots 25,000 daily orders into matching waves.",
        businessOutcome: "99.99% on-time truck departure compliance across 40 daily freight carriers."
      },
      industryExamples: {
        automotive: "Wave release timed exactly 90 minutes before JIT assembly line truck departure.",
        aerospace: "AOG (Aircraft On Ground) emergency wave with instant 0-minute release time.",
        pharma: "Temperature-controlled wave synchronizing pick completion with refrigerated truck pre-cooling.",
        food_beverage: "Morning fresh bakery wave vs afternoon dry grocery wave.",
        mechanical: "Heavy freight wave grouping crane loading tasks.",
        electronics: "High-value wave releasing to security escort picking team.",
        retail: "Store replenishment wave grouped by retail delivery route.",
        cpg: "Full pallet cross-dock wave.",
        logistics_3pl: "Client-specific wave templates with dedicated billing SLA schedules.",
        construction: "Flatbed truck project staging wave.",
        industrial: "Emergency plant outage spare parts wave."
      },
      scenarioQuestion: {
        prompt: "A warehouse receives 100 sales order deliveries between 8:00 AM and 10:00 AM. 40 orders are for Carrier DHL (Leaves at 1:00 PM) and 60 orders are for Carrier UPS (Leaves at 4:00 PM). How does SAP EWM automatically segregate them into separate waves without manual intervention?",
        options: [
          "Automatic Wave Generation (/SCWM/WDG_RULES) evaluates Carrier / Shipping Condition on the delivery header, matches Condition Records, and assigns DHL orders to Wave Template 'DHL_1300' and UPS orders to Wave Template 'UPS_1600'.",
          "The warehouse manager sorts them by printing paper slips.",
          "The customer chooses their wave number during checkout.",
          "The system randomly splits them 50/50."
        ],
        correctIndex: 0,
        explanation: "Automatic Wave Generation uses SAP Condition Technique. The determination procedure evaluates delivery attributes (Carrier, Route, Departure Time) and automatically assigns each delivery item to the corresponding Wave Template."
      },
      troubleshootingScenarios: [
        {
          errorOrIssue: "Error: Wave release failed: No stock available for 15 delivery items",
          errorCode: "WAVE-REL-STOCK-01",
          rootCause: "Insufficient physical stock in warehouse, or stock is locked by other open tasks or quality hold.",
          solutionSteps: [
            "Open transaction /SCWM/WAVE.",
            "Select Wave and inspect items with Red status.",
            "Check /SCWM/MON -> Physical Stock to identify shortages.",
            "Trigger Order-Related Replenishment in /SCWM/REPL or split shortage items to subsequent wave."
          ]
        }
      ],
      interviewQuestions: [
        {
          tier: "Consultant",
          question: "How does Pick Denial work within Wave Management in SAP EWM, and what automated recovery options are available?",
          keyPoints: ["Pick Denial triggers when item is unavailable during wave execution; can trigger automatic replenishment, task cancellation, or re-assignment to next wave"],
          sampleAnswer: "When an RF picker encounters an empty or damaged bin during wave execution and logs a Pick Denial (Process Code BIDN), EWM Wave Management can: 1) Automatically trigger immediate Order-Related Replenishment to refill the pick face, 2) Automatically search for alternative storage bins in the search sequence and generate a replacement task, or 3) Unassign the delivery item from the current wave and re-assign it to the next scheduled wave without holding up the rest of the current wave."
        }
      ],
      consultantChallenge: {
        title: "Dynamic AI-Powered Autonomous Wave Balancing Engine",
        clientRequirement: "A fulfillment center experiences unpredictable order volume spikes (e.g. 5,000 orders in 10 minutes). Fixed wave schedules cause worker starvation during quiet hours and worker overload during peak hours. Management wants an adaptive AI wave engine that dynamically releases waves based on real-time picker queue depth and carrier truck ETA updates.",
        architecturalOptions: [
          {
            optionName: "Option A: Deploy Adaptive Wave Scheduling using EWM BAdI /SCWM/EX_WAVE_RELEASE and Real-Time IoT Telematics Interface",
            pros: ["Dynamically throttles wave release based on live picker utilization", "Adjusts wave release times automatically when GPS shows carrier truck is delayed", "Increases daily shipping throughput by 32%"],
            cons: ["Requires telematics GPS middleware integration with freight carriers"],
            recommendationLevel: "Recommended"
          }
        ],
        recommendedApproach: "Implement BAdI /SCWM/EX_WAVE_RELEASE. Integrate Carrier GPS API. BAdI checks live queue backlog: if pickers are idle, releases wave early; if carrier truck is delayed by 2 hours, automatically extends wave cut-off time to absorb more customer orders."
      }
    }
  }
];
