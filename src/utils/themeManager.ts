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

  // Determine actual mode (if system, check matchMedia)
  let isDark = mode === "dark";
  if (mode === "system") {
    isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Toggle .dark class on html root for Tailwind dark variants
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Primary Accent & Tonal Scale Tokens
  root.style.setProperty("--primary-50", scale[50]);
  root.style.setProperty("--primary-100", scale[100]);
  root.style.setProperty("--primary-200", scale[200]);
  root.style.setProperty("--primary-300", scale[300]);
  root.style.setProperty("--primary-400", scale[400]);
  root.style.setProperty("--primary-500", scale[500]);
  root.style.setProperty("--primary-600", scale[600]);
  root.style.setProperty("--primary-700", scale[700]);
  root.style.setProperty("--primary-800", scale[800]);
  root.style.setProperty("--primary-900", scale[900]);
  root.style.setProperty("--primary-950", scale[950]);

  // Primary State Tokens
  const primaryRgb = hexToRgb(scale[500]);
  root.style.setProperty("--primary", scale[500]);
  root.style.setProperty("--primary-rgb", primaryRgb);
  root.style.setProperty("--primary-hover", scale[600]);
  root.style.setProperty("--primary-active", scale[700]);
  root.style.setProperty("--primary-focus", scale[400]);
  root.style.setProperty("--primary-disabled", isDark ? scale[900] : scale[200]);
  root.style.setProperty("--primary-soft", isDark ? `rgba(${primaryRgb}, 0.15)` : scale[100]);
  root.style.setProperty("--primary-subtle", isDark ? `rgba(${primaryRgb}, 0.08)` : scale[50]);
  root.style.setProperty("--primary-border", isDark ? scale[700] : scale[200]);
  root.style.setProperty("--primary-glow", `rgba(${primaryRgb}, 0.35)`);
  root.style.setProperty("--primary-selected", isDark ? scale[800] : scale[100]);

  // Semantic Family Tokens (Preserved across all themes)
  root.style.setProperty("--success", "#16A34A");
  root.style.setProperty("--success-soft", isDark ? "rgba(22, 163, 74, 0.15)" : "#DCFCE7");
  root.style.setProperty("--warning", "#D97706");
  root.style.setProperty("--warning-soft", isDark ? "rgba(217, 119, 6, 0.15)" : "#FEF3C7");
  root.style.setProperty("--error", "#DC2626");
  root.style.setProperty("--error-soft", isDark ? "rgba(220, 38, 38, 0.15)" : "#FEE2E2");
  root.style.setProperty("--info", "#0284C7");
  root.style.setProperty("--info-soft", isDark ? "rgba(2, 132, 199, 0.15)" : "#E0F2FE");

  // Surface & Structural Design Tokens
  if (isDark) {
    root.style.setProperty("--background", "#090D16");
    root.style.setProperty("--surface", "#0F172A");
    root.style.setProperty("--surface-hover", "#1E293B");
    root.style.setProperty("--surface-active", "#334155");
    root.style.setProperty("--surface-elevated", "#1E293B");
    root.style.setProperty("--border", "#1E293B");
    root.style.setProperty("--border-hover", "#334155");
    root.style.setProperty("--text-primary", "#F8FAFC");
    root.style.setProperty("--text-secondary", "#94A3B8");
    root.style.setProperty("--text-muted", "#64748B");
  } else {
    root.style.setProperty("--background", "#F8FAFC");
    root.style.setProperty("--surface", "#FFFFFF");
    root.style.setProperty("--surface-hover", "#F1F5F9");
    root.style.setProperty("--surface-active", "#E2E8F0");
    root.style.setProperty("--surface-elevated", "#FFFFFF");
    root.style.setProperty("--border", "#E2E8F0");
    root.style.setProperty("--border-hover", "#CBD5E1");
    root.style.setProperty("--text-primary", "#0F172A");
    root.style.setProperty("--text-secondary", "#475569");
    root.style.setProperty("--text-muted", "#94A3B8");
  }
}
