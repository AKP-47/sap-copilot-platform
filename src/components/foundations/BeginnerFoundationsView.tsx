import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { PageHeader } from "../common/PageHeader";
import { 
  BUSINESS_FOUNDATION_STAGES,
  BUSINESS_FUNCTIONS,
  PROBLEM_SOLUTION_FLOWS,
  SAP_FOUNDERS,
  SAP_GLOBAL_LOCATIONS,
  SAP_VERSIONS_TIMELINE,
  BEGINNER_MODULES_INTRO,
  ERP_LANDSCAPE_COMPARISONS,
  BEGINNER_QUIZ_QUESTIONS,
  BusinessStage
} from "../../data/beginnerFoundations";
import { 
  Building2, 
  HelpCircle, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Globe, 
  Users, 
  ShieldCheck, 
  Zap, 
  Database, 
  Cpu, 
  AlertTriangle, 
  Factory, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  TrendingUp, 
  DollarSign, 
  RotateCw,
  ChevronRight,
  BookOpen,
  Award,
  Compass
} from "lucide-react";

export const BeginnerFoundationsView: React.FC = () => {
  const { setCurrentView, setSelectedTopicId } = useSap();
  
  const [activeTab, setActiveTab] = useState<
    "business" | "what_is_erp" | "what_is_sap" | "founders" | "history" | "modules" | "competitors" | "scenarios" | "quiz" | "consultant"
  >("business");

  const [selectedStage, setSelectedStage] = useState<BusinessStage>(BUSINESS_FOUNDATION_STAGES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<string, boolean>>({});

  // Interactive Pronunciation handler using Web Speech API
  const handlePronounceSap = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsPlayingAudio(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("S. A. P.  ess ay pee");
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 1500);
    }
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowQuizExplanations(prev => ({ ...prev, [questionId]: true }));
  };

  const tabs = [
    { id: "business", label: "1. Business Foundations", icon: <Building2 className="w-4 h-4" /> },
    { id: "what_is_erp", label: "2. What is ERP?", icon: <Database className="w-4 h-4" /> },
    { id: "what_is_sap", label: "3. What is SAP? & Pronunciation", icon: <Volume2 className="w-4 h-4" /> },
    { id: "founders", label: "4. Founders & Origin", icon: <Users className="w-4 h-4" /> },
    { id: "history", label: "5. History (R/2 ➔ S/4HANA)", icon: <Clock className="w-4 h-4" /> },
    { id: "modules", label: "6. SAP Modules Ecosystem", icon: <Layers className="w-4 h-4" /> },
    { id: "competitors", label: "7. Other ERP Platforms", icon: <Globe className="w-4 h-4" /> },
    { id: "scenarios", label: "8. Signature Problem ➔ SAP", icon: <Cpu className="w-4 h-4" /> },
    { id: "quiz", label: "9. Beginner Knowledge Quiz", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "consultant", label: "10. Think Like a Consultant", icon: <Briefcase className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Standardized Page Header with Learning Outcomes */}
      <PageHeader
        badge="BEGINNER ACADEMY ONLY — ZERO PREREQUISITES REQUIRED"
        badgeColor="bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
        title="Business Foundations, ERP & SAP Origin"
        description="Master the fundamentals of how modern businesses operate, why ERP systems are the backbone of global trade, what SAP stands for, where it originated, and how SAP modules connect enterprise operations."
        breadcrumbs={[
          { label: "Beginner Academy" },
          { label: "Business & SAP Foundations" }
        ]}
        learningOutcomes={[
          "How businesses create value, revenue, costs & profit",
          "10-Stage End-to-End Business Operations Lifecycle",
          "Why ERP eliminates disconnected spreadsheet silos",
          "Official SAP Full Form and correct 'S-A-P' pronunciation",
          "Founding Story (1972), 5 Founders & Walldorf HQ",
          "Evolution: R/2 ➔ R/3 ➔ ECC ➔ HANA ➔ S/4HANA Cloud",
          "High-level role of SAP MM, EWM, SD, FI, CO & PP"
        ]}
      />

      {/* Beginner Academy Interactive Step Navigation Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                backgroundColor: isActive ? "var(--theme-primary)" : "transparent",
                color: isActive ? "#ffffff" : "var(--theme-text-secondary)"
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "shadow-sm shadow-black/20"
                  : "hover:bg-theme-surface-hover hover:text-theme-text-primary"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: BUSINESS FOUNDATIONS & 10-STAGE PROCESS FLOW          */}
      {/* ============================================================ */}
      {activeTab === "business" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Core Business Principle Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Building2 className="w-5 h-5" />
                <h3 className="text-sm font-bold">1. What is a Business?</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                An organized effort where people, processes, and technology come together to create <strong>products</strong> or provide <strong>services</strong> that satisfy customer needs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-sm font-bold">2. The Value Equation</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Profit = Revenue - Total Costs</strong>. Businesses generate revenue by selling goods to customers and incur costs purchasing raw materials, paying salaries, and running warehouses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
                <RotateCw className="w-5 h-5" />
                <h3 className="text-sm font-bold">3. Operations & Logistics</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Raw materials must be sourced from suppliers, stored in warehouses, assembled into products, and delivered to customers on time with zero defects.
              </p>
            </div>
          </div>

          {/* Interactive 10-Stage Business Operations Process Flow */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                INTERACTIVE PROCESS FLOW
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                How a Business Operates from Need to Cash (Click each stage)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any step below to see what happens, who is involved, documents created, and the direct impact if that step fails.
              </p>
            </div>

            {/* Step Selection Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {BUSINESS_FOUNDATION_STAGES.map(stage => {
                const isSelected = selectedStage.id === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage)}
                    style={{
                      borderColor: isSelected ? "var(--theme-primary)" : undefined,
                      backgroundColor: isSelected ? "var(--theme-primary-soft)" : undefined
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "shadow-sm border-2"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                      STEP 0{stage.stepNumber}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {stage.title.replace(/^\d+\.\s*/, "")}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-theme-primary">
                    STAGE 0{selectedStage.stepNumber} OF 10
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {selectedStage.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {selectedStage.shortDesc}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-mono font-bold rounded-lg border border-blue-200 dark:border-blue-800 shrink-0">
                  SAP Link: {selectedStage.sapModuleLink}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">
                      What Happens in this Stage?
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedStage.whatHappens}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">
                      Who is Involved?
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStage.whoIsInvolved.map((person, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-medium">
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">
                      Business Documents Created
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStage.documentsCreated.map((doc, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 rounded-md font-mono font-bold">
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Why This Step is Critical</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedStage.whyImportant}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1">
                    <div className="flex items-center space-x-1.5 text-rose-800 dark:text-rose-300 font-bold text-[11px] uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>What Happens If This Step Fails?</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedStage.failureImpact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Departments Matrix */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                How Business Departments Are Connected
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                In a real business, no department works in isolation. Every action in one area immediately impacts the others.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BUSINESS_FUNCTIONS.map(fn => (
                <div key={fn.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {fn.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {fn.sapEquivalent.split("&")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {fn.role}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="font-bold text-slate-500 dark:text-slate-400">Direct Connections: </span>
                    <span className="text-theme-primary font-medium">{fn.connectedTo.join(" • ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: WHAT IS ERP? (DISCONNECTED SILOS VS INTEGRATED CORE)  */}
      {/* ============================================================ */}
      {activeTab === "what_is_erp" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-mono font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>ERP = ENTERPRISE RESOURCE PLANNING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              The Digital Nervous System of Modern Enterprise
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
              ERP is software that integrates all core business processes—including procurement, manufacturing, warehousing, sales, finance, and human resources—into a single unified system with a shared database.
            </p>
          </div>

          {/* Visual Comparison: Without ERP vs With ERP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Without ERP */}
            <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border-2 border-dashed border-rose-300 dark:border-rose-800 space-y-4">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm uppercase tracking-wider">
                <AlertTriangle className="w-5 h-5" />
                <span>WITHOUT ERP (Disconnected Silos)</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                  <strong>Sales: </strong> Takes orders on paper and saves them in local Excel spreadsheets.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                  <strong>Warehouse: </strong> Has no idea how many sales orders were booked; inventory counts are outdated.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                  <strong>Purchasing: </strong> Over-orders raw materials because stock levels cannot be seen.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                  <strong>Finance: </strong> Spends 2 weeks at month-end manually reconciling conflicting spreadsheets.
                </div>
              </div>

              <div className="p-3 bg-rose-100 dark:bg-rose-900/40 rounded-xl text-rose-900 dark:text-rose-200 text-xs font-bold">
                Result: Data discrepancies, late shipments, lost inventory, angry customers, and massive overhead.
              </div>
            </div>

            {/* With ERP */}
            <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-400 dark:border-emerald-700 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5" />
                <span>WITH INTEGRATED ERP (Single Source of Truth)</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong>Sales Order: </strong> Booking an order automatically reserves stock in the warehouse.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong>Warehouse: </strong> Instantly receives a Picking Warehouse Task on RF terminals.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong>Purchasing: </strong> System automatically calculates reorder quantities via MRP.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  <strong>Finance: </strong> Every Goods Issue and Invoice automatically posts directly to the General Ledger in real-time.
                </div>
              </div>

              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs font-bold">
                Result: 100% data accuracy, instant order fulfillment, real-time financial close, and maximum customer satisfaction.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: WHAT IS SAP? & PRONUNCIATION (ESS-AY-PEE)              */}
      {/* ============================================================ */}
      {activeTab === "what_is_sap" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Interactive Pronunciation Master Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  PROFESSIONAL INDUSTRY NOMENCLATURE
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  How Do You Pronounce SAP?
                </h3>
              </div>

              {/* Audio Pronunciation Button */}
              <button
                onClick={handlePronounceSap}
                className="inline-flex items-center space-x-2.5 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                {isPlayingAudio ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
                <span>Hear Pronunciation: "S-A-P"</span>
              </button>
            </div>

            {/* Pronunciation Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-emerald-400/40 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>CORRECT PRONUNCIATION</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-white">
                  "S - A - P"
                </div>
                <div className="text-xs font-mono text-emerald-300">
                  Phonetic: [ ess - ay - pee ]
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  In enterprise consulting, corporate meetings, and professional SAP interviews, it is standard practice to pronounce each individual letter name.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-rose-400/40 space-y-2">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>CASUAL / AVOID IN CONSULTING</span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-400 line-through">
                  "Sap" (like tree sap)
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  While some casual observers pronounce it as a single English word, professional consultants, senior recruiters, and enterprise architects avoid this. Always use the letter names: <strong>S-A-P</strong>.
                </p>
              </div>
            </div>

            {/* Full Form Card */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                HISTORICAL FULL EXPANSION
              </span>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">
                Systems, Applications, and Products in Data Processing
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Originally founded in Germany in 1972 as <em>Systemanalyse Programmentwicklung</em> (System Analysis Program Development), later formalized in English as Systems, Applications, and Products in Data Processing.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: FOUNDERS & GLOBAL HEADQUARTERS                        */}
      {/* ============================================================ */}
      {activeTab === "founders" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              FOUNDING STORY (1972)
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Meet the Five IBM Engineers Who Built SAP
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In 1972, five former IBM software engineers in Mannheim, Germany left their jobs to fulfill a bold vision: creating standard business software that processes enterprise data in real time instead of punch cards.
            </p>
          </div>

          {/* 5 Founders Profile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAP_FOUNDERS.map((founder, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                      <Award className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{founder.years}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                    {founder.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-theme-primary">
                    {founder.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {founder.contribution}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Legacy Note: </span>
                  <span>{founder.funFact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Global Locations */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Where is SAP in the World?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SAP operates across 140+ countries. Here are the core global engineering and corporate headquarters:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SAP_GLOBAL_LOCATIONS.map((loc, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${loc.isHQ ? "bg-amber-50/50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{loc.city}</span>
                    <span className="text-xs font-mono">{loc.country}</span>
                  </div>
                  <div className="text-xs font-bold text-theme-primary">
                    {loc.role}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {loc.verifiedFact}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: SAP HISTORY & VERSIONS (R/2 ➔ S/4HANA)                */}
      {/* ============================================================ */}
      {activeTab === "history" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              50 YEARS OF ARCHITECTURAL EVOLUTION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              From Mainframe Punch-Cards to S/4HANA Cloud AI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Understand the milestone shifts in enterprise software architecture over the past five decades.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-4">
            {SAP_VERSIONS_TIMELINE.map((v, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1.5 md:max-w-xs shrink-0">
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 bg-theme-primary-soft text-theme-primary rounded">
                    {v.year}
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {v.version}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {v.architecture}
                  </p>
                </div>

                <div className="flex-1 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">Key Innovation: </span>
                    <span className="text-slate-600 dark:text-slate-300">{v.keyInnovation}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Why It Mattered: </span>
                    <span className="text-slate-600 dark:text-slate-300">{v.whyItMattered}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded-lg text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold">Next Stage Trigger: </span>
                    <span>{v.nextStepTrigger}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ECC vs S/4HANA Simplified Comparison Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              Why Did SAP Move from ECC to S/4HANA? (Simple Beginner Comparison)
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 rounded-l-xl">Architecture Dimension</th>
                    <th className="p-3">Traditional SAP ECC 6.0</th>
                    <th className="p-3 rounded-r-xl">Modern SAP S/4HANA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Database Engine</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Any Relational DB (Oracle, SQL Server, DB2) on mechanical hard drives</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">SAP HANA In-Memory Columnar Database (Runs 100% in RAM)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Data Model & Tables</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Dozens of redundant aggregate & index tables (BSIS, GLT0, MBEW)</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Single Universal Journal (ACDOCA) & Universal Material Document (MATDOC)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">User Interface</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Traditional desktop SAP GUI (Grey client software)</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Modern, web-based SAP Fiori responsive tile apps (Phone, Tablet, PC)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Processing Speed</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">Batch jobs run overnight for MRP and Financial close (Hours)</td>
                    <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Real-time instant live execution in seconds (Live MRP, Instant close)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: SAP MODULES ECOSYSTEM                                 */}
      {/* ============================================================ */}
      {activeTab === "modules" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              MODULES INTRODUCTION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              What Business Problem Does Each SAP Area Solve?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SAP is divided into specialized functional modules. Here is what each major area handles:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BEGINNER_MODULES_INTRO.map(m => (
              <div key={m.code} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-theme-primary text-white text-xs font-mono font-extrabold">
                      {m.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {m.name}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {m.businessArea}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200">Core Problem Solved: </strong>
                    {m.problemSolved}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Real World Example: </span>
                  <span>{m.realWorldExample}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 7: OTHER ERP PLATFORMS                                   */}
      {/* ============================================================ */}
      {activeTab === "competitors" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              THE BROADER ERP WORLD
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Is SAP the Only ERP? (The Competitive Landscape)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SAP is not the only ERP platform in the world. Different software suits different company sizes and industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ERP_LANDSCAPE_COMPARISONS.map(comp => (
              <div key={comp.name} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {comp.name}
                  </h4>
                </div>
                <div className="text-xs space-y-1.5">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Best Fit For: </span>
                    <span className="text-slate-600 dark:text-slate-400">{comp.bestFitFor}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Key Strength: </span>
                    <span className="text-slate-600 dark:text-slate-400">{comp.keyStrength}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-theme-primary">Why Choose SAP vs This? </span>
                    <span>{comp.sapComparisonPerspective}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 8: SIGNATURE PROBLEM ➔ REQUIREMENT ➔ SAP METHOD          */}
      {/* ============================================================ */}
      {activeTab === "scenarios" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              SIGNATURE LEARNING METHOD
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Problem ➔ Requirement ➔ Process ➔ Technology ➔ SAP
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This signature approach teaches complete beginners how enterprise business problems directly translate into SAP software implementations.
            </p>
          </div>

          <div className="space-y-6">
            {PROBLEM_SOLUTION_FLOWS.map((flow, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                    SCENARIO 0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {flow.industry}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400 block">
                      1. Business Problem
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      "{flow.problem}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400 block">
                      2. Core Requirement
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {flow.businessRequirement}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400 block">
                      3. Business Process
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      {flow.businessProcess}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-400 block">
                      4. Technology Role
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {flow.technologyRole}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                      5. SAP Solution
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-bold">
                      {flow.sapSolution}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-teal-700 dark:text-teal-400 block">
                      6. Business Outcome
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {flow.businessOutcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 9: BEGINNER KNOWLEDGE QUIZ                               */}
      {/* ============================================================ */}
      {activeTab === "quiz" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              BEGINNER LEVEL CHECKPOINT
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Beginner Knowledge Check (10 Interactive Questions)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test your understanding of business concepts, ERP fundamentals, SAP full form, pronunciation, and historical milestones.
            </p>
          </div>

          <div className="space-y-6">
            {BEGINNER_QUIZ_QUESTIONS.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      QUESTION 0{qIdx + 1} OF 10
                    </span>
                    {isAnswered && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isCorrect ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"}`}>
                        {isCorrect ? "✓ Correct Answer" : "✕ Incorrect"}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === q.correctIndex;

                      let btnStyle = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400";
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold";
                        } else if (isOptionSelected) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                        } else {
                          btnStyle = "opacity-50 border-slate-200 dark:border-slate-800";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Consultant Reasoning */}
                  {showQuizExplanations[q.id] && (
                    <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-2 animate-in fade-in duration-200">
                      <div className="font-bold text-blue-900 dark:text-blue-300">
                        Why this answer is correct:
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {q.explanation}
                      </p>

                      <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/60 text-[11px] text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-theme-primary">Consultant Perspective: </span>
                        <span>{q.consultantReasoning.summary}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 10: THINK LIKE A CONSULTANT                              */}
      {/* ============================================================ */}
      {activeTab === "consultant" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-mono font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CONSULTANT MINDSET</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How Does an SAP Consultant Think?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              A software programmer thinks about code. An SAP Consultant thinks about <strong>business value</strong>. Whenever a client asks for help, an elite consultant breaks the challenge down into 5 fundamental questions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs">
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">01. ROOT PROBLEM</span>
                <p className="text-slate-300">What is causing operational pain or financial loss?</p>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">02. REQUIREMENT</span>
                <p className="text-slate-300">What exact capability does the business need?</p>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">03. PROCESS</span>
                <p className="text-slate-300">What step-by-step workflow will solve it?</p>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">04. SAP MODULE</span>
                <p className="text-slate-300">Which SAP standard module & T-Code handles this?</p>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold block">05. ROI OUTCOME</span>
                <p className="text-slate-300">How much money or time will the client save?</p>
              </div>
            </div>
          </div>

          {/* Continue Learning CTA Button into MM / EWM */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <h4 className="text-lg font-extrabold">
                You Have Completed the Beginner Foundations!
              </h4>
              <p className="text-xs text-emerald-100">
                You now understand what a business is, how ERP works, and where SAP fits into enterprise operations. You are ready for SAP MM and SAP EWM!
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView("mm");
                setSelectedTopicId(null);
              }}
              className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all shrink-0 hover:scale-105"
            >
              <span>Begin SAP MM Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
