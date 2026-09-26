import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";

/** Same title as not-found.tsx, so the 404 title survives hydration. */
export async function generateMetadata(): Promise<Metadata> {
  const { notFound: copy } = await getContent();
  return { title: copy.metaTitle, robots: { index: false } };
}

/** Unknown paths inside a locale render that locale's not-found page. */
export default function CatchAll() {
  notFound();
}
