import { Link, type LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

type TextLinkProps = Omit<LinkProps, "href" | "asChild"> & { href: string };

/** Inline link in the accent link color; internal routes use next/link. */
export function TextLink({ href, children, ...rest }: TextLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const isExternal = href.startsWith("http");

  return (
    <Link
      asChild
      display="inline"
      color="link"
      textDecoration="none"
      textUnderlineOffset="3px"
      _hover={{ textDecoration: "underline" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
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
