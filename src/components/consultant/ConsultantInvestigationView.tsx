import React, { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { INVESTIGATION_CASES, InvestigationCase, InvestigationTrack } from "../../data/consultantInvestigations";
import { 
  Briefcase, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  Layers, 
  Warehouse, 
  TrendingDown, 
  Award, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const ConsultantInvestigationView: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const currentCase: InvestigationCase = INVESTIGATION_CASES[activeCaseIndex];
  
  const [unlockedTracks, setUnlockedTracks] = useState<string[]>([]);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleUnlockTrack = (trackId: string) => {
    if (!unlockedTracks.includes(trackId)) {
      setUnlockedTracks(prev => [...prev, trackId]);
    }
  };

  const handleSubmitDiagnosis = (diagId: string) => {
    setSelectedDiagnosisId(diagId);
    setIsSubmitted(true);
  };

  const selectedDiag = currentCase.diagnoses.find(d => d.id === selectedDiagnosisId);
  const isAllEvidenceExamined = unlockedTracks.length === currentCase.tracks.length;

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="EVIDENCE-BASED CLIENT CASE WORKBENCH"
        badgeColor="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800"
        title="Consultant Investigation Mode"
        description="Real clients don't tell you the solution—they present symptoms and pain points. As an SAP Consultant, investigate evidence across Purchase Orders, MRP, Warehouses, and Quality Lots, diagnose the root cause, and propose standard architectural solutions."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Consultant Investigation Mode" }
        ]}
        learningOutcomes={[
          "Gather clues systematically across PO, Stock, QM, and EWM tracks",
          "Identify root cause vs superficial symptom",
          "Synthesize immediate tactical fixes with long-term preventive architecture"
        ]}
      />

      {/* Case Brief Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            CLIENT ENGAGEMENT: {currentCase.client} ({currentCase.industry})
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Evidence Clues Examined: {unlockedTracks.length} / {currentCase.tracks.length}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {currentCase.problemTitle}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {currentCase.executiveBrief}
        </p>
      </div>

      {/* Investigation Avenues (Evidence Gathering) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
              <span>Investigation Avenues (Click to Inspect Evidence)</span>
              <Search className="w-4 h-4 ml-1.5 text-theme-primary" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Examine each system track to uncover where the breakdown occurred.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCase.tracks.map((track: InvestigationTrack) => {
            const isUnlocked = unlockedTracks.includes(track.id);
            return (
              <div
                key={track.id}
                onClick={() => handleUnlockTrack(track.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isUnlocked
                    ? "bg-white dark:bg-slate-900 border-theme-primary shadow-sm ring-1 ring-theme-primary/20"
                    : "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      SYSTEM TRACK
                    </span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                        <span>Examined</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        Click to Inspect
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {track.name}
                  </h4>

                  {isUnlocked ? (
                    <div className="mt-3 space-y-2 text-xs">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {track.finding}
                      </p>
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 text-[11px]">
                        <strong>Clue: </strong> {track.clue}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2 italic">
                      Click to query SAP transactions & audit logs...
                    </p>
                  )}
                </div>

                {isUnlocked && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400 truncate">
                    Artifact: {track.sapArtifact}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnosis Submission */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            ROOT CAUSE DIAGNOSIS
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
            What is the Root Cause of the Assembly Line Stoppage?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select the most accurate consultant diagnosis based on the gathered evidence:
          </p>
        </div>

        <div className="space-y-2">
          {currentCase.diagnoses.map((diag) => {
            const isSelected = selectedDiagnosisId === diag.id;
            let btnStyle = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400";
            if (isSubmitted) {
              if (diag.isCorrect) {
                btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold";
              } else if (isSelected) {
                btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
              } else {
                btnStyle = "opacity-50 border-slate-200 dark:border-slate-800";
              }
            }

            return (
              <button
                key={diag.id}
                disabled={isSubmitted}
                onClick={() => handleSubmitDiagnosis(diag.id)}
                className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{diag.title}</span>
                {isSubmitted && diag.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Diagnosis Evaluation & Solution */}
        {isSubmitted && selectedDiag && (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              selectedDiag.isCorrect
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200"
            }`}>
              <div className="font-bold">
                {selectedDiag.isCorrect ? "✓ Consultant Diagnosis Validated:" : "✕ Diagnosis Feedback:"}
              </div>
              <p className="leading-relaxed">{selectedDiag.feedback}</p>
            </div>

            {/* Official Consultant Recommended Solution */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>OFFICIAL CONSULTANT ARCHITECTURAL RECOMMENDATION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
                  <span className="font-bold text-emerald-400 block uppercase text-[10px]">
                    1. Immediate Tactical Fix (Today)
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentCase.consultantSolution.immediateFix}
                  </p>
                </div>

                <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
                  <span className="font-bold text-blue-400 block uppercase text-[10px]">
                    2. Long-Term Preventive Architecture
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {currentCase.consultantSolution.preventiveArchitecture}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
