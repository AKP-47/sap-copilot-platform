import React, { useState } from "react";
import { INDUSTRIES } from "../../data/industries";
import { Factory, ArrowRight, CheckCircle2 } from "lucide-react";
import { IndustryKey } from "../../types/sap";

export const IndustryLabView: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>("automotive");

  const currentInd = INDUSTRIES[selectedIndustry];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 rounded-2xl p-6 border border-sky-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-sky-600 text-white rounded-xl shadow-sm">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
              Real-World Industry Workbenches
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              11 Industry SAP Architecture Labs
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Learn how SAP MM & EWM adapt across Automotive (JIT/JIS), Aerospace (Traceability), Pharma (GMP/FEFO), Food (Catch Weight), Retail (Cross-docking), and 3PL warehousing.
        </p>
      </div>

      {/* Industry Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {Object.keys(INDUSTRIES).map((k) => {
          const ind = INDUSTRIES[k as IndustryKey];
          const isSelected = selectedIndustry === k;
          return (
            <button
              key={k}
              onClick={() => setSelectedIndustry(k as IndustryKey)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              <div className="text-xs font-bold truncate">{ind.name}</div>
            </button>
          );
        })}
      </div>

      {/* Industry Detail */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
            Selected Industry
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {currentInd.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 italic">
            "{currentInd.tagline}"
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 space-y-1">
          <strong className="text-slate-900">Sample End-to-End Industry Process Flow:</strong>
          <p className="font-mono text-slate-700">{currentInd.sampleProcess}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              SAP MM Domain Nuances & Solutions
            </h4>
            <ul className="space-y-1.5">
              {currentInd.mmNuances.map((n, i) => (
                <li key={i} className="text-xs text-amber-950 flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              SAP EWM Domain Nuances & Solutions
            </h4>
            <ul className="space-y-1.5">
              {currentInd.ewmNuances.map((n, i) => (
                <li key={i} className="text-xs text-blue-950 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
