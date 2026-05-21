"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-36 sm:px-6 sm:pb-32 lg:pt-44">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgb(var(--color-accent-soft)/0.8),transparent_28%),radial-gradient(circle_at_80%_20%,rgb(var(--color-subtle)/0.75),transparent_30%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-xs gap-16 sm:max-w-7xl lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:items-center">
        <div>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 max-w-xs text-sm leading-6 text-muted sm:max-w-xl"
          >
            {siteConfig.role} · {siteConfig.availability}
          </motion.p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xs text-balance text-4xl font-medium leading-[1.04] tracking-normal text-foreground sm:max-w-5xl sm:text-7xl sm:leading-[0.95] lg:text-8xl"
          >
            {siteConfig.hero.headline}
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-8 max-w-xs text-base leading-7 text-muted sm:max-w-2xl sm:text-xl sm:leading-8"
          >
            {siteConfig.hero.description}
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</MagneticButton>
            <MagneticButton href={siteConfig.hero.secondaryCta.href} variant="secondary">
              {siteConfig.hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[360px] sm:min-h-[440px]"
        >
          {siteConfig.hero.floatingProjects.map((image, index) => (
            <motion.div
              key={image}
              className="absolute overflow-hidden rounded-[2rem] border border-white/30 bg-surface/70 p-2 shadow-soft backdrop-blur-xl"
              style={{
                width: index === 0 ? "78%" : "56%",
                left: index === 1 ? "42%" : index === 2 ? "8%" : "0%",
                top: index === 1 ? "7%" : index === 2 ? "54%" : "24%",
                zIndex: index === 0 ? 2 : 1
              }}
              animate={{ y: [0, index % 2 ? 16 : -14, 0], rotate: [index - 1, index + 1, index - 1] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={image}
                alt={`${siteConfig.name} project preview ${index + 1}`}
                width={760}
                height={520}
                priority={index === 0}
                className="aspect-[4/3] rounded-[1.55rem] object-cover"
              />
            </motion.div>
          ))}
          <a
            href="#work"
            aria-label="Scroll to featured work"
            className="absolute bottom-0 right-6 inline-flex size-14 items-center justify-center rounded-full border border-border bg-background/80 shadow-soft backdrop-blur-xl transition hover:border-accent/50 hover:text-accent"
          >
            <ArrowDown className="size-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
