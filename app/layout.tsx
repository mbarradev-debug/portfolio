import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-mplus',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
});

export const metadata: Metadata = {
  title: 'Miguel Barra — Full Stack Developer',
  description:
    'Portfolio de Miguel Barra, Full Stack Developer especializado en React, Next.js y TypeScript. Santiago, Chile.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mPlusRounded.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-craftz-bg text-zinc-100">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
