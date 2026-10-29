import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const sharp = require("sharp");
const url = "https://mordida-smash-house.vercel.app/";
const output = "public/projects/mordida";
await mkdir(output, { recursive: true });
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "msedge", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
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

async function capture(name) {
  await ready();
  const bytes = await page.screenshot({ animations: "disabled" });
  const result = await sharp(bytes).webp({ quality: 85, effort: 6 }).toFile(`${output}/${name}.webp`);
  captures.push({ name, width: result.width, height: result.height, bytes: result.size, source: page.url() });
  console.log(`Captured ${name}: ${result.width}x${result.height}, ${result.size} bytes`);
}

try {
  assert.equal((await page.goto(url, { waitUntil: "networkidle" })).status(), 200);
  await ready();
  // Let the site's own GSAP entrance finish before freezing its public pause control.
  await page.waitForTimeout(1800);
  await page.getByRole("button", { name: "PAUSAR CENA", exact: true }).click();
  await capture("cover");

  await page.getByRole("navigation", { name: "Navegação principal", exact: true })
    .getByRole("link", { name: "CARDÁPIO", exact: true }).click();
  await page.waitForURL("**/#cardapio");
  await page.waitForTimeout(900);
  await capture("menu");
  await page.getByRole("group", { name: "Filtrar cardápio por categoria" })
    .getByRole("button", { name: "Bebidas", exact: true }).click();
  assert.equal(await page.locator("#cardapio article").count(), 1);
  await page.getByRole("group", { name: "Filtrar cardápio por categoria" })
    .getByRole("button", { name: "Todos", exact: true }).click();

  await page.locator("#cardapio").getByRole("button", { name: "Personalizar Mordida Original", exact: true }).click();
  await page.locator("label").filter({ hasText: "Bacon extra" }).click();
  await page.getByLabel("Sem picles", { exact: true }).press("Space");
  assert.equal(await page.getByRole("checkbox", { name: /Bacon extra/ }).isChecked(), true);
  assert.equal(await page.getByRole("checkbox", { name: "Sem picles", exact: true }).isChecked(), true);
  await page.getByRole("button", { name: "ADICIONAR AO CARRINHO", exact: true }).click();
  await page.getByRole("button", { name: "Abrir carrinho, 1 item", exact: true }).click();
  assert.match(await page.getByRole("dialog").innerText(), /Bacon extra/);
  assert.match(await page.getByRole("dialog").innerText(), /34,90/);
  await capture("cart");
  await page.getByRole("button", { name: "CONTINUAR PEDIDO", exact: true }).click();
  assert.ok(await page.getByLabel("Seu nome", { exact: true }).isVisible());
  assert.ok(await page.getByRole("button", { name: "COPIAR RESUMO DO PEDIDO", exact: true }).isVisible());
  assert.match(await page.getByRole("dialog").innerText(), /Nenhum pedido real/);
  // The checkout is inspected without submitting personal details or sending an order.
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(await page.getByRole("button", { name: "Abrir carrinho, 1 item", exact: true }).isVisible());

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: "networkidle" });
  await ready();
  await page.waitForTimeout(1800);
  await page.getByRole("button", { name: "PAUSAR CENA", exact: true }).click();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await capture("mobile");
  await writeFile("artifacts/mordida-captures.json", JSON.stringify({ capturedAt: new Date().toISOString(), captures, verified: ["category filters", "extras and ingredient removal", "cart calculation", "cart persistence", "demonstration checkout", "mobile hero"], submittedOrders: 0 }, null, 2));
} finally {
  await browser.close();
}
