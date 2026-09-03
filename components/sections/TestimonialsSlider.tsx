"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { UserIcon } from "@/components/ui";

import styles from "./TestimonialsSlider.module.css";

/** One testimonial, already resolved for the active locale. */
export type SliderTestimonial = {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
};

type TestimonialsSliderProps = {
  readonly items: readonly SliderTestimonial[];
  /** Absolute URL for the "view on LinkedIn" CTA. */
  readonly linkedinUrl: string;
};

/** Autoplay interval and crossfade duration (matches `--duration-transition`). */
const AUTOPLAY_MS = 6000;
const FADE_MS = 300;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Client leaf for the testimonials section. Renders one `<blockquote>` at a
 * time with a crossfade between them, dot navigation, and 6s autoplay that
 * restarts on interaction.
 *
 * - **1 testimonial**: the quote only — no dots, no autoplay, no fade machinery.
 * - **N testimonials**: dots (`aria-current` on the active one, ≥44px touch
 *   target), autoplay, crossfade. `prefers-reduced-motion` → instant swap.
 *
 * Rapid changes never queue: `index` is the single target, `visibleIndex` only
 * catches up once the outgoing quote has fully faded, so text is never stranded
 * mid-transition.
 */
export function TestimonialsSlider({ items, linkedinUrl }: TestimonialsSliderProps) {
  const t = useTranslations("Testimonials");
  const hasMany = items.length > 1;

  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  // Bumped on manual navigation so the autoplay effect tears down and restarts.
  const [interactions, setInteractions] = useState(0);

  const reducedMotionRef = useRef(false);
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(REDUCED_MOTION).matches;
  }, []);

  // Move `visibleIndex` to `index` — instantly under reduced motion, otherwise
  // once the fade-out has run. The cleanup cancels a still-pending swap when
  // `index` changes again, so only the latest target ever lands.
  useEffect(() => {
    if (index === visibleIndex) return;
    if (reducedMotionRef.current) {
      setVisibleIndex(index);
      return;
    }
    const id = window.setTimeout(() => setVisibleIndex(index), FADE_MS);
    return () => window.clearTimeout(id);
  }, [index, visibleIndex]);

  // Autoplay — only with 2+ testimonials; restarts on every manual interaction.
  useEffect(() => {
    if (!hasMany) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hasMany, items.length, interactions]);

  const select = (next: number) => {
    setIndex(next);
    setInteractions((count) => count + 1);
  };

  const current = items[visibleIndex];
  if (!current) return null;

  const fading = index !== visibleIndex;
  const quoteText = `“${current.quote}”`;

  return (
    <div className={styles.slider}>
      <div className={styles.top}>
        <div className={styles.dots} role="group" aria-label={t("selectLabel")} hidden={!hasMany}>
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={[styles.dot, i === index && styles.active].filter(Boolean).join(" ")}
              aria-label={t("dotLabel", { index: i + 1 })}
              aria-current={i === index ? "true" : undefined}
              onClick={() => select(i)}
            />
          ))}
        </div>
        <a className={styles.cta} href={linkedinUrl} target="_blank" rel="noopener">
          {t("viewOnLinkedin")}
        </a>
      </div>

      <figure className={[styles.figure, fading && styles.fading].filter(Boolean).join(" ")}>
        <blockquote className={styles.quote}>{quoteText}</blockquote>
        <figcaption className={styles.author}>
          <span className={styles.avatar} aria-hidden="true">
            <UserIcon />
          </span>
          <span className={styles.identity}>
            <span className={styles.name}>{current.name}</span>
            <span className={styles.role}>{current.role}</span>
            <span className={styles.source}>{t("source")}</span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
