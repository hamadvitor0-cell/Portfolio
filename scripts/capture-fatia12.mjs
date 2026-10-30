import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const sharp = require("sharp");
const url = "https://fatia12-pizza-studio.vercel.app/";
const output = "public/projects/fatia12";
await mkdir(output, { recursive: true });
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "msedge", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const captures = [];

async function ready() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images]
      .filter((img) => img.getBoundingClientRect().top < innerHeight && img.getBoundingClientRect().bottom > 0)
      .map((img) => img.decode()));
  });
}

async function sceneReady() {
  await page.locator(".canvas-shell canvas").waitFor({ state: "visible", timeout: 20000 });
  await page.locator(".scene-loader").waitFor({ state: "hidden", timeout: 20000 });
  assert.equal(await page.locator(".fallback-pizza").count(), 0, "The capture must show the real WebGL scene");
  await ready();
  // Wait for the actual GSAP entrance and the first fully textured WebGL frames.
  await page.waitForTimeout(1600);
}

async function capture(name) {
  await ready();
  const result = await sharp(await page.screenshot()).webp({ quality: 85, effort: 6 }).toFile(`${output}/${name}.webp`);
  captures.push({ name, width: result.width, height: result.height, bytes: result.size, source: page.url(), phase: await page.locator(".hero").getAttribute("data-phase"), webgl: await page.locator(".canvas-shell canvas").count() === 1 });
  console.log(`Captured ${name}: ${result.width}x${result.height}, ${result.size} bytes`);
}

try {
  assert.equal((await page.goto(url, { waitUntil: "networkidle" })).status(), 200);
  await sceneReady();
  assert.equal(await page.getByRole("region", { name: "Seletor acessível dos 12 sabores" }).getByRole("button").count(), 12);
  await capture("cover");

  // This point is inside the pizza surface in the verified 1440x1000 hero.
  await page.mouse.click(820, 600);
  await page.locator('.hero[data-phase="selected"]').waitFor();
  await page.getByRole("button", { name: "Escolher outro sabor", exact: true }).click();
  await page.locator('.hero[data-phase="overview"]').waitFor();
  await page.getByRole("button", { name: /03 Pepperoni/ }).click();
  await page.locator('.hero[data-phase="selected"][data-flavor="pepperoni"]').waitFor();
  await page.keyboard.press("Control+Home");
  await page.waitForTimeout(400);
  assert.match(await page.locator(".flavor-information").innerText(), /Muçarela/);
  assert.match(await page.locator(".price-row").innerText(), /69,90/);
  await capture("pizza-selected");

  await page.getByRole("checkbox", { name: /Um extra de carinho/ }).check();
  assert.match(await page.locator(".price-row").innerText(), /78,90/);
  await page.getByRole("button", { name: "Adicionar ao carrinho", exact: true }).click();
  await page.locator('.hero[data-phase="boxing"]').waitFor();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "artifacts/fatia12-boxing.png" });
  await page.locator('.hero[data-phase="addedToCart"]').waitFor({ timeout: 10000 });
  await page.getByRole("button", { name: /Abrir carrinho, 1/ }).click();
  const cart = page.getByRole("dialog");
  assert.match(await cart.innerText(), /Pepperoni/);
  assert.match(await cart.innerText(), /78,90/);
  await cart.evaluate(async (element) => {
    await Promise.all(element.getAnimations({ subtree: true })
      .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
      .map((animation) => animation.finished.catch(() => {})));
  });
  await capture("cart");
  await page.getByRole("button", { name: "Continuar meu pedido", exact: true }).click();
  assert.ok(await page.getByLabel("Seu nome", { exact: true }).isVisible());
  assert.ok(await page.getByRole("button", { name: /Copiar resumo/i }).isVisible());
  assert.match(await cart.innerText(), /demonstrativ/i);
  // Inspect the demonstrative checkout without submitting personal details or an order.
  await page.getByRole("button", { name: "Fechar carrinho", exact: true }).click();
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Abrir carrinho, 1/ }).waitFor();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobile = await mobileContext.newPage();
  await mobile.goto(url, { waitUntil: "networkidle" });
  await mobile.locator(".canvas-shell canvas").waitFor({ state: "visible", timeout: 20000 });
  await mobile.locator(".scene-loader").waitFor({ state: "hidden", timeout: 20000 });
  assert.equal(await mobile.locator(".fallback-pizza").count(), 0);
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.waitForTimeout(1600);
  assert.ok(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const result = await sharp(await mobile.screenshot()).webp({ quality: 85, effort: 6 }).toFile(`${output}/hero-mobile.webp`);
  captures.push({ name: "hero-mobile", width: result.width, height: result.height, bytes: result.size, source: mobile.url(), phase: "overview", webgl: true });
  console.log(`Captured hero-mobile: ${result.width}x${result.height}, ${result.size} bytes`);
  await mobileContext.close();

  await writeFile("artifacts/fatia12-captures.json", JSON.stringify({ capturedAt: new Date().toISOString(), captures, verified: ["WebGL scene", "raycast selection on the pizza surface", "12 flavor controls", "full-pizza flavor transformation", "dynamic ingredients and prices", "3D packaging animation", "crust addition and cart total", "persistent cart", "demonstrative checkout", "mobile WebGL hero"], submittedOrders: 0 }, null, 2));
} finally {
  await browser.close();
}
