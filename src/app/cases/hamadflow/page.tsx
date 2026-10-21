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
import { CaseImageCarousel, type CaseSlide } from "@/components/case-image-carousel";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "HamadFlow Demo — gestão de freelancers | Viham Dev",
  description:
    "Estudo de caso do HamadFlow Demo, um SaaS demonstrativo criado por Vitor Hamad para gerenciar clientes, briefings, propostas, contratos, projetos e pagamentos de freelas com IA.",
  alternates: { canonical: "/cases/hamadflow" },
  openGraph: {
    title: "HamadFlow Demo — gestão de freelancers | Viham Dev",
    description:
      "Estudo de caso do HamadFlow Demo, um SaaS demonstrativo criado por Vitor Hamad para gerenciar clientes, briefings, propostas, contratos, projetos e pagamentos de freelas com IA.",
    url: `${siteConfig.seo.siteUrl}/cases/hamadflow`,
    images: [{ url: "/images/cases/hamadflow/screenshots/dashboard.png", width: 1920, height: 1080 }],
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "HamadFlow Demo | Viham Dev",
    description: "Aplicação web para organizar clientes, propostas, contratos, projetos e pagamentos.",
    images: ["/images/cases/hamadflow/screenshots/dashboard.png"],
  },
};

const caseStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HamadFlow Demo",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: HAMADFLOW_DEMO_URL,
    image: `${siteConfig.seo.siteUrl}/images/cases/hamadflow/screenshots/dashboard.png`,
    author: { "@type": "Person", name: "Vitor Hamad", url: siteConfig.seo.siteUrl },
    description: "Aplicação web demonstrativa para organizar o fluxo comercial de freelancers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Cases", item: `${siteConfig.seo.siteUrl}/#cases` },
      { "@type": "ListItem", position: 3, name: "HamadFlow Demo", item: `${siteConfig.seo.siteUrl}/cases/hamadflow` },
    ],
  },
];

const badges = ["Projeto autoral", "Aplicação web", "Demonstração pública"];

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
  "Adicionar um tour guiado pela demo"
];

const caseSlides: CaseSlide[] = [
  {
    title: "Dashboard",
    caption: "Visão demonstrativa com pedidos, clientes, briefings, projetos ativos, propostas, contratos, pagamentos e alertas.",
    src: "/images/cases/hamadflow/screenshots/dashboard.png"
  },
  {
    title: "Pedido recebido",
    caption: "Lista de pedidos fictícios do site, mostrando status, orçamento, origem e avanço no workflow.",
    src: "/images/cases/hamadflow/screenshots/pedidos-site.png"
  },
  {
    title: "Propostas",
    caption: "Área para acompanhar propostas comerciais, status, validade, cliente e valor.",
    src: "/images/cases/hamadflow/screenshots/propostas.png"
  },
  {
    title: "Detalhe da proposta",
    caption: "Proposta com escopo incluso, fora do escopo, entregáveis, etapas, valor, prazo e comentários.",
    src: "/images/cases/hamadflow/screenshots/proposta-detalhe.png"
  },
  {
    title: "Área pública do cliente",
    caption: "Visualização pública da proposta com ações de resposta e comentário para simular o lado do cliente.",
    src: "/images/cases/hamadflow/screenshots/proposta-publica.png"
  },
  {
    title: "Contrato",
    caption: "Página de contrato demonstrativo com aviso jurídico, responsabilidades, aceite e link público.",
    src: "/images/cases/hamadflow/screenshots/contrato-detalhe.png"
  },
  {
    title: "Contratos",
    caption: "Lista de contratos demonstrativos com status, valor, cliente e ações rápidas.",
    src: "/images/cases/hamadflow/screenshots/contratos.png"
  },
  {
    title: "Projetos",
    caption: "Lista de projetos fictícios para acompanhar status, cliente, entrega, valor e evolução.",
    src: "/images/cases/hamadflow/screenshots/projetos.png"
  },
  {
    title: "Detalhe do projeto",
    caption: "Gestão de projetos com status, entrega, pagamentos, tarefas e acompanhamento do trabalho.",
    src: "/images/cases/hamadflow/screenshots/projeto-detalhe.png"
  },
  {
    title: "Pagamentos",
    caption: "Controle financeiro demonstrativo com receita recebida, pendente, atrasada e sugestões de cobrança com IA.",
    src: "/images/cases/hamadflow/screenshots/pagamentos.png"
  }
];

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#D5F662]">
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 inline-flex rounded-lg border border-[#D5F662]/25 bg-[#D5F662]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#D5F662]">
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
    <main id="main-content" className="case-page text-white">
      <JsonLd data={caseStructuredData} />
      <section className="relative px-4 pb-14 pt-32 sm:px-6 lg:pt-40">

        <div className="relative mx-auto max-w-[86rem]">
          <Link href="/#cases" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
            <ArrowLeft className="size-4" />
            Voltar aos projetos
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
                  className="button button-primary case-primary"
                >
                  Acessar demo
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={HAMADFLOW_GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#D5F662]/60 hover:bg-white/[0.07]"
                >
                  <Github className="size-4" />
                  Ver GitHub
                </a>
                <Link
                  href="/#cases"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#D5F662]/60 hover:bg-white/[0.07]"
                >
                  Voltar aos projetos
                </Link>
              </div>
            </div>

            <figure className="rounded-xl border border-white/10 bg-[#101C36]/80 p-3  ">
              <Image
                src="/images/cases/hamadflow/hamadflow-demo-cover.svg"
                alt="Arte do dashboard demonstrativo HamadFlow Demo"
                width={1600}
                height={1100}
                priority
                className="h-auto w-full rounded-xl border border-white/10 object-cover"
              />
              <figcaption className="px-2 pt-3 text-sm text-slate-400">Representação visual do painel demo e do workflow com IA.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-[#0B1529]/72 p-6   sm:p-8">
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

          <article className="rounded-xl border border-white/20 bg-cyan-300/[0.035] p-6   sm:p-8">
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
                <article key={feature.title} className="group min-h-[13rem] rounded-xl border border-white/10 bg-white/[0.04] p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-white/[0.065]">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-cyan-300/25 bg-white/5 text-[#D5F662] transition group-hover:scale-105">
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
        <div className="mx-auto max-w-[86rem] rounded-xl border border-white/10 bg-[#0B1529]/72 p-6   sm:p-8">
          <SectionHeader
            eyebrow="Fluxo do sistema"
            title="Do pedido recebido até a entrega organizada."
            description="A demo apresenta um fluxo completo e navegável para demonstrar como um pedido de orçamento pode virar um processo comercial e operacional estruturado."
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {flowSteps.map((step, index) => (
              <article key={step} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <span className="grid size-10 place-items-center rounded-lg border border-[#D5F662]/35 bg-[#D5F662]/15 text-sm font-semibold text-[#c9c1ff]">
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
                <article key={card.title} className="min-h-[12.5rem] rounded-xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="mb-5 grid size-12 place-items-center rounded-2xl border border-[#D5F662]/30 bg-[#D5F662]/10 text-[#D5F662]">
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
          <article className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.035] p-6   sm:p-8">
            <SectionHeader eyebrow="Segurança" title="Demo pública sem expor dados reais." />
            <p className="mb-6 text-base leading-8 text-slate-300">
              A versão publicada no portfólio não usa dados reais. Ela possui banco separado, usuário demo, dados fictícios e integração real
              com o portfólio desativada. Assim, qualquer visitante pode testar o sistema sem afetar meu painel interno de freelas.
            </p>
            <CheckList items={securityItems} />
          </article>

          <article className="rounded-xl border border-[#D5F662]/20 bg-[#D5F662]/[0.035] p-6   sm:p-8">
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
        <div className="mx-auto max-w-[86rem] rounded-xl border border-white/10 bg-[#0B1529]/72 p-6   sm:p-8">
          <SectionHeader
            eyebrow="Galeria do projeto"
            title="Prints reais da demo navegável."
            description="Telas capturadas da versão pública do HamadFlow Demo, usando dados fictícios e ambiente isolado para apresentação no portfólio."
          />
          <CaseImageCarousel slides={caseSlides} />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[86rem] gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-[#0B1529]/72 p-6   sm:p-8">
            <SectionHeader eyebrow="Próximos passos" title="Evoluções planejadas para a demo." />
            <CheckList items={nextSteps} />
          </article>

          <article className="rounded-xl border border-white/20 bg-[#0B1529] p-6   sm:p-8">
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
                className="button button-primary case-primary"
              >
                Acessar HamadFlow Demo
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={HAMADFLOW_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#D5F662]/60 hover:bg-white/[0.07]"
              >
                <Github className="size-4" />
                Ver GitHub
              </a>
              <Link
                href="/#cases"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#D5F662]/60 hover:bg-white/[0.07]"
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
