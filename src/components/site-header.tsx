"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="relative mx-auto flex w-full max-w-xs items-center justify-between rounded-full border border-border/70 bg-background/75 px-3 py-2 shadow-soft backdrop-blur-2xl sm:max-w-7xl">
        <a href="#" className="flex items-center gap-3 rounded-full pl-1 pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">
            {siteConfig.name.slice(0, 1)}
          </span>
          <span className="hidden text-sm font-medium tracking-normal text-foreground sm:inline">
            {siteConfig.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-subtle/70 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <MagneticButton href={`mailto:${siteConfig.email}`} className="min-h-10 px-4" showArrow={false}>
            {siteConfig.headerCta}
          </MagneticButton>
        </div>

      </div>

      <button
        type="button"
        className="fixed left-36 top-6 z-[60] inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm xl:hidden"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-border bg-background/95 shadow-soft backdrop-blur-2xl transition-all duration-300 xl:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="grid gap-1 p-3" aria-label="Mobile navigation">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-muted transition hover:bg-subtle hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <ThemeToggle />
            <MagneticButton href={`mailto:${siteConfig.email}`} className="min-h-10 px-4" showArrow={false}>
              {siteConfig.headerCta}
            </MagneticButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
