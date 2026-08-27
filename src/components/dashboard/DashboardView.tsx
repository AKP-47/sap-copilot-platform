import { useUserAuth } from "../../context/UserAuthContext";
import React from "react";
import { useSap, AppView } from "../../context/SapContext";
import { LeadershipAndAssistanceSection } from "../common/LeadershipAndAssistanceSection";
import { 
  Package,
  ShieldCheck,
  Brain,
  Dna,
  Network,
  Sliders,
  Warehouse, 
  GitMerge, 
  RotateCw, 
  Terminal, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen,
  Search,
  SlidersHorizontal,
  Smartphone,
  Stethoscope,
  Factory,
  Compass,
  Award,
  ChevronRight,
  Flame
} from "lucide-react";
import { MM_TOPICS } from "../../data/mmTopics";
import { EWM_TOPICS } from "../../data/ewmTopics";

export const DashboardView: React.FC = () => {
  const { currentUser } = useUserAuth();
  const { 
    setCurrentView, 
    setSelectedTopicId, 
    setIsSearchOpen, 
    setIsCopilotOpen,
    learningLevel,
    completedScenarios, 
    bookmarks 
  } = useSap();

  // 6 Primary Quick Action Launchers
  const quickActions = [
    {
      title: "Continue Learning",
      desc: "Resume SAP MM & EWM Curriculum",
      icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      action: () => setCurrentView("mm"),
      bg: "hover:border-blue-400 dark:hover:border-blue-500",
      pill: "P2P & EWM"
    },
    {
      title: "Practice a Scenario",
      desc: "Solve hands-on industry challenges",
      icon: <Cpu className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
      action: () => setCurrentView("scenarios"),
      bg: "hover:border-pink-400 dark:hover:border-pink-500",
      pill: "Simulations"
    },
    {
      title: "Find a T-Code",
      desc: "Instant search for 100+ transactions",
      icon: <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      action: () => setCurrentView("tcodes"),
      bg: "hover:border-indigo-400 dark:hover:border-indigo-500",
      pill: "Lookup"
    },
    {
      title: "Explore EWM Execution",
      desc: "Inbound, Outbound, POSC & LOSC",
      icon: <Warehouse className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      action: () => setCurrentView("ewm"),
      bg: "hover:border-emerald-400 dark:hover:border-emerald-500",
      pill: "Warehouse"
    },
    {
      title: "Prepare for Interview",
      desc: "150+ Consultant & Senior questions",
      icon: <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      action: () => setCurrentView("interview_prep"),
      bg: "hover:border-amber-400 dark:hover:border-amber-500",
      pill: "Interview"
    },
    {
      title: "Ask AI SAP Copilot",
      desc: "Instant AI consultant explanations",
      icon: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      action: () => setIsCopilotOpen(true),
      bg: "hover:border-purple-400 dark:hover:border-purple-500",
      pill: "AI Advisor"
    },
    {
      title: "Owner Visitor Tracker",
      desc: "Restricted intelligence & metrics",
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      action: () => setCurrentView("owner_analytics"),
      bg: "hover:border-amber-400 dark:hover:border-amber-500 bg-amber-500/5",
      pill: "Owner Only"
    }
  ];

  // Core Learning Modules
  const primaryModules = [
    {
      title: "SAP MM – Sourcing & Procurement",
      description: "Complete P2P Cycle: Master Data (Material, BP/Vendor, PIR), Purchasing (PR, PO, Release Strategy), Inventory Mgmt (MIGO, Stock Types), LIV 3-Way Match & SPRO Configuration.",
      icon: <Package className="w-7 h-7 text-amber-500" />,
      tag: "Core P2P Domain",
      view: "mm" as const,
      topicCount: `${MM_TOPICS.length} Topics`,
      bg: "border-amber-200 dark:border-amber-900/40 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:border-amber-400",
      btnText: "Learn SAP MM"
    },
    {
      title: "SAP EWM – Extended Warehouse Management",
      description: "Consultant-Grade Curriculum: Org Structure, Warehouse Execution (WT, WO, WOCR), Inbound/Outbound, POSC/LOSC, Deconsolidation, VAS, RF Terminal & Automation.",
      icon: <Warehouse className="w-7 h-7 text-blue-500" />,
      tag: "Full Execution Domain",
      view: "ewm" as const,
      topicCount: `${EWM_TOPICS.length} Topics`,
      bg: "border-blue-200 dark:border-blue-900/40 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 hover:border-blue-400",
      btnText: "Learn SAP EWM"
    },
    {
      title: "SAP MM + EWM Integration Hub",
      description: "End-to-End Enterprise Flows: PR ➔ PO ➔ Inbound Delivery ➔ EWM Putaway, Outbound Waves ➔ PGI, STO Plant-to-Plant, and qRFC (SMQ1/SMQ2) troubleshooting.",
      icon: <GitMerge className="w-7 h-7 text-purple-500" />,
      tag: "Integration Bridge",
      view: "integration" as const,
      topicCount: "8 E2E Flows",
      bg: "border-purple-200 dark:border-purple-900/40 bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:border-purple-400",
      btnText: "Open Integration Hub"
    }
  ];

  // Real-World Industry Scenarios
  const industryScenarios = [
    {
      industry: "🚗 Automotive Manufacturing",
      title: "Brake Assembly Receipt & Quality Inspection",
      flow: "PO ➔ Inbound Delivery ➔ Movement 101 ➔ Quality Stock ➔ Unrestricted",
      actionView: "movement_lab" as const
    },
    {
      industry: "🍔 Food & Cold Chain",
      title: "Perishable Batch Receipt & Temperature Monitoring",
      flow: "Batch Master ➔ Expiry Date SLED ➔ Storage Type 0030 ➔ FIFO Putaway",
      actionView: "scenarios" as const
    },
    {
      industry: "✈️ Aerospace & Defense",
      title: "Serialized Component Tracing & Strict Certification",
      flow: "Serial Number Profile ➔ Inbound Inspection ➔ High-Rack Storage",
      actionView: "industry_labs" as const
    },
    {
      industry: "💊 Pharmaceutical & Healthcare",
      title: "GMP Cleanroom Storage & Batch Release",
      flow: "Restricted Batch ➔ QA Release (QA01) ➔ Movement 321 ➔ Active Bin",
      actionView: "scenarios" as const
    }
  ];

  // Interactive Laboratories & Simulators
  const interactiveSimulators = [
    {
      title: "Movement Type Lab (40+)",
      desc: "40+ Movement Types with Debit/Credit T-Accounts and Multi-Industry Challenges.",
      icon: <RotateCw className="w-5 h-5 text-emerald-500" />,
      view: "movement_lab" as const,
      badge: "40+ Codes"
    },
    {
      title: "T-Code & Fiori Explorer",
      desc: "Searchable T-Codes with tables, inputs, outputs & real-world context.",
      icon: <Terminal className="w-5 h-5 text-indigo-500" />,
      view: "tcodes" as const,
      badge: "100+ T-Codes"
    },
    {
      title: "Virtual SPRO IMG Tree",
      desc: "Step-by-step enterprise configuration paths with T-Code shortcuts.",
      icon: <SlidersHorizontal className="w-5 h-5 text-slate-400" />,
      view: "spro_guide" as const,
      badge: "Config Tree"
    },
    {
      title: "OBYC T-Accounts Ledger",
      desc: "Real-time debit/credit visualizer for automatic FI/MM account determination.",
      icon: <Layers className="w-5 h-5 text-orange-500" />,
      view: "obyc_sim" as const,
      badge: "FI-MM Postings"
    },
    {
      title: "EWM Monitor (/SCWM/MON)",
      desc: "Live warehouse hierarchy, bin capacities, inbound deliveries & queues.",
      icon: <Activity className="w-5 h-5 text-cyan-500" />,
      view: "whse_monitor" as const,
      badge: "Warehouse Tree"
    },
    {
      title: "RF Terminal Simulator (/RFUI)",
      desc: "Interactive warehouse barcode scanner for receiving, picking & putaway.",
      icon: <Smartphone className="w-5 h-5 text-teal-500" />,
      view: "rf_terminal" as const,
      badge: "Barcode UI"
    },
    {
      title: "POSC & LOSC Visualizer",
      desc: "Multi-step complex routing: Unload ➔ Count ➔ Decon ➔ Quality ➔ Putaway.",
      icon: <GitMerge className="w-5 h-5 text-violet-500" />,
      view: "posc_visualizer" as const,
      badge: "Layout Routing"
    },
    {
      title: "SAP Error & Dump Doctor",
      desc: "Interactive Root Cause Analysis (RCA) for M7021, M7001, /SCWM/ errors.",
      icon: <Stethoscope className="w-5 h-5 text-rose-500" />,
      view: "error_doctor" as const,
      badge: "RCA Clinic"
    },
    {
      title: "11 Industry Workbenches",
      desc: "Simulate SAP implementations across Automotive, Pharma, Retail & Aerospace.",
      icon: <Factory className="w-5 h-5 text-sky-500" />,
      view: "industry_labs" as const,
      badge: "11 Industries"
    }
  ];

  return (
    <div className="space-y-10 pb-6 max-w-7xl mx-auto">
      
      {/* ============================================================ */}
      {/* HERO SECTION: WELCOME & PROMINENT SEARCH-FIRST EXPERIENCE    */}
      {/* ============================================================ */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-extrabold uppercase tracking-wider rounded-full shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>TagSkills Enterprise SAP Platform</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {currentUser ? (
              <span>Welcome, <span className="text-amber-400">{currentUser.name.split(" ")[0]}</span> 👋</span>
            ) : (
              <span>Learn SAP. Practice Real Scenarios. Become Job-Ready.</span>
            )}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {currentUser ? "Let's start building your SAP journey from fundamentals to job-ready consultant mastery." : "Master SAP Materials Management (MM) & Extended Warehouse Management (EWM) through real enterprise business problems, live execution, and consultant reasoning."}
          </p>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A comprehensive consultant-level learning platform for <strong className="text-white">SAP MM</strong> (Sourcing & Procurement) and <strong className="text-white">SAP EWM</strong> (Warehouse Execution) with live simulators, real-world case studies, and AI assistance.
          </p>

          {/* Prominent Hero Search Bar */}
          <div className="pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-amber-400/60 shadow-2xl transition-all text-left group"
              aria-label="Open Global Search"
            >
              <div className="flex items-center space-x-3 text-slate-300 group-hover:text-white">
                <Search className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm truncate">
                  What do you want to learn? (e.g., Movement Type 101, Purchase Order, Inbound Delivery, POSC, MIGO...)
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 shrink-0">
                <kbd className="px-2 py-1 text-[10px] font-mono font-bold bg-white/20 text-white rounded border border-white/20">
                  /
                </kbd>
                <kbd className="px-2 py-1 text-[10px] font-mono font-bold bg-white/20 text-white rounded border border-white/20">
                  ⌘K
                </kbd>
              </div>
            </button>

            {/* Popular Search Suggestions Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300 mr-1">Popular:</span>
              {[
                { label: "Movement 101", query: "101" },
                { label: "Purchase Order", query: "Purchase Order" },
                { label: "Inbound Delivery", query: "Inbound" },
                { label: "POSC", query: "POSC" },
                { label: "MIGO", query: "MIGO" },
                { label: "Error M7021", query: "M7021" }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setIsSearchOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>


      {/* ============================================================ */}
      {/* BEGINNER-ONLY ACADEMY LAUNCHPAD BANNER                       */}
      {/* ============================================================ */}
      {learningLevel === "BEGINNER" && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>RECOMMENDED START FOR BEGINNERS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              New to Business & SAP? Start Here
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Understand what a business is, how ERP works, why companies use SAP, official pronunciation ("S-A-P"), founding history, and module ecosystems before diving into MM & EWM.
            </p>
          </div>

          <button
            onClick={() => setCurrentView("foundations")}
            className="inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-white text-slate-950 hover:bg-emerald-50 font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-105"
          >
            <span>Open Beginner Academy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: QUICK ACTION LAUNCHPAD (6 CORE ACTIONS)           */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center">
              <span>Quick Launchpad</span>
              <Compass className="w-4 h-4 ml-1.5 text-blue-600 dark:text-blue-400" />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump straight into your daily learning, simulations, or interview prep.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left transition-all hover:shadow-md flex flex-col justify-between space-y-3 group ${item.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {item.pill}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                  {item.desc}
                </p>
              </div>

              <div className="pt-1 flex items-center text-[11px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Open</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* ============================================================ */}
      {/* SECTION 3: PROGRESSIVE LEARNING JOURNEY ROADMAP               */}
      {/* ============================================================ */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
              LEARNING ARCHITECTURE
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1">
            Consultant Transformation Journey
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A structured progression model engineered to take you from foundational concepts to enterprise implementation.
          </p>
        </div>

        {/* Visual Process Flow Roadmap */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {[
            { step: "1. DISCOVER", label: "Business Overview", color: "border-blue-400 text-blue-600 dark:text-blue-400" },
            { step: "2. LEARN", label: "Curriculum Concepts", color: "border-amber-400 text-amber-600 dark:text-amber-400" },
            { step: "3. UNDERSTAND", label: "Industry Scenarios", color: "border-emerald-400 text-emerald-600 dark:text-emerald-400" },
            { step: "4. PRACTICE", label: "Interactive Labs", color: "border-purple-400 text-purple-600 dark:text-purple-400" },
            { step: "5. TEST", label: "RCA & Error Doctor", color: "border-rose-400 text-rose-600 dark:text-rose-400" },
            { step: "6. INTERVIEW", label: "7-Tier Questions", color: "border-indigo-400 text-indigo-600 dark:text-indigo-400" },
            { step: "7. JOB READY", label: "Elite Consultant", color: "border-teal-400 text-teal-600 dark:text-teal-400" }
          ].map((s, idx) => (
            <div 
              key={idx}
              className={`p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-850 text-left space-y-1 ${s.color} border-l-2`}
            >
              <div className="text-[10px] font-mono font-extrabold uppercase">
                {s.step}
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ============================================================ */}
      {/* SECTION 4: PRIMARY LEARNING MODULES                          */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Core Curriculum Modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deep structured learning tracks with step-by-step business processes and configuration guides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {primaryModules.map((module, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${module.bg} shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 bg-white dark:bg-slate-900`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800">
                    {module.icon}
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {module.topicCount}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {module.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {module.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {module.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentView(module.view);
                  setSelectedTopicId(null);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-sm group"
              >
                <span>{module.btnText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* ============================================================ */}
      {/* SECTION 5: REAL-WORLD INDUSTRY SCENARIOS                     */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Featured Real-World Industry Scenarios
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real enterprise case studies across Automotive, Food & Beverage, Aerospace, and Pharmaceuticals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industryScenarios.map((scen, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  {scen.industry}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                  {scen.title}
                </h4>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Process: </span>
                  <span>{scen.flow}</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView(scen.actionView)}
                className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
              >
                <span>Practice Scenario Flow</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* ============================================================ */}
      {/* SECTION: THINK LIKE AN SAP CONSULTANT (METHODOLOGY SUITE)     */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 rounded border border-amber-200 dark:border-amber-800">
              SIGNATURE PEDAGOGY
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            "Think Like an SAP Consultant" Framework
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A distinctive enterprise learning methodology: Business ➔ Industry ➔ Requirement ➔ Process ➔ Decision ➔ Reasoning ➔ Solution ➔ Consequence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Business -> SAP Reasoning",
              desc: "Signature 8-stage interactive framework translating business pain points into SAP solutions.",
              icon: <Brain className="w-6 h-6 text-amber-500" />,
              view: "business_reasoning" as const,
              badge: "Signature Framework"
            },
            {
              title: "Enterprise Connection Map",
              desc: "Interactive end-to-end process map from Customer Order to Financial Balance Sheet.",
              icon: <GitMerge className="w-6 h-6 text-purple-500" />,
              view: "enterprise_map" as const,
              badge: "End-to-End Flow"
            },
            {
              title: "SAP Concept DNA (360°)",
              desc: "Deep architectural breakdown with dynamic 'What Would Change If...' mutations.",
              icon: <Dna className="w-6 h-6 text-indigo-500" />,
              view: "concept_dna" as const,
              badge: "What If? Engine"
            },
            {
              title: "Impact & Trade-Off Simulator",
              desc: "Simulate how changing safety stock & POSC steps impacts carrying cost vs stockout risk.",
              icon: <Sliders className="w-6 h-6 text-amber-500" />,
              view: "impact_sim" as const,
              badge: "Trade-Off Analysis"
            },
            {
              title: "Consultant Investigation Mode",
              desc: "Gather clues across POs, MRP, and Warehouse Bins to diagnose assembly line shutdowns.",
              icon: <Search className="w-6 h-6 text-emerald-500" />,
              view: "investigation" as const,
              badge: "Evidence RCA"
            },
            {
              title: "Knowledge Map & Mastery Tree",
              desc: "4-tier competence mastery tree tracking your MM, EWM, and Cross-Module skills.",
              icon: <Network className="w-6 h-6 text-teal-500" />,
              view: "knowledge_map" as const,
              badge: "Mastery Tree"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-theme-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => setCurrentView(item.view)}
                className="w-full flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-theme-primary group-hover:underline"
              >
                <span>Launch Framework Tool</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 6: INTERACTIVE LABORATORIES & SIMULATORS GRID        */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Interactive Laboratories & Simulators
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Practice hands-on tools, terminal simulators, debit/credit ledgers, and live monitor hierarchies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interactiveSimulators.map((sim, sIdx) => (
            <button
              key={sIdx}
              onClick={() => setCurrentView(sim.view)}
              className="text-left bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 transition-colors">
                    {sim.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                    {sim.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sim.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {sim.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700">
                <span>Launch Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* ============================================================ */}
      {/* SECTION 7: EXECUTIVE CEO & MENTOR SHOWCASE                   */}
      {/* ============================================================ */}
      <LeadershipAndAssistanceSection />

    </div>
  );
};
