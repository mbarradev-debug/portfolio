"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  Badge,
  CircleArrow,
} from "@/components/ui";

import styles from "./CaseStudiesCarousel.module.css";

/** One case study, already resolved for the active locale. */
export type CarouselCase = {
  readonly tag: string;
  readonly date: string;
  readonly title: string;
  readonly desc: string;
  /** Screenshot under `/public`. Absent → the text mock is shown instead. */
  readonly image?: string;
  readonly imageAlt?: string;
  /** External project URL. Absent → the link falls back to the contact anchor. */
  readonly url?: string;
  /** CSS `background` for the media panel. */
  readonly gradient: string;
  /** Text-mock fallback (used only when `image` is absent). */
  readonly mockTag?: string;
  readonly mockHeadline?: string;
};

/** Crossfade duration for the info panel — matches `--duration-transition`. */
const FADE_MS = 300;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type CaseStudiesCarouselProps = {
  readonly items: readonly CarouselCase[];
};

/**
 * Client leaf for the case studies section: heading + counter + prev/next, and
 * one browser-framed card at a time.
 *
 * - **1 case**: the card only — no arrows.
 * - **N cases**: prev/next wrap around, the counter tracks the visible case, and
 *   the info panel crossfades on change. `prefers-reduced-motion` → instant swap.
 *
 * `index` is the target; `visibleIndex` only catches up once the outgoing panel
 * has faded, so a fast double-click never strands the card mid-transition.
 */
export function CaseStudiesCarousel({ items }: CaseStudiesCarouselProps) {
  const t = useTranslations("Cases");
  const hasMany = items.length > 1;

  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const reducedMotionRef = useRef(false);
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(REDUCED_MOTION).matches;
  }, []);

  useEffect(() => {
    if (index === visibleIndex) return;
    if (reducedMotionRef.current) {
      setVisibleIndex(index);
      return;
    }
    const id = window.setTimeout(() => setVisibleIndex(index), FADE_MS);
    return () => window.clearTimeout(id);
  }, [index, visibleIndex]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + items.length) % items.length);

  const current = items[visibleIndex];
  if (!current) return null;

  const fading = index !== visibleIndex;
  const hasUrl = Boolean(current.url);
  const linkLabel = hasUrl ? t("linkProject") : t("linkDefault");
  const linkProps = hasUrl
    ? { href: current.url, target: "_blank" as const, rel: "noopener" }
    : { href: "/#contacto" };

  return (
    <div className={styles.carousel}>
      <div className={styles.top}>
        <div>
          <h2 id="cases-title" className={styles.heading}>
            {t("heading")}
          </h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>
        <div className={styles.nav}>
          <span className={styles.counter}>
            {t("counter", {
              current: String(visibleIndex + 1).padStart(2, "0"),
              total: String(items.length).padStart(2, "0"),
            })}
          </span>
          {hasMany ? (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                aria-label={t("previous")}
                onClick={() => go(-1)}
              >
                <ArrowLeftIcon />
              </button>
              <button
                type="button"
                className={styles.arrow}
                aria-label={t("next")}
                onClick={() => go(1)}
              >
                <ArrowRightIcon />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={[styles.card, fading && styles.fading].filter(Boolean).join(" ")}
        aria-live="polite"
      >
        <div className={styles.media} style={{ background: current.gradient }}>
          <div className={styles.mock}>
            <div className={styles.mockBar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {current.image ? (
              <div className={styles.mockImage}>
                <Image
                  src={current.image}
                  alt={current.imageAlt ?? current.title}
                  width={1200}
                  height={630}
                  sizes="(max-width: 980px) 90vw, 42vw"
                />
              </div>
            ) : (
              <div className={styles.mockText}>
                {current.mockTag ? (
                  <span className={styles.mockTagLabel}>{current.mockTag}</span>
                ) : null}
                {current.mockHeadline ? (
                  <span className={styles.mockHeadline}>{current.mockHeadline}</span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.meta}>
            <Badge>{current.tag}</Badge>
            <span className={styles.date}>{current.date}</span>
          </div>
          <div>
            <h3 className={styles.title}>{current.title}</h3>
            <p className={styles.desc}>{current.desc}</p>
          </div>
          <a className={styles.link} aria-label={linkLabel} {...linkProps}>
            <span className={styles.linkLabel}>{linkLabel}</span>
            <CircleArrow size="lg" icon={<ArrowUpRightIcon />} />
          </a>
        </div>
      </div>
    </div>
  );
}
