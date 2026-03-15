import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ededfa",
          100: "#d4d3f5",
          200: "#b0aeec",
          300: "#8b88e2",
          400: "#7471dc",
          500: "#5E5ADB",
          600: "#504cc8",
          700: "#4240a8",
          800: "#363589",
          900: "#2a2a6a",
        },
        sidebar: {
          DEFAULT: "#1a1a2e",
          light: "#24243e",
          lighter: "#2e2e4a",
        },
        surface: {
          DEFAULT: "#f8f9fa",
          card: "#ffffff",
        },
        text: {
          primary: "#1a1a2e",
          secondary: "#6b7280",
          muted: "#9ca3af",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
