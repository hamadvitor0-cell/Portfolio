"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { ProjectWindow } from "@/components/project-window";
import { useStudioMotion } from "@/components/studio-motion";
import { corte14Project, fatia12Project, mordidaProject } from "@/config/site";

export type ProjectId = "mordida" | "fatia12" | "corte14";
export type ProjectSlot = "primary" | "left" | "right";
export type ProjectSlots = Record<ProjectSlot, ProjectId>;
export type JourneyPhase = "hero" | "transition" | "gallery";
export const windowEase = [.22, 1, .36, 1] as const;

export function useProjectSelection() {
  const [slots, setSlots] = useState<ProjectSlots>({ primary: "mordida", left: "fatia12", right: "corte14" });
  function select(id: ProjectId) {
    setSlots((current) => {
      if (current.primary === id) return current;
      const previous = current.left === id ? "left" : "right";
      return { ...current, primary: id, [previous]: current.primary };
    });
  }
  return { slots, select };
}

// Compact/static fallback: retains selection and pointer depth, without scroll enlargement.
export function FloatingProjectWindows({ enabled, slots, select }: { enabled: boolean; slots: ProjectSlots; select: (id: ProjectId) => void }) {
  const { reduced } = useStudioMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-4, 4]), { stiffness: 75, damping: 24 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [3, -3]), { stiffness: 75, damping: 24 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width * 2 - 1);
    pointerY.set((event.clientY - rect.top) / rect.height * 2 - 1);
  }
  return <div className="floating-project-windows" role="group" aria-label="Destacar uma prévia de projeto" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <motion.div className="windows-parallax" style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0 }}>
      {[corte14Project, fatia12Project, mordidaProject].map((project) => {
        const slot = (Object.keys(slots) as ProjectSlot[]).find((key) => slots[key] === project.slug)!;
        const primary = slot === "primary";
        return <motion.div key={project.slug} layout={!reduced} transition={{ duration: reduced ? 0 : .65, ease: windowEase }} className={`floating-window window-${project.slug} window-slot-${slot}`} data-project={project.slug} data-slot={slot} style={{ zIndex: primary ? 3 : slot === "left" ? 2 : 1 }}>
          <motion.div className="window-depth" initial={false} animate={{ rotate: reduced ? 0 : primary ? -3 : slot === "left" ? -5 : 5 }} transition={{ duration: reduced ? 0 : .65, ease: windowEase }}>
            <div className="window-entry"><motion.button type="button" className="window-select" aria-label={`Destacar projeto ${project.linkName}`} aria-pressed={primary} onClick={() => select(project.slug as ProjectId)} whileHover={enabled ? { scale: 1.012, y: -2 } : undefined}><ProjectWindow project={project} hero primary={project.slug === "mordida"} /></motion.button></div>
          </motion.div>
        </motion.div>;
      })}
    </motion.div>
  </div>;
}
