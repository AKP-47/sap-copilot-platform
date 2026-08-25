import React, { useState } from "react";
import { useSap, AppView } from "../../context/SapContext";
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  GitMerge, 
  RotateCw, 
  Terminal, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  FileCode2, 
  SlidersHorizontal, 
  Layers, 
  Activity, 
  Smartphone, 
  Stethoscope, 
  Bookmark, 
  Award,
  ExternalLink,
  Factory,
  Palette,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Target
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, setSelectedTopicId, setIsAppearanceOpen } = useSap();

  // Accordion state for clean collapsible categories
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    learn: true,
    practice: true,
    career: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const navCategories = [
    {
      id: "learn",
      title: "Learn SAP",
      icon: <BookOpen className="w-3.5 h-3.5 text-blue-400" />,
      items: [
        { view: "mm" as AppView, label: "SAP MM (Sourcing & Procurement)", icon: <Package className="w-4 h-4 text-amber-500" />, badge: "P2P" },
        { view: "ewm" as AppView, label: "SAP EWM (Warehouse Execution)", icon: <Warehouse className="w-4 h-4 text-blue-500" />, badge: "Full" },
        { view: "integration" as AppView, label: "MM + EWM Integration Hub", icon: <GitMerge className="w-4 h-4 text-purple-500" />, badge: "E2E" }
      ]
    },
    {
      id: "practice",
      title: "Practice & Simulators",
      icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />,
      items: [
        { view: "scenarios" as AppView, label: "Scenario Simulator", icon: <Cpu className="w-4 h-4 text-pink-500" /> },
        { view: "movement_lab" as AppView, label: "Movement Type Lab (40+)", icon: <RotateCw className="w-4 h-4 text-emerald-500" />, badge: "40+" },
        { view: "tcodes" as AppView, label: "T-Code & Fiori Explorer", icon: <Terminal className="w-4 h-4 text-indigo-500" /> },
        { view: "spro_guide" as AppView, label: "Virtual SPRO IMG Tree", icon: <SlidersHorizontal className="w-4 h-4 text-slate-400" /> },
        { view: "obyc_sim" as AppView, label: "OBYC T-Accounts Ledger", icon: <Layers className="w-4 h-4 text-orange-500" /> },
        { view: "whse_monitor" as AppView, label: "Warehouse Monitor (/SCWM/MON)", icon: <Activity className="w-4 h-4 text-cyan-500" /> },
        { view: "rf_terminal" as AppView, label: "RF Barcode Scanner (/RFUI)", icon: <Smartphone className="w-4 h-4 text-teal-500" /> },
        { view: "posc_visualizer" as AppView, label: "POSC & LOSC Visualizer", icon: <GitMerge className="w-4 h-4 text-violet-500" /> },
        { view: "error_doctor" as AppView, label: "SAP Error & Dump Doctor", icon: <Stethoscope className="w-4 h-4 text-rose-500" />, badge: "RCA" },
        { view: "industry_labs" as AppView, label: "11 Industry Workbenches", icon: <Factory className="w-4 h-4 text-sky-500" /> }
      ]
    },
    {
      id: "career",
      title: "Career & Interview",
      icon: <Target className="w-3.5 h-3.5 text-amber-400" />,
      items: [
        { view: "interview_prep" as AppView, label: "7-Tier Interview Prep", icon: <GraduationCap className="w-4 h-4 text-blue-400" />, badge: "150+ Q" },
        { view: "consultant_sim" as AppView, label: "Consultant Simulator", icon: <Briefcase className="w-4 h-4 text-yellow-500" />, badge: "Pro" },
        { view: "wricef_builder" as AppView, label: "WRICEF Spec Builder", icon: <FileCode2 className="w-4 h-4 text-indigo-400" /> },
        { view: "flashcards" as AppView, label: "Interactive Flashcards", icon: <Layers className="w-4 h-4 text-cyan-400" /> },
        { view: "study_notes" as AppView, label: "Study Notes & Configs", icon: <Bookmark className="w-4 h-4 text-emerald-400" /> },
        { view: "career" as AppView, label: "Career Roadmap & Cert", icon: <Award className="w-4 h-4 text-amber-400" /> }
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 min-h-[calc(100vh-4rem)] select-none">
      <div className="flex-1 py-4 px-3 space-y-4 overflow-y-auto">
        
        {/* Primary Dashboard Link */}
        <button
          onClick={() => {
            setCurrentView("dashboard");
            setSelectedTopicId(null);
          }}
          style={{
            backgroundColor: currentView === "dashboard" ? "var(--primary)" : undefined
          }}
          className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all ${
            currentView === "dashboard"
              ? "text-white shadow-md shadow-black/20"
              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        {/* Categorized Collapsible Navigation Groups */}
        {navCategories.map((category) => {
          const isOpen = openSections[category.id] !== false;
          return (
            <div key={category.id} className="space-y-1 pt-1">
              <button
                onClick={() => toggleSection(category.id)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-1.5">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-0.5 pl-1">
                  {category.items.map((item) => {
                    const isActive = currentView === item.view;
                    return (
                      <button
                        key={item.view}
                        onClick={() => {
                          setCurrentView(item.view);
                          setSelectedTopicId(null);
                        }}
                        style={{
                          backgroundColor: isActive ? "var(--primary)" : undefined
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          isActive
                            ? "text-white font-semibold shadow-md shadow-black/20"
                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                            isActive ? "bg-black/20 text-white" : "bg-slate-800 text-slate-400"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Settings & Appearance */}
      <div className="px-3 py-2 border-t border-slate-800 space-y-1">
        <button
          onClick={() => setIsAppearanceOpen(true)}
          className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme & Colors</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-bold">
            29 Themes
          </span>
        </button>
      </div>

      {/* TagSkills Institute Direct Link Banner */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 m-2 rounded-xl">
        <div className="text-xs text-slate-400 mb-2 font-medium">
          Accelerate your career with live mentorship from industry leaders.
        </div>
        <a
          href="https://www.tagskills.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg transition-all shadow-sm"
        >
          <span>Visit TagSkills</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
