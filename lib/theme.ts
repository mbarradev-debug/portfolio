import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * Design tokens taken from the prototype's CSS variables
 * (references/portfolio-miguel-barra/index.html).
 *
 * Light-mode deviations, made to reach WCAG AA (4.5:1) on #f0e7db:
 * - link:   #3d7aed -> #2b5fc4 (3.30 -> 4.85)
 * - btn.bg: #319795 -> #2C7A7B (white text 3.51 -> 5.03)
 * - ghost:  #2C7A7B -> #285E61 (4.11 -> 5.99)
 */
const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: "smooth",
      colorPalette: "teal",
      "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" },
    },
    body: {
      bg: "bg",
      color: "fg",
      fontSize: "16px",
      lineHeight: "1.6",
      transition: "background 0.3s",
      overflowX: "hidden",
    },
    a: {
      textUnderlineOffset: "3px",
    },
    "section[id]": {
      scrollMarginTop: "72px",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-mplus), sans-serif" },
        body: {
          value:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
        },
      },
      colors: {
        // Fixed colors shared by both modes.
        brand: { value: "#88ccca" },
        ink: { value: "#202023" },
        headingRule: { value: "#525252" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _light: "#f0e7db", _dark: "#202023" } },
        },
        fg: {
          DEFAULT: {
            value: { _light: "#1A202C", _dark: "rgba(255,255,255,0.92)" },
          },
          muted: {
            value: {
              _light: "rgba(26,32,44,0.68)",
              _dark: "rgba(255,255,255,0.64)",
            },
          },
        },
        border: {
          DEFAULT: {
            value: {
              _light: "rgba(26,32,44,0.14)",
              _dark: "rgba(255,255,255,0.12)",
            },
          },
        },
        link: { value: { _light: "#2b5fc4", _dark: "#ff63c3" } },
        glass: {
          value: {
            _light: "rgba(255,255,255,0.48)",
            _dark: "rgba(255,255,255,0.08)",
          },
        },
        card: {
          value: {
            _light: "rgba(255,255,255,0.36)",
            _dark: "rgba(255,255,255,0.04)",
          },
        },
        chip: {
          value: {
            _light: "rgba(26,32,44,0.07)",
            _dark: "rgba(255,255,255,0.08)",
          },
        },
        nav: {
          value: {
            _light: "rgba(255,255,255,0.25)",
            _dark: "rgba(32,32,35,0.5)",
          },
        },
        btn: {
          bg: { value: { _light: "#2C7A7B", _dark: "#81E6D9" } },
          fg: { value: { _light: "#ffffff", _dark: "#1A202C" } },
        },
        ghost: { value: { _light: "#285E61", _dark: "#81E6D9" } },
        accent: { value: { _light: "#2C7A7B", _dark: "#88ccca" } },
        badge: {
          bg: {
            value: { _light: "#C6F6D5", _dark: "rgba(154,230,180,0.16)" },
          },
          fg: { value: { _light: "#22543D", _dark: "#9AE6B4" } },
        },
        toggle: {
          bg: { value: { _light: "#805AD5", _dark: "#FBD38D" } },
          fg: { value: { _light: "#ffffff", _dark: "#1A202C" } },
        },
      },
    },
    textStyles: {
      // Uppercase label used for status badges and case metadata.
      label: {
        value: {
          fontFamily: "body",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
