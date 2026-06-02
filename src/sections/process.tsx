import { CheckCircle2 } from "lucide-react";
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
    <section id="process" className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            Como sua ideia vira um projeto publicado
          </div>
        </SectionReveal>

        <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          <div className="absolute left-8 right-8 top-8 hidden border-t border-dashed border-white/18 xl:block" />
          {steps.map((step, index) => (
            <SectionReveal key={step.title} delay={index * 0.04}>
              <article className="relative h-full rounded-[1.15rem] border border-white/10 bg-[#0b1220]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/45 hover:bg-white/[0.05]">
                <span className="relative z-10 mb-5 grid size-12 place-items-center rounded-full border border-[#7c6cff]/35 bg-[#121a34] text-sm font-semibold text-[#a99cff] shadow-[0_0_32px_rgba(124,108,255,0.22)]">
                  {index + 1}
                </span>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
                <CheckCircle2 className="mt-5 size-4 text-emerald-400/80" />
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
