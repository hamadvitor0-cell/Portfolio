"use client";

import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { FloatingProjectWindows, useProjectSelection, type JourneyPhase } from "@/components/floating-project-windows";
import { ProjectShowcase } from "@/components/project-showcase";
import { MagneticButton } from "@/components/magnetic-button";
import { useStudioMotion } from "@/components/studio-motion";
import { siteConfig } from "@/config/site";

const query = "(min-width: 1100px) and (min-height: 760px)";
function subscribe(callback: () => void) { const media = window.matchMedia(query); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); }
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<string | null>(null);
  const alignedHash = useRef(false);
  const { desktopMotion } = useStudioMotion();
  const spacious = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const cinematic = desktopMotion && spacious;
  const { slots, select } = useProjectSelection();
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const [phase, setPhase] = useState<JourneyPhase>("hero");
  const phaseRef = useRef<JourneyPhase>("hero");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 76px", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, .15, .38], [1, 1, 0]);
  const heroVisibility = useTransform(heroOpacity, (opacity) => opacity <= 0 ? "hidden" : "visible");
  const heroY = useTransform(scrollYProgress, [0, .38], [0, -36]);
  const backgroundColor = useTransform(scrollYProgress, [0, .8], ["#101c36", "#080f1e"]);

  useLayoutEffect(() => {
    const measure = () => { width.set(container.current?.clientWidth ?? 0); height.set(Math.max(1, window.innerHeight - 76)); };
    measure();
    const observer = new ResizeObserver(measure);
    if (container.current) observer.observe(container.current);
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, [width, height]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next: JourneyPhase = value < .38 ? "hero" : value < .92 ? "transition" : "gallery";
    if (next === phaseRef.current) return;
    const active = document.activeElement as HTMLElement | null;
    if (cinematic && active && active !== stage.current && (copy.current?.contains(active) || active.closest("[data-journey-control]"))) {
      pendingFocus.current = active.closest<HTMLElement>("[data-journey-control]")?.dataset.journeyControl ?? "heading";
      stage.current?.focus({ preventScroll: true });
    }
    phaseRef.current = next;
    setPhase(next);
  });

  useEffect(() => {
    if (!cinematic || phase === "transition" || !pendingFocus.current) return;
    const id = pendingFocus.current;
    const selector = phase === "gallery" ? id === "heading" ? "#projects-title" : `.journey-preview-link[data-journey-control="${id}"]` : `.journey-select[data-journey-control="${id === "heading" ? slots.primary : id}"]`;
    ref.current?.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
    pendingFocus.current = null;
  }, [phase, cinematic, slots.primary]);

  useEffect(() => {
    if (!cinematic || alignedHash.current) return;
    if (window.location.hash === "#cases" || window.location.hash.startsWith("#showcase-")) {
      const frame = requestAnimationFrame(() => { document.getElementById("cases")?.scrollIntoView({ block: "start", behavior: "instant" }); alignedHash.current = true; });
      return () => cancelAnimationFrame(frame);
    }
    alignedHash.current = true;
  }, [cinematic]);

  function navigateLayers(event: KeyboardEvent<HTMLElement>) {
    if (!cinematic || event.key !== "Tab") return;
    const controls = ref.current?.querySelectorAll<HTMLButtonElement>(".journey-select:not(:disabled)");
    const firstCase = ref.current?.querySelector(".journey-preview-link");
    if (phase === "hero" && !event.shiftKey && event.target === controls?.[controls.length - 1]) {
      event.preventDefault();
      pendingFocus.current = "corte14";
      stage.current?.focus({ preventScroll: true });
      document.getElementById("cases")?.scrollIntoView({ block: "start", behavior: "smooth" });
    } else if (phase === "gallery" && event.shiftKey && event.target === firstCase) {
      event.preventDefault();
      pendingFocus.current = "mordida";
      stage.current?.focus({ preventScroll: true });
      const top = (ref.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 76;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  const hidden = cinematic && phase !== "hero";
  return <motion.section ref={ref} id="home" className="studio-hero project-journey" data-cinematic={cinematic} data-phase={cinematic ? phase : "static"} aria-labelledby="hero-title" onKeyDown={navigateLayers} style={{ backgroundColor: cinematic ? backgroundColor : "#101c36" }}>
    <div id={cinematic ? "cases" : undefined} className="journey-cases-anchor" aria-hidden="true" />
    <div ref={stage} className="hero-stage" role="group" tabIndex={-1} aria-label="Apresentação dos projetos"><div ref={container} className="site-container studio-hero-inner">
      <motion.div ref={copy} className="journey-hero-content" inert={hidden} aria-hidden={hidden} style={{ opacity: cinematic ? heroOpacity : 1, y: cinematic ? heroY : 0, visibility: cinematic ? heroVisibility : "visible" }}>
        <div className="hero-eyebrow"><span><span className="status-dot" /> VIHAM DEV / DIGITAL EXPERIENCES</span><span>INDEPENDENTE. POR VOCAÇÃO.</span></div>
        <div className="studio-title-wrap"><h1 id="hero-title" className="studio-hero-title" aria-label="Sites que não passam despercebidos."><span className="headline-mask"><span>SITES QUE NÃO</span></span><span className="headline-mask"><span>PASSAM</span></span><span className="headline-mask hero-lime-line"><span>DESPERCEBIDOS.</span></span></h1></div>
        {!cinematic && <FloatingProjectWindows enabled={desktopMotion} slots={slots} select={select} />}
        <div className="studio-hero-bottom"><p>{siteConfig.hero.description}</p><div className="studio-hero-actions"><MagneticButton className="studio-primary" href="#cases" data-analytics-event="cta_click" data-analytics-label="Explorar projetos" data-analytics-location="hero">Explorar projetos</MagneticButton><a className="text-link" href="#contato" data-analytics-event="cta_click" data-analytics-label="Criar meu site" data-analytics-location="hero">Criar meu site <ArrowUpRight size={19} aria-hidden="true" /></a></div></div>
        <div className="hero-colophon"><a href="#cases">ROLE PARA EXPLORAR <ArrowDown size={15} aria-hidden="true" /></a><span>WEBSITES · SISTEMAS · EXPERIÊNCIAS</span><ArrowDownRight size={24} aria-hidden="true" /></div>
      </motion.div>
      <ProjectShowcase key={cinematic ? "cinematic" : "static"} scene={{ cinematic, phase, progress: scrollYProgress, width, height, slots, select }} />
    </div></div>
  </motion.section>;
}
