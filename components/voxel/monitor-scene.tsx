"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, type ComponentRef, type RefObject } from "react";
import { Box3, Sphere, type Group, type Vector3 } from "three";
import { heroScene } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SCENE_SHIFT } from "@/lib/voxel-cat";
import { CatVoxels } from "./cat-voxels";
import { MonitorVoxels } from "./monitor-voxels";

const DISTANCE = 40;
/** True isometric elevation (~35.26°); a 45° azimuth shows the screen and the cat's typing arms. */
const ELEVATION = Math.atan(1 / Math.SQRT2);
const AZIMUTH = Math.PI / 4;
/** Breathing room around the model's bounding sphere. */
const FRAME_MARGIN = 1.04;
/** Drag limits: never look straight down, never go below the desk. */
const MIN_POLAR = 0.35;
const MAX_POLAR = Math.PI / 2 - 0.1;

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

type Framing = { center: Vector3; radius: number };
type Phase = "intro" | "rotating" | "idle";

function positionAt(azimuth: number, center: Vector3): [number, number, number] {
  const horizontal = DISTANCE * Math.cos(ELEVATION);
  return [
    center.x + horizontal * Math.sin(azimuth),
    center.y + DISTANCE * Math.sin(ELEVATION),
    center.z + horizontal * Math.cos(azimuth),
  ];
}

function Rig({
  animate,
  active,
  content,
  onFramed,
}: {
  animate: boolean;
  /** Off-screen or hidden tab: auto-rotation would keep requesting frames, so it pauses too. */
  active: boolean;
  content: RefObject<Group | null>;
  onFramed: () => void;
}) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const introStartedAt = useRef<number | null>(null);
  const rotateStartedAt = useRef<number | null>(null);
  const [framing, setFraming] = useState<Framing | null>(null);
  const framedNotified = useRef(false);
  // Always start in "intro": with reduced motion it resolves on the first frame to the final pose.
  const [phase, setPhase] = useState<Phase>("intro");
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  // With frameloop="demand" the first frame can render before useFrame subscribes, and a
  // reduced-motion change must settle the camera: request a frame when either changes.
  useEffect(() => invalidate(), [size, animate, invalidate]);

  useFrame(({ camera, size, clock }) => {
    // Frame the model by its bounding sphere, so no drag angle can crop it.
    if (!framing) {
      if (!content.current) return;
      const sphere = new Box3().setFromObject(content.current).getBoundingSphere(new Sphere());
      setFraming({ center: sphere.center, radius: sphere.radius });
      return;
    }
    const zoom = Math.min(size.width, size.height) / (2 * framing.radius * FRAME_MARGIN);
    if (camera.zoom !== zoom) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }

    if (phase === "intro") {
      const t = animate
        ? Math.min((clock.elapsedTime - (introStartedAt.current ??= clock.elapsedTime)) / heroScene.introSeconds, 1)
        : 1;
      const azimuth = AZIMUTH - (1 - easeOutCirc(t)) * heroScene.introTurns * Math.PI * 2;
      camera.position.set(...positionAt(azimuth, framing.center));
      camera.lookAt(framing.center);
      if (!framedNotified.current) {
        framedNotified.current = true;
        onFramed();
      }
      if (t >= 1) {
        controls.current?.update();
        rotateStartedAt.current = clock.elapsedTime;
        setPhase(animate ? "rotating" : "idle");
      }
    } else if (phase === "rotating") {
      const rotated = clock.elapsedTime - (rotateStartedAt.current ?? clock.elapsedTime);
      if (!animate || rotated >= heroScene.autoRotateSeconds) setPhase("idle");
    }
  });

  if (!framing) return null;

  return (
    <OrbitControls
      ref={controls}
      target={framing.center}
      enabled={phase !== "intro"}
      enableZoom={false}
      enablePan={false}
      // Damping keeps requesting frames while it settles; pause it off-screen too.
      enableDamping={active}
      autoRotate={phase === "rotating" && active}
      autoRotateSpeed={0.8}
      minPolarAngle={MIN_POLAR}
      maxPolarAngle={MAX_POLAR}
      // The first drag hands the camera to the user for good.
      onStart={() => setPhase((current) => (current === "rotating" ? "idle" : current))}
    />
  );
}

type MonitorSceneProps = {
  /** False when the hero is off-screen or the tab is hidden: no continuous rendering. */
  active: boolean;
  /** Called once the camera is framed, so the wrapper can fade the canvas in. */
  onReady: () => void;
};

export default function MonitorScene({ active, onReady }: MonitorSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const animate = !reducedMotion;
  const content = useRef<Group>(null);

  return (
    <Canvas
      orthographic
      flat
      dpr={[1, 2]}
      // Render continuously only while something can move on screen; otherwise
      // only on demand (drag, resize).
      frameloop={animate && active ? "always" : "demand"}
      camera={{ position: [DISTANCE, DISTANCE, DISTANCE], zoom: 30, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <group ref={content} position={[SCENE_SHIFT.x, 0, SCENE_SHIFT.z]}>
        <MonitorVoxels animate={animate} />
        <CatVoxels animate={animate} />
      </group>
      <Rig animate={animate} active={active} content={content} onFramed={onReady} />
    </Canvas>
  );
}
