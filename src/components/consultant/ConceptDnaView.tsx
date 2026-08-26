import React, { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CONCEPT_DNA_BANK, ConceptDna, WHAT_IF_SCENARIOS, WhatIfScenario } from "../../data/consultantReasoning";
import { 
  Dna, 
  Layers, 
  GitFork, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Briefcase, 
  RotateCw, 
  Sparkles, 
  Table, 
  Terminal,
  ArrowRight
} from "lucide-react";

export const ConceptDnaView: React.FC = () => {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState<number>(0);
  const currentConcept: ConceptDna = CONCEPT_DNA_BANK[selectedConceptIndex];
  
  const [activeWhatIfId, setActiveWhatIfId] = useState<string>(WHAT_IF_SCENARIOS[0].id);
  const currentWhatIf: WhatIfScenario = WHAT_IF_SCENARIOS.find(w => w.id === activeWhatIfId) || WHAT_IF_SCENARIOS[0];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="360° ARCHITECTURAL BREAKDOWN"
        badgeColor="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
        title="SAP Concept DNA & Dynamic 'What If?' Engine"
        description="Don't just memorize transactions—understand their architectural DNA. Inspect business purpose, triggers, document flows, accounting ledgers, and dynamic mutations ('What Would Change If...?')."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Concept DNA" }
        ]}
        learningOutcomes={[
          "360-degree breakdown of Movement Type 101, POSC, and Inbound Delivery",
          "Dynamic 'What If?' parameter mutator for Quality, Batches, and Overdelivery",
          "Deep dive into stock impacts, accounting ledgers, and common mistakes"
        ]}
      />

      {/* Concept Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {CONCEPT_DNA_BANK.map((concept, idx) => (
          <button
            key={concept.id}
            onClick={() => setSelectedConceptIndex(idx)}
            style={{
              backgroundColor: selectedConceptIndex === idx ? "var(--theme-primary)" : undefined,
              color: selectedConceptIndex === idx ? "#ffffff" : undefined
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedConceptIndex === idx
                ? "shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            {concept.name}
          </button>
        ))}
      </div>

      {/* Concept 360° DNA Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-theme-primary">
              MODULE: {currentConcept.module}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {currentConcept.name}
            </h3>
          </div>
          <span className="text-xs px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800 font-medium shrink-0">
            {currentConcept.interviewRelevance}
          </span>
        </div>

        {/* 6-Pillar DNA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">
              1. Business Purpose
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentConcept.businessPurpose}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">
              2. Operational Trigger
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentConcept.businessTrigger}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] block">
              3. Document Lifecycle Flow
            </span>
            <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
              {currentConcept.documentFlow}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-300 uppercase text-[10px] block">
              4. Stock Balance Impact
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentConcept.stockImpact}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 uppercase text-[10px] block">
              5. Financial Ledger (FI) Impact
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
              {currentConcept.accountingImpact}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-1">
            <span className="font-bold text-purple-900 dark:text-purple-300 uppercase text-[10px] block">
              6. Cross-Module Integration
            </span>
            <div className="space-y-0.5 text-slate-700 dark:text-slate-300">
              {currentConcept.integrationPoints.map((pt, idx) => (
                <div key={idx}>• {pt}</div>
              ))}
            </div>
          </div>

        </div>

        {/* Common Mistakes & Consultant Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
            <div className="flex items-center space-x-1.5 text-rose-800 dark:text-rose-400 font-bold uppercase text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Common Implementation Pitfalls</span>
            </div>
            <div className="space-y-1 text-slate-700 dark:text-slate-300">
              {currentConcept.commonMistakes.map((m, idx) => (
                <div key={idx}>✕ {m}</div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold uppercase text-[10px]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Consultant Configuration Advisory</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentConcept.consultantConsiderations}
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2: "What Would Change If...?" Engine */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            DYNAMIC SCENARIO MUTATION ENGINE
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            What Would Change If...?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            See how process flows and SAP configurations dynamically change when business constraints mutate.
          </p>
        </div>

        {/* Mutation Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {WHAT_IF_SCENARIOS.map(w => (
            <button
              key={w.id}
              onClick={() => setActiveWhatIfId(w.id)}
              style={{
                backgroundColor: activeWhatIfId === w.id ? "var(--theme-primary)" : undefined,
                color: activeWhatIfId === w.id ? "#ffffff" : undefined
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeWhatIfId === w.id
                  ? "shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {w.title}
            </button>
          ))}
        </div>

        {/* Mutation Breakdown Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Standard Baseline Scenario
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">
                {currentWhatIf.baseScenario}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-500 dark:text-slate-400 block text-[10px]">
                Baseline System Behavior:
              </span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                {currentWhatIf.baseState}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-900 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-theme-primary block">
                Dynamic Mutation Applied
              </span>
              <p className="text-slate-900 dark:text-white font-bold mt-0.5">
                "{currentWhatIf.mutation}"
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900">
              <span className="font-bold text-theme-primary block text-[10px]">
                SAP Configuration & Process Shift:
              </span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                {currentWhatIf.changedProcess}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                Outcome: {currentWhatIf.sapOutcome}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-1">
          <span className="text-amber-400 font-bold uppercase text-[10px]">
            Consultant Architectural Trade-Off
          </span>
          <p className="text-slate-300 leading-relaxed">
            {currentWhatIf.consultantTradeOff}
          </p>
        </div>
      </div>
    </div>
  );
};
