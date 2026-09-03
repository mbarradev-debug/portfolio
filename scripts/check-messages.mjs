#!/usr/bin/env node
/**
 * Verifies that every message catalog under `messages/` has exactly the same
 * set of keys (deep). Run: `npm run messages:check`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const messagesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "messages");

/** Flatten a nested object into `a.b.c` dotted paths. */
function flatten(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value)
      ? flatten(value, path)
      : [path];
  });
}

const files = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
if (files.length < 2) {
  console.log("check-messages: need at least two catalogs to compare.");
  process.exit(0);
}

const catalogs = files.map((file) => ({
  file,
  keys: new Set(flatten(JSON.parse(readFileSync(join(messagesDir, file), "utf8")))),
}));

const [reference, ...rest] = catalogs;
let ok = true;

for (const catalog of rest) {
  const missing = [...reference.keys].filter((k) => !catalog.keys.has(k));
  const extra = [...catalog.keys].filter((k) => !reference.keys.has(k));
  if (missing.length || extra.length) {
    ok = false;
    console.error(`\n${catalog.file} differs from ${reference.file}:`);
    for (const k of missing) console.error(`  - missing: ${k}`);
    for (const k of extra) console.error(`  + extra:   ${k}`);
  }
}

if (ok) {
  console.log(
    `check-messages: ${catalogs.length} catalogs, ${reference.keys.size} keys, all in sync.`
  );
  process.exit(0);
}
process.exit(1);
