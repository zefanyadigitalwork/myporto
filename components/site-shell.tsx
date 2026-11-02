"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Karya", href: "/karya" },
  { label: "Tentang", href: "/tentang" },
  { label: "CV", href: "/cv" },
  { label: "Kontak", href: "/kontak" },
];

export function SiteShell({ name, role, email, children }: { name: string; role: string; email: string; children: ReactNode }) {
  const pathname = usePathname();
  const initials = name.split(" ").map((word) => word[0]).slice(0, 2).join("");

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-stone/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 px-6 py-3 md:px-10 lg:flex-nowrap lg:px-14">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${name}, beranda`}>
            <span className="relative flex h-11 w-11 items-center justify-center border border-pine/25 font-serif text-lg text-pine-foreground after:absolute after:bottom-1 after:right-1 after:h-1.5 after:w-1.5 after:rounded-full after:bg-brass">
              {initials}
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg">{name}</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[.2em] text-ink/50">{role}</span>
            </span>
          </Link>
          <nav aria-label="Navigasi utama" className="order-3 -mx-6 flex w-[calc(100%+3rem)] items-center gap-7 overflow-x-auto border-t border-ink/10 px-6 pt-3 text-sm sm:gap-9 lg:order-none lg:mx-0 lg:w-auto lg:border-0 lg:px-0 lg:pt-0">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 pb-1 transition-colors ${pathname === href ? "border-brass text-pine-foreground" : "border-transparent text-ink/55 hover:border-brass/60 hover:text-pine-foreground"}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcher />
            <Link href="/kontak" className="inline-flex items-center gap-2 border border-pine px-3 py-2.5 text-xs font-medium text-pine-foreground transition-colors hover:bg-pine hover:text-stone-foreground sm:gap-3 sm:px-5">
              <span className="hidden sm:inline">Diskusi proyek</span><span className="sm:hidden">Kontak</span><span aria-hidden="true" className="text-base">↗</span>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-pine px-6 text-stone-foreground md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-stone/15 py-14 md:py-16">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[.24em] text-brass">Ada ide yang ingin diwujudkan?</p>
              <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Mari buat sesuatu yang bermakna.</h2>
            </div>
            <Link href="/kontak" className="group inline-flex items-center gap-5 border border-stone/35 px-5 py-3.5 text-sm transition-colors hover:border-brass hover:bg-brass hover:text-brass-foreground">
              Mulai percakapan <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1fr] lg:gap-16">
            <div>
              <Link href="/" className="inline-flex items-center gap-3" aria-label={`${name}, beranda`}>
                <span className="flex h-10 w-10 items-center justify-center border border-brass/50 font-serif text-lg text-brass">{initials}</span>
                <span className="font-serif text-xl">{name}</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-stone-foreground/75">{role} yang merancang pengalaman visual dengan perhatian pada detail dan makna.</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[.22em] text-brass">Jelajahi</h3>
              <nav aria-label="Navigasi footer" className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-stone-foreground/80">
                {links.map(({ label, href }) => <Link key={href} href={href} className="transition-colors hover:text-brass">{label}</Link>)}
              </nav>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[.22em] text-brass">Kontak langsung</h3>
              <a href={`mailto:${email}`} className="mt-4 inline-block break-all font-serif text-lg transition-colors hover:text-brass">{email}</a>
              <Link href="/admin" className="mt-4 block text-xs text-stone-foreground/60 transition-colors hover:text-stone-foreground/90">Admin</Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-stone/15 py-5 text-xs text-stone-foreground/60">
            <p>© {new Date().getFullYear()} {name}. Seluruh karya dilindungi.</p>
            <p>Dibuat dengan ketelitian dan niat baik.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
