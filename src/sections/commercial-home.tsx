import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Plus } from "lucide-react";
import { ContactBudgetForm } from "@/components/contact-budget-form";
import { MagneticButton } from "@/components/magnetic-button";
import { ProcessTimeline, StudioMarquee } from "@/components/studio-motion";
import { ProjectShowcase } from "@/components/project-showcase";
import { siteConfig } from "@/config/site";

const services = [
  { title: "Sites e landing pages", description: "Uma presença digital à altura do seu negócio. Para apresentar sua empresa, serviço ou oferta e facilitar o próximo contato.", scope: "Interface personalizada · Versão mobile · Formulários · Publicação" },
  { title: "Sistemas web e painéis", description: "Menos informações espalhadas, mais clareza na operação. Um ambiente feito para organizar seus cadastros, acessos e rotinas.", scope: "Painéis administrativos · Banco de dados · Permissões · Integrações" },
  { title: "MVPs e aplicações", description: "Sua ideia em uma primeira versão utilizável. Com prioridades bem definidas para colocar o essencial no ar e evoluir com o uso.", scope: "Fluxos principais · Interface · Regras de negócio · Primeira versão" },
];
const faqs = [
  { question: "Como funciona o orçamento?", answer: "Começamos entendendo o objetivo e o que a primeira versão precisa entregar. A proposta detalha escopo, prazo, investimento e condições de pagamento. Não é necessário chegar com um documento técnico pronto." },
  { question: "Quanto tempo leva para desenvolver?", answer: "O prazo depende das páginas, funcionalidades, conteúdo e integrações. A previsão e os marcos de validação são definidos na proposta, antes do início do trabalho." },
  { question: "O site funciona no celular?", answer: "Sim. A interface é desenvolvida para se adaptar a celulares, tablets e computadores, com atenção à leitura, navegação e uso dos formulários." },
  { question: "Posso usar meu domínio e ter acesso ao código?", answer: "A configuração do domínio, hospedagem, repositório e entrega dos acessos é alinhada conforme a contratação e registrada na proposta do projeto." },
  { question: "Existe manutenção depois da entrega?", answer: "Suporte, hospedagem quando aplicável, manutenção e pequenas alterações podem fazer parte de uma contratação recorrente. As condições são combinadas na proposta; mudanças maiores recebem um novo escopo." },
];

export function ProjectsSection() { return <ProjectShowcase />; }

export function RealProjectSection() {
  const [cj] = siteConfig.projects;
  return <section id="case-principal" className="studio-real paper-section" aria-labelledby="real-project-title"><div className="site-container">
    <div className="studio-section-label">04 / APLICAÇÃO EM USO REAL</div>
    <div className="real-project-heading"><h2 id="real-project-title">NÃO É SÓ SOBRE<br /><span>APARÊNCIA.</span></h2><p>Também desenvolvo sistemas que resolvem necessidades reais.</p></div>
    <article className="real-project-content"><div className="real-project-copy"><span className="project-status"><span className="status-dot" /> Plataforma institucional</span><h3>{cj.title}</h3><p>{cj.description}</p><ul><li>Gestão de alunos, oficinas e turmas</li><li>Chamadas e controle de frequência</li><li>Portal público e acessos administrativos</li></ul><div className="project-links"><Link className="text-link" href={cj.href} data-analytics-event="project_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case">Conhecer o projeto <ArrowRight size={17} aria-hidden="true" /></Link><a className="text-link" href={cj.liveUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="demo_click" data-analytics-project="centro-da-juventude" data-analytics-location="main-case">Visitar projeto <ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
      <Link href={cj.href} className="real-project-visual" aria-label="Conhecer o projeto Centro da Juventude" data-analytics-event="project_click" data-analytics-project="centro-da-juventude" data-analytics-location="featured-image"><div className="real-browser-bar" aria-hidden="true"><span /><span>Centro da Juventude / Painel administrativo</span><ArrowUpRight size={16} /></div><Image src={cj.image} alt="Painel real do Centro da Juventude, com a visão de alunos, oficinas, turmas e frequência" width={1919} height={909} sizes="(max-width: 1023px) 90vw, 60vw" /><Image className="real-public-screen" src="/images/cases/cj/public-home-light.png" alt="Portal público do Centro da Juventude de Almirante Tamandaré" width={1902} height={905} sizes="(max-width: 767px) 44vw, 350px" /></Link>
    </article>
  </div></section>;
}

export function TextMarquee() {
  return <StudioMarquee />;
}

export function SolutionsSection() {
  return <section id="solucoes" className="services-section studio-services" aria-labelledby="services-title"><div className="site-container">
    <div className="studio-section-label"><span className="status-dot" /> O QUE POSSO CRIAR COM VOCÊ</div>
    <div className="section-heading"><h2 id="services-title">SEU PRÓXIMO<br /><span>PASSO DIGITAL.</span></h2><p>Da presença online à rotina da operação.<br />O projeto começa pelo que você precisa resolver.</p></div>
    <div className="service-list">{services.map((service, index) => <article className="service-row" key={service.title}><span className="service-number">0{index + 1}</span><h3><a href="#contato" data-analytics-event="cta_click" data-analytics-label={service.title} data-analytics-location="services-title">{service.title}</a></h3><div><p>{service.description}</p><p className="service-scope">{service.scope}</p></div><a href="#contato" className="service-arrow" aria-label={`Conversar sobre ${service.title}`} data-analytics-event="cta_click" data-analytics-label={service.title} data-analytics-location="services"><ArrowUpRight size={28} aria-hidden="true" /></a></article>)}</div>
    <div className="maintenance-note"><span className="status-dot" /><p><strong>O projeto também pode continuar evoluindo.</strong> Manutenção e suporte podem ser contratados conforme a proposta, com um novo escopo para mudanças maiores.</p></div>
  </div></section>;
}

export function AboutSection() {
  return <section id="sobre" className="about-section studio-about paper-section" aria-labelledby="about-title"><div className="site-container">
    <div className="studio-section-label">QUEM IMAGINA. QUEM DESENVOLVE.</div>
    <h2 id="about-title">POR TRÁS DO CÓDIGO,<br /><span>EXISTE UMA IDEIA.</span></h2>
    <div className="studio-about-layout"><figure className="studio-portrait"><div className="portrait-reveal"><Image src={siteConfig.about.image} alt="Vitor Hamad, desenvolvedor responsável pela Viham Dev" width={1080} height={1440} sizes="(max-width: 767px) 90vw, 42vw" /></div><figcaption><strong>Vitor Hamad</strong><span>Desenvolvedor independente / Curitiba</span><ArrowUpRight size={22} aria-hidden="true" /></figcaption></figure>
    <div className="studio-about-copy"><p className="about-intro">Design com intenção.<br />Código que dá forma.</p><p>A Viham Dev é a minha marca de desenvolvimento. Sou Vitor Hamad e combino interface, regras de negócio e publicação para criar sites e sistemas adequados a cada projeto.</p><p>Do primeiro alinhamento às validações durante o desenvolvimento, você conversa diretamente comigo: o profissional que cuida da sua entrega.</p><Link href="/curriculo" className="text-link" data-analytics-event="resume_click" data-analytics-label="Ver currículo" data-analytics-location="about">Conheça meu percurso <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
  </div></section>;
}

export function ProcessSection() {
  return <section id="processo" className="process-section studio-process paper-section" aria-labelledby="process-title"><div className="site-container"><div className="studio-section-label">DA PRIMEIRA CONVERSA AO PROJETO NO AR</div><div className="section-heading"><h2 id="process-title">CRIATIVIDADE COM<br /><span>UM CAMINHO CLARO.</span></h2><p>Você acompanha as decisões.<br />Eu cuido de conectar cada etapa.</p></div><ProcessTimeline /></div></section>;
}

export function FaqSection() {
  return <section id="faq" className="faq-section studio-faq paper-section" aria-labelledby="faq-title"><div className="site-container faq-layout"><div><span className="studio-section-label">ANTES DE COMEÇAR</span><h2 id="faq-title">BOAS PERGUNTAS.<br />RESPOSTAS DIRETAS.</h2></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}

export function ContactSection() {
  return <section id="contato" className="contact-section studio-contact" aria-labelledby="contact-title"><div className="site-container">
    <div className="studio-section-label"><span className="status-dot" /> DO SEU LADO DA TELA, UMA IDEIA.</div>
    <div className="contact-opening"><h2 id="contact-title">SEU PRÓXIMO SITE<br /><span>PODE SER ASSIM.</span></h2><ArrowUpRight size={110} strokeWidth={1} aria-hidden="true" /></div>
    <div className="contact-layout"><div className="contact-copy"><p className="contact-invitation">Conte sua ideia.<br />Eu cuido do desenvolvimento.</p><p>Não é necessário ter um documento técnico pronto para começar. Vamos entender o que faz sentido para o seu negócio.</p><MagneticButton href={siteConfig.whatsapp.messageHref} data-analytics-event="whatsapp_click" data-analytics-location="contact-cta">Conversar sobre meu projeto</MagneticButton><div className="direct-contact"><a href={siteConfig.whatsapp.messageHref} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="contact"><MessageCircle size={20} aria-hidden="true" /><span>Prefere conversar pelo WhatsApp?<strong>{siteConfig.whatsapp.number}</strong></span><ArrowUpRight size={20} aria-hidden="true" /></a><a href={`mailto:${siteConfig.email}`}><Mail size={19} aria-hidden="true" /><span>{siteConfig.email}</span></a></div><span className="contact-location">CURITIBA / ATENDIMENTO REMOTO</span></div><div className="studio-form-wrap"><p className="form-intro">Ou deixe os primeiros detalhes por aqui.</p><ContactBudgetForm whatsappHref={siteConfig.whatsapp.messageHref} /></div></div>
  </div></section>;
}
