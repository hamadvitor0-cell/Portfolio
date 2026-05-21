import { siteConfig } from "@/config/site";
import { iconMap } from "@/lib/icons";
import { isExternalHref } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Replace all placeholder content before publishing.
        </p>
        <div className="flex flex-wrap gap-3">
          {siteConfig.socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternalHref(link.href) ? "_blank" : undefined}
                rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                aria-label={link.label}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 transition hover:border-accent/50 hover:text-foreground"
              >
                <Icon className="size-4" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
