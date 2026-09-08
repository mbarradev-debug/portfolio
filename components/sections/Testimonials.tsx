"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial, TestimonialsContent } from "@/content";
import { PersonIcon } from "../icons";

const SWAP_MS = 200;
const AUTOPLAY_MS = 6000;

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
  const indexRef = useRef(0);
  const swapTimer = useRef<number | undefined>(undefined);
  const autoTimer = useRef<number | undefined>(undefined);

  const show = useCallback((next: number) => {
    indexRef.current = next;
    setFading(true);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, SWAP_MS);
  }, []);

  const restartAutoplay = useCallback(() => {
    if (!multiple) return;
    window.clearInterval(autoTimer.current);
    autoTimer.current = window.setInterval(() => {
      show((indexRef.current + 1) % items.length);
    }, AUTOPLAY_MS);
  }, [multiple, show, items.length]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      window.clearInterval(autoTimer.current);
      window.clearTimeout(swapTimer.current);
    };
  }, [restartAutoplay]);

  const onDot = (i: number) => {
    show(i);
    restartAutoplay();
  };

  const current = items[index];

  return (
    <section
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
