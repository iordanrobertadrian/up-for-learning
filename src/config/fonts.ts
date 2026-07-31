import { Fraunces, Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "optional",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "optional",
  weight: ["500", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
});
