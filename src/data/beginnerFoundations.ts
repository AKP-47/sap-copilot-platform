// =========================================================================
// SAP COPILOT & TAGSKILLS BEGINNER FOUNDATIONS ACADEMY DATA
// (Strictly available ONLY for the BEGINNER learning level)
// =========================================================================

export interface BusinessStage {
  id: string;
  stepNumber: number;
  title: string;
  shortDesc: string;
  whatHappens: string;
  whoIsInvolved: string[];
  infoNeeded: string[];
  documentsCreated: string[];
  whyImportant: string;
  failureImpact: string;
  sapModuleLink: string;
}

export interface BusinessFunction {
  id: string;
  name: string;
  iconName: string;
  role: string;
  dailyGoal: string;
  connectedTo: string[];
  sapEquivalent: string;
}

export interface ProblemSolutionFlow {
  id: string;
  industry: string;
  problem: string;
  businessRequirement: string;
  businessProcess: string;
  technologyRole: string;
  sapSolution: string;
  businessOutcome: string;
}

export interface FounderProfile {
  name: string;
  role: string;
  years: string;
  contribution: string;
  funFact: string;
}

export interface SapLocation {
  city: string;
  country: string;
  role: string;
  isHQ?: boolean;
  verifiedFact: string;
}

export interface SapVersion {
  version: string;
  year: string;
  architecture: string;
  keyInnovation: string;
  whyItMattered: string;
  nextStepTrigger: string;
}

export interface ModuleIntro {
  code: string;
  name: string;
  icon: string;
  businessArea: string;
  problemSolved: string;
  realWorldExample: string;
}

export interface CompetitorComparison {
  name: string;
  bestFitFor: string;
  keyStrength: string;
  sapComparisonPerspective: string;
}

export interface BeginnerQuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "scenario" | "true-false";
  options: string[];
  correctIndex: number;
  explanation: string;
  consultantReasoning: {
    businessProblem: string;
    businessRequirement: string;
    processInvolved: string;
    technologyRole: string;
    summary: string;
  };
}

// 1. BUSINESS FOUNDATIONS DATA
export const BUSINESS_FOUNDATION_STAGES: BusinessStage[] = [
  {
    id: "need",
    stepNumber: 1,
    title: "1. Customer Need Identification",
    shortDesc: "Recognizing what products or services customers demand in the market.",
    whatHappens: "The business conducts market research or analyzes incoming inquiries to determine what products customers want to buy.",
    whoIsInvolved: ["Market Research Team", "Product Managers", "Sales Executives"],
    infoNeeded: ["Customer demographics", "Competitor pricing", "Feature expectations"],
    documentsCreated: ["Market Analysis Brief", "Product Proposal Document"],
    whyImportant: "Without a clear customer need, a company risks manufacturing products that no one will purchase.",
    failureImpact: "Wasted capital, unsold excess stock, and heavy financial losses.",
    sapModuleLink: "SAP IBP (Integrated Business Planning) / CRM"
  },
  {
    id: "demand",
    stepNumber: 2,
    title: "2. Demand Planning & Forecasting",
    shortDesc: "Predicting future sales volumes to prepare procurement and manufacturing.",
    whatHappens: "Analysts calculate how many units will be sold next month, quarter, or year using historical trends and seasonal spikes.",
    whoIsInvolved: ["Demand Planners", "Supply Chain Strategists", "Sales Directors"],
    infoNeeded: ["Past sales history", "Promotional calendar", "Economic indicators"],
    documentsCreated: ["Demand Forecast Report", "Master Production Schedule (MPS)"],
    whyImportant: "Ensures the business buys sufficient raw materials ahead of time without overstocking warehouses.",
    failureImpact: "Stockouts (running out of goods) or massive storage cost overheads.",
    sapModuleLink: "SAP IBP / PP (Production Planning)"
  },
  {
    id: "procurement",
    stepNumber: 3,
    title: "3. Sourcing & Procurement",
    shortDesc: "Purchasing raw materials, parts, or trading goods from qualified suppliers.",
    whatHappens: "The purchasing team creates Purchase Requisitions, compares vendor quotes, and issues formal Purchase Orders (PO) to chosen suppliers.",
    whoIsInvolved: ["Purchasing Agents", "Procurement Managers", "External Vendors/Suppliers"],
    infoNeeded: ["Material specifications", "Vendor payment terms", "Lead delivery times"],
    documentsCreated: ["Purchase Requisition (PR)", "Request for Quotation (RFQ)", "Purchase Order (PO)"],
    whyImportant: "Secures high quality materials at optimal cost and negotiated delivery schedules.",
    failureImpact: "Factory production halts due to missing components; delayed customer deliveries.",
    sapModuleLink: "SAP MM (Materials Management) / SAP Ariba"
  },
  {
    id: "production",
    stepNumber: 4,
    title: "4. Production & Manufacturing",
    shortDesc: "Transforming raw materials into finished goods through assembly lines.",
    whatHappens: "The factory issues Production Orders, consumes raw materials from the warehouse, and runs manufacturing machinery to assemble finished products.",
    whoIsInvolved: ["Plant Supervisors", "Machine Operators", "Quality Inspectors"],
    infoNeeded: ["Bill of Materials (BOM)", "Routing steps", "Machine capacity"],
    documentsCreated: ["Production Order", "Goods Issue Slip (261)", "Confirmation Record"],
    whyImportant: "Creates the physical value that the company sells to its customers.",
    failureImpact: "Defective goods, production downtime, safety hazards, and missed deadlines.",
    sapModuleLink: "SAP PP (Production Planning) / SAP QM"
  },
  {
    id: "inventory",
    stepNumber: 5,
    title: "5. Inventory Management & Warehousing",
    shortDesc: "Safely receiving, storing, tracking, and protecting materials and finished goods.",
    whatHappens: "Warehouse staff receive shipments, verify physical quantities, inspect quality, and place pallets into designated storage bins.",
    whoIsInvolved: ["Warehouse Clerks", "Forklift Operators", "Inventory Controllers"],
    infoNeeded: ["Purchase Order Number", "Storage Bin coordinates", "Batch/Expiry dates"],
    documentsCreated: ["Goods Receipt Note (MIGO 101)", "Material Document", "Warehouse Task (WT)"],
    whyImportant: "Maintains 100% accurate visibility of stock levels and prevents theft, damage, or expiration.",
    failureImpact: "Lost inventory, ghost stock on balance sheets, and inability to fulfill customer orders.",
    sapModuleLink: "SAP MM-IM / SAP EWM (Extended Warehouse Management)"
  },
  {
    id: "sales",
    stepNumber: 6,
    title: "6. Sales Order Processing",
    shortDesc: "Receiving and confirming binding customer purchase orders.",
    whatHappens: "Sales reps record customer orders, check product availability, confirm delivery dates, and finalize pricing contracts.",
    whoIsInvolved: ["Sales Representatives", "Customer Service Staff", "Credit Control Team"],
    infoNeeded: ["Customer Account", "Item quantities", "Credit limit status"],
    documentsCreated: ["Sales Quotation", "Sales Order (SO)", "Order Confirmation"],
    whyImportant: "Formalizes the legal agreement between buyer and seller with clear delivery promises.",
    failureImpact: "Overpromising goods that are out of stock; pricing errors leading to revenue loss.",
    sapModuleLink: "SAP SD (Sales & Distribution)"
  },
  {
    id: "delivery",
    stepNumber: 7,
    title: "7. Fulfillment, Picking & Shipping",
    shortDesc: "Picking items from warehouse bins, packaging, and dispatching via freight carriers.",
    whatHappens: "Warehouse management generates picking tasks, bundles goods onto pallets, verifies packing slips, and loads trucks.",
    whoIsInvolved: ["Pickers & Packers", "Shipping Dispatchers", "Logistics 3PL Drivers"],
    infoNeeded: ["Outbound Delivery number", "Route ID", "Carrier tracking code"],
    documentsCreated: ["Outbound Delivery Document", "Packing Slip", "Bill of Lading / Goods Issue (601)"],
    whyImportant: "Ensures the customer receives the exact right product, on time, in perfect condition.",
    failureImpact: "Wrong items shipped, damaged goods, customer complaints, and expensive return freight.",
    sapModuleLink: "SAP EWM / SAP TM (Transportation Management)"
  },
  {
    id: "billing",
    stepNumber: 8,
    title: "8. Customer Invoicing & Billing",
    shortDesc: "Issuing formal invoices requesting customer payment for delivered products.",
    whatHappens: "The billing department automatically converts delivery notes into financial customer invoices with tax calculations.",
    whoIsInvolved: ["Billing Specialists", "Accounts Receivable Accountants"],
    infoNeeded: ["Sales Order price", "Delivered quantities", "Applicable GST/VAT taxes"],
    documentsCreated: ["Customer Invoice (VF01)", "Accounting Document (Debit Customer / Credit Revenue)"],
    whyImportant: "Legally bills the customer and establishes the company's accounts receivable asset.",
    failureImpact: "Delayed billing means delayed cash flow; tax calculation audit fines.",
    sapModuleLink: "SAP SD / SAP FI-AR (Accounts Receivable)"
  },
  {
    id: "payment",
    stepNumber: 9,
    title: "9. Payment Collection & Treasury",
    shortDesc: "Receiving cash/bank transfers and clearing open customer account balances.",
    whatHappens: "Bank reconciliation teams match incoming bank wire transfers against open invoice line items and record cash in the general ledger.",
    whoIsInvolved: ["Treasury Managers", "Cash Application Accountants", "Commercial Banks"],
    infoNeeded: ["Bank statement", "Invoice reference number", "Remittance advice"],
    documentsCreated: ["Bank Receipt Voucher", "Payment Clearing Document"],
    whyImportant: "Converts sales into actual liquid working capital to pay salaries and suppliers.",
    failureImpact: "Uncollected bad debts, cash flow starvation, and business bankruptcy.",
    sapModuleLink: "SAP FI (Financial Accounting) / Treasury"
  },
  {
    id: "analytics",
    stepNumber: 10,
    title: "10. Business Analytics & Performance Review",
    shortDesc: "Evaluating profit margins, operational bottlenecks, and strategic growth.",
    whatHappens: "Executives review real-time dashboards showing profit per product line, vendor reliability scores, and warehouse utilization.",
    whoIsInvolved: ["Chief Executive Officer (CEO)", "Chief Financial Officer (CFO)", "Operations Leads"],
    infoNeeded: ["Consolidated P&L statement", "Inventory turnover ratio", "Customer satisfaction rating"],
    documentsCreated: ["Monthly Executive Board Deck", "KPI Variance Report"],
    whyImportant: "Enables leadership to make data-driven decisions to expand profitable product lines.",
    failureImpact: "Flying blind without knowing which departments or products are losing money.",
    sapModuleLink: "SAP Analytics Cloud / SAP S/4HANA Embedded Analytics"
  }
];

// 2. CONNECTED BUSINESS FUNCTIONS
export const BUSINESS_FUNCTIONS: BusinessFunction[] = [
  {
    id: "procurement",
    name: "Procurement / Purchasing",
    iconName: "ShoppingBag",
    role: "Buys materials and services from external vendors at the best price and quality.",
    dailyGoal: "Never let the factory run out of raw materials while minimizing costs.",
    connectedTo: ["Finance (Invoices)", "Warehouse (Goods Receipts)", "Production (Material Needs)"],
    sapEquivalent: "SAP MM (Materials Management) & SAP Ariba"
  },
  {
    id: "warehouse",
    name: "Warehouse & Logistics",
    iconName: "Warehouse",
    role: "Physically manages storage bins, handling units, picking, and vehicle loading.",
    dailyGoal: "Maintain 100% stock accuracy and achieve fast dock-to-stock putaway times.",
    connectedTo: ["Procurement (Inbound Receiving)", "Sales (Outbound Picking)", "Finance (Stock Value)"],
    sapEquivalent: "SAP EWM (Extended Warehouse Management) & SAP TM"
  },
  {
    id: "manufacturing",
    name: "Production & Manufacturing",
    iconName: "Factory",
    role: "Converts raw ingredients and components into high-value finished products.",
    dailyGoal: "Hit daily output quotas with zero machine downtime and zero scrap.",
    connectedTo: ["Warehouse (Raw Materials & Finished Goods)", "Quality (Inspections)", "Plant Maintenance"],
    sapEquivalent: "SAP PP (Production Planning) & SAP QM"
  },
  {
    id: "sales",
    name: "Sales & Distribution",
    iconName: "TrendingUp",
    role: "Engages clients, generates quotations, books sales orders, and coordinates delivery.",
    dailyGoal: "Maximize revenue, win corporate deals, and fulfill customer order promises.",
    connectedTo: ["Warehouse (Stock Availability)", "Finance (Credit Limits & Billing)", "Marketing"],
    sapEquivalent: "SAP SD (Sales & Distribution)"
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    iconName: "DollarSign",
    role: "Tracks every dollar spent and earned, manages balance sheets, and ensures tax compliance.",
    dailyGoal: "Provide an accurate real-time general ledger and maintain healthy liquidity.",
    connectedTo: ["All Departments (Every business movement creates a financial journal entry!)"],
    sapEquivalent: "SAP FI (Financial Accounting) & SAP CO (Controlling)"
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    iconName: "Users",
    role: "Recruits top talent, oversees payroll, employee benefits, training, and compliance.",
    dailyGoal: "Ensure optimal staffing, professional growth, and timely salary disbursement.",
    connectedTo: ["Finance (Payroll Expenses)", "All Operational Departments (Staffing)"],
    sapEquivalent: "SAP SuccessFactors & SAP HCM"
  }
];

// 3. SIGNATURE PROBLEM -> REQUIREMENT -> PROCESS -> TECH -> SAP METHOD
export const PROBLEM_SOLUTION_FLOWS: ProblemSolutionFlow[] = [
  {
    id: "inventory_visibility",
    industry: "🏭 Automobile Manufacturing",
    problem: "We don't know how many brake pads we currently have across our 5 regional assembly plants.",
    businessRequirement: "Real-time, cross-plant inventory visibility on a single unified screen.",
    businessProcess: "Supplier Receipt (MIGO 101) ➔ Real-Time Stock Update ➔ Automated Assembly Line Reservation.",
    technologyRole: "Centralized Enterprise Resource Planning (ERP) database with real-time posting.",
    sapSolution: "SAP MM (Stock Overview MMBE) + SAP S/4HANA In-Memory Universal Table (MATDOC).",
    businessOutcome: "Zero plant shutdowns, 28% reduction in buffer stock, saving $4.2M annually."
  },
  {
    id: "invoice_mismatch",
    industry: "🛒 Large Supermarket Chain",
    problem: "Vendors are billing us for 1,000 cases of milk, but our warehouse only received 700 cases.",
    businessRequirement: "Automated 3-Way Matching before any vendor invoice can be approved and paid.",
    businessProcess: "Compare Purchase Order (Ordered) vs Goods Receipt (Received) vs Vendor Invoice (Billed).",
    technologyRole: "Automated business rule validation in Logistics Invoice Verification (LIV).",
    sapSolution: "SAP MM (MIRO 3-Way Match) with automatic quantity/price variance tolerance blocks.",
    businessOutcome: "Prevents overpaying suppliers by millions; enforces exact vendor accountability."
  },
  {
    id: "lost_pallets",
    industry: "💊 Global Pharmaceutical",
    problem: "Temperature-sensitive vaccine pallets are lost inside a 50,000 sq. meter warehouse without bin coordinates.",
    businessRequirement: "Precise coordinate tracking and barcode-guided radio-frequency bin management.",
    businessProcess: "Barcode Scan at Inbound Dock ➔ System-Guided Directed Putaway ➔ Bin Confirmation.",
    technologyRole: "Warehouse Management System (WMS) with Radio Frequency (RF) terminal integration.",
    sapSolution: "SAP EWM (/SCWM/RFUI Scanner + /SCWM/MON Real-Time Warehouse Hierarchy).",
    businessOutcome: "100% bin location accuracy, zero expired vaccine write-offs, audit-grade GMP compliance."
  },
  {
    id: "disconnected_silos",
    industry: "✈️ Aerospace Component Supplier",
    problem: "Sales uses Excel, Warehouse uses paper slips, and Accounting uses standalone accounting software.",
    businessRequirement: "A single integrated truth where one sales order automatically alerts warehouse and finance.",
    businessProcess: "Sales Order ➔ Auto Outbound Delivery ➔ Auto Picking Task ➔ Auto Billing ➔ Auto FI Ledger.",
    technologyRole: "Enterprise-wide ERP platform eliminating manual re-keying of data.",
    sapSolution: "SAP S/4HANA Enterprise Core (SD + MM + EWM + FI integrated suite).",
    businessOutcome: "Order fulfillment lead time dropped from 14 days to 48 hours; zero data entry errors."
  }
];

// 4. WHAT IS SAP & 5 FOUNDERS DATA
export const SAP_FOUNDERS: FounderProfile[] = [
  {
    name: "Dietmar Hopp",
    role: "Co-Founder, Software Engineer & CEO (1988–1998)",
    years: "Born 1940 (Heidelberg, Germany)",
    contribution: "Co-designed early real-time software systems and led SAP's international business expansion into a multi-billion dollar enterprise.",
    funFact: "Known for his major philanthropic contributions to medicine, education, and sports in Germany."
  },
  {
    name: "Hasso Plattner",
    role: "Co-Founder, Chief Strategist & Supervisory Board Chair",
    years: "Born 1944 (Berlin, Germany)",
    contribution: "The technological visionary behind SAP. In 2011, he spearheaded the revolution of in-memory database computing that created SAP HANA.",
    funFact: "Founded the prestigious Hasso Plattner Institute (HPI) for Digital Engineering in Potsdam."
  },
  {
    name: "Claus Wellenreuther",
    role: "Co-Founder & Financial Accounting Architect",
    years: "Born 1935 (Mannheim, Germany)",
    contribution: "Designed the original financial accounting system (System RF) that allowed companies to process ledgers in real-time rather than overnight batch punch cards.",
    funFact: "The architecture he created in 1972 laid the foundational blueprint for SAP FI module."
  },
  {
    name: "Klaus Tschira",
    role: "Co-Founder & Materials Management Specialist",
    years: "1940 – 2015 (Mannheim, Germany)",
    contribution: "Specialized in systems analysis and materials management. Co-architected the foundational algorithms behind inventory and logistics tracking.",
    funFact: "Established one of Germany's largest private scientific foundations, the Klaus Tschira Stiftung."
  },
  {
    name: "Hans-Werner Hector",
    role: "Co-Founder & Core Systems Developer",
    years: "Born 1940 (Kandel, Germany)",
    contribution: "Engineered early standardized enterprise software modules and helped expand SAP across European enterprise clients throughout the 1970s and 1980s.",
    funFact: "An honorary citizen of Karlsruhe and prominent patron of mathematics and sciences."
  }
];

export const SAP_GLOBAL_LOCATIONS: SapLocation[] = [
  {
    city: "Walldorf",
    country: "Germany 🇩🇪",
    role: "Global Corporate Headquarters & Core Executive Campus",
    isHQ: true,
    verifiedFact: "Founded nearby in 1972 (Weinheim/Mannheim); Walldorf has served as the worldwide headquarters since the late 1970s."
  },
  {
    city: "Bengaluru (Whitefield)",
    country: "India 🇮🇳",
    role: "SAP Labs India – Primary Global R&D & Engineering Hub",
    verifiedFact: "Established in 1998; represents one of SAP's largest and most critical engineering and innovation campuses outside of Germany."
  },
  {
    city: "Palo Alto (Silicon Valley)",
    country: "United States 🇺🇸",
    role: "SAP Labs North America & Innovation Hub",
    verifiedFact: "Located in the heart of Silicon Valley, driving artificial intelligence, cloud architecture, and Silicon Valley venture partnerships."
  },
  {
    city: "Newtown Square (Pennsylvania)",
    country: "United States 🇺🇸",
    role: "North America Corporate Headquarters",
    verifiedFact: "Manages business operations, commercial sales, and executive customer briefings across the Americas."
  },
  {
    city: "Singapore",
    country: "Singapore 🇸🇬",
    role: "Asia Pacific & Japan (APJ) Regional Headquarters",
    verifiedFact: "Coordinates enterprise deployments, regional data centers, and digital supply chain hubs across the APJ region."
  },
  {
    city: "Paris / Levallois-Perret",
    country: "France 🇫🇷",
    role: "Western Europe Regional Headquarters & Innovation Center",
    verifiedFact: "Supports prominent European manufacturing, luxury retail, aerospace, and energy industry customers."
  }
];

// 5. SAP VERSIONS & EVOLUTION TIMELINE
export const SAP_VERSIONS_TIMELINE: SapVersion[] = [
  {
    version: "System R/1",
    year: "1973",
    architecture: "Single-Tier (Financial Accounting on Mainframe)",
    keyInnovation: "Replaced overnight punch-card batch processing with real-time financial data entry.",
    whyItMattered: "Accountants could see balances immediately on a screen instead of waiting 24 hours.",
    nextStepTrigger: "Clients wanted material tracking and sales integration on larger mainframe computers."
  },
  {
    version: "SAP R/2",
    year: "1979",
    architecture: "Mainframe-Centric (Centralized Multi-Terminal)",
    keyInnovation: "Integrated Material Management (MM), Production Planning (PP), and Sales with multi-currency and multi-language support.",
    whyItMattered: "Allowed multinational European corporations to standardize business operations on one mainframe system.",
    nextStepTrigger: "The invention of personal computers (PCs) and distributed servers required a decentralized architecture."
  },
  {
    version: "SAP R/3",
    year: "1992",
    architecture: "3-Tier Client/Server Architecture (Database ➔ Application ➔ Presentation / GUI)",
    keyInnovation: "Decoupled the database from application logic and desktop user PCs. Became a global sensation.",
    whyItMattered: "Transformed SAP into the undisputed global ERP standard across Fortune 500 enterprises during the 1990s globalization boom.",
    nextStepTrigger: "The rise of the Internet, web browsers, and enterprise integration required unified web engines."
  },
  {
    version: "SAP ERP / ECC 6.0",
    year: "2004 – 2005",
    architecture: "Enterprise Central Component (ABAP NetWeaver Platform)",
    keyInnovation: "Massive unified core encompassing MM, SD, FI, CO, PP, QM, HR, supported by Enhancement Packages (EhP).",
    whyItMattered: "The legendary enterprise workhorse running thousands of factories, utilities, and supply chains globally for over two decades.",
    nextStepTrigger: "Traditional disk-based relational databases (Oracle, DB2, SQL Server) struggled with massive big data analytics and complex aggregations."
  },
  {
    version: "SAP HANA (Database)",
    year: "2011",
    architecture: "In-Memory Column-Oriented Database Engine",
    keyInnovation: "Kept all enterprise data inside ultra-fast RAM instead of slow mechanical hard drives. Column-based compression.",
    whyItMattered: "Reports that previously took 6 hours to compute finished in 2 seconds. Merged transactional (OLTP) and analytical (OLAP) processing.",
    nextStepTrigger: "Having a fast database was not enough; the core ERP application itself needed to be rewritten without duplicate tables."
  },
  {
    version: "SAP S/4HANA",
    year: "2015 – Present",
    architecture: "Simplified Next-Gen In-Memory ERP Core + SAP Fiori User Experience",
    keyInnovation: "Universal Journal (ACDOCA) and Universal Material Document (MATDOC). Elimination of aggregate and index tables.",
    whyItMattered: "Instant financial close, real-time MRP live runs, beautiful web-based SAP Fiori apps, and embedded AI machine learning.",
    nextStepTrigger: "Businesses demanded automated continuous updates, microservices, and zero-hardware cloud flexibility."
  },
  {
    version: "SAP S/4HANA Cloud",
    year: "Modern Generation",
    architecture: "Public & Private Cloud Architecture (Clean Core)",
    keyInnovation: "Managed SaaS/PaaS with quarterly/semi-annual automated upgrades, SAP BTP extensions, and generative AI Copilots.",
    whyItMattered: "Frees companies from managing servers, delivering sovereign data security, rapid scalability, and future-proof enterprise agility.",
    nextStepTrigger: "Ongoing evolution with autonomous enterprise workflows and agentic AI."
  }
];

// 6. MODULES INTRO FOR BEGINNERS
export const BEGINNER_MODULES_INTRO: ModuleIntro[] = [
  {
    code: "SAP MM",
    name: "Materials Management",
    icon: "Package",
    businessArea: "Sourcing, Purchasing & Inventory Control",
    problemSolved: "How do we buy raw materials from vendors, track supplier contracts, verify shipments, and manage stock levels?",
    realWorldExample: "An auto factory orders 2,000 sheet metal coils, receives them at the dock, and verifies the supplier's invoice."
  },
  {
    code: "SAP EWM",
    name: "Extended Warehouse Management",
    icon: "Warehouse",
    businessArea: "Advanced Warehouse Execution & Logistics",
    problemSolved: "How do we efficiently direct forklifts, optimize 10,000 storage bins, automate pallet packaging, and manage picking routes?",
    realWorldExample: "A supermarket distribution center uses barcode scanners to pick 50 pallets of cereal and load them onto outbound trucks."
  },
  {
    code: "SAP SD",
    name: "Sales & Distribution",
    icon: "TrendingUp",
    businessArea: "Customer Quotes, Sales Orders & Shipping",
    problemSolved: "How do we book sales orders, check stock availability, price discounts, and deliver goods to retail clients?",
    realWorldExample: "An electronics brand books a $500k order for 1,000 laptops from a retail store and schedules container delivery."
  },
  {
    code: "SAP FI",
    name: "Financial Accounting",
    icon: "DollarSign",
    businessArea: "General Ledger, Accounts Payable/Receivable & Balance Sheet",
    problemSolved: "How do we track statutory balance sheets, audit trail ledgers, tax filings, and external shareholder financial reporting?",
    realWorldExample: "At the end of the quarter, the CFO generates the official audited Profit & Loss statement for the stock exchange."
  },
  {
    code: "SAP CO",
    name: "Controlling / Management Accounting",
    icon: "PieChart",
    businessArea: "Cost Centers, Product Costing & Internal Profitability",
    problemSolved: "How much did it actually cost to produce one bottle of soda, and is the Texas factory more profitable than the Ohio plant?",
    realWorldExample: "A plant controller calculates the exact breakdown of electricity, labor, and sugar costs per soda case."
  },
  {
    code: "SAP PP",
    name: "Production Planning",
    icon: "Factory",
    businessArea: "Manufacturing Work Orders & Material Requirements (MRP)",
    problemSolved: "How many engines must we assemble this week, and what raw screws, pistons, and lubricants do we need to order right now?",
    realWorldExample: "A pharmaceutical plant schedules cleanroom reactors to blend 100,000 cough syrup bottles next Tuesday."
  },
  {
    code: "SAP QM",
    name: "Quality Management",
    icon: "CheckCircle",
    businessArea: "Inspection Lots, Lab Audits & Certificate of Analysis",
    problemSolved: "How do we test incoming chemical shipments in a laboratory before releasing them into manufacturing?",
    realWorldExample: "A food lab samples milk batches for bacterial count before giving the green light for cheese production."
  },
  {
    code: "SAP PM",
    name: "Plant Maintenance",
    icon: "Wrench",
    businessArea: "Machine Servicing, Calibration & Repair Orders",
    problemSolved: "How do we prevent critical factory conveyor belts from breaking down during peak holiday seasons?",
    realWorldExample: "Automated alert prompts technicians to lubricate hydraulic robotic arms after 1,000 operating hours."
  },
  {
    code: "SAP Ariba",
    name: "Digital Supplier Network",
    icon: "Globe",
    businessArea: "Global B2B Procurement & Vendor Collaboration",
    problemSolved: "How do we invite 5,000 international suppliers to bid on raw material tenders in a transparent digital marketplace?",
    realWorldExample: "An airline sends electronic purchase orders to jet fuel suppliers across 40 international airports."
  },
  {
    code: "SAP SuccessFactors",
    name: "Human Experience Management (HXM)",
    icon: "Users",
    businessArea: "Employee Recruitment, Performance, Payroll & Learning",
    problemSolved: "How do we recruit 500 software engineers, onboard them digitally, track annual performance, and disburse payroll?",
    realWorldExample: "A multinational bank conducts annual bonus reviews and automated employee skill certifications."
  }
];

// 7. OTHER ERP PLATFORMS & WHY COMPANIES CHOOSE SAP
export const ERP_LANDSCAPE_COMPARISONS: CompetitorComparison[] = [
  {
    name: "SAP (S/4HANA)",
    bestFitFor: "Large enterprises, multinational corporations, complex manufacturing & deep supply chains",
    keyStrength: "Deep integration across 25+ vertical industries (Automotive, Chemicals, Pharma, Retail, Aerospace), unmatched global localization across 180+ countries.",
    sapComparisonPerspective: "Particularly strong when companies require seamless end-to-end integration between procurement, shop-floor manufacturing, warehouse robotics, and multi-country tax ledgers."
  },
  {
    name: "Oracle Cloud ERP",
    bestFitFor: "Large financial institutions, service companies, and tech enterprises",
    keyStrength: "Strong financial consolidation, cloud database heritage, and enterprise procurement.",
    sapComparisonPerspective: "Strong competitor in finance-led companies; SAP typically maintains greater depth in complex manufacturing and physical warehouse logistics."
  },
  {
    name: "Microsoft Dynamics 365",
    bestFitFor: "Mid-sized businesses and organizations deeply invested in the Microsoft ecosystem",
    keyStrength: "Tight native integration with Microsoft Office 365, Teams, Azure, and Power BI.",
    sapComparisonPerspective: "Highly approachable for mid-market companies; SAP is preferred for ultra-high-volume transaction manufacturing and global supply chains."
  },
  {
    name: "NetSuite (Oracle)",
    bestFitFor: "Fast-growing startups, small-to-medium businesses (SMBs), and e-commerce companies",
    keyStrength: "Fast cloud deployment, lightweight subscription model, and simple financial rollouts.",
    sapComparisonPerspective: "Excellent for startups with basic inventory needs; companies frequently migrate to SAP when they scale into multi-plant global manufacturing."
  },
  {
    name: "Workday",
    bestFitFor: "Human Capital Management (HCM) and Financial Planning for service-based firms",
    keyStrength: "Intuitive user interface for employee management, payroll, and workforce planning.",
    sapComparisonPerspective: "Specialized leader in HR and corporate finance; companies often pair Workday with SAP for supply chain, manufacturing, and inventory."
  }
];

// 8. BEGINNER QUIZZES
export const BEGINNER_QUIZ_QUESTIONS: BeginnerQuizQuestion[] = [
  {
    id: "bq_1",
    question: "What does the abbreviation 'SAP' officially stand for?",
    type: "multiple-choice",
    options: [
      "Standard Application Programming",
      "Systems, Applications, and Products in Data Processing",
      "System Automation Protocol",
      "Sales, Accounting, and Procurement"
    ],
    correctIndex: 1,
    explanation: "SAP stands for 'Systems, Applications, and Products in Data Processing' (originally Systemanalyse Programmentwicklung in German, founded in 1972).",
    consultantReasoning: {
      businessProblem: "Understanding the enterprise identity and historical foundation of the software.",
      businessRequirement: "Professional domain knowledge of enterprise software terminology.",
      processInvolved: "Core Enterprise Architecture.",
      technologyRole: "Standardized business software.",
      summary: "SAP was created in 1972 by 5 former IBM engineers to standardize business data processing in real time."
    }
  },
  {
    id: "bq_2",
    question: "How is 'SAP' standardly pronounced in professional business and consulting environments?",
    type: "multiple-choice",
    options: [
      "Pronounced as the individual letters: 'S-A-P' (ess-ay-pee)",
      "Pronounced as the English word 'sap'",
      "Pronounced as 'S-App'",
      "Pronounced as 'Ess-Ah-Pay'"
    ],
    correctIndex: 0,
    explanation: "In professional enterprise conversations, SAP is always pronounced by spelling out the individual letters: S-A-P ('ess-ay-pee'). Casual pronunciation as the word 'sap' is avoided in professional consulting.",
    consultantReasoning: {
      businessProblem: "Professional communication standards when speaking with clients and teams.",
      businessRequirement: "Consulting etiquette and industry communication standards.",
      processInvolved: "Professional Stakeholder Engagement.",
      technologyRole: "Industry standard nomenclature.",
      summary: "Always pronounce it letter-by-letter: S-A-P."
    }
  },
  {
    id: "bq_3",
    question: "A manufacturing company cannot see how much inventory is stored across its 4 regional warehouses. What is the fundamental business requirement?",
    type: "scenario",
    options: [
      "Spend more money on social media marketing",
      "Hire 50 more delivery drivers",
      "Real-time, cross-warehouse inventory visibility on a centralized platform",
      "Move all offices to a larger building"
    ],
    correctIndex: 2,
    explanation: "The core business problem is lack of stock visibility. The direct business requirement is real-time inventory visibility across all plants to prevent stockouts and over-ordering.",
    consultantReasoning: {
      businessProblem: "Disconnected inventory records causing stockouts and bloated warehouse costs.",
      businessRequirement: "Real-time stock visibility across all organizational levels (Plant and Storage Location).",
      processInvolved: "Inventory Management & Goods Movement (SAP MM MMBE / SAP EWM /SCWM/MON).",
      technologyRole: "Centralized ERP database updating balances immediately upon Goods Receipt (101).",
      summary: "Consultants always identify the root operational requirement rather than applying superficial fixes."
    }
  },
  {
    id: "bq_4",
    question: "What is the primary difference between a company WITHOUT ERP and a company WITH an integrated ERP system?",
    type: "multiple-choice",
    options: [
      "Without ERP, every department uses isolated spreadsheets/systems; with ERP, all departments share a single source of truth.",
      "There is no difference; ERP is just an email client.",
      "With ERP, companies do not need any employees.",
      "Without ERP, companies make more profit."
    ],
    correctIndex: 0,
    explanation: "Without ERP, departments operate in isolated 'data silos' with duplicate, conflicting records. An integrated ERP connects Sales, Procurement, Warehouse, Production, and Finance onto one unified system.",
    consultantReasoning: {
      businessProblem: "Data silos, conflicting spreadsheets, and communication breakdowns across departments.",
      businessRequirement: "End-to-end process integration where a transaction in one department immediately updates all others.",
      processInvolved: "Procure-to-Pay (P2P) and Order-to-Cash (O2C) Enterprise Flows.",
      technologyRole: "Integrated Enterprise Resource Planning (ERP).",
      summary: "ERP eliminates data silos by providing a single shared database for the entire company."
    }
  },
  {
    id: "bq_5",
    question: "In what year and country was SAP founded by five former IBM engineers?",
    type: "multiple-choice",
    options: [
      "1972 in Germany",
      "1995 in the United States",
      "1980 in the United Kingdom",
      "2001 in Japan"
    ],
    correctIndex: 0,
    explanation: "SAP was founded in 1972 in Weinheim/Mannheim, Germany by Dietmar Hopp, Hasso Plattner, Claus Wellenreuther, Klaus Tschira, and Hans-Werner Hector.",
    consultantReasoning: {
      businessProblem: "Understanding the origins and longevity of enterprise software platforms.",
      businessRequirement: "Foundational SAP history and heritage.",
      processInvolved: "Enterprise Software Evolution.",
      technologyRole: "Historical standard for business computing.",
      summary: "Founded in 1972 in Germany, SAP pioneered real-time standard enterprise software."
    }
  },
  {
    id: "bq_6",
    question: "Where is the global corporate headquarters of SAP located?",
    type: "multiple-choice",
    options: [
      "Walldorf, Germany",
      "London, England",
      "New York, USA",
      "Geneva, Switzerland"
    ],
    correctIndex: 0,
    explanation: "SAP's global corporate headquarters is in Walldorf (Baden-Württemberg), Germany.",
    consultantReasoning: {
      businessProblem: "Corporate awareness of global technology leadership.",
      businessRequirement: "Understanding enterprise vendor organization.",
      processInvolved: "Corporate Governance.",
      technologyRole: "Global technology enterprise.",
      summary: "Walldorf, Germany has been SAP's global headquarters since the late 1970s."
    }
  },
  {
    id: "bq_7",
    question: "Why did SAP develop SAP HANA and transition from ECC to SAP S/4HANA?",
    type: "multiple-choice",
    options: [
      "To run in-memory processing in ultra-fast RAM, eliminate duplicate aggregate tables, and enable real-time analytics with modern Fiori UI.",
      "Because they wanted to make the software slower.",
      "To force users to only use paper invoices.",
      "Because older computers had too much memory."
    ],
    correctIndex: 0,
    explanation: "SAP S/4HANA is built natively on the SAP HANA in-memory database, eliminating legacy aggregate/index tables, enabling instant processing, and providing modern Fiori user experience.",
    consultantReasoning: {
      businessProblem: "Legacy relational databases struggled with large analytical reporting, requiring complex batch jobs overnight.",
      businessRequirement: "Instant real-time processing, simplified data models (like ACDOCA & MATDOC), and intuitive web interfaces.",
      processInvolved: "Digital Transformation & Cloud ERP Modernization.",
      technologyRole: "In-Memory Columnar Database + Simplified Next-Gen Core.",
      summary: "S/4HANA delivers instant analytics, simplified tables, and modern UI by running in-memory on HANA."
    }
  },
  {
    id: "bq_8",
    question: "Which SAP module is primarily responsible for purchasing raw materials, vendor management, and basic inventory tracking?",
    type: "multiple-choice",
    options: [
      "SAP MM (Materials Management)",
      "SAP PM (Plant Maintenance)",
      "SAP HCM (Human Capital Management)",
      "SAP QM (Quality Management)"
    ],
    correctIndex: 0,
    explanation: "SAP MM (Materials Management) covers the entire Procure-to-Pay (P2P) lifecycle, including Purchase Requisitions, Purchase Orders, Vendor evaluation, and Inventory Goods Receipts.",
    consultantReasoning: {
      businessProblem: "Procuring materials and tracking inventory efficiently across plants.",
      businessRequirement: "Sourcing, purchasing, and stock management capabilities.",
      processInvolved: "Procure-to-Pay (P2P).",
      technologyRole: "SAP Materials Management (MM).",
      summary: "SAP MM is the foundation for purchasing, vendor management, and stock control."
    }
  },
  {
    id: "bq_9",
    question: "When a warehouse needs complex bin-level coordinates, forklift RF terminal scanning, and automated wave picking, which specialized module is used?",
    type: "multiple-choice",
    options: [
      "SAP EWM (Extended Warehouse Management)",
      "SAP SuccessFactors",
      "SAP FI (Financial Accounting)",
      "SAP BTP"
    ],
    correctIndex: 0,
    explanation: "SAP EWM (Extended Warehouse Management) is designed for complex, high-velocity warehouse operations with RF barcode scanners, precise bin layouts, POSC/LOSC, and labor management.",
    consultantReasoning: {
      businessProblem: "Managing complex physical warehouse operations with thousands of pallet locations and barcode automation.",
      businessRequirement: "High-precision warehouse execution and physical stock optimization.",
      processInvolved: "Inbound Putaway, Outbound Picking, POSC, and Warehouse Task Management.",
      technologyRole: "SAP Extended Warehouse Management (EWM).",
      summary: "SAP EWM handles high-velocity execution, RF terminals, and complex warehouse layouts."
    }
  },
  {
    id: "bq_10",
    question: "Is SAP the only ERP software available in the world?",
    type: "true-false",
    options: [
      "False — Other prominent ERP platforms include Oracle, Microsoft Dynamics 365, Infor, and NetSuite.",
      "True — SAP is the only ERP software that exists."
    ],
    correctIndex: 0,
    explanation: "False. While SAP is a global enterprise leader, other major ERP systems include Oracle Cloud, Microsoft Dynamics 365, Infor, NetSuite, and Workday, each serving different business scales and requirements.",
    consultantReasoning: {
      businessProblem: "Understanding the competitive enterprise technology landscape.",
      businessRequirement: "Objective architectural evaluation for clients.",
      processInvolved: "Enterprise Software Selection & Advisory.",
      technologyRole: "Comparative ERP platforms.",
      summary: "A great consultant understands the full ERP ecosystem and why SAP is chosen for complex, global supply chains."
    }
  }
];
