"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, Group, InstancedMesh, Object3D, ShaderMaterial } from "three";
import {
  MATERIALS,
  PALETTE,
  bezelTiles,
  buildVoxels,
  screenStates,
  type FaceShades,
  type SceneMaterial,
  type Voxel,
} from "@/lib/voxel-monitor";

/**
 * Unlit "flat isometric" shading: top faces get the top shade and side faces
 * blend between the left/right shades by their direction relative to the
 * camera, so the model keeps a flat voxel look while it rotates.
 */
const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;

  void main() {
    mat4 model = modelMatrix;
    #ifdef USE_INSTANCING
      model = modelMatrix * instanceMatrix;
    #endif
    vWorldNormal = normalize(mat3(model) * normal);
    vViewNormal = normalize(mat3(viewMatrix) * vWorldNormal);
    gl_Position = projectionMatrix * viewMatrix * model * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uLeft;
  uniform vec3 uRight;
  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;

  void main() {
    vec3 color;
    if (vWorldNormal.y > 0.5) {
      color = uTop;
    } else if (vWorldNormal.y < -0.5) {
      color = uLeft;
    } else {
      // At the isometric angle side normals sit at view x = ±0.707 -> pure left/right shade.
      float t = clamp(vViewNormal.x * 0.7071 + 0.5, 0.0, 1.0);
      color = mix(uLeft, uRight, t);
    }
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export function createMaterial(shades: FaceShades) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTop: { value: new Color(shades.top) },
      uLeft: { value: new Color(shades.left) },
      uRight: { value: new Color(shades.right) },
    },
  });
}

export function VoxelGroup({
  voxels,
  geometry,
  material,
}: {
  voxels: Voxel[];
  geometry: BoxGeometry;
  material: ShaderMaterial;
}) {
  const ref = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new Object3D();
    voxels.forEach((voxel, i) => {
      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [voxels]);

  return <instancedMesh ref={ref} args={[geometry, material, voxels.length]} />;
}

/** Thin tiles sit just in front of the voxel face they decorate (pixels, slot, LED). */
const TILE_SIZE = 0.86;
const TILE_DEPTH = 0.06;
const TILE_OFFSET = 0.5 + TILE_DEPTH / 2;

const onFace = (voxels: Voxel[]) => voxels.map((v) => ({ ...v, z: v.z + TILE_OFFSET }));

/** Screen loop: prompt with a blinking cursor, then a smiley, in seconds. */
const PROMPT_SECONDS = 4;
const FACE_SECONDS = 2;
const CURSOR_BLINK_SECONDS = 0.5;

function Screen({
  geometry,
  material,
  animate,
}: {
  geometry: BoxGeometry;
  material: ShaderMaterial;
  animate: boolean;
}) {
  const prompt = useRef<Group>(null);
  const cursor = useRef<Group>(null);
  const face = useRef<Group>(null);
  const tiles = useMemo(
    () => ({
      prompt: onFace(screenStates.prompt),
      cursor: onFace(screenStates.cursor),
      face: onFace(screenStates.face),
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (!animate || !prompt.current || !cursor.current || !face.current) return;
    const t = clock.elapsedTime % (PROMPT_SECONDS + FACE_SECONDS);
    const showPrompt = t < PROMPT_SECONDS;
    prompt.current.visible = showPrompt;
    cursor.current.visible = showPrompt && Math.floor(t / CURSOR_BLINK_SECONDS) % 2 === 0;
    face.current.visible = !showPrompt;
  });

  // Without motion the screen stays on the smiley.
  return (
    <>
      <group ref={prompt} visible={animate}>
        <VoxelGroup voxels={tiles.prompt} geometry={geometry} material={material} />
      </group>
      <group ref={cursor} visible={animate}>
        <VoxelGroup voxels={tiles.cursor} geometry={geometry} material={material} />
      </group>
      <group ref={face} visible={!animate}>
        <VoxelGroup voxels={tiles.face} geometry={geometry} material={material} />
      </group>
    </>
  );
}

export function MonitorVoxels({ animate }: { animate: boolean }) {
  const voxels = useMemo(() => buildVoxels(), []);
  const cube = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const tile = useMemo(() => new BoxGeometry(TILE_SIZE, TILE_SIZE, TILE_DEPTH), []);
  const materials = useMemo(
    () =>
      Object.fromEntries(MATERIALS.map((name) => [name, createMaterial(PALETTE[name])])) as Record<
        SceneMaterial,
        ShaderMaterial
      >,
    [],
  );
  const bezel = useMemo(() => {
    const byMaterial = new Map<SceneMaterial, Voxel[]>();
    for (const { material, ...position } of bezelTiles) {
      byMaterial.set(material, [...(byMaterial.get(material) ?? []), position]);
    }
    return [...byMaterial].map(([material, list]) => ({ material, voxels: onFace(list) }));
  }, []);

  return (
    <group>
      {MATERIALS.filter((name) => voxels[name].length > 0).map((name) => (
        <VoxelGroup key={name} voxels={voxels[name]} geometry={cube} material={materials[name]} />
      ))}
      {bezel.map(({ material, voxels: list }) => (
        <VoxelGroup key={`bezel-${material}`} voxels={list} geometry={tile} material={materials[material]} />
      ))}
      <Screen geometry={tile} material={materials.pixel} animate={animate} />
    </group>
  );
}
