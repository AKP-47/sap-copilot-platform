import React, { useState } from "react";
import { GitMerge, ArrowRight, CheckCircle2 } from "lucide-react";

export const PoscLoscVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const poscSteps = [
    { step: 1, code: "IB01", name: "Unloading (UNLD)", location: "Door 01 (DOOR)", desc: "Truck arrives; pallet unloaded and checked in." },
    { step: 2, code: "IB02", name: "Deconsolidation (DECO)", location: "Work Center DECO-01", desc: "Mixed pallet unpacked into yellow tote HUs." },
    { step: 3, code: "IB03", name: "Quality Inspection (QIS)", location: "Quality Station Q01", desc: "Sample inspected; Usage Decision approved." },
    { step: 4, code: "IB04", name: "Final Putaway (PTWY)", location: "High-Rack Bin 01-12-04", desc: "Tote stored in high-bay rack." }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 rounded-2xl p-6 border border-violet-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-violet-600 text-white rounded-xl shadow-sm">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-800">
              Multi-Step Physical Routing
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              POSC & LOSC Multi-Step Storage Control Visualizer
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Interactive step-by-step state machine progression showing how Handling Units transition through intermediate work centers with automated task generation.
        </p>
      </div>

      {/* Visualizer Canvas */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-8">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between">
          {poscSteps.map((s, idx) => (
            <React.Fragment key={s.step}>
              <button
                onClick={() => setActiveStep(s.step)}
                className={`flex flex-col items-center space-y-1 ${
                  activeStep >= s.step ? "text-violet-700 font-bold" : "text-slate-400"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  activeStep === s.step
                    ? "bg-violet-600 text-white ring-4 ring-violet-100"
                    : activeStep > s.step
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500 border border-slate-300"
                }`}>
                  {activeStep > s.step ? "✓" : s.step}
                </div>
                <span className="text-xs">{s.code}</span>
              </button>
              {idx < poscSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded ${
                  activeStep > idx + 1 ? "bg-emerald-500" : "bg-slate-200"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Details */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-violet-100 text-violet-800 rounded">
              Step {poscSteps[activeStep - 1].step}: {poscSteps[activeStep - 1].name}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Location: <strong>{poscSteps[activeStep - 1].location}</strong>
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {poscSteps[activeStep - 1].desc}
          </p>

          <div className="pt-2 flex justify-between items-center">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
            >
              Previous Station
            </button>
            <button
              disabled={activeStep === poscSteps.length}
              onClick={() => setActiveStep(prev => Math.min(poscSteps.length, prev + 1))}
              className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg disabled:opacity-50"
            >
              Confirm & Advance Task →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
