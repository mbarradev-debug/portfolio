import { Box } from "@chakra-ui/react";
import { hero } from "@/lib/content";

export function IntroGreeting() {
  return (
    <Box
      borderRadius="8px"
      p="12px"
      textAlign="center"
      bg="glass"
      backdropFilter="blur(10px)"
      mb="24px"
    >
      {hero.greeting}
    </Box>
  );
}
