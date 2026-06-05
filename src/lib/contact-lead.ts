export const projectTypeOptions = [
  "Landing Page",
  "Site Institucional",
  "Sistema Web",
  "Sistema Web Completo",
  "Manutenção Mensal",
  "Outro"
] as const;

export const budgetOptions = [
  "R$ 1.000 a R$ 1.500",
  "R$ 1.500 a R$ 3.000",
  "R$ 3.000 a R$ 5.000",
  "Acima de R$ 5.000",
  "Ainda não sei"
] as const;

export const messageMaxLength = 1200;

export const contactConsentLabel =
  "Aceito que meus dados sejam usados para retorno sobre meu orçamento.";

export const contactSuccessMessage =
  "Pedido enviado! Vou analisar sua ideia e te chamar pelo WhatsApp ou e-mail.";

export type ProjectType = (typeof projectTypeOptions)[number];
export type BudgetOption = (typeof budgetOptions)[number];

export type ContactLeadInput = {
  name?: unknown;
  isCompany?: unknown;
  companyName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
  consent?: unknown;
};

export type ContactLeadPayload = {
  name: string;
  isCompany: boolean;
  companyName?: string;
  email: string;
  whatsapp: string;
  projectType: ProjectType;
  budget: BudgetOption;
  message: string;
  consent: true;
};

export type ContactLeadErrors = Partial<Record<keyof ContactLeadInput, string>>;

type ValidationResult =
  | { success: true; data: ContactLeadPayload }
  | { success: false; errors: ContactLeadErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const whatsappPattern = /^[+\d\s().-]+$/;

function toText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toBoolean(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function isProjectType(value: string): value is ProjectType {
  return (projectTypeOptions as readonly string[]).includes(value);
}

function isBudgetOption(value: string): value is BudgetOption {
  return (budgetOptions as readonly string[]).includes(value);
}

function sanitizeSingleLine(value: unknown, maxLength: number) {
  return toText(value)
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value: unknown) {
  return toText(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, messageMaxLength);
}

export function validateContactLead(input: ContactLeadInput): ValidationResult {
  const errors: ContactLeadErrors = {};

  const name = sanitizeSingleLine(input.name, 80);
  const isCompany = toBoolean(input.isCompany);
  const companyName = sanitizeSingleLine(input.companyName, 120);
  const email = sanitizeSingleLine(input.email, 120).toLowerCase();
  const whatsapp = sanitizeSingleLine(input.whatsapp, 30);
  const projectType = sanitizeSingleLine(input.projectType, 80);
  const budget = sanitizeSingleLine(input.budget, 80);
  const rawMessage = toText(input.message).replace(/\r\n?/g, "\n");
  const message = sanitizeMessage(input.message);
  const consent = toBoolean(input.consent);

  if (name.length < 2) {
    errors.name = "Informe seu nome.";
  }

  if (isCompany && companyName.length < 2) {
    errors.companyName = "Informe o nome da empresa.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  const whatsappDigits = whatsapp.replace(/\D/g, "");
  if (!whatsappPattern.test(whatsapp) || whatsappDigits.length < 10 || whatsappDigits.length > 15) {
    errors.whatsapp = "Informe um WhatsApp válido com DDD.";
  }

  if (!isProjectType(projectType)) {
    errors.projectType = "Escolha o tipo de projeto.";
  }

  if (!isBudgetOption(budget)) {
    errors.budget = "Escolha uma faixa de orçamento.";
  }

  if (message.length < 10) {
    errors.message = "Explique sua ideia com pelo menos 10 caracteres.";
  } else if (rawMessage.length > messageMaxLength) {
    errors.message = `Limite sua mensagem a ${messageMaxLength} caracteres.`;
  }

  if (!consent) {
    errors.consent = "Você precisa aceitar o uso dos dados para retorno.";
  }

  if (Object.keys(errors).length > 0 || !isProjectType(projectType) || !isBudgetOption(budget)) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      isCompany,
      ...(isCompany ? { companyName } : {}),
      email,
      whatsapp,
      projectType,
      budget,
      message,
      consent: true
    }
  };
}
