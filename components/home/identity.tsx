import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { hero } from "@/lib/content";

function AvailabilityPill() {
  return (
    <Flex
      as="span"
      display="inline-flex"
      align="center"
      gap="8px"
      fontSize="13px"
      px="10px"
      py="4px"
      borderRadius="999px"
      bg="badge.bg"
      color="badge.fg"
      fontWeight="600"
    >
      <Box as="span" w="8px" h="8px" borderRadius="50%" bg="badge.fg" aria-hidden="true" />
      {hero.availability}
    </Flex>
  );
}

/** Avatar placeholder with initials until the real photo exists (see README). */
function Avatar() {
  return (
    <Flex
      role="img"
      aria-label={hero.avatarAlt}
      w="100px"
      h="100px"
      flexShrink={0}
      borderRadius="50%"
      border="2px solid rgba(255,255,255,0.8)"
      overflow="hidden"
      bg="brand"
      align="center"
      justify="center"
      fontFamily="heading"
      fontWeight="800"
      fontSize="30px"
      color="ink"
    >
      <span aria-hidden="true">{hero.avatarInitials}</span>
    </Flex>
  );
}

export function Identity() {
  return (
    <Flex
      direction={{ base: "column-reverse", sm: "row" }}
      align={{ base: "flex-start", sm: "center" }}
      gap="24px"
    >
      <Flex direction="column" gap="4px" flexGrow={1}>
        <Heading
          as="h1"
          m={0}
          fontFamily="heading"
          fontWeight="800"
          fontSize={{ base: "32px", sm: "36px" }}
          lineHeight="1.2"
          letterSpacing="-0.01em"
        >
          {hero.name}
        </Heading>
        <Text m={0} fontSize="17px">
          {hero.role}
        </Text>
        <Text m={0} color="fg.muted" fontSize="15px">
          {hero.tagline}
        </Text>
        <Flex mt="8px">
          <AvailabilityPill />
        </Flex>
      </Flex>
      <Box alignSelf={{ base: "center", sm: "auto" }}>
        <Avatar />
      </Box>
    </Flex>
  );
}
