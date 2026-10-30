"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { animate, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, type PointerEvent } from "react";
import { ProjectWindow } from "@/components/project-window";
import { useStudioMotion } from "@/components/studio-motion";
import { windowEase, type JourneyPhase, type ProjectId, type ProjectSlot, type ProjectSlots } from "@/components/floating-project-windows";
import { corte14Project, fatia12Project, mordidaProject } from "@/config/site";

const projects = [
  { project: corte14Project, name: "CORTE 14", subtitle: "Barber Club.", category: "Website institucional cinematográfico", description: "Uma experiência institucional com identidade visual marcante, fotografia e animações que valorizam cada detalhe." },
  { project: fatia12Project, name: "FATIA 12", subtitle: "Pizza Studio.", category: "Experiência interativa 3D", description: "Uma pizzaria conceitual onde a escolha de sabores se transforma em uma experiência visual interativa." },
  { project: mordidaProject, name: "MORDIDA!", subtitle: "Smash House.", category: "Website comercial interativo", description: "Uma hamburgueria digital com identidade expressiva, animações e funcionalidades comerciais interativas." },
];
const poses = {
  primary: { left: .5944, top: 124, width: .4004, rotate: -6, rotateY: 0, z: 40, primary: 1 },
  left: { left: .5892, top: 52, width: .3172, rotate: -10, rotateY: 10, z: -90, primary: 0 },
  right: { left: .662, top: 0, width: .3172, rotate: 8, rotateY: -13, z: -180, primary: 0 },
};
export type JourneyScene = {
  cinematic: boolean; phase: JourneyPhase; progress: MotionValue<number>; width: MotionValue<number>; height: MotionValue<number>;
  slots: ProjectSlots; select: (id: ProjectId) => void;
};
const smooth = (value: number) => value * value * (3 - 2 * value);

function JourneyProject({ item, index, scene }: { item: typeof projects[number]; index: number; scene: JourneyScene }) {
  const { reduced } = useStudioMotion();
  const { project } = item;
  const { cinematic, phase, progress, width, height, slots, select } = scene;
  const slot = (Object.keys(slots) as ProjectSlot[]).find((key) => slots[key] === project.slug)!;
  const target = poses[slot];
  const sourceLeft = useMotionValue(target.left);
  const sourceTop = useMotionValue(target.top);
  const sourceWidth = useMotionValue(target.width);
  const sourceRotate = useMotionValue(target.rotate);
  const sourceY = useMotionValue(target.rotateY);
  const sourceZ = useMotionValue(target.z);
  const sourcePrimary = useMotionValue(target.primary);
  useEffect(() => {
    const values = [sourceLeft, sourceTop, sourceWidth, sourceRotate, sourceY, sourceZ, sourcePrimary];
    const targets = [target.left, target.top, target.width, target.rotate, target.rotateY, target.z, target.primary];
    const animations = values.map((value, i) => animate(value, targets[i], { duration: cinematic ? .65 : 0, ease: windowEase }));
    return () => animations.forEach((animation) => animation.stop());
  }, [cinematic, target, sourceLeft, sourceTop, sourceWidth, sourceRotate, sourceY, sourceZ, sourcePrimary]);

  const assembly = useTransform(progress, [.4, .8], [0, 1], { ease: smooth });
  const scale = useTransform([width, sourceWidth, assembly], ([w, fraction, t]: number[]) => {
    const column = Math.max(1, (w - 48) / 3);
    return (fraction * w / column) * (1 - t) + t;
  });
  const x = useTransform([width, sourceLeft, sourceWidth, assembly], ([w, left, fraction, t]: number[]) => {
    const column = Math.max(1, (w - 48) / 3);
    return (left * w + 8 - index * (column + 24) + (fraction * w - column) / 2) * (1 - t);
  });
  const y = useTransform([width, height, sourceTop, sourcePrimary, sourceWidth, assembly], ([w, h, top, primary, fraction, t]: number[]) => {
    const column = Math.max(1, (w - 48) / 3);
    const compact = w <= 1154;
    const source = (compact ? 105 : 78) + top - (compact ? 34 * primary : 0);
    const galleryTop = Math.min(170, Math.max(100, h + 76 - 740));
    const frameHeight = column * .625 + 24;
    return (source - galleryTop + (fraction * w / column - 1) * frameHeight / 2) * (1 - t);
  });
  const rotate = useTransform([sourceRotate, assembly], ([value, t]: number[]) => value * (1 - t));
  const rotateY = useTransform([sourceY, assembly], ([value, t]: number[]) => value * (1 - t));
  const z = useTransform([sourceZ, assembly], ([value, t]: number[]) => value * (1 - t));
  const infoOpacity = useTransform(progress, [.76, .94], [0, 1]);
  const infoY = useTransform(progress, [.76, .94], [18, 0]);
  const gallery = !cinematic || phase === "gallery";
  const selecting = cinematic && phase === "hero";

  return <article className={`journey-project ${project.slug}-project`} id={`showcase-${project.slug}`} data-journey-project={project.slug} style={{ zIndex: cinematic && slot === "primary" ? 3 : slot === "left" ? 2 : 1 }} aria-labelledby={`${project.slug}-showcase-title`}>
    <motion.div className="journey-window" data-project={project.slug} data-slot={slot} style={{ x: cinematic ? x : 0, y: cinematic ? y : 0, scale: cinematic ? scale : 1, rotate: cinematic ? rotate : 0, rotateY: cinematic ? rotateY : 0, z: cinematic ? z : 0, transformPerspective: 1300 }}>
      <motion.div className="journey-window-hover" whileHover={reduced ? undefined : gallery ? { scale: 1.012, y: -3 } : { scale: 1.008 }} transition={{ duration: reduced ? 0 : .22, ease: windowEase }}>
        <ProjectWindow project={project} hero={cinematic} primary={cinematic && project.slug === "mordida"} />
        <button type="button" className="journey-select" data-journey-control={project.slug} disabled={!selecting} aria-hidden={!selecting} aria-label={`Destacar projeto ${project.linkName}`} aria-pressed={slots.primary === project.slug} onClick={() => select(project.slug as ProjectId)} />
        <a href={project.href} className="journey-preview-link" data-journey-control={project.slug} aria-label={`Explorar ${project.title}`} aria-hidden={!gallery} inert={!gallery} tabIndex={gallery ? 0 : -1} data-analytics-event="project_click" data-analytics-project={project.slug} data-analytics-location="showroom-preview"><ArrowUpRight size={21} aria-hidden="true" /></a>
      </motion.div>
    </motion.div>
    <motion.div className="journey-project-info" inert={!gallery} aria-hidden={!gallery} style={{ opacity: cinematic ? infoOpacity : 1, y: cinematic ? infoY : 0 }}>
      <span className="journey-project-meta">2026 / Projeto conceitual</span><h3 id={`${project.slug}-showcase-title`} aria-label={project.title}>{item.name}<span>{item.subtitle}</span></h3><p className="journey-category">{item.category}</p><p className="journey-description">{item.description}</p>
      <a href={project.href} className="text-link" data-journey-control={project.slug} data-analytics-event="project_click" data-analytics-project={project.slug} data-analytics-location="showroom-case">Explorar projeto <ArrowRight size={17} aria-hidden="true" /></a>
    </motion.div>
  </article>;
}

export function ProjectShowcase({ scene }: { scene: JourneyScene }) {
  const { cinematic, phase, progress } = scene;
  const assembly = useTransform(progress, [.4, .8], [0, 1]);
  const headingOpacity = useTransform(progress, [.76, .9], [0, 1]);
  const headingY = useTransform(progress, [.76, .9], [12, 0]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(useTransform(pointerY, [-1, 1], [3, -3]), { stiffness: 75, damping: 24 });
  const springY = useSpring(useTransform(pointerX, [-1, 1], [-4, 4]), { stiffness: 75, damping: 24 });
  const rotateX = useTransform([springX, assembly], ([value, t]: number[]) => value * (1 - t));
  const rotateY = useTransform([springY, assembly], ([value, t]: number[]) => value * (1 - t));
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!cinematic || phase !== "hero" || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)));
    pointerY.set(Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)));
  }
  return <section id={cinematic ? undefined : "cases"} className="journey-showcase" aria-labelledby="projects-title">
    <motion.div className="journey-gallery-heading" inert={cinematic && phase !== "gallery"} aria-hidden={cinematic && phase !== "gallery"} style={{ opacity: cinematic ? headingOpacity : 1, y: cinematic ? headingY : 0 }}><span className="studio-section-label"><span className="status-dot" /> SELEÇÃO DE PROJETOS / 2026</span><h2 id="projects-title" tabIndex={-1}>TRÊS IDEIAS. <span>OUTRAS POSSIBILIDADES.</span></h2></motion.div>
    <motion.div className="journey-grid" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} style={{ rotateX: cinematic ? rotateX : 0, rotateY: cinematic ? rotateY : 0 }}>
      {projects.map((item, index) => <JourneyProject key={item.project.slug} item={item} index={index} scene={scene} />)}
    </motion.div>
  </section>;
}
