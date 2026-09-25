import { Fragment } from "react";
import type { RichText as RichTextData } from "@/lib/content";
import { TextLink } from "./text-link";

export function RichText({ value }: { value: RichTextData }) {
  return value.map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <TextLink key={i} href={part.href}>
        {part.text}
      </TextLink>
    ),
  );
}
