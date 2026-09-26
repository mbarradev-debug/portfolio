import { Box } from "@chakra-ui/react";
import { getContent } from "@/content";

export async function IntroGreeting() {
  const { hero } = await getContent();
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
