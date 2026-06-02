"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-[76rem] items-center justify-between rounded-full border border-white/10 bg-[#050912]/80 px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <a
          href="#home"
          className="flex items-center gap-3 rounded-full pr-3 text-foreground outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Ir para o início"
        >
          <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-xs font-semibold shadow-inner shadow-white/10">
            VH
          </span>
          <span className="hidden text-sm font-semibold sm:block">{siteConfig.name}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white xl:px-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            href={siteConfig.whatsapp.messageHref}
            className="min-h-9 bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-4 text-xs text-white shadow-[0_16px_44px_rgba(109,93,252,0.35)] hover:from-[#7b6bff] hover:to-[#b29aff]"
            showArrow={false}
          >
            {siteConfig.headerCta}
          </MagneticButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white shadow-inner shadow-white/5 transition hover:border-accent/60 hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          aria-label="Abrir menu de navegação"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto mt-3 w-[min(92vw,28rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070d18]/95 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open ? "max-h-[34rem] opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="grid gap-1 p-3" aria-label="Navegação mobile">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.whatsapp.messageHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.35)]"
          >
            <MessageCircle className="size-4" />
            {siteConfig.headerCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
