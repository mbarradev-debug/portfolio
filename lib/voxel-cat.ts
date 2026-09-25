import { PALETTE, toWorld, type FaceShades, type Voxel } from "./voxel-monitor";

/**
 * Voxel cat typing on a retro keyboard in front of the monitor (lib/voxel-monitor.ts is untouched).
 *
 * Cat grid coordinates (1 unit = 1 voxel, same scale as the monitor): x = left → right,
 * y = up, z = toward the viewer. The cat faces the screen (−z) with its paws on the
 * keyboard; the default camera sees it from behind, over its shoulder.
 */

export type CatMaterial =
  | "fur"
  | "stripe"
  | "cream"
  | "nose"
  | "pupil"
  | "iris"
  | "keyboard"
  | "keycap"
  | "enterKey";

const flat = (color: string): FaceShades => ({ top: color, right: color, left: color });

export const CAT_PALETTE: Record<CatMaterial, FaceShades> = {
  fur: { top: "#f2b880", right: "#d69a62", left: "#bd8550" },
  stripe: { top: "#d08a4e", right: "#b0723f", left: "#976135" },
  cream: { top: "#fff6ea", right: "#e3d8c8", left: "#cdc2b2" },
  // Pink only on the nose.
  nose: { top: "#f4a6b8", right: "#d98ca0", left: "#c27a8c" },
  pupil: flat("#202023"),
  // Same teal as the monitor's pixels, so both read as one set.
  iris: flat("#88ccca"),
  // Keyboard matches the monitor: beige casing, prototype gray keys, one teal key.
  keyboard: PALETTE.shell,
  keycap: PALETTE.slot,
  enterKey: PALETTE.pixel,
};

export const CAT_MATERIALS = Object.keys(CAT_PALETTE) as CatMaterial[];

/**
 * Where the cat grid sits in monitor grid coordinates: keyboard centered under the
 * screen (monitor x −6…6, front at z = 7), cat right behind it.
 */
const OFFSET = { x: -1, y: 0, z: 12 };

type Range = [number, number];
type Cells = Map<string, CatMaterial>;

/** Keyboard footprint in cat grid coordinates, between the cat and the screen. */
const KEYBOARD = { x: [-2, 4] as Range, z: [-4, -2] as Range };

/** Paws rest on the keys, in cat grid coordinates. They tap in turns (see cat-voxels.tsx). */
const PAW_CELLS: Voxel[] = [
  { x: 0, y: 1, z: -3 },
  { x: 2, y: 1, z: -3 },
];

function box(cells: Cells, material: CatMaterial, [x0, x1]: Range, [y0, y1]: Range, [z0, z1]: Range) {
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++) cells.set(`${x},${y},${z}`, material);
}

/** Later calls paint over earlier ones, so details go last. */
function buildCat(): Cells {
  const cells: Cells = new Map();

  // Seated body facing the screen: cream chest on the −z side, side stripes.
  box(cells, "fur", [0, 2], [0, 3], [0, 2]);
  box(cells, "cream", [1, 1], [0, 2], [0, 0]);
  box(cells, "stripe", [0, 0], [1, 1], [1, 2]);
  box(cells, "stripe", [2, 2], [1, 1], [1, 2]);
  // Forearms reaching forward to the keyboard (the paws are animated, see PAWS).
  box(cells, "fur", [0, 0], [1, 1], [-2, -1]);
  box(cells, "fur", [2, 2], [1, 1], [-2, -1]);

  // Keyboard base on the desk, between the cat and the screen.
  box(cells, "keyboard", KEYBOARD.x, [0, 0], KEYBOARD.z);

  // Head, built facing +z and then mirrored so the cat looks at the screen (−z).
  const head: Cells = new Map();
  // Big head (cuter proportions), one voxel wider than the body on each side.
  box(head, "fur", [-1, 3], [4, 7], [0, 2]);
  box(head, "stripe", [1, 1], [7, 7], [1, 2]);
  // Band on the back of the head.
  box(head, "stripe", [0, 2], [6, 6], [0, 0]);
  // Eyes: teal iris over a dark pupil. Nose and cream muzzle stick out of the face.
  box(head, "iris", [0, 0], [6, 6], [2, 2]);
  box(head, "iris", [2, 2], [6, 6], [2, 2]);
  box(head, "pupil", [0, 0], [5, 5], [2, 2]);
  box(head, "pupil", [2, 2], [5, 5], [2, 2]);
  box(head, "nose", [1, 1], [5, 5], [3, 3]);
  box(head, "cream", [0, 2], [4, 4], [3, 3]);

  // Ears, darker inside.
  box(head, "fur", [-1, 0], [8, 8], [1, 1]);
  box(head, "fur", [-1, -1], [9, 9], [1, 1]);
  box(head, "stripe", [0, 0], [8, 8], [1, 1]);
  box(head, "fur", [2, 3], [8, 8], [1, 1]);
  box(head, "fur", [3, 3], [9, 9], [1, 1]);
  box(head, "stripe", [2, 2], [8, 8], [1, 1]);

  for (const [key, material] of head) {
    const [x, y, z] = key.split(",").map(Number) as [number, number, number];
    cells.set(`${x},${y},${2 - z}`, material);
  }

  // Tail raised behind the cat in a hook, darker with a cream tip so it reads against the body.
  box(cells, "stripe", [2, 2], [0, 4], [3, 3]);
  box(cells, "stripe", [2, 2], [5, 5], [3, 3]);
  box(cells, "cream", [3, 3], [5, 5], [3, 3]);

  return cells;
}

const place = ({ x, y, z }: Voxel) => toWorld({ x: x + OFFSET.x, y: y + OFFSET.y, z: z + OFFSET.z });

/** Cat and keyboard voxels in the monitor's world space, grouped by material. */
export function buildCatVoxels(): Record<CatMaterial, Voxel[]> {
  const groups = Object.fromEntries(CAT_MATERIALS.map((m) => [m, [] as Voxel[]])) as Record<
    CatMaterial,
    Voxel[]
  >;
  for (const [key, material] of buildCat()) {
    const [x, y, z] = key.split(",").map(Number) as [number, number, number];
    groups[material].push(place({ x, y, z }));
  }
  return groups;
}

/** Paw rest positions in world space. */
export const PAWS: Voxel[] = PAW_CELLS.map(place);

/**
 * Keycaps: one per keyboard cell, except where the forearms and paws are.
 * World positions of the cell centers on top of the base; the last key is the teal "enter".
 */
export function buildKeycaps(): { keys: Voxel[]; enter: Voxel } {
  const covered = new Set(PAW_CELLS.flatMap(({ x, z }) => [`${x},${z}`, `${x},${z + 1}`]));
  const cells: Voxel[] = [];
  for (let z = KEYBOARD.z[0]; z <= KEYBOARD.z[1]; z++)
    for (let x = KEYBOARD.x[0]; x <= KEYBOARD.x[1]; x++)
      if (!covered.has(`${x},${z}`)) cells.push(place({ x, y: 1, z }));
  // Enter: rightmost key of the middle row.
  const enter = place({ x: KEYBOARD.x[1], y: 1, z: KEYBOARD.z[0] + 1 });
  const keys = cells.filter((c) => c.x !== enter.x || c.z !== enter.z);
  return { keys, enter };
}

/**
 * Shift that re-centers monitor + keyboard + cat on the origin
 * (grid x −6…7, z 0…16, while the monitor alone is centered on x −6…7, z 0…8).
 */
export const SCENE_SHIFT = { x: 0, z: -4 };
