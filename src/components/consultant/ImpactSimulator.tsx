import React, { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { IMPACT_SIMULATORS, ImpactSimulatorModel } from "../../data/consultantReasoning";
import { Sliders, TrendingUp, AlertTriangle, ShieldCheck, DollarSign, RotateCw, CheckCircle2 } from "lucide-react";

export const ImpactSimulator: React.FC = () => {
  const [activeSimIndex, setActiveSimIndex] = useState<number>(0);
  const activeSim: ImpactSimulatorModel = IMPACT_SIMULATORS[activeSimIndex];
  const [sliderValue, setSliderValue] = useState<number>(activeSim.defaultValue);

  // Determine current tier based on slider percentage
  const pct = ((sliderValue - activeSim.minValue) / (activeSim.maxValue - activeSim.minValue)) * 100;
  let currentTier: "low" | "medium" | "high" = "medium";
  if (pct < 33) {
    currentTier = "low";
  } else if (pct > 66) {
    currentTier = "high";
  }

  const metrics = activeSim.impactMetrics[currentTier];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        badge="STRATEGIC DECISION SIMULATOR"
        badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800"
        title="Business Impact & Trade-Off Simulator"
        description="In SAP consulting, no parameter is universally 'correct'. Every configuration choice involves a real-world financial and operational trade-off. Adjust the sliders below to simulate how parameter changes impact carrying cost, stockout risk, and production continuity."
        breadcrumbs={[
          { label: "Career & Consultant Suite" },
          { label: "Impact Simulator" }
        ]}
        learningOutcomes={[
          "Analyze the trade-off between Lean JIT vs High Safety Stock Buffers",
          "Evaluate POSC routing complexity vs dock-to-stock putaway velocity",
          "Understand how material master parameters dictate real-world supply chain resilience"
        ]}
      />

      {/* Simulator Model Picker */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {IMPACT_SIMULATORS.map((sim, idx) => (
          <button
            key={sim.id}
            onClick={() => {
              setActiveSimIndex(idx);
              setSliderValue(IMPACT_SIMULATORS[idx].defaultValue);
            }}
            style={{
              backgroundColor: activeSimIndex === idx ? "var(--theme-primary)" : undefined,
              color: activeSimIndex === idx ? "#ffffff" : undefined
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSimIndex === idx
                ? "shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            {sim.title}
          </button>
        ))}
      </div>

      {/* Interactive Control Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-theme-primary">
            {activeSim.category}
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {activeSim.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {activeSim.description}
          </p>
        </div>

        {/* Dynamic Slider Control */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {activeSim.parameterName}:
            </span>
            <span className="text-base font-mono font-extrabold text-theme-primary px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs">
              {sliderValue}
            </span>
          </div>

          <input
            type="range"
            min={activeSim.minValue}
            max={activeSim.maxValue}
            step={activeSim.step}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Min: {activeSim.minValue}</span>
            <span>Current Strategy: <strong>{metrics.range}</strong></span>
            <span>Max: {activeSim.maxValue}</span>
          </div>
        </div>

        {/* Real-Time Impact Evaluation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400 flex items-center">
              <DollarSign className="w-3.5 h-3.5 mr-1" />
              <span>Working Capital / Cost</span>
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {metrics.carryingCost}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              <span>Stockout & Disruption Risk</span>
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {metrics.stockoutRisk}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Production Continuity</span>
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {metrics.productionContinuity}
            </div>
          </div>

        </div>

        {/* Consultant Trade-Off Synthesis */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>CONSULTANT TRADE-OFF ADVISORY</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {metrics.consultantAnalysis}
          </p>
        </div>

      </div>
    </div>
  );
};
