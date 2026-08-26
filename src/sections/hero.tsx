import Image from "next/image";
import { ArrowDownRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const proofItems = [
  "Projeto real em produção",
  "Sistema responsivo",
  "Desenvolvimento full stack",
  "Suporte próximo",
];

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_22%,rgba(255,98,56,0.13),transparent_30rem),radial-gradient(circle_at_9%_18%,rgba(213,47,73,0.08),transparent_25rem)]" />
      <div className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#ff8d52] sm:text-sm">
            <span className="h-px w-8 bg-[#ff6a3d]" aria-hidden="true" />
            {siteConfig.availability}
          </p>

          <h1 className="font-display max-w-[46rem] text-balance text-[2.22rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-white sm:text-[3.55rem] lg:text-[3.75rem] xl:text-[4.25rem]">
            Transformo processos manuais em{" "}
            <span className="bg-gradient-to-r from-[#ffb047] via-[#ff6d3d] to-[#e83b4d] bg-clip-text text-transparent">
              sistemas web
            </span>{" "}
            simples de usar.
          </h1>

          <p className="mt-6 max-w-[42rem] text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {siteConfig.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.hero.primaryCta.href}
              data-analytics-event="cta_click"
              data-analytics-label={siteConfig.hero.primaryCta.label}
              data-analytics-location="hero"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9a3d] via-[#ff6238] to-[#dc3348] px-6 text-sm font-bold text-[#070b13] shadow-[0_18px_50px_rgba(255,91,52,0.24)] transition hover:-translate-y-0.5"
            >
              {siteConfig.hero.primaryCta.label}
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={siteConfig.hero.secondaryCta.href}
              data-analytics-event="cta_click"
              data-analytics-label={siteConfig.hero.secondaryCta.label}
              data-analytics-location="hero"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-6 text-sm font-bold text-white transition hover:border-[#ff7243]/60 hover:bg-white/[0.07]"
            >
              {siteConfig.hero.secondaryCta.label}
              <ArrowDownRight className="size-4 text-[#ff8851]" />
            </a>
          </div>

          <ul className="mt-7 grid gap-3 text-sm text-slate-300 min-[430px]:grid-cols-2" aria-label="Diferenciais do trabalho">
            {proofItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#ff7a49]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-full bg-[#ff5935]/10 blur-3xl" aria-hidden="true" />
          <figure className="overflow-hidden rounded-2xl border border-white/12 bg-[#091220] p-2 shadow-[0_32px_100px_rgba(0,0,0,0.52)] sm:p-3">
            <div className="flex items-center justify-between border-b border-white/10 px-2 pb-2 sm:px-3 sm:pb-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff6b4a]" />
                <span className="size-2.5 rounded-full bg-[#ffb346]" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Sistema real</span>
            </div>
            <Image
              src={siteConfig.hero.art.src}
              alt={siteConfig.hero.art.alt}
              width={1919}
              height={909}
              priority
              sizes="(max-width: 1024px) 92vw, 54vw"
              className="mt-2 aspect-[16/9] w-full rounded-xl object-cover object-left-top sm:mt-3"
            />
            <figcaption className="flex flex-col gap-3 px-2 pb-1 pt-4 sm:flex-row sm:items-end sm:justify-between sm:px-3">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#ff8d52]">Case em destaque</span>
                <span className="mt-1 block text-sm font-semibold text-white sm:text-base">Centro da Juventude de Almirante Tamandaré</span>
              </div>
              <span className="whitespace-nowrap text-xs text-slate-400">735+ alunos acompanhados</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
