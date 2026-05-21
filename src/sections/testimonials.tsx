import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";

export function TestimonialsSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="max-w-3xl">
          <h2 className="text-4xl font-medium tracking-normal text-foreground sm:text-6xl">
            {siteConfig.sectionHeadings.testimonialsTitle}
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {siteConfig.testimonials.map((testimonial, index) => (
            <SectionReveal key={testimonial.name} delay={index * 0.08}>
              <figure className="h-full rounded-[1.75rem] border border-border bg-surface/75 p-7 shadow-soft">
                <blockquote className="text-lg leading-8 text-foreground">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-10">
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-muted">{testimonial.role}</p>
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
