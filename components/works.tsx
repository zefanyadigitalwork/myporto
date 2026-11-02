"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";
export function Works({ projects, showFilters = true }: { projects: Project[]; showFilters?: boolean }) {
  const cats = ["Semua", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [c, setC] = useState("Semua");
  const list = c === "Semua" ? projects : projects.filter((p) => p.category === c);
  return (
    <div>
      {showFilters && <div className="mb-10 flex flex-wrap gap-x-8 gap-y-2" role="tablist" aria-label="Filter karya">
        {cats.map((x) => (
          <button key={x} onClick={() => setC(x)} aria-selected={c === x} role="tab"
            className={cn("border-b-2 pb-1 font-serif text-xl transition-colors", c === x ? "border-brass text-pine-foreground" : "border-transparent text-ink/50 hover:text-ink")}>{x}</button>
        ))}
      </div>}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="group">
            <div className="aspect-[4/5] overflow-hidden bg-pine">
              {p.cover_url ? <img src={p.cover_url} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                : <div className="flex h-full items-end p-6 font-serif text-6xl italic text-brass transition-colors">{p.title.charAt(0)}</div>}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-2xl">{p.title}</h3><span className="text-sm text-ink/50">{p.year}</span>
            </div>
            <p className="text-sm text-wine">{p.category}</p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">{p.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
