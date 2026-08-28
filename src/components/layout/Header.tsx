import { LogOut } from "lucide-react";
import { useUserAuth } from "../../context/UserAuthContext";
import { User as UserIcon } from "lucide-react";
import React from "react";
import { useSap } from "../../context/SapContext";
import { SupportedLanguage } from "../../data/translations";
import { Search, Sparkles, Palette, ShieldCheck, Lock } from "lucide-react";
import { LearningLevel } from "../../types/sap";

export const Header: React.FC = () => {
  const { currentUser, isAuthenticated, openAuthModal, signOutUser } = useUserAuth();
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
          
          {/* Logo & Brand (Top-Left) */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsWelcomeOpen(true)}
              className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-theme-surface-hover transition-colors focus:outline-none"
              title="TagSkills – Click for Overview"
            >
              <img 
                src="/tagskills-logo.jpg" 
                alt="TagSkills Logo" 
                className="h-8 w-auto object-contain" 
              />
              <span
                style={{ color: "var(--theme-text-primary)" }}
                className="hidden lg:block text-sm font-extrabold tracking-tight leading-none"
              >
                TagSkills
              </span>
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

            {/* User Account / Sign In Trigger */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => openAuthModal("profile")}
                  style={{
                    backgroundColor: "var(--theme-background-secondary)",
                    borderColor: "var(--theme-border)"
                  }}
                  className="flex items-center space-x-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                  title="View Learning Profile & Settings"
                >
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline truncate max-w-[90px]">{currentUser.name.split(" ")[0]}</span>
                </button>
                <button
                  onClick={signOutUser}
                  style={{
                    backgroundColor: "var(--theme-background-secondary)",
                    borderColor: "var(--theme-border)"
                  }}
                  className="p-1.5 rounded-lg border text-slate-400 hover:text-rose-500 transition-colors"
                  title="Sign Out of SAP Copilot"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => openAuthModal("signin")}
                  style={{
                    backgroundColor: "var(--theme-background-secondary)",
                    borderColor: "var(--theme-border)",
                    color: "var(--theme-text-primary)"
                  }}
                  className="flex items-center text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                >
                  <UserIcon className="w-3.5 h-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="hidden md:flex items-center text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm transition-all hover:scale-105"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}



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
