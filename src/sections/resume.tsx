import { Download, FileText } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

export function ResumeSection() {
  return (
    <section id="resume" className="scroll-mt-28 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal>
          <article className="group flex flex-col gap-6 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/50 hover:bg-white/[0.065] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-2xl gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff] transition group-hover:scale-105">
                <FileText className="size-6" />
              </span>
              <div>
                <p className="mb-2 inline-flex rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
                  Currículo
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Currículo</h2>
                <p className="mt-3 text-[0.98rem] leading-7 text-slate-300">
                  Quer uma visão rápida da minha formação, stack e experiência com projetos reais?
                </p>
              </div>
            </div>

            <a
              href="/VitorHamad_Curriculo.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7c6cff]/30 bg-[#7c6cff]/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(124,108,255,0.16)] transition duration-300 hover:-translate-y-0.5 hover:border-[#a89cff]/55 hover:bg-[#7c6cff]/25 sm:w-auto"
            >
              <Download className="size-4" />
              Baixar currículo em PDF
            </a>
          </article>
        </SectionReveal>
      </div>
    </section>
  );
}
