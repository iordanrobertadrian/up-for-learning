import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7EE",
          50: "#FEFDFA",
          100: "#FBF7EE",
          200: "#F5EEDD",
        },
        beige: {
          DEFAULT: "#F2E9D5",
          light: "#F7F0E1",
          dark: "#EBDFC4",
        },
        sage: {
          DEFAULT: "#DAE5D0",
          light: "#E7EEDF",
          dark: "#C6D6B8",
        },
        brand: {
          50: "#F1F5EC",
          100: "#DFEAD3",
          200: "#C2D6AC",
          300: "#9FBE80",
          400: "#7EA25C",
          500: "#5F8248",
          600: "#4C6B39",
          700: "#3C5330",
          800: "#324429",
          900: "#2A3924",
          DEFAULT: "#5F8248",
        },
        gold: {
          50: "#FCF6E9",
          100: "#F8E9C7",
          200: "#F1D28C",
          300: "#EABC55",
          400: "#E4A836",
          500: "#D2922A",
          600: "#B27522",
          700: "#8E5A20",
          800: "#754A20",
          900: "#633F1E",
          DEFAULT: "#E4A836",
        },
        ink: {
          DEFAULT: "#2C3327",
          soft: "#4A5340",
          muted: "#6B7361",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(60, 83, 48, 0.10)",
        card: "0 10px 40px -12px rgba(60, 83, 48, 0.14)",
        lift: "0 20px 48px -16px rgba(60, 83, 48, 0.22)",
        glow: "0 8px 30px -8px rgba(228, 168, 54, 0.35)",
      },
      backgroundImage: {
        "hero-fade":
          "radial-gradient(1200px 600px at 70% 10%, rgba(218,229,208,0.55), transparent 60%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
