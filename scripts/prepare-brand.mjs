import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const brandDir = new URL("../public/images/brand/", import.meta.url);
await mkdir(brandDir, { recursive: true });
const [source, cover] = process.argv.slice(2);
if (!source || !cover) throw new Error('Usage: node scripts/prepare-brand.mjs "approved-logo.png" "cover.png"');
// Crop external margins only. The approved raster artwork is preserved.
await sharp(source).extract({ left: 100, top: 408, width: 1055, height: 474 })
  .webp({ lossless: true }).toFile(fileURLToPath(new URL("viham-dev.webp", brandDir)));
await sharp(cover)
  .resize(1200, 630, { fit: "contain", background: "#101C36" }).png()
  .toFile(fileURLToPath(new URL("../public/og.png", import.meta.url)));
// Use an approved fragment of the logo as the favicon, without tracing it.
await sharp(source).extract({ left: 103, top: 413, width: 395, height: 294 })
  .resize(64, 64, { fit: "contain", background: "#101C36" }).png()
  .toFile(fileURLToPath(new URL("../public/favicon.png", import.meta.url)));

const fontDir = new URL("../src/app/fonts/", import.meta.url);
await mkdir(fontDir, { recursive: true });
const font = await fetch("https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf").then((response) => { if (!response.ok) throw new Error("Font download failed"); return response.arrayBuffer(); });
await writeFile(new URL("manrope.ttf", fontDir), Buffer.from(font));
const license = await fetch("https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt").then((response) => { if (!response.ok) throw new Error("Font license download failed"); return response.text(); });
await writeFile(new URL("OFL.txt", fontDir), license);
console.log("Prepared approved logo crop, social preview, favicon and local Manrope font.");
