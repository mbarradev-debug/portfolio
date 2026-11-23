"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { catchError } from "next/error";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroScene } from "@/lib/motion";
import { useDocumentVisible } from "@/lib/use-document-visible";

// three.js is client-only and heavy: the spinner below covers the chunk download.
const MonitorScene = dynamic(() => import("./monitor-scene"), { ssr: false });

/**
 * WebGL can be missing (hardware acceleration off, old devices, some managed
 * browsers). Checked before downloading three.js, whose renderer throws then.
 */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

/** Longest wait for an idle moment before loading the scene anyway. */
const IDLE_TIMEOUT_MS = 1500;

type LoadState = "waiting" | "load" | "unsupported";

/**
 * "load" once the browser is idle after hydration (so parsing three.js stays
 * away from early taps) and WebGL is available; "unsupported" otherwise.
 */
function useSceneLoad(): LoadState {
  const [state, setState] = useState<LoadState>("waiting");
  useEffect(() => {
    const decide = () => setState(supportsWebGL() ? "load" : "unsupported");
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(decide, { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(decide, 200);
    return () => clearTimeout(id);
  }, []);
  return state;
}

/** Reports the failure to the wrapper, which then hides the scene. */
function ReportFailure({ onFail }: { onFail: () => void }) {
  useEffect(onFail, [onFail]);
  return null;
}

/**
 * Error boundary around the canvas: if the scene throws (e.g. the WebGL context
 * can't be created or is lost), only the scene disappears, not the whole page.
 */
const SceneBoundary = catchError((props: { onFail: () => void }) => <ReportFailure onFail={props.onFail} />);

/** Alt text and loading label come from the server (Client Components can't read the dictionary). */
export function LazyMonitorScene({ alt, loadingLabel }: { alt: string; loadingLabel: string }) {
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container);
  const pageVisible = useDocumentVisible();
  const load = useSceneLoad();
  const [ready, setReady] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const fail = useCallback(() => setCrashed(true), []);

  // Without WebGL there is no scene to describe or wait for: leave it out.
  if (load === "unsupported" || crashed) return null;

  return (
    <Box
      ref={container}
      role="img"
      aria-label={alt}
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
          <Spinner size="xl" color="fg.muted" borderWidth="3px" aria-label={loadingLabel} />
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
        {load === "load" && (
          <SceneBoundary onFail={fail}>
            <MonitorScene active={inView && pageVisible} onReady={() => setReady(true)} />
          </SceneBoundary>
        )}
      </Box>
    </Box>
  );
}
