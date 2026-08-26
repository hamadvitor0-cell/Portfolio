import { NextResponse } from "next/server";

export const runtime = "nodejs";

const analyticsEvents = new Set([
  "page_view",
  "cta_click",
  "form_start",
  "form_submit",
  "form_error",
  "lead_created",
  "case_view",
  "project_click",
  "whatsapp_click",
  "github_click",
  "demo_click",
  "resume_click",
]);

const publicErrorMessage = "Analytics indisponível";

type AnalyticsRequest = {
  eventName?: unknown;
  path?: unknown;
  title?: unknown;
  referrer?: unknown;
  visitorId?: unknown;
  sessionId?: unknown;
  userAgent?: unknown;
  clientHints?: unknown;
  utm?: unknown;
  metadata?: unknown;
};

function requiredText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, maxLength);
  return normalized || null;
}

function optionalText(value: unknown, maxLength: number) {
  return requiredText(value, maxLength);
}

function safeObject(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function logAnalytics(
  level: "info" | "error",
  message: string,
  details: Record<string, unknown>,
) {
  const payload = JSON.stringify({ level, message, route: "/api/analytics", ...details });
  if (level === "error") console.error(payload);
  else console.log(payload);
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id");
  let body: AnalyticsRequest;

  try {
    body = (await request.json()) as AnalyticsRequest;
  } catch {
    logAnalytics("error", "invalid_body", { requestId, ms: Date.now() - startedAt });
    return NextResponse.json(
      { success: false, message: publicErrorMessage },
      { status: 400 },
    );
  }

  const eventName = requiredText(body.eventName, 80);
  const path = requiredText(body.path, 500);
  const visitorId = requiredText(body.visitorId, 160);
  const sessionId = requiredText(body.sessionId, 160);

  if (!eventName || !analyticsEvents.has(eventName) || !path || !visitorId || !sessionId) {
    logAnalytics("error", "invalid_event", {
      requestId,
      eventName,
      ms: Date.now() - startedAt,
    });
    return NextResponse.json(
      { success: false, message: publicErrorMessage },
      { status: 400 },
    );
  }

  const endpoint = process.env.HAMADFLOW_ANALYTICS_ENDPOINT?.trim();
  const secret = process.env.HAMADFLOW_ANALYTICS_SECRET?.trim();

  if (!endpoint || !secret) {
    return NextResponse.json(
      { success: true, forwarded: false },
      { status: 202 },
    );
  }

  let endpointUrl: URL;

  try {
    endpointUrl = new URL(endpoint);
    if (!["http:", "https:"].includes(endpointUrl.protocol)) {
      throw new Error("Invalid analytics endpoint protocol");
    }
  } catch {
    logAnalytics("error", "invalid_endpoint", {
      requestId,
      eventName,
      ms: Date.now() - startedAt,
    });
    return NextResponse.json(
      { success: false, message: publicErrorMessage },
      { status: 503 },
    );
  }

  const utm = safeObject(body.utm);
  const metadata = safeObject(body.metadata);
  const clientHints = safeObject(body.clientHints);
  const clientUserAgent =
    optionalText(body.userAgent, 600) ?? request.headers.get("user-agent") ?? "";

  if (JSON.stringify(metadata).length > 4000) {
    logAnalytics("error", "metadata_too_large", {
      requestId,
      eventName,
      ms: Date.now() - startedAt,
    });
    return NextResponse.json(
      { success: false, message: publicErrorMessage },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hamadflow-analytics-secret": secret,
        "x-hamadflow-client-user-agent": clientUserAgent,
        "sec-ch-ua": request.headers.get("sec-ch-ua") ?? "",
        "sec-ch-ua-mobile": request.headers.get("sec-ch-ua-mobile") ?? "",
        "sec-ch-ua-platform": request.headers.get("sec-ch-ua-platform") ?? "",
      },
      body: JSON.stringify({
        eventName,
        path,
        title: optionalText(body.title, 300) ?? "",
        referrer: optionalText(body.referrer, 700) ?? "",
        visitorId,
        sessionId,
        userAgent: clientUserAgent,
        clientHints: {
          brands: Array.isArray(clientHints.brands) ? clientHints.brands : undefined,
          mobile: typeof clientHints.mobile === "boolean" ? clientHints.mobile : undefined,
          platform: optionalText(clientHints.platform, 80) ?? undefined,
        },
        utm: {
          source: optionalText(utm.source, 120) ?? "",
          medium: optionalText(utm.medium, 120) ?? "",
          campaign: optionalText(utm.campaign, 160) ?? "",
          term: optionalText(utm.term, 160) ?? "",
          content: optionalText(utm.content, 160) ?? "",
        },
        metadata,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      logAnalytics("error", "upstream_rejected", {
        requestId,
        eventName,
        upstreamStatus: response.status,
        ms: Date.now() - startedAt,
      });
      return NextResponse.json(
        { success: false, message: publicErrorMessage },
        { status: 502 },
      );
    }

    logAnalytics("info", "event_forwarded", {
      requestId,
      eventName,
      ms: Date.now() - startedAt,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    logAnalytics("error", "upstream_failed", {
      requestId,
      eventName,
      error: error instanceof Error ? error.message : "unknown",
      ms: Date.now() - startedAt,
    });
    return NextResponse.json(
      { success: false, message: publicErrorMessage },
      { status: 502 },
    );
  }
}
