import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire, Module } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const ts = require("typescript");
function loadTs(path, overrides = {}) {
  const filename = resolve(path);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loadedModule = new Module(filename);
  const localRequire = createRequire(filename);
  loadedModule.require = (name) => overrides[name] ?? localRequire(name);
  loadedModule._compile(compiled, filename);
  return loadedModule.exports;
}
const lead = loadTs("src/lib/contact-lead.ts");
const { POST } = loadTs("src/app/api/contact/route.ts", { "@/lib/contact-lead": lead });
const originalFetch = globalThis.fetch;
const previousEndpoint = process.env.HAMADFLOW_LEADS_ENDPOINT;
const previousSecret = process.env.HAMADFLOW_LEAD_SECRET;
let forwarded = 0;
let mode = "success";
const valid = { name: "Teste local", companyName: "Empresa de teste", isCompany: true, contact: "qa@example.test", projectType: "Landing Page", message: "Solicitação fictícia para validação local do formulário.", consent: true, website: "", startedAt: Date.now() - 5000, visitorId: "anon_test", sessionId: "sess_test", submissionId: "test_submission", utm: { source: "test" }, landingPage: "/?utm_source=test" };
const request = (body) => new Request("http://127.0.0.1/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: typeof body === "string" ? body : JSON.stringify(body) });
globalThis.fetch = async (url, options) => {
  forwarded++;
  assert.equal(url, "http://127.0.0.1:3219/leads");
  assert.equal(options.headers["x-hamadflow-secret"], "local-test-secret");
  const payload = JSON.parse(options.body);
  assert.equal(payload.email, "qa@example.test");
  assert.equal(payload.projectType, "Landing Page");
  assert.equal(payload.companyName, "Empresa de teste");
  assert.equal(payload.source, "vitorhamad.me");
  assert.equal(payload.lgpdConsent, true);
  assert.equal(payload.submissionId, "test_submission");
  assert.equal(payload.utm.source, "test");
  assert.ok(options.signal instanceof AbortSignal);
  if (mode === "network") throw new Error("Simulated local network failure");
  return new Response("{}", { status: mode === "rejected" ? 400 : 201 });
};
try {
  process.env.HAMADFLOW_LEADS_ENDPOINT = "http://127.0.0.1:3219/leads";
  process.env.HAMADFLOW_LEAD_SECRET = "local-test-secret";
  assert.equal((await POST(request("invalid json"))).status, 400);
  assert.equal((await POST(request({ ...valid, website: "spam.example" }))).status, 400);
  assert.equal((await POST(request({ ...valid, startedAt: Date.now() }))).status, 400);
  const invalid = await POST(request({ ...valid, contact: "invalid", consent: false }));
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).errors.contact);
  assert.equal(forwarded, 0);
  delete process.env.HAMADFLOW_LEAD_SECRET;
  assert.equal((await POST(request(valid))).status, 503);
  process.env.HAMADFLOW_LEAD_SECRET = "local-test-secret";
  process.env.HAMADFLOW_LEADS_ENDPOINT = "file:///invalid";
  assert.equal((await POST(request(valid))).status, 503);
  process.env.HAMADFLOW_LEADS_ENDPOINT = "http://127.0.0.1:3219/leads";
  const success = await POST(request(valid));
  assert.equal(success.status, 200);
  assert.equal((await success.json()).success, true);
  mode = "rejected";
  assert.equal((await POST(request(valid))).status, 502);
  mode = "network";
  assert.equal((await POST(request(valid))).status, 502);
  assert.equal(forwarded, 3);
  console.log("PASS: contact validation, antispam, configuration, forwarding contract, success and failures. All upstream requests were mocked locally.");
} finally {
  globalThis.fetch = originalFetch;
  if (previousEndpoint === undefined) delete process.env.HAMADFLOW_LEADS_ENDPOINT; else process.env.HAMADFLOW_LEADS_ENDPOINT = previousEndpoint;
  if (previousSecret === undefined) delete process.env.HAMADFLOW_LEAD_SECRET; else process.env.HAMADFLOW_LEAD_SECRET = previousSecret;
}
