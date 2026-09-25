import { Link, type LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { focusRing } from "./interaction";

type TextLinkProps = Omit<LinkProps, "href" | "asChild"> & {
  href: string;
  /** Underline at rest: required for links inside running text, so color isn't the only cue. */
  underline?: boolean;
};

/** Inline link in the accent link color; internal routes use next/link. */
export function TextLink({ href, underline = false, children, ...rest }: TextLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const isExternal = href.startsWith("http");

  return (
    <Link
      asChild
      display="inline"
      color="link"
      textDecoration={underline ? "underline" : "none"}
      textDecorationThickness="1px"
      textUnderlineOffset="3px"
      _hover={{ textDecoration: "underline", textDecorationThickness: "2px" }}
      _focusVisible={focusRing}
      {...rest}
    >
      {isInternal ? (
        <NextLink href={href}>{children}</NextLink>
      ) : (
        <a href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )}
    </Link>
  );
}
