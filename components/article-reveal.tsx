"use client";

import { useEffect, useState, type ReactNode } from "react";

// Ported from /legacy-reference/css/style.css (.article, .article.loaded)
// and js/app.js's `requestAnimationFrame(() => article.classList.add(
// 'loaded'))`. Unlike Reveal, this isn't scroll-linked — it's a one-time
// fade-in shortly after mount, wrapping the whole page's content.
export function ArticleReveal({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const classes = [
    "[transition:opacity_0.4s_ease,transform_0.4s_ease]",
    "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
    loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
  ].join(" ");

  return <article className={classes}>{children}</article>;
}
