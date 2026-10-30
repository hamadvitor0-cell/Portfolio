"use client";

import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingProjectWindows } from "@/components/floating-project-windows";
import { MagneticButton } from "@/components/magnetic-button";
import { useStudioMotion } from "@/components/studio-motion";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { desktopMotion } = useStudioMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80px", "end end"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const titleOpacity = useTransform(scrollYProgress, [0, .65, 1], [1, .35, .08]);
  const copyOpacity = useTransform(scrollYProgress, [0, .6], [1, 0]);
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#101c36", "#0b1529"]);

  return <motion.section ref={ref} id="home" className="studio-hero" aria-labelledby="hero-title" style={{ backgroundColor: desktopMotion ? backgroundColor : "#101c36" }}>
    <div className="hero-stage"><div className="site-container studio-hero-inner">
      <div className="hero-eyebrow"><span><span className="status-dot" /> VIHAM DEV / DIGITAL EXPERIENCES</span><span>INDEPENDENTE. POR VOCAÇÃO.</span></div>
      <motion.div className="studio-title-wrap" style={{ y: desktopMotion ? titleY : 0, opacity: desktopMotion ? titleOpacity : 1 }}>
        <h1 id="hero-title" className="studio-hero-title" aria-label="Sites que não passam despercebidos."><span className="headline-mask"><span>SITES QUE NÃO</span></span><span className="headline-mask"><span>PASSAM</span></span><span className="headline-mask hero-lime-line"><span>DESPERCEBIDOS.</span></span></h1>
      </motion.div>
      <FloatingProjectWindows progress={scrollYProgress} enabled={desktopMotion} />
      <motion.div className="studio-hero-bottom" style={{ opacity: desktopMotion ? copyOpacity : 1 }}>
        <p>{siteConfig.hero.description}</p>
        <div className="studio-hero-actions"><MagneticButton className="studio-primary" href="#cases" data-analytics-event="cta_click" data-analytics-label="Explorar projetos" data-analytics-location="hero">Explorar projetos</MagneticButton><a className="text-link" href="#contato" data-analytics-event="cta_click" data-analytics-label="Criar meu site" data-analytics-location="hero">Criar meu site <ArrowUpRight size={19} aria-hidden="true" /></a></div>
      </motion.div>
      <div className="hero-colophon"><a href="#cases">ROLE PARA EXPLORAR <ArrowDown size={15} aria-hidden="true" /></a><span>WEBSITES · SISTEMAS · EXPERIÊNCIAS</span><ArrowDownRight size={24} aria-hidden="true" /></div>
    </div></div>
  </motion.section>;
}
