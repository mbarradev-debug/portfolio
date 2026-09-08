"use client";

import { useEffect, useRef } from "react";
import {
  HERO_VIDEO_DEFER_MS,
  HERO_VIDEO_IDLE_TIMEOUT_MS,
  HERO_VIDEO_REVEAL_FALLBACK_MS,
} from "@/lib/motion";

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

// VP9 primero, H.264 de fallback. Ambos sin audio y muy comprimidos (~284 KB /
// ~470 KB para 10 s); ver presupuesto en DEPLOYMENT.md.
const SOURCES = [
  { src: "/hero.webm", type: "video/webm" },
  { src: "/hero.mp4", type: "video/mp4" },
];

/**
 * Vídeo de fondo del hero. Solo se carga si conviene (sin reduced-motion, sin
 * Save-Data y viewport >= 761px) y **después del LCP**: la descarga se difiere
 * hasta el evento `load` + un hueco ocioso, así nunca compite con los recursos
 * críticos. Hasta entonces se ve el poster.
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

    let cancelled = false;
    let fallbackTimer: number | undefined;
    const reveal = () => video.classList.add("is-playing");

    const startLoading = () => {
      if (cancelled) return;
      video.parentElement?.classList.add("video-active");
      video.addEventListener("playing", reveal, { once: true });
      video.addEventListener("loadeddata", reveal, { once: true });
      fallbackTimer = window.setTimeout(reveal, HERO_VIDEO_REVEAL_FALLBACK_MS);
      video.addEventListener(
        "loadedmetadata",
        () => {
          video.playbackRate = 0.55;
        },
        { once: true },
      );
      // Activa las <source> (llevan data-src para no cargar antes de tiempo).
      video
        .querySelectorAll<HTMLSourceElement>("source[data-src]")
        .forEach((s) => {
          s.src = s.dataset.src ?? "";
          s.removeAttribute("data-src");
        });
      video.load();
      video.playbackRate = 0.55;
      video.autoplay = true;
      video.play().catch(() => {});
    };

    const win = window as IdleWindow;
    let idleId: number | undefined;
    let deferTimer: number | undefined;
    const schedule = () => {
      if (typeof win.requestIdleCallback === "function") {
        idleId = win.requestIdleCallback(startLoading, {
          timeout: HERO_VIDEO_IDLE_TIMEOUT_MS,
        });
      } else {
        deferTimer = window.setTimeout(startLoading, HERO_VIDEO_DEFER_MS);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) win.cancelIdleCallback?.(idleId);
      if (deferTimer !== undefined) window.clearTimeout(deferTimer);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
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
    >
      {SOURCES.map((s) => (
        <source key={s.src} data-src={s.src} type={s.type} />
      ))}
    </video>
  );
}
