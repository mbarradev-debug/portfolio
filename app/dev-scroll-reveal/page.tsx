import type { Metadata } from "next";
import { RevealBox } from "./reveal-box";

export const metadata: Metadata = {
  title: "useScrollReveal (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-018): verifies useScrollReveal against
 * /legacy-reference/js/app.js's IntersectionObserver logic. Each box
 * starts off-screen below a tall spacer — scroll down to watch it fade
 * and slide in once, then scroll back up to confirm it stays revealed
 * (matches the legacy `io.unobserve` — no re-triggering).
 */

export default function DevScrollRevealPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">useScrollReveal</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-018. Scroll down to reveal each box — it
        should only animate in once, even when scrolling back up.
      </p>

      <div className="h-[80vh] pt-8 text-sm text-black/40">Scroll down ↓</div>

      <div className="flex flex-col gap-6">
        <RevealBox label="Default threshold (0.15)" />
        <div className="h-[60vh]" />
        <RevealBox label="Custom threshold (0.5)" threshold={0.5} />
        <div className="h-[60vh]" />
        <RevealBox label="Third box" />
      </div>
    </div>
  );
}
