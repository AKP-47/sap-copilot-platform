import React, { useState } from "react";
import { ERROR_DOCTOR_DATA } from "../../data/errorDoctorBank";
import { PageHeader } from "../common/PageHeader";
import { Stethoscope, Search, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const ErrorDoctorLab: React.FC = () => {
  const [selectedErrorId, setSelectedErrorId] = useState<string>(ERROR_DOCTOR_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredErrors = ERROR_DOCTOR_DATA.filter(err =>
    err.errorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    err.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    err.messageText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentError = ERROR_DOCTOR_DATA.find(e => e.id === selectedErrorId) || ERROR_DOCTOR_DATA[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <PageHeader
        badge="Find & Fix the Problem"
        badgeColor="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800"
        title="SAP Error & Dump Doctor"
        description="Clear diagnostic explanations and step-by-step solutions for common SAP MM and EWM error messages. Follow the clues, understand why it happened, and learn how to resolve it with confidence."
        breadcrumbs={[
          { label: "Practice & Labs", view: "error_doctor" },
          { label: "Find the Problem" }
        ]}
        learningOutcomes={[
          "Understand the root cause behind common SAP error messages",
          "Follow step-by-step diagnostic and fix procedures",
          "Check relevant SPRO backend customizing settings",
          "Build confident troubleshooting skills for client projects"
        ]}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error code (e.g. M7021, M7053)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredErrors.map((err) => {
              const isSelected = selectedErrorId === err.id;
              return (
                <button
                  key={err.id}
                  onClick={() => setSelectedErrorId(err.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all space-y-1 ${
                    isSelected
                      ? "bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 shadow-sm"
                      : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400">{err.errorCode}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">{err.module}</span>
                  </div>
                  <div className="text-xs font-semibold truncate">{err.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 rounded">
              Error Code: {currentError.errorCode}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              {currentError.title}
            </h2>
            <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl mt-3 border border-slate-800">
              Message: {currentError.messageText}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Why did this happen? (Root Cause)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentError.rootCauseAnalysis}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              How to fix it (Step-by-Step)
            </h4>
            <div className="space-y-2">
              {currentError.stepByStepFix.map((step, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {currentError.sproPathToVerify && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl space-y-1 font-mono text-xs">
              <span className="text-blue-900 dark:text-blue-300 font-bold">SPRO Settings to Check:</span>
              <p className="text-blue-950 dark:text-blue-200">{currentError.sproPathToVerify}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
