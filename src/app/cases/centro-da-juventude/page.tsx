import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardList,
  Database,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Centro da Juventude | Vitor Hamad",
  description:
    "Estudo de caso de sistema web full stack para gestão de inscrições, alunos, chamadas, frequência, relatórios, Google Sheets e IA.",
  openGraph: {
    title: "Case Centro da Juventude | Vitor Hamad",
    description:
      "Estudo de caso de sistema web full stack para gestão de inscrições, alunos, chamadas, frequência, relatórios, Google Sheets e IA.",
    url: `${siteConfig.seo.siteUrl}/cases/centro-da-juventude`,
    images: [{ url: "/images/cases/cj/admin-dashboard.png", width: 1920, height: 900 }],
    type: "article"
  }
};

const badges = ["Projeto real em produção", "Full Stack", "Painel Administrativo", "Google Sheets API", "IA", "PostgreSQL", "Vercel"];

const impactMetrics = [
  { value: "735+", label: "alunos ativos acompanhados" },
  { value: "28+", label: "oficinas cadastradas" },
  { value: "68+", label: "turmas configuradas" },
  { value: "50+", label: "planilhas processadas" },
  { value: "660+", label: "frequências registradas" },
  { value: "126+", label: "chamadas criadas" },
  { value: "426", label: "registros de lista de espera" },
  { value: "IA", label: "relatórios com recomendações" }
];

const problemPoints = [
  "Informações espalhadas em diferentes planilhas",
  "Dificuldade para acompanhar alunos, turmas e oficinas",
  "Retrabalho na conferência de dados",
  "Pouca visibilidade sobre faltas, ocupação e demanda",
  "Necessidade de relatórios mais rápidos para tomada de decisão",
  "Atendimento e suporte sem histórico centralizado"
];

const solutionPoints = [
  "Site público institucional",
  "Inscrição online",
  "Portal do aluno com CPF e matrícula",
  "Painel administrativo com permissões",
  "Gestão de alunos, turmas e oficinas",
  "Chamadas e controle de frequência",
  "Tickets de suporte",
  "Dashboard com indicadores",
  "Relatórios automáticos",
  "Análise com IA baseada em estatísticas agregadas",
  "Importação e sincronização com Google Sheets",
  "Logs de auditoria",
  "Manual ADM interno"
];

const features = [
  {
    icon: GraduationCap,
    title: "Portal público",
    description: "Apresenta o Centro da Juventude, oficinas, agenda, galeria, inscrições e informações para a comunidade."
  },
  {
    icon: ClipboardList,
    title: "Inscrição online",
    description: "Permite que alunos e responsáveis façam cadastro e enviem informações necessárias para participação nas oficinas."
  },
  {
    icon: Users,
    title: "Portal do aluno",
    description: "Área para consultar turmas, frequência, próximas aulas, mural, notificações e histórico de chamados."
  },
  {
    icon: Lock,
    title: "Painel administrativo",
    description: "Ambiente interno para acompanhar inscrições, alunos, turmas, oficinas, documentos, frequência, suporte e métricas."
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Indicadores de inscritos, oficinas, turmas, lista de espera, faltas recorrentes e turmas com baixa procura."
  },
  {
    icon: CheckCircle2,
    title: "Chamadas e frequência",
    description: "Registro de presença, faltas e justificativas, mantendo histórico organizado por turma e oficina."
  },
  {
    icon: MessageSquareText,
    title: "Suporte e tickets",
    description: "Canal para abertura e acompanhamento de chamados, com histórico e controle administrativo."
  },
  {
    icon: BarChart3,
    title: "Relatórios e gráficos",
    description: "Visualização de dados consolidados, ocupação, frequência, demanda, lista de espera e alertas administrativos."
  },
  {
    icon: Bot,
    title: "Análise com IA",
    description: "Recomendações com base em estatísticas agregadas para identificar prioridades e pontos de atenção."
  },
  {
    icon: FileSpreadsheet,
    title: "Google Sheets",
    description: "Importação e sincronização de planilhas oficiais, reduzindo retrabalho e mantendo compatibilidade com a rotina."
  },
  {
    icon: ShieldCheck,
    title: "Logs e auditoria",
    description: "Registro de ações administrativas para aumentar rastreabilidade e segurança operacional."
  },
  {
    icon: Sparkles,
    title: "Manual ADM",
    description: "Guia interno para orientar o uso correto do painel e reduzir dúvidas da equipe."
  }
];

const gallery = [
  {
    src: "/images/cases/cj/public-home.png",
    title: "Tela inicial pública",
    caption: "Página principal do site, com apresentação institucional e acesso rápido às oficinas e inscrições.",
    wide: true
  },
  {
    src: "/images/cases/cj/public-home-light.png",
    title: "Tela inicial em modo claro",
    caption: "Versão clara da página principal, mantendo identidade visual, navegação e chamada para oficinas.",
    wide: true
  },
  {
    src: "/images/cases/cj/featured-workshop-light.png",
    title: "Oficina em destaque",
    caption: "Card de oficina em destaque com informações de faixa etária, vagas, chamada de inscrição e horários.",
    wide: true
  },
  {
    src: "/images/cases/cj/collaborators-light.png",
    title: "Colaboradores",
    caption: "Seção institucional com parceiros e links externos, usando a versão clara da interface pública.",
    wide: true
  },
  {
    src: "/images/cases/cj/student-portal.png",
    title: "Portal do aluno",
    caption: "Área para acesso com CPF e matrícula, consulta de informações e abertura de tickets."
  },
  {
    src: "/images/cases/cj/admin-login.png",
    title: "Login administrativo",
    caption: "Tela de acesso restrito para equipe autorizada."
  },
  {
    src: "/images/cases/cj/admin-dashboard.png",
    title: "Dashboard administrativo",
    caption: "Central de indicadores com inscritos, oficinas, turmas, documentos, faltas, lista de espera e ações prioritárias.",
    wide: true
  },
  {
    src: "/images/cases/cj/ai-report.png",
    title: "Relatório automático com IA",
    caption: "Área de análise inteligente com dados agregados e recomendações práticas.",
    wide: true
  },
  {
    src: "/images/cases/cj/ai-summary.png",
    title: "Resumo e ações sugeridas",
    caption: "Visão consolidada com alertas administrativos, ocupação, lista de espera e sugestões de ação."
  },
  {
    src: "/images/cases/cj/admin-manual.png",
    title: "Manual ADM",
    caption: "Documentação interna para orientar o uso seguro e correto do painel."
  }
];

const techStacks = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Interface responsiva", "Painel administrativo", "Componentes reutilizáveis"]
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "APIs REST", "Validações no servidor", "Serviços separados por responsabilidade"]
  },
  {
    title: "Banco de dados",
    items: ["PostgreSQL", "Neon", "Alunos, turmas, oficinas", "Chamadas, frequência, tickets e logs"]
  },
  {
    title: "Deploy e infraestrutura",
    items: ["Vercel", "Variáveis de ambiente", "Rotinas automatizadas", "Integração com serviços externos"]
  },
  {
    title: "Integrações",
    items: ["Google Sheets API", "Google Drive API", "Importação de planilhas", "Sincronização de dados"]
  },
  {
    title: "Segurança",
    items: ["JWT", "Controle de permissões", "CSRF", "Rate limit", "Logs de auditoria", "Mascaramento de dados sensíveis"]
  },
  {
    title: "IA",
    items: ["Análise de dados agregados", "Recomendações administrativas", "Relatórios automáticos", "Apoio à tomada de decisão"]
  }
];

const challenges = [
  {
    title: "Transformar planilhas em dados estruturados",
    description: "O sistema precisava lidar com dados vindos de planilhas oficiais e transformar essas informações em registros utilizáveis no banco."
  },
  {
    title: "Manter compatibilidade com o processo existente",
    description: "A integração com Sheets permitiu modernizar a operação sem quebrar a rotina já usada pela equipe."
  },
  {
    title: "Criar um painel útil para uso real",
    description: "O painel precisava ser claro, direto e funcional para pessoas que não são técnicas."
  },
  {
    title: "Evitar retrabalho administrativo",
    description: "A centralização dos dados reduziu consultas manuais e facilitou o acompanhamento de alunos, turmas e oficinas."
  },
  {
    title: "Proteger dados sensíveis",
    description: "Foram aplicados cuidados com autenticação, permissões, logs e mascaramento de informações."
  },
  {
    title: "Gerar informações acionáveis",
    description: "Alertas, relatórios, gráficos e análise com IA ajudam a equipe a tomar decisões com mais clareza."
  }
];

const results = [
  "Dados centralizados em uma única plataforma",
  "Redução de retrabalho manual",
  "Melhor acompanhamento de alunos e turmas",
  "Controle de chamadas e frequência",
  "Lista de espera mais visível",
  "Painel com indicadores administrativos",
  "Suporte com histórico",
  "Relatórios mais rápidos",
  "IA auxiliando na priorização de ações",
  "Maior rastreabilidade por meio de logs"
];

const participation = [
  "Planejamento das funcionalidades",
  "Desenvolvimento frontend",
  "Desenvolvimento backend",
  "Modelagem de dados",
  "Integração com Google Sheets e Drive",
  "Criação do painel administrativo",
  "Implementação do Portal do Aluno",
  "Criação dos módulos de chamadas, frequência e tickets",
  "Implementação de relatórios, gráficos e análise com IA",
  "Cuidados com segurança e permissões",
  "Deploy e manutenção"
];

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-xs font-semibold text-[#b7a8ff]">
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 inline-flex rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
          <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CentroDaJuventudeCasePage() {
  return (
    <main className="overflow-hidden bg-[#050b14] text-white">
      <section className="relative px-4 pb-14 pt-32 sm:px-6 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.16),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(124,108,255,0.2),transparent_24rem)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />

        <div className="relative mx-auto max-w-[86rem]">
          <Link href="/#work" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            <ArrowLeft className="size-4" />
            Voltar ao portfólio
          </Link>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Centro da Juventude Almirante Tamandaré
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Sistema web completo para gestão de inscrições, alunos, oficinas, chamadas, frequência, suporte, relatórios,
                integração com Google Sheets e análise com IA.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://cjtamandare.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0ea5e9] via-[#10b981] to-[#22d3ee] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(14,165,233,0.24)] transition hover:-translate-y-0.5"
                >
                  Ver projeto online
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/#work"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
                >
                  Voltar ao portfólio
                </Link>
              </div>
            </div>

            <figure className="rounded-[1.6rem] border border-white/10 bg-[#0b1220]/80 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <Image
                src="/images/cases/cj/admin-dashboard.png"
                alt="Dashboard administrativo do sistema Centro da Juventude"
                width={1920}
                height={900}
                priority
                unoptimized
                className="h-auto w-full rounded-[1.1rem] border border-white/10 object-cover"
              />
              <figcaption className="px-2 pt-3 text-sm text-slate-400">Dashboard administrativo com indicadores agregados do sistema.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
          <SectionHeader eyebrow="Resumo rápido" title="Da gestão manual para uma plataforma centralizada." />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-base leading-8 text-slate-300">
                O Centro da Juventude Almirante Tamandaré precisava centralizar processos que antes dependiam de planilhas,
                controles manuais e consultas espalhadas. Desenvolvi um sistema web para organizar inscrições, alunos, turmas,
                chamadas, frequência, suporte, relatórios e dados administrativos em uma única plataforma.
              </p>
              <p className="mt-5 text-base leading-8 text-slate-300">
                O projeto foi pensado para uso real por equipe administrativa, alunos e responsáveis, com foco em clareza,
                segurança, produtividade e redução de retrabalho.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {impactMetrics.map((metric) => (
                <article key={metric.label} className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5">
                  <strong className="block text-3xl font-semibold text-[#7c6cff]">{metric.value}</strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-300">{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Métricas apresentadas como dados agregados do sistema, sem identificação individual.</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="O problema" title="Processos importantes estavam espalhados." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              Antes do sistema, boa parte da gestão dependia de planilhas, conferências manuais e processos separados. Isso dificultava
              o acompanhamento de inscrições, chamadas, presença dos alunos, documentos, lista de espera e relatórios administrativos.
            </p>
            <CheckList items={problemPoints} />
          </article>

          <article className="rounded-[1.6rem] border border-emerald-400/20 bg-emerald-500/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="A solução" title="Uma plataforma completa para a operação." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              Desenvolvi uma plataforma web completa para centralizar a operação do Centro da Juventude. O sistema reúne portal público,
              inscrição online, portal do aluno, painel administrativo, chamadas, frequência, tickets, relatórios, gráficos, integração
              com Google Sheets e recursos com IA para apoiar decisões administrativas.
            </p>
            <CheckList items={solutionPoints} />
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem]">
          <SectionHeader eyebrow="Funcionalidades principais" title="Módulos criados para uso real." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="group min-h-[13rem] rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/50 hover:bg-white/[0.065]">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff] transition group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-slate-300">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="case-gallery" className="scroll-mt-28 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem]">
          <SectionHeader
            eyebrow="Telas do sistema"
            title="Prints demonstrativos do case."
            description="As telas abaixo mostram áreas públicas e administrativas do sistema, usando apenas imagens sem dados pessoais sensíveis."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {gallery.map((item, index) => (
              <figure
                key={item.title}
                className={[
                  "rounded-[1.4rem] border border-white/10 bg-[#07101d]/78 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl",
                  item.wide ? "lg:col-span-2" : ""
                ].join(" ")}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={1920}
                  height={900}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes={item.wide ? "(max-width: 1024px) 100vw, 86rem" : "(max-width: 1024px) 100vw, 42rem"}
                  unoptimized
                  className="h-auto w-full rounded-[1rem] border border-white/10 object-cover"
                />
                <figcaption className="p-4">
                  <strong className="block text-lg font-semibold text-white">{item.title}</strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-400">{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
          <SectionHeader eyebrow="Arquitetura e tecnologias" title="Base técnica do sistema." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {techStacks.map((stack) => (
              <article key={stack.title} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{stack.title}</h3>
                <ul className="mt-4 space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
                      <Database className="mt-1 size-3.5 shrink-0 text-[#7c6cff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem]">
          <SectionHeader eyebrow="Principais desafios" title="O que exigiu mais cuidado técnico e de produto." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {challenges.map((challenge) => (
              <article key={challenge.title} className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-slate-300">{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="Resultados alcançados" title="Operação mais organizada e acompanhável." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              O sistema passou a centralizar a gestão operacional do Centro da Juventude, facilitando o acompanhamento de inscrições,
              alunos, chamadas, frequência, lista de espera e relatórios. A equipe ganhou uma visão mais clara da operação e passou a
              contar com indicadores para identificar pendências, baixa procura, faltas recorrentes e necessidade de ações administrativas.
            </p>
            <CheckList items={results} />
          </article>

          <article className="rounded-[1.6rem] border border-[#7c6cff]/20 bg-[#7c6cff]/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="Minha participação" title="Desenvolvimento completo do sistema." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              Fui responsável pelo desenvolvimento completo do sistema, desde a estrutura visual e experiência de uso até backend, banco de
              dados, integrações, painel administrativo, autenticação, regras de negócio, segurança, deploy e melhorias contínuas.
            </p>
            <CheckList items={participation} />
          </article>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-[86rem] rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(124,108,255,0.2),transparent_22rem),#07101d] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
                Próximo projeto
              </p>
              <h2 className="text-balance text-3xl font-semibold text-white sm:text-5xl">Quer um sistema parecido?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Esse projeto mostra como um processo manual pode virar uma plataforma web organizada, segura e pronta para uso real.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.whatsapp.messageHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.35)] transition hover:-translate-y-0.5"
              >
                Falar comigo
                <ArrowUpRight className="size-4" />
              </a>
              <Link
                href="/#work"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
              >
                Ver outros projetos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
