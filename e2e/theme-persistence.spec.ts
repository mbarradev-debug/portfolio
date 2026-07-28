import { expect, test } from "@playwright/test";

test("persists the theme choice across a page reload", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", {
    name: /tema (claro|oscuro) activo/i,
  });
  const initialLabel = await toggle.getAttribute("aria-label");

  await toggle.click();

  const toggledLabel = await toggle.getAttribute("aria-label");
  expect(toggledLabel).not.toBe(initialLabel);
  const themeAfterClick = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme"),
  );

  await page.reload();

  const themeAfterReload = await page.evaluate(() =>
    document.documentElement.getAttribute("data-theme"),
  );
  expect(themeAfterReload).toBe(themeAfterClick);

  await expect(
    page.getByRole("button", { name: /tema (claro|oscuro) activo/i }),
  ).toHaveAttribute("aria-label", toggledLabel!);
});
