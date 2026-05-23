import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";
import { padNumber } from "@/lib/utils";

export function EducationSection() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div>
            <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-surface text-accent shadow-soft">
              <GraduationCap className="size-5" />
            </div>
            <h2 className="mt-6 text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
              {siteConfig.education.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{siteConfig.education.subtitle}</p>
          </div>

          <div className="grid gap-4">
            {siteConfig.education.items.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-5 rounded-[1.75rem] border border-border bg-surface/75 p-6 shadow-soft sm:grid-cols-[76px_1fr] sm:p-7"
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-sm text-muted">
                    {padNumber(index + 1)}
                  </span>
                  <span className="text-sm text-muted sm:mt-4 sm:block">{item.period}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-4 leading-7 text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
