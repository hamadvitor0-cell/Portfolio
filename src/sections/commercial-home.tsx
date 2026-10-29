import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Mail, MessageCircle, Plus } from "lucide-react";
import { ContactBudgetForm } from "@/components/contact-budget-form";
import { siteConfig } from "@/config/site";
import { ConceptProjectCard } from "@/components/concept-project-card";

const services = [
  { title: "Sites e landing pages", description: "Uma presença digital à altura do seu negócio. Para apresentar sua empresa, serviço ou oferta e facilitar o próximo contato.", scope: "Interface personalizada · Versão mobile · Formulários · Publicação" },
  { title: "Sistemas web e painéis", description: "Menos informações espalhadas, mais clareza na operação. Um ambiente feito para organizar seus cadastros, acessos e rotinas.", scope: "Painéis administrativos · Banco de dados · Permissões · Integrações" },
  { title: "MVPs e aplicações", description: "Sua ideia em uma primeira versão utilizável. Com prioridades bem definidas para colocar o essencial no ar e evoluir com o uso.", scope: "Fluxos principais · Interface · Regras de negócio · Primeira versão" },
];
const steps = [
  { title: "Entender o projeto", description: "Uma conversa sobre contexto, objetivos, público e o que precisa funcionar melhor." },
  { title: "Definir a entrega", description: "Prioridades, escopo, proposta e cronograma alinhados antes de começar." },
  { title: "Desenvolver e validar", description: "Construção por etapas, com revisões combinadas e decisões que você acompanha." },
  { title: "Publicar e acompanhar", description: "Projeto no ar, entrega dos acessos e próximos passos de suporte definidos." },
];
const faqs = [
  { question: "Como funciona o orçamento?", answer: "Começamos entendendo o objetivo e o que a primeira versão precisa entregar. A proposta detalha escopo, prazo, investimento e condições de pagamento. Não é necessário chegar com um documento técnico pronto." },
  { question: "Quanto tempo leva para desenvolver?", answer: "O prazo depende das páginas, funcionalidades, conteúdo e integrações. A previsão e os marcos de validação são definidos na proposta, antes do início do trabalho." },
  { question: "O site funciona no celular?", answer: "Sim. A interface é desenvolvida para se adaptar a celulares, tablets e computadores, com atenção à leitura, navegação e uso dos formulários." },
  { question: "Posso usar meu domínio e ter acesso ao código?", answer: "A configuração do domínio, hospedagem, repositório e entrega dos acessos é alinhada conforme a contratação e registrada na proposta do projeto." },
  { question: "Existe manutenção depois da entrega?", answer: "Suporte, hospedagem quando aplicável, manutenção e pequenas alterações podem fazer parte de uma contratação recorrente. As condições são combinadas na proposta; mudanças maiores recebem um novo escopo." },
];

export function ProjectsSection() {
  const [cj, hamadflow] = siteConfig.projects;
  return (
    <section id="cases" className="projects-section paper-section" aria-labelledby="projects-title">
      <div className="site-container">
        <div className="section-topline"><h2 id="projects-title">Trabalhos selecionados.</h2></div>
        {siteConfig.projects.map((project) => "slug" in project ? <ConceptProjectCard key={project.slug} project={project} /> : null)}
        <article id="case-principal" className="featured-project">
          <Link href={cj.href} className="project-visual" aria-label="Conhecer o projeto Centro da Juventude" data-analytics-event="project_click" data-analytics-project="centro-da-juventude" data-analytics-location="featured-image">
            <div className="project-visual-label"><span className="project-status"><span className="status-dot" /> Sistema em produção</span></div>
            <div className="cj-screens">
              <Image className="cj-main-screen" loading="eager" src={cj.image} alt="Painel real do Centro da Juventude, com a visão de alunos, oficinas, turmas e frequência" width={1919} height={909} sizes="(max-width: 767px) 90vw, (max-width: 1440px) 78vw, 1120px" />
              <Image className="cj-public-screen" src="/images/cases/cj/public-home-light.png" alt="Portal público do Centro da Juventude de Almirante Tamandaré" width={1902} height={905} sizes="(max-width: 767px) 36vw, 400px" />
            </div>
            <span className="project-image-link"><ArrowUpRight size={22} aria-hidden="true" /></span>
          </Link>
          <div className="project-caption">
            <div><h3>{cj.title}</h3></div>
            <div><p>{cj.description}</p><div className="project-links"><Link className="text-link" href={cj.href} data-analytics-event="project_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case">Conhecer o projeto <ArrowRight size={17} aria-hidden="true" /></Link><a className="subtle-link" href={cj.liveUrl} target="_blank" rel="noreferrer" data-analytics-event="demo_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case">Visitar projeto <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
          </div>
        </article>
        <article className="secondary-project">
          <Link href={hamadflow.href} className="hamadflow-visual" aria-label="Conhecer o projeto HamadFlow Demo"><Image src={hamadflow.image} alt="Dashboard do HamadFlow Demo com projetos, propostas, contratos e pagamentos fictícios" width={1920} height={1080} sizes="(max-width: 767px) 90vw, 46vw" /></Link>
          <div className="secondary-project-copy"><h3>{hamadflow.title}</h3><p>{hamadflow.description}</p><p className="demo-note">Demonstração pública com dados fictícios.</p><div className="project-links"><Link href={hamadflow.href} className="text-link" data-analytics-event="project_click" data-analytics-project="hamadflow" data-analytics-location="other-project">Estudo de caso <ArrowRight size={17} aria-hidden="true" /></Link><a href={hamadflow.liveUrl} target="_blank" rel="noreferrer" className="subtle-link" data-analytics-event="demo_click" data-analytics-project="hamadflow" data-analytics-location="other-project">Ver demo <ArrowUpRight size={16} aria-hidden="true" /></a><a href={hamadflow.repoUrl} target="_blank" rel="noreferrer" className="icon-link" aria-label="Código do HamadFlow no GitHub" data-analytics-event="github_click" data-analytics-location="other-project"><Github size={19} aria-hidden="true" /></a></div></div>
        </article>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section id="solucoes" className="services-section" aria-labelledby="services-title"><div className="site-container">
      <div className="section-heading"><h2 id="services-title">O formato certo para<br />o seu próximo passo.</h2><p>Da presença online à rotina da operação.<br />O projeto começa pelo que você precisa resolver.</p></div>
      <div className="service-list">{services.map((service, index) => <article className="service-row" key={service.title}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><div><p>{service.description}</p><p className="service-scope">{service.scope}</p></div><a href="#contato" className="service-arrow" aria-label={`Conversar sobre ${service.title}`} data-analytics-event="cta_click" data-analytics-label={service.title} data-analytics-location="services"><ArrowUpRight size={25} aria-hidden="true" /></a></article>)}</div>
      <div className="maintenance-note"><span className="status-dot" /><p><strong>O projeto também pode continuar evoluindo.</strong> Manutenção e suporte podem ser contratados conforme a proposta, com um novo escopo para mudanças maiores.</p></div>
    </div></section>
  );
}

export function ProcessSection() {
  return <section id="processo" className="process-section paper-section" aria-labelledby="process-title"><div className="site-container"><div className="section-heading"><h2 id="process-title">Clareza em cada etapa.</h2><p>Você acompanha o caminho entre a primeira conversa e o projeto no ar.</p></div><ol className="process-list">{steps.map((step, index) => <li key={step.title}><div className="step-top"><span>0{index + 1}</span>{index < 3 ? <ArrowRight size={20} aria-hidden="true" /> : <span className="step-end" aria-hidden="true">↗</span>}</div><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>;
}

export function AboutSection() {
  return <section id="sobre" className="about-section paper-section" aria-labelledby="about-title"><div className="site-container about-layout"><div className="portrait-wrap"><Image src={siteConfig.about.image} alt="Vitor Hamad, desenvolvedor responsável pela Viham Dev" width={1080} height={1440} sizes="(max-width: 767px) 80vw, 380px" className="portrait" /><div className="portrait-caption"><strong>Vitor Hamad</strong></div></div><div className="about-copy"><h2 id="about-title">Por trás da Viham Dev,<br />contato direto com<br />quem desenvolve.</h2><p>A Viham Dev é a marca de desenvolvimento de Vitor Hamad. O trabalho combina interface, regras de negócio e publicação para criar sites e sistemas adequados a cada projeto.</p><p>Do primeiro alinhamento às validações durante o desenvolvimento, a comunicação acontece diretamente com o profissional responsável pela entrega.</p><div className="about-footnote"><Link href="/curriculo" className="text-link" data-analytics-event="resume_click" data-analytics-label="Ver currículo" data-analytics-location="about">Ver currículo <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></div></section>;
}

export function FaqSection() {
  return <section id="faq" className="faq-section paper-section" aria-labelledby="faq-title"><div className="site-container faq-layout"><div><h2 id="faq-title">Algumas respostas<br />para o seu projeto.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}

export function ContactSection() {
  return <section id="contato" className="contact-section" aria-labelledby="contact-title"><div className="site-container contact-layout"><div className="contact-copy"><h2 id="contact-title">Seu próximo projeto<br />começa com uma<br /><span>boa conversa.</span></h2><p>Conte o que você precisa criar ou melhorar. Não é necessário ter um documento técnico pronto para começar.</p><div className="direct-contact"><a href={siteConfig.whatsapp.messageHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="contact"><MessageCircle size={20} aria-hidden="true" /><span>Prefere conversar pelo WhatsApp?<strong>{siteConfig.whatsapp.number}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a><a href={`mailto:${siteConfig.email}`}><Mail size={19} aria-hidden="true" /><span>{siteConfig.email}</span></a></div></div><ContactBudgetForm whatsappHref={siteConfig.whatsapp.messageHref} /></div></section>;
}
