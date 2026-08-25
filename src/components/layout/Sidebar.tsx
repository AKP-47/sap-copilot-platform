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
  Factory,
  Palette
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, setSelectedTopicId, setIsAppearanceOpen } = useSap();

  const navGroups: {
    title: string;
    items: { view: AppView; label: string; icon: React.ReactNode; badge?: string }[];
  }[] = [
    {
      title: "Core Modules",
      items: [
        { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
        { view: "mm", label: "SAP MM (Sourcing & Procurement)", icon: <Package className="w-4 h-4 text-amber-500" />, badge: "P2P" },
        { view: "ewm", label: "SAP EWM (Warehouse Mgmt)", icon: <Warehouse className="w-4 h-4 text-blue-500" />, badge: "Full" },
        { view: "integration", label: "MM + EWM Integration", icon: <GitMerge className="w-4 h-4 text-purple-500" />, badge: "E2E" }
      ]
    },
    {
      title: "Interactive Labs",
      items: [
        { view: "movement_lab", label: "Movement Type Lab", icon: <RotateCw className="w-4 h-4 text-emerald-500" />, badge: "40+" },
        { view: "tcodes", label: "T-Code & Fiori Explorer", icon: <Terminal className="w-4 h-4 text-indigo-500" /> },
        { view: "spro_guide", label: "Virtual SPRO IMG Tree", icon: <SlidersHorizontal className="w-4 h-4 text-slate-400" /> },
        { view: "obyc_sim", label: "OBYC T-Accounts Ledger", icon: <Layers className="w-4 h-4 text-orange-500" /> },
        { view: "whse_monitor", label: "EWM Monitor (/SCWM/MON)", icon: <Activity className="w-4 h-4 text-cyan-500" /> },
        { view: "rf_terminal", label: "RF Barcode Scanner (/RFUI)", icon: <Smartphone className="w-4 h-4 text-teal-500" /> },
        { view: "posc_visualizer", label: "POSC & LOSC Visualizer", icon: <GitMerge className="w-4 h-4 text-violet-500" /> },
        { view: "error_doctor", label: "SAP Error & Dump Doctor", icon: <Stethoscope className="w-4 h-4 text-rose-500" />, badge: "RCA" }
      ]
    },
    {
      title: "Real-World & Consulting",
      items: [
        { view: "industry_labs", label: "11 Industry Workbenches", icon: <Factory className="w-4 h-4 text-sky-500" /> },
        { view: "scenarios", label: "Scenario Simulator", icon: <Cpu className="w-4 h-4 text-pink-500" /> },
        { view: "consultant_sim", label: "Consultant Simulator", icon: <Briefcase className="w-4 h-4 text-yellow-500" />, badge: "Pro" },
        { view: "interview_prep", label: "7-Tier Interview Prep", icon: <GraduationCap className="w-4 h-4 text-blue-400" />, badge: "150+ Q" }
      ]
    },
    {
      title: "Career & Study Tools",
      items: [
        { view: "career", label: "Career Accelerator & Cert", icon: <Award className="w-4 h-4 text-amber-400" /> },
        { view: "wricef_builder", label: "WRICEF Spec Builder", icon: <FileCode2 className="w-4 h-4 text-indigo-400" /> },
        { view: "flashcards", label: "Interactive Flashcards", icon: <Layers className="w-4 h-4 text-cyan-400" /> },
        { view: "study_notes", label: "My Study Notes & Configs", icon: <Bookmark className="w-4 h-4 text-emerald-400" /> }
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 min-h-[calc(100vh-4rem)]">
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
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
                    style={{
                      backgroundColor: isActive ? "var(--primary)" : undefined
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-all ${
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
          </div>
        ))}
      </div>

      {/* Theme & Palette Library Button in Sidebar */}
      <div className="px-3 py-2 border-t border-slate-800">
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
