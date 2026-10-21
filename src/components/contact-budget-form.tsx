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

const labelClass = "font-semibold";
const fieldClass = "contact-field";
const errorClass = "form-error";

export function ContactBudgetForm({ whatsappHref }: ContactBudgetFormProps) {
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactLeadErrors>({});
  const submissionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const submittingRef = useRef(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
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
      const firstError = Object.keys(validation.errors)[0];
      if (firstError) form.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      void trackEvent("form_error", { reason: "validation", fields: Object.keys(validation.errors), location: "contact-form" });
      return;
    }

    setErrors({});
    setFeedback("");
    setStatus("loading");
    submittingRef.current = true;

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
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} data-analytics-form="contact-budget" data-analytics-label="Pedido de orçamento" data-analytics-location="contact-form" className="contact-form">
      <div className="form-grid">
        <div>
          <label className={labelClass} htmlFor="lead-name">Nome <span aria-hidden="true" className="text-[#D5F662]">*</span></label>
          <input id="lead-name" name="name" required className={fieldClass} placeholder="Seu nome" maxLength={80} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} />
          {errors.name ? <p id="lead-name-error" className={errorClass}>{errors.name}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-contact">E-mail ou WhatsApp <span aria-hidden="true" className="text-[#D5F662]">*</span></label>
          <input id="lead-contact" name="contact" required className={fieldClass} placeholder="voce@email.com ou (41) 99999-9999" maxLength={120} autoComplete="email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "lead-contact-error" : undefined} />
          {errors.contact ? <p id="lead-contact-error" className={errorClass}>{errors.contact}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-company">Empresa ou organização <span className="font-normal text-[#B9C2D0]">(opcional)</span></label>
          <input id="lead-company" name="companyName" className={fieldClass} placeholder="Nome da organização" maxLength={120} autoComplete="organization" aria-invalid={Boolean(errors.companyName)} aria-describedby={errors.companyName ? "lead-company-error" : undefined} />
          {errors.companyName ? <p id="lead-company-error" className={errorClass}>{errors.companyName}</p> : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-project-type">Tipo de projeto <span aria-hidden="true" className="text-[#D5F662]">*</span></label>
          <select id="lead-project-type" name="projectType" required className={fieldClass} defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "lead-project-type-error" : undefined}>
            <option value="" disabled>Selecione</option>
            {projectTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.projectType ? <p id="lead-project-type-error" className={errorClass}>{errors.projectType}</p> : null}
        </div>
        <div className="form-full">
          <label className={labelClass} htmlFor="lead-budget">Faixa de orçamento <span className="font-normal text-[#B9C2D0]">(opcional)</span></label>
          <select id="lead-budget" name="budget" className={fieldClass} defaultValue="" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? "lead-budget-error" : undefined}>
            <option value="">Prefiro conversar primeiro</option>
            {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.budget ? <p id="lead-budget-error" className={errorClass}>{errors.budget}</p> : null}
        </div>
        <div className="form-full">
          <div className="flex items-end justify-between gap-3">
            <label className={labelClass} htmlFor="lead-message">Resumo do problema ou ideia <span aria-hidden="true" className="text-[#D5F662]">*</span></label>
            <span className="text-xs text-[#B9C2D0]">{messageLength}/{messageMaxLength}</span>
          </div>
          <textarea id="lead-message" name="message" required className={`${fieldClass} min-h-32 resize-y leading-6`} placeholder="Conte o que hoje dá trabalho e o que você espera organizar ou colocar no ar." maxLength={messageMaxLength} onChange={(event) => setMessageLength(event.target.value.length)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "lead-message-error" : undefined} />
          {errors.message ? <p id="lead-message-error" className={errorClass}>{errors.message}</p> : null}
        </div>
      </div>

      <div className="pointer-events-none absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="lead-website">Não preencha este campo</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent-label mt-5 flex cursor-pointer items-start gap-3">
        <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-[#D5F662]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "lead-consent-error" : undefined} />
        <span>{contactConsentLabel} <Link href="/privacidade" className="text-slate-200 underline decoration-white/30 underline-offset-4 hover:text-white">Como seus dados são usados.</Link></span>
      </label>
      {errors.consent ? <p id="lead-consent-error" className={errorClass}>{errors.consent}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === "loading"} className="button button-primary flex-1">
          {status === "loading" ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" /> Enviando...</> : <>Enviar meu projeto <Send className="size-4" aria-hidden="true" /></>}
        </button>
        <a href={whatsappHref} target="_blank" rel="noreferrer" data-analytics-event="whatsapp_click" data-analytics-label="WhatsApp" data-analytics-location="contact-form" className="button button-outline"><MessageCircle className="size-4" aria-hidden="true" /> WhatsApp</a>
      </div>

      <p className="form-hint mt-4">Campos marcados com * são obrigatórios. Seus dados são usados para responder sobre o projeto.</p>
      <div aria-live="polite" aria-atomic="true">
        {feedback ? <p className={`form-feedback ${status === "success" ? "success" : ""}`} role="status">{feedback}</p> : null}
      </div>
    </form>
  );
}
