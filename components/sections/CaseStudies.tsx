"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseStudy, CasesContent } from "@/content";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../icons";

const SWAP_MS = 170;

export function CaseStudies({
  items,
  section,
}: {
  items: CaseStudy[];
  section: CasesContent;
}) {
  const single = items.length <= 1;
  const total = String(items.length).padStart(2, "0");

  const [index, setIndex] = useState(0);
  const [switching, setSwitching] = useState(false);
  const lock = useRef(false);
  const swapTimer = useRef<number | undefined>(undefined);

  const go = (dir: number) => {
    if (lock.current || single) return;
    lock.current = true;
    setSwitching(true);
    window.clearTimeout(swapTimer.current);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    swapTimer.current = window.setTimeout(
      () => {
        setIndex((prev) => (prev + dir + items.length) % items.length);
        setSwitching(false);
        lock.current = false;
      },
      reduce ? 0 : SWAP_MS,
    );
  };

  const current = items[index];
  const hasUrl = Boolean(current.url);
  const linkHref = current.url ?? section.defaultHref;
  const linkLabel = hasUrl
    ? section.linkLabelWithUrl
    : section.linkLabelDefault;
  const swapClass = switching ? " is-switching" : "";

  return (
    <section className="cases" id="casos" aria-labelledby="cases-title">
      <div className="cases-inner">
        <div className="cases-top">
          <div>
            <h2 id="cases-title">{section.title}</h2>
            <p className="cases-sub">{section.sub}</p>
          </div>
          <div className="cases-nav">
            <span className="cases-counter">
              <span id="caseCounter">{String(index + 1).padStart(2, "0")}</span>{" "}
              / <span id="caseTotal">{total}</span>
            </span>
            <div
              className="cases-arrows"
              style={single ? { display: "none" } : undefined}
            >
              <button
                className="arrow-circle"
                id="casePrev"
                type="button"
                aria-label={section.prevLabel}
                onClick={() => go(-1)}
              >
                <ArrowLeft />
              </button>
              <button
                className="arrow-circle"
                id="caseNext"
                type="button"
                aria-label={section.nextLabel}
                onClick={() => go(1)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <article className="case-card reveal" id="caseCard" aria-live="polite">
          <div
            className="case-media"
            style={current.grad ? { background: current.grad } : undefined}
          >
            <div className="browser-mock">
              <div className="browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div
                className={
                  current.image ? "browser-body has-image" : "browser-body"
                }
                id="caseMockBody"
              >
                {current.image ? (
                  <Image
                    className={swapClass.trim() || undefined}
                    src={current.image}
                    alt={current.imageAlt ?? ""}
                    width={current.imageWidth ?? 1200}
                    height={current.imageHeight ?? 630}
                    sizes="(max-width: 980px) 100vw, 600px"
                  />
                ) : (
                  <>
                    <div className="tag">{current.mockTag ?? ""}</div>
                    <div className="headline">{current.mockHeadline ?? ""}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`case-info${swapClass}`}>
            <div className="case-meta">
              <span className="case-tag">
                <span className="dot" />
                <span id="caseTag">{current.tag}</span>
              </span>
              <span className="case-date" id="caseDate">
                {current.date}
              </span>
            </div>
            <div>
              <h3 id="caseTitle">{current.title}</h3>
              <p id="caseDesc">{current.desc}</p>
            </div>
            <a
              className="case-link"
              id="caseLink"
              href={linkHref}
              {...(hasUrl ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className="label mono" id="caseLinkLabel">
                {linkLabel}
              </span>
              <span className="circle-arrow">
                <ArrowUpRight stroke="#15181a" />
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
