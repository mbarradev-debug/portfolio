"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial, TestimonialsContent } from "@/content";
import { TESTIMONIAL_AUTOPLAY_MS, TESTIMONIAL_SWAP_MS } from "@/lib/motion";
import { PauseIcon, PersonIcon, PlayIcon } from "../icons";

export function Testimonials({
  items,
  section,
}: {
  items: Testimonial[];
  section: TestimonialsContent;
}) {
  const multiple = items.length > 1;
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);
  const swapTimer = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLElement | null>(null);
  // Se incrementa en cada interacción manual para reiniciar el temporizador.
  const [nudge, setNudge] = useState(0);

  const show = useCallback((next: number) => {
    indexRef.current = next;
    setFading(true);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, TESTIMONIAL_SWAP_MS);
  }, []);

  // Autoplay: sólo con >=2 testimonios, sin `prefers-reduced-motion`, sin pausa
  // manual, sin interacción (hover/foco) en la sección, con la sección visible y
  // la pestaña activa.
  useEffect(() => {
    if (!multiple || paused) return;
    const el = sectionRef.current;
    if (!el) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hovered = false;
    let onScreen = false;
    let tick: number | undefined;

    const canRun = () =>
      !reduceMq.matches &&
      !hovered &&
      onScreen &&
      document.visibilityState === "visible";

    const start = () => {
      window.clearInterval(tick);
      if (!canRun()) return;
      tick = window.setInterval(() => {
        show((indexRef.current + 1) % items.length);
      }, TESTIMONIAL_AUTOPLAY_MS);
    };
    const stop = () => window.clearInterval(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        start();
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const onEnter = () => {
      hovered = true;
      stop();
    };
    const onLeave = (e: Event) => {
      const related = (e as FocusEvent).relatedTarget as Node | null;
      if (e.type === "focusout" && related && el.contains(related)) return;
      hovered = false;
      start();
    };
    const onVisibility = () => start();

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", start);

    start();

    return () => {
      stop();
      io.disconnect();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", start);
    };
  }, [multiple, paused, items.length, show, nudge]);

  const onDot = (i: number) => {
    show(i);
    setNudge((n) => n + 1);
  };

  const current = items[index];

  return (
    <section
      ref={sectionRef}
      className="testimonials"
      id="testimonios"
      data-nav-dark
      aria-labelledby="testi-title"
    >
      <div className="testi-inner">
        <h2 className="sr-only" id="testi-title">
          {section.srTitle}
        </h2>
        <div className="testi-top">
          <div className="testi-controls">
            <div
              className="testi-dots"
              id="testiDots"
              role="tablist"
              aria-label={section.pickLabel}
              hidden={!multiple}
            >
              {multiple &&
                items.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    className={i === index ? "active" : undefined}
                    aria-label={`${section.viewLabelPrefix} ${i + 1}`}
                    aria-current={i === index ? "true" : "false"}
                    onClick={() => onDot(i)}
                  />
                ))}
            </div>
            {multiple && (
              <button
                type="button"
                className="testi-pause"
                aria-pressed={paused}
                aria-label={paused ? section.resumeLabel : section.pauseLabel}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
            )}
          </div>
          <a
            className="testi-cta"
            href={section.cta.href}
            target="_blank"
            rel="noopener"
          >
            {section.cta.label}
          </a>
        </div>
        <blockquote
          className={fading ? "testi-quote is-fading" : "testi-quote"}
          id="testiQuote"
        >
          {`“${current.quote}”`}
        </blockquote>
        <div className="testi-author">
          <span className="testi-avatar" aria-hidden="true">
            <PersonIcon />
          </span>
          <div>
            <div className="name" id="testiName">
              {current.name}
            </div>
            <div className="role" id="testiRole">
              {current.role}
            </div>
            <div className="source">{section.source}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
