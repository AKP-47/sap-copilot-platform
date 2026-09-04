import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { 
  Users, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Maximize2, 
  X, 
  ArrowRight, 
  Lightbulb, 
  Layers, 
  Zap, 
  Database, 
  Building2, 
  Compass,
  Award
} from "lucide-react";

interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyShift: string;
  tag: string;
}

export const WhoBuiltSapSection: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const { setCurrentView } = useSap();
  const [selectedMilestone, setSelectedMilestone] = useState<string>("1972");
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);

  const founders = [
    {
      name: "Dietmar Hopp",
      order: "1st on left",
      role: "Operations & Business Strategy",
      contribution: "Led corporate operations and business development, transforming a 5-person technical startup into a global enterprise standard."
    },
    {
      name: "Hasso Plattner",
      order: "2nd on left",
      role: "Architecture & Innovation",
      contribution: "Driving force behind real-time database architecture, client-server R/3 innovation, and later in-memory computing (HANA)."
    },
    {
      name: "Klaus Tschira",
      order: "Center (3rd)",
      role: "Systems & Core Algorithms",
      contribution: "Masterminded core data structures, algorithms, and system consistency that enabled instant cross-module postings."
    },
    {
      name: "Hans-Werner Hector",
      order: "4th on left",
      role: "Commercial & Business Logic",
      contribution: "Engineered standard commercial workflows, customer process integration, and European enterprise partnerships."
    },
    {
      name: "Claus Wellenreuther",
      order: "5th on left (Right)",
      role: "Financial Accounting Core",
      contribution: "Pioneered real-time financial accounting and standardized batch-free ledgers, creating the foundation of standard enterprise software."
    }
  ];

  const milestones: TimelineMilestone[] = [
    {
      id: "1972",
      year: "1972",
      title: "Founding in Weinheim/Mannheim",
      shortDesc: "SAP is founded by five former IBM engineers.",
      fullDesc: "Five engineers left IBM to build standard business software that ran on customer mainframes in real time instead of punching batch cards overnight.",
      keyShift: "Standard Software vs. Custom Client Code",
      tag: "The Spark"
    },
    {
      id: "realtime",
      year: "1973–1978",
      title: "Real-Time Business Processing",
      shortDesc: "SAP early vision focused on integrated, real-time business processing.",
      fullDesc: "Rather than waiting for nightly batch jobs, transactions entered on terminals immediately updated inventory counts and general ledger accounts.",
      keyShift: "Immediate Data Visibility",
      tag: "Vision"
    },
    {
      id: "r2",
      year: "1979",
      title: "SAP R/2 (Mainframe Architecture)",
      shortDesc: "SAP software evolves to support integrated enterprise business processes.",
      fullDesc: "R/2 unified multi-currency, multi-lingual accounting, materials management (MM), and production planning on mainframe systems for multinational corporations.",
      keyShift: "Cross-Departmental Integration",
      tag: "Enterprise Core"
    },
    {
      id: "r3",
      year: "1992",
      title: "SAP R/3 (Client-Server Era)",
      shortDesc: "SAP expands its client-server enterprise software platform.",
      fullDesc: "R/3 revolutionized corporate IT by splitting software into three distinct layers: Database, Application Server, and Graphical User Interface (GUI).",
      keyShift: "Global Scalability & 3-Tier Architecture",
      tag: "Global Standard"
    },
    {
      id: "s4hana",
      year: "Modern Era",
      title: "SAP S/4HANA (Intelligent ERP)",
      shortDesc: "SAP evolves toward its modern intelligent ERP platform.",
      fullDesc: "Rebuilt from the ground up on in-memory HANA database technology, enabling real-time analytics, AI copilot assistants, and unified MM + EWM warehouse execution.",
      keyShift: "In-Memory Columnar Speed & AI",
      tag: "Intelligent Suite"
    }
  ];

  const currentMilestoneData = milestones.find(m => m.id === selectedMilestone) || milestones[0];

  return (
    <section id="who-built-sap" className="space-y-8 scroll-mt-20">
      
      {/* Section Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>SAP ORIGIN & FOUNDATION (1972)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          WHO BUILT SAP?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          A vision. Five engineers. A new way to run business.
        </p>
      </div>

      {/* Main Editorial Two-Column Master Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: HISTORICAL PHOTOGRAPH (5 cols on desktop)       */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Historical Photograph Container */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 bg-slate-900">
              <img
                src="/images/sap-founders.png"
                alt="The Five Founders of SAP — Dietmar Hopp, Hasso Plattner, Klaus Tschira, Hans-Werner Hector, Claus Wellenreuther"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              
              {/* Expand Action Button Overlay */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 border border-white/20 shadow-lg transition-all hover:scale-110 flex items-center space-x-1.5 text-xs font-bold"
                title="Click to view full photo"
                aria-label="Inspect Full Image"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Inspect Photo</span>
              </button>
            </div>

            {/* Formal Historical Caption */}
            <div className="pt-3.5 space-y-1.5 text-center">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-center space-x-1.5">
                <Users className="w-4 h-4 text-amber-500" />
                <span>The Five Founders of SAP</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                <strong>Left to right:</strong> Dietmar Hopp, Hasso Plattner, Klaus Tschira, Hans-Werner Hector, and Claus Wellenreuther.
              </p>
            </div>

            {/* Quick Interactive Founders Mini List */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                The 5 Visionaries (Hover to Inspect):
              </span>
              <div className="space-y-1.5">
                {founders.map((f, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredFounder(f.name)}
                    onMouseLeave={() => setHoveredFounder(null)}
                    className={`p-2.5 rounded-xl border transition-all text-xs cursor-default ${
                      hoveredFounder === f.name
                        ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-850/60 border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{f.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{f.order}</span>
                    </div>
                    <div className="text-[11px] text-theme-primary font-medium mt-0.5">
                      {f.role}
                    </div>
                    {hoveredFounder === f.name && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed animate-in fade-in duration-150">
                        {f.contribution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Context Quote */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 border border-blue-200/80 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1 shadow-sm">
            <div className="flex items-center space-x-2 font-bold text-blue-700 dark:text-blue-400">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span>Did You Know?</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              SAP was originally founded as <em>Systemanalyse Programmentwicklung</em> ("System Analysis Program Development"). In 1972, virtually all corporate computing was batch-processed overnight. SAP made business processing <strong>real-time</strong>.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: THE STORY, TIMELINE & WHY THIS MATTERS (7 cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Story Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                THE ORIGIN
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                The Story Behind SAP
              </h3>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                "In 1972, five former IBM engineers in Germany had a bold vision: to create standard business software that could run business processes in real time."
              </p>
              <p>
                At the time, large corporations wrote separate, isolated custom programs for each department. Sales could not see what the warehouse had in stock, purchasing over-ordered materials, and accounting spent weeks reconciling conflicting ledger books by hand.
              </p>
              <p>
                Dietmar Hopp, Hasso Plattner, Klaus Tschira, Hans-Werner Hector, and Claus Wellenreuther realized that instead of reinventing code for every client, businesses shared fundamental processes: purchasing goods, managing inventory, manufacturing products, and balancing accounts.
              </p>
              <p>
                They founded SAP to connect these core business processes into a <strong>unified, integrated digital system</strong> where a single business transaction automatically updates every related department at the same moment.
              </p>
            </div>
          </div>

          {/* Interactive Architectural Evolution Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  INTERACTIVE EVOLUTION
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                  50-Year Architectural Journey
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                Click Milestones
              </span>
            </div>

            {/* Horizontal / Step Milestone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {milestones.map((m) => {
                const isSelected = selectedMilestone === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMilestone(m.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-white border-slate-900 dark:border-blue-500 shadow-md scale-[1.02]"
                        : "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-extrabold ${isSelected ? "text-amber-400" : "text-slate-500 dark:text-slate-400"}`}>
                      {m.year}
                    </span>
                    <span className="text-xs font-bold line-clamp-1">
                      {m.title.split(" (")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Highlight Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {currentMilestoneData.year}
                  </span>
                  <h5 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    {currentMilestoneData.title}
                  </h5>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded border border-amber-300 dark:border-amber-800">
                  {currentMilestoneData.tag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentMilestoneData.fullDesc}
              </p>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-2 text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400">Architectural Shift:</span>
                <span className="font-semibold text-theme-primary">{currentMilestoneData.keyShift}</span>
              </div>
            </div>
          </div>

          {/* Educational Takeaway Card: WHY THIS MATTERS */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  CORE CONSULTANT TAKEAWAY
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  WHY THIS MATTERS FOR YOUR SAP CAREER
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center">
              <p className="italic text-xs sm:text-sm text-amber-300 font-semibold leading-relaxed">
                "SAP started with a simple idea: business processes should work together instead of operating as disconnected systems."
              </p>
            </div>

            {/* 4 Foundation Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  title: "1. Integration",
                  desc: "When a warehouse worker receives material (MIGO), inventory increases, the PO updates, and FI balance sheets adjust simultaneously."
                },
                {
                  title: "2. Real-Time Processing",
                  desc: "Eliminates overnight batch delays. Decisions are made on live inventory, current stock, and actual customer orders."
                },
                {
                  title: "3. Enterprise Processes",
                  desc: "Standardizes global best practices (P2P, O2C, EWM) across different plants, company codes, and international borders."
                },
                {
                  title: "4. Unified Business System",
                  desc: "A single central source of truth, removing error-prone spreadsheets, duplicated data, and disconnected software islands."
                }
              ].map((pillar, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <h6 className="text-xs font-bold text-amber-400">{pillar.title}</h6>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Action link */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ready to explore how MM & EWM put this into practice?</span>
              <button
                onClick={() => setCurrentView("mm")}
                className="inline-flex items-center space-x-1 font-bold text-amber-400 hover:text-amber-300 hover:underline"
              >
                <span>Learn SAP MM →</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* High-Resolution Photo Lightbox Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6 text-white relative">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-10">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                HISTORICAL ARCHIVE (1972)
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                The Five Founders of SAP
              </h3>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 max-h-[60vh] flex items-center justify-center bg-black">
              <img
                src="/images/sap-founders.png"
                alt="The Five Founders of SAP Full Photo"
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">
                Left to right: Dietmar Hopp, Hasso Plattner, Klaus Tschira, Hans-Werner Hector, and Claus Wellenreuther.
              </p>
              <p className="text-[11px] text-slate-400">
                Photographed together in the early years of SAP growth from a small technical team into the foundation of global enterprise software.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
