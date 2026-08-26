"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu de navegação"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-[#02050b]/85 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#070d19]">
        <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[82rem] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center rounded-lg text-white"
            aria-label="Vitor Hamad — voltar ao início"
          >
            <Image
              src="/images/brand/vitor-hamad-logo.png"
              alt="Vitor Hamad — Desenvolvedor Web"
              width={291}
              height={67}
              priority
              className="h-auto w-[12.75rem] select-none object-contain"
            />
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
      </header>

      <div
        id="mobile-navigation"
        className={cn(
          "fixed inset-x-3 top-[4.8rem] z-[60] overflow-y-auto rounded-2xl border bg-[#08101d] shadow-[0_28px_80px_rgba(0,0,0,0.72)] ring-1 ring-black/40 transition-all duration-200 lg:hidden",
          open
            ? "visible max-h-[calc(100dvh-5.6rem)] border-white/10 opacity-100"
            : "invisible max-h-0 border-transparent opacity-0"
        )}
      >
        <nav
          className="grid gap-1 p-3 [@media(max-height:520px)]:gap-0 [@media(max-height:520px)]:p-2"
          aria-label="Navegação móvel"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/[0.06] [@media(max-height:520px)]:py-2"
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
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9738] via-[#ff6238] to-[#dd3448] px-5 text-sm font-bold text-[#080b12] [@media(max-height:520px)]:mt-1 [@media(max-height:520px)]:min-h-11"
          >
            <MessageCircle className="size-4" />
            {siteConfig.headerCta}
          </Link>
        </nav>
      </div>
    </>
  );
}
