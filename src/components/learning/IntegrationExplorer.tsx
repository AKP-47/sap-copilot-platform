import React, { useState } from "react";
import { INTEGRATION_FLOWS } from "../../data/integrationFlows";
import { GitMerge, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw, Table } from "lucide-react";

export const IntegrationExplorer: React.FC = () => {
  const [selectedFlowId, setSelectedFlowId] = useState<string>(INTEGRATION_FLOWS[0].id);

  const currentFlow = INTEGRATION_FLOWS.find(f => f.id === selectedFlowId) || INTEGRATION_FLOWS[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-sm">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
              End-to-End Cross-Module Architecture
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP MM + EWM Integration Hub
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Understand exactly what happens in MM vs EWM, where integration occurs, documents generated, team handoffs, and qRFC SMQ1/SMQ2 queue troubleshooting.
        </p>
      </div>

      {/* Select Flow Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {INTEGRATION_FLOWS.map((flow) => (
          <button
            key={flow.id}
            onClick={() => setSelectedFlowId(flow.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedFlowId === flow.id
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {flow.processType}
          </button>
        ))}
      </div>

      {/* Main Flow Canvas */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
            {currentFlow.processType}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {currentFlow.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentFlow.businessContext}
          </p>
          <div className="mt-3 p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-medium">
            <strong>Integration Point:</strong> {currentFlow.integrationPoint}
          </div>
        </div>

        {/* Step by step document sequence */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            End-to-End Document Flow & System Handoffs
          </h3>
          <div className="space-y-2.5">
            {currentFlow.documentFlow.map((doc) => (
              <div key={doc.sequence} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {doc.sequence}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-900">{doc.stage}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                        doc.system === "MM" ? "bg-amber-100 text-amber-800" :
                        doc.system === "EWM" ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {doc.system}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{doc.teamAction}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 text-[11px] font-mono">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700">
                    {doc.tcode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Split Screen: MM Team vs EWM Team Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center">
              <span>What the Procurement / MM Team Does</span>
            </h4>
            <ul className="space-y-1.5">
              {currentFlow.mmPerspective.responsibilities.map((r, i) => (
                <li key={i} className="text-xs text-amber-950 flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center">
              <span>What the EWM Warehouse Team Does</span>
            </h4>
            <ul className="space-y-1.5">
              {currentFlow.ewmPerspective.responsibilities.map((r, i) => (
                <li key={i} className="text-xs text-blue-950 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Queue & Error Troubleshooting */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
          <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center">
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
            Common Integration Errors & Troubleshooting
          </h4>
          {currentFlow.commonErrorsAndTroubleshooting.map((err, i) => (
            <div key={i} className="bg-white p-3 rounded-lg border border-rose-100 text-xs space-y-1">
              <strong className="text-rose-800">Issue: {err.problem}</strong>
              <p className="text-slate-600"><strong>Root Cause:</strong> {err.rootCause}</p>
              <p className="text-emerald-700"><strong>Fix:</strong> {err.fixAction}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
