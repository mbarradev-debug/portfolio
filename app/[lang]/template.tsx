"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { MAIN_ID } from "@/components/layout/main-id";

/** Path of the document's first page; any later path means a client navigation. */
let initialPath: string | null = null;
let hasNavigated = false;

/**
 * Remounts on every navigation. The page's enter animation is the sections'
 * own reveal (one animation layer), so this template only restores focus and
 * scroll: keyboard and screen-reader users land on the new page's content.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (initialPath === null) {
      initialPath = pathname;
      return;
    }
    // A remount on the first page (e.g. React strict mode in dev) is not a navigation.
    if (!hasNavigated && pathname === initialPath) return;
    hasNavigated = true;

    // Links like "/#proyectos" scroll to their section; everything else starts at the top.
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById(MAIN_ID)?.focus({ preventScroll: true });
  }, [pathname]);

  return children;
}
