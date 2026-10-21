/* Line-art geometry shared by the decorative gem illustrations. */

/** Point on a circle of radius r at the given angle (degrees), centred on 0,0. */
export function at(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return `${(r * Math.cos(rad)).toFixed(2)} ${(r * Math.sin(rad)).toFixed(2)}`;
}

const TABLE = 42;
const STAR = 68;
export const GIRDLE = 100;

/** Top view of a round brilliant cut: table, star, bezel and upper-girdle facets. */
export const BRILLIANT_FACETS = Array.from({ length: 8 }, (_, k) => {
  const a = k * 45;
  const table = at(TABLE, a + 22.5);
  return [
    // Table edge and the star facet beneath it.
    `M${at(TABLE, a - 22.5)} L${table}`,
    `M${at(TABLE, a - 22.5)} L${at(STAR, a)} L${table}`,
    // Bezel kite.
    `M${at(STAR, a)} L${at(GIRDLE, a + 22.5)} L${at(STAR, a + 45)}`,
    `M${table} L${at(GIRDLE, a + 22.5)}`,
    // Upper-girdle facets.
    `M${at(STAR, a)} L${at(GIRDLE, a)}`,
  ].join(" ");
}).join(" ");

/** Microscope-style reticle ticks: graduated ring of radius 300. */
export const RETICLE_TICKS = Array.from({ length: 120 }, (_, i) => {
  const deg = i * 3;
  const inner = i % 10 === 0 ? 278 : i % 5 === 0 ? 286 : 292;
  return `M${at(inner, deg)} L${at(300, deg)}`;
}).join(" ");
