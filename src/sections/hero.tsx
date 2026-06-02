"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Headphones,
  MessageCircle,
  MonitorSmartphone,
  Sparkles,
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
  const stats = [
    ["Novos leads", "128"],
    ["Tarefas ativas", "24"],
    ["Usuários", "632"],
    ["Frequência", "660"]
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-10 min-h-[315px] w-full max-w-[25rem] sm:min-h-[440px] sm:max-w-none lg:-ml-10 lg:mt-0 lg:min-h-[520px] xl:-ml-14 xl:min-h-[550px]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-16 z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#6d5dfc]/30 blur-3xl sm:h-96 sm:w-96 sm:bg-[#6d5dfc]/35"
        animate={{ opacity: [0.42, 0.82, 0.42], scale: [1, 1.16, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-1 top-2 z-30 hidden rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs text-slate-200 shadow-[0_14px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mr-2 size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
        Sistema publicado
      </motion.div>

      <motion.div
        className="absolute left-1 top-[42%] z-30 hidden rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs text-slate-200 shadow-[0_14px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="mr-2 size-3.5 text-yellow-300" />
        IA no workflow
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-8 z-40 hidden rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs text-slate-200 shadow-[0_14px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="mr-2 size-3.5 text-[#a78bfa]" />
        Design premium
      </motion.div>

      <div className="absolute left-[7%] top-[8%] z-10 w-[84%] rotate-[-1deg] rounded-[1.35rem] border border-white/15 bg-[#080d16]/95 p-2 shadow-[0_28px_80px_rgba(0,0,0,0.64)] backdrop-blur-2xl sm:left-[2%] sm:top-[5%] sm:w-[92%] sm:rotate-[-3deg] sm:rounded-[1.6rem] sm:p-3 lg:left-[4%] lg:w-[90%]">
        <div className="rounded-[1rem] border border-white/10 bg-[#0b111d] p-3 sm:rounded-[1.2rem] sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-3 text-[0.56rem] text-slate-500 sm:mb-5 sm:text-[0.62rem]">
            <span className="font-semibold text-slate-300">Dashboard da sua empresa</span>
            <span className="hidden min-[380px]:inline">Resultados em tempo real</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {stats.map(([label, value], index) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.035] p-2 sm:rounded-xl sm:p-3">
                <p className="text-[0.54rem] text-slate-500 sm:text-[0.58rem]">{label}</p>
                <p className="mt-1 text-base font-semibold text-white sm:text-lg">{value}</p>
                <div className="mt-2 flex h-5 items-end gap-1 sm:mt-3 sm:h-7">
                  {[0.45, 0.68, 0.54, 0.86, 0.72].map((height, barIndex) => (
                    <span
                      key={`${label}-${barIndex}`}
                      className="w-full rounded-full bg-gradient-to-t from-[#6d5dfc] to-[#22d3ee]"
                      style={{ height: `${height * (index + 2) * 8}px`, maxHeight: "24px" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 hidden gap-3 sm:mt-4 sm:grid sm:grid-cols-[1.35fr_0.75fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">Crescimento por mês</span>
                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[0.6rem] text-emerald-300">+42%</span>
              </div>
              <svg viewBox="0 0 320 118" className="h-32 w-full overflow-visible" aria-hidden="true">
                <defs>
                  <linearGradient id="hero-chart" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 102 C36 90 42 72 68 76 C101 82 102 44 136 48 C169 52 170 30 202 36 C238 43 245 18 272 24 C292 28 303 18 320 12 L320 118 L0 118 Z"
                  fill="url(#hero-chart)"
                />
                <path
                  d="M0 102 C36 90 42 72 68 76 C101 82 102 44 136 48 C169 52 170 30 202 36 C238 43 245 18 272 24 C292 28 303 18 320 12"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </svg>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-medium text-slate-300">Objetivos principais</p>
              <div className="mt-5 space-y-3">
                {["Conversão", "Gestão", "Performance"].map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: ["#8b5cf6", "#22d3ee", "#fb7185"][index] }} />
                    <span className="flex-1 text-[0.65rem] text-slate-400">{label}</span>
                    <span className="text-[0.65rem] text-slate-300">{[82, 73, 91][index]}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto h-3 w-[78%] rounded-b-[2rem] bg-gradient-to-b from-slate-500/35 to-slate-900/20 blur-[1px] sm:h-4 sm:w-[84%]" />
      </div>

      <div className="absolute bottom-7 right-[8%] z-30 hidden w-[31%] min-w-[104px] max-w-[132px] rounded-[1.15rem] border border-white/15 bg-[#080d16] p-1.5 shadow-[0_22px_58px_rgba(0,0,0,0.62)] min-[360px]:block sm:bottom-6 sm:right-[2%] sm:w-[36%] sm:min-w-[138px] sm:max-w-[210px] sm:rounded-[1.5rem] sm:p-2">
        <div className="rounded-[0.9rem] border border-white/10 bg-[#0b111d] p-2 sm:rounded-[1.1rem] sm:p-3">
          <div className="mb-2 flex items-center justify-between text-[0.48rem] text-slate-500 sm:mb-4 sm:text-[0.55rem]">
            <span>Painel da sua marca</span>
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-lg bg-gradient-to-br from-[#6d5dfc]/30 to-[#22d3ee]/10 p-2 sm:rounded-xl sm:p-3">
            <p className="text-[0.56rem] font-semibold text-white sm:text-[0.64rem]">Gestão do negócio</p>
            <p className="mt-1 hidden text-[0.55rem] text-slate-400 min-[380px]:block">Tudo em um lugar.</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:gap-2">
            {["128", "24", "632", "660"].map((value) => (
              <div key={value} className="rounded-md border border-white/10 bg-white/[0.035] p-1.5 sm:rounded-lg sm:p-2">
                <p className="text-[0.56rem] font-semibold text-white sm:text-[0.65rem]">{value}</p>
                <div className="mt-1 h-1 rounded-full bg-[#6d5dfc] sm:mt-2 sm:h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Desenvolvedor Full Stack
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8"
          >
            {siteConfig.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
            initial={{ opacity: 0, y: 14 }}
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
