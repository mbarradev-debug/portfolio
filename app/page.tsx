import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { GlassBox } from "@/components/glass-box";
import { MascotScene } from "@/components/mascot-scene";

export const metadata: Metadata = {
  title: "Miguel Barra - Desarrollador Full Stack",
  description:
    "Portfolio de Miguel Barra, desarrollador full stack especializado en React, Next.js y TypeScript.",
};

// Ported from /legacy-reference/index.html (main.page > .container.content)
// and css/style.css (.page, .content, .hero, .hero-text, .page-title,
// .tagline, .avatar-wrap). sm: (640px) is Tailwind's default breakpoint
// and matches legacy's @media (max-width: 640px) exactly, so the
// mobile-collapse classes need no arbitrary values.
export default function Home() {
  return (
    <main id="top" className="pb-8">
      <div className="mx-auto max-w-[768px] px-4 pt-14">
        <div className="mx-auto mb-2 h-[260px] w-full max-w-[300px]">
          <MascotScene />
        </div>

        <article>
          <GlassBox>
            ¡Hola! Soy desarrollador full stack desde Santiago, Chile.
          </GlassBox>

          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="grow">
              <h2 className="font-heading text-page-title mb-1 font-extrabold tracking-[-0.02em]">
                Miguel Barra
              </h2>
              <p className="text-text-soft">
                Desarrollador Full Stack — React · Next.js · TypeScript
              </p>
            </div>
            <div className="mt-4 shrink-0 text-center sm:mt-0 sm:ml-6">
              <Avatar
                src="/avatar-placeholder.png"
                alt="Foto de Miguel Barra"
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
