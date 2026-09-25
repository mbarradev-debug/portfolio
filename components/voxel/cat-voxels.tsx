"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BoxGeometry, type Mesh, type ShaderMaterial } from "three";
import {
  CAT_MATERIALS,
  CAT_PALETTE,
  PAWS,
  buildCatVoxels,
  buildKeycaps,
  type CatMaterial,
} from "@/lib/voxel-cat";
import { VoxelGroup, createMaterial } from "./monitor-voxels";

/** Keycaps are small cubes on top of the keyboard base, with gaps between them. */
const KEYCAP_SIZE = 0.72;
const KEYCAP_HEIGHT = 0.3;
/** Typing speed (radians/s) and how high a paw lifts, in voxels. */
const TYPING_SPEED = 14;
const PAW_LIFT = 0.35;

function TypingPaws({
  geometry,
  material,
  animate,
}: {
  geometry: BoxGeometry;
  material: ShaderMaterial;
  animate: boolean;
}) {
  const paws = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * TYPING_SPEED;
    paws.current.forEach((paw, i) => {
      const rest = PAWS[i];
      if (!paw || !rest) return;
      // Alternate paws; only the upper half of the wave lifts, so each paw lands on the keys.
      // Without motion (even when switched mid-session) the paws rest on the keys.
      paw.position.y = animate ? rest.y + Math.max(0, Math.sin(t + i * Math.PI)) * PAW_LIFT : rest.y;
    });
  });

  return PAWS.map((rest, i) => (
    <mesh
      key={i}
      ref={(mesh) => {
        paws.current[i] = mesh;
      }}
      geometry={geometry}
      material={material}
      position={[rest.x, rest.y, rest.z]}
    />
  ));
}

/** The cat typing on its keyboard, rendered with the monitor's flat voxel shading. */
export function CatVoxels({ animate }: { animate: boolean }) {
  const voxels = useMemo(() => buildCatVoxels(), []);
  const keycaps = useMemo(() => {
    const { keys, enter } = buildKeycaps();
    // Cell centers sit 0.5 above the base top; move caps down so they rest on it.
    const drop = 0.5 - KEYCAP_HEIGHT / 2;
    const onBase = (v: { x: number; y: number; z: number }) => ({ ...v, y: v.y - drop });
    return { keys: keys.map(onBase), enter: [onBase(enter)] };
  }, []);
  const cube = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const keycap = useMemo(() => new BoxGeometry(KEYCAP_SIZE, KEYCAP_HEIGHT, KEYCAP_SIZE), []);
  const materials = useMemo(
    () =>
      Object.fromEntries(
        CAT_MATERIALS.map((name) => [name, createMaterial(CAT_PALETTE[name])]),
      ) as Record<CatMaterial, ShaderMaterial>,
    [],
  );

  return (
    <>
      {CAT_MATERIALS.filter((name) => voxels[name].length > 0).map((name) => (
        <VoxelGroup key={name} voxels={voxels[name]} geometry={cube} material={materials[name]} />
      ))}
      <VoxelGroup voxels={keycaps.keys} geometry={keycap} material={materials.keycap} />
      <VoxelGroup voxels={keycaps.enter} geometry={keycap} material={materials.enterKey} />
      <TypingPaws geometry={cube} material={materials.cream} animate={animate} />
    </>
  );
}
