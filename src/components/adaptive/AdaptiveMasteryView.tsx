import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { PageHeader } from "../common/PageHeader";
import { 
  ADAPTIVE_TOPICS, 
  AdaptiveTopic, 
  LearningTier, 
  LevelCurriculumData 
} from "../../data/adaptiveCurriculum";
import { 
  Building2, 
  Factory, 
  Cpu, 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  Sliders, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Clock
} from "lucide-react";

export const AdaptiveMasteryView: React.FC = () => {
  const { learningLevel, setLearningLevel, setCurrentView } = useSap();

  // Normalize learningLevel to valid LearningTier: "BEGINNER" | "INTERMEDIATE" | "PROFESSIONAL"
  const getNormalizedTier = (): LearningTier => {
    if (learningLevel === "BEGINNER") return "BEGINNER";
    if (learningLevel === "INTERMEDIATE") return "INTERMEDIATE";
    return "PROFESSIONAL";
  };

  const [activeTier, setActiveTier] = useState<LearningTier>(getNormalizedTier());
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);

  const activeTopic: AdaptiveTopic = ADAPTIVE_TOPICS[selectedTopicIndex] || ADAPTIVE_TOPICS[0];
  const levelData: LevelCurriculumData = activeTopic.levels[activeTier];

  // 12-Stage Navigation State
  const [activeStage, setActiveStage] = useState<number>(1);

  // Decision State
  const [selectedDecisionOptId, setSelectedDecisionOptId] = useState<string | null>(null);
  const [isDecisionAnswered, setIsDecisionAnswered] = useState<boolean>(false);

  // Quiz State
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState<Record<number, number>>({});
  const [expandedWhyAnswers, setExpandedWhyAnswers] = useState<Record<number, boolean>>({});

  const handleSelectLevel = (tier: LearningTier) => {
    setActiveTier(tier);
    setLearningLevel(tier);
    // Reset transient interaction state for fresh exploration
    setSelectedDecisionOptId(null);
    setIsDecisionAnswered(false);
    setQuizSelectedAnswers({});
    setExpandedWhyAnswers({});
  };

  const handleSelectDecision = (optId: string) => {
    setSelectedDecisionOptId(optId);
    setIsDecisionAnswered(true);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    setQuizSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleWhy = (qIdx: number) => {
    setExpandedWhyAnswers(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  const stages = [
    { num: 1, label: "1. Concept", icon: <Cpu className="w-3.5 h-3.5" /> },
    { num: 2, label: "2. Business Context", icon: <Building2 className="w-3.5 h-3.5" /> },
    { num: 3, label: "3. Industry Scenario", icon: <Factory className="w-3.5 h-3.5" /> },
    { num: 4, label: "4. SAP Process", icon: <Layers className="w-3.5 h-3.5" /> },
    { num: 5, label: "5. Decision", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { num: 6, label: "6. Reasoning", icon: <Brain className="w-3.5 h-3.5" /> },
    { num: 7, label: "7. Solution", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { num: 8, label: "8. Consequence", icon: <Sliders className="w-3.5 h-3.5" /> },
    { num: 9, label: "9. Mastery Quiz", icon: <Target className="w-3.5 h-3.5" /> },
    { num: 10, label: "10. Next Challenge", icon: <Award className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header */}
      <PageHeader
        badge="LEVEL-ADAPTIVE LEARNING ARCHITECTURE"
        badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        title="Unified Level-Adaptive Learning Engine"
        description="One unified 10-stage learning framework with depth and scenarios that dynamically adapt to your exact level: Fresher (What is it?) ➔ Intermediate (Why does it work this way?) ➔ Professional (Consultant architecture & diagnosis)."
        breadcrumbs={[
          { label: "Adaptive Learning" },
          { label: "Level Mastery Engine" }
        ]}
        learningOutcomes={[
          "Identical structural framework across all levels for cohesive mastery",
          "Dynamic difficulty scaling: Definitions ➔ Stock Flows ➔ S/4HANA EWM Architecture",
          "Expandable 'Why?' analysis for every decision and quiz question",
          "Real-time level switching to inspect how concepts evolve in complexity"
        ]}
      />

      {/* Global Level Switcher Controls */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              SELECT LEARNING TIER (DYNAMIC CONTENT ADAPTATION)
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Currently Viewing: {levelData.levelTitle}
            </h3>
          </div>

          {/* Level Switcher Buttons */}
          <div className="inline-flex rounded-2xl bg-slate-800 p-1 border border-slate-700 shrink-0">
            <button
              onClick={() => handleSelectLevel("BEGINNER")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                activeTier === "BEGINNER"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>1. Fresher</span>
            </button>

            <button
              onClick={() => handleSelectLevel("INTERMEDIATE")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                activeTier === "INTERMEDIATE"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>2. Intermediate</span>
            </button>

            <button
              onClick={() => handleSelectLevel("PROFESSIONAL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                activeTier === "PROFESSIONAL"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>3. Professional</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-amber-300">Target Learning Goal: </strong>
          {levelData.targetGoal}
        </p>
      </div>

      {/* 10-Stage Pipeline Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {stages.map((st) => {
          const isCurrent = activeStage === st.num;
          return (
            <button
              key={st.num}
              onClick={() => setActiveStage(st.num)}
              style={{
                backgroundColor: isCurrent ? "var(--theme-primary)" : "transparent",
                color: isCurrent ? "#ffffff" : "var(--theme-text-secondary)"
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isCurrent
                  ? "shadow-sm shadow-black/20"
                  : "hover:bg-theme-surface-hover hover:text-theme-text-primary"
              }`}
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 1. CONCEPT & SUMMARY                                         */}
      {/* ============================================================ */}
      {activeStage === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              STAGE 01 — ADAPTIVE CONCEPT BREAKDOWN
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
              {activeTopic.conceptName}
            </h3>
            <p className="text-xs text-theme-primary font-bold mt-0.5">
              Domain: {activeTopic.category} • Depth: {levelData.levelTitle}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white block">
              Core Architectural Summary
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {levelData.conceptSummary}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setActiveStage(2)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Explore Business Context (Stage 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. BUSINESS CONTEXT                                          */}
      {/* ============================================================ */}
      {activeStage === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              STAGE 02 — BUSINESS SITUATION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Why Does the Business Need This?
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {levelData.businessContext}
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Concept
            </button>
            <button
              onClick={() => setActiveStage(3)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>View Industry Scenario (Stage 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. REAL-WORLD INDUSTRY SCENARIO                              */}
      {/* ============================================================ */}
      {activeStage === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              STAGE 03 — REAL-WORLD SCENARIO
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {levelData.industryScenario.industry}
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              CLIENT CASE SITUATION
            </span>
            <p className="text-sm text-slate-200 leading-relaxed">
              "{levelData.industryScenario.scenarioText}"
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(2)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Context
            </button>
            <button
              onClick={() => setActiveStage(4)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Inspect SAP Process (Stage 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. SAP PROCESS MAPPING                                       */}
      {/* ============================================================ */}
      {activeStage === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              STAGE 04 — SAP PROCESS ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {levelData.sapProcess.headline}
            </h3>
          </div>

          <div className="space-y-3">
            {levelData.sapProcess.steps.map((st, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-start space-x-3 text-xs">
                <span className="px-2 py-1 rounded-lg bg-theme-primary text-white font-mono font-bold shrink-0">
                  {sIdx + 1}
                </span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {st.step}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(3)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Scenario
            </button>
            <button
              onClick={() => setActiveStage(5)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Take Decision Dilemma (Stage 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. DECISION DILEMMA                                          */}
      {/* ============================================================ */}
      {activeStage === 5 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              STAGE 05 — DECISION POINT ({activeTier})
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              What Decision Would You Make?
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              DECISION QUESTION
            </span>
            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              "{levelData.decisionQuestion.prompt}"
            </p>
          </div>

          <div className="space-y-2.5">
            {levelData.decisionQuestion.options.map((opt) => {
              const isSelected = selectedDecisionOptId === opt.id;
              let btnStyle = "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400";
              if (isDecisionAnswered) {
                if (opt.isCorrect) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                } else {
                  btnStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isDecisionAnswered}
                  onClick={() => handleSelectDecision(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt.text}</span>
                  {isDecisionAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {isDecisionAnswered && (
            <div className="pt-2 flex justify-end animate-in fade-in duration-200">
              <button
                onClick={() => setActiveStage(6)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>Read Consultant Reasoning (Stage 6)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. CONSULTANT REASONING                                      */}
      {/* ============================================================ */}
      {activeStage === 6 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              STAGE 06 — CONSULTANT REASONING
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Why this Solution Fits the Business Requirement
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase block">
              Consultant Reasoning Breakdown
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {levelData.consultantReasoning}
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(5)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Decision
            </button>
            <button
              onClick={() => setActiveStage(7)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>View Formal Solution (Stage 7)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. SOLUTION & EXECUTION                                      */}
      {/* ============================================================ */}
      {activeStage === 7 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              STAGE 07 — SAP ARCHITECTURAL SOLUTION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Resulting Implementation
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase block">
              Executed Solution
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
              {levelData.solution}
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(6)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Reasoning
            </button>
            <button
              onClick={() => setActiveStage(8)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Inspect Consequences (Stage 8)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. CONSEQUENCES (BUSINESS & SAP)                             */}
      {/* ============================================================ */}
      {activeStage === 8 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
              STAGE 08 — BUSINESS & SYSTEM CONSEQUENCES
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              What Happens After the Decision?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
              <span className="font-bold text-blue-900 dark:text-blue-300 uppercase text-xs block">
                🏢 Business Consequence
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {levelData.consequences.business}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 uppercase text-xs block">
                ⚙️ SAP System Consequence
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {levelData.consequences.sap}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(7)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Solution
            </button>
            <button
              onClick={() => setActiveStage(9)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Take Level Quiz (Stage 9)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. MASTERY QUIZ WITH EXPANDABLE "WHY?" ANALYSIS              */}
      {/* ============================================================ */}
      {activeStage === 9 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
              STAGE 09 — MASTERY QUIZ & EXPANDABLE "WHY?" LAB
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Test Your {levelData.levelTitle} Comprehension
            </h3>
          </div>

          <div className="space-y-6">
            {levelData.quiz.map((q, qIdx) => {
              const selectedOpt = quizSelectedAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;
              const isExpanded = expandedWhyAnswers[qIdx] || false;

              return (
                <div key={qIdx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      QUESTION 0{qIdx + 1}
                    </span>
                    {isAnswered && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isCorrect ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                      }`}>
                        {isCorrect ? "✓ Correct" : "✕ Incorrect"}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((optText, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-750 text-slate-800 dark:text-slate-200 hover:border-blue-400";
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                        } else {
                          btnStyle = "opacity-40 border-slate-200 dark:border-slate-800";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{optText}</span>
                          {isAnswered && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Expandable "Why?" Button & Breakdown */}
                  {isAnswered && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <button
                        onClick={() => toggleWhy(qIdx)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Brain className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isExpanded ? "Hide 'Why?' Reasoning" : "Expand Full 'Why?' Reasoning & Distractor Analysis"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3 animate-in fade-in duration-150">
                          <div>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px] uppercase">
                              ✓ Why the Correct Option Fits:
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                              {q.whyAnalysis.correct}
                            </p>
                          </div>

                          <div>
                            <span className="font-bold text-rose-600 dark:text-rose-400 block text-[11px] uppercase">
                              ✕ Why Other Options Are Less Appropriate:
                            </span>
                            <div className="space-y-1 mt-0.5 text-slate-600 dark:text-slate-400">
                              {q.whyAnalysis.wrongOptions.map((w, wIdx) => (
                                <div key={wIdx}>• {w}</div>
                              ))}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900">
                            <strong>Consultant Tip: </strong>
                            {q.whyAnalysis.consultantTip}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setActiveStage(8)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Consequences
            </button>
            <button
              onClick={() => setActiveStage(10)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-theme-primary text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>View Next Level Challenge (Stage 10)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 10. NEXT CHALLENGE & ADAPTIVE EVALUATION                     */}
      {/* ============================================================ */}
      {activeStage === 10 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
              STAGE 10 — ADAPTIVE PROGRESSION ADVISOR
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Your Personalized Next Challenge
            </h3>
          </div>

          {/* Adaptive Skill Radar Mini Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Business Understanding</span>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">88%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400">SAP MM Process</span>
              <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">84%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400">EWM Execution</span>
              <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">76%</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Scenario Reasoning</span>
              <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">80%</div>
            </div>
          </div>

          {/* Next Level Recommendation Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>RECOMMENDED NEXT CHALLENGE</span>
              </div>
              <h4 className="text-lg font-extrabold">
                {levelData.nextChallenge}
              </h4>
            </div>

            {activeTier !== "PROFESSIONAL" ? (
              <button
                onClick={() => {
                  const nextTier: LearningTier = activeTier === "BEGINNER" ? "INTERMEDIATE" : "PROFESSIONAL";
                  handleSelectLevel(nextTier);
                  setActiveStage(1);
                }}
                className="inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-105"
              >
                <span>Level Up to {activeTier === "BEGINNER" ? "Intermediate" : "Professional"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentView("investigation")}
                className="inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-105"
              >
                <span>Launch Consultant Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="pt-2 flex justify-start">
            <button
              onClick={() => setActiveStage(9)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              ← Back to Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
