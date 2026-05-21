import { MagneticButton } from "@/components/magnetic-button";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-24">
      <section className="mx-auto max-w-xl text-center">
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-4 text-4xl font-medium text-foreground sm:text-6xl">Page not found.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          This page does not exist. Return to {siteConfig.name} and keep exploring the portfolio.
        </p>
        <div className="mt-8">
          <MagneticButton href="/">Back to home</MagneticButton>
        </div>
      </section>
    </main>
  );
}
