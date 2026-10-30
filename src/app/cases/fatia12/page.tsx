import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseImageCarousel, type CaseSlide } from "@/components/case-image-carousel";
import { JsonLd } from "@/components/json-ld";
import { fatia12Project as project, siteConfig } from "@/config/site";
import selectedCapture from "../../../../public/projects/fatia12/pizza-selected.webp";
import cartCapture from "../../../../public/projects/fatia12/cart.webp";
import mobileCapture from "../../../../public/projects/fatia12/hero-mobile.webp";

const title = "FATIA 12 — Pizza Studio | Viham Dev";
const description = "Projeto conceitual de pizzaria com seleção interativa de 12 sabores, animações e experiência digital desenvolvido pela Viham Dev.";

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
    title: "FATIA 12 — hero com pizza 3D",
    caption: "Captura real da demonstração publicada, com a pizza dividida em 12 setores, a identidade Pizza Studio e o convite para escolher um sabor.",
    width: project.imageWidth,
    height: project.imageHeight,
  },
  {
    src: selectedCapture.src,
    title: "Pepperoni — sabor selecionado",
    caption: "Após a seleção, toda a pizza apresenta a cobertura de Pepperoni. O painel mostra ingredientes, preço ilustrativo e opção de borda recheada.",
    width: selectedCapture.width,
    height: selectedCapture.height,
  },
  {
    src: cartCapture.src,
    title: "Carrinho demonstrativo do FATIA 12",
    caption: "Pizza inteira de Pepperoni com borda recheada, quantidade e total demonstrativo. Ao fundo, a caixa virtual após a animação de embalagem.",
    width: cartCapture.width,
    height: cartCapture.height,
  },
  {
    src: mobileCapture.src,
    title: "FATIA 12 — hero no celular",
    caption: "Captura real em uma tela de 390 pixels, com a cena WebGL carregada e os controles de seleção adaptados ao celular.",
    width: mobileCapture.width,
    height: mobileCapture.height,
  },
];

const highlights = [
  { title: "12 sabores para descobrir", description: "Cada setor da pizza inicial representa um sabor. A seleção funciona diretamente na cena 3D e também por botões acessíveis pelo teclado." },
  { title: "Uma transformação por inteiro", description: "A escolha revela a cobertura do sabor em toda a superfície da pizza, com uma transição em onda. O painel acompanha a mudança com nome, ingredientes e preço." },
  { title: "Da pizza à caixa virtual", description: "Ao adicionar ao carrinho, uma sequência animada acomoda a pizza na caixa e fecha a tampa. O item já fica registrado e a animação pode ser pulada." },
  { title: "Um pedido para experimentar", description: "O carrinho permite ajustar quantidades, remover itens e escolher borda recheada. Os totais são recalculados e as escolhas ficam salvas no navegador." },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    genre: "Projeto conceitual de website interativo com experiência 3D",
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

export default function Fatia12CasePage() {
  return (
    <main id="main-content" className="case-page concept-case">
      <JsonLd data={structuredData} />
      <section className="concept-case-intro" aria-labelledby="fatia12-case-title">
        <Link href="/#cases" className="text-link concept-back"><ArrowLeft size={17} aria-hidden="true" />Voltar aos projetos</Link>
        <div className="concept-case-heading">
          <div>
            <p className="concept-meta">{project.year} <span aria-hidden="true">/</span> {project.kind}</p>
            <h1 id="fatia12-case-title">{project.title}</h1>
            <p className="concept-case-subtitle">12 sabores. Uma experiência interativa.</p>
          </div>
          <div className="concept-case-intro-copy">
            <p>{project.overview}</p>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary case-primary" aria-label="Visualizar projeto FATIA 12 (abre em nova aba)" data-analytics-event="demo_click" data-analytics-project="fatia12" data-analytics-location="case-hero">Visualizar projeto <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="concept-case-cover">
          <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width: 1300px) 94vw, 1248px" loading="eager" />
          <figcaption>Website interativo / Experiência 3D · Demonstração autoral · 2026</figcaption>
        </figure>
      </section>

      <section className="concept-case-section" aria-labelledby="fatia12-concept-title">
        <div className="concept-case-columns">
          <div>
            <h2 id="fatia12-concept-title">Uma nova forma de escolher o sabor.</h2>
            <p>O FATIA 12 nasceu como uma demonstração de como elementos tridimensionais e interações criativas podem transformar a apresentação de produtos em um website. Em vez de navegar apenas por uma lista convencional, o usuário pode explorar os sabores diretamente em uma pizza interativa.</p>
          </div>
          <div>
            <h3>O conceito</h3>
            <p>Uma pizzaria fictícia que combina identidade visual contemporânea, gastronomia e tecnologia para apresentar seus produtos de maneira diferente dos cardápios digitais tradicionais.</p>
            <p className="concept-notice">Marca, estabelecimento e valores são fictícios. As imagens gastronômicas foram geradas por IA para o projeto. As imagens desta apresentação são capturas reais do website publicado.</p>
          </div>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="fatia12-challenge-title">
        <div className="concept-case-columns">
          <div><h2 id="fatia12-challenge-title">O desafio.</h2><p>Criar uma experiência de seleção de sabores que conectasse elementos visuais, animações e funcionalidades de pedido em uma interface intuitiva.</p></div>
          <div><h3>A solução</h3><p>Uma interface de pizzaria com identidade visual própria, seleção de sabores por fatia e apresentação dinâmica das informações dos produtos. O objetivo é transformar a escolha de um sabor em uma experiência digital visual, interativa e envolvente.</p></div>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="fatia12-features-title">
        <h2 id="fatia12-features-title">Interação que acompanha a escolha.</h2>
        <dl className="concept-highlights">{highlights.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
        <div className="concept-demo-note">
          <h3>Uma simulação de pedido</h3>
          <p>A composição com 12 sabores funciona como seletor: cada item do carrinho é uma pizza inteira de um único sabor. A finalização permite escolher retirada ou entrega e copiar um resumo. Nenhum pedido real é enviado e não há cobrança ou processamento de pagamento.</p>
        </div>
      </section>

      <section className="concept-case-section" aria-labelledby="fatia12-gallery-title">
        <h2 id="fatia12-gallery-title">A experiência em tela.</h2>
        <p className="concept-section-description">Capturas reais da cena 3D, do sabor selecionado, do carrinho e da versão mobile.</p>
        <CaseImageCarousel slides={slides} />
      </section>

      <section className="concept-case-section" aria-labelledby="fatia12-tech-title">
        <div className="concept-case-columns">
          <div><h2 id="fatia12-tech-title">Interface e cena trabalhando juntas.</h2><p>Next.js, React e TypeScript estruturam a aplicação. Three.js, React Three Fiber e Drei compõem a cena tridimensional. GSAP e ScrollTrigger coordenam as transformações e animações.</p></div>
          <div><ul className="concept-tech" aria-label="Tecnologias utilizadas no FATIA 12">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><p>Tailwind CSS e estilos autorais definem a interface responsiva. O carrinho usa localStorage e a preferência por movimento reduzido é respeitada. A experiência completa está disponível na demonstração publicada na Vercel.</p></div>
        </div>
      </section>

      <section className="concept-case-section concept-case-contact" aria-labelledby="fatia12-contact-title">
        <div><h2 id="fatia12-contact-title">Seu negócio também pode ter uma experiência assim.</h2><p>Desenvolvo sites personalizados, desde páginas institucionais até experiências interativas para apresentar produtos e serviços.</p></div>
        {/* Native navigation replaces the home fragment reliably after a client-side case visit. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#contato" className="button button-primary case-primary" data-analytics-event="cta_click" data-analytics-label="Solicitar um projeto" data-analytics-project="fatia12" data-analytics-location="case-contact">Solicitar um projeto <ArrowRight size={18} aria-hidden="true" /></a>
      </section>
    </main>
  );
}
