import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Miguel Barra | Ingeniero de Software",
  description:
    "Ingeniero en Computación e Informática especializado en desarrollo web. Diseño y desarrollo soluciones escalables con React, Next.js, TypeScript y Node.js.",
  keywords: [
    "Ingeniero de Software",
    "Desarrollador Web",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Chile",
  ],
  authors: [{ name: "Miguel Barra" }],
  creator: "Miguel Barra",
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Miguel Barra | Ingeniero de Software",
    description:
      "Ingeniero en Computación e Informática. Soluciones web escalables y mantenibles.",
    siteName: "Miguel Barra Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Miguel Barra | Ingeniero de Software",
    description:
      "Ingeniero en Computación e Informática. Soluciones web escalables y mantenibles.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} min-h-screen bg-bg-primary text-text-primary antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg-primary focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
