/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
      fontFamily: {
        sans: ["72", "Segoe UI", "-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Consolas", "Monaco", "Menlo", "Courier New", "monospace"]
      }
    },
  },
  plugins: [],
}
