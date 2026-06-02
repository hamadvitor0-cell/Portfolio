import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionReveal } from "@/components/section-reveal";

const plans = [
  {
    title: "Landing Page",
    price: "R$ 1.000",
    description: "Ideal para validar ideias e gerar resultados rápidos.",
    bullets: ["Página única", "Design responsivo", "Formulário de contato", "Entrega rápida"]
  },
  {
    title: "Site Institucional",
    price: "R$ 1.500",
    description: "A presença digital que sua empresa precisa.",
    bullets: ["Até 5 páginas", "Design premium", "Painel simples, se necessário", "SEO básico"]
  },
  {
    title: "Sistema Web",
    price: "R$ 3.000",
    description: "Solução personalizada para processos e gestão.",
    bullets: ["Login", "Painel administrativo", "Banco de dados", "Regras de negócio"]
  },
  {
    title: "Sistema Web Completo",
    price: "R$ 5.000+",
    description: "Para projetos maiores, com funcionalidades avançadas.",
    bullets: ["Funcionalidades avançadas", "Integrações", "Relatórios", "Suporte inicial"]
  },
  {
    title: "Manutenção mensal",
    price: "R$ 150/mês",
    description: "Para manter seu projeto atualizado e funcionando bem.",
    bullets: ["Correções", "Atualizações", "Suporte técnico", "Melhorias contínuas"]
  }
];

export function InvestmentSection() {
  return (
    <section id="investment" className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
              Investimento
            </div>
            <p className="text-sm text-slate-400">Soluções para diferentes tipos de projetos e necessidades.</p>
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.title} delay={index * 0.04}>
              <article className="group h-full rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/50 hover:bg-white/[0.055]">
                <p className="text-sm font-semibold text-white">{plan.title}</p>
                <p className="mt-4 text-xs text-slate-500">A partir de</p>
                <p className="text-2xl font-semibold text-white">{plan.price}</p>
                <p className="mt-4 min-h-[3rem] text-sm leading-6 text-slate-400">{plan.description}</p>
                <div className="mt-5 space-y-2">
                  {plan.bullets.map((bullet) => (
                    <span key={bullet} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      {bullet}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-6 flex flex-col gap-4 rounded-[1.15rem] border border-white/10 bg-[#050912]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-slate-400">
            Valores de referência. Cada projeto é único e recebe um orçamento personalizado.
          </p>
          <a
            href={siteConfig.whatsapp.messageHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#7c6cff]/60 hover:bg-white/[0.08]"
          >
            Solicitar orçamento personalizado
            <ArrowUpRight className="size-4" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
