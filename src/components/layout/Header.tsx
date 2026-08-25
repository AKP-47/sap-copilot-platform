import React from "react";
import { useSap } from "../../context/SapContext";
import { SupportedLanguage } from "../../data/translations";
import { Search, Sparkles } from "lucide-react";
import { LearningLevel } from "../../types/sap";

export const Header: React.FC = () => {
  const { 
    learningLevel, 
    setLearningLevel, 
    language, 
    setLanguage, 
    setIsSearchOpen, 
    setIsCopilotOpen,
    setIsWelcomeOpen,
    t 
  } = useSap();

  const levels: { key: LearningLevel; label: string }[] = [
    { key: "BEGINNER", label: t.levelBeginner },
    { key: "INTERMEDIATE", label: t.levelIntermediate },
    { key: "PROFESSIONAL", label: t.levelProfessional },
    { key: "CONSULTANT", label: t.levelConsultant },
    { key: "INTERVIEW", label: "Interview Prep" }
  ];

  const languages: { key: SupportedLanguage; label: string }[] = [
    { key: "en", label: "English" },
    { key: "hi", label: "हिंदी (Hindi)" },
    { key: "de", label: "Deutsch" },
    { key: "es", label: "Español" },
    { key: "fr", label: "Français" },
    { key: "te", label: "తెలుగు (Telugu)" },
    { key: "ta", label: "தமிழ் (Tamil)" },
    { key: "mr", label: "मराठी (Marathi)" }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Institute Branding (Top-Left) */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsWelcomeOpen(true)}
              className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
              title="TagSkills Official Institute – Click for Institute Overview"
            >
              <img 
                src="/tagskills-logo.jpg" 
                alt="TagSkills Official Institute Logo" 
                className="h-8 w-auto object-contain" 
              />
              <div className="hidden lg:block text-left pl-1 border-l border-slate-200">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block leading-none">
                  Official Institute
                </span>
                <span className="text-xs font-extrabold text-slate-900 tracking-tight leading-tight">
                  TagSkills Academy
                </span>
              </div>
            </button>
          </div>

          {/* Global Search Bar (Center) */}
          <div className="flex-1 max-w-xl mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors"
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-2 text-slate-400" />
                <span className="truncate">{t.searchPlaceholder}</span>
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-slate-400 bg-white rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Controls: Level Selector, Language, AI Copilot */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Level Selector */}
            <div className="relative hidden sm:block">
              <select
                value={learningLevel}
                onChange={(e) => setLearningLevel(e.target.value as LearningLevel)}
                className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-800 py-1.5 pl-3 pr-7 rounded-lg border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(l => (
                  <option key={l.key} value={l.key}>
                    🎓 Level: {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-800 py-1.5 pl-2.5 pr-6 rounded-lg border border-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Select Explanation Language"
              >
                {languages.map(lang => (
                  <option key={lang.key} value={lang.key}>
                    🌐 {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Copilot Drawer Trigger */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all transform hover:scale-105"
              title="Open AI SAP Expert Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>AI Copilot</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
