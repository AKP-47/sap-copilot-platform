import { PageHeader } from "../common/PageHeader";
import React, { useState } from "react";
import { MOVEMENT_TYPES } from "../../data/movementTypes";
import { RotateCw, Search, ArrowRight, CheckCircle2, DollarSign, Layers, Factory, AlertTriangle } from "lucide-react";
import { MovementTypeEntry, IndustryKey } from "../../types/sap";

export const MovementTypeLab: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string>("101");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIndustryIdx, setSelectedIndustryIdx] = useState<number>(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const filteredMovements = MOVEMENT_TYPES.filter(m =>
    m.code.includes(searchQuery) ||
    m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.businessPurpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMvt = MOVEMENT_TYPES.find(m => m.code === selectedCode) || MOVEMENT_TYPES[0];
  const activeIndustryScenario = currentMvt.industryScenarios[selectedIndustryIdx] || currentMvt.industryScenarios[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Standardized Page Header */}
      <PageHeader
        badge="Interactive Accounting & Process Lab"
        badgeColor="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
        title="SAP MM Movement Type Lab (40+ Types)"
        description="Search 40+ Movement Types, visualize physical material flows, inspect real-time Debit/Credit ledger postings (BSX, WRX, GBB), and solve multi-industry challenges across Automotive, Food, Aerospace, and Pharma."
        breadcrumbs={[
          { label: "Practice & Labs", view: "movement_lab" },
          { label: "Movement Type Lab" }
        ]}
        learningOutcomes={[
          "Goods Receipts (101, 103, 105, 501, 561)",
          "Goods Issues (201 Cost Center, 261 Prod Order, 551 Scrap)",
          "Stock Transfers (301 Plant-to-Plant, 311 SLoc-to-SLoc, 321 QA)",
          "Real-time Debit / Credit T-Account Postings"
        ]}
      />

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Movement Type Selector */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code (e.g. 101, 122, 261)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {filteredMovements.map((m) => {
              const isSelected = selectedCode === m.code;
              return (
                <button
                  key={m.code}
                  onClick={() => {
                    setSelectedCode(m.code);
                    setSelectedIndustryIdx(0);
                    setSelectedQuizOpt(null);
                    setShowExplanation(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                    isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    {m.code}
                  </span>
                  <div className="truncate flex-1">
                    <div className="text-xs font-bold truncate">{m.description}</div>
                    <div className="text-[11px] text-slate-500 truncate">{m.businessPurpose}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Workbench */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                  Movement Type: {currentMvt.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {currentMvt.description}
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                Process: {currentMvt.relatedProcess}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900">Business Purpose:</span>
                <p className="text-slate-600">{currentMvt.businessPurpose}</p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900">When to use:</span>
                <p className="text-slate-600">{currentMvt.whenUsed}</p>
              </div>
            </div>

            {/* Visual Process Sequence Flow */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Visual Process Sequence
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {currentMvt.visualFlow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium font-mono shadow-sm">
                      {step}
                    </span>
                    {idx < currentMvt.visualFlow.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Stock Impact & Financial Accounting Ledger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Stock Impact */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Physical Inventory Impact
                </h4>
                <div className="text-xs space-y-1">
                  <div><strong>Source:</strong> {currentMvt.stockImpact.sourceStockType || "External / Supplier"}</div>
                  <div><strong>Target:</strong> {currentMvt.stockImpact.targetStockType}</div>
                  <div className="text-blue-700 font-bold">{currentMvt.stockImpact.quantityEffect}</div>
                </div>
              </div>

              {/* Accounting Impact */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center">
                  <DollarSign className="w-3.5 h-3.5 mr-1" />
                  Financial Accounting Impact (OBYC)
                </h4>
                {currentMvt.accountingImpact.isFinancialPosting ? (
                  <div className="text-xs space-y-1">
                    <div className="text-emerald-800 font-bold">🟢 Debit: {currentMvt.accountingImpact.debitAccount}</div>
                    <div className="text-rose-800 font-bold">🔴 Credit: {currentMvt.accountingImpact.creditAccount}</div>
                    <p className="text-[11px] text-slate-500 pt-1">{currentMvt.accountingImpact.valueImpact}</p>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic">
                    No Financial Accounting (FI) document generated (Valuation Area unchanged).
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Multi-Industry Scenario Challenge Solver */}
          {activeIndustryScenario && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Factory className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Industry Scenario Challenge: {activeIndustryScenario.industry.toUpperCase()}
                  </h3>
                </div>
                <div className="flex space-x-1">
                  {currentMvt.industryScenarios.map((sc, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedIndustryIdx(i);
                        setSelectedQuizOpt(null);
                        setShowExplanation(false);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded ${
                        selectedIndustryIdx === i
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {sc.industry}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                {activeIndustryScenario.scenarioText}
              </p>

              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {activeIndustryScenario.challengeQuestion}
              </h4>

              <div className="space-y-2">
                {activeIndustryScenario.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizOpt === oIdx;
                  const isCorrect = oIdx === activeIndustryScenario.correctIndex;
                  let style = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
                  if (showExplanation) {
                    if (isCorrect) style = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                    else if (isSelected) style = "bg-rose-50 border-rose-300 text-rose-900";
                  } else if (isSelected) {
                    style = "bg-blue-50 border-blue-400 text-blue-900 font-bold";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setSelectedQuizOpt(oIdx);
                        setShowExplanation(true);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start space-x-2.5 ${style}`}
                    >
                      <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950 space-y-1">
                  <strong>Consultant Reasoning:</strong>
                  <p>{activeIndustryScenario.consultantReasoning}</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
