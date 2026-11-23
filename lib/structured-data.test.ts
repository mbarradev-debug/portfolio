import { describe, expect, it } from "vitest";
import { contentFor } from "@/content/dictionaries";
import { EMAIL, UNIVERSITY } from "@/content/shared";
import { personJsonLd } from "./structured-data";

describe("personJsonLd", () => {
  it.each(["es", "en"] as const)("describes the person in %s", (locale) => {
    const content = contentFor(locale);
    const person = personJsonLd(content, locale);
    expect(person.email).toBe(`mailto:${EMAIL}`);
    expect(person.alumniOf).toEqual({ "@type": "CollegeOrUniversity", name: UNIVERSITY });
    expect(person.jobTitle).toBe(content.hero.jobTitle);
    expect(person.knowsAbout).toContain("NestJS");
  });
});
