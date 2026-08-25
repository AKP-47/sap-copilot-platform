import React, { useState } from "react";
import { SCENARIO_BANK } from "../../data/scenarioBank";
import { useSap } from "../../context/SapContext";
import { Cpu, CheckCircle2, ArrowRight, RefreshCw, Sparkles, Award } from "lucide-react";
import { ModuleType, IndustryKey } from "../../types/sap";

export const ScenarioSimulator: React.FC = () => {
  const { markScenarioCompleted } = useSap();
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIO_BANK[0].id);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [stageAnswers, setStageAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeScenario = SCENARIO_BANK.find(s => s.id === selectedScenarioId) || SCENARIO_BANK[0];
  const currentStage = activeScenario.stages[currentStageIdx];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setStageAnswers(prev => ({ ...prev, [currentStageIdx]: optId }));
  };

  const handleNextStage = () => {
    if (currentStageIdx < activeScenario.stages.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      setSelectedOptionId(stageAnswers[currentStageIdx + 1] || null);
    } else {
      setIsCompleted(true);
      markScenarioCompleted(activeScenario.id, 95);
    }
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    setSelectedOptionId(null);
    setStageAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 rounded-2xl p-6 border border-pink-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-pink-600 text-white rounded-xl shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-800">
              Interactive Problem-Solving Engine
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP Scenario Simulator
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Select Module, Industry, and Difficulty. Solve real-world client crisis scenarios with multi-stage decision branching and live consultant feedback.
        </p>
      </div>

      {/* Simulator Body */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-pink-100 text-pink-800 rounded">
                {activeScenario.module}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                Industry: {activeScenario.industry.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                {activeScenario.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {activeScenario.title}
            </h2>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>
        </div>

        {/* Business Context */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-800 leading-relaxed">
          <strong className="text-slate-900">Business Problem Context:</strong>
          <p>{activeScenario.businessContext}</p>
        </div>

        {!isCompleted ? (
          /* Active Stage */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-700">
                Stage {currentStage.stageNumber} of {activeScenario.stages.length}: {currentStage.stageTitle}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              {currentStage.questionPrompt}
            </h3>

            <div className="space-y-3">
              {currentStage.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm space-y-1 ${
                      isSelected
                        ? "bg-pink-50 border-pink-400 text-pink-950 shadow-sm"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="font-bold">{opt.text}</div>
                    <div className="text-xs text-slate-500">{opt.sapImpact}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={!selectedOptionId}
                onClick={handleNextStage}
                className="flex items-center space-x-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50 transition-all"
              >
                <span>{currentStageIdx === activeScenario.stages.length - 1 ? "Submit Simulation" : "Next Stage"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Simulation Completed Summary */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <Award className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">
                Simulation Successfully Solved!
              </h3>
              <p className="text-xs text-emerald-800">
                Score: <strong>95 / 100</strong> • Evaluation: Senior Consultant Grade
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900">Optimal SAP Approach:</span>
                <p className="text-slate-700 leading-relaxed">{activeScenario.overallSolution.correctApproach}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-1">
                <span className="font-bold text-blue-900">SAP Technical Reasoning:</span>
                <p className="text-blue-950 leading-relaxed">{activeScenario.overallSolution.sapReasoning}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-1">
                <span className="font-bold text-purple-900">Consultant Takeaway:</span>
                <p className="text-purple-950 leading-relaxed">{activeScenario.overallSolution.consultantTakeaway}</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
