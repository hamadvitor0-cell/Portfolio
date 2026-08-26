import { NextResponse } from "next/server";
import { contactSuccessMessage, validateContactLead } from "@/lib/contact-lead";

export const runtime = "nodejs";

const publicErrorMessage =
  "Não foi possível enviar seu pedido agora. Tente novamente ou me chame no WhatsApp.";

const notConfiguredMessage =
  "O envio automático ainda não está configurado. Chame pelo WhatsApp ou tente novamente mais tarde.";

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id");
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Dados inválidos. Revise o formulário e tente novamente." },
      { status: 400 },
    );
  }

  const spamCheck = body && typeof body === "object"
    ? body as { website?: unknown; startedAt?: unknown }
    : {};
  const honeypot = typeof spamCheck.website === "string" ? spamCheck.website.trim() : "";
  const formStartedAt = typeof spamCheck.startedAt === "number" ? spamCheck.startedAt : 0;

  if (honeypot || !formStartedAt || Date.now() - formStartedAt < 900) {
    return NextResponse.json(
      { success: false, message: "Não foi possível validar o envio. Atualize a página e tente novamente." },
      { status: 400 },
    );
  }

  const result = validateContactLead(body ?? {});

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: "Revise os campos obrigatórios.", errors: result.errors },
      { status: 400 },
    );
  }

  const endpoint = process.env.HAMADFLOW_LEADS_ENDPOINT?.trim();
  const secret = process.env.HAMADFLOW_LEAD_SECRET?.trim();

  if (!endpoint || !secret) {
    console.error(JSON.stringify({
      level: "error",
      message: "contact_not_configured",
      route: "/api/contact",
      requestId,
      endpointConfigured: Boolean(endpoint),
      secretConfigured: Boolean(secret),
      ms: Date.now() - startedAt,
    }));
    return NextResponse.json({ success: false, message: notConfiguredMessage }, { status: 503 });
  }

  let endpointUrl: URL;

  try {
    endpointUrl = new URL(endpoint);
    if (!["http:", "https:"].includes(endpointUrl.protocol)) {
      throw new Error("Invalid endpoint protocol");
    }
  } catch {
    return NextResponse.json({ success: false, message: notConfiguredMessage }, { status: 503 });
  }

  try {
    const hamadFlowResponse = await fetch(endpointUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hamadflow-secret": secret,
      },
      body: JSON.stringify({
        name: result.data.name,
        isCompany: result.data.isCompany,
        companyName: result.data.companyName,
        email: result.data.email,
        phone: result.data.whatsapp,
        projectType: result.data.projectType,
        budgetRange: result.data.budget,
        message: result.data.message,
        source: "vitorhamad.me",
        lgpdConsent: result.data.consent,
        visitorId: result.data.visitorId,
        sessionId: result.data.sessionId,
        landingPage: result.data.landingPage,
        referrer: result.data.referrer,
        utm: result.data.utm,
        submissionId: result.data.submissionId,
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });

    if (!hamadFlowResponse.ok) {
      console.error(JSON.stringify({
        level: "error",
        message: "contact_upstream_rejected",
        route: "/api/contact",
        requestId,
        upstreamStatus: hamadFlowResponse.status,
        ms: Date.now() - startedAt,
      }));
      return NextResponse.json({ success: false, message: publicErrorMessage }, { status: 502 });
    }

    console.log(JSON.stringify({
      level: "info",
      message: "contact_forwarded",
      route: "/api/contact",
      requestId,
      ms: Date.now() - startedAt,
    }));
    return NextResponse.json({ success: true, message: contactSuccessMessage });
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      message: "contact_upstream_failed",
      route: "/api/contact",
      requestId,
      error: error instanceof Error ? error.message : "unknown",
      ms: Date.now() - startedAt,
    }));
    return NextResponse.json({ success: false, message: publicErrorMessage }, { status: 502 });
  }
}
