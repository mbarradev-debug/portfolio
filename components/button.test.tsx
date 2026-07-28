import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders the solid variant with its brand background", () => {
    render(<Button variant="solid">Ver proyectos</Button>);

    const button = screen.getByRole("button", { name: "Ver proyectos" });
    expect(button.className).toContain("bg-brand-teal-500");
  });

  it("renders the ghost variant with its ghost-text color", () => {
    render(<Button variant="ghost">GitHub</Button>);

    const button = screen.getByRole("button", { name: "GitHub" });
    expect(button.className).toContain("text-ghost-text");
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Escríbeme</Button>);

    await user.click(screen.getByRole("button", { name: "Escríbeme" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a link when href is provided, not a button", () => {
    render(
      <Button href="https://example.com" variant="solid">
        Ver proyectos
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Ver proyectos" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
