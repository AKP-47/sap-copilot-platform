// =========================================================================
// RISE WITH SAP & GROW WITH SAP — CLOUD ERP & TRANSFORMATION ARCHITECTURE
// Comprehensive data foundation for S/4HANA Cloud offerings and decision framework
// =========================================================================

export interface CloudOfferingInfo {
  id: "rise" | "grow" | "public_cloud" | "private_cloud" | "on_premise";
  name: string;
  tagline: string;
  targetMarket: string;
  erpCore: string;
  infrastructureModel: string;
  governanceModel: string;
  customizationScope: string;
  upgradeCycle: string;
  implementationApproach: string;
  keyComponentsIncluded: string[];
  businessBenefits: string[];
  strategicTradeoffs: string[];
  typicalCustomerProfile: string;
}

export interface CloudDecisionCriteria {
  dimension: string;
  category: "Business" | "Technical" | "Architectural" | "Financial";
  publicCloudFit: string;
  privateCloudFit: string;
  riseFit: string;
  growFit: string;
  consultantQuestion: string;
}

export interface CloudClientScenario {
  id: string;
  clientName: string;
  industry: string;
  companySize: string;
  currentLandscape: string;
  keyBusinessRequirements: string[];
  criticalConstraints: string[];
  recommendedOffering: "RISE with SAP (Private Cloud)" | "GROW with SAP (Public Cloud)" | "SAP S/4HANA On-Premise" | "Hybrid Cloud" | "GROW with SAP (Public Cloud) for Subsidiary + RISE with SAP for Corporate Core (2-Tier ERP)" | string;
  whyRecommended: string[];
  riskMitigation: string[];
  architecturalTradeoffs: {
    pros: string[];
    cons: string[];
  };
  consultantChecklist: string[];
}

export const CLOUD_OFFERINGS: Record<string, CloudOfferingInfo> = {
  public_cloud: {
    id: "public_cloud",
    name: "SAP S/4HANA Cloud Public Edition",
    tagline: "Ready-to-run modern Cloud ERP with standard best practices and zero infrastructure management",
    targetMarket: "Net-new midmarket organizations, rapidly growing enterprises, and autonomous subsidiaries seeking fast standard deployment",
    erpCore: "Multi-tenant SaaS with continuous automated feature delivery and standardized 2-tier ERP capabilities",
    infrastructureModel: "Fully managed by SAP on hyperscaler infrastructure (AWS, Azure, GCP)",
    governanceModel: "Clean Core by default — non-negotiable standardized scope following SAP Best Practices",
    customizationScope: "In-App Extensibility (Custom Fields & Logic) and Side-by-Side Extensibility via SAP Build / SAP Business Technology Platform (BTP)",
    upgradeCycle: "Continuous semi-annual release upgrades managed automatically by SAP with zero customer downtime operations",
    implementationApproach: "Greenfield only using SAP Activate Methodology (Fit-to-Standard workshops)",
    keyComponentsIncluded: [
      "Standard Pre-configured SAP Best Practices (Scope Items)",
      "SAP Fiori UX as the sole interface",
      "Embedded Analytics and SAP AI Foundation",
      "SAP Business Technology Platform (BTP) consumption credits",
      "Automated testing tool (SAP Cloud ALM)"
    ],
    businessBenefits: [
      "Lowest Total Cost of Ownership (TCO) with predictable subscription pricing",
      "Fastest time-to-value (typically 12 to 24 weeks deployment)",
      "Always on the latest innovation with zero upgrade project overhead",
      "Guaranteed Clean Core facilitating frictionless long-term scalability"
    ],
    strategicTradeoffs: [
      "Cannot modify classic SAP source code (no SPRO IMG modification of core ABAP tables)",
      "Existing custom ECC modifications cannot be ported directly via Brownfield conversion",
      "Requires business processes to adapt to SAP standard rather than modifying SAP to match legacy habits"
    ],
    typicalCustomerProfile: "Fast-growing high-tech manufacturing, professional services, or consumer goods firm with standard supply chain requirements."
  },

  private_cloud: {
    id: "private_cloud",
    name: "SAP S/4HANA Cloud Private Edition",
    tagline: "Tailored Cloud ERP offering maximum functional depth, full SPRO customizing, and legacy brownfield transformation paths",
    targetMarket: "Large global enterprises, complex manufacturing/retail conglomerates with heavy legacy ECC customizations and bespoke integrations",
    erpCore: "Single-tenant dedicated SAP S/4HANA instance running in a secure hyperscaler cloud environment",
    infrastructureModel: "Managed by SAP as part of a single contract (SLA 99.7% or 99.9%) on chosen Hyperscaler (AWS, Azure, GCP) or SAP Data Center",
    governanceModel: "Customer-controlled release management with Clean Core advisory frameworks",
    customizationScope: "Full traditional ABAP extensibility, classic SPRO IMG configuration, plus Developer Extensibility (Embedded ABAP) and BTP side-by-side apps",
    upgradeCycle: "Annual feature pack stacks with minimum mandatory upgrade every 5 years (customer schedules upgrade windows)",
    implementationApproach: "Greenfield (New Implementation), Brownfield (System Conversion), or Selective Data Transition (Bluefield)",
    keyComponentsIncluded: [
      "Full traditional SAP S/4HANA Enterprise Management functionality (MM, EWM, TM, PP-PI, QM, FI/CO)",
      "SAP GUI for Windows/HTML and complete SAP Fiori launchpad",
      "Hyperscaler infrastructure management & single SLA contract",
      "SAP Signavio Process Insights & Process Manager starter packs",
      "SAP Business Technology Platform (BTP) cloud credits",
      "Custom Code Migration Cockpit and Cloud ALM"
    ],
    businessBenefits: [
      "Preserves decades of verified company-specific competitive business logic while shifting infrastructure to Cloud",
      "Supports Brownfield system conversions directly from ECC 6.0 EHP0-EHP8",
      "Full flexibility in industry solutions (Automotive, Oil & Gas, Banking, Utilities)",
      "Dedicated database and compute isolation for stringent regulatory compliance"
    ],
    strategicTradeoffs: [
      "Higher TCO compared to Public Cloud due to dedicated resources and operational governance",
      "Requires structured upgrade projects to stay within mainstream maintenance windows",
      "Greater discipline needed to adopt Clean Core practices and prevent technical debt accumulation"
    ],
    typicalCustomerProfile: "Global Tier-1 automotive supplier with 40 manufacturing plants across 12 countries running heavily customized MM-PP-EWM integrations."
  },

  rise: {
    id: "rise",
    name: "RISE with SAP",
    tagline: "Comprehensive Business Transformation as a Service (BTaaS) bundling software, cloud infrastructure, process transformation, and technical services",
    targetMarket: "Existing SAP installed-base customers migrating from ECC to S/4HANA, as well as large net-new enterprises with complex enterprise landscapes",
    erpCore: "Primarily SAP S/4HANA Cloud Private Edition (or Public Edition) with enterprise transformation tooling",
    infrastructureModel: "Single contract with SAP encompassing software license, infrastructure provider, operating system, and technical managed services",
    governanceModel: "Business Transformation guided by SAP Signavio Process Transformation Suite and SAP Clean Core Dashboard",
    customizationScope: "Configurable based on edition chosen (Full traditional & Clean Core extensibility for Private Edition)",
    upgradeCycle: "Customer-scheduled upgrades supported by SAP Cloud Application Services and ALM",
    implementationApproach: "System Conversion (Brownfield), Greenfield, or Selective Data Transition supported by SAP Activate",
    keyComponentsIncluded: [
      "SAP S/4HANA Cloud (Private or Public Edition) with enterprise license",
      "Cloud Infrastructure and Technical Managed Services (Single SLA across stack)",
      "SAP Signavio Process Transformation Suite (Process Insights & Process Manager)",
      "SAP Business Technology Platform (BTP) Enterprise Credits",
      "SAP Business Network Starter Pack (Ariba, Logistics Network, Asset Intelligence)",
      "SAP Readiness Check and Custom Code Migration tooling"
    ],
    businessBenefits: [
      "One accountable partner (SAP) for software, cloud hosting, uptime SLA, and foundational technical services",
      "Process discovery through Signavio identifies exact procurement bottlenecks before system design",
      "Direct commercial and operational transition path from on-premise CapEx maintenance to cloud OpEx subscription",
      "Included BTP credits accelerate custom apps, RPA bots, and supplier portal integrations"
    ],
    strategicTradeoffs: [
      "Long-term commercial subscription commitment",
      "Requires coordination between SAP (infrastructure/basis SLA) and Systems Integration Partner (functional consulting)",
      "Requires proactive change management to shift IT organization from basis administration to innovation management"
    ],
    typicalCustomerProfile: "Enterprise running SAP ECC 6.0 looking to modernize procurement, integrate EWM, and migrate 20 years of historical data with minimum business interruption."
  },

  grow: {
    id: "grow",
    name: "GROW with SAP",
    tagline: "Commercial and enablement bundle designed to help net-new midmarket businesses adopt Cloud ERP rapidly with predictable cost and scope",
    targetMarket: "Net-new midsize enterprises with no prior SAP footprint seeking enterprise-grade scalability without enterprise implementation complexity",
    erpCore: "SAP S/4HANA Cloud Public Edition with pre-configured Best Practice business processes",
    infrastructureModel: "Turnkey multi-tenant SaaS hosted and fully operated by SAP",
    governanceModel: "Strict Clean Core architecture with built-in compliance and security controls",
    customizationScope: "No core ABAP modifications; Low-code/No-code customization via SAP Build and BTP",
    upgradeCycle: "Automated continuous innovations twice yearly managed entirely by SAP",
    implementationApproach: "Standardized Greenfield using pre-configured SAP Best Practice Scope Items and SAP Activate",
    keyComponentsIncluded: [
      "SAP S/4HANA Cloud Public Edition pre-configured software suite",
      "Pre-activated industry Best Practices for Sourcing & Procurement, Finance, and Sales",
      "SAP Business Technology Platform (BTP) and SAP Build low-code development platform",
      "SAP Community access, learning hub subscriptions, and accelerated onboarding enablement",
      "Cloud ALM and Automated Test Engine"
    ],
    businessBenefits: [
      "Predictable timeline, transparent cost, and rapid go-live in months rather than years",
      "Zero basis administration, backup management, or infrastructure patching required",
      "Access to enterprise-grade AI features (Joule, automated PO matching, cash application) out of the box",
      "Scales seamlessly from $50M to $5B+ revenue without needing platform re-architecture"
    ],
    strategicTradeoffs: [
      "Business must adopt standard SAP process workflows without demanding custom screens",
      "No support for complex legacy bespoke ABAP programs or direct table modifications",
      "Specialized deep niche manufacturing logic must be handled via side-by-side BTP apps"
    ],
    typicalCustomerProfile: "Fast-growing high-tech manufacturer scaling from domestic operations to 4 international sales and assembly hubs."
  }
};

export const CLOUD_DECISION_FRAMEWORK: CloudDecisionCriteria[] = [
  {
    dimension: "Process Standardization vs Customization",
    category: "Business",
    publicCloudFit: "High fit for companies ready to adopt standard SAP Best Practice business processes without core code modifications.",
    privateCloudFit: "High fit for companies with highly specialized, non-standard procurement workflows, unique industry add-ons, or custom SPRO pricing logic.",
    riseFit: "Enables deep process analytics via Signavio to streamline and standardize before or during migration.",
    growFit: "Mandates standard best practices to ensure fastest implementation time.",
    consultantQuestion: "Can your procurement and inventory operations run on SAP standard best practices, or do your operations derive distinct competitive advantage from unique customized logic?"
  },
  {
    dimension: "Legacy ECC Footprint & Brownfield Conversion",
    category: "Technical",
    publicCloudFit: "Does NOT support Brownfield system conversion. All implementations must be clean Greenfield.",
    privateCloudFit: "Fully supports 1-step Brownfield System Conversion from ECC 6.0 to S/4HANA, preserving historical documents and custom code.",
    riseFit: "The primary vehicle for legacy ECC transformations seeking cloud migration with historical continuity.",
    growFit: "Strictly targeted at net-new implementations with legacy data migrated via Migration Cockpit.",
    consultantQuestion: "Do you require historical transactional continuity (PO history, open items, vendor records) through system conversion, or is clean master data migration preferred?"
  },
  {
    dimension: "Extensibility & Clean Core Strategy",
    category: "Architectural",
    publicCloudFit: "100% Clean Core by architecture. Custom logic built only on BTP or In-App Key User Extensibility.",
    privateCloudFit: "Supports Clean Core roadmap while allowing temporary classic ABAP/SPRO customizations where business critical.",
    riseFit: "Includes Custom Code Migration Cockpit and Clean Core governance dashboards to systematically reduce technical debt.",
    growFit: "Includes SAP Build and BTP credits to build extensions without ever touching the core ERP.",
    consultantQuestion: "How extensive is your custom ABAP codebase (Z-tables, user exits, BAdIs), and what is your strategy for decoupling extensions to BTP?"
  },
  {
    dimension: "Upgrade Governance & Innovation Velocity",
    category: "Technical",
    publicCloudFit: "Automated continuous upgrades every 6 months managed by SAP. Instant access to new AI & features.",
    privateCloudFit: "Customer chooses upgrade schedule (recommended every 1-2 years, mandatory every 5 years).",
    riseFit: "Technical managed services assist in compatibility testing and feature pack adoption.",
    growFit: "Zero-effort continuous upgrades with automated regression testing via Cloud ALM.",
    consultantQuestion: "Does the organization have the capacity to adopt continuous innovation twice a year, or does regulatory validation require strict customer-controlled release schedules?"
  },
  {
    dimension: "Infrastructure & Commercial Model",
    category: "Financial",
    publicCloudFit: "Pure SaaS multi-tenant subscription with lowest TCO and zero hardware management.",
    privateCloudFit: "Single-tenant cloud subscription bundling dedicated hyperscaler infrastructure, software, and SLA.",
    riseFit: "Single comprehensive commercial contract with SAP consolidating software, hosting, SLA, and transformation tools.",
    growFit: "Turnkey package with transparent predictable tiered subscription for midsize organizations.",
    consultantQuestion: "What is the organization's preference between a multi-tenant shared infrastructure with lowest TCO versus dedicated infrastructure isolation?"
  }
];

export const CLIENT_CLOUD_SCENARIOS: CloudClientScenario[] = [
  {
    id: "scen-auto-global",
    clientName: "Apex Automotive Tier-1 Global Group",
    industry: "Automotive & Industrial Manufacturing",
    companySize: "18,000 Employees | $4.2B Revenue | 26 Plants across NA, EU, and Asia",
    currentLandscape: "Running SAP ECC 6.0 EHP7 on Oracle with 1,200 custom Z-programs, heavy EDI integrations for JIT/JIS delivery, and bespoke MM-PP integration for KanBan staging.",
    keyBusinessRequirements: [
      "Modernize procurement and integrate S/4HANA Sourcing & Procurement with SAP EWM",
      "Minimize plant downtime during cutover across 26 global manufacturing facilities",
      "Retain critical JIT/JIS sequencing custom logic that gives them competitive advantage with OEMs",
      "Shift hosting from internal data centers to Microsoft Azure cloud with high availability (99.9% SLA)"
    ],
    criticalConstraints: [
      "Strict OEM penalties ($50k/minute) if assembly line shipments are disrupted during transition",
      "Complex legacy pricing routines and EDI 850/855/856 message schemas cannot be rewritten from scratch within the project timeline",
      "Corporate IT team has deep ABAP skills but zero hyperscaler basis administration experience"
    ],
    recommendedOffering: "RISE with SAP (Private Cloud)",
    whyRecommended: [
      "Enables a phased Brownfield system conversion or Selective Data Transition, preserving OEM EDI integration routines and custom JIT sequencing.",
      "Dedicated Private Cloud provides full SPRO customizing depth for complex MM pricing schemas, OBYC account determination, and MM-EWM qRFC integration.",
      "Single SLA contract with SAP shifts Azure infrastructure, patching, and disaster recovery to SAP while freeing internal IT for business innovation.",
      "Included SAP Signavio process insights directly pinpoints procurement bottlenecks and redundant Z-reports across the 26 plants prior to migration."
    ],
    riskMitigation: [
      "Execute SAP Readiness Check and Custom Code Migration Cockpit to classify Z-programs into Clean Core (keep), retire, or move to BTP.",
      "Conduct two mock cutovers in a sandbox environment before production cutover weekend.",
      "Establish 2-Tier ERP governance so smaller new warehouse rollouts can potentially use standard best practices."
    ],
    architecturalTradeoffs: {
      pros: [
        "Zero disruption to OEM JIT shipments",
        "Direct retention of 15 years of material master and vendor historical data",
        "Full support for advanced EWM POSC, LOSC, and RF terminal integration"
      ],
      cons: [
        "Higher recurring subscription cost than Public Cloud",
        "Requires ongoing governance to retire technical debt and achieve Clean Core compliance"
      ]
    },
    consultantChecklist: [
      "Run SAP Readiness Check for SAP S/4HANA to inspect Financial ACDOCA conversion requirements and MM material number length.",
      "Audit all 1,200 Z-programs using Custom Code Migration tool on BTP.",
      "Verify that all third-party EDI middleware (Seeburger/OpenText) is certified for S/4HANA Private Cloud.",
      "Map out SPRO OBYC account determination differences between ECC Chart of Accounts and S/4HANA Universal Journal."
    ]
  },

  {
    id: "scen-medtech-grow",
    clientName: "Novavita Biopharma & MedTech",
    industry: "Life Sciences & Medical Devices",
    companySize: "450 Employees | $120M Revenue | Fast-growing commercialization stage",
    currentLandscape: "Outgrown QuickBooks and disjointed spreadsheets. Zero legacy SAP footprint. Currently setting up 2 new assembly sites and scaling international supply chain.",
    keyBusinessRequirements: [
      "Implement an audit-ready, FDA 21 CFR Part 11 compliant ERP system for batch-managed medical consumables",
      "Go-live within 16 weeks to support IPO and regulatory audit deadlines",
      "Standard Procure-to-Pay workflow with electronic approvals and automated supplier invoice verification",
      "Zero internal basis or server maintenance overhead"
    ],
    criticalConstraints: [
      "No internal IT department — only 2 business analysts and 1 finance director",
      "Fixed budget CapEx ceiling; requires predictable OpEx subscription",
      "Must adopt industry standard best practices rather than designing custom software"
    ],
    recommendedOffering: "GROW with SAP (Public Cloud)",
    whyRecommended: [
      "SAP S/4HANA Cloud Public Edition provides turnkey, pre-activated Best Practice scope items for Sourcing & Procurement and Batch Management.",
      "16-week deployment timeline achievable via SAP Activate Fit-to-Standard methodology without custom ABAP development.",
      "Automated twice-yearly upgrades ensure continuous compliance with evolving pharmaceutical supply chain regulations.",
      "Lowest TCO with zero server infrastructure, basis administration, or database tuning required."
    ],
    riskMitigation: [
      "Enforce strict adherence to SAP Best Practice Scope Items during Explore phase (Fit-to-Standard).",
      "Utilize included SAP Build tools for lightweight custom approval forms without breaking the Clean Core.",
      "Leverage SAP Automated Test Tool to validate batch traceability workflows before semi-annual upgrades."
    ],
    architecturalTradeoffs: {
      pros: [
        "Fastest time-to-value (16 weeks)",
        "Pre-configured FDA-ready audit trails and batch traceability out of the box",
        "Zero infrastructure management or basis staffing costs"
      ],
      cons: [
        "Cannot modify core SAP tables directly via classic SPRO",
        "Must adjust business operational processes to match standard SAP workflows"
      ]
    },
    consultantChecklist: [
      "Conduct Fit-to-Standard workshops using Scope Items 22Z (Procurement of Direct Materials) and 1N8 (Batch Management).",
      "Set up Business Partner groupings and Payment Terms in accordance with standard best practice templates.",
      "Configure SAP Fiori launchpad role-based authorizations for Quality Inspector, Purchaser, and Accounts Payable specialist.",
      "Validate CSV/Excel data upload templates in SAP S/4HANA Migration Cockpit for Material Master and Supplier records."
    ]
  },

  {
    id: "scen-retail-hybrid",
    clientName: "MetroVogue Omnichannel Retail",
    industry: "Retail & Consumer Fashion",
    companySize: "8,500 Employees | $1.8B Revenue | 320 Retail Stores + High-Volume E-Commerce",
    currentLandscape: "Running SAP ECC 6.0 with IS-Retail add-on at headquarters, alongside 3 modern e-commerce subsidiaries acquired recently that operate autonomously.",
    keyBusinessRequirements: [
      "Connect dynamic procurement for fast-fashion subsidiary with parent company financial consolidation",
      "Enable 2-Tier ERP where the subsidiary runs agile cloud procurement while parent company manages central Treasury & Sourcing",
      "Real-time visibility into vendor inventory and automated purchase order creation based on POS sales feeds"
    ],
    criticalConstraints: [
      "Fast-fashion subsidiary cannot wait for parent company's 2-year ECC transformation program",
      "Must support daily seasonal collection changes and multi-currency supplier contracts in Asia and Europe"
    ],
    recommendedOffering: "GROW with SAP (Public Cloud) for Subsidiary + RISE with SAP for Corporate Core (2-Tier ERP)",
    whyRecommended: [
      "2-Tier ERP architecture allows the fast-fashion subsidiary to go live in 12 weeks on Public Cloud while parent company plans its broader S/4HANA Private Cloud transformation.",
      "Standard API connectors integrate subsidiary purchase orders and goods receipts seamlessly with parent corporate financial consolidation.",
      "Autonomous subsidiary gains agility and modern Fiori apps without being slowed down by legacy corporate customizations."
    ],
    riskMitigation: [
      "Define standard master data governance (MDG) for shared Material Groups and Business Partner codes across both tiers.",
      "Establish automated daily master data replication via SAP BTP Integration Suite."
    ],
    architecturalTradeoffs: {
      pros: [
        "Subsidiary achieves immediate go-live without enterprise delay",
        "Parent company maintains centralized financial control and corporate purchasing leverage",
        "Validates Clean Core architecture for future corporate adoption"
      ],
      cons: [
        "Requires maintaining API interfaces between 2-Tier ERP instances",
        "Requires dual-level user training for subsidiary vs corporate personnel"
      ]
    },
    consultantChecklist: [
      "Configure 2-Tier ERP Scope Item 2EL (Intercompany Process for 2-Tier ERP).",
      "Set up SAP BTP Cloud Integration iFlows for master data and PO synchronization.",
      "Establish clear boundary between local subsidiary purchasing vs centralized corporate vendor contracts."
    ]
  }
];
