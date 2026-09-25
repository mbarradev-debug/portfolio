"use client";

import { Box, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { hero } from "@/lib/content";

function SceneSpinner() {
  return (
    <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" color="fg.muted" borderWidth="3px" aria-label={hero.sceneLoading} />
    </Box>
  );
}

// three.js is client-only and heavy: load it after hydration, showing a spinner meanwhile.
const MonitorScene = dynamic(() => import("./monitor-scene"), {
  ssr: false,
  loading: SceneSpinner,
});

export function LazyMonitorScene() {
  return (
    <Box
      role="img"
      aria-label={hero.sceneAlt}
      position="relative"
      w="100%"
      maxW={{ base: "320px", sm: "480px" }}
      h={{ base: "300px", sm: "420px" }}
      mx="auto"
      mt="12px"
      cursor="grab"
      _active={{ cursor: "grabbing" }}
    >
      <MonitorScene />
    </Box>
  );
}
