import { describe, expect, it } from "vitest";
import { localeFromAcceptLanguage, localeOf, route, stripLocale, switchLocale } from "./i18n";

describe("route", () => {
  it("prefixes paths with the locale", () => {
    expect(route("es", "/")).toBe("/es");
    expect(route("en", "/projects/pulso")).toBe("/en/projects/pulso");
  });

  it("keeps the hash after the locale", () => {
    expect(route("es", "/#proyectos")).toBe("/es#proyectos");
  });
});

describe("localeOf / stripLocale / switchLocale", () => {
  it("reads and removes the locale prefix", () => {
    expect(localeOf("/en/projects/pulso")).toBe("en");
    expect(localeOf("/projects/pulso")).toBeUndefined();
    expect(stripLocale("/es")).toBe("/");
    expect(stripLocale("/en/projects/pulso")).toBe("/projects/pulso");
  });

  it("switches to the same page in another locale", () => {
    expect(switchLocale("/es/projects/pulso", "en")).toBe("/en/projects/pulso");
  });
});

describe("localeFromAcceptLanguage", () => {
  it("falls back to Spanish", () => {
    expect(localeFromAcceptLanguage(null)).toBe("es");
    expect(localeFromAcceptLanguage("fr-FR,de;q=0.8")).toBe("es");
  });

  it("picks English only when it's the highest-weighted supported language", () => {
    expect(localeFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
    expect(localeFromAcceptLanguage("es-CL,en;q=0.8")).toBe("es");
    expect(localeFromAcceptLanguage("fr;q=1,en;q=0.7,es;q=0.5")).toBe("en");
  });
});
