import React, { useState } from "react";
import { SPRO_GUIDE } from "../../data/sproGuide";
import { SlidersHorizontal, ChevronRight, Search, Table, CheckCircle2 } from "lucide-react";

export const SproPathFinder: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNodeId, setSelectedNodeId] = useState<string>(SPRO_GUIDE[0].id);

  const filteredNodes = SPRO_GUIDE.filter(n => {
    const matchesMod = selectedModule === "All" || n.module === selectedModule;
    const matchesSearch = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.tcodeShortcut && n.tcodeShortcut.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMod && matchesSearch;
  });

  const activeNode = SPRO_GUIDE.find(n => n.id === selectedNodeId) || SPRO_GUIDE[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
              Backend Customizing Guide
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Virtual SPRO Reference IMG Tree
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Navigate exact Implementation Guide (IMG) hierarchy paths for SAP MM & EWM. Review Customizing table views, mandatory fields, dependencies, and consultant best-practice tips.
        </p>
      </div>

      {/* Split Tree View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Tree Navigator */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2">
            {["All", "MM", "EWM"].map((mod) => (
              <button
                key={mod}
                onClick={() => setSelectedModule(mod)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedModule === mod
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {mod}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search IMG activity..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredNodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all space-y-1 ${
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-blue-950 shadow-sm"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{node.title}</span>
                    {node.tcodeShortcut && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {node.tcodeShortcut}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    {node.path.slice(-2).join(" > ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                IMG Activity Node
              </span>
              {activeNode.tcodeShortcut && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                  Direct T-Code: {activeNode.tcodeShortcut}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {activeNode.title}
            </h2>
          </div>

          {/* Breadcrumb path */}
          <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Exact SPRO Path:</span>
            <div className="flex items-center flex-wrap gap-1">
              {activeNode.path.map((p, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-slate-200">{p}</span>
                  {idx < activeNode.path.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Functional Purpose & System Behavior
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
              {activeNode.purpose}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Critical Field Parameters
              </h4>
              <ul className="space-y-1">
                {activeNode.criticalFields.map((f, i) => (
                  <li key={i} className="text-xs font-mono text-slate-700 flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Customizing Tables (View Maintenance)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.keyTables.map((tb, i) => (
                  <span key={i} className="text-xs font-mono font-bold px-2 py-1 bg-white border border-slate-200 rounded text-slate-800">
                    {tb}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              💡 Consultant Best Practice Tip
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {activeNode.bestPracticeTip}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
