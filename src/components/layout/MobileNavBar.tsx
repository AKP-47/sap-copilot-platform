import React from "react";
import { useSap } from "../../context/SapContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  Sparkles, 
  Search 
} from "lucide-react";

export const MobileNavBar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setSelectedTopicId, 
    setIsSearchOpen, 
    setIsCopilotOpen 
  } = useSap();

  const isLearnActive = currentView === "mm" || currentView === "ewm" || currentView === "integration";
  const isPracticeActive = currentView === "movement_lab" || currentView === "tcodes" || currentView === "scenarios" || currentView === "consultant_sim" || currentView === "interview_prep" || currentView === "industry_labs" || currentView === "obyc_sim" || currentView === "whse_monitor" || currentView === "rf_terminal" || currentView === "posc_visualizer" || currentView === "error_doctor" || currentView === "spro_guide";

  return (
    <nav 
      aria-label="Mobile Navigation Bar" 
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg transition-colors"
    >
      {/* 1. Dashboard */}
      <button
        onClick={() => {
          setCurrentView("dashboard");
          setSelectedTopicId(null);
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold transition-all min-w-[56px] ${
          currentView === "dashboard"
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <LayoutDashboard className="w-4 h-4 mb-0.5" />
        <span>Dashboard</span>
      </button>

      {/* 2. Learn SAP */}
      <button
        onClick={() => {
          setCurrentView("mm");
          setSelectedTopicId(null);
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold transition-all min-w-[56px] ${
          isLearnActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <BookOpen className="w-4 h-4 mb-0.5" />
        <span>Learn</span>
      </button>

      {/* 3. Global Search */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all min-w-[56px]"
      >
        <Search className="w-4 h-4 mb-0.5" />
        <span>Search</span>
      </button>

      {/* 4. Practice Labs */}
      <button
        onClick={() => {
          setCurrentView("movement_lab");
          setSelectedTopicId(null);
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold transition-all min-w-[56px] ${
          isPracticeActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <FlaskConical className="w-4 h-4 mb-0.5" />
        <span>Practice</span>
      </button>

      {/* 5. AI Copilot */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20 min-w-[56px]"
      >
        <Sparkles className="w-4 h-4 mb-0.5" />
        <span>Copilot</span>
      </button>
    </nav>
  );
};
