/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#020408",
          dark: "#060d18",
          navy: "#0a1628",
          blue: "#0ea5e9",
          bright: "#38bdf8",
          glow: "#00d4ff",
          accent: "#0284c7",
          panel: "#0d1f35",
          border: "#1e3a5f",
          muted: "#4a7fa5",
          text: "#94c5e0",
        },
        status: {
          pending: "#f59e0b",
          approved: "#10b981",
          rejected: "#ef4444",
          returned: "#8b5cf6",
        },
      },
      fontFamily: {
        display: ["'Orbitron'", "monospace"],
        body: ["'Exo 2'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        cyber: "0 0 20px rgba(14, 165, 233, 0.15), 0 0 60px rgba(14, 165, 233, 0.05)",
        "cyber-strong": "0 0 30px rgba(14, 165, 233, 0.4), inset 0 1px 0 rgba(14, 165, 233, 0.2)",
        glow: "0 0 15px rgba(0, 212, 255, 0.5)",
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(14, 165, 233, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.8), 0 0 40px rgba(14, 165, 233, 0.3)" },
        },
        slideIn: {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
