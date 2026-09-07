"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo de fondo del hero: sólo se carga si conviene (sin reduced-motion, sin
 * Save-Data y viewport >= 761px). Portado de references/index.html.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = Boolean(connection?.saveData);
    const bigScreen = window.matchMedia("(min-width: 761px)").matches;
    if (reduce || saveData || !bigScreen) return; // se queda el poster

    video.parentElement?.classList.add("video-active");

    const reveal = () => video.classList.add("is-playing");
    video.addEventListener("playing", reveal, { once: true });
    video.addEventListener("loadeddata", reveal, { once: true });
    const fallback = window.setTimeout(reveal, 2500);
    video.addEventListener(
      "loadedmetadata",
      () => {
        video.playbackRate = 0.55;
      },
      { once: true },
    );

    video.src = video.dataset.src ?? "";
    video.playbackRate = 0.55;
    video.autoplay = true;
    video.play().catch(() => {});

    return () => {
      window.clearTimeout(fallback);
      video.removeEventListener("playing", reveal);
      video.removeEventListener("loadeddata", reveal);
    };
  }, []);

  return (
    <video
      ref={ref}
      id="heroVideo"
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      poster="/hero-poster.jpg"
      data-src="/hero.mp4"
    />
  );
}
