import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.QA_URL || "http://127.0.0.1:3010";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname), "Use a local production build.");
await mkdir("artifacts/studio", { recursive: true });
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "msedge", headless: true });
const errors = [];
const results = [];
const contexts = [];

async function createContext(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference", ...options });
  contexts.push(context);
  await context.route("**/api/analytics", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  // Vercel injects this script only on its hosting; keep local QA isolated.
  await context.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
  await context.route("**/api/contact", () => { throw new Error("This visual suite must never submit a lead."); });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push({ message: message.text(), location: message.location() }); });
  await page.addInitScript(() => {
    window.studioVitals = { lcp: null, cls: 0 };
    new PerformanceObserver((list) => { window.studioVitals.lcp = list.getEntries().at(-1).startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.studioVitals.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1750); // Wait only for the finite entrance, never an endless idle condition.
  return { context, page };
}

async function top(page) { await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" })); await page.waitForTimeout(300); }
async function sectionShot(page, selector, name) {
  const locator = page.locator(selector);
  await locator.scrollIntoViewIfNeeded();
  await page.evaluate(async () => { await Promise.all([...document.images].filter((img) => img.getBoundingClientRect().top < innerHeight).map((img) => img.decode().catch(() => {}))); });
  await page.waitForTimeout(250);
  await locator.screenshot({ path: `artifacts/studio/${name}.png`, style: ".site-header,.reading-progress { visibility: hidden !important; }" });
}

try {
  const { page, context } = await createContext();
  assert.equal(await page.getByRole("heading", { level: 1, name: "Sites que não passam despercebidos." }).count(), 1);
  assert.equal(await page.locator(".floating-window img").count(), 3);
  assert.equal(await page.locator("canvas,iframe,video").count(), 0);
  const initial = await page.evaluate(() => ({ ...window.studioVitals, bytes: performance.getEntriesByType("resource").reduce((sum, entry) => sum + entry.encodedBodySize, 0), heroImages: [...document.querySelectorAll(".floating-window img")].map((img) => ({ loaded: img.complete && img.naturalWidth > 0, width: img.width, height: img.height })) }));
  assert.ok(initial.heroImages.every((image) => image.loaded));
  await page.screenshot({ path: "artifacts/studio/hero-desktop.png" });
  const scene = page.locator(".floating-project-windows");
  const box = await scene.boundingBox();
  const parallax = page.locator(".windows-parallax");
  await page.mouse.move(box.x + box.width * .85, box.y + box.height * .85);
  await page.waitForTimeout(750);
  const moved = await parallax.getAttribute("style");
  assert.match(moved, /rotate[XY]\(/, "Pointer changes the scene's 3D rotation");
  for (const angle of moved.matchAll(/rotate[XY]\((-?[\d.]+)deg\)/g)) assert.ok(Math.abs(Number(angle[1])) <= 6, "Restrained parallax angle");
  await page.mouse.move(25, 90);
  await page.waitForTimeout(1000);
  const reset = await parallax.getAttribute("style");
  assert.notEqual(moved, reset, "Pointer leave returns the scene toward its rest position");
  const front = page.locator('.floating-window[data-slot="primary"] .window-select');
  const frontBefore = (await front.boundingBox()).width;
  await page.evaluate(() => scrollTo({ top: 380, behavior: "instant" }));
  await page.waitForTimeout(400);
  assert.ok((await front.boundingBox()).width > frontBefore * 1.2, "Mordida grows into the hero/showroom transition");
  assert.ok(Number(await page.locator(".studio-title-wrap").evaluate((el) => getComputedStyle(el).opacity)) < .6, "Headline recedes during the transition");
  await page.screenshot({ path: "artifacts/studio/hero-transition.png" });
  results.push({ check: "desktop pointer parallax, reset, scroll depth and hero-to-showroom transition", passed: true });

  const showcase = page.locator(".showcase-preview").nth(1);
  await showcase.scrollIntoViewIfNeeded();
  const previewBox = await showcase.boundingBox();
  await page.mouse.move(previewBox.x + previewBox.width * .5, previewBox.y + Math.min(previewBox.height * .5, 350));
  await page.locator(".project-explore-cursor").waitFor();
  assert.equal(await page.locator(".project-explore-cursor").innerText(), "EXPLORAR");
  await page.mouse.move(10, 90);
  assert.equal(await page.locator(".project-explore-cursor").count(), 0);
  await sectionShot(page, "#showcase-mordida", "showroom-mordida-desktop");
  await sectionShot(page, "#showcase-fatia12", "showroom-fatia12-desktop");
  await sectionShot(page, "#showcase-corte14", "showroom-corte14-desktop");
  await sectionShot(page, "#case-principal", "real-project-desktop");
  for (const [selector, name] of [["#solucoes","services-desktop"],["#sobre","about-desktop"],["#processo","process-desktop"],["#contato","contact-desktop"]]) await sectionShot(page, selector, name);
  assert.equal(await page.locator(".studio-process-list > li").count(), 4);
  assert.ok(await page.locator('#contato a[href^="https://wa.me/5541991416887"]').count() >= 2);
  await page.locator(".studio-marquee").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Pausar faixa animada" }).click();
  assert.equal(await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationPlayState), "paused");
  await page.getByRole("button", { name: "Retomar faixa animada" }).click();
  await page.mouse.move(10, 90);
  assert.equal(await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationPlayState), "running");
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => getComputedStyle(document.querySelector(".marquee-track")).animationPlayState === "paused");
  assert.equal(await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationPlayState), "paused", "Marquee stops outside the viewport");

  // Regression: resizing after scrolling must clear all desktop motion styles.
  const widths = [320,360,375,390,430,768,1024,1440,1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await top(page);
    const layout = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, titleOpacity: getComputedStyle(document.querySelector(".studio-title-wrap")).opacity, missing: [...document.querySelectorAll(".floating-window img")].filter((img) => !img.complete || !img.naturalWidth).length }));
    assert.ok(layout.documentWidth <= width + 1, `No overflow at ${width}`);
    assert.equal(layout.titleOpacity, "1", `Visible headline after resizing to ${width}`);
    assert.equal(layout.missing, 0);
    if (width < 1024) {
      assert.equal(await page.locator(".project-explore-cursor").count(), 0);
      assert.equal(await page.locator(".windows-parallax").evaluate((el) => getComputedStyle(el).transform), "none");
      assert.deepEqual(await page.locator(".floating-window").evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity)), ["1","1","1"]);
      assert.ok((await page.locator(".studio-hero-actions").boundingBox()).y < 600, "Mobile CTAs are early in the page");
    }
    await page.screenshot({ path: `artifacts/studio/hero-${width}.png` });
    results.push({ check: `normal motion responsive layout ${width}`, passed: true });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [selector, name] of [["#showcase-mordida","showroom-mobile"],["#solucoes","services-mobile"],["#sobre","about-mobile"],["#processo","process-mobile"],["#contato","contact-mobile"]]) await sectionShot(page, selector, name);
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await top(page);
  assert.equal(await page.locator(".studio-title-wrap").evaluate((el) => getComputedStyle(el).opacity), "1");
  assert.equal(await page.locator(".marquee-track").evaluate((el) => getComputedStyle(el).animationName), "none");
  assert.equal(await page.locator(".windows-parallax").evaluate((el) => getComputedStyle(el).transform), "none");
  assert.ok((await page.locator(".studio-hero").boundingBox()).height < 1000, "Reduced motion removes the sticky sequence");
  await page.screenshot({ path: "artifacts/studio/reduced-motion.png" });
  results.push({ check: "live reduced-motion preference disables parallax, sticky sequence and marquee", passed: true });

  const { page: nojs } = await createContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  assert.equal(await nojs.locator("h1").isVisible(), true);
  assert.equal(await nojs.locator(".studio-title-wrap").evaluate((el) => getComputedStyle(el).opacity), "1");
  assert.equal(await nojs.locator('.studio-hero-actions a[href="#cases"]').isVisible(), true);
  assert.equal(await nojs.locator('.mordida-project a[href="/cases/mordida"]').count(), 2);
  await nojs.screenshot({ path: "artifacts/studio/no-javascript.png" });
  results.push({ check: "server-rendered headline, images, CTAs and case links without JavaScript", passed: true });
  assert.deepEqual(errors, [], "No console errors, hydration failures or runtime exceptions");
  await writeFile("artifacts/studio/verification.json", JSON.stringify({ status: "passed", checkedAt: new Date().toISOString(), base, initialLoad: initial, results, errors, leads: "never submitted; /api/contact blocked" }, null, 2));
  console.log(`PASS: studio motion, responsive, accessibility fallbacks and visual QA. ${results.length} checks. No console/hydration errors.`, JSON.stringify(initial));
  await context.close();
} finally {
  for (const context of contexts) await context.close();
  await browser.close();
}
