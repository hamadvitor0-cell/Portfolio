"use client";

import type { FormEvent } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionReveal } from "@/components/section-reveal";
import { iconMap } from "@/lib/icons";
import { isExternalHref } from "@/lib/utils";

export function ContactSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !message) {
      event.currentTarget.reportValidity();
      return;
    }

    const whatsappMessage = [
      "Olá, Vitor! Vi seu portfólio e gostaria de conversar sobre um projeto.",
      "",
      `Nome: ${name}`,
      projectType ? `Tipo de projeto: ${projectType}` : null,
      budget ? `Orçamento aproximado: ${budget}` : null,
      `Mensagem: ${message}`
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `${siteConfig.whatsapp.href}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:py-32">
      <SectionReveal>
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-border bg-foreground p-7 text-background shadow-soft dark:bg-surface dark:text-foreground md:grid-cols-[1fr_0.8fr] md:p-12 lg:p-16">
          <div>
            <p className="text-sm opacity-70">
              WhatsApp {siteConfig.whatsapp.number} · Email secundário: {siteConfig.email}
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium tracking-normal sm:text-6xl">
              {siteConfig.contact.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 opacity-75">{siteConfig.contact.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton
                href={siteConfig.whatsapp.messageHref}
                variant="secondary"
                className="bg-background text-foreground"
              >
                <MessageCircle className="size-4" />
                {siteConfig.contact.buttonLabel}
              </MagneticButton>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email secundário de ${siteConfig.name}`}
                className="inline-flex size-12 items-center justify-center rounded-full border border-background/20 text-background/75 transition hover:bg-background hover:text-foreground dark:border-border dark:text-muted dark:hover:bg-foreground dark:hover:text-background"
              >
                <Mail className="size-4" />
              </a>
              {siteConfig.socialLinks
                .filter((link) => link.label !== "Email" && link.label !== "WhatsApp")
                .map((link) => {
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
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-[1.5rem] border border-background/15 bg-background/10 p-4 backdrop-blur-xl dark:border-border dark:bg-background/30"
            >
              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.18em] opacity-70" htmlFor="name">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="min-h-12 rounded-2xl border border-background/15 bg-background/90 px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent dark:border-border"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.18em] opacity-70" htmlFor="projectType">
                  Tipo de projeto
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue=""
                  className="min-h-12 rounded-2xl border border-background/15 bg-background/90 px-4 text-sm text-foreground outline-none focus:border-accent dark:border-border"
                >
                  <option value="">Selecione uma opção</option>
                  {siteConfig.contact.projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.18em] opacity-70" htmlFor="budget">
                  Orçamento aproximado
                </label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue=""
                  className="min-h-12 rounded-2xl border border-background/15 bg-background/90 px-4 text-sm text-foreground outline-none focus:border-accent dark:border-border"
                >
                  <option value="">Selecione uma faixa</option>
                  {siteConfig.contact.budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-medium uppercase tracking-[0.18em] opacity-70" htmlFor="message">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Conte sobre seu projeto"
                  rows={5}
                  className="rounded-2xl border border-background/15 bg-background/90 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent dark:border-border"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-background px-5 text-sm font-medium text-foreground transition hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              >
                <Send className="size-4" />
                {siteConfig.contact.formButtonLabel}
              </button>
            </form>
          ) : null}
        </div>
      </SectionReveal>
    </section>
  );
}
