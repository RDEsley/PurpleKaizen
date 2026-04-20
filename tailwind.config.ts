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
      }
    }
  },
  plugins: []
};

export default config;
