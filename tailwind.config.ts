import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      stone: "rgb(var(--color-stone) / <alpha-value>)",
      pine: "rgb(var(--color-pine) / <alpha-value>)",
      brass: "rgb(var(--color-brass) / <alpha-value>)",
      ink: "rgb(var(--color-ink) / <alpha-value>)",
      wine: "rgb(var(--color-wine) / <alpha-value>)",
    },
    fontFamily: { serif: ["var(--font-serif)", "Georgia", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
