export const analyticsEventNames = [
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
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsMetadata = Record<string, unknown>;

type UtmParams = Partial<{
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}>;

type ClientHints = {
  brands?: Array<{ brand: string; version: string }>;
  mobile?: boolean;
  platform?: string;
};

const visitorStorageKey = "hamad_visitor_id:v1";
const sessionStorageKey = "hamad_session_id:v1";
const utmStorageKey = "hamad_utm_params:v1";
const legacyVisitorStorageKey = "hamad_visitor_id";
const legacySessionStorageKey = "hamad_session_id";
const legacyUtmStorageKey = "hamad_utm_params";

let fallbackVisitorId: string | null = null;
let fallbackSessionId: string | null = null;

function createId(prefix: "anon" | "sess") {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replaceAll("-", "")
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${random}`;
}

function getOrCreateStoredId(
  storage: Storage,
  key: string,
  prefix: "anon" | "sess",
  fallback: string | null,
  legacyKey: string,
) {
  try {
    const saved = storage.getItem(key);
    if (saved) return saved;

    const legacy = storage.getItem(legacyKey);
    if (legacy) {
      storage.setItem(key, legacy);
      storage.removeItem(legacyKey);
      return legacy;
    }

    const created = createId(prefix);
    storage.setItem(key, created);
    return created;
  } catch {
    return fallback ?? createId(prefix);
  }
}

export function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  fallbackVisitorId = getOrCreateStoredId(
    window.localStorage,
    visitorStorageKey,
    "anon",
    fallbackVisitorId,
    legacyVisitorStorageKey,
  );
  return fallbackVisitorId;
}

export function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  fallbackSessionId = getOrCreateStoredId(
    window.sessionStorage,
    sessionStorageKey,
    "sess",
    fallbackSessionId,
    legacySessionStorageKey,
  );
  return fallbackSessionId;
}

export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(window.location.search);
  const current: UtmParams = {};
  const mappings = [
    ["utm_source", "source"],
    ["utm_medium", "medium"],
    ["utm_campaign", "campaign"],
    ["utm_term", "term"],
    ["utm_content", "content"],
  ] as const;

  for (const [queryName, key] of mappings) {
    const value = searchParams.get(queryName)?.trim();
    if (value) current[key] = value.slice(0, 160);
  }

  try {
    if (Object.keys(current).length > 0) {
      window.sessionStorage.setItem(utmStorageKey, JSON.stringify(current));
      return current;
    }

    const stored =
      window.sessionStorage.getItem(utmStorageKey) ??
      window.sessionStorage.getItem(legacyUtmStorageKey);

    if (stored && !window.sessionStorage.getItem(utmStorageKey)) {
      window.sessionStorage.setItem(utmStorageKey, stored);
      window.sessionStorage.removeItem(legacyUtmStorageKey);
    }

    return stored ? (JSON.parse(stored) as UtmParams) : {};
  } catch {
    return current;
  }
}

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return (analyticsEventNames as readonly string[]).includes(value);
}

export async function trackEvent(
  eventName: AnalyticsEventName,
  metadata: AnalyticsMetadata = {},
) {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname;

  try {
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        path,
        title: document.title,
        referrer: document.referrer,
        visitorId: getOrCreateVisitorId(),
        sessionId: getOrCreateSessionId(),
        userAgent: navigator.userAgent,
        clientHints: getClientHints(),
        utm: getUtmParams(),
        metadata,
      }),
      keepalive: true,
    });

    return response.ok;
  } catch {
    return false;
  }
}

export function trackPageView() {
  return trackEvent("page_view");
}

function getClientHints(): ClientHints {
  const userAgentData = (
    navigator as Navigator & {
      userAgentData?: {
        brands?: Array<{ brand: string; version: string }>;
        mobile?: boolean;
        platform?: string;
      };
    }
  ).userAgentData;

  return {
    brands: userAgentData?.brands,
    mobile: userAgentData?.mobile,
    platform: userAgentData?.platform,
  };
}
