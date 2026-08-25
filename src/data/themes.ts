// =========================================================================
// SAP COPILOT & TAGSKILLS PROFESSIONAL COLOR PALETTE & DESIGN SYSTEM
// =========================================================================

export type ColorThemeCategory = "standard" | "premium";

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  category: ColorThemeCategory;
  primary: string;
  description: string;
  scale: ColorScale;
}

export type AppearanceMode = "light" | "dark" | "system";

export const THEMES: Record<string, ColorPalette> = {
  "blue": {
    "id": "blue",
    "name": "Blue",
    "category": "standard",
    "primary": "#3B82F6",
    "description": "Clean, reliable modern blue palette",
    "scale": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a",
      "950": "#172554"
    }
  },
  "sky": {
    "id": "sky",
    "name": "Sky",
    "category": "standard",
    "primary": "#0EA5E9",
    "description": "Vibrant sky blue with fresh airy tones",
    "scale": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
      "950": "#082f49"
    }
  },
  "indigo": {
    "id": "indigo",
    "name": "Indigo",
    "category": "standard",
    "primary": "#6366F1",
    "description": "Deep intellectual indigo for focused learning",
    "scale": {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#6366f1",
      "600": "#4f46e5",
      "700": "#4338ca",
      "800": "#3730a3",
      "900": "#312e81",
      "950": "#1e1b4b"
    }
  },
  "violet": {
    "id": "violet",
    "name": "Violet",
    "category": "standard",
    "primary": "#8B5CF6",
    "description": "Creative violet with high contrast elegance",
    "scale": {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95",
      "950": "#2e1065"
    }
  },
  "purple": {
    "id": "purple",
    "name": "Purple",
    "category": "standard",
    "primary": "#A855F7",
    "description": "Rich regal purple with modern aesthetic",
    "scale": {
      "50": "#faf5ff",
      "100": "#f3e8ff",
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
      "500": "#a855f7",
      "600": "#9333ea",
      "700": "#7e22ce",
      "800": "#6b21a8",
      "900": "#581c87",
      "950": "#3b0764"
    }
  },
  "pink": {
    "id": "pink",
    "name": "Pink",
    "category": "standard",
    "primary": "#EC4899",
    "description": "Energetic rose pink with vivid accents",
    "scale": {
      "50": "#fdf2f8",
      "100": "#fce7f3",
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
      "500": "#ec4899",
      "600": "#db2777",
      "700": "#be185d",
      "800": "#9d174d",
      "900": "#831843",
      "950": "#500724"
    }
  },
  "red": {
    "id": "red",
    "name": "Red",
    "category": "standard",
    "primary": "#EF4444",
    "description": "Bold dynamic red for high urgency and passion",
    "scale": {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
      "800": "#991b1b",
      "900": "#7f1d1d",
      "950": "#450a0a"
    }
  },
  "orange": {
    "id": "orange",
    "name": "Orange",
    "category": "standard",
    "primary": "#F97316",
    "description": "Warm energetic orange with sharp contrast",
    "scale": {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#f97316",
      "600": "#ea580c",
      "700": "#c2410c",
      "800": "#9a3412",
      "900": "#7c2d12",
      "950": "#431407"
    }
  },
  "yellow": {
    "id": "yellow",
    "name": "Yellow",
    "category": "standard",
    "primary": "#EAB308",
    "description": "Bright golden yellow with executive clarity",
    "scale": {
      "50": "#fefce8",
      "100": "#fef9c3",
      "200": "#fef08a",
      "300": "#fde047",
      "400": "#facc15",
      "500": "#eab308",
      "600": "#ca8a04",
      "700": "#a16207",
      "800": "#854d0e",
      "900": "#713f12",
      "950": "#422006"
    }
  },
  "green": {
    "id": "green",
    "name": "Green",
    "category": "standard",
    "primary": "#22C55E",
    "description": "Natural lush green representing growth and precision",
    "scale": {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
      "800": "#166534",
      "900": "#14532d",
      "950": "#052e16"
    }
  },
  "emerald": {
    "id": "emerald",
    "name": "Emerald",
    "category": "standard",
    "primary": "#10B981",
    "description": "Precious emerald green with refined enterprise feel",
    "scale": {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b",
      "950": "#022c22"
    }
  },
  "cyan": {
    "id": "cyan",
    "name": "Cyan",
    "category": "standard",
    "primary": "#06B6D4",
    "description": "Tech-forward cyan with crisp terminal luminescence",
    "scale": {
      "50": "#ecfeff",
      "100": "#cffafe",
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
      "500": "#06b6d4",
      "600": "#0891b2",
      "700": "#0e7490",
      "800": "#155e75",
      "900": "#164e63",
      "950": "#083344"
    }
  },
  "teal": {
    "id": "teal",
    "name": "Teal",
    "category": "standard",
    "primary": "#14B8A6",
    "description": "Balanced teal bridging ocean blue and deep green",
    "scale": {
      "50": "#f0fdfa",
      "100": "#ccfbf1",
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
      "500": "#14b8a6",
      "600": "#0d9488",
      "700": "#0f766e",
      "800": "#115e59",
      "900": "#134e4a",
      "950": "#042f2e"
    }
  },
  "slate": {
    "id": "slate",
    "name": "Slate",
    "category": "standard",
    "primary": "#64748B",
    "description": "Polished architectural slate for serious engineering",
    "scale": {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a",
      "950": "#020617"
    }
  },
  "gray": {
    "id": "gray",
    "name": "Gray",
    "category": "standard",
    "primary": "#6B7280",
    "description": "Classic enterprise neutral gray",
    "scale": {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827",
      "950": "#030712"
    }
  },
  "neutral": {
    "id": "neutral",
    "name": "Neutral",
    "category": "standard",
    "primary": "#737373",
    "description": "Warm modernist neutral with subtle charcoal base",
    "scale": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a"
    }
  },
  "sap-blue": {
    "id": "sap-blue",
    "name": "SAP Blue",
    "category": "premium",
    "primary": "#0A6ED1",
    "description": "Official SAP Horizon & Fiori 3 Enterprise Blue (Default)",
    "scale": {
      "50": "#eef6fc",
      "100": "#d8ebfa",
      "200": "#b6dcf5",
      "300": "#85c5ee",
      "400": "#4da7e4",
      "500": "#0a6ed1",
      "600": "#0857a6",
      "700": "#064687",
      "800": "#053a6d",
      "900": "#053059",
      "950": "#031e3b"
    }
  },
  "ai-violet": {
    "id": "ai-violet",
    "name": "AI Violet",
    "category": "premium",
    "primary": "#7C3AED",
    "description": "Futuristic deep neural indigo with luminous purple accents",
    "scale": {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#7c3aed",
      "600": "#6d28d9",
      "700": "#5b21b6",
      "800": "#4c1d95",
      "900": "#3b0764",
      "950": "#22043d"
    }
  },
  "ewm-green": {
    "id": "ewm-green",
    "name": "EWM Green",
    "category": "premium",
    "primary": "#059669",
    "description": "High-velocity smart logistics jade & automated warehouse green",
    "scale": {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#059669",
      "600": "#047857",
      "700": "#065f46",
      "800": "#064e3b",
      "900": "#022c22",
      "950": "#011c16"
    }
  },
  "ocean": {
    "id": "ocean",
    "name": "Ocean",
    "category": "premium",
    "primary": "#0284C7",
    "description": "Deep abyss blue and crystalline aquamarine depths",
    "scale": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0284c7",
      "600": "#0369a1",
      "700": "#075985",
      "800": "#0c4a6e",
      "900": "#082f49",
      "950": "#041c2c"
    }
  },
  "midnight": {
    "id": "midnight",
    "name": "Midnight",
    "category": "premium",
    "primary": "#2563EB",
    "description": "Dark celestial navy illuminated by electric blue sparks",
    "scale": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#2563eb",
      "600": "#1d4ed8",
      "700": "#1e40af",
      "800": "#1e3a8a",
      "900": "#172554",
      "950": "#0b122b"
    }
  },
  "royal": {
    "id": "royal",
    "name": "Royal",
    "category": "premium",
    "primary": "#9333EA",
    "description": "Regal imperial purple crafted for prestigious institutions",
    "scale": {
      "50": "#faf5ff",
      "100": "#f3e8ff",
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
      "500": "#9333ea",
      "600": "#7e22ce",
      "700": "#6b21a8",
      "800": "#581c87",
      "900": "#3b0764",
      "950": "#260342"
    }
  },
  "crimson": {
    "id": "crimson",
    "name": "Crimson",
    "category": "premium",
    "primary": "#DC2626",
    "description": "Executive scarlet and burgundy tailored for high impact",
    "scale": {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#dc2626",
      "600": "#b91c1c",
      "700": "#991b1b",
      "800": "#7f1d1d",
      "900": "#450a0a",
      "950": "#2d0505"
    }
  },
  "sunset": {
    "id": "sunset",
    "name": "Sunset",
    "category": "premium",
    "primary": "#EA580C",
    "description": "Warm dusk horizon blending crimson coral and gold",
    "scale": {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#ea580c",
      "600": "#c2410c",
      "700": "#9a3412",
      "800": "#7c2d12",
      "900": "#431407",
      "950": "#2b0a03"
    }
  },
  "aurora": {
    "id": "aurora",
    "name": "Aurora",
    "category": "premium",
    "primary": "#0D9488",
    "description": "Northern lights inspired polar teal and mint glow",
    "scale": {
      "50": "#f0fdfa",
      "100": "#ccfbf1",
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
      "500": "#0d9488",
      "600": "#0f766e",
      "700": "#115e59",
      "800": "#134e4a",
      "900": "#042f2e",
      "950": "#021c1b"
    }
  },
  "cyber": {
    "id": "cyber",
    "name": "Cyber",
    "category": "premium",
    "primary": "#4F46E5",
    "description": "Ultra high-contrast cyberpunk indigo and synthwave blue",
    "scale": {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#4f46e5",
      "600": "#4338ca",
      "700": "#3730a3",
      "800": "#312e81",
      "900": "#1e1b4b",
      "950": "#120e36"
    }
  },
  "graphite": {
    "id": "graphite",
    "name": "Graphite",
    "category": "premium",
    "primary": "#475569",
    "description": "Ultra-sleek monolithic carbon and aerospace graphite",
    "scale": {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#475569",
      "600": "#334155",
      "700": "#1e293b",
      "800": "#0f172a",
      "900": "#020617",
      "950": "#01030d"
    }
  },
  "titanium": {
    "id": "titanium",
    "name": "Titanium",
    "category": "premium",
    "primary": "#52525B",
    "description": "Industrial grade brushed titanium and platinum sheen",
    "scale": {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#52525b",
      "600": "#3f3f46",
      "700": "#27272a",
      "800": "#18181b",
      "900": "#09090b",
      "950": "#040405"
    }
  },
  "gold": {
    "id": "gold",
    "name": "Gold",
    "category": "premium",
    "primary": "#D97706",
    "description": "Sovereign enterprise gold with champagne and amber luster",
    "scale": {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "300": "#fcd34d",
      "400": "#fbbf24",
      "500": "#d97706",
      "600": "#b45309",
      "700": "#92400e",
      "800": "#78350f",
      "900": "#451a03",
      "950": "#290f02"
    }
  }
};

export const STANDARD_THEMES = Object.values(THEMES).filter(t => t.category === "standard");
export const PREMIUM_THEMES = Object.values(THEMES).filter(t => t.category === "premium");
export const DEFAULT_THEME_ID = "sap-blue";
