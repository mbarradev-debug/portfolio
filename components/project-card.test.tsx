import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "./project-card";

describe("ProjectCard", () => {
  it("renders the title, description, and image received via props", () => {
    render(
      <ProjectCard
        href="https://pulso-cyan-zeta.vercel.app"
        title="Pulso"
        description="Dashboard de indicadores económicos de Chile"
        image={{
          src: "/project-thumb-placeholder.png",
          alt: "Pulso — Dashboard de indicadores económicos de Chile",
        }}
      />,
    );

    expect(screen.getByText("Pulso")).toBeInTheDocument();
    expect(
      screen.getByText("Dashboard de indicadores económicos de Chile"),
    ).toBeInTheDocument();

    const img = screen.getByRole("img", {
      name: "Pulso — Dashboard de indicadores económicos de Chile",
    });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("project-thumb-placeholder.png");
  });

  it("renders the fallback icon instead of an image when none is provided", () => {
    render(
      <ProjectCard
        href="https://github.com/mbarradev-debug/pulso"
        title="Código fuente"
        description="Repositorio de Pulso en GitHub"
        fallbackIcon={<svg data-testid="fallback-icon" />}
      />,
    );

    expect(screen.getByText("Código fuente")).toBeInTheDocument();
    expect(
      screen.getByText("Repositorio de Pulso en GitHub"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("fallback-icon")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
