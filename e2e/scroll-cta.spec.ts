import { expect, test } from "@playwright/test";

test('"Ver proyectos" scrolls to the Proyectos section', async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Ver proyectos" }).click();

  await expect(page).toHaveURL(/#proyectos$/);
  await expect(
    page.getByRole("heading", { name: "Proyectos" }),
  ).toBeInViewport();
});
