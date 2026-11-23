"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "@/content/types";

type ErrorCopy = Content["error"];

const ErrorCopyContext = createContext<ErrorCopy | null>(null);

/**
 * Error boundaries are Client Components and can't read the dictionary, so the
 * layout hands them their copy through this context.
 */
export function ErrorCopyProvider({ value, children }: { value: ErrorCopy; children: ReactNode }) {
  return <ErrorCopyContext.Provider value={value}>{children}</ErrorCopyContext.Provider>;
}

export function useErrorCopy(): ErrorCopy {
  const copy = useContext(ErrorCopyContext);
  if (!copy) throw new Error("useErrorCopy must be used inside ErrorCopyProvider");
  return copy;
}
