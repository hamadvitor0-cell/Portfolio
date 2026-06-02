import { Gem, Globe2, MessageSquareText, Zap } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

const reasons = [
  {
    icon: Gem,
    title: "Visual premium",
    description: "Seu projeto não vai parecer mais um template genérico."
  },
  {
    icon: Globe2,
    title: "Sistema publicado",
    description: "Entrego com deploy, domínio e estrutura pronta para uso."
  },
  {
    icon: MessageSquareText,
    title: "Comunicação clara",
    description: "Explico o processo sem te afogar em termos técnicos."
  },
  {
    icon: Zap,
    title: "Velocidade com responsabilidade",
    description: "Uso IA para acelerar, mas valido decisões, código e experiência final."
  }
];

export function WhyWorkSection() {
  return (
    <section id="why" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            Por que trabalhar comigo?
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <SectionReveal key={reason.title} delay={index * 0.05}>
                <article className="group h-full min-h-[13rem] rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/50 hover:bg-white/[0.065]">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff] transition group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{reason.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-slate-300">{reason.description}</p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
