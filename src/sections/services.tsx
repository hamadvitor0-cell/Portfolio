"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { iconMap } from "@/lib/icons";
import { SectionReveal } from "@/components/section-reveal";

export function ServicesSection() {
  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="max-w-3xl">
          <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
            {siteConfig.sectionHeadings.servicesTitle}
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <SectionReveal key={service.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group h-full rounded-[1.75rem] border border-border bg-surface/75 p-6 shadow-soft backdrop-blur-xl transition hover:border-accent/40"
                >
                  <div className="mb-12 inline-flex size-12 items-center justify-center rounded-2xl bg-accentSoft text-accent transition group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground">{service.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{service.description}</p>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
