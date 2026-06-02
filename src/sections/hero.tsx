"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Headphones,
  MessageCircle,
  MonitorSmartphone,
  Zap
} from "lucide-react";
import { siteConfig } from "@/config/site";

const benefits = [
  { label: "Soluções completas", icon: CheckCircle2 },
  { label: "Entrega ágil", icon: Zap },
  { label: "Suporte próximo", icon: Headphones },
  { label: "100% Responsivo", icon: MonitorSmartphone }
];

function HeroDashboard() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-10 w-full max-w-[34rem] sm:max-w-[48rem] lg:-ml-14 lg:mt-0 lg:max-w-none xl:-ml-20"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d5dfc]/28 blur-3xl sm:h-96 sm:w-96"
        animate={{ opacity: [0.42, 0.82, 0.42], scale: [1, 1.16, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Image
        src={siteConfig.hero.art.src}
        alt={siteConfig.hero.art.alt}
        width={1672}
        height={941}
        priority
        sizes="(max-width: 640px) 114vw, (max-width: 1024px) 92vw, 72vw"
        className="h-auto w-full origin-center scale-[1.12] select-none object-contain mix-blend-lighten drop-shadow-[0_34px_90px_rgba(0,0,0,0.48)] transform-gpu sm:scale-100 lg:origin-left lg:scale-[1.28] lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_100%)] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_100%)] xl:scale-[1.36]"
      />
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-visible px-4 pb-10 pt-28 sm:px-6 sm:pb-8 lg:pt-28">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_25%_12%,rgba(88,80,236,0.22),transparent_28rem),radial-gradient(circle_at_82%_14%,rgba(34,211,238,0.12),transparent_24rem)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-px w-[min(70rem,90vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="mx-auto grid max-w-[82rem] gap-4 sm:gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Desenvolvedor Full Stack
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[46rem] text-balance text-[2.08rem] font-semibold leading-[1.07] tracking-normal text-white min-[380px]:text-[2.28rem] sm:text-5xl lg:text-[3.35rem] xl:text-[3.6rem]"
          >
            Crio{" "}
            <span className="bg-gradient-to-r from-[#b7a8ff] to-[#6d5dfc] bg-clip-text text-transparent">
              sites
            </span>{" "}
            e{" "}
            <span className="bg-gradient-to-r from-[#c5d2ff] to-[#8b5cf6] bg-clip-text text-transparent">
              sistemas
            </span>{" "}
            web que parecem premium,{" "}
            <span className="text-[#9b8cff]">funcionam de verdade</span> e{" "}
            <span className="text-[#7c6cff]">saem do papel rápido.</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8"
          >
            {siteConfig.hero.description}
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row"
          >
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(109,93,252,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Ver projetos
              <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={siteConfig.whatsapp.messageHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#8b7cff]/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Falar comigo
              <MessageCircle className="size-4" />
            </a>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4 text-xs text-slate-400 sm:mt-7 sm:flex sm:flex-wrap"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <span key={benefit.label} className="inline-flex items-center gap-2 rounded-full text-slate-400">
                  <span className="grid size-7 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Icon className="size-3.5 text-[#9b8cff]" />
                  </span>
                  {benefit.label}
                </span>
              );
            })}
          </motion.div>
        </div>

        <HeroDashboard />
      </div>
    </section>
  );
}
