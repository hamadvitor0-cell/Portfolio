import { siteConfig } from "@/config/site";
import Link from "next/link";
import { iconMap } from "@/lib/icons";
import { isExternalHref } from "@/lib/utils";

const services = ["Sistemas web", "Painéis administrativos", "MVPs", "Sites e landing pages"];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#040811]/80 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-[82rem] gap-8 text-sm text-slate-400 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-lg text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#ff9a3d] via-[#ff6138] to-[#d52f49] text-xs font-black tracking-[-0.08em] text-[#070b13]">
              VH
            </span>
            <span className="font-semibold">{siteConfig.name}</span>
          </Link>
          <p className="mt-4 max-w-xs leading-6">
            Sistemas web sob medida para organizar processos, validar ideias e publicar produtos profissionais.
          </p>
          <p className="mt-6 text-xs">© 2026 {siteConfig.name}. Todos os direitos reservados.</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Navegação</p>
          <div className="grid gap-2">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
            <a href="/curriculo" className="transition hover:text-white">Currículo</a>
            <a href="/privacidade" className="transition hover:text-white">Privacidade</a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Serviços</p>
          <div className="grid gap-2">
            {services.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Contato</p>
          <div className="grid gap-2">
            <a
              href={siteConfig.whatsapp.messageHref}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="whatsapp_click"
              data-analytics-label="WhatsApp"
              data-analytics-location="footer"
              className="transition hover:text-white"
            >
              {siteConfig.whatsapp.number}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
              {siteConfig.email}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternalHref(link.href) ? "_blank" : undefined}
                  rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                  aria-label={link.label}
                  data-analytics-event={
                    link.label === "WhatsApp"
                      ? "whatsapp_click"
                      : link.label === "GitHub"
                        ? "github_click"
                        : "cta_click"
                  }
                  data-analytics-label={link.label}
                  data-analytics-location="footer-social"
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] transition hover:border-[#ff7546]/60 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
