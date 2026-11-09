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
        krispy: {
          dark: "#202225",
          orange: "#FF704D",
          "orange-hover": "#E65C39",
          yellow: "#FFC83D",
          "yellow-hover": "#EBB329",
          bg: "#F7F7F8",
          card: "#FFFFFF",
          muted: "#777780",
          border: "#EAEAEB",
          light: "#FFF8F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(32, 34, 37, 0.06)",
        card: "0 8px 30px -4px rgba(32, 34, 37, 0.08)",
        floating: "0 14px 40px -6px rgba(255, 112, 77, 0.25)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;

