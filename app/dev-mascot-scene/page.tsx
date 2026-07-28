import type { Metadata } from "next";
import { MascotScene } from "@/components/mascot-scene";

export const metadata: Metadata = {
  title: "MascotScene (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-019): verifies the MascotScene 3D robot against
 * /legacy-reference/js/scene.js — geometry, palette, float/wave/antenna
 * animations, initial camera sweep, then auto-rotate via OrbitControls.
 * The second instance sits in a manually resizable box (drag the bottom-
 * right corner) to verify the canvas/camera adapt to container size
 * changes, not just window resizes.
 */

export default function DevMascotScenePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">MascotScene</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-019 — ported from
        /legacy-reference/js/scene.js. Drag to orbit, watch the initial camera
        sweep, float/wave/antenna-pulse animation, and — for the second instance
        — drag the resize handle at the bottom-right corner to verify
        container-driven resizing.
      </p>

      <h2 className="mb-2 text-lg font-semibold">
        Default (legacy .scene-wrap size, 300×260)
      </h2>
      <div className="mx-auto mb-2 h-[260px] w-full max-w-[300px]">
        <MascotScene />
      </div>

      <h2 className="mt-10 mb-2 text-lg font-semibold">Resizable container</h2>
      <div className="resize h-[260px] w-[300px] overflow-auto border border-black/20">
        <MascotScene />
      </div>
    </div>
  );
}
