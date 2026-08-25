import React, { useState } from "react";
import { CONSULTANT_CASES } from "../../data/consultantCases";
import { Briefcase, CheckCircle2, ArrowRight, RefreshCw, Award, Table } from "lucide-react";

export const ConsultantSimulator: React.FC = () => {
  const currentCase = CONSULTANT_CASES[0];
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(100);

  const toggleQuestion = (id: string, isCritical: boolean) => {
    setSelectedQuestions(prev => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-yellow-600 text-white rounded-xl shadow-sm">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-800">
              5-Stage Client Engagement Simulator
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP Senior Consultant Case Simulator
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Step into the shoes of a Lead SAP Architect. Diagnose client crises, conduct master data audits, configure SPRO parameters, design unit test scripts, and deliver executive pitches.
        </p>
      </div>

      {/* Case Overview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-amber-100 text-amber-900 rounded">
            Client: {currentCase.clientName}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            {currentCase.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            {currentCase.clientContext}
          </p>
        </div>

        {/* 5-Stage Stepper */}
        <div className="flex items-center justify-between border-y border-slate-100 py-3 overflow-x-auto">
          {[
            "1. Discovery Questions",
            "2. Master Data Audit",
            "3. SPRO Diagnosis",
            "4. Testing & Cutover",
            "5. Executive Pitch"
          ].map((stg, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx + 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                activeStep === idx + 1
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {stg}
            </button>
          ))}
        </div>

        {/* Step 1: Discovery */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 1: Client Discovery & Diagnostic Interview
            </h3>
            <p className="text-xs text-slate-500">{currentCase.stage1Discovery.instructions}</p>

            <div className="space-y-2.5">
              {currentCase.stage1Discovery.questionOptions.map((q) => {
                const isSelected = selectedQuestions.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleQuestion(q.id, q.isCritical)}
                    className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-start space-x-3 ${
                      isSelected
                        ? "bg-amber-50 border-amber-300 text-amber-950 font-bold"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <input type="checkbox" checked={isSelected} readOnly className="mt-0.5 rounded text-amber-600" />
                    <div>
                      <div>{q.question}</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Why: {q.whyImportant}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Proceed to Master Data Audit →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Master Data Audit */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 2: Database Audit (/SCWM/LAGP, /SCWM/MAT1, /SCWM/LAGPS)
            </h3>
            <div className="space-y-3">
              {currentCase.stage2MasterDataAudit.dataObjectsToCheck.map((obj, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{obj.object} ({obj.tcode})</span>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 border border-slate-200 rounded">Table: {obj.table}</span>
                  </div>
                  <div className="text-rose-700 font-medium">🚨 Discrepancy Found: {obj.issueFound}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Proceed to SPRO Diagnosis →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: SPRO Diagnosis */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 3: SPRO Customizing Architecture & Fixes
            </h3>
            <div className="space-y-3">
              {currentCase.stage3SproDiagnosis.configOptions.map((cfg) => (
                <div key={cfg.id} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                  <div className="font-mono text-slate-600">{cfg.path}</div>
                  <div className="font-bold text-slate-900">Setting: {cfg.settingName}</div>
                  <div className="text-emerald-800 font-medium">✓ Solution: {cfg.proposedFix}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Proceed to Test Plan →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Testing */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 4: UAT Test Scripts & Cutover Checklist
            </h3>
            <div className="space-y-2">
              {currentCase.stage4TestingAndCutover.testScenarios.map((tst, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tst}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                Proceed to Executive Pitch →
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Pitch */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 5: Executive Client Presentation & ROI Delivery
            </h3>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl space-y-3 text-xs leading-relaxed">
              <div className="text-amber-400 font-bold uppercase text-[10px]">Executive Summary</div>
              <p>{currentCase.stage5ExecutivePitch.executiveSummary}</p>
              <div className="text-emerald-400 font-bold uppercase text-[10px] pt-1">ROI & Value Justification</div>
              <p>{currentCase.stage5ExecutivePitch.roiJustification}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
