import { MagneticButton } from "@/components/magnetic-button";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Vitor Hamad",
  description: "A página solicitada não foi encontrada.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-24">
      <section className="mx-auto max-w-xl text-center">
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-4 text-4xl font-medium text-foreground sm:text-6xl">Página não encontrada.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Este endereço não existe. Volte ao site de {siteConfig.name} para continuar.
        </p>
        <div className="mt-8">
          <MagneticButton href="/">Voltar ao início</MagneticButton>
        </div>
      </section>
    </main>
  );
}
