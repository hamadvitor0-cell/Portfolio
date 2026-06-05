"use client";

import { useState, type FormEvent } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import {
  budgetOptions,
  contactConsentLabel,
  contactSuccessMessage,
  messageMaxLength,
  projectTypeOptions,
  validateContactLead,
  type ContactLeadErrors
} from "@/lib/contact-lead";

type ContactBudgetFormProps = {
  whatsappHref: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

const labelClass = "text-xs font-semibold uppercase tracking-[0.16em] text-slate-400";
const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#9b7cff]/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-[#7c6cff]/20";
const errorClass = "mt-1 text-xs text-rose-300";

export function ContactBudgetForm({ whatsappHref }: ContactBudgetFormProps) {
  const [isCompany, setIsCompany] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactLeadErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = validateContactLead({
      name: formData.get("name"),
      isCompany,
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      consent: formData.get("consent")
    });

    if (!validation.success) {
      setErrors(validation.errors);
      setFeedback("Revise os campos destacados antes de enviar.");
      setStatus("error");
      return;
    }

    setErrors({});
    setFeedback("");
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data)
      });
      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: ContactLeadErrors;
      };

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setFeedback(
          data.message ??
            "Não consegui enviar agora. Você pode tentar novamente ou chamar no WhatsApp."
        );
        setStatus("error");
        return;
      }

      form.reset();
      setIsCompany(false);
      setMessageLength(0);
      setFeedback(data.message ?? contactSuccessMessage);
      setStatus("success");
    } catch {
      setFeedback("Não consegui enviar agora. Você pode tentar novamente ou chamar no WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Pedido de orçamento</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            Envie o básico da ideia e eu retorno com os próximos passos.
          </p>
        </div>
        <span className="rounded-full border border-[#7c6cff]/30 bg-[#7c6cff]/15 px-3 py-1 text-xs font-semibold text-[#d9d4ff]">
          Rápido
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-name">
            Nome
          </label>
          <input
            id="lead-name"
            name="name"
            className={fieldClass}
            placeholder="Seu nome"
            maxLength={80}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className={errorClass}>{errors.name}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-email">
            E-mail
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            className={fieldClass}
            placeholder="voce@email.com"
            maxLength={120}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className={errorClass}>{errors.email}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-whatsapp">
            WhatsApp
          </label>
          <input
            id="lead-whatsapp"
            name="whatsapp"
            className={fieldClass}
            placeholder="(41) 99999-9999"
            maxLength={30}
            autoComplete="tel"
            aria-invalid={Boolean(errors.whatsapp)}
          />
          {errors.whatsapp ? <p className={errorClass}>{errors.whatsapp}</p> : null}
        </div>

        <div className="flex items-end">
          <label className="flex min-h-[3.15rem] w-full cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]">
            <input
              type="checkbox"
              name="isCompany"
              checked={isCompany}
              onChange={(event) => setIsCompany(event.target.checked)}
              className="size-4 rounded border-white/20 bg-transparent accent-[#8b7cff]"
            />
            É empresa?
          </label>
        </div>

        {isCompany ? (
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="lead-company">
              Nome da empresa
            </label>
            <input
              id="lead-company"
              name="companyName"
              className={fieldClass}
              placeholder="Nome da empresa"
              maxLength={120}
              autoComplete="organization"
              aria-invalid={Boolean(errors.companyName)}
            />
            {errors.companyName ? <p className={errorClass}>{errors.companyName}</p> : null}
          </div>
        ) : null}

        <div>
          <label className={labelClass} htmlFor="lead-project-type">
            Tipo de projeto
          </label>
          <select
            id="lead-project-type"
            name="projectType"
            className={fieldClass}
            defaultValue=""
            aria-invalid={Boolean(errors.projectType)}
          >
            <option value="" disabled>
              Selecione
            </option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.projectType ? <p className={errorClass}>{errors.projectType}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-budget">
            Orçamento aproximado
          </label>
          <select
            id="lead-budget"
            name="budget"
            className={fieldClass}
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
          >
            <option value="" disabled>
              Selecione
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget ? <p className={errorClass}>{errors.budget}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-end justify-between gap-3">
            <label className={labelClass} htmlFor="lead-message">
              Mensagem explicando a ideia
            </label>
            <span className="text-xs text-slate-500">
              {messageLength}/{messageMaxLength}
            </span>
          </div>
          <textarea
            id="lead-message"
            name="message"
            className={`${fieldClass} min-h-28 resize-none leading-6`}
            placeholder="Conte o objetivo, páginas, funcionalidades ou referências que já tem em mente."
            maxLength={messageMaxLength}
            onChange={(event) => setMessageLength(event.target.value.length)}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <p className={errorClass}>{errors.message}</p> : null}
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-400">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 shrink-0 rounded border-white/20 bg-transparent accent-[#8b7cff]"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>{contactConsentLabel}</span>
      </label>
      {errors.consent ? <p className={errorClass}>{errors.consent}</p> : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6d5dfc] to-[#9b7cff] px-5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(109,93,252,0.32)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enviando pedido...
            </>
          ) : (
            <>
              Enviar pedido
              <Send className="size-4" />
            </>
          )}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-[#8b7cff]/60 hover:bg-white/[0.08]"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </div>

      {feedback ? (
        <p
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
              : "border-rose-300/25 bg-rose-300/10 text-rose-100"
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
