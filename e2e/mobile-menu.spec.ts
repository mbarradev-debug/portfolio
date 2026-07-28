import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("opens the mobile menu, allows clicking a link, and closes on navigation", async ({
  page,
}) => {
  await page.goto("/");

  const hamburger = page.getByRole("button", { name: /menú/i });
  await expect(hamburger).toHaveAttribute("aria-expanded", "false");

  await hamburger.click();
  await expect(hamburger).toHaveAttribute("aria-expanded", "true");

  const panel = page.getByTestId("mobile-nav-panel");
  const proyectosLink = panel.getByRole("link", { name: "Proyectos" });
  await expect(proyectosLink).toBeVisible();
  await expect(proyectosLink).toHaveAttribute("href", "#proyectos");

  await proyectosLink.click();

  await expect(hamburger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#proyectos$/);
});
