"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { trapDialogFocus } from "@/lib/dialog";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let previous = false;
    const update = () => { const next = window.scrollY > 40; if (next !== previous) { previous = next; setScrolled(next); } };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
    }, { rootMargin: "-15% 0px -65% 0px" });
    for (const item of siteConfig.nav) {
      const element = document.querySelector(item.href.replace("/", ""));
      if (element) observer.observe(element);
    }
    for (const id of ["home", "faq", "contato"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const dialog = menu.current;
    const button = trigger.current;
    if (!dialog || !open) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return <>
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}><div className="site-container header-inner">
      <Link href="/" className="brand-link" aria-label="Viham Dev — início"><Image src="/images/brand/viham-dev.webp" alt="Viham Dev" width={1055} height={474} priority className="brand-logo" /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{siteConfig.nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === "/" && active === item.href ? "location" : undefined}>{item.label}</Link>)}</nav>
      <Link href="/#contato" className="button button-outline header-cta" data-analytics-event="cta_click" data-analytics-label={siteConfig.headerCta} data-analytics-location="header-desktop">{siteConfig.headerCta}<ArrowUpRight size={17} aria-hidden="true" /></Link>
      <button ref={trigger} type="button" className="menu-trigger" aria-label="Abrir menu de navegação" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={23} aria-hidden="true" /></button>
    </div></header>
    <dialog ref={menu} id="mobile-navigation" className="mobile-menu" aria-label="Navegação móvel" onKeyDown={trapDialogFocus} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="mobile-menu-inner"><div className="mobile-menu-top"><span>Explorar a Viham Dev</span><button type="button" aria-label="Fechar menu de navegação" onClick={() => setOpen(false)}><X size={23} aria-hidden="true" /></button></div><nav aria-label="Navegação móvel">{siteConfig.nav.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={22} aria-hidden="true" /></Link>)}<Link href="/#contato" className="button button-primary" onClick={() => setOpen(false)} data-analytics-event="cta_click" data-analytics-label={siteConfig.headerCta} data-analytics-location="header-mobile">{siteConfig.headerCta}<ArrowUpRight size={18} aria-hidden="true" /></Link></nav></div>
    </dialog>
  </>;
}
