import { existsSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CV_FILES, LEGACY_CV_PATH } from "./content/shared";
import nextConfig from "./next.config";

describe("next.config redirects", () => {
  it("sends the old CV URL permanently to the current Spanish CV", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual({ source: LEGACY_CV_PATH, destination: CV_FILES.es, permanent: true });
  });

  it("no longer serves a file at the old CV URL (the redirect would be shadowed otherwise)", () => {
    expect(existsSync(join(process.cwd(), "public", LEGACY_CV_PATH))).toBe(false);
  });
});

describe("Content-Security-Policy", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function csp() {
    vi.resetModules();
    const { default: config } = await import("./next.config");
    const headers = (await config.headers?.()) ?? [];
    return headers.flatMap((rule) => rule.headers).find((h) => h.key === "Content-Security-Policy")?.value ?? "";
  }

  it("upgrades insecure requests on Vercel (always HTTPS)", async () => {
    vi.stubEnv("VERCEL", "1");
    expect(await csp()).toContain("upgrade-insecure-requests");
  });

  it("leaves it out on http://localhost, where Safari would rewrite assets to https", async () => {
    vi.stubEnv("VERCEL", "");
    expect(await csp()).not.toContain("upgrade-insecure-requests");
  });
});
