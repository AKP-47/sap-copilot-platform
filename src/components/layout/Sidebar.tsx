import React from "react";
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
  Factory
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, setSelectedTopicId } = useSap();

  const navGroups: {
    title: string;
    items: { view: AppView; label: string; icon: React.ReactNode; badge?: string }[];
  }[] = [
    {
      title: "Core Modules",
      items: [
        { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
        { view: "mm", label: "SAP MM (Sourcing & Procurement)", icon: <Package className="w-4 h-4 text-amber-600" />, badge: "P2P" },
        { view: "ewm", label: "SAP EWM (Warehouse Mgmt)", icon: <Warehouse className="w-4 h-4 text-blue-600" />, badge: "Full" },
        { view: "integration", label: "MM + EWM Integration", icon: <GitMerge className="w-4 h-4 text-purple-600" />, badge: "E2E" }
      ]
    },
    {
      title: "Interactive Labs",
      items: [
        { view: "movement_lab", label: "Movement Type Lab", icon: <RotateCw className="w-4 h-4 text-emerald-600" />, badge: "40+" },
        { view: "tcodes", label: "T-Code & Fiori Explorer", icon: <Terminal className="w-4 h-4 text-indigo-600" /> },
        { view: "spro_guide", label: "Virtual SPRO IMG Tree", icon: <SlidersHorizontal className="w-4 h-4 text-slate-700" /> },
        { view: "obyc_sim", label: "OBYC T-Accounts Ledger", icon: <Layers className="w-4 h-4 text-orange-600" /> },
        { view: "whse_monitor", label: "EWM Monitor (/SCWM/MON)", icon: <Activity className="w-4 h-4 text-cyan-600" /> },
        { view: "rf_terminal", label: "RF Barcode Scanner (/RFUI)", icon: <Smartphone className="w-4 h-4 text-teal-600" /> },
        { view: "posc_visualizer", label: "POSC & LOSC Visualizer", icon: <GitMerge className="w-4 h-4 text-violet-600" /> },
        { view: "error_doctor", label: "SAP Error & Dump Doctor", icon: <Stethoscope className="w-4 h-4 text-rose-600" />, badge: "RCA" }
      ]
    },
    {
      title: "Real-World & Consulting",
      items: [
        { view: "industry_labs", label: "11 Industry Workbenches", icon: <Factory className="w-4 h-4 text-sky-600" /> },
        { view: "scenarios", label: "Scenario Simulator", icon: <Cpu className="w-4 h-4 text-pink-600" /> },
        { view: "consultant_sim", label: "Consultant Simulator", icon: <Briefcase className="w-4 h-4 text-yellow-600" />, badge: "Pro" },
        { view: "interview_prep", label: "7-Tier Interview Prep", icon: <GraduationCap className="w-4 h-4 text-blue-700" />, badge: "150+ Q" }
      ]
    },
    {
      title: "Career & Deliverables",
      items: [
        { view: "wricef_builder", label: "WRICEF Spec Generator", icon: <FileCode2 className="w-4 h-4 text-slate-600" /> },
        { view: "flashcards", label: "Spaced Flashcards", icon: <Bookmark className="w-4 h-4 text-green-600" /> },
        { view: "study_notes", label: "Study Notes & Cheatsheets", icon: <Bookmark className="w-4 h-4 text-slate-600" /> },
        { view: "career", label: "Certification & Career", icon: <Award className="w-4 h-4 text-amber-500" /> }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-[calc(100vh-4rem)] sticky top-16 border-r border-slate-800 select-none overflow-y-auto">
      {/* Academy Tag */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Official Curriculum</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">
            S/4HANA 2026
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 py-3 px-3 space-y-5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h3 className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </h3>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => {
                      setCurrentView(item.view);
                      setSelectedTopicId(null);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? "bg-blue-800 text-white" : "bg-slate-800 text-slate-400"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
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
