import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseImageCarousel, type CaseSlide } from "@/components/case-image-carousel";
import { JsonLd } from "@/components/json-ld";
import { mordidaProject as project, siteConfig } from "@/config/site";
import menuCapture from "../../../../public/projects/mordida/menu.webp";
import mobileCapture from "../../../../public/projects/mordida/mobile.webp";
import cartCapture from "../../../../public/projects/mordida/cart.webp";

const title = "MORDIDA! — Smash House | Viham Dev";
const description = "Projeto conceitual de hamburgueria com animações, cardápio interativo, personalização de produtos e carrinho demonstrativo. Conheça o MORDIDA!, por Viham Dev.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: project.href },
  openGraph: {
    title,
    description,
    url: `${siteConfig.seo.siteUrl}${project.href}`,
    type: "article",
    images: [{ url: project.image, width: project.imageWidth, height: project.imageHeight, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

const slides: CaseSlide[] = [
  {
    src: project.image,
    title: "MORDIDA! — hero no desktop",
    caption: "Captura real do site publicado: burger central, tipografia expressiva e ingredientes em diferentes planos. A cena foi pausada pelo controle disponível no próprio site.",
    width: project.imageWidth,
    height: project.imageHeight,
  },
  {
    src: menuCapture.src,
    title: "Cardápio interativo do MORDIDA!",
    caption: "Categorias, produtos e preços fictícios. Os filtros permitem explorar burgers, combos, acompanhamentos e bebidas.",
    width: menuCapture.width,
    height: menuCapture.height,
  },
  {
    src: mobileCapture.src,
    title: "MORDIDA! — página inicial no celular",
    caption: "Captura real em uma tela de 390 pixels: navegação compacta e hero adaptado ao celular, com acesso ao cardápio e ao carrinho.",
    width: mobileCapture.width,
    height: mobileCapture.height,
  },
  {
    src: cartCapture.src,
    title: "Carrinho demonstrativo do MORDIDA!",
    caption: "Mordida Original com bacon extra e sem picles. O carrinho exibe a personalização, a quantidade e o total calculado para a simulação.",
    width: cartCapture.width,
    height: cartCapture.height,
  },
];

const highlights = [
  { title: "Hero com profundidade", description: "Burger central, ingredientes em movimento e uma entrada coordenada. No desktop, a composição também reage discretamente ao mouse e à rolagem." },
  { title: "Cardápio para explorar", description: "Produtos organizados em categorias, filtros e informações de ingredientes. O visitante pode abrir cada item e conhecer sua composição." },
  { title: "Produtos do seu jeito", description: "Escolha de adicionais, remoção dos ingredientes permitidos e ajuste de quantidade, com atualização do valor antes de adicionar ao carrinho." },
  { title: "Carrinho demonstrativo", description: "Gerenciamento de itens, configurações e totais. As escolhas ficam salvas no navegador e podem ser retomadas ao recarregar a página." },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    genre: "Projeto conceitual de website interativo",
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

export default function MordidaCasePage() {
  return (
    <main id="main-content" className="case-page concept-case">
      <JsonLd data={structuredData} />
      <section className="concept-case-intro" aria-labelledby="mordida-case-title">
        <Link href="/#cases" className="text-link concept-back"><ArrowLeft size={17} aria-hidden="true" />Voltar aos projetos</Link>
        <div className="concept-case-heading">
          <div>
            <p className="concept-meta">{project.year} <span aria-hidden="true">/</span> {project.kind}</p>
            <h1 id="mordida-case-title">{project.title}</h1>
            <p className="concept-case-subtitle">Design que desperta o apetite. Interações que fazem a diferença.</p>
          </div>
          <div className="concept-case-intro-copy">
            <p>O MORDIDA! foi criado como uma demonstração de experiência digital para o setor gastronômico. A proposta combina uma identidade visual vibrante, animações expressivas e funcionalidades interativas, explorando como design e desenvolvimento podem trabalhar juntos para tornar um website mais envolvente.</p>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary case-primary" aria-label="Visualizar site MORDIDA! (abre em nova aba)" data-analytics-event="demo_click" data-analytics-project="mordida" data-analytics-location="case-hero">Visualizar site <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="concept-case-cover">
          <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 1300px) 94vw, 1248px" loading="eager" />
          <figcaption>Website interativo · Demonstração autoral · 2026</figcaption>
        </figure>
      </section>

      <section className="concept-case-section" aria-labelledby="mordida-concept-title">
        <div className="concept-case-columns">
          <div>
            <h2 id="mordida-concept-title">O conceito.</h2>
            <p>Uma hamburgueria fictícia com personalidade própria, construída em torno de uma experiência visual marcante. A identidade explora cores fortes, fotografias gastronômicas, tipografia expressiva e movimento.</p>
          </div>
          <div>
            <h3>Objetivo do projeto</h3>
            <p>Demonstrar como um site comercial pode unir uma identidade visual forte a funcionalidades que tornam a experiência do usuário mais interessante e intuitiva.</p>
            <p className="concept-notice">Marca, produtos e preços são fictícios. As imagens gastronômicas foram geradas por IA para o projeto e não representam produtos ou um restaurante real.</p>
          </div>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="mordida-experience-title">
        <h2 id="mordida-experience-title">Do primeiro olhar ao pedido simulado.</h2>
        <dl className="concept-highlights">{highlights.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
        <div className="concept-demo-note">
          <h3>Uma finalização para experimentar</h3>
          <p>O fluxo permite escolher retirada ou entrega, conferir os itens e copiar um resumo do pedido. A experiência é demonstrativa: nenhum pedido real é realizado e não há cobrança ou processamento de pagamento.</p>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="mordida-gallery-title">
        <h2 id="mordida-gallery-title">Uma experiência em diferentes telas.</h2>
        <p className="concept-section-description">Capturas reais do hero, cardápio, versão mobile e carrinho na demonstração publicada.</p>
        <CaseImageCarousel slides={slides} />
      </section>

      <section className="concept-case-section" aria-labelledby="mordida-tech-title">
        <div className="concept-case-columns">
          <div><h2 id="mordida-tech-title">Design e desenvolvimento juntos.</h2><p>Next.js, React e TypeScript estruturam a interface. Tailwind CSS e estilos autorais compõem o layout, enquanto GSAP e ScrollTrigger coordenam o movimento.</p></div>
          <div><ul className="concept-tech" aria-label="Tecnologias utilizadas no MORDIDA!">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p>O carrinho usa Context API, reducer e localStorage. O layout é responsivo, oferece navegação por teclado e respeita a preferência por movimento reduzido. O site está publicado na Vercel.</p></div>
        </div>
      </section>

      <section className="concept-case-section concept-case-contact" aria-labelledby="mordida-contact-title">
        <div><h2 id="mordida-contact-title">Seu negócio pode ter uma experiência assim.</h2><p>Desenvolvo sites personalizados para apresentar sua marca, destacar seus serviços e facilitar o contato com seus clientes.</p></div>
        {/* Native navigation replaces the home fragment reliably after a client-side case visit. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#contato" className="button button-primary case-primary" data-analytics-event="cta_click" data-analytics-label="Vamos criar seu site" data-analytics-project="mordida" data-analytics-location="case-contact">Vamos criar seu site <ArrowRight size={18} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
