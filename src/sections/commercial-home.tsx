import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  ExternalLink,
  FileSpreadsheet,
  Github,
  Layers3,
  LayoutDashboard,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ContactBudgetForm } from "@/components/contact-budget-form";
import {
  HAMADFLOW_DEMO_URL,
  HAMADFLOW_GITHUB_URL,
  siteConfig,
} from "@/config/site";

const metrics = [
  { value: "735+", label: "alunos acompanhados" },
  { value: "28+", label: "oficinas cadastradas" },
  { value: "660+", label: "frequências registradas" },
  { value: "126+", label: "chamadas criadas" },
];

const problems = [
  { icon: FileSpreadsheet, title: "Dados espalhados", description: "Informações importantes divididas entre planilhas, mensagens e arquivos difíceis de acompanhar." },
  { icon: ClipboardCheck, title: "Trabalho manual", description: "Cadastros, conferências e atualizações repetitivas que tomam tempo da equipe." },
  { icon: BarChart3, title: "Pouca visibilidade", description: "Falta de relatórios claros para entender a operação e decidir os próximos passos." },
  { icon: Workflow, title: "Processos desconectados", description: "Uma rotina que depende de várias ferramentas sem um fluxo centralizado." },
  { icon: Search, title: "Informação difícil de achar", description: "Históricos, documentos e status que exigem buscas demoradas ou conhecimento de uma pessoa." },
  { icon: Rocket, title: "Ideia sem MVP", description: "Um produto ou serviço que precisa de uma primeira versão utilizável para ser validado." },
];

const solutions = [
  {
    number: "01",
    title: "Sistemas web e painéis administrativos",
    audience: "Empresas e organizações com rotinas operacionais recorrentes.",
    problem: "Centraliza dados, acessos, tarefas e indicadores em um único ambiente.",
    includes: ["Painéis e níveis de acesso", "Cadastros e banco de dados", "Relatórios e integrações"],
  },
  {
    number: "02",
    title: "MVPs e aplicações web",
    audience: "Quem precisa validar uma ideia ou digitalizar um serviço.",
    problem: "Transforma a proposta em uma versão funcional pronta para uso e aprendizado.",
    includes: ["Definição da primeira versão", "Fluxos essenciais do produto", "Publicação e evolução planejada"],
  },
  {
    number: "03",
    title: "Sites e landing pages",
    audience: "Negócios que precisam apresentar uma oferta com clareza.",
    problem: "Cria uma presença profissional voltada a contato, confiança e captação.",
    includes: ["Estrutura e conteúdo", "Design responsivo", "SEO e formulário de contato"],
  },
];

const process = [
  { title: "Diagnóstico", description: "Entendo o problema, quem usa o sistema e o que precisa mudar na rotina atual." },
  { title: "Escopo e proposta", description: "Organizo prioridades, entregas, prazo e investimento antes do desenvolvimento." },
  { title: "Desenvolvimento", description: "Construo por etapas e compartilho validações periódicas para evitar surpresas." },
  { title: "Publicação e suporte", description: "Coloco o projeto no ar, entrego os acessos e acompanho o início da operação." },
];

const faqs = [
  { question: "Quanto tempo leva um projeto?", answer: "Depende do escopo e das integrações. Depois do diagnóstico, apresento uma previsão de prazo e marcos de validação antes de começar." },
  { question: "Como funciona o orçamento?", answer: "Primeiro entendo o problema e a primeira versão necessária. Com isso, preparo uma proposta com escopo, prazo, investimento e condições de pagamento." },
  { question: "O projeto ficará no meu domínio?", answer: "Sim. Posso configurar o domínio da empresa e orientar sobre hospedagem, contas e acessos necessários." },
  { question: "Eu terei acesso ao código?", answer: "Sim. A forma de entrega, o repositório e os acessos ficam registrados na proposta do projeto." },
  { question: "Existe manutenção depois da entrega?", answer: "Sim. O projeto inclui suporte inicial e, quando fizer sentido, podemos combinar um plano de manutenção e evolução." },
  { question: "Você também cria o design?", answer: "Sim. Organizo a experiência, a interface e a identidade visual necessária para o produto. Materiais de marca existentes também podem ser aproveitados." },
  { question: "É possível começar com um MVP?", answer: "Sim. Muitas vezes essa é a melhor abordagem: priorizar o fluxo principal, publicar, aprender com o uso e evoluir com segurança." },
  { question: "Como são feitos pagamentos e validações?", answer: "As condições são definidas na proposta. O desenvolvimento é acompanhado por entregas e validações periódicas, com tudo alinhado antes do início." },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">{eyebrow}</p>
      <h2 className="font-display mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{description}</p> : null}
    </div>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Resultados do case Centro da Juventude" className="border-y border-white/[0.08] bg-[#080f1a]/80 px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-[82rem] grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-[repeat(4,1fr)_1.4fr] lg:items-center">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <strong className="font-display block text-2xl font-extrabold text-white sm:text-3xl">{metric.value}</strong>
            <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm">{metric.label}</span>
          </div>
        ))}
        <div className="col-span-2 flex items-center gap-3 border-t border-white/10 pt-5 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300"><ShieldCheck className="size-5" /></span>
          <div><strong className="block text-sm text-white">Sistema real em produção</strong><span className="text-xs text-slate-400">Dados conferidos no estudo de caso</span></div>
        </div>
      </div>
    </section>
  );
}

export function ProblemsSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="problems-title">
      <div className="mx-auto max-w-[82rem]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">Quando faz sentido conversar</p>
            <h2 id="problems-title" className="font-display mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl">A operação cresceu, mas o processo ainda depende de improviso.</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">Um sistema sob medida deve reduzir atrito na rotina — não adicionar mais uma ferramenta para administrar.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {problems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-[#08101c] p-5 sm:p-6">
                  <Icon className="size-5 text-[#ff7a49]" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MainCaseSection() {
  return (
    <section id="cases" className="px-4 py-16 sm:px-6 sm:py-20">
      <div id="case-principal" className="mx-auto max-w-[82rem] scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-[#09111e] shadow-[0_36px_110px_rgba(0,0,0,0.35)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">Case principal · Sistema em produção</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl">Centro da Juventude de Almirante Tamandaré</h2>
            <div className="mt-8 space-y-6">
              <div><span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Problema</span><p className="mt-2 leading-7 text-slate-300">Planilhas, conferências manuais e processos separados dificultavam acompanhar alunos, oficinas, chamadas e frequência.</p></div>
              <div><span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Solução</span><p className="mt-2 leading-7 text-slate-300">Uma plataforma full stack que centraliza inscrições, operação interna, portal do aluno, suporte e indicadores.</p></div>
              <div><span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Resultado</span><p className="mt-2 leading-7 text-slate-300">A equipe ganhou uma visão organizada da operação e passou a consultar informações e pontos de atenção em um único ambiente.</p></div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cases/centro-da-juventude" data-analytics-event="project_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9738] to-[#e43b49] px-5 text-sm font-bold text-[#080b12]">Ver estudo de caso <ArrowRight className="size-4" /></Link>
              <a href="https://cjtamandare.vercel.app/" target="_blank" rel="noreferrer" data-analytics-event="demo_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-bold text-white">Visitar projeto <ExternalLink className="size-4" /></a>
            </div>
          </div>
          <div className="relative min-h-[23rem] border-t border-white/10 bg-[#050a13] lg:border-l lg:border-t-0">
            <Image src="/images/cases/cj/public-home.png" alt="Página pública real do Centro da Juventude" width={1905} height={915} sizes="(max-width: 1024px) 100vw, 56vw" className="h-full min-h-[23rem] w-full object-cover object-left-top" />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#07101b]/92 p-3 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:grid-cols-4">
              {metrics.map((metric) => <div key={metric.label}><strong className="block text-lg text-white">{metric.value}</strong><span className="text-[0.65rem] leading-4 text-slate-400">{metric.label}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section id="solucoes" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[82rem]">
        <SectionHeading eyebrow="Soluções" title="A tecnologia certa para organizar, validar ou captar." description="A definição começa pelo problema do negócio. A stack, as integrações e o formato da entrega vêm depois." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {solutions.map((solution) => (
            <article key={solution.number} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <span className="font-display text-sm font-extrabold text-[#ff7a49]">{solution.number}</span>
              <h3 className="font-display mt-6 text-2xl font-bold tracking-[-0.025em] text-white">{solution.title}</h3>
              <p className="mt-5 text-sm leading-6 text-slate-400"><strong className="text-slate-200">Para quem é:</strong> {solution.audience}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400"><strong className="text-slate-200">O que resolve:</strong> {solution.problem}</p>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                {solution.includes.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#ff7a49]" />{item}</li>)}
              </ul>
              <a href="#contato" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#ff8c55]">Conversar sobre esta solução <ArrowRight className="size-4" /></a>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-400">Depois da entrega, manutenção e evolução podem ser combinadas conforme a necessidade do projeto.</p>
      </div>
    </section>
  );
}

export function OtherProjectSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[82rem] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-3">
          <Image src="/images/cases/hamadflow/screenshots/dashboard.png" alt="Dashboard real da demonstração do HamadFlow" width={1920} height={1080} sizes="(max-width: 1024px) 92vw, 52vw" className="aspect-[16/10] w-full rounded-xl object-cover object-top" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">Outro projeto real</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl">HamadFlow Demo</h2>
          <p className="mt-5 text-base leading-7 text-slate-300">Um produto para centralizar o fluxo comercial de freelancers: do pedido inicial a clientes, briefings, propostas, contratos, projetos e pagamentos.</p>
          <ul className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {["Gestão de clientes e projetos", "Propostas e contratos em PDF", "Links públicos protegidos", "Dados fictícios em ambiente de demo"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ff7a49]" />{item}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={HAMADFLOW_DEMO_URL} target="_blank" rel="noreferrer" data-analytics-event="demo_click" data-analytics-project="hamadflow" data-analytics-location="other-project" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#070b13]">Acessar demo <ExternalLink className="size-4" /></a>
            <Link href="/cases/hamadflow" data-analytics-event="project_click" data-analytics-project="hamadflow" data-analytics-location="other-project" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-bold text-white">Ver case</Link>
            <a href={HAMADFLOW_GITHUB_URL} target="_blank" rel="noreferrer" data-analytics-event="github_click" data-analytics-project="hamadflow" data-analytics-location="other-project" aria-label="Ver código do HamadFlow no GitHub" className="inline-flex size-12 items-center justify-center rounded-xl border border-white/15 text-slate-300 transition hover:text-white"><Github className="size-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="processo" className="border-y border-white/[0.08] bg-[#08101b]/70 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[82rem]">
        <SectionHeading eyebrow="Processo" title="Da conversa inicial ao projeto publicado." description="Um processo direto, com decisões registradas e validações ao longo do caminho." />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-white/10 bg-[#07101b] p-6">
              <span className="font-display grid size-10 place-items-center rounded-full border border-[#ff7044]/35 bg-[#ff7044]/10 text-sm font-extrabold text-[#ff8c55]">{index + 1}</span>
              <h3 className="mt-6 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="sobre" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#ff7b48]/18 to-[#07101b] p-3">
          <Image src={siteConfig.about.image} alt="Foto de Vitor Hamad" width={1080} height={1440} sizes="(max-width: 1024px) 80vw, 30vw" className="aspect-[4/5] w-full rounded-2xl object-cover object-top" />
        </div>
        <div>
          <SectionHeading eyebrow="Sobre Vitor" title="Desenvolvimento próximo, responsável e orientado ao problema." />
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-300">
            <p>Sou Vitor Hamad, desenvolvedor web e estudante de Análise e Desenvolvimento de Sistemas na PUCPR. Construo projetos full stack que conectam interface, banco de dados, regras de negócio e publicação.</p>
            <p>Os cases deste site mostram essa capacidade em produtos reais. Uso IA como apoio para pesquisa, prototipagem e revisão, sempre com validação humana e responsabilidade técnica.</p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[{ icon: Code2, label: "Aplicações full stack" }, { icon: LayoutDashboard, label: "Painéis e sistemas" }, { icon: Sparkles, label: "IA como apoio responsável" }].map((item) => { const Icon = item.icon; return <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm font-medium text-slate-200"><Icon className="size-5 shrink-0 text-[#ff7a49]" />{item.label}</div>; })}
          </div>
          <Link href="/curriculo" data-analytics-event="resume_click" data-analytics-label="Ver currículo" data-analytics-location="about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#ff8c55]">Está contratando um desenvolvedor? Ver currículo <ArrowRight className="size-4" /></Link>
        </div>
      </div>
    </section>
  );
}

export function InvestmentSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[82rem] gap-8 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,111,61,0.09),rgba(8,16,27,0.9)_42%)] p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-12">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">Investimento</p><h2 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl">Escopo claro antes de falar em preço.</h2><p className="mt-5 leading-7 text-slate-300">Sistemas e MVPs recebem orçamento após o diagnóstico. Prazo e investimento variam conforme fluxos, integrações, regras e volume de conteúdo.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["Diagnóstico inicial do problema", "Proposta com escopo e entregas", "Cronograma de validações", "Manutenção como etapa complementar"].map((item) => <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-[#07101b]/80 p-4 text-sm leading-6 text-slate-200"><Check className="mt-0.5 size-4 shrink-0 text-[#ff7a49]" />{item}</div>)}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[82rem] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <SectionHeading eyebrow="FAQ" title="O que normalmente perguntam antes de começar." description="Se a sua dúvida não estiver aqui, descreva o projeto no formulário." />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold text-white marker:hidden"><span>{faq.question}</span><span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-[#ff8450] transition group-open:rotate-45">+</span></summary>
              <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contato" className="px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
      <div className="mx-auto grid max-w-[82rem] gap-10 rounded-3xl border border-white/10 bg-[#09111e] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:p-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff8450]">Próximo passo</p>
          <h2 className="font-display mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-4xl">Conte qual processo ou ideia você quer colocar no ar.</h2>
          <p className="mt-5 text-base leading-7 text-slate-300">Não precisa preparar um documento técnico. Explique o contexto, o que hoje dá trabalho e o resultado que você espera.</p>
          <div className="mt-8 space-y-4 text-sm text-slate-400">
            <p className="flex gap-3"><Layers3 className="mt-0.5 size-5 shrink-0 text-[#ff7a49]" />Você recebe uma resposta com os próximos passos para o diagnóstico.</p>
            <p className="flex gap-3"><MessageCircle className="mt-0.5 size-5 shrink-0 text-[#ff7a49]" />Se preferir, o WhatsApp continua disponível como alternativa.</p>
          </div>
        </div>
        <ContactBudgetForm whatsappHref={siteConfig.whatsapp.messageHref} />
      </div>
    </section>
  );
}
