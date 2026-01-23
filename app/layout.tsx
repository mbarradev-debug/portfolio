import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { siteConfig } from "@/config";
import { Header, Footer } from "@/components/ui";
import { ThemeProvider } from "@/components/providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <Header />
          <main className="w-full flex flex-col pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
