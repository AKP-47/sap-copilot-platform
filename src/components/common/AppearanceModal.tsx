import React, { useEffect } from "react";
import { useSap } from "../../context/SapContext";
import { X, Check, Sun, Moon, Laptop, Palette, Sparkles, RotateCcw } from "lucide-react";
import { STANDARD_THEMES, PREMIUM_THEMES, DEFAULT_THEME_ID, THEMES, ColorPalette, AppearanceMode } from "../../data/themes";

export const AppearanceModal: React.FC = () => {
  const { 
    isAppearanceOpen, 
    setIsAppearanceOpen, 
    colorTheme, 
    setColorTheme, 
    previewTheme, 
    setPreviewTheme, 
    appearanceMode, 
    setAppearanceMode 
  } = useSap();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAppearanceOpen) {
        setPreviewTheme(null);
        setIsAppearanceOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAppearanceOpen, setIsAppearanceOpen, setPreviewTheme]);

  if (!isAppearanceOpen) return null;

  const activeThemeId = previewTheme || colorTheme;

  const modeOptions: { key: AppearanceMode; label: string; icon: React.ReactNode }[] = [
    { key: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { key: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { key: "system", label: "System", icon: <Laptop className="w-4 h-4" /> }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appearance-modal-title"
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] transition-colors duration-200"
        onMouseLeave={() => setPreviewTheme(null)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-5 sm:p-6 relative shrink-0 border-b border-slate-800">
          <button
            onClick={() => {
              setPreviewTheme(null);
              setIsAppearanceOpen(false);
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Close Appearance Settings"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 mb-1 text-amber-400">
            <Palette className="w-5 h-5" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
              Design System & Themes
            </span>
          </div>

          <h2 id="appearance-modal-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Appearance & Color Palette Library
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Personalize your SAP MM & EWM workspace with 29 enterprise palettes and complete 50–950 tonal scales. Hover over any swatch for instant live preview.
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 space-y-8 overflow-y-auto bg-slate-50/60 dark:bg-slate-950/40">
          
          {/* ============================================================ */}
          {/* SECTION 1: APPEARANCE MODE (Light / Dark / System)          */}
          {/* ============================================================ */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Appearance Mode
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your preferred surface contrast and background lighting.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              {modeOptions.map(opt => {
                const isSelected = appearanceMode === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setAppearanceMode(opt.key)}
                    className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECTION 2: PREMIUM ENTERPRISE THEMES (13 Themes)             */}
          {/* ============================================================ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1 bg-amber-400/20 text-amber-500 dark:text-amber-400 rounded-md border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Premium Enterprise Themes (13)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Multi-tone Accents
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {PREMIUM_THEMES.map((theme: ColorPalette) => {
                const isSelected = colorTheme === theme.id;
                const isPreview = previewTheme === theme.id;
                const scale = theme.scale;

                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setColorTheme(theme.id);
                      setPreviewTheme(null);
                    }}
                    onMouseEnter={() => setPreviewTheme(theme.id)}
                    onFocus={() => setPreviewTheme(theme.id)}
                    className={`relative text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 border-slate-900 dark:border-amber-400 shadow-md ring-2 ring-slate-900/10 dark:ring-amber-400/20"
                        : isPreview
                        ? "bg-white dark:bg-slate-800 border-blue-400 dark:border-blue-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
                    }`}
                    aria-label={`Select ${theme.name} Theme`}
                    aria-pressed={isSelected}
                  >
                    <div>
                      {/* Gradient Bar Preview */}
                      <div className="h-4 rounded-lg overflow-hidden flex shadow-inner mb-2.5">
                        <div className="flex-1" style={{ backgroundColor: scale[300] }} />
                        <div className="flex-1" style={{ backgroundColor: scale[500] }} />
                        <div className="flex-1" style={{ backgroundColor: scale[600] }} />
                        <div className="flex-1" style={{ backgroundColor: scale[700] }} />
                        <div className="flex-1" style={{ backgroundColor: scale[900] }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
                          <span>{theme.name}</span>
                          {theme.id === DEFAULT_THEME_ID && (
                            <span className="ml-1.5 text-[9px] font-mono px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">
                              DEFAULT
                            </span>
                          )}
                        </span>

                        {isSelected && (
                          <span className="p-0.5 bg-emerald-600 text-white rounded-full">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight line-clamp-2">
                        {theme.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 pt-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: theme.primary }} />
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        {theme.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* SECTION 3: STANDARD COLOR PALETTES (16 Colors)               */}
          {/* ============================================================ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Standard Colors (16)
              </h3>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Pure Tonal Scales (50–950)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STANDARD_THEMES.map((theme: ColorPalette) => {
                const isSelected = colorTheme === theme.id;
                const isPreview = previewTheme === theme.id;
                const scale = theme.scale;

                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setColorTheme(theme.id);
                      setPreviewTheme(null);
                    }}
                    onMouseEnter={() => setPreviewTheme(theme.id)}
                    onFocus={() => setPreviewTheme(theme.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected
                        ? "bg-white dark:bg-slate-800 border-slate-900 dark:border-blue-400 shadow-md ring-2 ring-slate-900/10"
                        : isPreview
                        ? "bg-white dark:bg-slate-800 border-blue-400 dark:border-blue-500 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                    aria-label={`Select ${theme.name} color palette`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="w-4 h-4 rounded-full shadow-sm border border-black/10 shrink-0" 
                          style={{ backgroundColor: theme.primary }} 
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {theme.name}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="p-0.5 bg-emerald-600 text-white rounded-full shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>

                    {/* Tonal Dots Strip (100, 300, 500, 700, 900) */}
                    <div className="flex items-center space-x-1 pt-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scale[100] }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scale[300] }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scale[500] }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scale[700] }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scale[900] }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <span>Active Theme:</span>
            <span className="font-bold text-slate-900 dark:text-white capitalize">
              {THEMES[activeThemeId]?.name || "SAP Blue"}
            </span>
            {previewTheme && (
              <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono">
                Previewing
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setColorTheme(DEFAULT_THEME_ID);
                setAppearanceMode("light");
                setPreviewTheme(null);
              }}
              className="flex items-center space-x-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default (SAP Blue)</span>
            </button>

            <button
              onClick={() => {
                setPreviewTheme(null);
                setIsAppearanceOpen(false);
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
