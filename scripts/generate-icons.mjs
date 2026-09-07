// Genera los íconos rasterizados a partir de app/icon.svg (fuente de verdad):
//   - app/favicon.ico (16/32/48) para clientes que piden /favicon.ico
//   - public/icon-192.png, public/icon-512.png (manifest, purpose "any")
//   - public/icon-maskable-512.png (manifest, purpose "maskable", con zona segura)
//
// Uso (sin añadir dependencias permanentes):
//   npx --yes --package=sharp --package=png-to-ico node scripts/generate-icons.mjs

import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const INK = "#15181a";
const svg = readFileSync("app/icon.svg");

// favicon.ico
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(svg, { density: 384 })
      .resize(size, size, { fit: "cover" })
      .png()
      .toBuffer(),
  ),
);
writeFileSync("app/favicon.ico", await pngToIco(icoPngs));

// PNG "any" para el manifest
for (const size of [192, 512]) {
  await sharp(svg, { density: 1024 })
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(`public/icon-${size}.png`);
}

// PNG "maskable": glifo dentro de la zona segura (~60% del lienzo), fondo a sangre
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${INK}"/>
  <text x="256" y="336" font-family="Georgia, serif" font-size="240" fill="#fff" text-anchor="middle">M</text>
</svg>`;
await sharp(Buffer.from(maskable), { density: 512 })
  .resize(512, 512)
  .png()
  .toFile("public/icon-maskable-512.png");

console.log(
  "Íconos regenerados: favicon.ico + icon-192/512 + icon-maskable-512.",
);
