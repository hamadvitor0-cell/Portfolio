import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";
import { isExternalHref } from "@/lib/utils";

export function PlaygroundSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-8 md:grid-cols-[0.65fr_1fr] md:items-start">
          <div>
            <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
              {siteConfig.sectionHeadings.playgroundTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {siteConfig.playground.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={isExternalHref(item.href) ? "_blank" : undefined}
                rel={isExternalHref(item.href) ? "noreferrer" : undefined}
                className="group grid gap-4 rounded-[1.5rem] border border-border bg-surface/70 p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{item.description}</p>
                </div>
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-accentSoft text-accent transition group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
