"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#050913]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[82rem] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg text-white"
          aria-label="Vitor Hamad — voltar ao início"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#ff9a3d] via-[#ff6138] to-[#d52f49] text-sm font-black tracking-[-0.08em] text-[#070b13] shadow-[0_10px_32px_rgba(255,91,52,0.26)] transition group-hover:-rotate-2">
            VH
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-[-0.01em]">Vitor Hamad</span>
            <span className="block text-[0.7rem] text-slate-400">Desenvolvedor Web</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contato"
          data-analytics-event="cta_click"
          data-analytics-label={siteConfig.headerCta}
          data-analytics-location="header-desktop"
          className="hidden min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#ff9738] via-[#ff6238] to-[#dd3448] px-5 text-sm font-bold text-[#080b12] shadow-[0_14px_36px_rgba(255,91,52,0.22)] transition hover:-translate-y-0.5 lg:inline-flex"
        >
          {siteConfig.headerCta}
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition hover:border-[#ff6a3d]/60 hover:bg-white/[0.08] lg:hidden"
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "absolute inset-x-3 top-[4.8rem] overflow-hidden rounded-2xl border bg-[#08101d]/98 shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-200 lg:hidden",
          open ? "visible max-h-[32rem] border-white/10 opacity-100" : "invisible max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="grid gap-1 p-3" aria-label="Navegação móvel">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/[0.06]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contato"
            data-analytics-event="cta_click"
            data-analytics-label={siteConfig.headerCta}
            data-analytics-location="header-mobile"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9738] via-[#ff6238] to-[#dd3448] px-5 text-sm font-bold text-[#080b12]"
          >
            <MessageCircle className="size-4" />
            {siteConfig.headerCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
