"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Karya", href: "/karya" },
  { label: "Tentang", href: "/tentang" },
  { label: "CV", href: "/cv" },
  { label: "Kontak", href: "/kontak" },
];

export function SiteShell({ name, children }: { name: string; children: ReactNode }) {
  const pathname = usePathname();
  const initials = name.split(" ").map((word) => word[0]).slice(0, 2).join("");

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-stone/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-4 md:px-14">
          <Link href="/" className="flex items-center gap-3" aria-label={`${name}, beranda`}>
            <span className="flex h-10 w-10 items-center justify-center bg-pine font-serif text-lg text-brass">{initials}</span>
            <span className="font-serif text-xl">{name}</span>
          </Link>
          <nav aria-label="Navigasi utama" className="flex flex-wrap gap-x-5 gap-y-2 text-sm sm:gap-x-7">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
                className={`border-b pb-1 transition-colors ${pathname === href ? "border-brass text-pine" : "border-transparent text-ink/65 hover:border-brass hover:text-pine"}`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="bg-ink px-6 py-8 text-sm text-stone/70 md:px-14">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {name}. Seluruh karya adalah milik pembuatnya.</p>
          <Link href="/admin" className="transition-colors hover:text-brass">Admin</Link>
        </div>
      </footer>
    </>
  );
}
