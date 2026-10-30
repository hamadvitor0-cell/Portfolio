"use client";

import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const snapshot = () => window.matchMedia(desktopQuery).matches;
const serverSnapshot = () => false;
const reduceQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(reduceQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const reducedSnapshot = () => window.matchMedia(reduceQuery).matches;
const reducedServerSnapshot = () => true;

export function useStudioMotion() {
  const desktop = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  // Hydrate with the server's static composition, then opt into motion.
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, reducedServerSnapshot);
  return { desktopMotion: desktop && !reduced, reduced };
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export function StudioMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const { reduced } = useStudioMotion();
  const [paused, setPaused] = useState(false);
  return <div ref={ref} className="studio-marquee" aria-label="Design, código, movimento, experiência"><div className="marquee-track" style={{ animationPlayState: visible && !paused && !reduced ? "running" : "paused" }} aria-hidden="true">{[0,1].map((copy) => <span key={copy}>DESIGN <i>↗</i> CÓDIGO <i>↗</i> MOVIMENTO <i>↗</i> EXPERIÊNCIA <i>↗</i>&nbsp;</span>)}</div><button type="button" className="marquee-control" aria-label={paused ? "Retomar faixa animada" : "Pausar faixa animada"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button></div>;
}

const steps = [
  { title: "Entender o projeto", description: "Uma conversa sobre contexto, objetivos, público e o que precisa funcionar melhor." },
  { title: "Definir a entrega", description: "Prioridades, escopo, proposta e cronograma alinhados antes de começar." },
  { title: "Desenvolver e validar", description: "Construção por etapas, com revisões combinadas e decisões que você acompanha." },
  { title: "Publicar e acompanhar", description: "Projeto no ar, entrega dos acessos e próximos passos de suporte definidos." },
];

function ProcessStep({ step, index, progress }: { step: typeof steps[number]; index: number; progress: MotionValue<number> }) {
  const { reduced } = useStudioMotion();
  const range = [index / steps.length, (index + 1) / steps.length];
  const scaleX = useTransform(progress, range, [0, 1]);
  const color = useTransform(progress, range, ["#465166", "#172239"]);
  return <li>
    <div className="process-step-line"><motion.span style={{ scaleX: reduced ? 1 : scaleX }} /></div>
    <motion.span className="process-index" style={{ color: reduced ? "#172239" : color }}>0{index + 1}</motion.span>
    <h3>{step.title}</h3><p>{step.description}</p>
  </li>;
}

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  return <ol ref={ref} className="studio-process-list">{steps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} progress={scrollYProgress} />)}</ol>;
}
