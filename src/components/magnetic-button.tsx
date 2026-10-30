"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";
import { useStudioMotion } from "@/components/studio-motion";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
};

export function MagneticButton({
  children,
  className,
  variant = "primary",
  showArrow = true,
  ...props
}: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.2 });
  const shouldOpenInNewTab = isExternalHref(typeof props.href === "string" ? props.href : undefined);
  const { desktopMotion } = useStudioMotion();

  return (
    <motion.a
      {...props}
      target={props.target ?? (shouldOpenInNewTab ? "_blank" : undefined)}
      rel={props.rel ?? (shouldOpenInNewTab ? "noopener noreferrer" : undefined)}
      style={{ x: desktopMotion ? x : 0, y: desktopMotion ? y : 0 }}
      onMouseMove={(event) => {
        if (!desktopMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.07);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.07);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "button magnetic-button",
        variant === "primary" && "button-primary",
        variant === "secondary" && "button-outline",
        variant === "ghost" && "text-link",
        className
      )}
    >
      <span className="inline-flex items-center gap-2">{children}</span>
      {showArrow ? (
        <ArrowUpRight size={19} aria-hidden="true" />
      ) : null}
    </motion.a>
  );
}
