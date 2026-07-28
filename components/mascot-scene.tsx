"use client";

import dynamic from "next/dynamic";

// Three.js only runs client-side (WebGL, canvas, document) — ssr:false
// keeps it out of the server render entirely and code-splits it out of
// the main client bundle, per PMB-019's AC.
export const MascotScene = dynamic(
  () =>
    import("@/components/mascot-scene-canvas").then((m) => m.MascotSceneCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);
