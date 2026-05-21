import Image from "next/image";
import { siteConfig } from "@/config/site";
import { AnimatedNumber } from "@/components/animated-number";
import { SectionReveal } from "@/components/section-reveal";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionReveal>
          <div className="sticky top-28 overflow-hidden rounded-[2rem] border border-border bg-surface p-3 shadow-soft">
            <Image
              src={siteConfig.about.image}
              alt={`${siteConfig.name} profile image`}
              width={900}
              height={1050}
              className="aspect-[4/5] rounded-[1.45rem] object-cover"
            />
          </div>
        </SectionReveal>

        <div>
          <SectionReveal>
            <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
              {siteConfig.sectionHeadings.aboutTitle}
            </h2>
            <p className="mt-8 text-xl leading-9 text-foreground">{siteConfig.about.shortBio}</p>
            <p className="mt-6 text-lg leading-8 text-muted">{siteConfig.about.body}</p>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-10 grid gap-4 sm:grid-cols-3">
            {siteConfig.about.highlights.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-border bg-surface/70 p-6">
                <div className="text-4xl font-medium text-foreground">
                  <AnimatedNumber value={item.value} suffix={item.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </SectionReveal>

          <SectionReveal delay={0.16} className="mt-6 rounded-[2rem] border border-border bg-foreground p-8 text-background shadow-soft dark:bg-surface dark:text-foreground">
            <p className="text-2xl leading-9">{siteConfig.about.approach}</p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
