"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import { heroScene } from "@/lib/motion";
import { useDocumentVisible } from "@/lib/use-document-visible";

// three.js is client-only and heavy: the spinner below covers the chunk download.
const MonitorScene = dynamic(() => import("./monitor-scene"), { ssr: false });

/** Longest wait for an idle moment before loading the scene anyway. */
const IDLE_TIMEOUT_MS = 1500;

/** True once the browser is idle after hydration, so parsing three.js stays away from early taps. */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 200);
    return () => clearTimeout(id);
  }, []);
  return idle;
}

export function LazyMonitorScene() {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const pageVisible = useDocumentVisible();
  const idle = useIdle();
  const [ready, setReady] = useState(false);

  return (
    <Box
      ref={container}
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
      {!ready && (
        <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="fg.muted" borderWidth="3px" aria-label={hero.sceneLoading} />
        </Box>
      )}
      <Box
        position="absolute"
        inset={0}
        opacity={ready ? 1 : 0}
        transitionProperty="opacity"
        transitionDuration={heroScene.fadeIn}
        transitionTimingFunction="enter"
      >
        {idle && <MonitorScene active={inView && pageVisible} onReady={() => setReady(true)} />}
      </Box>
    </Box>
  );
}
