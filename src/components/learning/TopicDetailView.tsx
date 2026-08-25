import { Breadcrumbs } from "../common/Breadcrumbs";
import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { SapTopic, IndustryKey } from "../../types/sap";
import { INDUSTRIES } from "../../data/industries";
import { LevelBadge } from "../common/LevelBadge";
import { 
  ArrowLeft, 
  Bookmark, 
  BookOpen, 
  SlidersHorizontal, 
  Table, 
  Briefcase, 
  Stethoscope, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  AlertTriangle,
  Factory,
  Monitor,
  GitFork,
  ArrowRight,
  Terminal,
  Activity
} from "lucide-react";

export const TopicDetailView: React.FC<{ topic: SapTopic; onBack: () => void }> = ({ topic, onBack }) => {
  const { bookmarks, toggleBookmark, setCurrentView, setSelectedTopicId } = useSap();
  const [activeTab, setActiveTab] = useState<
    "overview" | "configView" | "process" | "technical" | "spro" | "industries" | "quiz" | "troubleshoot" | "interview" | "consultant"
  >("overview");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>("automotive");
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);

  const isBookmarked = bookmarks.includes(topic.id);
  const p = topic.pedagogy;

  const tabs = [
    { id: "overview", label: "1. Core Understanding", icon: <BookOpen className="w-4 h-4" /> },
    { id: "configView", label: "2. Configuration View", icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: "process", label: "3. Step-by-Step Flow", icon: <Layers className="w-4 h-4" /> },
    { id: "technical", label: "4. Tables & T-Codes", icon: <Table className="w-4 h-4" /> },
    { id: "spro", label: "5. SPRO IMG Details", icon: <Terminal className="w-4 h-4" /> },
    { id: "industries", label: "6. 11 Industry Variations", icon: <Factory className="w-4 h-4" /> },
    { id: "quiz", label: "7. Scenario Solver", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "troubleshoot", label: "8. Troubleshooting & RCA", icon: <Stethoscope className="w-4 h-4" /> },
    { id: "interview", label: "9. Interview Prep", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "consultant", label: "10. Consultant Challenge", icon: <Briefcase className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Bar with Standardized Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <Breadcrumbs items={[
          { label: "Learn SAP", view: topic.module === "MM" ? "mm" : "ewm" },
          { label: topic.module === "MM" ? "SAP MM" : "SAP EWM", view: topic.module === "MM" ? "mm" : "ewm" },
          { label: topic.category },
          { label: topic.title }
        ]} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Explorer</span>
          </button>

          <div className="flex items-center space-x-2">
            <LevelBadge level={topic.level} />
            <span className="px-2 py-0.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-md">
              Module: {topic.module}
            </span>

            {/* EWM Monitor Shortcut */}
            {topic.ewmMonitorNode && (
              <button
                onClick={() => setCurrentView("whse_monitor")}
                className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                title={`Open in /SCWM/MON: ${topic.ewmMonitorNode}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Open in EWM Monitor</span>
              </button>
            )}

            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? "bg-amber-50 border-amber-300 text-amber-600"
                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {topic.category}
            </span>
            {topic.subcategory && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {topic.subcategory}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {topic.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {topic.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-mono font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Process Diagram Visualization (If Available) */}
      {topic.processDiagram && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <Activity className="w-4 h-4" />
            <span>{topic.processDiagram.title}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topic.processDiagram.nodes.map((node, i) => (
              <div
                key={node.id}
                onClick={() => node.linkedTopicId && setSelectedTopicId(node.linkedTopicId)}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                  node.linkedTopicId
                    ? "bg-slate-800/90 border-blue-500/40 hover:border-blue-400 hover:bg-slate-800 cursor-pointer shadow-sm"
                    : "bg-slate-800/50 border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-blue-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded">
                    Step {i + 1} • {node.system}
                  </span>
                  {node.tcode && (
                    <span className="font-mono text-[10px] text-amber-300">
                      {node.tcode}
                    </span>
                  )}
                </div>
                <div className="font-bold text-slate-100">{node.label}</div>
                {node.description && (
                  <p className="text-[11px] text-slate-400">{node.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10 Tab Navigation */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Core Understanding */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100 space-y-3">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-blue-600" />
              Simple Beginner Analogy
            </h3>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
              {p.beginnerExplanation}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Formal SAP Definition
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
              {p.formalDefinition}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Why is this concept used?
              </h3>
              <ul className="space-y-2">
                {p.whyUsed.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                How does it work in SAP?
              </h3>
              <ul className="space-y-2">
                {p.howItWorks.map((item, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2.5 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-World Business Example */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-amber-600" />
                Real-World Enterprise Case: {p.realWorldBusinessExample.companyContext}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {p.realWorldBusinessExample.scenario}
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-900 font-medium">
              <strong>Business & Financial Outcome:</strong> {p.realWorldBusinessExample.businessOutcome}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dedicated Configuration View */}
      {activeTab === "configView" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Complete Consultant Blueprint
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              Configuration Architecture & Execution View
            </h3>
            <p className="text-xs text-slate-500">
              Clear end-to-end separation across Concept, Prerequisites, Configuration Objects, Determination Logic, Execution, Testing, and Troubleshooting.
            </p>
          </div>

          {topic.configurationView ? (
            <div className="space-y-6">
              {/* Prerequisites & Config Objects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    1. Prerequisites
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.prerequisites.map((req, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    2. Configuration Objects
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.configObjects.map((obj, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start">
                        <span className="text-indigo-600 mr-2 font-bold">⚙</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Determination Logic */}
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  3. Determination Logic & Rule Evaluation
                </h4>
                <ul className="space-y-1.5">
                  {topic.configurationView.determinationLogic.map((logic, i) => (
                    <li key={i} className="text-xs text-blue-950 flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">{i + 1}.</span>
                      <span>{logic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assignment & Execution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    4. SPRO Assignment Steps
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.assignmentSteps.map((st, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start">
                        <span className="text-slate-400 mr-2 font-mono">{i + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    5. Execution Steps
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.executionSteps.map((ex, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start">
                        <span className="text-emerald-600 mr-2 font-bold">✓</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Testing & Troubleshooting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    6. Testing & Validation Procedure
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.testingProcedure.map((tp, i) => (
                      <li key={i} className="text-xs text-emerald-950 flex items-start">
                        <span className="text-emerald-600 mr-2">▶</span>
                        <span>{tp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    7. Common Troubleshooting
                  </h4>
                  <ul className="space-y-1.5">
                    {topic.configurationView.troubleshooting.map((ts, i) => (
                      <li key={i} className="text-xs text-rose-950 flex items-start">
                        <span className="text-rose-600 mr-2">⚠</span>
                        <span>{ts}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 text-xs text-slate-600 rounded-xl">
              Baseline customizing details maintained in SPRO tab.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Step-by-Step Flow */}
      {activeTab === "process" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Step-by-Step Process Execution
            </h3>
            <p className="text-xs text-slate-500">
              Sequence of user actions, database commits, and transactional events.
            </p>
          </div>

          <div className="space-y-4">
            {p.stepByStepProcess.map((step) => (
              <div key={step.stepNumber} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    {step.tcode && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                        {step.tcode}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  {step.tablesUpdated && (
                    <div className="pt-1 flex items-center space-x-1.5">
                      <span className="text-[10px] text-slate-400 font-semibold">Tables:</span>
                      {step.tablesUpdated.map((tb, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white border border-slate-200 px-1 rounded text-slate-700">
                          {tb}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Tables & T-Codes */}
      {activeTab === "technical" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Transparent Database Tables & Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.relatedTables.map((tbl) => (
                <div key={tbl.tableName} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Table: {tbl.tableName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{tbl.description}</p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    <strong>Primary Keys:</strong> {tbl.keyFields.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Related Transactions & Fiori Apps
            </h3>
            <div className="flex flex-wrap gap-2">
              {p.relatedTcodes.map((tc) => (
                <span key={tc} className="px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 text-slate-800 rounded-lg border border-slate-200">
                  {tc}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: SPRO Configuration */}
      {activeTab === "spro" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              SPRO / Customizing Perspective
            </h3>
            <p className="text-xs text-slate-500">
              Backend IMG implementation path, field control, and critical prerequisites.
            </p>
          </div>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
            <span className="text-slate-400 font-bold">IMG Path:</span> {p.configurationPerspective.sproPath}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Critical Customizing Settings
              </h4>
              <ul className="space-y-1.5">
                {p.configurationPerspective.criticalSettings.map((s, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Common Implementation Pitfalls
              </h4>
              <ul className="space-y-1.5">
                {p.configurationPerspective.commonPitfalls.map((pf, i) => (
                  <li key={i} className="text-xs text-amber-800 flex items-start">
                    <span className="text-amber-600 mr-2">⚠</span>
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: 11 Industry Variations */}
      {activeTab === "industries" && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {Object.keys(INDUSTRIES).map((indKey) => {
              const ind = INDUSTRIES[indKey as IndustryKey];
              const isSelected = selectedIndustry === indKey;
              return (
                <button
                  key={indKey}
                  onClick={() => setSelectedIndustry(indKey as IndustryKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {ind.name}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {INDUSTRIES[selectedIndustry].name} Specific Nuance
              </h3>
              <span className="text-xs text-slate-500 font-medium italic">
                {INDUSTRIES[selectedIndustry].tagline}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
              {p.industryExamples[selectedIndustry] || "Standard industry baseline implementation applies."}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-blue-900">Key Business Drivers:</span>
                <p className="text-slate-700">{INDUSTRIES[selectedIndustry].businessDrivers.join(" • ")}</p>
              </div>
              <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs space-y-1">
                <span className="font-bold text-purple-900">Operational Challenges:</span>
                <p className="text-slate-700">{INDUSTRIES[selectedIndustry].keyChallenges.join(" • ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Scenario Solver */}
      {activeTab === "quiz" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
              Interactive Scenario Solver
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">
              {p.scenarioQuestion.prompt}
            </h3>
          </div>

          <div className="space-y-3">
            {p.scenarioQuestion.options.map((opt, idx) => {
              const isSelected = selectedQuizAnswer === idx;
              const isCorrect = idx === p.scenarioQuestion.correctIndex;
              let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
              if (showQuizExplanation) {
                if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                else if (isSelected) btnStyle = "bg-red-50 border-red-300 text-red-900";
              } else if (isSelected) {
                btnStyle = "bg-blue-50 border-blue-400 text-blue-900 font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuizAnswer(idx);
                    setShowQuizExplanation(true);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start space-x-3 ${btnStyle}`}
                >
                  <span className="font-mono font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {showQuizExplanation && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 animate-in fade-in duration-200">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Consultant Logic & Explanation
              </h4>
              <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                {p.scenarioQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 8: Troubleshooting & RCA */}
      {activeTab === "troubleshoot" && (
        <div className="space-y-4">
          {p.troubleshootingScenarios.map((scen, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-rose-700 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-1.5" />
                  {scen.errorOrIssue}
                </h3>
                {scen.errorCode && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded">
                    {scen.errorCode}
                  </span>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 space-y-1">
                <strong>Root Cause Analysis (RCA):</strong>
                <p>{scen.rootCause}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-900">Step-by-Step Resolution:</span>
                <ul className="space-y-1">
                  {scen.solutionSteps.map((step, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-700 flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">{sIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 9: Interview Prep */}
      {activeTab === "interview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div>
              <h4 className="text-xs font-bold text-blue-900">Consultant Interview Question Bank</h4>
              <p className="text-[11px] text-blue-700">Practice real interview questions asked by Big 4 & Top Tier MNCs</p>
            </div>
            <button
              onClick={() => setCurrentView("interview_prep")}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
            >
              <span>Practice All Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {p.interviewQuestions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Tier: {q.tier}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Q: {q.question}
              </h4>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 space-y-1.5">
                <strong className="text-emerald-800">Ideal Answer:</strong>
                <p className="leading-relaxed">{q.sampleAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 10: Consultant Challenge */}
      {activeTab === "consultant" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Senior Consultant Architectural Challenge
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {p.consultantChallenge.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {p.consultantChallenge.clientRequirement}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Architectural Trade-off Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {p.consultantChallenge.architecturalOptions.map((opt, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border space-y-3 ${
                    opt.recommendationLevel === "Recommended"
                      ? "bg-emerald-50/50 border-emerald-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900">{opt.optionName}</h5>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      opt.recommendationLevel === "Recommended"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}>
                      {opt.recommendationLevel}
                    </span>
                  </div>
                  <div className="text-[11px] space-y-1">
                    <span className="font-bold text-emerald-800">Pros:</span>
                    <p className="text-slate-600">{opt.pros.join(", ")}</p>
                  </div>
                  <div className="text-[11px] space-y-1">
                    <span className="font-bold text-rose-800">Cons:</span>
                    <p className="text-slate-600">{opt.cons.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Recommended Consultant Solution Design
            </h4>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              {p.consultantChallenge.recommendedApproach}
            </p>
          </div>
        </div>
      )}

      {/* Knowledge Graph / Related Concepts */}
      {topic.relatedTopics && topic.relatedTopics.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <GitFork className="w-4 h-4 text-blue-600" />
            <span>EWM Knowledge Graph & Related Concepts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.relatedTopics.map((relId) => (
              <button
                key={relId}
                onClick={() => setSelectedTopicId(relId)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg transition-colors flex items-center space-x-1"
              >
                <span>{relId}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
