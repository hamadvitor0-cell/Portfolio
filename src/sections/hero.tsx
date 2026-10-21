import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="site-container">
        <div className="hero-intro">
          <p className="eyebrow"><span className="status-dot" /> DESENVOLVIMENTO WEB SOB MEDIDA</p>
          <p className="hero-location">Curitiba, PR <span aria-hidden="true">↗</span> Atendimento remoto</p>
        </div>
        <h1 id="hero-title">Sites para apresentar.<br />Sistemas para <span>organizar.</span></h1>
        <div className="hero-bottom">
          <p className="hero-description">{siteConfig.hero.description}</p>
          <div className="hero-actions">
            <a href="#contato" className="button button-primary" data-analytics-event="cta_click" data-analytics-label={siteConfig.headerCta} data-analytics-location="hero">Conversar sobre um projeto <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href="#cases" className="text-link" data-analytics-event="cta_click" data-analytics-label="Conhecer os projetos" data-analytics-location="hero">Conhecer os projetos <ArrowDownRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-signature"><span>Viham Dev <span aria-hidden="true">—</span> desenvolvimento por Vitor Hamad.</span><span aria-hidden="true">IDEIA, INTERFACE E CÓDIGO.</span></div>
      </div>
    </section>
  );
}
