import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
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
