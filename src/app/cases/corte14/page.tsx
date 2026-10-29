import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseImageCarousel, type CaseSlide } from "@/components/case-image-carousel";
import { JsonLd } from "@/components/json-ld";
import { corte14Project as project, siteConfig } from "@/config/site";
import corte14Services from "../../../../public/projects/corte14-services.webp";
import corte14Mobile from "../../../../public/projects/corte14-mobile.webp";

const title = "Corte 14 — Barber Club | Viham Dev";
const description = "Projeto conceitual de website para uma barbearia fictícia. Conheça o design, as animações, a versão mobile e a simulação de agendamento do Corte 14.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: project.href },
  openGraph: {
    title,
    description,
    url: `${siteConfig.seo.siteUrl}${project.href}`,
    type: "article",
    images: [{ url: project.image, width: 1250, height: 712, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

const slides: CaseSlide[] = [
  {
    src: project.image,
    title: "Corte 14 — página inicial no desktop",
    width: 1250,
    height: 712,
    caption: "Captura real do site publicado: tipografia expressiva, imagem em preto e branco e acesso à simulação de agendamento.",
  },
  {
    src: corte14Services.src,
    title: "Apresentação de serviços",
    width: 1250,
    height: 712,
    caption: "Seção real de serviços com descrição, duração e valores ilustrativos. A escolha de um serviço abre a simulação com essa opção selecionada.",
  },
  {
    src: corte14Mobile.src,
    title: "Corte 14 — página inicial no celular",
    width: 360,
    height: 812,
    caption: "Captura real em uma tela de 390 pixels: navegação compacta e composição do hero adaptada ao celular.",
  },
];

const highlights = [
  { title: "Identidade e movimento", description: "Hero com imagem em preto e branco, tipografia expressiva e animações de entrada e durante a rolagem." },
  { title: "Serviços bem apresentados", description: "Lista interativa com descrição, duração e valores ilustrativos, conectada ao fluxo demonstrativo de agendamento." },
  { title: "Galeria para explorar", description: "Imagens ampliadas com controles de navegação, teclado e gestos de toque." },
  { title: "Experiência em diferentes telas", description: "Layout responsivo, menu mobile e respeito à preferência por movimento reduzido." },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    genre: "Projeto conceitual de website institucional",
    url: `${siteConfig.seo.siteUrl}${project.href}`,
    sameAs: project.liveUrl,
    image: `${siteConfig.seo.siteUrl}${project.image}`,
    author: { "@type": "Person", name: "Vitor Hamad", url: siteConfig.seo.siteUrl },
    inLanguage: "pt-BR",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.seo.siteUrl },
      { "@type": "ListItem", position: 2, name: "Projetos", item: `${siteConfig.seo.siteUrl}/#cases` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.seo.siteUrl}${project.href}` },
    ],
  },
];

export default function Corte14CasePage() {
  return (
    <main id="main-content" className="case-page concept-case">
      <JsonLd data={structuredData} />
      <section className="concept-case-intro" aria-labelledby="corte14-case-title">
        <Link href="/#cases" className="text-link concept-back"><ArrowLeft size={17} aria-hidden="true" />Voltar aos projetos</Link>
        <div className="concept-case-heading">
          <div>
            <p className="concept-meta">{project.year} <span aria-hidden="true">/</span> {project.kind}</p>
            <h1 id="corte14-case-title">{project.title}</h1>
            <p className="concept-case-subtitle">Identidade, movimento e experiência digital.</p>
          </div>
          <div className="concept-case-intro-copy">
            <p>{project.overview}</p>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary case-primary" aria-label="Visualizar site Corte 14 (abre em nova aba)" data-analytics-event="demo_click" data-analytics-project="corte14" data-analytics-location="case-hero">Visualizar site <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="concept-case-cover">
          <Image src={project.image} alt={project.imageAlt} width={1250} height={712} sizes="(max-width: 1300px) 94vw, 1248px" loading="eager" />
          <figcaption>Website institucional · Demonstração autoral · 2026</figcaption>
        </figure>
      </section>

      <section className="concept-case-section" aria-labelledby="corte14-concept-title">
        <div className="concept-case-columns">
          <div>
            <h2 id="corte14-concept-title">Um negócio imaginado.<br />Uma experiência para explorar.</h2>
            <p>O Corte 14 nasceu como uma demonstração de como um site institucional pode ir além de uma página convencional. O conceito explora uma identidade visual marcante, grandes fotografias, tipografia expressiva e interações que tornam a navegação mais envolvente.</p>
          </div>
          <div>
            <h3>Objetivo do projeto</h3>
            <p>Demonstrar como uma presença digital bem desenvolvida pode apresentar a personalidade de um negócio, organizar seus serviços e criar uma experiência memorável para o visitante.</p>
            <p className="concept-notice">A barbearia, a marca e os profissionais são fictícios. As imagens presentes no site foram geradas por IA para o conceito. Este é um trabalho de demonstração de design e desenvolvimento.</p>
          </div>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="corte14-features-title">
        <h2 id="corte14-features-title">O que você pode experimentar.</h2>
        <dl className="concept-highlights">
          {highlights.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}
        </dl>
        <div className="concept-demo-note">
          <h3>Agendamento demonstrativo</h3>
          <p>O visitante pode escolher serviço, profissional, data e horário e conferir um resumo. O fluxo é uma simulação local: nenhuma reserva real é criada, nenhum dado é enviado e nenhuma cobrança é realizada.</p>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="corte14-gallery-title">
        <h2 id="corte14-gallery-title">O projeto em tela.</h2>
        <p className="concept-section-description">Capturas reais da versão publicada, no desktop e no celular.</p>
        <CaseImageCarousel slides={slides} />
      </section>

      <section className="concept-case-section" aria-labelledby="corte14-tech-title">
        <div className="concept-case-columns">
          <div><h2 id="corte14-tech-title">Tecnologias utilizadas.</h2><p>Next.js e React estruturam a interface, com TypeScript e Tailwind CSS. GSAP e ScrollTrigger coordenam as animações de entrada e rolagem.</p></div>
          <div><ul className="concept-tech" aria-label="Tecnologias utilizadas no Corte 14">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p>O site é exportado como páginas estáticas e publicado na Vercel. A simulação funciona no navegador.</p></div>
        </div>
      </section>

      <section className="concept-case-section concept-case-contact" aria-labelledby="corte14-contact-title">
        <div><h2 id="corte14-contact-title">Gostou desse projeto?</h2><p>Seu negócio também pode ter um site com identidade própria, pensado para apresentar seus serviços e facilitar o contato com novos clientes.</p></div>
        {/* Native navigation replaces the home fragment reliably after a client-side case visit. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#contato" className="button button-primary case-primary" data-analytics-event="cta_click" data-analytics-label="Quero um site para minha empresa" data-analytics-project="corte14" data-analytics-location="case-contact">Quero um site para minha empresa <ArrowRight size={18} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
