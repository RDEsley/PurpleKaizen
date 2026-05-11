import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6D28D9",
          foreground: "#FFFFFF",
          soft: "#F3E8FF"
        },
        border: "#E5E7EB",
        muted: "#6B7280"
      },
      boxShadow: {
        subtle: "0px 8px 24px rgba(17, 24, 39, 0.06)"
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        "spin-slow": "spin-slow 1s linear infinite",
        "fade-up": "fade-up 200ms ease-out",
        "scale-in": "scale-in 160ms ease-out"
      }
    }
  },
  plugins: []
};

export default config;
