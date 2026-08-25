import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { EWM_TOPICS } from "../../data/ewmTopics";
import { TopicDetailView } from "./TopicDetailView";
import { LevelBadge } from "../common/LevelBadge";
import { 
  Warehouse, 
  ArrowRight, 
  Bookmark, 
  Search, 
  SlidersHorizontal, 
  Layers, 
  HelpCircle, 
  Stethoscope, 
  GraduationCap, 
  Briefcase, 
  Monitor, 
  Scan, 
  Workflow, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Play
} from "lucide-react";

export const EWMExplorer: React.FC = () => {
  const { selectedTopicId, setSelectedTopicId, bookmarks, toggleBookmark, setCurrentView } = useSap();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTroubleshootCase, setActiveTroubleshootCase] = useState<number | null>(null);
  const [troubleshootDiagnosis, setTroubleshootDiagnosis] = useState<Record<number, boolean>>({});

  const categories = [
    "All",
    "Organizational Structure",
    "Master Data",
    "Inbound",
    "Intelligent Putaway",
    "Handling Unit & Packaging",
    "Advanced EWM",
    "Outbound",
    "Physical Inventory",
    "Queue & Resource Management",
    "Radio Frequency (RF)",
    "Warehouse Movements",
    "Post Processing Framework (PPF)",
    "Wave Management"
  ];

  const troubleshootingCases = [
    {
      id: 1,
      title: "Case 1: Putaway warehouse task is not created upon Inbound Goods Receipt",
      error: "Error: No destination storage bin determined (/SCWM/UI_TODET 002)",
      linkedTopicId: "ewm-intelligent-putaway",
      solution: "Check PACI on Warehouse Product (/SCWM/MAT1) and Storage Type Search Sequence in /SCWM/T334T. Verify candidate bins in /SCWM/LAGP have not exceeded Max Gross Weight / Volume capacity limits."
    },
    {
      id: 2,
      title: "Case 2: Wrong storage type is determined during putaway",
      error: "Pallet routed to Bulk Storage 0020 instead of High-Rack 0010",
      linkedTopicId: "ewm-intelligent-putaway",
      solution: "Inspect Storage Type Search Sequence priority order in SPRO. Check if High-Rack storage type was skipped due to Capacity Check Method 3 rejection."
    },
    {
      id: 3,
      title: "Case 3: Warehouse task goes to wrong Queue (or blank unassigned queue)",
      error: "Task sits in /SCWM/MON with blank Queue field",
      linkedTopicId: "ewm-queue-management",
      solution: "Open /SCWM/TQD_DET. Ensure an entry matches Source Activity Area, Activity, and WPT. Add a generic fallback entry to catch unclassified tasks."
    },
    {
      id: 4,
      title: "Case 4: Warehouse Order is not created for open Warehouse Tasks",
      error: "Tasks remain unbundled with no WHO document",
      linkedTopicId: "ewm-wocr-advanced-outbound",
      solution: "Verify Search Sequence for Creation Rules in /SCWM/TWOCR_DET. Check that WOCR Limits are not set to 0 and that Bin Sorting (/SCWM/SBST) has been executed."
    },
    {
      id: 5,
      title: "Case 5: Outbound Wave is not generated automatically for delivery",
      error: "Delivery items remain unassigned to any wave in /SCWM/WAVE",
      linkedTopicId: "ewm-wave-management",
      solution: "Check Condition Records in /SCWM/WDG_RULES. Ensure Delivery Schedule Line Date, Route, and Carrier match the Wave Template condition table."
    },
    {
      id: 6,
      title: "Case 6: Picking warehouse task is not created during wave release",
      error: "Wave releases with Red status: Shortage of stock (/SCWM/UI_TODET 003)",
      linkedTopicId: "ewm-intelligent-picking",
      solution: "Verify stock exists with Stock Type F2 (Unrestricted AFS). Check if stock is locked by other open tasks in /SCWM/ORDIM_O or trigger Order-Related Replenishment in /SCWM/REPL."
    },
    {
      id: 7,
      title: "Case 7: PPF action for auto-WT creation is not triggered",
      error: "PPF Action shows Yellow status (Not Processed) in /SCWM/MON",
      linkedTopicId: "ewm-ppf-architecture",
      solution: "In SPPFP, change Processing Time to '4 - Immediate Processing during update task' or schedule background report RSPPFPROCESS to run periodically."
    },
    {
      id: 8,
      title: "Case 8: Packaging Specification is not determined during Inbound Receipt",
      error: "Handling Units are not auto-generated from delivery",
      linkedTopicId: "ewm-packspec-config",
      solution: "Open /SCWM/PACKSPEC. Ensure PackSpec status is set to 'Active' (Green icon) and that the Determination Procedure is assigned to the Delivery Document Type."
    },
    {
      id: 9,
      title: "Case 9: RF user cannot receive a warehouse task in System Guided mode",
      error: "RF Screen shows: 'No tasks available in queue'",
      linkedTopicId: "ewm-resource-management",
      solution: "Check User-to-Resource assignment in /SCWM/USER. Ensure the Resource Group has a valid Queue Sequence maintained in SPRO and that the Resource Type can access the bin type."
    },
    {
      id: 10,
      title: "Case 10: POSC follow-up process step task is missing after confirmation",
      error: "Step 1 (UNLD) confirmed, but Step 2 (DECO) task not created",
      linkedTopicId: "ewm-posc-inbound",
      solution: "In /SCWM/TPOSC, verify that the 'Auto-WT' checkbox is enabled for the next external step and that the intermediate Work Center has a valid destination bin assigned in /SCWM/WORKC."
    }
  ];

  const filteredTopics = EWM_TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === "All" || 
      topic.category === selectedCategory || 
      topic.subcategory === selectedCategory;
    const matchesSearch = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeTopic = EWM_TOPICS.find(t => t.id === selectedTopicId);

  if (activeTopic) {
    return <TopicDetailView topic={activeTopic} onBack={() => setSelectedTopicId(null)} />;
  }

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-600 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded">
              SAP S/4HANA EWM 2023 Enterprise Architecture
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white text-blue-700 rounded-2xl shadow-md">
              <Warehouse className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                SAP EWM Consultant Learning & Simulation Hub
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed">
                Master 30+ enterprise topics with 14-point pedagogy, interactive SPRO configuration blueprints, Process-Oriented Storage Control (POSC/LOSC), Wave Management, RF Framework (/SCWM/RFUI), Warehouse Monitor (/SCWM/MON), and Robotics Automation.
              </p>
            </div>
          </div>

          {/* Quick Simulator Launchers */}
          <div className="pt-3 flex flex-wrap gap-2.5">
            <button
              onClick={() => setCurrentView("rf_terminal")}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              <Scan className="w-3.5 h-3.5 text-blue-300" />
              <span>RF Terminal Simulator (/SCWM/RFUI)</span>
            </button>

            <button
              onClick={() => setCurrentView("whse_monitor")}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-300" />
              <span>Warehouse Monitor (/SCWM/MON)</span>
            </button>

            <button
              onClick={() => setCurrentView("posc_visualizer")}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              <Workflow className="w-3.5 h-3.5 text-amber-300" />
              <span>POSC / LOSC Visualizer</span>
            </button>

            <button
              onClick={() => setCurrentView("scenarios")}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-pink-300" />
              <span>Scenario Simulator</span>
            </button>

            <button
              onClick={() => setCurrentView("consultant_sim")}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-yellow-300" />
              <span>Consultant Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Process Visualizer Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Interactive EWM Process Visualizer
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              End-to-End Inbound & Outbound Execution Tracks
            </h3>
            <p className="text-xs text-slate-500">
              Click any stage in the flow to immediately open the associated deep consultant topic.
            </p>
          </div>
        </div>

        {/* Inbound Track */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Inbound Execution Track:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { step: "1. PO (ERP)", sub: "ME21N", topicId: "ewm-inbound-fundamentals" },
              { step: "2. Inbound Delivery", sub: "VL31N", topicId: "ewm-inbound-fundamentals" },
              { step: "3. EWM Delivery", sub: "/SCWM/PRDI", topicId: "ewm-inbound-fundamentals" },
              { step: "4. Goods Receipt", sub: "Stock at Door", topicId: "ewm-inbound-fundamentals" },
              { step: "5. Warehouse Task", sub: "/SCWM/TODET_I", topicId: "ewm-intelligent-putaway" },
              { step: "6. Warehouse Order", sub: "WOCR /WHO", topicId: "ewm-wocr-advanced-outbound" },
              { step: "7. Putaway Strategy", sub: "PACI / Search", topicId: "ewm-intelligent-putaway" },
              { step: "8. Confirmation", sub: "/SCWM/RFUI", topicId: "ewm-rf-execution-sim" }
            ].map((node, i) => (
              <button
                key={i}
                onClick={() => setSelectedTopicId(node.topicId)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-emerald-800">{node.step}</div>
                <div className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-700">{node.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Outbound Track */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-700 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Outbound Execution Track:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { step: "1. Sales Order", sub: "VA01", topicId: "ewm-outbound-master-data" },
              { step: "2. Outbound Delivery", sub: "VL01N", topicId: "ewm-outbound-process" },
              { step: "3. EWM ODO", sub: "/SCWM/PRDO", topicId: "ewm-outbound-process" },
              { step: "4. Wave Release", sub: "/SCWM/WAVE", topicId: "ewm-wave-management" },
              { step: "5. Picking WT", sub: "FIFO/FEFO", topicId: "ewm-intelligent-picking" },
              { step: "6. Pack & Label", sub: "/SCWM/PACK", topicId: "ewm-hu-management" },
              { step: "7. Stage & Load", sub: "/SCWM/LOAD", topicId: "ewm-outbound-process" },
              { step: "8. Post GI (PGI)", sub: "ERP 601", topicId: "ewm-outbound-process" }
            ].map((node, i) => (
              <button
                key={i}
                onClick={() => setSelectedTopicId(node.topicId)}
                className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-blue-800">{node.step}</div>
                <div className="text-[10px] font-mono text-slate-500 group-hover:text-blue-700">{node.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search POSC, WOCR, WPT, RF, Wave..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTopics.map((topic) => {
          const isBookmarked = bookmarks.includes(topic.id);
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {topic.category}
                    </span>
                    {topic.subcategory && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {topic.subcategory}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <LevelBadge level={topic.level} />
                    <button
                      onClick={() => toggleBookmark(topic.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked ? "text-amber-500 bg-amber-50 border-amber-200" : "text-slate-300 hover:text-slate-500 border-slate-200"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {topic.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topic.tags.slice(0, 5).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Interactive Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>[Learn]</span>
                  </button>

                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    [Configuration]
                  </button>

                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    [Process Flow]
                  </button>

                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    [Troubleshoot]
                  </button>

                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    [Interview]
                  </button>

                  {topic.ewmMonitorNode && (
                    <button
                      onClick={() => setCurrentView("whse_monitor")}
                      className="px-2 py-1 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Monitor className="w-3 h-3" />
                      <span>[EWM Monitor]</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    14 Pedagogy Points • SPRO Blueprint
                  </span>
                  <button
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="flex items-center space-x-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                  >
                    <span>Open Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 10 Realistic Troubleshooting Simulation Cases */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
              Interactive Diagnostic Engine
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              10 SAP EWM Real-World Troubleshooting Cases
            </h3>
            <p className="text-xs text-slate-500">
              Practice diagnosing and resolving actual client shop-floor crisis cases step-by-step.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {troubleshootingCases.map((cs) => {
            const isDiagnosed = troubleshootDiagnosis[cs.id];
            return (
              <div
                key={cs.id}
                className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded">
                      Troubleshooting Case #{cs.id}
                    </span>
                    {isDiagnosed && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Diagnosed
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{cs.title}</h4>
                  <div className="p-2.5 bg-white border border-rose-200 rounded-lg text-xs text-rose-700 font-mono">
                    🚨 {cs.error}
                  </div>

                  {isDiagnosed && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1 animate-in fade-in duration-200">
                      <strong>✓ Solution & RCA:</strong>
                      <p>{cs.solution}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedTopicId(cs.linkedTopicId)}
                    className="text-xs text-blue-700 hover:underline font-bold"
                  >
                    View Topic Architecture →
                  </button>

                  <button
                    onClick={() => setTroubleshootDiagnosis(prev => ({ ...prev, [cs.id]: !prev[cs.id] }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      isDiagnosed
                        ? "bg-slate-200 text-slate-700"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                    }`}
                  >
                    {isDiagnosed ? "Hide Solution" : "Diagnose Issue"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
