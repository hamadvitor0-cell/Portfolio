import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacidade | Vitor Hamad",
  description: "Como os dados enviados pelo formulário de contato de Vitor Hamad são utilizados e protegidos.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#09111e] p-6 sm:p-10">
        <Link href="/#contato" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><ArrowLeft className="size-4" />Voltar ao formulário</Link>
        <h1 className="font-display mt-8 text-4xl font-extrabold tracking-[-0.04em] text-white">Privacidade no contato</h1>
        <p className="mt-5 text-base leading-8 text-slate-300">Os dados enviados no formulário são usados somente para analisar sua solicitação e responder sobre o projeto.</p>
        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-400">
          <section><h2 className="text-lg font-bold text-white">Dados coletados</h2><p className="mt-2">Nome, empresa quando informada, e-mail ou WhatsApp, tipo de projeto, faixa de orçamento opcional e a descrição enviada.</p></section>
          <section><h2 className="text-lg font-bold text-white">Finalidade e compartilhamento</h2><p className="mt-2">Essas informações servem para retorno comercial e preparação do diagnóstico. Não são vendidas nem usadas para publicidade de terceiros.</p></section>
          <section><h2 className="text-lg font-bold text-white">Métricas anônimas</h2><p className="mt-2">O site pode registrar eventos de navegação e conversão sem incluir o conteúdo das mensagens ou dados pessoais digitados no formulário.</p></section>
          <section><h2 className="text-lg font-bold text-white">Contato</h2><p className="mt-2">Para pedir correção ou exclusão de dados enviados, escreva para <a className="text-slate-200 underline underline-offset-4" href="mailto:hamadvitor0@gmail.com">hamadvitor0@gmail.com</a>.</p></section>
        </div>
      </article>
    </main>
  );
}
