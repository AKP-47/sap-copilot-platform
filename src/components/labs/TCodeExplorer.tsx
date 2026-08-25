import React, { useState } from "react";
import { TCODES_DATA } from "../../data/tcodes";
import { Terminal, Search, ArrowRight, Table, Layers } from "lucide-react";

export const TCodeExplorer: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTcode, setSelectedTcode] = useState<string>("MM01");

  const filteredTcodes = TCODES_DATA.filter(tc => {
    const matchesMod = selectedModule === "All" || tc.module === selectedModule;
    const matchesSearch = !searchQuery ||
      tc.tcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesSearch;
  });

  const activeTcode = TCODES_DATA.find(tc => tc.tcode === selectedTcode) || TCODES_DATA[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-sm">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">
              Interactive Catalog & Process Mapping
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP MM & EWM T-Code & Fiori App Explorer
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Search and master SAP Transaction Codes and modern Fiori Apps in real business contexts. Understand required inputs, expected outputs, tables updated, and interview questions.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
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
              placeholder="Search T-Code..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {filteredTcodes.map((tc) => {
              const isSelected = selectedTcode === tc.tcode;
              return (
                <button
                  key={tc.tcode}
                  onClick={() => setSelectedTcode(tc.tcode)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? "bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  <span className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                    isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    {tc.tcode}
                  </span>
                  <div className="truncate flex-1">
                    <div className="text-xs font-bold truncate">{tc.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{tc.category}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-md">
                T-Code: {activeTcode.tcode}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">
                {activeTcode.name}
              </h2>
              {activeTcode.fioriAppId && (
                <span className="text-xs text-slate-500 mt-1 inline-block">
                  Fiori App ID: <strong>{activeTcode.fioriAppId}</strong> – {activeTcode.fioriAppName}
                </span>
              )}
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
              {activeTcode.module} • {activeTcode.category}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Purpose & Operational Role
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {activeTcode.purpose}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Mandatory Inputs
              </h4>
              <ul className="space-y-1">
                {activeTcode.requiredInputs.map((inp, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Expected System Outputs
              </h4>
              <ul className="space-y-1">
                {activeTcode.expectedOutputs.map((out, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tables Affected */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Table className="w-3.5 h-3.5 mr-1" />
              <span>Transparent Tables Updated</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeTcode.tablesAffected.map((tb, idx) => (
                <span key={idx} className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200">
                  {tb}
                </span>
              ))}
            </div>
          </div>

          {/* Interview Question */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-2">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Interview Question on {activeTcode.tcode}
            </h4>
            <p className="text-xs font-bold text-slate-900">
              Q: {activeTcode.interviewQuestion}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100">
              <strong>Answer:</strong> {activeTcode.interviewAnswer}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
