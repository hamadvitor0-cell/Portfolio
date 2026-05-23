import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionReveal } from "@/components/section-reveal";
import { padNumber } from "@/lib/utils";

export function InvestmentSection() {
  return (
    <section id="investment" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-6 md:grid-cols-[0.7fr_1fr] md:items-end">
          <div>
            <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
              {siteConfig.sectionHeadings.investmentTitle}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted md:justify-self-end">
            Valores iniciais para orientar o escopo. Cada projeto é avaliado pelo nível de complexidade,
            integrações, prazo e funcionalidades necessárias.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.investment.plans.map((plan, index) => (
            <SectionReveal key={plan.title} delay={index * 0.06}>
              <article className="group h-full rounded-[1.75rem] border border-border bg-surface/75 p-6 shadow-soft transition hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted">{padNumber(index + 1)}</span>
                  <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted">
                    sob consulta
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-medium text-foreground">{plan.title}</h3>
                <p className="mt-4 text-2xl font-medium text-accent">{plan.price}</p>
                <p className="mt-4 leading-7 text-muted">{plan.description}</p>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.12} className="mt-6 rounded-[2rem] border border-border bg-foreground p-7 text-background shadow-soft dark:bg-surface dark:text-foreground sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-4xl text-lg leading-8 opacity-80">{siteConfig.investment.note}</p>
            <MagneticButton
              href={siteConfig.whatsapp.messageHref}
              variant="secondary"
              className="shrink-0 bg-background text-foreground"
            >
              <MessageCircle className="size-4" />
              {siteConfig.investment.ctaLabel}
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
