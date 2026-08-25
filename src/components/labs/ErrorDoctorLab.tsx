import React, { useState } from "react";
import { ERROR_DOCTOR_DATA } from "../../data/errorDoctorBank";
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
      <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-rose-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
              Diagnostic & RCA Workbench
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP Error & ABAP Dump Doctor
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Instant Root Cause Analysis (RCA) and step-by-step resolution workflows for top SAP MM, EWM, and qRFC error codes (e.g. M7021, M7053, /SCWM/UI_TODET002, SMQ2 queue hangs).
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error code (e.g. M7021)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                      ? "bg-rose-50 border-rose-300 text-rose-950 shadow-sm"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-700">{err.errorCode}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">{err.module}</span>
                  </div>
                  <div className="text-xs font-semibold truncate">{err.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-rose-100 text-rose-800 rounded">
              Error: {currentError.errorCode}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {currentError.title}
            </h2>
            <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl mt-3 border border-slate-800">
              Message: {currentError.messageText}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Root Cause Analysis (RCA)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentError.rootCauseAnalysis}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Step-by-Step Resolution Workflow
            </h4>
            <div className="space-y-2">
              {currentError.stepByStepFix.map((step, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {currentError.sproPathToVerify && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1 font-mono text-xs">
              <span className="text-blue-900 font-bold">SPRO Customizing Verification:</span>
              <p className="text-blue-950">{currentError.sproPathToVerify}</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
