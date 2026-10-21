import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="site-container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            {siteConfig.hero.headlineLines.map((line) => (
              <span className="hero-title-line" key={line}>{line}{" "}</span>
            ))}
          </h1>
          <p className="hero-description">{siteConfig.hero.description}</p>
          <div className="hero-actions">
            <a href={siteConfig.hero.primaryCta.href} className="button button-primary" data-analytics-event="cta_click" data-analytics-label={siteConfig.hero.primaryCta.label} data-analytics-location="hero">
              {siteConfig.hero.primaryCta.label}<ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href={siteConfig.hero.secondaryCta.href} className="text-link" data-analytics-event="cta_click" data-analytics-label={siteConfig.hero.secondaryCta.label} data-analytics-location="hero">
              {siteConfig.hero.secondaryCta.label}<ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ul className="hero-benefits" aria-label="O que faz parte da entrega">
            <li>Design sob medida</li>
            <li>Pronto para celular</li>
            <li>Publicação completa</li>
          </ul>
        </div>
        <div className="hero-artwork">
          <Image
            src={siteConfig.hero.art.src}
            alt={siteConfig.hero.art.alt}
            width={1254}
            height={1254}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 80vw, (max-width: 1600px) 50vw, 720px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
