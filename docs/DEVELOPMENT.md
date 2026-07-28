# Developer & Component Creation Guide

This guide outlines step-by-step instructions for adding new components, using the dev preview bench, writing unit & E2E tests, and maintaining code quality.

---

## 1. Component Development Workflow

All reusable UI components are stored in `components/`.

### Creating a New Component

1. **Create the component file**: `components/<component-name>.tsx`
2. **Create the co-located unit test file**: `components/<component-name>.test.tsx`
3. **Optionally create a dev preview route**: `app/dev-<component-name>/page.tsx`

### Component Template Standard

```tsx
import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function CustomButton({
  label,
  onClick,
  variant = "primary",
}: CustomButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2";
  const variantStyles =
    variant === "primary"
      ? "bg-[var(--brand-teal-600)] text-white hover:bg-[var(--brand-teal-700)]"
      : "bg-[var(--card-bg)] text-[var(--fg)] border border-[var(--border)]";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

---

## 2. Dev Bench Preview Routes (`/dev-*`)

The project includes an isolated component preview bench in `app/dev-*/`. This allows visual testing of individual components without needing to run or modify the full main landing page.

Existing preview routes include:

- `http://localhost:3000/dev-button`: Test button states and variants.
- `http://localhost:3000/dev-mascot-scene`: Preview and debug Three.js 3D WebGL scene loading.
- `http://localhost:3000/dev-colors`: Visual inspection of dark/light theme CSS variables.
- `http://localhost:3000/dev-projects-grid`: Test responsive grid layout and project cards.
- `http://localhost:3000/dev-typography`: Verify heading hierarchy and body typography font scaling.

---

## 3. Writing Unit Tests (Vitest & React Testing Library)

Unit test specs live alongside components in `components/*.test.tsx`.

### Test Example (`components/button.test.tsx`)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders label correctly", () => {
    render(<Button label="Click Me" />);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

Execute unit tests:

```bash
npm run test
```

---

## 4. Writing End-to-End Tests (Playwright)

E2E tests are located in `e2e/*.spec.ts`.

### Spec Example (`e2e/theme-persistence.spec.ts`)

```ts
import { test, expect } from "@playwright/test";

test("toggles theme and persists across page reload", async ({ page }) => {
  await page.goto("/");
  const toggleBtn = page.getByRole("button", { name: /toggle theme/i });
  await toggleBtn.click();

  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  await page.reload();

  const isDarkAfterReload = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );
  expect(isDarkAfterReload).toBe(isDark);
});
```

Execute E2E tests:

```bash
npm run test:e2e
```

---

## 5. Running Lighthouse Audits Locally

To execute a local Lighthouse performance and WCAG accessibility audit:

```bash
# 1. Build and start production bundle
npm run build
npm run start

# 2. Run Lighthouse audit script against localhost:3000
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json,html --output-path=./docs/lighthouse-report
```

Compare results against established scores in [`docs/lighthouse-audit.md`](./lighthouse-audit.md).
