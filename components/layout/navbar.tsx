"use client";

import { Box, Flex, Link, Menu, Portal, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon, LogoMark, MenuIcon } from "@/components/icons";
import { focusRing, interactiveTransition, pressed } from "@/components/ui/interaction";
import { cvNavItem, navItems, site, type NavItem } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";

function isActive(item: NavItem, pathname: string) {
  // "Proyectos" stays highlighted inside any case study, as in the prototype.
  return item.href === "/#proyectos" && pathname.startsWith("/projects");
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      asChild
      display="flex"
      alignItems="center"
      gap="6px"
      px="10px"
      py="6px"
      borderRadius="6px"
      color={active ? "ink" : "fg"}
      bg={active ? "brand" : undefined}
      textDecoration="none"
      {...interactiveTransition}
      _hover={{ textDecoration: "underline", bg: active ? "brand" : "glass" }}
      _active={pressed}
      _focusVisible={focusRing}
    >
      <NextLink
        href={item.href}
        aria-current={active ? "page" : undefined}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {item.icon && <Icon name={item.icon} size={16} />}
        {item.label}
      </NextLink>
    </Link>
  );
}

function MobileMenu() {
  const items = [...navItems, cvNavItem];
  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <chakra.button
          type="button"
          aria-label={site.menuLabel}
          w="44px"
          h="44px"
          borderRadius="8px"
          border="1px solid"
          borderColor="border"
          color="fg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          {...interactiveTransition}
          _hover={{ bg: "glass" }}
          _active={pressed}
          _focusVisible={focusRing}
        >
          <MenuIcon size={20} />
        </chakra.button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="bg"
            borderWidth="1px"
            borderColor="border"
            minW="200px"
            // Shared motion tokens; reduced motion is handled by the global rule in lib/theme.ts.
            _open={{ animationDuration: "short", animationTimingFunction: "enter" }}
            _closed={{ animationDuration: "micro", animationTimingFunction: "exit" }}
          >
            {items.map((item) => (
              <Menu.Item
                key={item.href}
                value={item.href}
                asChild
                minH="44px"
                color="fg"
                // Keyboard/pointer highlight uses the site's surface and the shared focus ring.
                _highlighted={{ bg: "glass", ...focusRing, outlineOffset: "-2px" }}
              >
                {item === cvNavItem ? (
                  <a href={item.href} download>
                    <Icon name="download" size={16} />
                    {item.label}
                  </a>
                ) : (
                  <NextLink
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.icon && <Icon name={item.icon} size={16} />}
                    {item.label}
                  </NextLink>
                )}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
      h="60px"
      bg="nav"
      backdropFilter="blur(10px)"
      display="flex"
      justifyContent="center"
    >
      <Flex
        as="nav"
        aria-label={site.mainNavLabel}
        w="100%"
        maxW="768px"
        align="center"
        gap={{ base: 3, md: "28px" }}
        px="16px"
      >
        <Link
          asChild
          display="flex"
          alignItems="center"
          gap="8px"
          color="fg"
          fontFamily="heading"
          fontWeight="800"
          fontSize="18px"
          letterSpacing="-0.02em"
          textDecoration="none"
          whiteSpace="nowrap"
          _hover={{ textDecoration: "underline" }}
          _focusVisible={focusRing}
        >
          <NextLink href="/">
            <LogoMark />
            {site.name}
          </NextLink>
        </Link>

        <Flex
          display={{ base: "none", md: "flex" }}
          gap="6px"
          flexGrow={1}
          fontSize="15px"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item, pathname)} />
          ))}
        </Flex>

        <Link
          asChild
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="6px"
          color="fg"
          fontSize="15px"
          px="12px"
          py="7px"
          borderRadius="6px"
          border="1px solid"
          borderColor="border"
          textDecoration="none"
          {...interactiveTransition}
          _hover={{ textDecoration: "underline", bg: "glass" }}
          _active={pressed}
          _focusVisible={focusRing}
        >
          <a href={cvNavItem.href} download>
            <Icon name="download" size={15} />
            {cvNavItem.label}
          </a>
        </Link>

        <Flex ml={{ base: "auto", md: 0 }} gap={2} align="center">
          <ThemeToggle />
          <Box display={{ base: "block", md: "none" }}>
            <MobileMenu />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
