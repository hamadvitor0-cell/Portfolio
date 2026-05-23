import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";
import { padNumber } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="max-w-3xl">
          <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
            {siteConfig.sectionHeadings.testimonialsTitle}
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {siteConfig.workPrinciples.map((principle, index) => (
            <SectionReveal key={principle.title} delay={index * 0.08}>
              <article className="h-full rounded-[1.75rem] border border-border bg-surface/75 p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted">{padNumber(index + 1)}</span>
                  <CheckCircle2 className="size-5 text-accent" />
                </div>
                <h3 className="mt-10 text-xl font-medium text-foreground">{principle.title}</h3>
                <p className="mt-4 leading-7 text-muted">{principle.description}</p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
