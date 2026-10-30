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
const widths = [320,360,375,390,430,768,1024,1440,1920];
const routes = ["/", "/cases/fatia12", "/cases/mordida", "/cases/corte14", "/cases/centro-da-juventude", "/cases/hamadflow", "/curriculo", "/privacidade", "/pagina-inexistente-qa"];
const notFoundRoutes = new Set(["/cases/hamadflow", "/pagina-inexistente-qa"]);
async function loadImages() {
  await page.evaluate(async () => {
    for (const img of document.images) { img.loading = "eager"; }
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
    await document.fonts.ready;
  });
}
async function assertDemo(url) {
  const link = page.locator('a[href="' + url + '"]').first();
  assert.equal(await link.getAttribute("target"), "_blank");
  assert.match(await link.getAttribute("rel"), /noopener/);
  assert.match(await link.getAttribute("rel"), /noreferrer/);
  await link.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  assert.equal(await link.evaluate((element) => element === document.activeElement && element.matches(":focus-visible") && getComputedStyle(element).outlineStyle !== "none"), true);
}
try {
  for (const path of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), notFoundRoutes.has(path) ? 404 : 200, `Route ${path}`);
    assert.doesNotMatch(await page.locator("main").innerText(), /hamadflow/i, `Removed demo is absent from ${path}`);
    assert.equal(await page.locator('a[href*="hamadflow"]').count(), 0, `No links to the removed demo on ${path}`);
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
      if ((path === "/" || (path.startsWith("/cases/") && !notFoundRoutes.has(path))) && [390,1440].includes(width)) {
        const slug = path === "/" ? "home" : path.split("/").at(-1);
        await page.screenshot({ path: `artifacts/${slug}-${width}.png`, fullPage: true });
        if (path === "/") {
          await page.screenshot({ path: `artifacts/hero-${width}.png` });
          await page.locator(".corte14-project").screenshot({ path: `artifacts/corte14-card-${width}.png` });
          await page.locator(".mordida-project").screenshot({ path: `artifacts/mordida-card-${width}.png` });
          await page.locator(".fatia12-project").screenshot({ path: `artifacts/fatia12-card-${width}.png` });
        }
      }
    }
    console.log(`PASS: ${path} at all ${widths.length} widths, assets, heading and IDs.`);
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
  assert.ok(serviceTop >= 70 && serviceTop <= 110, `Service anchor remains visible below the sticky header: ${serviceTop}`);
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

  for (const path of ["/cases/centro-da-juventude","/cases/corte14","/cases/mordida","/cases/fatia12"]) {
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
  console.log("PASS: all four galleries, keyboard navigation, image enlargement, Escape and focus return.");
  await page.goto(`${base}/#cases`, { waitUntil: "networkidle" });
  assert.deepEqual(await page.locator("#cases article h3").allTextContents(), ["CORTE 14Barber Club.", "FATIA 12Pizza Studio.", "MORDIDA!Smash House."]);
  assert.equal(await page.locator("#case-principal article h3").innerText(), "Centro da Juventude de Almirante Tamandaré");
  assert.equal(await page.locator(".corte14-project").count(), 1);
  assert.match(await page.locator(".corte14-project").innerText(), /Projeto conceitual/i);
  await page.locator(".corte14-project").getByRole("link", { name: "Explorar projeto", exact: true }).click();
  await page.waitForURL("**/cases/corte14");
  await assertDemo("https://corte14-barber-club.vercel.app/");
  assert.match(await page.title(), /Corte 14/);
  assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/cases\/corte14$/);
  const corteGallery = page.getByRole("region", { name: "Galeria de telas do projeto" });
  await corteGallery.getByRole("button", { name: "Selecionar Corte 14 — página inicial no celular", exact: true }).click();
  const mobileImage = corteGallery.locator(".gallery-image-button img");
  assert.equal(await mobileImage.getAttribute("width"), "360");
  assert.equal(await mobileImage.getAttribute("height"), "812");
  await page.getByRole("link", { name: "Quero um site para minha empresa", exact: true }).click();
  await page.waitForURL("**/#contato");
  assert.ok(await page.locator("#contato").isVisible());
  console.log("PASS: Corte 14 featured card, conceptual label, external demo link, case navigation, metadata, mobile gallery dimensions and existing contact flow.");
  await page.goto(`${base}/#cases`, { waitUntil: "networkidle" });
  const mordidaCard = page.locator(".mordida-project");
  assert.match(await mordidaCard.innerText(), /Projeto conceitual/i);
  assert.match(await mordidaCard.innerText(), /funcionalidades comerciais interativas/);
  await mordidaCard.getByRole("link", { name: "Explorar projeto", exact: true }).click();
  await page.waitForURL("**/cases/mordida");
  await assertDemo("https://mordida-smash-house.vercel.app/");
  assert.match(await page.title(), /MORDIDA!/);
  assert.match(await page.locator('meta[name="description"]').getAttribute("content"), /conceitual/);
  assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/cases\/mordida$/);
  assert.match(await page.locator("main").innerText(), /nenhum pedido real é realizado/i);
  const mordidaGallery = page.getByRole("region", { name: "Galeria de telas do projeto" });
  const slideSources = await mordidaGallery.locator(".gallery-thumbnails img").evaluateAll((images) => images.map((img) => img.getAttribute("src")));
  assert.equal(new Set(slideSources).size, 4, "Four distinct Mordida screenshots");
  await mordidaGallery.getByRole("button", { name: "Selecionar MORDIDA! — página inicial no celular", exact: true }).click();
  const mordidaMobileImage = mordidaGallery.locator(".gallery-image-button img");
  assert.equal(await mordidaMobileImage.getAttribute("width"), "390");
  assert.equal(await mordidaMobileImage.getAttribute("height"), "844");
  await mordidaGallery.getByRole("button", { name: "Selecionar Carrinho demonstrativo do MORDIDA!", exact: true }).click();
  assert.match(await mordidaGallery.locator(".gallery-caption").innerText(), /bacon extra e sem picles/i);
  await page.getByRole("link", { name: "Vamos criar seu site", exact: true }).click();
  await page.waitForURL("**/#contato");
  assert.ok(await page.locator("#contato").isVisible());
  console.log("PASS: MORDIDA! order, existing projects, conceptual label, interactive features, external link, keyboard focus, metadata, four real screenshots, mobile dimensions and commercial CTA.");
  await page.goto(`${base}/#cases`, { waitUntil: "networkidle" });
  const fatiaCard = page.locator(".fatia12-project");
  assert.equal(await fatiaCard.count(), 1);
  assert.match(await fatiaCard.innerText(), /Projeto conceitual/i);
  assert.match(await fatiaCard.innerText(), /escolha de sabores/);
  assert.match(await fatiaCard.innerText(), /experiência visual interativa/);
  assert.equal(await page.locator("canvas, iframe").count(), 0, "The portfolio does not load the demo's 3D scene");
  await fatiaCard.getByRole("link", { name: "Explorar projeto", exact: true }).click();
  await page.waitForURL("**/cases/fatia12");
  await assertDemo("https://fatia12-pizza-studio.vercel.app/");
  assert.equal(await page.title(), "FATIA 12 — Pizza Studio | Viham Dev");
  assert.match(await page.locator('meta[name="description"]').getAttribute("content"), /seleção interativa de 12 sabores/);
  assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/cases\/fatia12$/);
  assert.match(await page.locator("main").innerText(), /Nenhum pedido real é enviado/);
  assert.match(await page.locator("main").innerText(), /cada item do carrinho é uma pizza inteira de um único sabor/);
  assert.equal(await page.locator("canvas, iframe").count(), 0, "The case uses screenshots instead of loading WebGL");
  const fatiaGallery = page.getByRole("region", { name: "Galeria de telas do projeto" });
  const fatiaSources = await fatiaGallery.locator(".gallery-thumbnails img").evaluateAll((images) => images.map((img) => img.getAttribute("src")));
  assert.equal(new Set(fatiaSources).size, 4, "Four distinct real Fatia 12 captures");
  await fatiaGallery.getByRole("button", { name: "Selecionar FATIA 12 — hero no celular", exact: true }).click();
  assert.equal(await fatiaGallery.locator(".gallery-image-button img").getAttribute("width"), "390");
  assert.equal(await fatiaGallery.locator(".gallery-image-button img").getAttribute("height"), "844");
  await fatiaGallery.getByRole("button", { name: "Selecionar Pepperoni — sabor selecionado", exact: true }).click();
  assert.match(await fatiaGallery.locator(".gallery-caption").innerText(), /cobertura de Pepperoni/);
  await fatiaGallery.getByRole("button", { name: "Selecionar Carrinho demonstrativo do FATIA 12", exact: true }).click();
  assert.match(await fatiaGallery.locator(".gallery-caption").innerText(), /borda recheada/);
  await page.getByRole("link", { name: "Solicitar um projeto", exact: true }).click();
  await page.waitForURL("**/#contato");
  assert.ok(await page.locator("#lead-name").isVisible());
  console.log("PASS: FATIA 12 featured card, safe external link, keyboard focus, metadata, four real captures, mobile gallery, no embedded WebGL and existing contact CTA.");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  // Browser zoom halves the CSS viewport and doubles DPR. CSS `zoom` does not
  // update media queries, so it incorrectly keeps the desktop navbar at 720px.
  const zoomContext = await browser.newContext({ viewport: { width: 720, height: 500 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  await zoomContext.route("**/api/analytics", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  const zoomPage = await zoomContext.newPage();
  try {
    await zoomPage.goto(base, { waitUntil: "networkidle" });
    const zoomState = await zoomPage.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    assert.ok(zoomState.scrollWidth <= zoomState.clientWidth + 1, `200% browser-zoom equivalent has no horizontal overflow: ${JSON.stringify(zoomState)}`);
    assert.equal(await zoomPage.getByRole("button", { name: "Abrir menu de navegação" }).isVisible(), true, "Zoom reflows navigation for the smaller CSS viewport");
    await zoomPage.screenshot({ path: "artifacts/zoom-200-equivalent.png" });
  } finally { await zoomContext.close(); }
  const pdf = await context.request.get(`${base}/VitorHamad_Curriculo.pdf`);
  assert.equal(pdf.status(), 200);
  assert.match(pdf.headers()["content-type"], /pdf/);
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.doesNotMatch(await sitemap.text(), /hamadflow/i);
  assert.match(await sitemap.text(), /https:\/\/www.vitorhamad.me\/cases\/corte14/);
  assert.match(await sitemap.text(), /https:\/\/www.vitorhamad.me\/cases\/mordida/);
  assert.match(await sitemap.text(), /https:\/\/www.vitorhamad.me\/cases\/fatia12/);
  for (const path of ["/images/cases/hamadflow/hamadflow-demo-cover.svg", "/images/cases/hamadflow/screenshots/dashboard.png"]) {
    assert.equal((await context.request.get(`${base}${path}`)).status(), 404, `Removed demo asset is unavailable: ${path}`);
  }
  const robots = await context.request.get(`${base}/robots.txt`);
  assert.match(await robots.text(), /Disallow: \/api\//);
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await loadImages();
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
  assert.deepEqual(failures, [], "No failed optimized images");
  await writeFile("artifacts/verification.json", JSON.stringify({ checkedAt: new Date().toISOString(), base, results, browserErrors: errors, failedImages: failures, form: "mocked; no production leads", motion: "reduce", zoom: "200% equivalent: 720 CSS pixels at DPR 2", status: "passed" }, null, 2));
  console.log("PASS: 200% browser-zoom equivalent layout, reduced motion, PDF, sitemap, robots and browser errors. Report saved to artifacts/verification.json.");
} finally { await browser.close(); }
