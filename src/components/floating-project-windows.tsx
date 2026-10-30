"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { PointerEvent } from "react";
import { ProjectWindow } from "@/components/project-window";
import { corte14Project, fatia12Project, mordidaProject } from "@/config/site";

export function FloatingProjectWindows({ progress, enabled }: { progress: MotionValue<number>; enabled: boolean }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-4, 4]), { stiffness: 75, damping: 24 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [3, -3]), { stiffness: 75, damping: 24 });
  const frontX = useTransform(progress, [0, 1], [0, -360]);
  const frontY = useTransform(progress, [0, 1], [0, 100]);
  const frontScale = useTransform(progress, [0, 1], [1, 1.8]);
  const frontRotate = useTransform(progress, [0, 1], [-6, 0]);
  const rearX = useTransform(progress, [0, 1], [0, 160]);
  const rearY = useTransform(progress, [0, 1], [0, -130]);
  const rearOpacity = useTransform(progress, [0, .8, 1], [1, .25, 0]);
  const backX = useSpring(useTransform(pointerX, [-1, 1], [-10, 10]), { stiffness: 90, damping: 24 });
  const backY = useSpring(useTransform(pointerY, [-1, 1], [-8, 8]), { stiffness: 90, damping: 24 });

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)));
    pointerY.set(Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)));
  }

  return <div className="floating-project-windows" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} aria-label="Prévias reais dos projetos MORDIDA!, FATIA 12 e Corte 14">
    <motion.div className="windows-parallax" style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0 }}>
      <motion.div className="floating-window window-corte" style={{ x: enabled ? rearX : 0, y: enabled ? rearY : 0, z: enabled ? -180 : 0, opacity: enabled ? rearOpacity : 1, rotate: enabled ? 8 : 5, rotateY: enabled ? -13 : 0 }}>
        <motion.div className="window-drift" style={{ x: enabled ? backX : 0, y: enabled ? backY : 0 }}><div className="window-entry"><ProjectWindow project={corte14Project} hero /></div></motion.div>
      </motion.div>
      <motion.div className="floating-window window-fatia" style={{ x: enabled ? rearX : 0, y: enabled ? rearY : 0, z: enabled ? -90 : 0, opacity: enabled ? rearOpacity : 1, rotate: enabled ? -10 : -5, rotateY: enabled ? 10 : 0 }}>
        <motion.div className="window-drift" style={{ x: enabled ? backY : 0, y: enabled ? backX : 0 }}><div className="window-entry"><ProjectWindow project={fatia12Project} hero /></div></motion.div>
      </motion.div>
      <motion.div className="floating-window window-mordida" style={{ x: enabled ? frontX : 0, y: enabled ? frontY : 0, z: enabled ? 40 : 0, scale: enabled ? frontScale : 1, rotate: enabled ? frontRotate : -3 }}>
        <div className="window-entry"><ProjectWindow project={mordidaProject} hero primary /></div>
      </motion.div>
    </motion.div>
    <span className="scene-coordinate" aria-hidden="true">DESIGN × CODE × INTERACTION</span>
  </div>;
}
