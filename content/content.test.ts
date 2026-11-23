import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/lib/i18n";
import { en } from "./en";
import { es } from "./es";
import { AVATAR, CV_FILES, GITHUB_URL, PULSO_SCREENSHOTS } from "./shared";

const publicFile = (path: string) => join(process.cwd(), "public", path);

/** Paths of every leaf, with array items by index, so both languages can be compared. */
function shape(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => shape(item, `${prefix}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => shape(item, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

/** Every string in a dictionary that looks like an href. */
function hrefs(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(hrefs);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      (key === "href" || key.endsWith("Href")) && typeof item === "string" ? [item] : hrefs(item),
    );
  }
  return [];
}

describe("dictionaries", () => {
  it("have the same structure in Spanish and English", () => {
    expect(shape(en)).toEqual(shape(es));
  });

  it("list the projects in the CV order", () => {
    const order = ["tasklane", "pulso", "pulso-extension", "linear-issue-to-pr"];
    expect(es.projects.items.map((p) => p.slug)).toEqual(order);
    expect(en.projects.items.map((p) => p.slug)).toEqual(order);
  });

  it.each([
    ["es", es],
    ["en", en],
  ] as const)("don't link to repositories in %s (they are private)", (_locale, content) => {
    const repoLinks = hrefs(content).filter((href) => href.startsWith(`${GITHUB_URL}/`));
    expect(repoLinks).toEqual([]);
  });

  it.each([
    ["es", es],
    ["en", en],
  ] as const)("internal links in %s carry their locale prefix", (locale, content) => {
    const internal = hrefs(content).filter((href) => href.startsWith("/") && !href.endsWith(".pdf"));
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) expect(href === `/${locale}` || href.startsWith(`/${locale}/`) || href.startsWith(`/${locale}#`)).toBe(true);
  });

  it("download each language's own CV", () => {
    expect(es.cvNavItem.href).toBe(CV_FILES.es);
    expect(es.contact.cta.primary.href).toBe(CV_FILES.es);
    expect(en.cvNavItem.href).toBe(CV_FILES.en);
    expect(en.contact.cta.primary.href).toBe(CV_FILES.en);
  });
});

describe("files in public/", () => {
  it("has a CV for every locale", () => {
    for (const locale of locales) expect(existsSync(publicFile(CV_FILES[locale])), CV_FILES[locale]).toBe(true);
  });

  it("has the profile photo and the Pulso screenshots", () => {
    const files = [AVATAR.src, ...Object.values(PULSO_SCREENSHOTS).map((s) => s.src)];
    for (const file of files) expect(existsSync(publicFile(file)), file).toBe(true);
  });
});
