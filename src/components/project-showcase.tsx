"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import { ProjectWindow } from "@/components/project-window";
import { useStudioMotion } from "@/components/studio-motion";
import { corte14Project, fatia12Project, mordidaProject, type ConceptProject } from "@/config/site";

const projects = [
  { project: mordidaProject, name: "MORDIDA!", subtitle: "Smash House.", category: "Experiência comercial interativa", description: "Uma experiência digital que combina identidade visual marcante, movimento e funcionalidades interativas.", features: ["Motion design", "Cardápio com filtros", "Produtos personalizáveis", "Carrinho demonstrativo"] },
  { project: fatia12Project, name: "FATIA 12", subtitle: "Pizza Studio.", category: "Experiência digital interativa / 3D", description: "Uma experiência interativa que transforma a escolha de sabores em uma navegação visual e tridimensional.", features: ["Seleção visual de 12 sabores", "Transformação da pizza inteira", "Embalagem 3D e carrinho demonstrativo"] },
  { project: corte14Project, name: "CORTE 14", subtitle: "Barber Club.", category: "Website institucional cinematográfico", description: "Uma experiência institucional com identidade visual própria, fotografia marcante e navegação cinematográfica.", features: ["Design institucional", "Tipografia", "Animações", "Responsividade"] },
];

function ShowcasePreview({ project }: { project: ConceptProject }) {
  const { desktopMotion } = useStudioMotion();
  const [hovered, setHovered] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 140, damping: 24 });
  const y = useSpring(useMotionValue(0), { stiffness: 140, damping: 24 });
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (!desktopMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(48, Math.min(rect.width - 48, event.clientX - rect.left)));
    y.set(Math.max(48, Math.min(rect.height - 48, event.clientY - rect.top)));
  }
  return <Link href={project.href} className="showcase-preview" aria-label={`Explorar ${project.title}`} onPointerMove={move} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
    data-analytics-event="project_click" data-analytics-project={project.slug} data-analytics-location="showroom-preview">
    <ProjectWindow project={project} />
    {desktopMotion && hovered && <motion.span className="project-explore-cursor" style={{ x, y }} aria-hidden="true">EXPLORAR <ArrowUpRight size={18} /></motion.span>}
    <span className="preview-corner" aria-hidden="true"><ArrowUpRight size={23} /></span>
  </Link>;
}

function ProjectShowcaseItem({ item, index }: { item: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { desktopMotion } = useStudioMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, .4, 1], [80, 0, -45]);
  const scale = useTransform(scrollYProgress, [0, .4, 1], [.9, 1, .95]);
  const rotateY = useTransform(scrollYProgress, [0, .4, 1], [index === 1 ? -9 : 5, 0, index === 1 ? 3 : -3]);
  const rotate = useTransform(scrollYProgress, [0, .4, 1], [index === 0 ? -3 : 1.5, 0, -1]);
  const { project } = item;
  return <article ref={ref} id={`showcase-${project.slug}`} className={`showcase-item ${project.slug}-project`} aria-labelledby={`${project.slug}-showcase-title`}>
    <div className="showcase-heading"><div><span className="studio-kicker">0{index + 1} / {item.category}</span><h3 id={`${project.slug}-showcase-title`} aria-label={project.title}>{item.name}<span>{item.subtitle}</span></h3></div><span className="showcase-kind">{project.year} — {project.kind}</span><ArrowDownRight size={34} aria-hidden="true" /></div>
    <div className="showcase-stage"><span className="showcase-backdrop-number" aria-hidden="true">0{index + 1}</span><motion.div className="showcase-window-wrap" style={{ y: desktopMotion ? y : 0, scale: desktopMotion ? scale : 1, rotateY: desktopMotion ? rotateY : 0, rotate: desktopMotion ? rotate : 0 }}><ShowcasePreview project={project} /></motion.div></div>
    <div className="showcase-caption"><p>{item.description}</p><div><ul aria-label={`Destaques de ${item.name}`}>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="showcase-links"><Link className="text-link" href={project.href} data-analytics-event="project_click" data-analytics-project={project.slug} data-analytics-location="showroom-case">Explorar projeto <ArrowRight size={18} aria-hidden="true" /></Link><a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir site ${project.linkName} (abre em nova aba)`} data-analytics-event="demo_click" data-analytics-project={project.slug} data-analytics-location="showroom-live">Abrir site <ArrowUpRight size={18} aria-hidden="true" /></a></div></div></div>
  </article>;
}

export function ProjectShowcase() {
  return <section id="cases" className="studio-showroom" aria-labelledby="projects-title"><div className="site-container">
    <div className="showroom-intro"><div className="studio-section-label"><span className="status-dot" /> SELEÇÃO DE PROJETOS / 2026</div><h2 id="projects-title">IDEIAS EM<br /><span>MOVIMENTO.</span></h2><div className="showroom-intro-bottom"><p>Três formas de explorar design, código<br className="desktop-break" /> e o que acontece entre eles.</p><nav aria-label="Projetos do showroom">{projects.map((item, i) => <a key={item.project.slug} href={`#showcase-${item.project.slug}`}><span>0{i + 1}</span>{item.name}<ArrowDownRight size={15} aria-hidden="true" /></a>)}</nav></div></div>
    {projects.map((item, index) => <ProjectShowcaseItem key={item.project.slug} item={item} index={index} />)}
  </div></section>;
}
