"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/content";
import { LOCALE_SWAP_MS } from "@/lib/motion";

const STORAGE_KEY = "locale";
const CHANGE_EVENT = "localechange";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** true mientras el contenido se desvanece antes de sustituir los textos. */
  swapping: boolean;
}

const LocaleContext = createContext<LocaleCtx>({
  locale: "es",
  setLocale: () => {},
  swapping: false,
});

export function useLocale() {
  return useContext(LocaleContext);
}

// Preferencia guardada (gana siempre) > idioma del navegador > español.
function readLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* localStorage no disponible */
  }
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "es";
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * El sitio se sirve en español (SSR). `target` es el idioma real (preferencia
 * guardada o navegador); `displayed` va por detrás durante el crossfade: primero
 * se desvanece el contenido actual, luego se cambia el idioma. Esto también
 * enmascara el salto ES→EN de un frame que ocurre al hidratar cuando el
 * navegador está en inglés. Con `prefers-reduced-motion` el cambio es inmediato.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const target = useSyncExternalStore(
    subscribe,
    readLocale,
    () => "es" as Locale,
  );
  const [displayed, setDisplayed] = useState<Locale>("es");
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (target === displayed) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const delay = reduce ? 0 : LOCALE_SWAP_MS;
    if (delay) {
      // Inicia el fade-out; el cambio de textos real va en el timer de abajo.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSwapping(true);
    }
    const t = window.setTimeout(() => {
      setDisplayed(target);
      setSwapping(false);
    }, delay);
    return () => window.clearTimeout(t);
  }, [target, displayed]);

  useEffect(() => {
    document.documentElement.lang = displayed;
  }, [displayed]);

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* sin persistencia; el evento igual actualiza la sesión */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <LocaleContext.Provider value={{ locale: displayed, setLocale, swapping }}>
      {children}
    </LocaleContext.Provider>
  );
}
