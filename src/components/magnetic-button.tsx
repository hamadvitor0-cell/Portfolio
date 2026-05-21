"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";

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

  return (
    <motion.a
      {...props}
      target={props.target ?? (shouldOpenInNewTab ? "_blank" : undefined)}
      rel={props.rel ?? (shouldOpenInNewTab ? "noreferrer" : undefined)}
      style={{ x, y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-foreground text-background shadow-glow hover:bg-accent hover:text-white",
        variant === "secondary" &&
          "border border-border bg-surface/70 text-foreground backdrop-blur-xl hover:border-accent/50 hover:bg-accentSoft/70",
        variant === "ghost" && "text-foreground hover:text-accent",
        className
      )}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </motion.a>
  );
}
