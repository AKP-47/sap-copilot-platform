import { THEMES, DEFAULT_THEME_ID, AppearanceMode, ColorPalette } from "../data/themes";

function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function applyTheme(themeId: string, mode: AppearanceMode) {
  if (typeof document === "undefined") return;

  const theme: ColorPalette = THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
  const root = document.documentElement;
  const scale = theme.scale;

  // Determine actual light/dark mode
  let isDark = mode === "dark";
  if (mode === "system") {
    isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Toggle .dark class on html root for Tailwind
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  const primaryRgb = hexToRgb(theme.primary);
  const accentRgb = hexToRgb(theme.accent);

  // 1. Primary Colors & Tonal Scales
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-primary-rgb", primaryRgb);
  root.style.setProperty("--theme-primary-hover", scale[600] || theme.primary);
  root.style.setProperty("--theme-primary-active", scale[700] || theme.primary);
  root.style.setProperty("--theme-primary-focus", scale[400] || theme.primary);
  root.style.setProperty("--theme-primary-soft", isDark ? `rgba(${primaryRgb}, 0.18)` : (scale[100] || "#E0E7FF"));
  root.style.setProperty("--theme-primary-subtle", isDark ? `rgba(${primaryRgb}, 0.08)` : (scale[50] || "#F5F3FF"));
  root.style.setProperty("--theme-primary-border", isDark ? (scale[800] || "#1E293B") : (scale[200] || "#C7D2FE"));
  root.style.setProperty("--theme-primary-glow", `rgba(${primaryRgb}, ${isDark ? 0.35 : 0.2})`);

  // 2. Secondary & Accent Tokens
  root.style.setProperty("--theme-secondary", theme.accent);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-accent-soft", `rgba(${accentRgb}, ${isDark ? 0.2 : 0.12})`);

  // 3. Gradients
  root.style.setProperty("--theme-gradient-start", theme.gradientStart);
  root.style.setProperty("--theme-gradient-end", theme.gradientEnd);
  root.style.setProperty("--theme-gradient", `linear-gradient(135deg, ${theme.gradientStart} 0%, ${theme.gradientEnd} 100%)`);
  root.style.setProperty("--theme-gradient-subtle", isDark 
    ? `linear-gradient(135deg, ${theme.darkBg} 0%, ${theme.darkBgSec} 100%)`
    : `linear-gradient(135deg, ${theme.lightBg} 0%, ${theme.lightBgSec} 100%)`
  );

  // 4. Background, Surface & Card Tokens
  const bg = isDark ? theme.darkBg : theme.lightBg;
  const bgSec = isDark ? theme.darkBgSec : theme.lightBgSec;
  const surface = isDark ? theme.darkSurface : theme.lightSurface;
  const surfaceElevated = isDark ? theme.darkSurfaceElevated : theme.lightSurfaceElevated;
  const surfaceHover = isDark ? theme.darkSurfaceElevated : (scale[50] || "#F1F5F9");
  const card = isDark ? theme.darkCard : theme.lightCard;
  const cardHover = isDark ? theme.darkCardHover : theme.lightCardHover;
  const border = isDark ? theme.darkBorder : theme.lightBorder;
  const borderHover = isDark ? theme.darkBorderHover : theme.lightBorderHover;

  root.style.setProperty("--theme-background", bg);
  root.style.setProperty("--theme-background-secondary", bgSec);
  root.style.setProperty("--theme-surface", surface);
  root.style.setProperty("--theme-surface-elevated", surfaceElevated);
  root.style.setProperty("--theme-surface-hover", surfaceHover);
  root.style.setProperty("--theme-card", card);
  root.style.setProperty("--theme-card-hover", cardHover);
  root.style.setProperty("--theme-border", border);
  root.style.setProperty("--theme-border-hover", borderHover);

  // 5. Text Tokens
  if (isDark) {
    root.style.setProperty("--theme-text-primary", "#F8FAFC");
    root.style.setProperty("--theme-text-secondary", "#94A3B8");
    root.style.setProperty("--theme-text-muted", "#64748B");
  } else {
    root.style.setProperty("--theme-text-primary", "#0F172A");
    root.style.setProperty("--theme-text-secondary", "#475569");
    root.style.setProperty("--theme-text-muted", "#94A3B8");
  }

  // 6. Shadows & Glow
  root.style.setProperty("--theme-shadow", isDark 
    ? "0 10px 30px -5px rgba(0, 0, 0, 0.6)" 
    : "0 4px 20px -2px rgba(0, 0, 0, 0.05)"
  );
  root.style.setProperty("--theme-glow", `0 0 25px rgba(${primaryRgb}, 0.25)`);

  // 7. Theme-Aware Semantic Tokens
  root.style.setProperty("--theme-success", "#10B981");
  root.style.setProperty("--theme-warning", "#F59E0B");
  root.style.setProperty("--theme-danger", "#EF4444");
  root.style.setProperty("--theme-info", "#06B6D4");

  // Synchronize with Legacy variable aliases
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--background", bg);
  root.style.setProperty("--surface", surface);
  root.style.setProperty("--border", border);
}
