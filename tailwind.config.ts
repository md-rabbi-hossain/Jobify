import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E2A2F",
        brand: {
          DEFAULT: "#0B6E6E",
          dark: "#084F52",
          light: "#E1F0EE",
        },
        accent: "#F4B13E",
        surface: "#F3F7F6",
        line: "#D6E1DF",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
