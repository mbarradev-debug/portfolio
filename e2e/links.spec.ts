import { expect, test } from "@playwright/test";

test('"En la web" links have the correct hrefs', async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "@mbarradev-debug" }),
  ).toHaveAttribute("href", "https://github.com/mbarradev-debug");
  await expect(
    page.getByRole("link", { name: "miguelbarrarios" }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/miguelbarrarios");
  await expect(
    page.getByRole("link", { name: "miguelbarra.cl" }),
  ).toHaveAttribute("href", "https://miguelbarra.cl");
  await expect(
    page.getByRole("link", { name: "mbarra.git@gmail.com" }),
  ).toHaveAttribute("href", "mailto:mbarra.git@gmail.com");
});

test('Contacto\'s "Escríbeme" link has the correct mailto href', async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Escríbeme" })).toHaveAttribute(
    "href",
    "mailto:mbarra.git@gmail.com",
  );
});
