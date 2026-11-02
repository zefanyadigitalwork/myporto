import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      stone: "rgb(var(--color-stone) / <alpha-value>)",
      "stone-foreground": "rgb(var(--color-stone-foreground) / <alpha-value>)",
      pine: "rgb(var(--color-pine) / <alpha-value>)",
      "pine-foreground": "rgb(var(--color-pine-foreground) / <alpha-value>)",
      brass: "rgb(var(--color-brass) / <alpha-value>)",
      "brass-foreground": "rgb(var(--color-brass-foreground) / <alpha-value>)",
      ink: "rgb(var(--color-ink) / <alpha-value>)",
      wine: "rgb(var(--color-wine) / <alpha-value>)",
    },
    fontFamily: { serif: ["var(--font-serif)", "Georgia", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
