import React, { useState, useRef, useEffect } from "react";
import { useSap } from "../../context/SapContext";
import { Sun, Moon, Laptop, Palette, ChevronDown, Check } from "lucide-react";
import { AppearanceMode } from "../../data/themes";

export const ThemeModeToggle: React.FC = () => {
  const { appearanceMode, setAppearanceMode, setIsAppearanceOpen } = useSap();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { mode: AppearanceMode; label: string; icon: React.ReactNode }[] = [
    { mode: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { mode: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5 text-blue-400" /> },
    { mode: "system", label: "System", icon: <Laptop className="w-3.5 h-3.5 text-slate-400" /> }
  ];

  const currentOption = options.find(o => o.mode === appearanceMode) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Primary Toggle Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "var(--theme-background-secondary)",
          borderColor: "var(--theme-border)",
          color: "var(--theme-text-primary)"
        }}
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold hover:border-theme-primary transition-all duration-150 interactive-btn shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary/30"
        title="Change Appearance Mode (Light / Dark / System)"
        aria-label="Theme switcher"
        aria-expanded={isOpen}
      >
        <span>{currentOption.icon}</span>
        <span className="hidden sm:inline capitalize">{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Animated Dropdown Menu */}
      {isOpen && (
        <div 
          style={{
            backgroundColor: "var(--theme-surface)",
            borderColor: "var(--theme-border)"
          }}
          className="absolute right-0 mt-1.5 w-48 rounded-xl border shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5"
        >
          <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            Appearance
          </div>

          {options.map(opt => {
            const isSelected = appearanceMode === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setAppearanceMode(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSelected 
                    ? "bg-theme-primary-soft text-theme-primary font-bold" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-theme-primary" />}
              </button>
            );
          })}

          <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />

          {/* Palette Library Trigger */}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAppearanceOpen(true);
            }}
            className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme Palettes (28)</span>
          </button>
        </div>
      )}

    </div>
  );
};
