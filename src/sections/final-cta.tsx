import Image from "next/image";
import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";
import { ContactBudgetForm } from "@/components/contact-budget-form";

const benefits = ["Resposta rápida", "Orçamento sem compromisso", "Saia do papel"];

export function FinalCtaSection() {
  return (
    <section id="contact" className="scroll-mt-28 px-4 py-8 pb-16 sm:px-6 lg:pb-20">
      <SectionReveal className="mx-auto max-w-[76rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_18%_40%,rgba(124,108,255,0.18),transparent_22rem),linear-gradient(135deg,rgba(7,16,29,0.95),rgba(4,8,17,0.98))] shadow-[0_36px_100px_rgba(0,0,0,0.38)] backdrop-blur-xl">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.38fr_0.72fr_0.9fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[15.5rem] rounded-[1.5rem] border border-[#7c6cff]/25 bg-[#111827]/70 p-2 shadow-[0_28px_80px_rgba(124,108,255,0.22)]">
            <div className="absolute inset-4 rounded-full bg-[#7c6cff]/35 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white">
              <Image
                src="/images/vitor-profile.png"
                alt="Foto de Vitor Hamad"
                width={700}
                height={900}
                className="relative z-10 aspect-[4/5] w-full scale-[1.04] object-cover object-[50%_34%]"
              />
            </div>
          </div>

          <div>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Tem uma ideia parada?
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-200">
              Eu posso transformar ela em um site ou sistema publicado.
            </p>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-slate-300">
              Me chama com uma ideia simples, mesmo que ainda esteja bagunçada. Eu te ajudo a organizar escopo,
              funcionalidades, visual e caminho para colocar no ar.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-slate-200"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  {benefit}
                </span>
              ))}
            </div>

            <div className="mt-7 flex max-w-sm flex-col gap-3">
              <a
                href={siteConfig.whatsapp.messageHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.38)] transition hover:-translate-y-0.5"
              >
                Quero tirar minha ideia do papel
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={siteConfig.whatsapp.messageHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.08]"
              >
                Falar no WhatsApp
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          <ContactBudgetForm whatsappHref={siteConfig.whatsapp.messageHref} />
        </div>
      </SectionReveal>
    </section>
  );
}
