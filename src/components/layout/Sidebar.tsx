import React, { useState } from "react";
import { useSap, AppView } from "../../context/SapContext";
import { 
  LayoutDashboard,
  Brain,
  Search,
  Dna,
  Network,
  Sliders,
  Building2,
  Sparkles, 
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
  const { currentView, setCurrentView, setSelectedTopicId, setIsAppearanceOpen, learningLevel } = useSap();

  // Accordion state for clean collapsible categories
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    learn: true,
    practice: true,
    career: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const beginnerCategory = {
    id: "foundations",
    title: "Beginner Academy (Start Here)",
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
    items: [
      { view: "foundations" as AppView, label: "Business & SAP Foundations", icon: <Building2 className="w-4 h-4 text-emerald-400" />, badge: "Zero Pre-req" }
    ]
  };

  const navCategories = [
    ...(learningLevel === "BEGINNER" ? [beginnerCategory] : []),
    {
      id: "learn",
      title: "Learn SAP",
      icon: <BookOpen className="w-3.5 h-3.5 text-theme-primary" />,
      items: [
        { view: "mm" as AppView, label: "SAP MM (Sourcing & Procurement)", icon: <Package className="w-4 h-4 text-amber-500" />, badge: "P2P" },
        { view: "ewm" as AppView, label: "SAP EWM (Warehouse Execution)", icon: <Warehouse className="w-4 h-4 text-theme-primary" />, badge: "Full" },
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
      id: "consultant_suite",
      title: "Think Like a Consultant",
      icon: <Briefcase className="w-3.5 h-3.5 text-amber-400" />,
      items: [
        { view: "adaptive_mastery" as AppView, label: "Level-Adaptive Mastery", icon: <SlidersHorizontal className="w-4 h-4 text-sky-400" />, badge: "Adaptive" },
        { view: "business_reasoning" as AppView, label: "Business ➔ SAP Reasoning", icon: <Brain className="w-4 h-4 text-amber-400" />, badge: "Signature" },
        { view: "enterprise_map" as AppView, label: "Enterprise Connection Map", icon: <GitMerge className="w-4 h-4 text-purple-400" />, badge: "E2E" },
        { view: "concept_dna" as AppView, label: "Concept DNA (360°)", icon: <Dna className="w-4 h-4 text-indigo-400" /> },
        { view: "impact_sim" as AppView, label: "Impact & Trade-Off Sim", icon: <Sliders className="w-4 h-4 text-amber-400" /> },
        { view: "investigation" as AppView, label: "Consultant Investigation", icon: <Search className="w-4 h-4 text-emerald-400" />, badge: "RCA" },
        { view: "knowledge_map" as AppView, label: "Knowledge Map & Mastery", icon: <Network className="w-4 h-4 text-teal-400" /> },
        { view: "passport" as AppView, label: "Consultant Passport", icon: <Award className="w-4 h-4 text-yellow-400" />, badge: "Skill Radar" }
      ]
    },
    {
      id: "career",
      title: "Career & Interview",
      icon: <Target className="w-3.5 h-3.5 text-amber-400" />,
      items: [
        { view: "interview_prep" as AppView, label: "7-Tier Interview Prep", icon: <GraduationCap className="w-4 h-4 text-theme-primary" />, badge: "150+ Q" },
        { view: "consultant_sim" as AppView, label: "Consultant Simulator", icon: <Briefcase className="w-4 h-4 text-yellow-500" />, badge: "Pro" },
        { view: "wricef_builder" as AppView, label: "WRICEF Spec Builder", icon: <FileCode2 className="w-4 h-4 text-indigo-400" /> },
        { view: "flashcards" as AppView, label: "Interactive Flashcards", icon: <Layers className="w-4 h-4 text-cyan-400" /> },
        { view: "study_notes" as AppView, label: "Study Notes & Configs", icon: <Bookmark className="w-4 h-4 text-emerald-400" /> },
        { view: "career" as AppView, label: "Career Roadmap & Cert", icon: <Award className="w-4 h-4 text-amber-400" /> }
      ]
    }
  ];

  return (
    <aside 
      style={{
        backgroundColor: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
        color: "var(--theme-text-secondary)"
      }}
      className="w-64 shrink-0 hidden md:flex flex-col border-r min-h-[calc(100vh-4rem)] select-none transition-colors duration-200"
    >
      <div className="flex-1 py-4 px-3 space-y-4 overflow-y-auto">
        
        {/* Primary Dashboard Link */}
        <button
          onClick={() => {
            setCurrentView("dashboard");
            setSelectedTopicId(null);
          }}
          style={{
            backgroundColor: currentView === "dashboard" ? "var(--theme-primary)" : "transparent",
            color: currentView === "dashboard" ? "#ffffff" : "var(--theme-text-primary)"
          }}
          className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-xs font-bold rounded-xl transition-all ${
            currentView === "dashboard"
              ? "shadow-md shadow-black/20"
              : "hover:bg-theme-surface-hover"
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
                style={{ color: "var(--theme-text-muted)" }}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center space-x-1.5">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
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
                          backgroundColor: isActive ? "var(--theme-primary)" : "transparent",
                          color: isActive ? "#ffffff" : "var(--theme-text-secondary)"
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          isActive
                            ? "font-semibold shadow-md shadow-black/20"
                            : "hover:bg-theme-surface-hover hover:text-theme-text-primary"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span 
                            style={{
                              backgroundColor: isActive ? "rgba(0,0,0,0.2)" : "var(--theme-primary-soft)",
                              color: isActive ? "#ffffff" : "var(--theme-primary)"
                            }}
                            className="text-[10px] px-1.5 py-0.2 rounded font-bold"
                          >
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
      <div 
        style={{ borderColor: "var(--theme-border)" }}
        className="px-3 py-2 border-t space-y-1"
      >
        <button
          onClick={() => setIsAppearanceOpen(true)}
          style={{
            backgroundColor: "var(--theme-primary-soft)",
            borderColor: "var(--theme-primary-border)",
            color: "var(--theme-text-primary)"
          }}
          className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg border transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center space-x-2">
            <Palette className="w-3.5 h-3.5 text-theme-primary" />
            <span>Theme & Colors</span>
          </div>
          <span 
            style={{ backgroundColor: "var(--theme-primary)", color: "#ffffff" }}
            className="text-[10px] font-mono px-1.5 py-0.2 rounded font-bold"
          >
            28 Themes
          </span>
        </button>
      </div>

      {/* TagSkills Institute Direct Link Banner */}
      <div 
        style={{
          backgroundColor: "var(--theme-card)",
          borderColor: "var(--theme-border)"
        }}
        className="p-3 border m-2 rounded-xl"
      >
        <div style={{ color: "var(--theme-text-muted)" }} className="text-xs mb-2 font-medium">
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
