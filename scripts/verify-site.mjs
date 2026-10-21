import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.QA_URL || "http://127.0.0.1:3000";
assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "QA is restricted to a local server.");
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "msedge", headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
// This suite never submits leads or analytics to the real operation.
await context.route("**/api/analytics", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
const page = await context.newPage();
const failures = [];
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => { if (response.url().includes("/_next/image") && response.status() >= 400) failures.push(`Image ${response.status()}: ${response.url()}`); });
const results = [];
const widths = [320,360,390,768,1024,1440];
const routes = ["/", "/cases/centro-da-juventude", "/cases/hamadflow", "/curriculo", "/privacidade", "/pagina-inexistente-qa"];
async function loadImages() {
  await page.evaluate(async () => {
    for (const img of document.images) { img.loading = "eager"; }
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    await document.fonts.ready;
  });
}
try {
  for (const path of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), path.includes("inexistente") ? 404 : 200, `Route ${path}`);
    await loadImages();
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const state = await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
        return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll("h1").length, duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), missingImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src) };
      });
      assert.ok(state.scrollWidth <= width + 1, `Overflow at ${width}: ${path} (${state.scrollWidth})`);
      assert.equal(state.h1, 1, `One H1: ${path}`);
      assert.deepEqual(state.duplicateIds, [], `Unique IDs: ${path}`);
      assert.deepEqual(state.missingImages, [], `Image loading: ${path}`);
      results.push({ path, ...state });
      if ((path === "/" || path.startsWith("/cases/")) && [390,1440].includes(width)) {
        const slug = path === "/" ? "home" : path.split("/").at(-1);
        await page.screenshot({ path: `artifacts/${slug}-${width}.png`, fullPage: true });
        if (path === "/") await page.screenshot({ path: `artifacts/hero-${width}.png` });
      }
    }
    console.log(`PASS: ${path} at all six widths, assets, heading and IDs.`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navegação móvel" });
  assert.equal(await menu.isVisible(), true);
  for (let i = 0; i < 9; i++) { await page.keyboard.press("Tab"); assert.equal(await page.evaluate(() => Boolean(document.querySelector("#mobile-navigation")?.contains(document.activeElement))), true, "Modal traps focus"); }
  await page.keyboard.press("Escape");
  assert.equal(await menu.isVisible(), false);
  assert.equal(await trigger.evaluate((element) => element === document.activeElement), true);
  await trigger.click();
  await menu.getByRole("link", { name: "Serviços" }).click();
  await page.waitForURL("**/#solucoes");
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(await menu.isVisible(), false);
  const serviceTop = await page.locator("#solucoes").evaluate((element) => element.getBoundingClientRect().top);
  assert.ok(serviceTop >= -5 && serviceTop < 80, `Service anchor remains visible: ${serviceTop}`);
  const anchors = await page.evaluate(() => ["home","solucoes","cases","case-principal","processo","sobre","faq","contato"].every((id) => document.getElementById(id)));
  assert.equal(anchors, true);
  await page.getByText("Como funciona o orçamento?", { exact: true }).click();
  assert.equal(await page.locator(".faq-list details").first().getAttribute("open"), "");
  console.log("PASS: mobile menu, focus trap, Escape, anchor navigation and FAQ.");

  const submit = page.getByRole("button", { name: "Enviar meu projeto" });
  await submit.click();
  assert.ok(await page.locator(".form-error").count() >= 4);
  assert.equal(await page.locator("#lead-name").evaluate((element) => element === document.activeElement), true);
  await page.locator("#lead-name").fill("Teste local");
  await page.locator("#lead-contact").fill("123");
  await submit.click();
  assert.match(await page.locator("#lead-contact-error").innerText(), /WhatsApp válido/);
  await page.locator("#lead-contact").fill("qa@example.test");
  await page.locator("#lead-project-type").selectOption("Landing Page");
  await page.locator("#lead-message").fill("Solicitação fictícia para validar o formulário localmente.");
  await page.locator('[name="consent"]').check();
  let mode = "failure";
  let count = 0;
  let release;
  let requestBody;
  await context.route("**/api/contact", async (route) => {
    count++;
    requestBody = route.request().postDataJSON();
    if (mode === "network") return route.abort("failed");
    if (mode === "pending") await new Promise((resolve) => { release = resolve; });
    await route.fulfill({ status: mode === "failure" ? 502 : 200, contentType: "application/json", body: JSON.stringify({ success: mode !== "failure", message: mode === "failure" ? "Falha simulada. Tente novamente." : "Pedido enviado! Teste local concluído." }) });
  });
  await submit.click();
  await page.getByRole("status").filter({ hasText: "Falha simulada" }).waitFor();
  assert.equal(await page.locator("#lead-name").inputValue(), "Teste local");
  mode = "network";
  await submit.click();
  await page.getByRole("status").filter({ hasText: "Não consegui enviar" }).waitFor();
  assert.equal(await page.locator("#lead-contact").inputValue(), "qa@example.test");
  mode = "pending";
  const beforePending = count;
  await submit.click();
  await page.getByRole("button", { name: "Enviando..." }).waitFor();
  assert.equal(await page.getByRole("button", { name: "Enviando..." }).isDisabled(), true);
  await page.locator(".contact-form").evaluate((form) => { form.requestSubmit(); form.requestSubmit(); });
  await page.waitForFunction(() => document.querySelector(".contact-form").getAttribute("aria-busy") === "true");
  assert.equal(count - beforePending, 1, "Only one request while sending");
  assert.equal(requestBody.projectType, "Landing Page");
  assert.equal(requestBody.email, "qa@example.test");
  assert.equal(requestBody.consent, true);
  assert.ok(requestBody.submissionId);
  assert.ok("website" in requestBody && "startedAt" in requestBody);
  release();
  await page.getByRole("status").filter({ hasText: "Pedido enviado!" }).waitFor();
  assert.equal(await page.locator("#lead-name").inputValue(), "");
  assert.equal(await page.locator("#lead-message").inputValue(), "");
  console.log("PASS: empty, invalid, failure, network, loading, duplicate prevention and successful form states, using mocked responses.");

  for (const path of ["/cases/centro-da-juventude","/cases/hamadflow"]) {
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    const gallery = page.getByRole("region", { name: "Galeria de telas do projeto" });
    const caption = gallery.locator(".gallery-caption h3");
    const before = await caption.innerText();
    await gallery.getByRole("button", { name: "Próxima tela", exact: true }).first().click();
    assert.notEqual(await caption.innerText(), before);
    await gallery.focus(); await page.keyboard.press("ArrowLeft");
    assert.equal(await caption.innerText(), before);
    const zoom = gallery.getByRole("button", { name: "Ampliar tela", exact: true });
    await zoom.click();
    const dialog = page.getByRole("dialog", { name: /Tela ampliada/ });
    assert.equal(await dialog.isVisible(), true);
    await page.keyboard.press("ArrowRight");
    assert.notEqual(await caption.innerText(), before);
    await page.keyboard.press("Escape");
    assert.equal(await dialog.isVisible(), false);
    assert.equal(await zoom.evaluate((element) => element === document.activeElement), true);
  }
  console.log("PASS: both galleries, keyboard navigation, image enlargement, Escape and focus return.");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), true, "200% zoom has no horizontal overflow");
  await page.evaluate(() => { document.documentElement.style.zoom = "1"; });
  const pdf = await context.request.get(`${base}/VitorHamad_Curriculo.pdf`);
  assert.equal(pdf.status(), 200);
  assert.match(pdf.headers()["content-type"], /pdf/);
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.match(await sitemap.text(), /https:\/\/www.vitorhamad.me\/cases\/hamadflow/);
  const robots = await context.request.get(`${base}/robots.txt`);
  assert.match(await robots.text(), /Disallow: \/api\//);
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await loadImages();
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
  assert.deepEqual(failures, [], "No failed optimized images");
  await writeFile("artifacts/verification.json", JSON.stringify({ checkedAt: new Date().toISOString(), base, results, browserErrors: errors, failedImages: failures, form: "mocked; no production leads", motion: "reduce", zoom: "200%", status: "passed" }, null, 2));
  console.log("PASS: 200% zoom, reduced motion, PDF, sitemap, robots and browser errors. Report saved to artifacts/verification.json.");
} finally { await browser.close(); }
