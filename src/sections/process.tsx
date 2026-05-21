import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";
import { padNumber } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-8 md:grid-cols-[0.55fr_1fr]">
          <div>
            <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
              {siteConfig.sectionHeadings.processTitle}
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {siteConfig.process.map((step, index) => (
              <div key={step.title} className="grid gap-5 py-8 sm:grid-cols-[100px_1fr]">
                <span className="text-sm text-muted">{padNumber(index + 1)}</span>
                <div>
                  <h3 className="text-2xl font-medium text-foreground">{step.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
