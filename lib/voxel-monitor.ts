/**
 * Voxel retro CRT monitor with a face: the hero scene.
 *
 * Grid coordinates (1 unit = 1 voxel): x = left → right as seen from the front,
 * y = up, z = back → front. The screen faces +z.
 */

export interface Voxel {
  x: number;
  y: number;
  z: number;
}

/** Face shades like the prototype's voxel SVG: lit top, mid right side, dark left side. */
export interface FaceShades {
  top: string;
  right: string;
  left: string;
}

export type SceneMaterial = "shell" | "screen" | "slot" | "pixel" | "led";

const flat = (color: string): FaceShades => ({ top: color, right: color, left: color });

export const PALETTE: Record<SceneMaterial, FaceShades> = {
  // Retro beige casing (the only color not taken from the prototype).
  shell: { top: "#ddd6c8", right: "#c2baab", left: "#a8a092" },
  // The rest comes from the prototype: mockup screen, teal accent, green badge, key gray.
  screen: flat("#16171a"),
  slot: flat("#3a3c42"),
  pixel: flat("#88ccca"),
  led: flat("#9AE6B4"),
};

type Range = [number, number];
type Cells = Map<string, SceneMaterial>;

function box(cells: Cells, material: SceneMaterial, [x0, x1]: Range, [y0, y1]: Range, [z0, z1]: Range) {
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++) cells.set(`${x},${y},${z}`, material);
}

/** Screen area (recessed one voxel behind the bezel). */
const SCREEN = { x: [-4, 4] as Range, y: [4, 10] as Range, z: 6 };
const FRONT_Z = 7;

function buildBody(): Cells {
  const cells: Cells = new Map();

  // Foot and neck.
  box(cells, "shell", [-4, 4], [0, 0], [1, 6]);
  box(cells, "shell", [-2, 2], [1, 1], [2, 5]);

  // Front housing with the bezel; the screen sits one voxel deeper.
  box(cells, "shell", [-6, 6], [2, 12], [5, FRONT_Z]);
  box(cells, "screen", SCREEN.x, SCREEN.y, [SCREEN.z, SCREEN.z]);
  for (let x = SCREEN.x[0]; x <= SCREEN.x[1]; x++)
    for (let y = SCREEN.y[0]; y <= SCREEN.y[1]; y++) cells.delete(`${x},${y},${FRONT_Z}`);

  // Tapered CRT back.
  box(cells, "shell", [-5, 5], [3, 11], [2, 4]);
  box(cells, "shell", [-3, 3], [4, 10], [0, 1]);

  return cells;
}

/**
 * Thin tiles glued to a front face: screen pixels, the floppy slot and the power LED.
 * `col`/`row` are relative to the screen's bottom-left pixel.
 */
export interface Tile extends Voxel {
  material: SceneMaterial;
}

type Pixel = [col: number, row: number];

const toScreenTile = ([col, row]: Pixel): Voxel => ({
  x: SCREEN.x[0] + col,
  y: SCREEN.y[0] + row,
  z: SCREEN.z,
});

/** Screen states, drawn on a 9×7 pixel grid (col 0 = left, row 0 = bottom). */
const PROMPT: Pixel[] = [
  [1, 4],
  [2, 3],
  [1, 2],
];
const CURSOR: Pixel[] = [
  [4, 2],
  [5, 2],
  [6, 2],
];
const FACE: Pixel[] = [
  // ^ ^
  [1, 4], [2, 5], [3, 4],
  [5, 4], [6, 5], [7, 4],
  // smile
  [2, 2], [3, 1], [4, 1], [5, 1], [6, 2],
];

/** Floppy slot and power LED on the lower bezel. */
const BEZEL_TILES: Tile[] = [
  ...[-4, -3, -2, -1].map((x) => ({ x, y: 3, z: FRONT_Z, material: "slot" as const })),
  { x: 4, y: 3, z: FRONT_Z, material: "led" },
];

/** Scene bounds in grid units (voxel edges), used to center the model on the origin. */
const BOUNDS = { x: [-6, 7], z: [0, 8] } as const;
const CENTER_X = (BOUNDS.x[0] + BOUNDS.x[1]) / 2;
const CENTER_Z = (BOUNDS.z[0] + BOUNDS.z[1]) / 2;

/** Grid cell → world position of the cube center, centered on XZ and resting on y = 0. */
export function toWorld({ x, y, z }: Voxel): Voxel {
  return { x: x + 0.5 - CENTER_X, y: y + 0.5, z: z + 0.5 - CENTER_Z };
}

export const MATERIALS = Object.keys(PALETTE) as SceneMaterial[];

/** Static voxels in world coordinates, grouped by material. */
export function buildVoxels(): Record<SceneMaterial, Voxel[]> {
  const groups = Object.fromEntries(MATERIALS.map((m) => [m, [] as Voxel[]])) as Record<
    SceneMaterial,
    Voxel[]
  >;
  for (const [key, material] of buildBody()) {
    const [x, y, z] = key.split(",").map(Number) as [number, number, number];
    groups[material].push(toWorld({ x, y, z }));
  }
  return groups;
}

export const bezelTiles = BEZEL_TILES.map((tile) => ({ ...toWorld(tile), material: tile.material }));

export const screenStates = {
  prompt: PROMPT.map(toScreenTile).map(toWorld),
  cursor: CURSOR.map(toScreenTile).map(toWorld),
  face: FACE.map(toScreenTile).map(toWorld),
};
