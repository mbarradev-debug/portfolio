"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./HeroVideo.module.css";

type HeroVideoProps = {
  /** Path under `/public`. */
  src: string;
  poster: string;
};

const PLAYBACK_RATE = 0.55;

/**
 * Client leaf for the hero background. Renders a muted looping `<video>` with a
 * poster; only downloads and plays the video when it's worth it — no reduced
 * motion, no Save-Data, viewport ≥ 761px. Otherwise the poster is all you get.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    const bigScreen = window.matchMedia("(min-width: 761px)").matches;
    if (prefersReducedMotion || saveData || !bigScreen) return;

    const reveal = () => setPlaying(true);
    video.addEventListener("playing", reveal, { once: true });
    video.addEventListener("loadeddata", reveal, { once: true });
    // Safety net: never leave the video invisible.
    const fallback = setTimeout(reveal, 2500);

    const setRate = () => {
      video.playbackRate = PLAYBACK_RATE;
    };
    video.addEventListener("loadedmetadata", setRate, { once: true });

    video.src = src;
    setRate();
    video.play().catch(() => {});

    return () => {
      clearTimeout(fallback);
      video.removeEventListener("playing", reveal);
      video.removeEventListener("loadeddata", reveal);
      video.removeEventListener("loadedmetadata", setRate);
    };
  }, [src]);

  return (
    <div className={styles.wrap} aria-hidden="true" style={{ backgroundImage: `url(${poster})` }}>
      <video
        ref={videoRef}
        className={[styles.video, playing && styles.playing].filter(Boolean).join(" ")}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        tabIndex={-1}
      />
    </div>
  );
}
