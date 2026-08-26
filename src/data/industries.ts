// =========================================================================
// SAP COPILOT & TAGSKILLS INDUSTRY REALITY ENGINE (30+ ENTERPRISE SECTORS)
// =========================================================================

export interface IndustryData {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  businessDrivers: string[];
  keyChallenges: string[];
  mmNuances: string[];
  ewmNuances: string[];
  sampleProcess: string;
}

export const INDUSTRIES: Record<string, IndustryData> = {
  "all": {
    "id": "all",
    "name": "All Industries (Cross-Sector)",
    "icon": "Globe",
    "tagline": "Universal enterprise best practices and cross-industry standard SAP configurations.",
    "businessDrivers": [
      "Supply chain agility",
      "Working capital optimization",
      "Global compliance",
      "Total cost of ownership"
    ],
    "keyChallenges": [
      "Multi-tier supplier visibility",
      "Regulatory harmonization",
      "Lead time reduction"
    ],
    "mmNuances": [
      "Standard PO, PIR, Source Lists, 3-Way Matching, and Universal Accounting Determination"
    ],
    "ewmNuances": [
      "Standard Inbound Putaway, Outbound Wave Picking, and Layout-Oriented Storage Control"
    ],
    "sampleProcess": "PR -> PO -> Inbound Delivery -> Goods Receipt (101) -> Quality -> Putaway -> Invoice (MIRO)"
  },
  "automotive": {
    "id": "automotive",
    "name": "Automotive & Mobility",
    "icon": "Car",
    "tagline": "Just-in-Time (JIT), Just-in-Sequence (JIS), Kanban replenishment, and VIN component serialization.",
    "businessDrivers": [
      "Zero-downtime assembly lines",
      "Strict Tier-1/Tier-2 supplier delivery sync",
      "Traceability for vehicle safety recalls"
    ],
    "keyChallenges": [
      "Line-side stockouts",
      "Short delivery windows",
      "High-variant bill of materials (BOM)"
    ],
    "mmNuances": [
      "Scheduling Agreements (LP/LPA) with EDI DELFOR/DELJIT",
      "Evaluated Receipt Settlement (ERS)",
      "Kanban (PK13N)"
    ],
    "ewmNuances": [
      "Handling Unit Management (HUM)",
      "Production Supply Area (PSA) replenishment",
      "Yard Management for trailer spotting"
    ],
    "sampleProcess": "EDI 830 Forecast -> JIT Call -> Inbound Dock Staging -> Deconsolidation -> Line-Side PSA Feed"
  },
  "aerospace": {
    "id": "aerospace",
    "name": "Aerospace & Defense",
    "icon": "Plane",
    "tagline": "Rigorous FAA/EASA serialization, dual-use export control, and lifetime component traceability.",
    "businessDrivers": [
      "100% mission reliability",
      "AS9100 quality compliance",
      "Decades-long spare parts maintenance cycles"
    ],
    "keyChallenges": [
      "Counterfeit parts prevention",
      "ITAR export restrictions",
      "Zero-tolerance quality deviations"
    ],
    "mmNuances": [
      "Mandatory Serial Number Profiles",
      "Certificate of Analysis (CoA)",
      "Split Valuation for repaired components"
    ],
    "ewmNuances": [
      "Segregated Defense bonded storage bins",
      "Nested handling unit serialization",
      "Inspection Lot 01/08 routing"
    ],
    "sampleProcess": "Strict PO -> Inbound Delivery -> 100% QM Inspection Lot -> Serialized Goods Receipt -> Secure Storage Bin"
  },
  "pharma": {
    "id": "pharma",
    "name": "Pharmaceuticals & Biotech",
    "icon": "Pill",
    "tagline": "Good Manufacturing Practice (GMP), FDA 21 CFR Part 11, cold chain, and active ingredient potency.",
    "businessDrivers": [
      "Patient safety",
      "Stringent batch release workflows",
      "Shelf Life Expiration Date (SLED) enforcement"
    ],
    "keyChallenges": [
      "Cold chain temperature excursions",
      "Batch recall risks",
      "Regulatory audits (FDA/EMA)"
    ],
    "mmNuances": [
      "Active Ingredient Batch Management",
      "Batch Classification (Characteristics like Potency, Assay)",
      "SLED / FEFO picking"
    ],
    "ewmNuances": [
      "Cleanroom storage types",
      "Temperature-controlled refrigerated zones (2-8\u00b0C)",
      "Batch Status Management (Restricted vs Unrestricted)"
    ],
    "sampleProcess": "Batch Creation at Inbound -> Quarantine Stock -> Lab QA Release (QA01) -> Movement 321 -> Cold Bin Putaway"
  },
  "food_beverage": {
    "id": "food_beverage",
    "name": "Food & Beverage",
    "icon": "Utensils",
    "tagline": "Perishable shelf-life FEFO rotation, farm-to-fork batch traceability, and allergen segregation.",
    "businessDrivers": [
      "Freshness guarantee",
      "Zero food waste",
      "HACCP food safety compliance"
    ],
    "keyChallenges": [
      "Fast spoilage rates",
      "Seasonal supply volatility",
      "Cross-contamination risk"
    ],
    "mmNuances": [
      "First-Expired-First-Out (FEFO) picking strategy",
      "Catch Weight Management (kg vs pieces)",
      "Allergen storage classifications"
    ],
    "ewmNuances": [
      "Deep-freeze storage zones (-20\u00b0C)",
      "Automated pallet wrapping",
      "Wave picking optimized by dispatch departure time"
    ],
    "sampleProcess": "Perishable Milk Inbound -> Temperature Log Check -> SLED Validation -> Rapid Pallet Putaway -> FEFO Auto-Wave"
  },
  "chemicals": {
    "id": "chemicals",
    "name": "Chemicals & Process Industry",
    "icon": "FlaskConical",
    "tagline": "Hazardous materials (HAZMAT), bulk silo storage, environmental safety, and tank farm blending.",
    "businessDrivers": [
      "EHS environmental safety",
      "Bulk transport efficiency",
      "REACH chemical compliance"
    ],
    "keyChallenges": [
      "Toxic material handling",
      "Incompatible chemical co-storage prevention",
      "Bulk liquid density variations"
    ],
    "mmNuances": [
      "Dangerous Goods Master",
      "Active Ingredient concentration",
      "Tank/Silo Storage Locations"
    ],
    "ewmNuances": [
      "HAZMAT fire containment zones",
      "Incompatible storage class exclusion rules in /SCWM/T334T",
      "Drum/IBC liquid handling"
    ],
    "sampleProcess": "HAZMAT Safety Verification -> Tanker Offloading -> Laboratory Density Test -> Dedicated Fire-Safe Storage Zone"
  },
  "retail": {
    "id": "retail",
    "name": "Retail & Fashion",
    "icon": "ShoppingBag",
    "tagline": "Omnichannel distribution, seasonal fashion color/size grids, high-velocity cross-docking.",
    "businessDrivers": [
      "Rapid inventory turnover",
      "E-commerce same-day dispatch",
      "Stock availability across retail stores"
    ],
    "keyChallenges": [
      "Short fashion lifecycle",
      "High return rates (Reverse Logistics)",
      "Store replenishment spikes"
    ],
    "mmNuances": [
      "Generic / Variant Articles (Color/Size)",
      "Retail Promotions",
      "Cross-Docking distribution orders"
    ],
    "ewmNuances": [
      "Opportunistic Merchandise Cross-Docking",
      "Pick-by-Light & Put-to-Light sortation",
      "Returns Quality Assessment Work Centers"
    ],
    "sampleProcess": "Inbound Truck Receipt -> Direct Cross-Dock to Outbound Store Waves -> Store Pallet Staging -> Zero Putaway Overhead"
  },
  "high_tech": {
    "id": "high_tech",
    "name": "High Tech & Electronics",
    "icon": "Cpu",
    "tagline": "Rapid product obsolescence, cleanroom SMD wafer handling, and serialized consumer electronics.",
    "businessDrivers": [
      "Fast time-to-market",
      "Component price deflation management",
      "Warranty and IMEI/MAC address tracking"
    ],
    "keyChallenges": [
      "Component counterfeiting",
      "Electrostatic Discharge (ESD) damage",
      "Global supply chain allocation constraints"
    ],
    "mmNuances": [
      "Split Valuation for Grade A/B components",
      "Consignment inventory at EMS contract manufacturers",
      "Lead time monitoring"
    ],
    "ewmNuances": [
      "ESD-safe anti-static storage bins",
      "Automated Storage and Retrieval Systems (ASRS)",
      "Serial number capture at packing"
    ],
    "sampleProcess": "Component Inbound -> Serialized Box Scan -> Humidity Card Check -> Automated ASRS Bin -> Cleanroom Outbound"
  },
  "energy": {
    "id": "energy",
    "name": "Energy & Utilities",
    "icon": "Zap",
    "tagline": "Heavy capital project procurement, mission-critical spare parts (MRO), and grid equipment maintenance.",
    "businessDrivers": [
      "Zero power outages",
      "High availability of turbine spares",
      "Project network procurement (SAP PS)"
    ],
    "keyChallenges": [
      "Remote site logistics",
      "High cost of emergency spares",
      "Long supplier manufacturing lead times"
    ],
    "mmNuances": [
      "MRO Spare Parts (ERSA)",
      "Project Purchase Orders (Account Assignment Q)",
      "Consignment stock at remote power plants"
    ],
    "ewmNuances": [
      "Heavy yard storage for transformers and cable reels",
      "Mobile RF field scanners for maintenance vans",
      "Staging for work orders (261)"
    ],
    "sampleProcess": "PM Work Order (IW31) -> Auto PR Generation -> PO with Delivery to Remote Grid Substation -> MIGO 101 to Project Stock"
  },
  "logistics_3pl": {
    "id": "logistics_3pl",
    "name": "3PL & Logistics Providers",
    "icon": "Truck",
    "tagline": "Multi-client warehouse operations, logistics value-added services (VAS), and dynamic billing.",
    "businessDrivers": [
      "Warehouse space optimization",
      "Accurate client billing per pallet-day",
      "Multi-tenant tenant isolation"
    ],
    "keyChallenges": [
      "Client SLA penalties",
      "High labor turnover",
      "Multi-client stock commingling risks"
    ],
    "mmNuances": [
      "Multi-owner inventory ownership",
      "Vendor consignment with multiple business partners",
      "Customs bonded warehousing"
    ],
    "ewmNuances": [
      "Multi-Client Warehouse Numbers",
      "Value-Added Services (VAS) kitting/labeling",
      "Warehouse Billing integration with SAP TM/FI"
    ],
    "sampleProcess": "Multi-Tenant Inbound -> Client Owner Assignment (Party Entitled to Dispose) -> VAS Kitting -> Automated Client Storage Invoicing"
  },
  "healthcare": {
    "id": "healthcare",
    "name": "Healthcare & Hospitals",
    "icon": "Activity",
    "tagline": "Surgical kit replenishment, sterile implant consignment, and point-of-use inventory control.",
    "businessDrivers": [
      "Patient care continuity",
      "Sterility assurance",
      "Cost control on expensive medical implants"
    ],
    "keyChallenges": [
      "Expired surgical stock",
      "Stockouts in trauma ER units",
      "Implant consignment reconciliations"
    ],
    "mmNuances": [
      "Vendor Consignment for Orthopedic Implants",
      "Unique Device Identifier (UDI) tracking",
      "Automatic SLoc replenishment"
    ],
    "ewmNuances": [
      "Sterile storage zones",
      "Ward-level par-location replenishment",
      "RFID tag tracking for surgical carts"
    ],
    "sampleProcess": "Sterile Implant Consumption in OR -> Auto Consignment Settlement (MRKO) -> Daily Replenishment Trigger"
  },
  "mining": {
    "id": "mining",
    "name": "Mining & Metals",
    "icon": "Mountain",
    "tagline": "Remote site MRO spares, heavy ore transport logistics, and explosive safety protocols.",
    "businessDrivers": [
      "24/7 crusher/haul-truck uptime",
      "Remote desert/arctic supply lines",
      "Heavy equipment lifecycle cost"
    ],
    "keyChallenges": [
      "6-month supply lead times",
      "Massive spare parts (e.g., $100k tires)",
      "Harsh environmental degradation"
    ],
    "mmNuances": [
      "Direct-to-Site Purchase Orders",
      "Consignment stores at mine site",
      "Split valuation for rebuilt heavy engines"
    ],
    "ewmNuances": [
      "Bulk yard management for raw ore and heavy spares",
      "Crane-assisted picking zones",
      "Off-grid satellite RF sync"
    ],
    "sampleProcess": "Emergency Crusher Bearing Breakdown -> Critical PO Expedite -> Helicopter Staging -> Immediate MIGO 201 to Cost Center"
  },
  "construction": {
    "id": "construction",
    "name": "Construction & Infrastructure",
    "icon": "HardHat",
    "tagline": "Project-based materials management (WBS), cement/steel batch tracking, and site crane staging.",
    "businessDrivers": [
      "Project milestone deadlines",
      "Material waste minimization",
      "Subcontractor accountability"
    ],
    "keyChallenges": [
      "Site weather delays",
      "Unsecured job site theft",
      "Bulk aggregate quality testing"
    ],
    "mmNuances": [
      "WBS Account Assigned Purchase Orders",
      "Subcontracting Purchase Orders (541/543)",
      "Direct Jobsite Delivery"
    ],
    "ewmNuances": [
      "Temporary laydown yard staging",
      "Crane unloading schedule synchronization",
      "Batch slump testing for concrete"
    ],
    "sampleProcess": "Project WBS Schedule -> Subcontracting PO for Precast Beams -> Laydown Yard Staging -> On-Site Quality Release"
  },
  "oil_gas": {
    "id": "oil_gas",
    "name": "Oil & Gas (Upstream & Downstream)",
    "icon": "Flame",
    "tagline": "Offshore rig supply vessels, pipe inventory serialization, and refinery turnaround management.",
    "businessDrivers": [
      "Offshore platform safety",
      "Pipeline integrity",
      "Turnaround schedule compression"
    ],
    "keyChallenges": [
      "Hazardous marine logistics",
      "High cost of rig downtime ($500k/day)",
      "Strict API / NACE certifications"
    ],
    "mmNuances": [
      "Offshore Supply Vessel (OSV) manifests",
      "Joint Venture (JV) cost accounting",
      "Tubular goods serialization"
    ],
    "ewmNuances": [
      "Pipe yard staging and tally counts",
      "Offshore container load optimization",
      "Hazardous marine chemical staging"
    ],
    "sampleProcess": "Offshore Rig Requisition -> Emergency PO -> Pipe Yard Inspection -> Supply Vessel Manifest Loading -> Offshore Dock Delivery"
  },
  "telecom": {
    "id": "telecom",
    "name": "Telecommunications",
    "icon": "Radio",
    "tagline": "Tower hardware rollouts, fiber optic spool management, and SIM card / handset retail logistics.",
    "businessDrivers": [
      "5G network deployment speed",
      "High handset inventory turnover",
      "Network uptime"
    ],
    "keyChallenges": [
      "Technician van inventory stockouts",
      "Handset IMEI fraud",
      "Massive SKU volume"
    ],
    "mmNuances": [
      "Serialized Handset Receipts",
      "Fiber Spool Length Management (Batch with linear dimensions)",
      "Field technician mobile replenishment"
    ],
    "ewmNuances": [
      "High-density automated handset storage",
      "IMEI barcode validation during wave packing",
      "Refurbished returns sorting"
    ],
    "sampleProcess": "Handset Pallet Inbound -> Scan 5,000 IMEIs -> Auto Bin Putaway -> E-Commerce Flash Sale Wave Release -> Courier Dispatch"
  },
  "banking": {
    "id": "banking",
    "name": "Banking & Financial Services",
    "icon": "Landmark",
    "tagline": "Indirect corporate procurement, ATM hardware spare parts, and credit card / security token fulfillment.",
    "businessDrivers": [
      "Strict internal audit compliance",
      "Branch operational efficiency",
      "Total cost of ownership on IT assets"
    ],
    "keyChallenges": [
      "High-value security token tracking",
      "Strict procurement authorization matrices",
      "SaaS license cost management"
    ],
    "mmNuances": [
      "Service Purchase Orders (SES / ML81N)",
      "Approval Release Strategies with dynamic workflow",
      "Asset Accounting (FI-AA) integration"
    ],
    "ewmNuances": [
      "Secure vault storage for cards/tokens",
      "Serialized hardware depot staging for ATM tech repairs",
      "Dual-custody verification"
    ],
    "sampleProcess": "Branch Hardware Requisition -> Multi-Level Workflow Approval -> Direct Vendor Dispatch to 1,200 Bank Branches"
  },
  "public_sector": {
    "id": "public_sector",
    "name": "Public Sector & Government",
    "icon": "Building",
    "tagline": "Public budget encumbrance accounting, competitive tender procurement, and emergency stockpile management.",
    "businessDrivers": [
      "Taxpayer transparency",
      "Strict legal tender regulations",
      "Disaster relief preparedness"
    ],
    "keyChallenges": [
      "Budgetary fund expiration",
      "Multi-month tender approval cycles",
      "Emergency surge demand"
    ],
    "mmNuances": [
      "Public Tender RFQs (Request for Quotation)",
      "Funds Management (FM) commitment accounting",
      "Split-award supplier contracts"
    ],
    "ewmNuances": [
      "National emergency stockpile warehouses",
      "Kitting of disaster relief family packages",
      "Military asset tracking"
    ],
    "sampleProcess": "Public Tender Publication -> Sealed Bid Evaluation -> Multi-Award PO with Budget Reservation -> Stockpile Inbound"
  },
  "agriculture": {
    "id": "agriculture",
    "name": "Agriculture & Farming",
    "icon": "Wheat",
    "tagline": "Seasonal crop harvesting, bulk fertilizer bulk storage, grain silo moisture grading, and seed batch germination.",
    "businessDrivers": [
      "Weather harvest window capture",
      "Grain moisture preservation",
      "Seed germination rate certification"
    ],
    "keyChallenges": [
      "Extreme seasonal surge demand",
      "Weather degradation risks",
      "Commodity price volatility"
    ],
    "mmNuances": [
      "Moisture content split valuation",
      "Commodity Purchase Contracts (ACM)",
      "Seasonal batch germination testing"
    ],
    "ewmNuances": [
      "Silo storage bulk handling",
      "Grain elevator conveyor integration",
      "Bulk truck weighing station integration"
    ],
    "sampleProcess": "Grain Truck Inbound -> Weighbridge & Moisture Sensor -> Silo Assignment -> Automated Elevator Offload -> Grading"
  },
  "hospitality": {
    "id": "hospitality",
    "name": "Hospitality & Leisure",
    "icon": "Coffee",
    "tagline": "Hotel chain food & beverage procurement, linen linen logistics, and guest amenity stock replenishment.",
    "businessDrivers": [
      "5-star guest satisfaction",
      "Daily menu ingredient freshness",
      "Centralized buying economies of scale"
    ],
    "keyChallenges": [
      "Perishable culinary ingredients",
      "High linen turnover",
      "Multi-property stock transfers"
    ],
    "mmNuances": [
      "Central Commissary Sourcing",
      "Internal Stock Transport Orders (STO) between hotels",
      "Par-level food reordering"
    ],
    "ewmNuances": [
      "Hotel central warehouse kitting",
      "Daily banquet cart prep",
      "Linen laundry sorting and tracking"
    ],
    "sampleProcess": "Daily Kitchen Recipe Needs -> Central Hotel Commissary Pick -> Early Morning Refrigerated Van Transfer -> Banquet Prep"
  },
  "fashion": {
    "id": "fashion",
    "name": "Fashion & Luxury Goods",
    "icon": "Glasses",
    "tagline": "Seasonal runway collections, luxury item serialization, boutique store replenishment, and hanger garment logistics.",
    "businessDrivers": [
      "Brand prestige",
      "Zero counterfeit exposure",
      "Rapid boutique stock replenishment"
    ],
    "keyChallenges": [
      "Short 8-week fashion seasons",
      "Hanger garment handling (GOH)",
      "High online return rates"
    ],
    "mmNuances": [
      "Fashion Grid Attributes (Style / Color / Size / Fit)",
      "Luxury item RFID serialization",
      "Consignment at luxury department stores"
    ],
    "ewmNuances": [
      "Garment-on-Hanger (GOH) overhead conveyors",
      "High-security luxury vault zones",
      "Boutique-ready luxury gift packaging"
    ],
    "sampleProcess": "Runway Collection Inbound -> GOH Overhead Rail Induction -> Boutique RFID Packing -> Direct Air Courier to Paris Boutique"
  }
};

export const INDUSTRIES_LIST: IndustryData[] = Object.values(INDUSTRIES);
export const ALL_INDUSTRIES_COUNT = INDUSTRIES_LIST.length;
