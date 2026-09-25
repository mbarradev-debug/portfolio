"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ComponentRef } from "react";
import { SCENE_SHIFT } from "@/lib/voxel-cat";
import { CatVoxels } from "./cat-voxels";
import { MonitorVoxels } from "./monitor-voxels";

/** World units that must fit in the shorter side of the canvas. */
const FRAME_SIZE = 23;
/** Orbit center, around the middle of the monitor + typing cat group. */
const TARGET: [number, number, number] = [0, 5.3, 0];
const DISTANCE = 40;
/** True isometric elevation (~35.26°); a 45° azimuth shows the screen and the cat's typing arms. */
const ELEVATION = Math.atan(1 / Math.SQRT2);
const AZIMUTH = Math.PI / 4;
const INTRO_SECONDS = 1.8;
/** Extra turns the camera spins through during the entrance, like craftz.dog's dog. */
const INTRO_TURNS = 1.5;

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

function positionAt(azimuth: number): [number, number, number] {
  const horizontal = DISTANCE * Math.cos(ELEVATION);
  return [
    TARGET[0] + horizontal * Math.sin(azimuth),
    TARGET[1] + DISTANCE * Math.sin(ELEVATION),
    TARGET[2] + horizontal * Math.cos(azimuth),
  ];
}

function Rig({ animate }: { animate: boolean }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const startedAt = useRef<number | null>(null);
  const [introDone, setIntroDone] = useState(!animate);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  // With frameloop="demand" the first frame can render before useFrame subscribes:
  // request another one whenever the canvas size changes so the zoom fit below runs.
  useEffect(() => invalidate(), [size, invalidate]);

  useFrame(({ camera, size, clock }) => {
    // Keep the model framed at any canvas size (resizes trigger a frame, even on demand).
    const zoom = Math.min(size.width, size.height) / FRAME_SIZE;
    if (camera.zoom !== zoom) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }

    if (introDone) return;
    if (startedAt.current === null) startedAt.current = clock.elapsedTime;
    const t = Math.min((clock.elapsedTime - startedAt.current) / INTRO_SECONDS, 1);
    const azimuth = AZIMUTH - (1 - easeOutCirc(t)) * INTRO_TURNS * Math.PI * 2;
    camera.position.set(...positionAt(azimuth));
    camera.lookAt(...TARGET);
    if (t >= 1) {
      controls.current?.update();
      setIntroDone(true);
    }
  });

  return (
    <OrbitControls
      ref={controls}
      target={TARGET}
      enabled={introDone}
      enableZoom={false}
      enablePan={false}
      autoRotate={animate && introDone}
      autoRotateSpeed={0.8}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

export default function MonitorScene() {
  const reducedMotion = useReducedMotion() ?? false;
  const animate = !reducedMotion;

  return (
    <Canvas
      orthographic
      flat
      dpr={[1, 2]}
      // Without motion there is nothing to animate: render only on user interaction.
      frameloop={animate ? "always" : "demand"}
      camera={{ position: positionAt(AZIMUTH), zoom: 30, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <group position={[SCENE_SHIFT.x, 0, SCENE_SHIFT.z]}>
        <MonitorVoxels animate={animate} />
        <CatVoxels animate={animate} />
      </group>
      <Rig animate={animate} />
    </Canvas>
  );
}
