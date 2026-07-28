import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/app/theme-provider";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("toggles the theme on click and persists the choice to localStorage", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAccessibleName(/tema claro activo/i);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    await user.click(button);

    expect(button).toHaveAccessibleName(/tema oscuro activo/i);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(setItemSpy).toHaveBeenCalledWith("theme", "dark");

    setItemSpy.mockRestore();
  });
});
