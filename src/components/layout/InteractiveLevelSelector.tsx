import React, { useState, useRef, useEffect } from "react";
import { useSap } from "../../context/SapContext";
import { LearningLevel } from "../../types/sap";
import { GraduationCap, ChevronDown, Check, Sparkles, BookOpen, Layers, Briefcase, Network } from "lucide-react";

export const InteractiveLevelSelector: React.FC = () => {
  const { learningLevel, setLearningLevel } = useSap();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stages: {
    key: LearningLevel;
    label: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      key: "BEGINNER",
      label: "Beginner",
      description: "Understand the foundations",
      badge: "Stage 1",
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" />,
      color: "text-emerald-500"
    },
    {
      key: "INTERMEDIATE",
      label: "Intermediate",
      description: "Understand how and why",
      badge: "Stage 2",
      icon: <Layers className="w-3.5 h-3.5 text-blue-500" />,
      color: "text-blue-500"
    },
    {
      key: "ADVANCED",
      label: "Advanced",
      description: "Solve complex problems",
      badge: "Stage 3",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-500" />,
      color: "text-purple-500"
    },
    {
      key: "CONSULTANT",
      label: "Consultant",
      description: "Think like a consultant",
      badge: "Stage 4",
      icon: <Briefcase className="w-3.5 h-3.5 text-amber-500" />,
      color: "text-amber-500"
    },
    {
      key: "ARCHITECT",
      label: "Architect",
      description: "Design enterprise solutions",
      badge: "Stage 5",
      icon: <Network className="w-3.5 h-3.5 text-indigo-500" />,
      color: "text-indigo-500"
    }
  ];

  const currentStage = stages.find(s => s.key === learningLevel) || stages[0];

  return (
    <div className="relative hidden sm:block" ref={dropdownRef}>
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "var(--theme-background-secondary)",
          borderColor: "var(--theme-border)",
          color: "var(--theme-text-primary)"
        }}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-theme-primary transition-all duration-150 interactive-btn shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary/30"
        title="Switch Learning Level Stage"
        aria-label="Select Learning Level"
        aria-expanded={isOpen}
      >
        <span className="p-0.5 rounded">{currentStage.icon}</span>
        <span className="font-bold">{currentStage.label}</span>
        <span className="hidden lg:inline text-[10px] text-slate-400 font-mono">({currentStage.badge})</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)"
          }}
          className="absolute right-0 mt-1.5 w-64 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
        >
          <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
            <span>Learning Stages</span>
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {stages.map(s => {
            const isSelected = learningLevel === s.key;
            return (
              <button
                key={s.key}
                onClick={() => {
                  setLearningLevel(s.key);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl transition-all flex items-start justify-between space-x-2.5 ${
                  isSelected
                    ? "bg-theme-primary-soft border border-theme-primary-border shadow-xs"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <div className="p-1 rounded-lg bg-white dark:bg-slate-800 shadow-xs mt-0.5">
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-xs font-bold ${isSelected ? "text-theme-primary" : "text-slate-900 dark:text-white"}`}>
                        {s.label}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {s.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-theme-primary shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
