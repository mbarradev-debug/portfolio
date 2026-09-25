import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after hydration, false during SSR and the hydration render. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
