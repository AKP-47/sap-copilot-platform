import React from "react";
import { useSap } from "../../context/SapContext";
import { SupportedLanguage } from "../../data/translations";
import { Search, Sparkles, Palette, ShieldCheck, Lock } from "lucide-react";
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
    setIsAppearanceOpen,
    setCurrentView,
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
    <header 
      style={{
        backgroundColor: "var(--theme-surface)",
        borderColor: "var(--theme-border)",
        color: "var(--theme-text-primary)"
      }}
      className="sticky top-0 z-30 backdrop-blur-md border-b shadow-sm transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Institute Branding (Top-Left) */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsWelcomeOpen(true)}
              className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-theme-surface-hover transition-colors focus:outline-none"
              title="TagSkills Official Institute – Click for Institute Overview"
            >
              <img 
                src="/tagskills-logo.jpg" 
                alt="TagSkills Official Institute Logo" 
                className="h-8 w-auto object-contain" 
              />
              <div 
                style={{ borderColor: "var(--theme-border)" }}
                className="hidden lg:block text-left pl-2 border-l"
              >
                <span 
                  style={{ color: "var(--theme-text-muted)" }}
                  className="text-[10px] uppercase font-bold tracking-wider block leading-none"
                >
                  Official Institute
                </span>
                <span 
                  style={{ color: "var(--theme-text-primary)" }}
                  className="text-xs font-extrabold tracking-tight leading-tight"
                >
                  TagSkills Academy
                </span>
              </div>
            </button>
          </div>

          {/* Global Search Bar (Center) */}
          <div className="flex-1 max-w-xl mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                backgroundColor: "var(--theme-background-secondary)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-text-secondary)"
              }}
              className="w-full flex items-center justify-between px-3.5 py-1.5 text-sm rounded-lg border transition-colors hover:border-theme-primary"
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-2 text-theme-primary" />
                <span className="truncate">{t.searchPlaceholder}</span>
              </span>
              <div className="hidden sm:flex items-center space-x-1">
                <kbd 
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-border)",
                    color: "var(--theme-text-muted)"
                  }}
                  className="px-1.5 py-0.5 text-xs rounded border"
                >
                  /
                </kbd>
                <kbd 
                  style={{
                    backgroundColor: "var(--theme-surface)",
                    borderColor: "var(--theme-border)",
                    color: "var(--theme-text-muted)"
                  }}
                  className="px-1.5 py-0.5 text-xs rounded border"
                >
                  ⌘K
                </kbd>
              </div>
            </button>
          </div>

          {/* Controls: Level Selector, Language, Theme Palette, AI Copilot */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Level Selector */}
            <div className="relative hidden sm:block">
              <select
                value={learningLevel}
                onChange={(e) => setLearningLevel(e.target.value as LearningLevel)}
                style={{
                  backgroundColor: "var(--theme-background-secondary)",
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-text-primary)"
                }}
                className="text-xs font-medium py-1.5 pl-3 pr-7 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                style={{
                  backgroundColor: "var(--theme-background-secondary)",
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-text-primary)"
                }}
                className="text-xs font-medium py-1.5 pl-2.5 pr-6 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Select Explanation Language"
              >
                {languages.map(lang => (
                  <option key={lang.key} value={lang.key}>
                    🌐 {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Owner Analytics Tracker Button */}
            <button
              onClick={() => setCurrentView("owner_analytics")}
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                borderColor: "rgba(245, 158, 11, 0.35)",
                color: "#d97706"
              }}
              className="flex items-center text-xs font-extrabold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all hover:scale-105 shadow-sm dark:text-amber-400"
              title="Access Restricted Owner Analytics & Visitor Tracker"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:mr-1 text-amber-500" />
              <span className="hidden sm:inline">Owner Tracker</span>
            </button>

            {/* Theme & Palette Library Modal Trigger */}
            <button
              onClick={() => setIsAppearanceOpen(true)}
              style={{
                backgroundColor: "var(--theme-primary-soft)",
                borderColor: "var(--theme-primary-border)",
                color: "var(--theme-primary)"
              }}
              className="flex items-center text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all hover:scale-105 shadow-sm"
              title="Appearance & Color Palette Library"
              aria-label="Open Appearance and Color Theme Library"
            >
              <Palette className="w-3.5 h-3.5 sm:mr-1.5 text-theme-primary" />
              <span className="hidden md:inline">Themes</span>
            </button>

            {/* AI Copilot Drawer Trigger */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              style={{
                backgroundImage: "var(--theme-gradient)"
              }}
              className="flex items-center text-xs font-bold text-white px-3 py-1.5 rounded-lg shadow-sm transition-all transform hover:scale-105"
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
