import { siteConfig } from "@/config/site";
import { iconMap } from "@/lib/icons";
import { isExternalHref } from "@/lib/utils";

const services = ["Sites institucionais", "Sistemas web", "Painéis administrativos", "Landing pages", "Manutenção"];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#040811]/80 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-[76rem] gap-8 text-sm text-slate-400 md:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-3 rounded-full text-white">
            <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-xs font-semibold">
              VH
            </span>
            <span className="font-semibold">{siteConfig.name}</span>
          </a>
          <p className="mt-4 max-w-xs leading-6">
            Desenvolvedor web com direção humana, IA como apoio estratégico e foco em projetos publicados.
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
            <a href={siteConfig.whatsapp.messageHref} target="_blank" rel="noreferrer" className="transition hover:text-white">
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
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] transition hover:border-[#7c6cff]/60 hover:text-white"
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
