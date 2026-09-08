"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/content";

const STORAGE_KEY = "locale";
const CHANGE_EVENT = "localechange";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleCtx>({
  locale: "es",
  setLocale: () => {},
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
 * El sitio se sirve en español (SSR); `useSyncExternalStore` usa el snapshot de
 * servidor ("es") también en el primer render de cliente y, tras hidratar,
 * re-renderiza con el idioma real (preferencia guardada o navegador). Un
 * visitante con navegador en inglés puede percibir un cambio de un frame
 * ES→EN al hidratar: es el coste de servir HTML estático.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readLocale,
    () => "es" as Locale,
  );

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* sin persistencia; el evento igual actualiza la sesión */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
