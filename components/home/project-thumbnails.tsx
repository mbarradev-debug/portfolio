import { Box, Flex, Grid } from "@chakra-ui/react";

// Decorative CSS mockups from the prototype. They use fixed "screen" colors in both modes.

const tiles = [
  { label: "50%", value: "80%", valueColor: "#88ccca" },
  { label: "40%", value: "70%", valueColor: "#e9e6e0" },
  { label: "55%", value: "60%", valueColor: "#e9e6e0" },
  { label: "45%", value: "75%", valueColor: "#e9e6e0" },
];

export function PulsoThumbnail() {
  return (
    <Flex
      aria-hidden="true"
      w="100%"
      h="200px"
      borderRadius="12px"
      bg="#16171a"
      p="16px"
      direction="column"
      gap="10px"
      overflow="hidden"
    >
      <Grid templateColumns="repeat(4, minmax(0, 1fr))" gap="8px">
        {tiles.map((tile, i) => (
          <Flex key={i} h="42px" borderRadius="6px" bg="#232428" p="8px" direction="column" gap="6px">
            <Box as="span" w={tile.label} h="5px" borderRadius="3px" bg="#5b5e66" />
            <Box as="span" w={tile.value} h="8px" borderRadius="3px" bg={tile.valueColor} />
          </Flex>
        ))}
      </Grid>
      <Box flexGrow={1} borderRadius="6px" bg="#232428" p="10px">
        <svg width="100%" height="100%" viewBox="0 0 300 90" preserveAspectRatio="none">
          <polyline
            points="0,70 25,66 50,68 75,58 100,60 125,50 150,52 175,40 200,44 225,32 250,34 275,22 300,18"
            fill="none"
            stroke="#88ccca"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <line x1="0" y1="89" x2="300" y2="89" stroke="#3a3c42" strokeWidth="1" />
        </svg>
      </Box>
    </Flex>
  );
}

export function ExtensionThumbnail() {
  const rows = [
    { label: "UF", width: "56px" },
    { label: "USD", width: "48px" },
  ];
  return (
    <Flex
      aria-hidden="true"
      w="100%"
      h="200px"
      borderRadius="12px"
      bg="#16171a"
      align="center"
      justify="center"
      overflow="hidden"
      position="relative"
    >
      <Flex position="absolute" top={0} left={0} right={0} h="28px" bg="#232428" align="center" gap="6px" px="12px" justify="flex-end">
        <Box as="span" w="16px" h="16px" borderRadius="4px" bg="#88ccca" />
        <Box as="span" w="16px" h="16px" borderRadius="4px" bg="#3a3c42" />
      </Flex>
      <Flex w="170px" mt="28px" borderRadius="10px" bg="#f0e7db" color="#202023" p="12px" direction="column" gap="8px" fontSize="11px" fontWeight="700">
        {rows.map((row) => (
          <Flex key={row.label} justify="space-between" align="center">
            <span>{row.label}</span>
            <Box as="span" w={row.width} h="8px" borderRadius="3px" bg="#202023" />
          </Flex>
        ))}
        <Box h="1px" bg="rgba(32,32,35,0.2)" />
        <Flex gap="6px">
          <Box as="span" flexGrow={1} h="20px" borderRadius="4px" border="1px solid rgba(32,32,35,0.35)" />
          <Box as="span" w="34px" h="20px" borderRadius="4px" bg="#319795" />
        </Flex>
      </Flex>
    </Flex>
  );
}
