import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

const steps = [
  {
    title: "Descoberta",
    description: "Entendo sua ideia, objetivos e público."
  },
  {
    title: "Planejamento",
    description: "Definimos funcionalidades, escopo e prioridades."
  },
  {
    title: "Design & Prototipação",
    description: "Crio wireframes e interfaces modernas."
  },
  {
    title: "Desenvolvimento",
    description: "Transformo o projeto em sistema funcional."
  },
  {
    title: "Testes & Ajustes",
    description: "Testamos, validamos e ajustamos tudo."
  },
  {
    title: "Deploy & Entrega",
    description: "Seu sistema publicado e pronto para uso."
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            Como sua ideia vira um projeto publicado
          </div>
        </SectionReveal>

        <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 2xl:gap-9">
          {steps.map((step, index) => (
            <SectionReveal key={step.title} delay={index * 0.04} className="group relative">
              {index < steps.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[calc(100%+0.28rem)] z-20 flex -translate-x-1/2 flex-col items-center md:hidden"
                  >
                    <span className="h-8 w-px rounded-full bg-gradient-to-b from-[#7c6cff]/20 via-[#9b8cff]/70 to-[#22d3ee]/25 shadow-[0_0_18px_rgba(124,108,255,0.18)]" />
                    <span className="-mt-1 grid size-7 place-items-center rounded-full border border-[#7c6cff]/30 bg-[#07101d]/95 text-[#b7a8ff] shadow-[0_0_22px_rgba(124,108,255,0.2)] backdrop-blur-xl transition duration-300 group-hover:border-[#9b8cff]/55 group-hover:text-white">
                      <ArrowDown className="size-3.5 transition duration-300 group-hover:translate-y-0.5" />
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[calc(100%+1.125rem)] top-[4.8rem] z-20 hidden -translate-x-1/2 items-center 2xl:flex"
                  >
                    <span className="relative flex h-6 w-11 items-center justify-end overflow-hidden rounded-full border border-[#7c6cff]/20 bg-[#07101d]/70 pr-1.5 shadow-[0_0_20px_rgba(124,108,255,0.12)] backdrop-blur-xl transition duration-300 group-hover:border-[#9b8cff]/45 group-hover:bg-[#111936]/80 group-hover:shadow-[0_0_26px_rgba(124,108,255,0.22)]">
                      <span className="absolute left-1.5 right-4 top-1/2 h-px -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7c6cff]/20 via-[#9b8cff]/75 to-[#22d3ee]/45" />
                      <span className="absolute left-1.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#7c6cff]/60 shadow-[0_0_10px_rgba(124,108,255,0.5)]" />
                      <ArrowRight className="relative size-3.5 text-[#c4bbff] transition duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
                    </span>
                  </span>
                </>
              ) : null}
              <article className="relative h-full min-h-[14rem] rounded-[1.15rem] border border-white/10 bg-[#0b1220]/82 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/45 hover:bg-white/[0.055]">
                <span className="relative z-10 mb-6 grid size-14 place-items-center rounded-full border border-[#7c6cff]/35 bg-[#121a34] text-base font-semibold text-[#a99cff] shadow-[0_0_34px_rgba(124,108,255,0.26)]">
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-slate-300">{step.description}</p>
                <CheckCircle2 className="mt-5 size-4 text-emerald-400/80" />
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
