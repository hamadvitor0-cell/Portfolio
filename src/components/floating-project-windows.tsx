"use client";

import { animate, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState, type PointerEvent } from "react";
import { ProjectWindow } from "@/components/project-window";
import { useStudioMotion } from "@/components/studio-motion";
import { corte14Project, fatia12Project, mordidaProject, type ConceptProject } from "@/config/site";

const projects = [corte14Project, fatia12Project, mordidaProject];
type ProjectId = "mordida" | "fatia12" | "corte14";
type Slot = "primary" | "left" | "right";
const ease = [.22, 1, .36, 1] as const;

function FloatingWindow({ project, slot, progress, enabled, reduced, driftX, driftY, select }: {
  project: ConceptProject; slot: Slot; progress: MotionValue<number>; enabled: boolean; reduced: boolean;
  driftX: MotionValue<number>; driftY: MotionValue<number>; select: (id: ProjectId) => void;
}) {
  const primary = slot === "primary";
  const primaryBlend = useMotionValue(primary ? 1 : 0);
  const transition = { duration: reduced ? 0 : .65, ease };

  useEffect(() => {
    const animation = animate(primaryBlend, primary ? 1 : 0, { duration: reduced ? 0 : .65, ease });
    return () => animation.stop();
  }, [primary, primaryBlend, reduced]);

  // Selection blends the scroll role, including when changed midway through a scroll.
  // Layout, selection depth, scroll, pointer drift and hover each own a separate layer.
  const x = useTransform([progress, primaryBlend], ([p, blend]: number[]) => p * (160 - 520 * blend));
  const y = useTransform([progress, primaryBlend], ([p, blend]: number[]) => p * (-130 + 230 * blend));
  const scale = useTransform([progress, primaryBlend], ([p, blend]: number[]) => 1 + .8 * p * blend);
  const rotate = useTransform([progress, primaryBlend], ([p, blend]: number[]) => 6 * p * blend);
  const opacity = useTransform([progress, primaryBlend], ([p, blend]: number[]) => {
    const rear = Math.max(.28, 1 - p * .9);
    return rear + (1 - rear) * blend;
  });
  const pointerX = useTransform([driftX, primaryBlend], ([value, blend]: number[]) => value * (1 - blend));
  const pointerY = useTransform([driftY, primaryBlend], ([value, blend]: number[]) => value * (1 - blend));
  const depth = reduced ? 0 : primary ? enabled ? 40 : 0 : enabled ? slot === "left" ? -90 : -180 : 0;
  const angle = reduced ? 0 : primary ? enabled ? -6 : -3 : slot === "left" ? enabled ? -10 : -5 : enabled ? 8 : 5;

  return <motion.div layout={!reduced} transition={{ layout: transition }}
    className={`floating-window window-${project.slug} window-slot-${slot}`} data-project={project.slug} data-slot={slot}
    style={{ zIndex: primary ? 3 : slot === "left" ? 2 : 1 }}>
    <motion.div className="window-depth" initial={false} animate={{ z: depth, rotate: angle, rotateY: enabled ? slot === "left" ? 10 : slot === "right" ? -13 : 0 : 0 }} transition={transition} style={{ transformPerspective: 1300 }}>
      <motion.div className="window-scroll" style={{ x: enabled ? x : 0, y: enabled ? y : 0, scale: enabled ? scale : 1, rotate: enabled ? rotate : 0, opacity: enabled ? opacity : 1 }}>
        <motion.div className="window-drift" style={{ x: enabled ? pointerX : 0, y: enabled ? pointerY : 0 }}>
          <div className="window-entry"><motion.button type="button" className="window-select" aria-label={`Destacar projeto ${project.linkName}`} aria-pressed={primary}
            onClick={() => select(project.slug as ProjectId)} whileHover={enabled ? { scale: 1.012, y: -2 } : undefined} transition={{ duration: reduced ? 0 : .2, ease }}>
            <ProjectWindow project={project} hero primary={project.slug === "mordida"} />
          </motion.button></div>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>;
}

export function FloatingProjectWindows({ progress, enabled }: { progress: MotionValue<number>; enabled: boolean }) {
  const [slots, setSlots] = useState<Record<Slot, ProjectId>>({ primary: "mordida", left: "fatia12", right: "corte14" });
  const { reduced } = useStudioMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-4, 4]), { stiffness: 75, damping: 24 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [3, -3]), { stiffness: 75, damping: 24 });
  const backX = useSpring(useTransform(pointerX, [-1, 1], [-10, 10]), { stiffness: 90, damping: 24 });
  const backY = useSpring(useTransform(pointerY, [-1, 1], [-8, 8]), { stiffness: 90, damping: 24 });

  function select(id: ProjectId) {
    setSlots((current) => {
      if (current.primary === id) return current;
      const previousSlot = current.left === id ? "left" : "right";
      return { ...current, primary: id, [previousSlot]: current.primary };
    });
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)));
    pointerY.set(Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)));
  }

  return <div className="floating-project-windows" role="group" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} aria-label="Destacar uma prévia de projeto">
    <motion.div className="windows-parallax" style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0 }}>
      {projects.map((project) => <FloatingWindow key={project.slug} project={project} slot={(Object.keys(slots) as Slot[]).find((slot) => slots[slot] === project.slug)!}
        progress={progress} enabled={enabled} reduced={reduced} driftX={backX} driftY={backY} select={select} />)}
    </motion.div>
  </div>;
}
