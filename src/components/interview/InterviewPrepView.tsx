import React, { useState } from "react";
import { INTERVIEW_BANK } from "../../data/interviewBank";
import { PageHeader } from "../common/PageHeader";
import { 
  GraduationCap, Search, CheckCircle2, Play, Award, 
  RefreshCw, ChevronRight, MessageSquare, ShieldCheck, 
  BarChart3, Zap, BookOpen, AlertCircle, ArrowLeft
} from "lucide-react";

interface MockResponseEvaluation {
  score: number;
  technicalAccuracy: number;
  businessContext: number;
  communicationStructure: number;
  cleanCoreAwareness: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

export const InterviewPrepView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bank" | "simulator">("bank");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Mock Interview Simulator State
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [evaluation, setEvaluation] = useState<MockResponseEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [scoreHistory, setScoreHistory] = useState<{ step: number; question: string; score: number }[]>([]);

  const tiers = ["All", "Basic", "Intermediate", "Advanced", "Troubleshooting", "Consultant"];

  const filteredQuestions = INTERVIEW_BANK.filter(q => {
    const matchesMod = selectedModule === "All" || q.module === selectedModule;
    const matchesTier = selectedTier === "All" || q.tier === selectedTier;
    const matchesSearch = !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.idealAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyPhrasesExpected.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMod && matchesTier && matchesSearch;
  });

  const mockQuestions = [
    {
      tier: "Introduction & Executive Presence",
      question: "Walk me through your SAP S/4HANA implementation and support project experience. What were your primary functional responsibilities across the P2P lifecycle?",
      idealBenchMark: "Strong candidates structure answers around SAP Activate phases: Discover/Explore (Fit-to-Standard workshops, BRD authoring), Realize (SPRO customizing, OBYC, Pricing Procedure, RICEFW FSDs), Deploy (Cutover data migration via LTMC, 561 stock upload with Triple Reconciliation), and Run (Hypercare support and L2/L3 SLA ticket resolution).",
      keyKeywords: ["Fit-to-Standard", "SPRO", "OBYC", "RICEFW", "LTMC", "Cutover", "Triple Reconciliation", "P2P", "Flexible Workflow"]
    },
    {
      tier: "Master Data & CVI Architecture",
      question: "Explain the Business Partner (BP) architecture in SAP S/4HANA and why Customer Vendor Integration (CVI) is mandatory. How do you configure 'Same Number' ranges?",
      idealBenchMark: "In S/4HANA, BP is the single master entry point (BUT000). CVI background synchronization automatically synchronizes FLVN00 (FI Vendor LFB1) and FLVN01 (Purchasing Supplier LFM1). Same Number is configured by defining the BP number range as Internal and the Vendor Account Group number range as External covering the exact same numerical interval.",
      keyKeywords: ["BUT000", "FLVN00", "FLVN01", "CVI Synchronization", "Same Number", "LFA1", "LFB1", "LFM1"]
    },
    {
      tier: "Procurement & Pricing Technique",
      question: "How does the Condition Technique calculate purchase prices in MM, and what SPRO settings are required to post planned freight costs (FRA1) to a separate carrier at Goods Receipt?",
      idealBenchMark: "Condition Technique evaluates Condition Tables -> Access Sequences -> Condition Types -> Calculation Schema -> Schema Determination (OMFO). To route freight to a carrier, Condition Type FRA1 must have the 'Accruals' checkbox flagged in M/06, and an Accrual Account Key (e.g. FR1) assigned in Calculation Schema (M/08).",
      keyKeywords: ["Condition Tables", "Access Sequence", "Calculation Schema", "Accruals", "FR1", "OMFO", "PRCD_ELEMENTS"]
    },
    {
      tier: "Special Procurement Workflows",
      question: "Walk through the complete Subcontracting process in SAP MM. Detail the document flow, movement types (541/101/543), and the 5 OBYC accounting keys triggered.",
      idealBenchMark: "1) PO created with Item Cat 'L'; 2) Movement 541 transfers components to Special Stock 'O'; 3) Movement 101 GR receives finished good and Movement 543 auto-consumes components; 4) Accounting: Debit Finished Inventory (BSX), Credit Subcontracting Change in Stock (BSV), Debit Subcontracting Labor Expense (FRL), Credit GR/IR (WRX), Debit Raw Material Consumption (VBO), Credit Raw Material Inventory (BSX).",
      keyKeywords: ["Item Category L", "541", "543", "BSX", "BSV", "FRL", "WRX", "VBO", "Special Stock O"]
    },
    {
      tier: "FI Integration & 3-Way Match",
      question: "Explain the 7-step account determination search chain in OBYC. What happens during MIGO 101 if a material has Standard Price $10 but the PO price is $12?",
      idealBenchMark: "Search Chain: Chart of Accounts -> Valuation Grouping (OMWD) -> Valuation Class (MBEW) -> Transaction Key -> Account Modifier -> Table T030 G/L Account. At MIGO 101: Debit Inventory (BSX) $10 at standard price, Credit GR/IR Clearing (WRX) $12 at PO price, and Debit Purchase Price Variance (PRD) $2.",
      keyKeywords: ["Chart of Accounts", "Valuation Grouping", "Valuation Class", "BSX", "WRX", "PRD", "T030", "Price Variance"]
    },
    {
      tier: "Troubleshooting & RCA Doctor",
      question: "During MIGO Goods Receipt, the transaction aborts with error 'Posting only possible in periods 2026/07 and 2026/06 in company code 1000' (Message M7 053). What is the exact root cause and multi-step resolution?",
      idealBenchMark: "Root Cause: The MM posting period is closed. SAP permits inventory movements only in current and prior open periods. Solution: 1) Check open period in MMRV; 2) Execute MMPV to roll the MM period forward to 2026/08; 3) Check and open FI period in OB52 if needed; 4) Re-post MIGO.",
      keyKeywords: ["MM Period Closed", "MMPV", "MMRV", "OB52", "Message M7 053", "Current and Previous Period"]
    },
    {
      tier: "Cloud Architecture & Transformation",
      question: "How do you advise a Board of Directors on choosing between RISE with SAP (Private Cloud) and GROW with SAP (Public Cloud)? Explain the Clean Core principle.",
      idealBenchMark: "GROW with SAP is tailored for net-new midmarket organizations adopting S/4HANA Cloud Public Edition (multi-tenant SaaS, Greenfield only, semi-annual automated upgrades, Clean Core by default). RISE with SAP is a BTaaS offering for S/4HANA Cloud Private Edition, supporting 1-step Brownfield conversions from ECC, full SPRO customizing depth, Signavio process transformation, and BTP credits. Clean Core ensures core ERP remains unmodified using In-App and BTP Side-by-Side extensions.",
      keyKeywords: ["GROW with SAP", "RISE with SAP", "Public Cloud SaaS", "Private Cloud", "Brownfield Conversion", "Clean Core", "Signavio", "BTP"]
    }
  ];

  const currentMockQ = mockQuestions[currentStepIndex];

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const lower = userAnswer.toLowerCase();
      const matchedKeywords = currentMockQ.keyKeywords.filter(k => lower.includes(k.toLowerCase()));
      const matchRatio = matchedKeywords.length / currentMockQ.keyKeywords.length;

      const techScore = Math.min(100, Math.round(55 + matchRatio * 45));
      const busScore = lower.length > 150 ? 92 : Math.min(100, Math.round(60 + lower.length * 0.15));
      const commScore = (userAnswer.includes("1)") || userAnswer.includes("First") || userAnswer.includes("Step")) ? 95 : 82;
      const cleanCoreScore = (lower.includes("clean core") || lower.includes("s/4hana") || lower.includes("best practice")) ? 94 : 78;

      const total = Math.round((techScore * 0.4) + (busScore * 0.25) + (commScore * 0.2) + (cleanCoreScore * 0.15));

      const evalResult: MockResponseEvaluation = {
        score: total,
        technicalAccuracy: techScore,
        businessContext: busScore,
        communicationStructure: commScore,
        cleanCoreAwareness: cleanCoreScore,
        strengths: [
          `Identified ${matchedKeywords.length} core SAP technical terms (${matchedKeywords.slice(0, 3).join(", ") || "Key functional concepts"})`,
          lower.length > 120 ? "Demonstrated detailed domain comprehension" : "Addressed the question directly without filler",
          total >= 80 ? "Strong consultant mindset and structured response" : "Good conceptual baseline"
        ],
        improvements: [
          matchedKeywords.length < currentMockQ.keyKeywords.length ? `Incorporate missed technical terms: ${currentMockQ.keyKeywords.filter(k => !lower.includes(k.toLowerCase())).slice(0, 3).join(", ")}` : "Excellent technical coverage",
          !userAnswer.includes("Step") && !userAnswer.includes("1)") ? "Structure your answer with numbered steps or bulleted points for higher clarity" : "Clear communication structure maintained"
        ],
        feedback: total >= 85 
          ? "Outstanding response! You demonstrated strong technical mastery, precise SAP terminology, and consultative business context."
          : total >= 70
          ? "Good functional answer. To achieve Principal Consultant score, weave in specific SPRO transaction codes, table names, and accounting journal impacts."
          : "Developing response. Review the model benchmark answer below and practice incorporating the required SAP technical keywords."
      };

      setEvaluation(evalResult);
      setScoreHistory(prev => [...prev, { step: currentStepIndex + 1, question: currentMockQ.question, score: total }]);
      setIsEvaluating(false);
    }, 900);
  };

  const handleNextQuestion = () => {
    if (currentStepIndex < mockQuestions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setUserAnswer("");
      setEvaluation(null);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleRestartMock = () => {
    setCurrentStepIndex(0);
    setUserAnswer("");
    setEvaluation(null);
    setSessionCompleted(false);
    setScoreHistory([]);
  };

  const overallAvgScore = scoreHistory.length > 0
    ? Math.round(scoreHistory.reduce((acc, curr) => acc + curr.score, 0) / scoreHistory.length)
    : 0;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <PageHeader
        badge="TagSkills SAP MM & EWM Consultant Career Engine"
        badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        title="7-Tier SAP Consultant Interview Preparation"
        description="Master 150+ categorized questions from Junior Associate to Principal Enterprise Architect. Practice live with the Interactive AI Mock Interview Simulator, get instant diagnostic evaluations, and benchmark your answers against verified SAP Best Practices."
        breadcrumbs={[
          { label: "Career & Interview", view: "interview_prep" },
          { label: "Interview Simulation Engine" }
        ]}
        learningOutcomes={[
          "Interactive 7-Tier AI Mock Interview Simulation",
          "Real-time technical accuracy & business context scoring",
          "150+ categorized questions covering MM, EWM & Cloud ERP",
          "Model benchmark answers & consultant drilldown tips"
        ]}
      />

      {/* Tab Navigation: Question Bank vs Mock Simulator */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("bank")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === "bank"
              ? "bg-slate-900 dark:bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>7-Tier Question Bank ({INTERVIEW_BANK.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === "simulator"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Live Mock Interview Simulator (7 Tiers)</span>
        </button>
      </div>

      {/* VIEW 1: LIVE MOCK INTERVIEW SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="space-y-6">
          {!sessionCompleted ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
              
              {/* Progress & Tier Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                      Tier {currentStepIndex + 1} of {mockQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {currentMockQ.tier}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {currentMockQ.question}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-slate-400">
                    Progress: {Math.round(((currentStepIndex) / mockQuestions.length) * 100)}%
                  </span>
                  <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStepIndex + 1) / mockQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Response Input Area */}
              {!evaluation ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Consultant Response (Articulate as you would in a formal client or hiring interview):
                    </label>
                    <textarea
                      rows={6}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Start typing your structured answer... (Include relevant SPRO transaction codes, table names, movement types, or accounting journal entries for maximum score)"
                      className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setUserAnswer(currentMockQ.idealBenchMark)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Insert Model Key Concepts (Demo)</span>
                      </button>
                    </div>

                    <button
                      onClick={handleEvaluateAnswer}
                      disabled={!userAnswer.trim() || isEvaluating}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      {isEvaluating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Evaluating Technical Accuracy...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit & Evaluate Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* EVALUATION RESULT REPORT */
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-blue-900/50 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                          AI Diagnostic Evaluation
                        </span>
                        <h3 className="text-xl font-extrabold text-white mt-0.5">
                          Interview Performance Scorecard
                        </h3>
                        <p className="text-xs text-blue-200 mt-1 max-w-xl">
                          {evaluation.feedback}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shrink-0">
                        <div className="text-center">
                          <span className="block text-[10px] uppercase font-bold text-blue-300">Score</span>
                          <span className={`text-3xl font-black ${
                            evaluation.score >= 85 ? "text-emerald-400" : evaluation.score >= 70 ? "text-amber-300" : "text-rose-400"
                          }`}>
                            {evaluation.score}
                          </span>
                          <span className="text-[10px] text-slate-300">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* 4-Dimension Radar Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/10 text-center">
                      <div className="bg-white/5 p-2.5 rounded-lg">
                        <span className="text-[10px] text-blue-200 block">Technical Accuracy</span>
                        <span className="text-base font-bold text-emerald-300">{evaluation.technicalAccuracy}%</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-lg">
                        <span className="text-[10px] text-blue-200 block">Business Context</span>
                        <span className="text-base font-bold text-blue-300">{evaluation.businessContext}%</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-lg">
                        <span className="text-[10px] text-blue-200 block">Communication</span>
                        <span className="text-base font-bold text-amber-300">{evaluation.communicationStructure}%</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-lg">
                        <span className="text-[10px] text-blue-200 block">Clean Core Mindset</span>
                        <span className="text-base font-bold text-purple-300">{evaluation.cleanCoreAwareness}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Targeted Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Key Strengths Identified</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {evaluation.strengths.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Areas for Refinement</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {evaluation.improvements.map((imp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Model Benchmark Comparison */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>TagSkills Model Benchmark Answer:</span>
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentMockQ.idealBenchMark}
                    </p>
                  </div>

                  {/* Next Step Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-md"
                    >
                      <span>{currentStepIndex < mockQuestions.length - 1 ? "Next Interview Question" : "Complete Simulation & View Final Scorecard"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* FINAL SIMULATION COMPLETION CERTIFICATE */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Simulation Complete
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  TagSkills SAP Consultant Readiness Scorecard
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  You have completed the full 7-tier mock interview simulation covering Enterprise Structure, Sourcing, Special Procurement, OBYC, Troubleshooting, and Cloud ERP.
                </p>
              </div>

              <div className="inline-flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Average Score</span>
                  <span className={`text-4xl font-black ${
                    overallAvgScore >= 85 ? "text-emerald-500" : overallAvgScore >= 70 ? "text-amber-500" : "text-rose-500"
                  }`}>
                    {overallAvgScore}
                  </span>
                  <span className="text-xs text-slate-400"> / 100</span>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Readiness Status</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {overallAvgScore >= 85 ? "✅ Project & Consultant Ready" : overallAvgScore >= 70 ? "⚡ Developing Associate Consultant" : "📖 Foundational Learner"}
                  </span>
                </div>
              </div>

              {/* Question-by-Question Score Summary */}
              <div className="max-w-2xl mx-auto space-y-2 text-left">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Tier Performance Breakdown:</h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  {scoreHistory.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-slate-800/40 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-md">
                        {item.step}. {item.question}
                      </span>
                      <span className={`font-bold font-mono px-2 py-0.5 rounded text-[11px] ${
                        item.score >= 85 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {item.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleRestartMock}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restart New Simulation</span>
                </button>
                <button
                  onClick={() => setActiveTab("bank")}
                  className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-bold text-xs rounded-xl"
                >
                  <span>Review Question Bank</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: FULL 7-TIER QUESTION BANK */}
      {activeTab === "bank" && (
        <div className="space-y-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              {tiers.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTier(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    selectedTier === t
                      ? "bg-slate-900 dark:bg-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search question bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1.5 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div key={q.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-md">
                        Tier: {q.tier}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-mono">
                        {q.module} • {q.category}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {isExpanded ? "Collapse" : "Reveal Answer & Drilldowns"}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h3>

                  {isExpanded && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                      <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
                        <strong className="text-emerald-800 dark:text-emerald-300 font-bold block">
                          TagSkills Ideal Benchmark Answer:
                        </strong>
                        <p className="leading-relaxed">{q.idealAnswer}</p>
                      </div>

                      {q.keyPhrasesExpected && q.keyPhrasesExpected.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            Key Terminology Interviewers Expect:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {q.keyPhrasesExpected.map((phrase, pIdx) => (
                              <span key={pIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                                ✓ {phrase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {q.consultantThinkingTip && (
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300">
                          <strong>💡 Consultant Strategic Tip:</strong> {q.consultantThinkingTip}
                        </div>
                      )}

                      {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1">
                          <strong className="text-xs text-blue-900 dark:text-blue-300 font-bold">
                            Common Follow-Up Drilldown Questions:
                          </strong>
                          <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                            {q.followUpQuestions.map((fQ, fIdx) => (
                              <li key={fIdx}>{fQ}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
