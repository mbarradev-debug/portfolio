import type { Metadata, Viewport } from "next";
import { Shell } from "../_shell";
import { buildMetadata } from "../_shared";
import "../globals.css";

export const metadata: Metadata = buildMetadata("en");

export const viewport: Viewport = {
  themeColor: "#15181a",
  colorScheme: "light",
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
