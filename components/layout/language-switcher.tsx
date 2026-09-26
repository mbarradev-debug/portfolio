"use client";

import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { focusRing, interactiveTransition, pressed } from "@/components/ui/interaction";
import type { Content } from "@/content";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, locales, switchLocale, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  current: Locale;
  labels: Content["site"]["languageSwitcher"];
};

/** Remembers the choice; proxy.ts prefers this cookie over Accept-Language. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/** ES | EN segmented control: links to the same page in the other language. */
export function LanguageSwitcher({ current, labels }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <Flex
      role="group"
      aria-label={labels.label}
      h="44px"
      p="3px"
      gap="2px"
      flexShrink={0}
      borderRadius="8px"
      border="1px solid"
      borderColor="border"
      align="stretch"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            asChild
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW="30px"
            px="4px"
            borderRadius="5px"
            fontSize="13px"
            fontWeight="700"
            textTransform="uppercase"
            textDecoration="none"
            color={active ? "ink" : "fg"}
            bg={active ? "brand" : undefined}
            {...interactiveTransition}
            _hover={{ textDecoration: "none", bg: active ? "brand" : "glass" }}
            _active={pressed}
            _focusVisible={{ ...focusRing, outlineOffset: "0px" }}
          >
            <NextLink
              href={switchLocale(pathname, locale)}
              hrefLang={locale}
              lang={locale}
              // Accessible name includes the visible code ("ES"), per WCAG 2.5.3.
              aria-label={`${labels[locale]} (${locale.toUpperCase()})`}
              aria-current={active ? "true" : undefined}
              onClick={() => rememberLocale(locale)}
            >
              {locale}
            </NextLink>
          </Link>
        );
      })}
    </Flex>
  );
}
