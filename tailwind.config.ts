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
          50: "#F6F8F4",
          100: "#E4EBDD",
          200: "#C7D4B9",
          300: "#ACBF99",
          400: "#8BA276",
          500: "#688257",
          600: "#4B603E",
          700: "#394831",
          800: "#303B2A",
          900: "#283124",
          DEFAULT: "#688257",
        },
        gold: {
          50: "#FCF9F5",
          100: "#F3EAD7",
          200: "#E3D0A5",
          300: "#D8BD80",
          400: "#CEAA65",
          500: "#BD934F",
          600: "#966E37",
          700: "#75542F",
          800: "#62462B",
          900: "#533C27",
          DEFAULT: "#CEAA65",
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
        soft: "0 4px 24px -6px rgba(57, 72, 49, 0.10)",
        card: "0 10px 40px -12px rgba(57, 72, 49, 0.13)",
        lift: "0 20px 48px -16px rgba(57, 72, 49, 0.20)",
        glow: "0 8px 30px -8px rgba(206, 170, 101, 0.32)",
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
