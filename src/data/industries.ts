import { IndustryInfo, IndustryKey } from "../types/sap";

export const INDUSTRIES: Record<IndustryKey, IndustryInfo> = {
  automotive: {
    id: "automotive",
    name: "Automotive Manufacturing",
    icon: "Car",
    tagline: "High-precision Just-In-Time (JIT/JIS) supply chain with complex tier suppliers & returnable packaging.",
    businessDrivers: ["Zero-downtime line feeding", "JIT/JIS sequence delivery", "Supplier quality compliance", "Returnable packaging tracking (Handling Units)"],
    keyChallenges: ["Bottlenecks in engine block and transmission receiving", "Line stoppage penalties ($10,000/min)", "Strict batch serialization for recall prevention"],
    mmNuances: ["Evaluated Receipt Settlement (ERS)", "Scheduling Agreements (LP/LPA) with release docu", "Consignment stock (Movement type 411 K)", "Subcontracting for specialized heat treatments (541/543)"],
    ewmNuances: ["POSC for Deconsolidation & Quality Gate", "Direct line-side staging to PSA (Production Supply Area)", "Nested Handling Units (Pallet > Wire Mesh > Box)", "Yard Management for trailer parking & dock scheduling"],
    sampleProcess: "Tier-1 Brake Caliper Delivery -> ASN Inbound Delivery -> Yard Check-In -> Door Assignment -> POSC Unloading -> Deconsolidation to Line Bins -> Kanban Triggered Line Feeding."
  },
  aerospace: {
    id: "aerospace",
    name: "Aerospace & Defense",
    icon: "Plane",
    tagline: "Rigorous FAA/EASA traceability, serialized lifecycle tracking, and MRO overhaul logistics.",
    businessDrivers: ["100% component lifecycle traceability", "AS9100 quality certifications", "MRO repair turnaround time", "Specialized cold-storage adhesives"],
    keyChallenges: ["Foreign Object Debris (FOD) segregation", "Time-temperature sensitive pre-pregs (shelf life expiration)", "Split batch inspection"],
    mmNuances: ["Mandatory Serial Numbers at GR", "Split Valuation based on Part Condition (New, Overhauled, Damaged)", "Service POs for complex calibration"],
    ewmNuances: ["Batch & Serial number capture during RF Putaway", "Strict temperature-monitored storage zones", "ADPROD for component scrapping & overhaul disassembly"],
    sampleProcess: "Turbine Blade PO -> Inbound Delivery -> Quality Inspection Lot (01) -> CMM Machine Dimensional Check -> Bin Assignment in Secure High-Value Storage -> Serialized Traceability Record."
  },
  pharma: {
    id: "pharma",
    name: "Pharmaceutical & Life Sciences",
    icon: "ShieldAlert",
    tagline: "FDA 21 CFR Part 11 compliance, GMP clean-room warehousing, and cold-chain FEFO rotation.",
    businessDrivers: ["Patient safety & GMP compliance", "First-Expiry-First-Out (FEFO) picking", "Cold-chain 2°C-8°C unbroken temperature log", "Electronic signature validation"],
    keyChallenges: ["Quarantine release lag causing stockout", "Cross-contamination of active pharmaceutical ingredients (APIs)", "Strict sample draw management"],
    mmNuances: ["Strict Batch Management with SLED/BBD (Shelf Life)", "Quality Info Records with vendor block", "Usage Decisions (UD) triggering 321 QM release"],
    ewmNuances: ["FEFO picking strategy based on VFDAT", "POSC with Sampling Work Center", "Clean-room staging and hazardous material storage classes", "Audit trail logging on every WT confirmation"],
    sampleProcess: "API Inbound -> Temperature Logger Download -> Quarantine Bin Storage -> Quality Sample Draw WT -> QM Release UD -> Automatic Posting Change to Unrestricted -> FEFO picking for formulation batch."
  },
  food_beverage: {
    id: "food_beverage",
    name: "Food & Beverage",
    icon: "Apple",
    tagline: "High-volume perishables, Catch Weight Management (CWM), and allergen isolation.",
    businessDrivers: ["Freshness preservation", "Allergen matrix isolation (Nuts, Dairy, Gluten)", "Catch Weight dual-unit pricing (Cases vs Kg)", "Traceability for rapid recalls"],
    keyChallenges: ["Rapid spoilage risk", "Dual quantity discrepancies (weight loss during curing)", "High-velocity cross-docking during seasonal peaks"],
    mmNuances: ["Catch Weight units of measure (Base UoM vs Parallel UoM)", "Total Shelf Life and Minimum Remaining Shelf Life checks in PO", "Consignment for agricultural raw goods"],
    ewmNuances: ["FEFO putaway and picking", "Allergen storage section determination rules", "Opportunistic cross-docking from Receiving to Shipping Doors", "Catch Weight valuation tolerance checks"],
    sampleProcess: "Fresh Dairy Inbound -> Dual Weight Capture at Receiving -> Blast Chiller Storage Zone -> Quality Taste & Microbial Test -> Wave Picking for Supermarket Distribution -> Refrigerated Trailer Loading."
  },
  mechanical: {
    id: "mechanical",
    name: "Mechanical & Heavy Engineering",
    icon: "Wrench",
    tagline: "High-mix low-volume machinery, heavy fabrication components, and project-based stock.",
    businessDrivers: ["BOM precision for engineered-to-order assemblies", "Heavy crane utilization & oversized bin allocation", "Subcontracted galvanizing & machining", "Milestone billing support"],
    keyChallenges: ["Long lead time castings (6+ months)", "Heavy component floor damage", "Missing parts delaying final assembly line"],
    mmNuances: ["Project Stock (Special stock Q / WBS element)", "Subcontracting with multi-level BOMs", "Non-valuated materials (UNBW) for jigs & fixtures"],
    ewmNuances: ["Heavy-duty floor storage types with weight capacity limits", "Activity areas linked to gantry crane zones", "VAS (Value Added Services) for anti-rust oiling and packaging"],
    sampleProcess: "Heavy Casting Inbound -> Overhead Crane Unloading -> Dimensional Quality Gate -> Staging at WBS-specific project bay -> Kitting with fasteners -> Production GI (261 Q)."
  },
  electronics: {
    id: "electronics",
    name: "High-Tech & Electronics",
    icon: "Cpu",
    tagline: "High-velocity innovation, Electrostatic Discharge (ESD) protection, and high-value security.",
    businessDrivers: ["Ultra-fast product lifecycles & obsolescence prevention", "ESD-safe handling and humidity control", "Serial-number level tracking for warranty", "High-value theft prevention"],
    keyChallenges: ["Component counterfeiting", "Micro-chip moisture sensitivity level (MSL) expiration", "Rapid price erosion in inventory valuation"],
    mmNuances: ["Split valuation based on grade/speed rating", "Serial number profile assigned to equipment master", "Vendor consignment with auto-invoice (MRKO)"],
    ewmNuances: ["High-security caged storage types with dual-authorization", "Humidity-controlled storage sections", "Pick-by-Voice / RF scanning for micro-bins", "Deconsolidation of SMD reels"],
    sampleProcess: "SMD Capacitor Reels Inbound -> ESD Bag Verification -> Moisture Barrier Bag Inspection -> Barcode 2D Datamatrix Scanning -> Micro-Carrousel Automated Bin Putaway."
  },
  retail: {
    id: "retail",
    name: "Retail & Omnichannel",
    icon: "ShoppingBag",
    tagline: "Omnichannel fulfillment, high-speed pick-pack-ship, cross-docking, and returns management.",
    businessDrivers: ["Same-day delivery SLA fulfillment", "E-commerce individual item picking vs Store bulk replenishment", "High-efficiency returns processing", "Dynamic replenishment"],
    keyChallenges: ["Peak holiday volume surges (Black Friday 10x spikes)", "High return rates (up to 35% in fashion)", "Split shipments eroding margins"],
    mmNuances: ["Retail Article Master (Single, Generic, Variants)", "Promotional Purchasing Agreements", "Store-to-Store Stock Transport Orders (STO)"],
    ewmNuances: ["Wave Management with 2-step picking", "Pick-to-Light / Put-to-Light Putaway and Sorting", "Cross-Docking (Merchandise Distribution)", "Returns Work Center with grading (Grade A, B, Scrap)"],
    sampleProcess: "Supplier Bulk Shipment Inbound -> Merchandise Cross-Docking -> 70% Allocated Direct to Store Outbound Waves -> 30% Putaway to Pick-Face -> Dynamic Replenishment triggered by min-max threshold."
  },
  cpg: {
    id: "cpg",
    name: "Consumer Packaged Goods (CPG)",
    icon: "Package",
    tagline: "High-volume FMCG distribution, full pallet handling, layer picking, and promotional kitting.",
    businessDrivers: ["Pallet-in / Pallet-out high throughput", "Promotional display kitting (VAS)", "Transportation load optimization (FTL)", "Minimizing warehouse demurrage"],
    keyChallenges: ["Crushable pallet layer integrity", "Seasonal demand fluctuations", "Short shelf-life promotions"],
    mmNuances: ["Quota Arrangement across multiple production plants", "Purchase Orders with Packaging Instructions", "Physical Inventory via Cycle Counting"],
    ewmNuances: ["Automatic Packaging Specification determination", "VAS Orders for promotional bundles & shrink-wrapping", "Layer picking using specialized clamp trucks", "WOCR optimized for travel distance"],
    sampleProcess: "Production Line Finished Goods Transfer -> Automatic Inbound HU Generation -> High-Bay AS/RS Putaway -> VAS Work Center for Promotional Sleeve Wrapping -> Outbound Wave Staging for Multi-Stop Truckload."
  },
  logistics_3pl: {
    id: "logistics_3pl",
    name: "Logistics Service Providers & 3PL",
    icon: "Truck",
    tagline: "Multi-tenant warehousing, custodian ownership segregation, and warehouse billing.",
    businessDrivers: ["Multi-client segregation in single warehouse", "Accurate storage & handling fee billing", "SLA compliance per client contract", "Flexible onboarding of new clients"],
    keyChallenges: ["Stock commingling risk between competing clients", "Diverse product types in one facility", "Complex billable activity tracking"],
    mmNuances: ["Consignment & Custodian Owner mapping in Business Partner", "Standard Service Master for warehouse billing rates", "Customs Bonded Warehouse tracking"],
    ewmNuances: ["Stock Owner (Owner) and Party Entitled to Dispose (PED) differentiation", "Warehouse Billing integration with SAP TM/SD", "Multi-client RF menus and bin partitioning", "Activity Areas isolated by client agreement"],
    sampleProcess: "Client A Goods Inbound -> Custodian Owner Verified -> Storage in Dedicated Client A Aisle -> Monthly Storage Day Count Tracked -> Pick & Dispatch -> Automated Billing Extract generated."
  },
  construction: {
    id: "construction",
    name: "Construction & Infrastructure",
    icon: "HardHat",
    tagline: "Job-site direct delivery, heavy structural steel, non-standard staging, and milestone procurement.",
    businessDrivers: ["Direct-to-site deliveries bypassing central warehouse", "Project milestone tied procurement", "Heavy machinery rental tracking", "Loss and scrap reduction on site"],
    keyChallenges: ["Unpredictable site storage weather exposure", "Damaged goods during site transit", "Misplaced bulk materials (Cement, Rebar)"],
    mmNuances: ["Project Stock (Q) assigned to WBS elements", "Third-Party Purchase Orders (TAS) with direct site drop", "Reservations linked to Network Activities (PS)"],
    ewmNuances: ["Open-yard storage types with coordinate-based GPS bins", "Heavy crane resource allocation", "Staging Area Groups dedicated to project phases"],
    sampleProcess: "Structural Steel PO with Account Assignment Q (WBS) -> Direct Inbound to Laydown Yard -> Visual Weld Inspection -> Project Tagging -> Staging for Site Assembly Crane."
  },
  industrial: {
    id: "industrial",
    name: "Industrial Equipment & Machinery",
    icon: "Boxes",
    tagline: "Complex configurable products, spare parts distribution, and global warranty supply chain.",
    businessDrivers: ["After-sales spare parts 24-hour delivery SLA", "Variant configuration (KMAT) components", "Reverse logistics for core returns & remanufacturing", "Long-term legacy parts storage"],
    keyChallenges: ["Slow-moving dead stock management", "High value spares preservation (anti-corrosion)", "Emergency breakdown priority picking"],
    mmNuances: ["Configurable Materials (KMAT) with Super BOMs", "Slow-moving inventory reserve analysis", "Core exchange purchase orders with surcharge credits"],
    ewmNuances: ["Emergency Priority Wave Management (Override FIFO)", "Kitting for maintenance overhaul packs", "Vertical carousel storage integration (MFS)", "Scrapping and de-manufacturing workflows (ADPROD)"],
    sampleProcess: "Emergency Spares PO -> Priority Inbound -> Direct Pick-Face Staging -> Urgent Outbound Wave Trigger -> Courier Air Dispatch within 2 hours."
  }
};
