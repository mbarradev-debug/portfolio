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

/** Task list fed by two services (auth and tasks) behind a BFF. */
export function TasklaneThumbnail() {
  const tasks = [
    { done: true, width: "70%" },
    { done: true, width: "55%" },
    { done: false, width: "80%" },
    { done: false, width: "45%" },
  ];
  return (
    <Flex
      aria-hidden="true"
      w="100%"
      h="200px"
      borderRadius="12px"
      bg="#16171a"
      p="16px"
      gap="10px"
      overflow="hidden"
    >
      <Flex flexGrow={1} direction="column" gap="8px" borderRadius="6px" bg="#232428" p="10px">
        {tasks.map((task, i) => (
          <Flex key={i} align="center" gap="8px" h="28px">
            <Box
              as="span"
              w="12px"
              h="12px"
              flexShrink={0}
              borderRadius="3px"
              border="2px solid"
              borderColor={task.done ? "#9AE6B4" : "#5b5e66"}
              bg={task.done ? "#9AE6B4" : "transparent"}
            />
            <Box as="span" w={task.width} h="6px" borderRadius="3px" bg={task.done ? "#5b5e66" : "#e9e6e0"} />
            <Box as="span" ml="auto" w="14px" h="14px" flexShrink={0} borderRadius="50%" bg="#88ccca" />
          </Flex>
        ))}
      </Flex>
      <Flex w="30%" direction="column" gap="8px">
        {["#88ccca", "#9AE6B4"].map((color) => (
          <Flex key={color} flexGrow={1} direction="column" justify="space-between" borderRadius="6px" bg="#232428" p="10px">
            <Box as="span" w="60%" h="6px" borderRadius="3px" bg={color} />
            <Flex gap="4px">
              <Box as="span" w="10px" h="10px" borderRadius="2px" bg="#3a3c42" />
              <Box as="span" w="10px" h="10px" borderRadius="2px" bg="#3a3c42" />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

/** Terminal running the skill: an issue becomes a branch and then a pull request. */
export function LinearIssueToPrThumbnail() {
  const lines = ["62%", "44%", "70%"];
  return (
    <Flex
      aria-hidden="true"
      w="100%"
      h="200px"
      borderRadius="12px"
      bg="#16171a"
      direction="column"
      overflow="hidden"
    >
      <Flex h="28px" bg="#232428" align="center" gap="6px" px="12px">
        {["#5b5e66", "#5b5e66", "#5b5e66"].map((color, i) => (
          <Box key={i} as="span" w="10px" h="10px" borderRadius="50%" bg={color} />
        ))}
      </Flex>
      <Flex flexGrow={1} direction="column" justify="center" gap="14px" px="20px">
        {lines.map((width, i) => (
          <Flex key={i} align="center" gap="8px">
            <Box as="span" w="6px" h="10px" bg="#9AE6B4" clipPath="polygon(0 0, 100% 50%, 0 100%)" />
            <Box as="span" w={width} h="6px" borderRadius="3px" bg={i === lines.length - 1 ? "#e9e6e0" : "#5b5e66"} />
          </Flex>
        ))}
        <svg width="100%" height="28" viewBox="0 0 200 28" preserveAspectRatio="xMinYMid meet">
          <circle cx="10" cy="14" r="7" fill="none" stroke="#88ccca" strokeWidth="2.5" />
          <line x1="22" y1="14" x2="60" y2="14" stroke="#3a3c42" strokeWidth="2.5" />
          <circle cx="72" cy="14" r="5" fill="#88ccca" />
          <line x1="82" y1="14" x2="120" y2="14" stroke="#3a3c42" strokeWidth="2.5" />
          <circle cx="132" cy="14" r="7" fill="#9AE6B4" />
          <path d="M128.5 14 L131 16.5 L135.5 11.5" fill="none" stroke="#16171a" strokeWidth="2" />
        </svg>
      </Flex>
    </Flex>
  );
}
