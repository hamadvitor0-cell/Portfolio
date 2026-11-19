import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseImageCarousel, type CaseSlide } from "@/components/case-image-carousel";
import { JsonLd } from "@/components/json-ld";
import { siteConfig, vertexResidencesProject as project } from "@/config/site";
import plansCapture from "../../../../public/projects/vertex-residences/plantas.webp";
import tourCapture from "../../../../public/projects/vertex-residences/tour.webp";

const title = `${project.title} | Viham Dev`;
const url = `${siteConfig.seo.siteUrl}${project.href}`;
const description = "Case de um lançamento imobiliário conceitual, com apresentação de uma torre em 3D, plantas interativas e tour do apartamento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: project.href },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [{ url: project.image, width: project.imageWidth, height: project.imageHeight, alt: project.imageAlt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [project.image] },
};

const slides: CaseSlide[] = [
  {
    src: project.image,
    title: "A torre em 3D",
    caption: "A abertura do site apresenta a torre iluminada ao anoitecer, em meio à paisagem urbana.",
    width: project.imageWidth,
    height: project.imageHeight,
  },
  {
    src: plansCapture.src,
    title: "Planta do apartamento Panorama",
    caption: "Uma das três plantas humanizadas, com metragem, distribuição dos ambientes e opção de ampliação.",
    width: plansCapture.width,
    height: plansCapture.height,
  },
  {
    src: tourCapture.src,
    title: "Living integrado no tour 3D",
    caption: "A visita começa no living. Os controles permitem avançar ou escolher um dos seis ambientes do apartamento.",
    width: tourCapture.width,
    height: tourCapture.height,
  },
];

const highlights = [
  { title: "A torre toma forma", description: "A cena 3D acompanha a rolagem da abertura e apresenta a torre no cenário urbano. A página também oferece uma opção de movimento reduzido." },
  { title: "Três plantas para explorar", description: "O seletor alterna entre 98, 128 e 196 m². Cada opção apresenta uma planta humanizada que pode ser ampliada, com metragem e detalhes da distribuição." },
  { title: "O apartamento por dentro", description: "O tour em 3D percorre seis ambientes, do living aos quartos. A galeria do empreendimento reúne imagens de interiores, áreas comuns e arquitetura." },
  { title: "Da descoberta ao interesse", description: "O fluxo conecta a planta escolhida às opções de contato e simula ações como agendar uma visita ou solicitar uma apresentação." },
];

export default function VertexResidencesCasePage() {
  return (
    <main id="main-content" className="case-page concept-case">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description,
          genre: project.category,
          url,
          sameAs: project.liveUrl,
          image: new URL(project.image, siteConfig.seo.siteUrl).href,
          author: { "@type": "Person", name: "Vitor Hamad", url: siteConfig.seo.siteUrl },
          inLanguage: "pt-BR",
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.seo.siteUrl },
            { "@type": "ListItem", position: 2, name: "Projetos", item: `${siteConfig.seo.siteUrl}/#cases` },
            { "@type": "ListItem", position: 3, name: project.title, item: url },
          ],
        },
      ]} />

      <section className="concept-case-intro" aria-labelledby="vertex-case-title">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#cases" className="text-link concept-back"><ArrowLeft size={17} aria-hidden="true" />Voltar aos projetos</a>
        <div className="concept-case-heading">
          <div>
            <p className="concept-meta">{project.year} <span aria-hidden="true">/</span> {project.kind}</p>
            <h1 id="vertex-case-title">{project.title}</h1>
            <p className="concept-case-subtitle">{project.category}</p>
          </div>
          <div className="concept-case-intro-copy">
            <p>{project.description}</p>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary case-primary" aria-label="Visitar Vertex Residences (abre em nova aba)" data-analytics-event="demo_click" data-analytics-project={project.slug} data-analytics-location="case-hero">
              Visitar site <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="concept-case-cover">
          <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 1300px) 94vw, 1248px" loading="eager" />
          <figcaption>Captura da abertura do site Vertex Residences.</figcaption>
        </figure>
      </section>

      <section className="concept-case-section" aria-labelledby="vertex-challenge-title">
        <div className="concept-case-columns">
          <div>
            <h2 id="vertex-challenge-title">Da fachada à planta.</h2>
            <p>O desafio foi apresentar um empreendimento residencial em diferentes escalas. A abertura estabelece a atmosfera da torre e a navegação permite passar da vista externa ao interior dos apartamentos, com plantas, imagens e detalhes dos espaços.</p>
          </div>
          <div>
            <h3>Sobre a demonstração</h3>
            <p className="concept-notice">O empreendimento é fictício. As imagens, as plantas e a localização são ilustrativas. O formulário demonstra um fluxo de atendimento sem enviar ou armazenar os dados inseridos.</p>
          </div>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="vertex-features-title">
        <h2 id="vertex-features-title">Como o visitante explora o projeto.</h2>
        <dl className="concept-highlights">
          {highlights.map(({ title, description }) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
        </dl>
      </section>

      <section className="concept-case-section" aria-labelledby="vertex-gallery-title">
        <h2 id="vertex-gallery-title">O projeto em tela.</h2>
        <p className="concept-section-description">Capturas do site publicado.</p>
        <CaseImageCarousel slides={slides} />
      </section>

      <section className="concept-case-section concept-case-contact" aria-labelledby="vertex-contact-title">
        <div>
          <h2 id="vertex-contact-title">Tem um projeto para apresentar?</h2>
          <p>Desenvolvo sites e experiências interativas para apresentar produtos, espaços e serviços.</p>
        </div>
        {/* Native navigation replaces the home fragment after a case visit. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#contato" className="button button-primary case-primary" data-analytics-event="cta_click" data-analytics-label="Solicitar um projeto" data-analytics-project={project.slug} data-analytics-location="case-contact">
          Solicitar um projeto <ArrowRight size={18} aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
