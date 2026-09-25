import { Link, type LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = Omit<LinkProps, "href" | "asChild"> & {
  href: string;
  variant?: "solid" | "outline";
  download?: boolean;
  children: ReactNode;
};

/** 44px-tall link styled as the prototype's teal buttons. */
export function ButtonLink({
  href,
  variant = "solid",
  download,
  children,
  ...rest
}: ButtonLinkProps) {
  const isRoute = href.startsWith("/") && !download;
  const solid = variant === "solid";

  return (
    <Link
      asChild
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap="6px"
      h="44px"
      px="18px"
      borderRadius="6px"
      fontWeight="600"
      textDecoration="none"
      bg={solid ? "btn.bg" : "transparent"}
      color={solid ? "btn.fg" : "ghost"}
      border={solid ? undefined : "1px solid"}
      borderColor={solid ? undefined : "ghost"}
      transition="filter 0.2s, background 0.2s"
      _hover={{ textDecoration: "none", filter: solid ? "brightness(1.08)" : undefined, bg: solid ? undefined : "glass" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
      {...rest}
    >
      {isRoute ? (
        <NextLink href={href}>{children}</NextLink>
      ) : (
        <a href={href} download={download || undefined}>
          {children}
        </a>
      )}
    </Link>
  );
}
