import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsappFloatingButton() {
  return (
    <a
      href={siteConfig.whatsapp.messageHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar Vitor no WhatsApp"
      className="group fixed bottom-3 right-3 z-50 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-accent to-foreground text-background shadow-[0_14px_34px_rgb(var(--color-accent)/0.32)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_22px_60px_rgb(var(--color-accent)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:size-14 sm:shadow-[0_18px_45px_rgb(var(--color-accent)/0.35)]"
    >
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
      <MessageCircle className="relative size-5 sm:size-6" />
    </a>
  );
}
