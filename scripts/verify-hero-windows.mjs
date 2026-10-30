import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.QA_URL || "http://127.0.0.1:3010";
const production = process.env.QA_PRODUCTION === "1";
assert.ok(["localhost", "127.0.0.1", ...(production ? ["www.vitorhamad.me"] : [])].includes(new URL(base).hostname));
const folder = `artifacts/hero-windows${production ? "-production" : ""}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const results = [];
const ids = ["mordida", "fatia12", "corte14"];
const contexts = [];

async function setup(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference", ...options });
  contexts.push(context);
  await context.route("**/api/analytics", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  await context.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }));
  await context.route("**/api/contact", () => { throw new Error("This suite never submits leads."); });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.heroEvents = [];
    for (const type of ["pointerdown","mousedown","pointerup","mouseup","click","focusin"]) document.addEventListener(type, (event) => window.heroEvents.push({ type, project: event.target.closest?.(".floating-window")?.dataset.project, scroll: scrollY, x: event.clientX, y: event.clientY }), true);
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push({ message: message.text(), location: message.location() }); });
  const response = await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll(".floating-window img")].map((img) => img.decode()));
    await Promise.all(document.querySelector("#home").getAnimations({ subtree: true }).filter((animation) => animation.effect.getComputedTiming().iterations !== Infinity).map((animation) => animation.finished.catch(() => {})));
    window.heroImageNodes = [...document.querySelectorAll(".floating-window img")];
  });
  return page;
}

const button = (page, id) => page.locator(`[data-project="${id}"] .window-select`);
async function point(page, id) {
  return button(page, id).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    // Find an exposed patch, including on secondary windows: never force a covered click.
    for (const radius of [28, 20, 16, 0]) {
      for (let y = Math.max(90, rect.top + 18); y < Math.min(innerHeight - 18, rect.bottom - 18); y += 10) {
        for (let x = Math.max(18, rect.left + 18); x < Math.min(innerWidth - 18, rect.right - 18); x += 10) {
          if ([[0,0],[-radius,-radius],[radius,-radius],[-radius,radius],[radius,radius]].every(([dx,dy]) => element.contains(document.elementFromPoint(x + dx, y + dy)))) return { x, y, radius };
        }
      }
    }
    return null;
  });
}
async function selected(page, id) {
  if (await button(page, id).getAttribute("aria-pressed") !== "true") {
    console.log(JSON.stringify(await page.evaluate(() => window.heroEvents.slice(-14))));
    await page.screenshot({ path: `${folder}/selection-failure.png` });
  }
  assert.equal(await button(page, id).getAttribute("aria-pressed"), "true", `Selected ${id} at ${(await page.viewportSize()).width}px; active=${await page.locator('[data-slot="primary"]').getAttribute('data-project')}`);
  assert.equal(await page.locator('.window-select[aria-pressed="true"]').count(), 1);
  assert.equal(await page.locator('.floating-window[data-slot="primary"]').getAttribute("data-project"), id);
  assert.equal(await page.locator('.floating-window[data-slot="primary"]').evaluate((el) => getComputedStyle(el).zIndex), "3");
  assert.equal(await page.evaluate(() => window.heroImageNodes.every((node, index) => node === document.querySelectorAll(".floating-window img")[index] && node.complete && node.naturalWidth > 0)), true, "Images stay mounted and loaded");
}
async function choose(page, id, touch = false, settle = 750) {
  let exposed = await point(page, id);
  assert.ok(exposed, `${id} has an exposed click target`);
  const previous = page.url();
  if (touch) await page.touchscreen.tap(exposed.x, exposed.y);
  else {
    // Let the existing pointer parallax settle before pressing a moving target.
    let hit = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      exposed = await point(page, id);
      assert.ok(exposed, `${id} stays exposed while the pointer moves`);
      await page.mouse.move(exposed.x, exposed.y); await page.waitForTimeout(400);
      hit = await page.evaluate(({ x, y, id }) => document.elementFromPoint(x,y)?.closest("button.window-select")?.closest(".floating-window")?.getAttribute("data-project") === id, { ...exposed, id });
      if (hit) break;
    }
    assert.ok(hit, `${id} has a stable pointer target`);
    await page.mouse.down(); await page.mouse.up(); await page.mouse.move(20, 90);
  }
  await page.waitForTimeout(settle);
  await selected(page, id);
  assert.equal(page.url(), previous, "Selecting never navigates");
}
async function top(page) { await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" })); await page.mouse.move(20,90); await page.waitForTimeout(300); }

try {
  const page = await setup();
  await selected(page, "mordida");
  assert.equal(await page.locator(".scene-coordinate").count(), 0);
  assert.doesNotMatch(await page.locator("#home").innerText(), /DESIGN × CODE × INTERACTION/);
  await page.screenshot({ path: `${folder}/initial-desktop.png` });
  // The intermediate size proves this is a spatial transition rather than an instant layer swap.
  const initialWidth = (await button(page, "fatia12").boundingBox()).width;
  await choose(page, "fatia12", false, 100);
  const during = (await button(page, "fatia12").boundingBox()).width;
  await page.screenshot({ path: `${folder}/switch-in-progress.png` });
  await page.waitForTimeout(700);
  const finalWidth = (await button(page, "fatia12").boundingBox()).width;
  assert.ok(finalWidth > initialWidth * 1.15, "Selected window grows to the primary size");
  assert.ok(during < finalWidth - 1, "The switch is animated");
  await page.screenshot({ path: `${folder}/selected-fatia12-desktop.png` });
  for (const id of ["corte14", "mordida", "fatia12", "corte14", "mordida"]) await choose(page, id);
  results.push("repeatable mouse selection, size/depth transition, front stacking and stable image nodes");

  for (const [id, key] of [["fatia12","Enter"],["corte14","Space"],["mordida","Enter"]]) {
    await button(page, id).focus();
    await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
    assert.equal(await button(page, id).evaluate((el) => el.matches(":focus-visible") && getComputedStyle(el).outlineStyle !== "none"), true);
    await page.keyboard.press(key); await page.waitForTimeout(750); await selected(page, id);
  }
  for (const id of [...ids, ...ids, ...ids]) {
    await button(page, id).focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(35);
  }
  await page.waitForTimeout(750); await selected(page, "corte14");
  results.push("Enter, Space, visible focus and nine rapid interrupted selections");

  for (const id of ids) {
    await top(page); await choose(page, id);
    const before = (await button(page, id).boundingBox()).width;
    const scene = await page.locator(".floating-project-windows").boundingBox();
    await page.mouse.move(scene.x + scene.width * .8, scene.y + scene.height * .8); await page.waitForTimeout(600);
    assert.match(await page.locator(".windows-parallax").getAttribute("style"), /rotate[XY]\(/);
    await page.mouse.move(20,90); await page.waitForTimeout(750);
    await page.evaluate(() => scrollTo({ top: 380, behavior: "instant" })); await page.waitForTimeout(300);
    assert.ok((await button(page, id).boundingBox()).width > before * 1.2, `Scroll enlarges the selected ${id}`);
    for (const other of ids.filter((other) => other !== id)) {
      assert.ok(Number(await button(page, other).locator("xpath=ancestor::div[contains(@class,'window-scroll')]").evaluate((el) => getComputedStyle(el).opacity)) < .6, "Secondary windows recede");
      assert.ok(await point(page, other), "Secondary windows retain an exposed target during scroll");
    }
  }
  // Change the selection while the scroll scene is already advanced.
  await button(page, "fatia12").focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(750); await selected(page, "fatia12");
  assert.match(await page.locator('[data-project="fatia12"] .window-scroll').getAttribute("style"), /scale\(1\.[2-9]/);
  results.push("mouse parallax and scroll follow each selected window, including a selection during scroll");

  for (const width of production ? [390,1440] : [320,360,375,390,430,768,1024,1440,1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 }); await top(page); await page.waitForTimeout(450);
    console.log(`Checking selection at ${width}px`);
    for (const id of ids) { await choose(page, id); for (const other of ids) assert.ok(await point(page, other), `${other} remains selectable at ${width}`); }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `No horizontal overflow at ${width}`);
    if (width < 1024) assert.ok((await page.locator(".studio-hero-actions").boundingBox()).y + (await page.locator(".studio-hero-actions").boundingBox()).height < (await page.locator(".floating-project-windows").boundingBox()).y, "Windows do not overlap the mobile CTA");
    if ([390,1440].includes(width)) await page.screenshot({ path: `${folder}/selected-corte14-${width}.png` });
    results.push(`all three windows remain selectable at ${width}px`);
  }
  const touch = await setup({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  for (const id of ["fatia12","corte14","mordida"]) { const target = await point(touch, id); assert.ok(target.radius >= 16, `${id} exposes a touch-sized patch`); await choose(touch, id, true); }
  await touch.screenshot({ path: `${folder}/touch-mobile.png` });
  results.push("real touchscreen tap on all three exposed windows");

  const reduced = await setup({ reducedMotion: "reduce" });
  for (const id of ["fatia12","corte14","mordida"]) await choose(reduced, id, false, 80);
  assert.equal(await reduced.locator(".windows-parallax").evaluate((el) => getComputedStyle(el).transform), "none");
  assert.equal(await reduced.locator(".window-depth").evaluateAll((els) => els.every((el) => !/rotate[XY]?\([^0]/.test(el.style.transform))), true);
  results.push("selection remains usable with reduced motion");
  assert.deepEqual(errors, [], "No hydration, console or runtime errors");
  await writeFile(`${folder}/verification.json`, JSON.stringify({ status: "passed", base, checkedAt: new Date().toISOString(), results, errors, realLeadsSent: 0 }, null, 2));
  console.log(`PASS: ${results.length} hero interaction checks; no console or hydration errors.`);
} finally { for (const context of contexts) await context.close(); await browser.close(); }
