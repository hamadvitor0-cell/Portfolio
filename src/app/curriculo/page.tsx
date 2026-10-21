import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Currículo | Viham Dev",
  description: "Formação, experiência prática e competências de Vitor Hamad, desenvolvedor web com projetos full stack publicados.",
  alternates: { canonical: "/curriculo" },
  openGraph: { title: "Currículo | Viham Dev", description: "Formação, experiência prática e competências de Vitor Hamad.", url: `${siteConfig.seo.siteUrl}/curriculo`, images: [{ url: "/og.png", width: 1200, height: 630 }] },
};

export default function CurriculoPage() {
  return (
    <main id="main-content" className="inner-page min-h-screen">
      <div className="mx-auto max-w-4xl">
        <Link href="/#sobre" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><ArrowLeft className="size-4" />Voltar ao site</Link>
        <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1529] p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D5F662]">Para recrutadores</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Vitor Hamad — Desenvolvedor Web</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Estudante de Análise e Desenvolvimento de Sistemas na PUCPR, com experiência prática em aplicações full stack, painéis administrativos, bancos de dados e deploy.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/VitorHamad_Curriculo.pdf" download data-analytics-event="resume_click" data-analytics-label="Baixar currículo" data-analytics-location="resume-page" className="button button-primary case-primary"><Download className="size-4" />Baixar currículo em PDF</a>
            <a href="/VitorHamad_Curriculo.pdf" target="_blank" rel="noreferrer" data-analytics-event="resume_click" data-analytics-label="Abrir currículo" data-analytics-location="resume-page" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-bold text-white"><ExternalLink className="size-4" />Abrir no navegador</a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><h2 className="text-lg font-bold text-white">Formação</h2><p className="mt-3 text-sm leading-7 text-slate-400">Técnico em Análise e Desenvolvimento de Sistemas e graduação em andamento na PUCPR EAD.</p></section>
            <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><h2 className="text-lg font-bold text-white">Experiência prática</h2><p className="mt-3 text-sm leading-7 text-slate-400">Centro da Juventude, HamadFlow e este portfólio demonstram desenvolvimento, produto, integração e publicação.</p></section>
          </div>
        </div>
      </div>
    </main>
  );
}
