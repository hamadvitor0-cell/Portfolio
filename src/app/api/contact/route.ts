import { NextResponse } from "next/server";
import { contactSuccessMessage, validateContactLead } from "@/lib/contact-lead";

const publicErrorMessage =
  "Não foi possível enviar seu pedido agora. Tente novamente ou me chame no WhatsApp.";

const notConfiguredMessage =
  "O envio automático ainda não está configurado. Chame pelo WhatsApp ou tente novamente mais tarde.";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Dados inválidos. Revise o formulário e tente novamente." },
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
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!hamadFlowResponse.ok) {
      return NextResponse.json({ success: false, message: publicErrorMessage }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: contactSuccessMessage });
  } catch {
    return NextResponse.json({ success: false, message: publicErrorMessage }, { status: 502 });
  }
}
