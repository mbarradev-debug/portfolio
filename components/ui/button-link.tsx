import { Link, type LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { focusRing, interactiveTransition, pressed } from "./interaction";

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
      {...interactiveTransition}
      _hover={{ textDecoration: "none", filter: solid ? "brightness(1.08)" : undefined, bg: solid ? undefined : "glass" }}
      _active={pressed}
      _focusVisible={focusRing}
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
