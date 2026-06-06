import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Database,
  FileText,
  Github,
  KeyRound,
  LayoutDashboard,
  Link2,
  Receipt,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from "lucide-react";
import { HAMADFLOW_DEMO_URL, HAMADFLOW_GITHUB_URL, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "HamadFlow Demo — SaaS para gestão de freelas com IA | Vitor Hamad",
  description:
    "Estudo de caso do HamadFlow Demo, um SaaS demonstrativo criado por Vitor Hamad para gerenciar clientes, briefings, propostas, contratos, projetos e pagamentos de freelas com IA.",
  openGraph: {
    title: "HamadFlow Demo — SaaS para gestão de freelas com IA | Vitor Hamad",
    description:
      "Estudo de caso do HamadFlow Demo, um SaaS demonstrativo criado por Vitor Hamad para gerenciar clientes, briefings, propostas, contratos, projetos e pagamentos de freelas com IA.",
    url: `${siteConfig.seo.siteUrl}/cases/hamadflow`,
    images: [{ url: "/images/cases/hamadflow/hamadflow-demo-cover.svg", width: 1600, height: 1100 }],
    type: "article"
  }
};

const badges = ["SaaS", "Gestão de freelas", "IA", "Dashboard", "Propostas", "Contratos", "PostgreSQL", "Next.js"];

const features = [
  {
    icon: ClipboardList,
    title: "Pedidos do site",
    description: "Recebimento de solicitações de orçamento simuladas, com dados fictícios e análise inicial."
  },
  {
    icon: Users,
    title: "CRM de clientes",
    description: "Cadastro e organização de clientes, empresas e histórico comercial."
  },
  {
    icon: Bot,
    title: "Briefings inteligentes",
    description: "Conversão de pedidos em briefings estruturados, com objetivo, escopo, riscos e perguntas importantes."
  },
  {
    icon: FileText,
    title: "Propostas comerciais",
    description: "Geração e edição de propostas com escopo incluso, fora do escopo, valor, prazo, pagamento e validade."
  },
  {
    icon: Receipt,
    title: "Contratos",
    description: "Criação de contratos a partir de propostas, com termos editáveis e aviso jurídico."
  },
  {
    icon: Briefcase,
    title: "Gestão de projetos",
    description: "Projetos com status, tarefas, etapas e acompanhamento."
  },
  {
    icon: CreditCard,
    title: "Pagamentos",
    description: "Controle de valores, vencimentos e status financeiro."
  },
  {
    icon: Link2,
    title: "Área pública do cliente",
    description: "Links públicos para visualização e aprovação de proposta ou contrato."
  },
  {
    icon: Sparkles,
    title: "IA com fallback",
    description: "Uso de IA para análise, geração de textos e sugestões, com fallback local para demonstração."
  }
];

const flowSteps = [
  "Pedido recebido",
  "Cliente criado",
  "Briefing gerado",
  "Projeto aberto",
  "Proposta criada",
  "Contrato gerado",
  "Pagamento acompanhado",
  "Entrega organizada"
];

const techCards = [
  {
    icon: LayoutDashboard,
    title: "Next.js com App Router",
    description: "Base full-stack para dashboard, rotas públicas, páginas internas e experiência responsiva."
  },
  {
    icon: ServerCog,
    title: "TypeScript",
    description: "Tipagem para reduzir erros e manter o fluxo de negócio mais previsível."
  },
  {
    icon: Database,
    title: "PostgreSQL e Prisma ORM",
    description: "Modelagem relacional para leads, clientes, briefings, projetos, propostas, contratos e pagamentos."
  },
  {
    icon: KeyRound,
    title: "Autenticação",
    description: "Login demo controlado, separado do painel real usado internamente."
  },
  {
    icon: Bot,
    title: "Gemini / fallback local",
    description: "IA para análise e geração de textos com alternativa local para manter a demo funcionando."
  },
  {
    icon: FileText,
    title: "Geração de PDF",
    description: "Estrutura para documentos comerciais, propostas e contratos exportáveis."
  },
  {
    icon: Link2,
    title: "Links públicos por token",
    description: "Visualização externa de propostas e contratos sem liberar o painel administrativo."
  },
  {
    icon: ShieldCheck,
    title: "Banco demo separado",
    description: "Ambiente isolado com dados fictícios e sem conexão com o workflow privado."
  },
  {
    icon: Workflow,
    title: "Deploy na Vercel",
    description: "Demo publicada para acesso rápido pelo portfólio e validação em navegador."
  }
];

const securityItems = [
  "Banco separado",
  "Sem CPF/CNPJ real",
  "Sem chave Pix real",
  "Sem leads reais",
  "Sem conexão com workflow privado",
  "Login demo controlado",
  "Reset/seed de dados fictícios"
];

const learnings = [
  "Arquitetura full-stack",
  "Modelagem de banco relacional",
  "Autenticação e separação de ambientes",
  "Fluxos comerciais para freelas",
  "Geração de documentos",
  "Integração com IA",
  "Deploy de produto SaaS",
  "Criação de demo segura para portfólio"
];

const nextSteps = [
  "Melhorar o editor visual de propostas",
  "Adicionar templates de serviços",
  "Melhorar o histórico de eventos",
  "Refinar geração de contratos",
  "Adicionar métricas financeiras",
  "Criar mais automações com IA",
  "Melhorar onboarding da demo",
  "Adicionar screenshots reais do painel"
];

const gallery = [
  {
    title: "Dashboard",
    description: "Visão geral de leads, clientes, projetos, propostas e próximos vencimentos.",
    icon: LayoutDashboard
  },
  {
    title: "Pedido recebido",
    description: "Entrada de solicitação do portfólio com dados fictícios e organização inicial.",
    icon: ClipboardList
  },
  {
    title: "Análise com IA",
    description: "Resumo de escopo, riscos, perguntas e sugestões para avançar com o cliente.",
    icon: Bot
  },
  {
    title: "Proposta",
    description: "Estrutura comercial com escopo, valores, prazo, validade e forma de pagamento.",
    icon: FileText
  },
  {
    title: "Área pública do cliente",
    description: "Link de visualização e aprovação para demonstrar o fluxo externo do cliente.",
    icon: Link2
  }
];

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
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

export default function HamadFlowCasePage() {
  return (
    <main className="overflow-hidden bg-[#050b14] text-white">
      <section className="relative px-4 pb-14 pt-32 sm:px-6 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(124,108,255,0.22),transparent_24rem)]" />
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
                HamadFlow Demo
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                SaaS demonstrativo para freelancers gerenciarem clientes, pedidos, briefings, propostas, contratos, projetos e pagamentos com apoio de IA.
              </p>
              <p className="mt-5 max-w-2xl rounded-[1rem] border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-slate-300">
                Esta é uma versão demo com dados fictícios. A versão real é usada internamente para organizar meus freelas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={HAMADFLOW_DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] via-[#38bdf8] to-[#29f1c3] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5"
                >
                  Acessar demo
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={HAMADFLOW_GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
                >
                  <Github className="size-4" />
                  Ver GitHub
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
                src="/images/cases/hamadflow/hamadflow-demo-cover.svg"
                alt="Arte do dashboard demonstrativo HamadFlow Demo"
                width={1600}
                height={1100}
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full rounded-[1.1rem] border border-white/10 object-cover"
              />
              <figcaption className="px-2 pt-3 text-sm text-slate-400">Representação visual do painel demo e do workflow com IA.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="O problema" title="Organizar freela também é parte do produto." />
            <p className="text-base leading-8 text-slate-300">
              Como freelancer, uma das maiores dificuldades não está apenas em desenvolver o projeto, mas em organizar o processo comercial:
              receber pedidos, entender o escopo, transformar conversas em briefing, montar proposta, controlar contrato, acompanhar projeto
              e não perder pagamentos.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Muitos freelancers fazem isso de forma espalhada entre WhatsApp, Notion, planilhas e PDFs soltos. Isso pode gerar perda de
              informação, propostas pouco claras, retrabalho e dificuldade para passar uma imagem profissional ao cliente.
            </p>
          </article>

          <article className="rounded-[1.6rem] border border-cyan-300/20 bg-cyan-300/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="A solução" title="Um workflow comercial centralizado." />
            <p className="text-base leading-8 text-slate-300">
              O HamadFlow foi criado para centralizar esse fluxo em um painel único. A ideia é transformar um pedido de orçamento em um
              workflow organizado, passando por lead, cliente, briefing, projeto, proposta, contrato e pagamentos.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300">
              A versão demo foi criada para apresentar esse fluxo de forma segura no portfólio, sem expor dados reais e sem conectar ao meu
              workflow privado.
            </p>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem]">
          <SectionHeader eyebrow="Funcionalidades" title="Principais módulos do HamadFlow Demo." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="group min-h-[13rem] rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.065]">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 transition group-hover:scale-105">
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

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
          <SectionHeader
            eyebrow="Fluxo do sistema"
            title="Do pedido recebido até a entrega organizada."
            description="A demo apresenta um fluxo completo e navegável para demonstrar como um pedido de orçamento pode virar um processo comercial e operacional estruturado."
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map((step, index) => (
              <article key={step} className="relative rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-5">
                <span className="grid size-10 place-items-center rounded-full border border-[#7c6cff]/35 bg-[#7c6cff]/15 text-sm font-semibold text-[#c9c1ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">{step}</h3>
                {index < flowSteps.length - 1 ? (
                  <ArrowRight className="absolute right-5 top-6 hidden size-4 text-cyan-200/70 xl:block" />
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem]">
          <SectionHeader
            eyebrow="Decisões técnicas"
            title="Um SaaS full-stack separado da operação real."
            description="O sistema foi estruturado como um SaaS full-stack, com autenticação, banco relacional, regras de segurança, geração de PDF, links públicos por token e integração de IA. A versão demo foi separada da versão real para evitar exposição de dados e permitir que visitantes testem o produto com segurança."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {techCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="min-h-[12.5rem] rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-[#7c6cff]/30 bg-[#7c6cff]/10 text-[#a99cff]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[1.6rem] border border-emerald-300/20 bg-emerald-300/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="Segurança" title="Demo pública sem expor dados reais." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              A versão publicada no portfólio não usa dados reais. Ela possui banco separado, usuário demo, dados fictícios e integração real
              com o portfólio desativada. Assim, qualquer visitante pode testar o sistema sem afetar meu painel interno de freelas.
            </p>
            <CheckList items={securityItems} />
          </article>

          <article className="rounded-[1.6rem] border border-[#7c6cff]/20 bg-[#7c6cff]/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="O que aprendi" title="Produto, UX e arquitetura trabalhando juntos." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              Com esse projeto, aprofundei conceitos de arquitetura full-stack, modelagem de banco, autenticação, fluxos comerciais, geração
              de documentos, integração com IA, deploy, separação entre ambiente real e demo e criação de um produto com aparência de SaaS real.
              Também aprendi a pensar além do código, estruturando uma solução para organizar o processo comercial do primeiro contato até a entrega.
            </p>
            <CheckList items={learnings} />
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[86rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
          <SectionHeader
            eyebrow="Galeria do projeto"
            title="Estrutura pronta para screenshots reais."
            description="Como a demo ainda não tem prints anexados neste portfólio, a seção usa cards descritivos para reservar os principais pontos visuais sem recorrer a imagens aleatórias."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {gallery.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 grid aspect-[16/10] place-items-center rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.2),transparent_12rem),#0b1423]">
                    <Icon className="size-9 text-cyan-100" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="Próximos passos" title="Evoluções planejadas para a demo." />
            <CheckList items={nextSteps} />
          </article>

          <article className="rounded-[1.6rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_22rem),#07101d] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <SectionHeader eyebrow="Resultado" title="Uma demo navegável com fluxo completo." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              O resultado é uma demo navegável que mostra um fluxo completo de gestão de freelas, reforçando minhas habilidades em
              desenvolvimento full-stack, produto, UX, banco de dados, IA e deploy.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={HAMADFLOW_DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#38bdf8] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.3)] transition hover:-translate-y-0.5"
              >
                Acessar HamadFlow Demo
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={HAMADFLOW_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
              >
                <Github className="size-4" />
                Ver GitHub
              </a>
              <Link
                href="/#work"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.07]"
              >
                Voltar aos projetos
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
