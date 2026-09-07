// Genera app/favicon.ico (16/32/48) a partir de app/icon.svg, para clientes
// que piden /favicon.ico por convención (lectores RSS, navegadores antiguos,
// algunos crawlers). El SVG sigue siendo la fuente de verdad del ícono.
//
// Uso (sin añadir dependencias permanentes):
//   npx --yes --package=sharp --package=png-to-ico node scripts/generate-favicon.mjs

import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const svg = readFileSync("app/icon.svg");
const sizes = [16, 32, 48];

const pngs = await Promise.all(
  sizes.map((size) =>
    sharp(svg, { density: 384 })
      .resize(size, size, { fit: "cover" })
      .png()
      .toBuffer(),
  ),
);

writeFileSync("app/favicon.ico", await pngToIco(pngs));
console.log(`app/favicon.ico regenerado (${sizes.join("/")}).`);
