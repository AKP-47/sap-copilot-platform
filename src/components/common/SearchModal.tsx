import React, { useState, useEffect } from "react";
import { useSap } from "../../context/SapContext";
import { Search, X, Package, Warehouse, GitMerge, RotateCw, Terminal, SlidersHorizontal, Stethoscope, ArrowRight } from "lucide-react";
import { MM_TOPICS } from "../../data/mmTopics";
import { EWM_TOPICS } from "../../data/ewmTopics";
import { MOVEMENT_TYPES } from "../../data/movementTypes";
import { TCODES_DATA } from "../../data/tcodes";
import { SPRO_GUIDE } from "../../data/sproGuide";
import { ERROR_DOCTOR_DATA } from "../../data/errorDoctorBank";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentView, setSelectedTopicId } = useSap();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const matchedTopics = [...MM_TOPICS, ...EWM_TOPICS].filter(t => 
    !q || 
    t.title.toLowerCase().includes(q) || 
    t.subtitle.toLowerCase().includes(q) || 
    t.category.toLowerCase().includes(q) ||
    (t.subcategory && t.subcategory.toLowerCase().includes(q)) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  ).slice(0, 8);

  const matchedMovements = MOVEMENT_TYPES.filter(m =>
    !q || m.code.includes(q) || m.description.toLowerCase().includes(q) || m.businessPurpose.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedTcodes = TCODES_DATA.filter(tc =>
    !q || tc.tcode.toLowerCase().includes(q) || tc.name.toLowerCase().includes(q) || tc.purpose.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedSpro = SPRO_GUIDE.filter(s =>
    !q || s.title.toLowerCase().includes(q) || (s.tcodeShortcut && s.tcodeShortcut.toLowerCase().includes(q)) || s.path.some(p => p.toLowerCase().includes(q))
  ).slice(0, 2);

  const matchedErrors = ERROR_DOCTOR_DATA.filter(e =>
    !q || e.errorCode.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.messageText.toLowerCase().includes(q)
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, T-Codes (MM01, /SCWM/PRDI), Movement types (101, 261), Errors (M7021)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Topics */}
          {matchedTopics.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <Package className="w-3.5 h-3.5 mr-1" />
                <span>Curriculum Topics</span>
              </div>
              {matchedTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setCurrentView(topic.module === "MM" ? "mm" : "ewm");
                    setSelectedTopicId(topic.id);
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-100 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-md">
                      {topic.subtitle}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {topic.module}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Movement Types */}
          {matchedMovements.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <RotateCw className="w-3.5 h-3.5 mr-1" />
                <span>Movement Types</span>
              </div>
              {matchedMovements.map(m => (
                <button
                  key={m.code}
                  onClick={() => {
                    setCurrentView("movement_lab");
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-100 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 rounded">
                      {m.code}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        {m.description}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-md">
                        {m.businessPurpose}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </button>
              ))}
            </div>
          )}

          {/* T-Codes */}
          {matchedTcodes.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-1" />
                <span>T-Codes & Fiori Apps</span>
              </div>
              {matchedTcodes.map(tc => (
                <button
                  key={tc.tcode}
                  onClick={() => {
                    setCurrentView("tcodes");
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-indigo-50 border border-transparent hover:border-indigo-100 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 text-xs font-mono font-bold bg-indigo-100 text-indigo-800 rounded">
                      {tc.tcode}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                        {tc.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-md">
                        {tc.purpose}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {tc.module}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Errors */}
          {matchedErrors.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <Stethoscope className="w-3.5 h-3.5 mr-1" />
                <span>SAP Error Codes (RCA)</span>
              </div>
              {matchedErrors.map(err => (
                <button
                  key={err.id}
                  onClick={() => {
                    setCurrentView("error_doctor");
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 text-xs font-mono font-bold bg-rose-100 text-rose-800 rounded">
                      {err.errorCode}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                        {err.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-md">
                        {err.typicalTrigger}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Search Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>Search TagSkills Enterprise SAP Knowledge Base</span>
          <span>Tip: Type <strong>101</strong>, <strong>POSC</strong>, or <strong>M7021</strong></span>
        </div>

      </div>
    </div>
  );
};
