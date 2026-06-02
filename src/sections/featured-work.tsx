"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionReveal } from "@/components/section-reveal";
import { cn, isExternalHref } from "@/lib/utils";

export function FeaturedWorkSection() {
  return (
    <section id="work" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-6 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div>
            <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-5xl">
              {siteConfig.sectionHeadings.workTitle}
            </h2>
          </div>
          {siteConfig.sectionHeadings.workDescription ? (
            <p className="max-w-2xl text-lg leading-8 text-muted md:justify-self-end">
              {siteConfig.sectionHeadings.workDescription}
            </p>
          ) : null}
        </SectionReveal>

        <div className="mt-14 grid gap-6">
          {siteConfig.projects.map((project, index) => (
            <SectionReveal key={project.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface/75 shadow-soft backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr]"
              >
                <a
                  href={project.href}
                  target={isExternalHref(project.href) ? "_blank" : undefined}
                  rel={isExternalHref(project.href) ? "noreferrer" : undefined}
                  className={cn(
                    "relative block min-h-[320px] overflow-hidden md:min-h-[430px]",
                    project.imageFit === "contain" && "flex items-center justify-center bg-[#050912] p-8 sm:p-12"
                  )}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project image`}
                    width={1100}
                    height={840}
                    className={cn(
                      "h-full w-full transition duration-700 group-hover:scale-105",
                      project.imageFit === "contain"
                        ? "h-auto max-h-[82%] max-w-[94%] scale-[1.12] object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.42)] group-hover:scale-[1.18]"
                        : "object-cover"
                    )}
                  />
                </a>
                <div className="flex flex-col justify-between gap-12 p-7 sm:p-10 lg:p-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span>{project.category}</span>
                      <span aria-hidden="true">/</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-medium tracking-normal text-foreground sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-7 text-muted">{project.description}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <MagneticButton href={project.liveUrl} className="min-h-11 px-4">
                      Ver projeto
                    </MagneticButton>
                    {"repoUrl" in project && project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target={isExternalHref(project.repoUrl) ? "_blank" : undefined}
                        rel={isExternalHref(project.repoUrl) ? "noreferrer" : undefined}
                        aria-label={`${project.title} repository`}
                        className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent/50 hover:text-foreground"
                      >
                        <Github className="size-4" />
                      </a>
                    ) : null}
                    <a
                      href={project.href}
                      target={isExternalHref(project.href) ? "_blank" : undefined}
                      rel={isExternalHref(project.href) ? "noreferrer" : undefined}
                      aria-label={`${project.title} website`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent/50 hover:text-foreground"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
