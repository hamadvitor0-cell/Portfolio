import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionReveal } from "@/components/section-reveal";
import { iconMap } from "@/lib/icons";
import { isExternalHref } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:py-32">
      <SectionReveal>
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-border bg-foreground p-7 text-background shadow-soft dark:bg-surface dark:text-foreground md:grid-cols-[1fr_0.8fr] md:p-12 lg:p-16">
          <div>
            <p className="text-sm opacity-70">{siteConfig.email}</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium tracking-normal sm:text-6xl">
              {siteConfig.contact.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 opacity-75">{siteConfig.contact.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${siteConfig.email}`} variant="secondary" className="bg-background text-foreground">
                <Mail className="size-4" />
                {siteConfig.contact.buttonLabel}
              </MagneticButton>
              {siteConfig.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternalHref(link.href) ? "_blank" : undefined}
                    rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                    aria-label={link.label}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-background/20 text-background/75 transition hover:bg-background hover:text-foreground dark:border-border dark:text-muted dark:hover:bg-foreground dark:hover:text-background"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {siteConfig.contact.formEnabled ? (
            <form className="grid gap-3 rounded-[1.5rem] border border-background/15 bg-background/10 p-4 backdrop-blur-xl dark:border-border dark:bg-background/30">
              <label className="sr-only" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                className="min-h-12 rounded-2xl border border-background/15 bg-background/90 px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent dark:border-border"
              />
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="min-h-12 rounded-2xl border border-background/15 bg-background/90 px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent dark:border-border"
              />
              <label className="sr-only" htmlFor="message">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Conte sobre seu projeto"
                rows={5}
                className="rounded-2xl border border-background/15 bg-background/90 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent dark:border-border"
              />
              <button
                type="submit"
                className="min-h-12 rounded-full bg-background px-5 text-sm font-medium text-foreground transition hover:bg-accent hover:text-white"
              >
                Enviar mensagem
              </button>
            </form>
          ) : null}
        </div>
      </SectionReveal>
    </section>
  );
}
