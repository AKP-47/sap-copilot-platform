/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "var(--theme-primary)",
          "primary-hover": "var(--theme-primary-hover)",
          "primary-active": "var(--theme-primary-active)",
          "primary-soft": "var(--theme-primary-soft)",
          "primary-subtle": "var(--theme-primary-subtle)",
          "primary-border": "var(--theme-primary-border)",
          secondary: "var(--theme-secondary)",
          accent: "var(--theme-accent)",
          "accent-soft": "var(--theme-accent-soft)",
          bg: "var(--theme-background)",
          "bg-sec": "var(--theme-background-secondary)",
          surface: "var(--theme-surface)",
          "surface-elevated": "var(--theme-surface-elevated)",
          "surface-hover": "var(--theme-surface-hover)",
          card: "var(--theme-card)",
          "card-hover": "var(--theme-card-hover)",
          border: "var(--theme-border)",
          "border-hover": "var(--theme-border-hover)",
          text: "var(--theme-text-primary)",
          "text-sec": "var(--theme-text-secondary)",
          "text-muted": "var(--theme-text-muted)",
          success: "var(--theme-success)",
          warning: "var(--theme-warning)",
          danger: "var(--theme-danger)",
          info: "var(--theme-info)",
        },
        sap: {
          blue: "#0a6ed1",
          dark: "#1c2d42",
          gold: "#f58b00",
          light: "#f5f7fa",
          accent: "#0070f2",
          success: "#107e3e",
          danger: "#bb0000",
          warning: "#e9730c",
          surface: "#ffffff",
          card: "#f8fafc",
          border: "#e2e8f0"
        },
        tagskills: {
          red: "#b32025",
          blue: "#008bd2",
          orange: "#f39200",
          dark: "#111827",
          navy: "#0a2540"
        }
      },
      boxShadow: {
        "theme-card": "var(--theme-shadow)",
        "theme-glow": "var(--theme-glow)",
      },
      backgroundImage: {
        "theme-gradient": "var(--theme-gradient)",
        "theme-gradient-subtle": "var(--theme-gradient-subtle)",
      },
      fontFamily: {
        sans: ["72", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Consolas", "Monaco", "Menlo", "Courier New", "monospace"]
      }
    },
  },
  plugins: [],
}
