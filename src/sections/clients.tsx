"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SectionReveal } from "@/components/section-reveal";
import { siteConfig } from "@/config/site";

export function ClientsSection() {
  const logos = [...siteConfig.clients, ...siteConfig.clients];
  const groupRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const targetSpeed = useMotionValue(-42);
  const speed = useSpring(targetSpeed, {
    stiffness: 70,
    damping: 26,
    mass: 0.65
  });

  useEffect(() => {
    targetSpeed.set(isHovering || prefersReducedMotion ? 0 : -42);
  }, [isHovering, prefersReducedMotion, targetSpeed]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const updateDistance = () => {
      distanceRef.current = group.scrollWidth;
    };

    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    observer.observe(group);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const distance = distanceRef.current;
    if (!distance) return;

    const next = x.get() + speed.get() * (delta / 1000);

    if (next <= -distance) {
      x.set(next + distance);
      return;
    }

    if (next > 0) {
      x.set(next - distance);
      return;
    }

    x.set(next);
  });

  return (
    <section id="clients" className="overflow-hidden border-y border-border py-14">
      <SectionReveal>
        <div
          className="relative overflow-hidden py-3"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
        >
          <div className="pointer-events-none absolute inset-y-3 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-3 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <motion.div style={{ x }} className="flex w-max will-change-transform">
            <div ref={groupRef} className="flex gap-4 pr-4">
              {logos.map((client, index) => (
                <LogoCard key={`${client}-a-${index}`} client={client} />
              ))}
            </div>
            <div className="flex gap-4 pr-4" aria-hidden="true">
              {logos.map((client, index) => (
                <LogoCard key={`${client}-b-${index}`} client={client} />
              ))}
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}

function LogoCard({ client }: { client: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="flex h-20 min-w-48 items-center justify-center rounded-2xl border border-border bg-surface/70 px-8 text-center text-sm font-medium text-muted shadow-sm backdrop-blur-xl transition-colors duration-300 hover:border-accent/50 hover:bg-accentSoft/50 hover:text-foreground hover:shadow-soft"
    >
      {client}
    </motion.div>
  );
}
