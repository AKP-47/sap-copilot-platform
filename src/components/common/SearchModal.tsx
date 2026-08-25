import React, { useState, useEffect } from "react";
import { useSap } from "../../context/SapContext";
import { 
  Search, 
  X, 
  Package, 
  Warehouse, 
  RotateCw, 
  Terminal, 
  Stethoscope, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Sparkles,
  HelpCircle,
  Cpu
} from "lucide-react";
import { MM_TOPICS } from "../../data/mmTopics";
import { EWM_TOPICS } from "../../data/ewmTopics";
import { MOVEMENT_TYPES } from "../../data/movementTypes";
import { TCODES_DATA } from "../../data/tcodes";
import { ERROR_DOCTOR_DATA } from "../../data/errorDoctorBank";

const POPULAR_SEARCHES = [
  "Movement Type 101",
  "Purchase Order",
  "Inbound Delivery",
  "Warehouse Task",
  "POSC",
  "MIGO",
  "Physical Inventory",
  "/SCWM/MON",
  "Error M7021"
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentView, setSelectedTopicId } = useSap();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("sap_recent_searches");
      return saved ? JSON.parse(saved) : ["Movement Type 101", "POSC", "MIGO"];
    } catch {
      return ["Movement Type 101", "POSC", "MIGO"];
    }
  });

  // Global Keyboard Shortcuts: '/' or '⌘K' / 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in another input
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((e.key === "/" && !isInput) || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
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

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem("sap_recent_searches", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Multi-Category Search Results
  const matchedMMTopics = MM_TOPICS.filter(t => 
    !q || 
    t.title.toLowerCase().includes(q) || 
    t.subtitle.toLowerCase().includes(q) || 
    t.category.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchedEWMTopics = EWM_TOPICS.filter(t => 
    !q || 
    t.title.toLowerCase().includes(q) || 
    t.subtitle.toLowerCase().includes(q) || 
    t.category.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchedMovements = MOVEMENT_TYPES.filter(m =>
    !q || m.code.includes(q) || m.description.toLowerCase().includes(q) || m.businessPurpose.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedTcodes = TCODES_DATA.filter(tc =>
    !q || tc.tcode.toLowerCase().includes(q) || tc.name.toLowerCase().includes(q) || tc.purpose.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedErrors = ERROR_DOCTOR_DATA.filter(e =>
    !q || e.errorCode.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.messageText.toLowerCase().includes(q)
  ).slice(0, 2);

  const hasAnyResults = matchedMMTopics.length > 0 || matchedEWMTopics.length > 0 || matchedMovements.length > 0 || matchedTcodes.length > 0 || matchedErrors.length > 0;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-start justify-center p-3 sm:p-4 pt-12 sm:pt-20 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3 bg-slate-50 dark:bg-slate-950/50 shrink-0">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query) {
                saveRecentSearch(query);
              }
            }}
            placeholder="Search MM, EWM, T-Codes (MIGO, MM01), Movements (101, 261), Errors..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery("")} 
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Search Body Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Recent & Popular Searches when no query is typed */}
          {!q && (
            <div className="space-y-5">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(term)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 transition-colors"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  <span>Popular SAP Topics</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Categorized Search Results */}
          {q && hasAnyResults && (
            <div className="space-y-6">
              
              {/* Category 1: Movement Types */}
              {matchedMovements.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center">
                    <RotateCw className="w-3.5 h-3.5 mr-1" />
                    <span>Movement Types ({matchedMovements.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedMovements.map(m => (
                      <button
                        key={m.code}
                        onClick={() => {
                          saveRecentSearch(m.code);
                          setCurrentView("movement_lab");
                          setIsSearchOpen(false);
                        }}
                        className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition-all flex items-start justify-between group"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded">
                              {m.code}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                              {m.description}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {m.businessPurpose}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 2: T-Codes */}
              {matchedTcodes.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center">
                    <Terminal className="w-3.5 h-3.5 mr-1" />
                    <span>T-Codes & Fiori Apps ({matchedTcodes.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedTcodes.map(tc => (
                      <button
                        key={tc.tcode}
                        onClick={() => {
                          saveRecentSearch(tc.tcode);
                          setCurrentView("tcodes");
                          setIsSearchOpen(false);
                        }}
                        className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all flex items-start justify-between group"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded">
                              {tc.tcode}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                              {tc.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {tc.purpose}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded shrink-0">
                          {tc.module}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 3: SAP MM Concepts */}
              {matchedMMTopics.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center">
                    <Package className="w-3.5 h-3.5 mr-1" />
                    <span>SAP MM Concepts ({matchedMMTopics.length})</span>
                  </div>
                  {matchedMMTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        saveRecentSearch(topic.title);
                        setCurrentView("mm");
                        setSelectedTopicId(topic.id);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 hover:border-amber-300 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300">
                          {topic.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {topic.subtitle}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Category 4: SAP EWM Concepts */}
              {matchedEWMTopics.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center">
                    <Warehouse className="w-3.5 h-3.5 mr-1" />
                    <span>SAP EWM Concepts ({matchedEWMTopics.length})</span>
                  </div>
                  {matchedEWMTopics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        saveRecentSearch(topic.title);
                        setCurrentView("ewm");
                        setSelectedTopicId(topic.id);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
                          {topic.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {topic.subtitle}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Category 5: Errors Doctor */}
              {matchedErrors.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center">
                    <Stethoscope className="w-3.5 h-3.5 mr-1" />
                    <span>Error Doctor & RCA ({matchedErrors.length})</span>
                  </div>
                  {matchedErrors.map(err => (
                    <button
                      key={err.id}
                      onClick={() => {
                        saveRecentSearch(err.errorCode);
                        setCurrentView("error_doctor");
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 hover:border-rose-300 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-rose-100 text-rose-800 rounded">
                          {err.errorCode}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-700">
                            {err.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-md">
                            {err.typicalTrigger}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Friendly Empty State */}
          {q && !hasAnyResults && (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No matching SAP concept found for "{query}"
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Try searching for a Movement Type, T-Code, EWM Concept, or Procurement term.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {["101", "MIGO", "POSC", "Inbound", "Purchase Order", "ME21N"].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Try "{term}"
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Search Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">ESC</kbd> to close</span>
          </div>
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">/</kbd> on any screen to search</span>
        </div>

      </div>
    </div>
  );
};
