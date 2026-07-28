import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

/**
 * Applies the persisted/OS theme to <html> before hydration, matching
 * /legacy-reference/js/app.js's storage key and fallback logic — but
 * loaded with `beforeInteractive` (legacy loads its equivalent script at
 * the end of <body>, which still flashes the wrong theme on first paint).
 */
const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();`;

/**
 * Heading font, ported from /legacy-reference/css/style.css
 * (--font-heading: 'M PLUS Rounded 1c', sans-serif). `fallback` uses the
 * same system stack legacy defines as --font-body, so a failed webfont
 * load degrades to the project's real body font instead of a generic
 * sans-serif.
 */
const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["700", "800"],
  subsets: ["latin"],
  // false, not the default true (PMB-030/Lighthouse): this build preloads
  // every unicode-range chunk of the font regardless of `subsets`, not just
  // latin — 120 <link rel="preload"> tags, ~1.7MB, tanking LCP. `display:
  // swap` already avoids invisible text, so turning preload off lets the
  // browser fetch only the latin chunk it actually needs to render.
  preload: false,
  display: "swap",
  variable: "--font-mplus-rounded",
  fallback: [
    "-apple-system",
    "system-ui",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  // Required for the opengraph-image/twitter-image file conventions to
  // resolve to absolute URLs (miguelbarra.cl is this portfolio's own
  // production domain, per the "En la web" section's site link).
  metadataBase: new URL("https://miguelbarra.cl"),
  title: "Miguel Barra - Desarrollador Full Stack",
  description:
    "Portfolio de Miguel Barra, desarrollador full stack especializado en React, Next.js y TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      // `data-theme` is set by the blocking script below before hydration,
      // and re-asserted by ThemeProvider's useLayoutEffect on every commit
      // (React's own hydration commit otherwise strips an attribute it
      // doesn't know about). This only silences the resulting dev warning.
      suppressHydrationWarning
      className={`${mPlusRounded1c.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
