"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileSpreadsheet,
  Github,
  Lock,
  Server,
  Smartphone,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

type Audience = "business" | "devs";

const caseBullets = [
  "Desenvolvimento full stack",
  "Design responsivo e moderno",
  "Sistema em produção",
  "Dados seguros e organizados"
];

const caseMetrics = [
  { value: "+50", label: "Planilhas importadas", icon: FileSpreadsheet },
  { value: "+126", label: "Chamadas realizadas", icon: CheckCircle2 },
  { value: "+660", label: "Frequências registradas", icon: Server },
  { value: "100%", label: "Sistema responsivo", icon: Smartphone },
  { value: "1", label: "Sistema em produção", icon: Cloud }
];

const stackCards = [
  {
    icon: Code2,
    eyebrow: "NEXT",
    title: "Next / React",
    description:
      "Next.js, React, TypeScript, Tailwind CSS e Framer Motion para interfaces modernas, rápidas e responsivas."
  },
  {
    icon: Server,
    eyebrow: "Backend",
    title: "Node Backend",
    description: "Node.js, APIs REST, autenticação, regras de negócio e lógica escalável."
  },
  {
    icon: Database,
    eyebrow: "Banco de dados",
    title: "PostgreSQL",
    description: "Modelagem, relacionamentos, consultas otimizadas e dados organizados."
  },
  {
    icon: Cloud,
    eyebrow: "Deploy",
    title: "Vercel / Produção",
    description: "Deploy em produção, domínio, SSL, variáveis de ambiente e ambiente publicado."
  },
  {
    icon: BrainCircuit,
    eyebrow: "IA no workflow",
    title: "IA no workflow",
    description: "Prototipagem, revisão de código, debugging e melhoria visual com validação humana."
  }
];

function AudienceToggle({ active, onChange }: { active: Audience; onChange: (value: Audience) => void }) {
  const tabs = [
    {
      value: "business" as const,
      label: "Para empresas",
      description: "Entenda como transformo ideias em sistemas e sites publicados.",
      icon: Lock
    },
    {
      value: "devs" as const,
      label: "Para devs",
      description: "Veja minha stack, arquitetura e bastidores técnicos.",
      icon: Code2
    }
  ];

  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-4">
      <p className="mb-4 text-center text-[0.95rem] font-medium leading-6 text-slate-300 sm:text-sm">
        Dois jeitos de conhecer meu trabalho. Escolha o seu:
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = active === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(tab.value)}
              className={[
                "group relative min-h-[6.4rem] overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-h-0",
                selected
                  ? "border-[#7c6cff] bg-[#20264d]/70 shadow-[0_0_32px_rgba(124,108,255,0.32)]"
                  : "border-white/10 bg-[#0b1220]/70 hover:border-[#7c6cff]/55 hover:bg-white/[0.055]"
              ].join(" ")}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#7c6cff]/18 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="relative flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#9b8cff]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-white sm:text-sm">{tab.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-400 sm:text-xs sm:leading-5">{tab.description}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectVisual() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#08111e] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-slate-950">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-black/30 px-5 py-4 text-xs text-slate-200 backdrop-blur-xl">
            <span className="font-semibold">Centro da Juventude</span>
            <span className="rounded-full border border-white/15 px-3 py-1">Painel Administrativo</span>
          </div>
          <div className="relative min-h-[300px] bg-gradient-to-br from-slate-900 via-[#0a1c2a] to-[#1b1742] p-8 pt-20 sm:min-h-[390px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(34,211,238,0.18),transparent_18rem),radial-gradient(circle_at_80%_60%,rgba(124,108,255,0.2),transparent_18rem)]" />
            <div className="relative mx-auto flex h-full min-h-[250px] max-w-[32rem] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black p-3 sm:p-5">
              <Image
                src={siteConfig.projects[0].image}
                alt="Centro da Juventude Almirante Tamandaré"
                width={1100}
                height={840}
                className="h-auto w-full scale-[1.7] rounded-xl object-contain sm:scale-[1.82]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-2 bottom-8 hidden w-36 rounded-[1.2rem] border border-white/15 bg-[#0b111d] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:block lg:-right-8 lg:w-44">
        <div className="rounded-[0.9rem] bg-white p-3 text-[#0b111d]">
          <p className="text-xs font-bold text-emerald-600">Inscrição realizada com sucesso!</p>
          <div className="mt-3 space-y-2">
            {["Dados salvos", "Turma definida", "Acesso liberado"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-[0.62rem] text-slate-600">
                <CheckCircle2 className="size-3 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ManualDocumentsPreview() {
  return (
    <div className="relative flex min-h-[12rem] items-center justify-center overflow-hidden rounded-2xl bg-[#050912]/80 p-2 sm:min-h-[14rem] sm:p-3">
      <Image
        src="/images/before-manual-documents.jpg"
        alt="Documentos e caneta representando processo manual"
        width={1280}
        height={960}
        loading="eager"
        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 32vw"
        className="h-auto max-h-[15.5rem] w-full rounded-xl object-contain"
      />
    </div>
  );
}

function SystemDashboardPreview() {
  return (
    <div className="relative flex min-h-[12rem] items-center justify-center overflow-hidden rounded-2xl bg-[#050912]/80 p-2 sm:min-h-[14rem] sm:p-3">
      <Image
        src="/images/after-dashboard-system.jpg"
        alt="Dashboard escuro representando sistema centralizado"
        width={1280}
        height={960}
        loading="eager"
        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 32vw"
        className="h-auto max-h-[15.5rem] w-full rounded-xl object-contain"
      />
    </div>
  );
}

function BusinessPanel() {
  const project = siteConfig.projects[0];

  return (
    <motion.div
      key="business"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            Case de destaque
          </div>
          <h2 className="max-w-xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Sistema completo para o Centro da Juventude Almirante Tamandaré
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Plataforma web desenvolvida para gerenciar inscrições, oficinas, turmas, chamadas e frequência dos alunos.
            Painel administrativo completo com perfis, permissões e relatórios.
          </p>

          <div className="mt-6 grid gap-2">
            {caseBullets.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="size-4 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.35)] transition hover:-translate-y-0.5"
            >
              Ver estudo de caso
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
            >
              Acessar projeto
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        <ProjectVisual />
      </div>

      <div className="rounded-[1.2rem] border border-white/10 bg-[#0b1220]/92 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {caseMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <span className="grid size-10 place-items-center rounded-xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xl font-semibold text-[#a99cff]">{metric.value}</span>
                  <span className="text-[0.7rem] text-slate-400">{metric.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-3 sm:p-6">
          <div className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
            <XCircle className="size-5 text-red-400" />
            Antes
          </div>
          <div className="grid gap-5 sm:grid-cols-[0.82fr_1.18fr] sm:items-center">
            <p className="text-[0.95rem] leading-7 text-slate-300">
              Processos manuais, informações espalhadas, dificuldade para acompanhar inscrições e gerenciar alunos.
            </p>
            <ManualDocumentsPreview />
          </div>
        </div>

        <div className="rounded-[1.3rem] border border-emerald-400/25 bg-emerald-500/[0.035] p-3 sm:p-6">
          <div className="mb-5 flex items-center gap-2 text-base font-semibold text-white">
            <CheckCircle2 className="size-5 text-emerald-400" />
            Depois
          </div>
          <div className="grid gap-5 sm:grid-cols-[0.82fr_1.18fr] sm:items-center">
            <p className="text-[0.95rem] leading-7 text-slate-300">
              Sistema centralizado, painel administrativo completo, dados organizados e acesso online de qualquer lugar.
            </p>
            <SystemDashboardPreview />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DevPanel() {
  return (
    <motion.div
      key="devs"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
          Stack que uso para tirar projetos do papel
        </div>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 text-slate-300">
          Bastidores técnicos para quem quer entender como o projeto é construído.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stackCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="group flex h-full min-h-[17rem] flex-col rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/50 hover:bg-white/[0.065]"
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#9b8cff]">
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-semibold text-slate-400">{card.eyebrow}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-7 text-slate-300">{card.description}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
        <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#030712] font-mono text-[0.95rem] shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.035] px-5 py-3">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-yellow-300" />
            <span className="size-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-sans text-slate-500">deploy.sh</span>
          </div>
          <div className="p-6">
          {[
            "$ git add .",
            '$ git commit -m "feat: nova funcionalidade"',
            "$ npm run build",
            "$ vercel deploy --prod",
            "✔ Deploy concluído: sistema publicado com sucesso."
          ].map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="leading-8 text-emerald-300"
            >
              {line}
            </motion.p>
          ))}
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-7">
          <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff]">
            <Github className="size-6" />
          </div>
          <h3 className="text-2xl font-semibold text-white">Do planejamento ao deploy: seu projeto pronto para ser usado.</h3>
          <p className="mt-4 text-[0.95rem] leading-7 text-slate-300">
            Cuido de toda a parte técnica para você não precisar se preocupar com código, banco de dados, publicação
            ou configurações.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AudienceTabsSection() {
  const [active, setActive] = useState<Audience>("business");

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#devs") {
        setActive("devs");
      } else if (window.location.hash === "#work") {
        setActive("business");
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <section id="work" className="scroll-mt-28 px-4 pb-8 pt-8 sm:px-6 sm:pt-2">
      <span id="devs" className="block scroll-mt-28" aria-hidden="true" />
      <div className="mx-auto max-w-[76rem]">
        <AudienceToggle active={active} onChange={setActive} />
        <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-[#07101d]/80 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-7">
          <AnimatePresence mode="wait">{active === "business" ? <BusinessPanel /> : <DevPanel />}</AnimatePresence>
        </div>
      </div>
    </section>
  );
}
