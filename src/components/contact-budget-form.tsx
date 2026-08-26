"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import {
  getOrCreateSessionId,
  getOrCreateVisitorId,
  getUtmParams,
  trackEvent,
} from "@/lib/analytics";
import {
  budgetOptions,
  contactConsentLabel,
  contactSuccessMessage,
  messageMaxLength,
  projectTypeOptions,
  validateContactLead,
  type ContactLeadErrors,
} from "@/lib/contact-lead";

type ContactBudgetFormProps = { whatsappHref: string };
type SubmitState = "idle" | "loading" | "success" | "error";

const labelClass = "text-sm font-semibold text-slate-200";
const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-white/12 bg-[#050b14] px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-[#ff7546]/70 focus:ring-2 focus:ring-[#ff7546]/20";
const errorClass = "mt-1 text-sm text-rose-300";

export function ContactBudgetForm({ whatsappHref }: ContactBudgetFormProps) {
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactLeadErrors>({});
  const submissionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectType = String(formData.get("projectType") ?? "");
    const budget = String(formData.get("budget") ?? "");
    const companyName = String(formData.get("companyName") ?? "");
    const submissionId = submissionIdRef.current ?? crypto.randomUUID();
    submissionIdRef.current = submissionId;

    void trackEvent("form_submit", {
      label: "Enviar projeto",
      ...(projectType ? { projectType } : {}),
      ...(budget ? { budget } : {}),
      location: "contact-form",
    });

    const validation = validateContactLead({
      name: formData.get("name"),
      isCompany: Boolean(companyName.trim()),
      companyName,
      contact: formData.get("contact"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      consent: formData.get("consent"),
      visitorId: getOrCreateVisitorId(),
      sessionId: getOrCreateSessionId(),
      landingPage: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      utm: getUtmParams(),
      submissionId,
    });

    if (!validation.success) {
      setErrors(validation.errors);
      setFeedback("Revise os campos destacados antes de enviar.");
      setStatus("error");
      void trackEvent("form_error", { reason: "validation", fields: Object.keys(validation.errors), location: "contact-form" });
      return;
    }

    setErrors({});
    setFeedback("");
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          website: formData.get("website"),
          startedAt: startedAtRef.current,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string; errors?: ContactLeadErrors };

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setFeedback(data.message ?? "Não consegui enviar agora. Você pode tentar novamente ou chamar no WhatsApp.");
        setStatus("error");
        void trackEvent("form_error", { reason: response.status === 400 ? "validation" : "upstream", status: response.status, location: "contact-form" });
        return;
      }

      form.reset();
      setMessageLength(0);
      submissionIdRef.current = null;
      startedAtRef.current = Date.now();
      setFeedback(data.message ?? contactSuccessMessage);
      setStatus("success");
      void trackEvent("lead_created", { label: "Pedido enviado com sucesso", projectType: validation.data.projectType, budget: validation.data.budget, location: "contact-form" });
    } catch {
      setFeedback("Não consegui enviar agora. Você pode tentar novamente ou chamar no WhatsApp.");
      setStatus("error");
      void trackEvent("form_error", { reason: "network", location: "contact-form" });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-analytics-form="contact-budget" data-analytics-label="Pedido de orçamento" data-analytics-location="contact-form" className="rounded-2xl border border-white/10 bg-[#060d17] p-4 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-name">Nome <span aria-hidden="true" className="text-[#ff7546]">*</span></label>
          <input id="lead-name" name="name" required className={fieldClass} placeholder="Seu nome" maxLength={80} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} />
          {errors.name ? <p id="lead-name-error" className={errorClass}>{errors.name}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-contact">E-mail ou WhatsApp <span aria-hidden="true" className="text-[#ff7546]">*</span></label>
          <input id="lead-contact" name="contact" required className={fieldClass} placeholder="voce@email.com ou (41) 99999-9999" maxLength={120} autoComplete="email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "lead-contact-error" : undefined} />
          {errors.contact ? <p id="lead-contact-error" className={errorClass}>{errors.contact}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-company">Empresa ou organização <span className="font-normal text-slate-500">(opcional)</span></label>
          <input id="lead-company" name="companyName" className={fieldClass} placeholder="Nome da organização" maxLength={120} autoComplete="organization" aria-invalid={Boolean(errors.companyName)} />
          {errors.companyName ? <p className={errorClass}>{errors.companyName}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-project-type">Tipo de projeto <span aria-hidden="true" className="text-[#ff7546]">*</span></label>
          <select id="lead-project-type" name="projectType" required className={fieldClass} defaultValue="" aria-invalid={Boolean(errors.projectType)}>
            <option value="" disabled>Selecione</option>
            {projectTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.projectType ? <p className={errorClass}>{errors.projectType}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="lead-budget">Faixa de orçamento <span className="font-normal text-slate-500">(opcional)</span></label>
          <select id="lead-budget" name="budget" className={fieldClass} defaultValue="" aria-invalid={Boolean(errors.budget)}>
            <option value="">Prefiro conversar primeiro</option>
            {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.budget ? <p className={errorClass}>{errors.budget}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-end justify-between gap-3">
            <label className={labelClass} htmlFor="lead-message">Resumo do problema ou ideia <span aria-hidden="true" className="text-[#ff7546]">*</span></label>
            <span className="text-xs text-slate-500">{messageLength}/{messageMaxLength}</span>
          </div>
          <textarea id="lead-message" name="message" required className={`${fieldClass} min-h-32 resize-y leading-6`} placeholder="Conte o que hoje dá trabalho e o que você espera organizar ou colocar no ar." maxLength={messageMaxLength} onChange={(event) => setMessageLength(event.target.value.length)} aria-invalid={Boolean(errors.message)} />
          {errors.message ? <p className={errorClass}>{errors.message}</p> : null}
        </div>
      </div>

      <div className="pointer-events-none absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="lead-website">Não preencha este campo</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-400">
        <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[#ff7044]" aria-invalid={Boolean(errors.consent)} />
        <span>{contactConsentLabel} <Link href="/privacidade" className="text-slate-200 underline decoration-white/30 underline-offset-4 hover:text-white">Como seus dados são usados.</Link></span>
      </label>
      {errors.consent ? <p className={errorClass}>{errors.consent}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === "loading"} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff9738] via-[#ff6238] to-[#dc3348] px-5 text-sm font-bold text-[#080b12] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
          {status === "loading" ? <><Loader2 className="size-4 animate-spin" /> Enviando...</> : <>Enviar projeto <Send className="size-4" /></>}
        </button>
        <a href={whatsappHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-label="WhatsApp" data-analytics-location="contact-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-bold text-white transition hover:border-[#ff7546]/60"><MessageCircle className="size-4" /> WhatsApp</a>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">Campos marcados com * são obrigatórios. Não envio spam nem compartilho seus dados para publicidade.</p>
      <div aria-live="polite" aria-atomic="true">
        {feedback ? <p className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${status === "success" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100" : "border-rose-300/25 bg-rose-300/10 text-rose-100"}`} role="status">{feedback}</p> : null}
      </div>
    </form>
  );
}
