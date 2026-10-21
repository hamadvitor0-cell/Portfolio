import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-main"><div><Link href="/" className="brand-link" aria-label="Viham Dev — início"><Image src="/images/brand/viham-dev.webp" alt="Viham Dev" width={1055} height={474} className="brand-logo" /></Link><p>Sites para apresentar.<br />Sistemas para organizar.</p></div><div className="footer-nav"><p className="eyebrow">EXPLORE</p>{siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/#faq">Dúvidas frequentes</Link></div><div className="footer-contact"><p className="eyebrow">VAMOS CONVERSAR</p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}<ArrowUpRight size={16} aria-hidden="true" /></a><a href={siteConfig.whatsapp.messageHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-label="WhatsApp" data-analytics-location="footer">{siteConfig.whatsapp.number}<ArrowUpRight size={16} aria-hidden="true" /></a><div className="footer-socials">{siteConfig.socialLinks.filter((link) => link.label === "GitHub" || link.label === "LinkedIn").map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" data-analytics-event={link.label === "GitHub" ? "github_click" : "cta_click"} data-analytics-label={link.label} data-analytics-location="footer-social">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div></div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Viham Dev. Desenvolvimento por Vitor Hamad.</p><span>Curitiba · Atendimento remoto</span><div><Link href="/curriculo">Currículo</Link><Link href="/privacidade">Privacidade</Link></div></div>
  </div></footer>;
}
