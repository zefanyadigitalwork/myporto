"use client";

import { useEffect, useState } from "react";

const themes = [
  { value: "dark", label: "Dark" },
  { value: "soft-dark", label: "Soft dark" },
  { value: "light", label: "Light" },
  { value: "soft-light", label: "Soft light" },
  { value: "pastel", label: "Pastel colour" },
] as const;

type Theme = (typeof themes)[number]["value"];
const storageKey = "portfolio-theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = document.documentElement.dataset.theme;
    if (themes.some((option) => option.value === savedTheme)) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  function changeTheme(value: string) {
    if (!themes.some((option) => option.value === value)) return;
    const nextTheme = value as Theme;
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <label className="inline-flex h-10 items-center gap-2 border border-ink/15 bg-stone px-3 text-xs text-ink/75 transition-colors hover:border-brass/60">
      <span aria-hidden="true" className="text-sm text-wine">◐</span>
      <span className="sr-only">Pilih tema warna</span>
      <select
        aria-label="Pilih tema warna"
        className="max-w-[5.8rem] cursor-pointer appearance-none bg-transparent py-2 pr-1 text-xs outline-none"
        value={theme}
        onChange={(event) => changeTheme(event.target.value)}
      >
        {themes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <span aria-hidden="true" className="text-[9px] text-ink/45">▼</span>
    </label>
  );
}
