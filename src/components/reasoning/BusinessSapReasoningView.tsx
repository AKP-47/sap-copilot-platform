import React, { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { 
  BUSINESS_SAP_SCENARIOS, 
  BusinessSapScenario, 
  BusinessProcessStep, 
  DecisionOption 
} from "../../data/businessSapReasoning";
import { 
  Building2, 
  Factory, 
  RotateCw, 
  Cpu, 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  FileText, 
  User, 
  Info, 
  Layers, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  Compass, 
  ExternalLink 
} from "lucide-react";

export const BusinessSapReasoningView: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const scenario: BusinessSapScenario = BUSINESS_SAP_SCENARIOS[selectedScenarioIndex];

  // Industry variant state
  const availableIndustries = scenario.supportedIndustries;
  const [selectedIndustry, setSelectedIndustry] = useState<string>(availableIndustries[0]);

  // If current scenario doesn't support the selected industry, fallback to its first supported one
  const activeIndustryKey = availableIndustries.includes(selectedIndustry) ? selectedIndustry : availableIndustries[0];
  const variant = scenario.industryVariants[activeIndustryKey] || Object.values(scenario.industryVariants)[0];

  // 8-Stage Progression State (1 to 8)
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [highestUnlockedStage, setHighestUnlockedStage] = useState<number>(1);

  // Clicked business process step in Stage 3
  const [activeProcessStep, setActiveProcessStep] = useState<BusinessProcessStep>(variant.businessProcessSteps[0]);

  // Decision state for Stage 5
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isDecisionSubmitted, setIsDecisionSubmitted] = useState<boolean>(false);

  // Reset progress when switching scenarios
  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    const newScen = BUSINESS_SAP_SCENARIOS[index];
    const newInd = newScen.supportedIndustries[0];
    setSelectedIndustry(newInd);
    const newVariant = newScen.industryVariants[newInd] || Object.values(newScen.industryVariants)[0];
    setActiveProcessStep(newVariant.businessProcessSteps[0]);
    setCurrentStage(1);
    setHighestUnlockedStage(1);
    setSelectedOptionId(null);
    setIsDecisionSubmitted(false);
  };

  const handleSelectIndustry = (indKey: string) => {
    setSelectedIndustry(indKey);
    const newVariant = scenario.industryVariants[indKey] || Object.values(scenario.industryVariants)[0];
    setActiveProcessStep(newVariant.businessProcessSteps[0]);
  };

  const handleAdvanceStage = (nextStage: number) => {
    setCurrentStage(nextStage);
    if (nextStage > highestUnlockedStage) {
      setHighestUnlockedStage(nextStage);
    }
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setIsDecisionSubmitted(true);
    // Auto unlock Stage 6 (Reasoning)
    if (highestUnlockedStage < 6) {
      setHighestUnlockedStage(6);
    }
  };

  const stages = [
    { num: 1, title: "1. Business Problem", icon: <Building2 className="w-4 h-4" /> },
    { num: 2, title: "2. Industry Context", icon: <Factory className="w-4 h-4" /> },
    { num: 3, title: "3. Business Process", icon: <RotateCw className="w-4 h-4" /> },
    { num: 4, title: "4. SAP Concept", icon: <Cpu className="w-4 h-4" /> },
    { num: 5, title: "5. Decision Dilemma", icon: <HelpCircle className="w-4 h-4" /> },
    { num: 6, title: "6. Consultant Reasoning", icon: <Brain className="w-4 h-4" /> },
    { num: 7, title: "7. SAP Solution", icon: <CheckCircle2 className="w-4 h-4" /> },
    { num: 8, title: "8. Consequences & What If", icon: <Sliders className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Standardized Page Header */}
      <PageHeader
        badge="SIGNATURE PEDAGOGY FRAMEWORK"
        badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="Business ➔ SAP Reasoning Framework"
        description="Don't memorize transactions in a vacuum. Master how real-world business challenges and industry drivers translate into business processes, decision reasoning, SAP configurations, and enterprise consequences."
        breadcrumbs={[
          { label: "Think Like an SAP Consultant" },
          { label: "Business ➔ SAP Reasoning" }
        ]}
        learningOutcomes={[
          "Understand the business problem first—without premature SAP jargon",
          "See how industry context reshapes operational constraints",
          "Map clickable business process steps into SAP MM/EWM core objects",
          "Reason through consultant decision dilemmas with deep root-cause critique",
          "Analyze business vs SAP consequences and dynamic 'What If?' variations"
        ]}
      />

      {/* Scenario Picker Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {BUSINESS_SAP_SCENARIOS.map((scen, idx) => {
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={scen.id}
              onClick={() => handleSelectScenario(idx)}
              style={{
                backgroundColor: isSelected ? "var(--theme-primary)" : undefined,
                color: isSelected ? "#ffffff" : undefined
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 flex items-center space-x-2 ${
                isSelected
                  ? "shadow-sm shadow-black/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-mono">
                {scen.module}
              </span>
              <span>{scen.title}</span>
            </button>
          );
        })}
      </div>

      {/* 8-Stage Interactive Journey Progression Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-theme-primary flex items-center">
            <Compass className="w-3.5 h-3.5 mr-1" />
            <span>PROGRESSION PIPELINE (STAGE {currentStage} OF 8)</span>
          </span>

          <button
            onClick={() => {
              setHighestUnlockedStage(8);
              setCurrentStage(8);
            }}
            className="text-[11px] font-bold text-slate-500 hover:text-theme-primary transition-colors underline"
          >
            Show Full Solution Flow
          </button>
        </div>

        {/* Stage Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {stages.map((st) => {
            const isCurrent = currentStage === st.num;
            const isUnlocked = st.num <= highestUnlockedStage;
            const isCompleted = st.num < highestUnlockedStage || (st.num === 5 && isDecisionSubmitted);

            return (
              <button
                key={st.num}
                disabled={!isUnlocked}
                onClick={() => setCurrentStage(st.num)}
                style={{
                  borderColor: isCurrent ? "var(--theme-primary)" : undefined,
                  backgroundColor: isCurrent ? "var(--theme-primary-soft)" : undefined
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all relative ${
                  isCurrent
                    ? "border-2 shadow-xs"
                    : isUnlocked
                    ? "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    : "opacity-40 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 dark:text-slate-400">
                    {st.icon}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate">
                  {st.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* STAGE 1: BUSINESS PROBLEM (ZERO SAP JARGON)                  */}
      {/* ============================================================ */}
      {currentStage === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
              STAGE 01 — THE REAL-WORLD PAIN POINT
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
              {variant.businessProblem.headline}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Start by understanding the operational crisis before introducing any software system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold uppercase text-[11px]">
                <AlertTriangle className="w-4 h-4" />
                <span>What is Happening?</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {variant.businessProblem.whatIsHappening}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">
                <HelpCircle className="w-4 h-4" />
                <span>Why is it a Serious Problem?</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {variant.businessProblem.whyIsItAProblem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold uppercase text-[11px]">
                <User className="w-4 h-4" />
                <span>Who is Affected?</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {variant.businessProblem.whoIsAffected}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
              <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-400 font-bold uppercase text-[11px]">
                <DollarSign className="w-4 h-4" />
                <span>Direct Business & Financial Impact</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm font-semibold">
                {variant.businessProblem.businessImpact}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={() => handleAdvanceStage(2)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Explore Industry Context (Stage 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 2: INDUSTRY CONTEXT & DYNAMIC INDUSTRY SWITCHER        */}
      {/* ============================================================ */}
      {currentStage === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                STAGE 02 — INDUSTRY NUANCES & DYNAMIC SWITCHER
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {variant.industryName}
              </h3>
            </div>

            {/* Live Industry Switcher Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {availableIndustries.map((indKey) => {
                const isSelected = activeIndustryKey === indKey;
                return (
                  <button
                    key={indKey}
                    onClick={() => handleSelectIndustry(indKey)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all capitalize shrink-0 ${
                      isSelected
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {indKey.replace("_", " ")}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 block">
              Why this problem matters specifically in {variant.industryName}:
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {variant.whyItMatters}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              Consultant Insight:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Notice how switching industries modifies the physical items (brake calipers vs vaccine batches vs organic milk), yet the underlying architectural challenge remains identical. This is why elite consultants focus on <strong>process patterns</strong>.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Problem
            </button>
            <button
              onClick={() => handleAdvanceStage(3)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Inspect Business Process (Stage 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 3: INTERACTIVE BUSINESS PROCESS PIPELINE               */}
      {/* ============================================================ */}
      {currentStage === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              STAGE 03 — END-TO-END BUSINESS PROCESS (CLICK EACH STEP)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              How the Business Currently Handles this Flow
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any step below to inspect what happens, who performs it, documents created, and failure points.
            </p>
          </div>

          {/* Interactive Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {variant.businessProcessSteps.map((step) => {
              const isSelected = activeProcessStep.stepNumber === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveProcessStep(step)}
                  style={{
                    borderColor: isSelected ? "var(--theme-primary)" : undefined,
                    backgroundColor: isSelected ? "var(--theme-primary-soft)" : undefined
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-2 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    STEP 0{step.stepNumber}
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5 truncate">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Process Step Deep Dive Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-theme-primary">
                  PROCESS DETAIL — STEP 0{activeProcessStep.stepNumber}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {activeProcessStep.title}
                </h4>
              </div>
              <span className="px-2.5 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                👤 {activeProcessStep.whoPerforms}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">
                    What Happens?
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeProcessStep.whatHappens}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">
                    Information Required
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                    {activeProcessStep.infoRequired}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                  <span className="font-bold text-amber-900 dark:text-amber-300 uppercase text-[10px] block">
                    Document Created
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-bold mt-0.5">
                    📄 {activeProcessStep.documentCreated}
                  </p>
                </div>

                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
                  <span className="font-bold text-rose-900 dark:text-rose-300 uppercase text-[10px] block">
                    What Can Go Wrong?
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5">
                    ⚠️ {activeProcessStep.whatCanGoWrong}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(2)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Industry
            </button>
            <button
              onClick={() => handleAdvanceStage(4)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Connect to SAP Concepts (Stage 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 4: SAP CONCEPT MAPPING                                 */}
      {/* ============================================================ */}
      {currentStage === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              STAGE 04 — ENTERPRISE SOFTWARE MAPPING
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              How SAP Implements this Business Workflow
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Now that you understand the physical business workflow, here are the exact SAP MM/EWM objects that represent it.
            </p>
          </div>

          {/* Module & Objects Grid */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                PRIMARY SAP DOMAIN
              </span>
              <h4 className="text-base font-extrabold">
                {variant.sapConcept.module}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {variant.sapConcept.coreObjects.map((obj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-theme-primary block text-sm">
                    {obj.name}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {obj.role}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 uppercase text-[10px] block">
                End-to-End SAP Execution Chain
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                {variant.sapConcept.processMapping}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(3)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Business Process
            </button>
            <button
              onClick={() => handleAdvanceStage(5)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Take Decision Dilemma (Stage 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 5: DECISION DILEMMA                                    */}
      {/* ============================================================ */}
      {currentStage === 5 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              STAGE 05 — CONSULTANT DECISION POINT
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Make Your Recommendation as an SAP Consultant
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Evaluate the business constraints and choose the appropriate SAP solution.
            </p>
          </div>

          {/* Decision Question Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>CONSULTANT CHALLENGE</span>
            </div>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              "{scenario.decisionPrompt.question}"
            </p>
          </div>

          {/* 4 Options */}
          <div className="space-y-2.5">
            {scenario.decisionPrompt.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400";

              if (isDecisionSubmitted) {
                if (opt.isCorrect) {
                  btnClass = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                } else {
                  btnClass = "opacity-40 border-slate-200 dark:border-slate-800";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isDecisionSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt.text}</span>
                  {isDecisionSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Critique after selection */}
          {isDecisionSubmitted && selectedOptionId && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {(() => {
                const chosen = scenario.decisionPrompt.options.find(o => o.id === selectedOptionId);
                if (!chosen) return null;
                return (
                  <div className={`p-5 rounded-2xl border text-xs space-y-1.5 ${
                    chosen.isCorrect
                      ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
                      : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100"
                  }`}>
                    <div className="font-bold text-sm">
                      {chosen.isCorrect ? "✓ Consultant Decision Validated:" : "✕ Critique of this Choice:"}
                    </div>
                    <p className="leading-relaxed">{chosen.critique}</p>
                  </div>
                );
              })()}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleAdvanceStage(6)}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
                >
                  <span>Review Consultant Reasoning (Stage 6)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 6: CONSULTANT REASONING (WHY IT MATTERS)               */}
      {/* ============================================================ */}
      {currentStage === 6 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              STAGE 06 — CONSULTANT REASONING ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Why is this Solution the Most Appropriate?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In enterprise consulting, we never say "because SAP says so." Here is the rigorous business and system logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block">
                1. Key Clue in Business Scenario
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                "{scenario.consultantReasoning.keyClue}"
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] block">
                2. Underlying Business Driver
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {scenario.consultantReasoning.businessDriver}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] block">
                3. Technical SAP Logic
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {scenario.consultantReasoning.sapReasoning}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 space-y-2">
              <span className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] block">
                4. SPRO & Master Data Dependencies
              </span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-mono text-[11px]">
                {scenario.consultantReasoning.configDependencies}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(5)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Decision
            </button>
            <button
              onClick={() => handleAdvanceStage(7)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>View SAP Solution Flow (Stage 7)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 7: SAP SOLUTION & VISUAL DOCUMENT FLOW                 */}
      {/* ============================================================ */}
      {currentStage === 7 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              STAGE 07 — FORMAL SAP SOLUTION ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              The Resulting SAP Solution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Step-by-step document lifecycle across purchasing, inventory, and accounting.
            </p>
          </div>

          {/* Solution Summary */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 block">
              Execution Summary
            </span>
            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
              {scenario.solution.sapSummary}
            </p>
          </div>

          {/* Visual Document Pipeline */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              VISUAL ENTERPRISE DOCUMENT FLOW
            </span>
            <p className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
              {scenario.solution.visualFlow}
            </p>
          </div>

          {/* Configuration Nuance Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              Consultant Configuration Nuance:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {scenario.solution.configNuances}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(6)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Reasoning
            </button>
            <button
              onClick={() => handleAdvanceStage(8)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Explore Consequences & What If (Stage 8)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STAGE 8: CONSEQUENCES & WHAT IF? VARIATIONS                  */}
      {/* ============================================================ */}
      {currentStage === 8 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
              STAGE 08 — BUSINESS VS SAP CONSEQUENCES & WHAT IF?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              What Happens Next & How Scenarios Mutate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluate the dual impact on physical operations and software ledgers.
            </p>
          </div>

          {/* Business vs SAP Consequences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
              <span className="font-bold text-blue-900 dark:text-blue-300 uppercase text-xs block">
                🏢 Business Consequences
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {scenario.consequences.business.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 uppercase text-xs block">
                ⚙️ SAP System & Ledger Consequences
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {scenario.consequences.sap.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dynamic "What If?" Variations */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Dynamic "What If...?" Scenarios
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenario.whatIfs.map((wi, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">
                    ❓ {wi.question}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Solution Shift: </strong> {wi.outcome}
                  </p>
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 text-[11px]">
                    <strong>Consultant Trade-Off: </strong> {wi.consultantTradeOff}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStage(7)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Solution
            </button>

            <button
              onClick={() => {
                const nextIdx = (selectedScenarioIndex + 1) % BUSINESS_SAP_SCENARIOS.length;
                handleSelectScenario(nextIdx);
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Practice Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
