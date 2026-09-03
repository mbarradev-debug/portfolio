"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CloseIcon, MenuIcon } from "@/components/ui";
import type { NavItem } from "@/content";
import { Link, usePathname } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./MobileNav.module.css";

type MobileNavLabels = {
  open: string;
  close: string;
  dialog: string;
};

type MobileNavProps = {
  items: readonly NavItem[];
  /** Localised labels for each item, keyed by `NavItem.key`. */
  itemLabels: Record<string, string>;
  labels: MobileNavLabels;
};

/**
 * Client leaf: the burger button (lives in the Server `SiteHeader`) plus the
 * full-screen menu it controls. Modal dialog with focus trap, `Esc` to close,
 * background scroll lock, focus returned to the burger, and auto-close on
 * navigation. The menu is only in the DOM while open.
 */
export function MobileNav({ items, itemLabels, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dialogId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Close on route change (e.g. browser back/forward while open).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const burger = burgerRef.current;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      [...dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
        (el) => el.offsetParent !== null
      );
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      burger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className={styles.burger}
        aria-label={labels.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dialogRef}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-label={labels.dialog}
            className={styles.dialog}
          >
            <button
              type="button"
              className={styles.close}
              aria-label={labels.close}
              onClick={close}
            >
              <CloseIcon />
            </button>
            {items.map((item) => (
              <Link key={item.key} href={`/${item.href}`} className={styles.link} onClick={close}>
                {itemLabels[item.key]}
              </Link>
            ))}
            <div className={styles.actions}>
              <LanguageSwitcher />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
