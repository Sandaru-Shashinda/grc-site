import type { CSSProperties } from "react";
import { BRILLIANT_FACETS, GIRDLE, RETICLE_TICKS } from "../lib/gemArt";
import "./HeroBackdrop.css";

/** Corners of an emerald-cut outline (cut-corner rectangle) at a given scale. */
function emeraldOutline(scale: number) {
  const w = 60 * scale;
  const h = 92 * scale;
  const c = 20 * scale;
  return [
    [-w + c, -h], [w - c, -h], [w, -h + c], [w, h - c],
    [w - c, h], [-w + c, h], [-w, h - c], [-w, -h + c],
  ];
}

/** Step-cut emerald: nested outlines joined at the corners. */
const EMERALD_STEPS = [1, 0.8, 0.62, 0.46].map(emeraldOutline);
const EMERALD_FACETS = [
  ...EMERALD_STEPS.map((pts) => `M${pts.map((p) => p.join(" ")).join(" L")}Z`),
  ...EMERALD_STEPS[0].map(
    (p, i) => `M${p.join(" ")} L${EMERALD_STEPS[EMERALD_STEPS.length - 1][i].join(" ")}`,
  ),
].join(" ");

/** Marquise cut: pointed oval with a table and kite facets. */
const MARQUISE_FACETS = [
  "M0 -100 Q60 0 0 100 Q-60 0 0 -100Z",
  "M0 -55 Q33 0 0 55 Q-33 0 0 -55Z",
  "M0 -100 L0 -55 M0 100 L0 55 M30 0 L16.5 0 M-30 0 L-16.5 0",
  ...[1, -1].flatMap((sx) =>
    [1, -1].map(
      (sy) => `M${0} ${55 * sy} L${22.5 * sx} ${50 * sy} L${16.5 * sx} 0`,
    ),
  ),
].join(" ");

/** Microscope-style reticle: graduated ring, inner dashed ring and crosshair ticks. */
function Reticle() {
  return (
    <svg className="hero-backdrop__reticle" viewBox="-310 -310 620 620">
      <circle r={300} />
      <path d={RETICLE_TICKS} />
      <circle r={250} className="hero-backdrop__reticle-dash" />
      <path d="M0 -240 L0 -210 M0 240 L0 210 M-240 0 L-210 0 M240 0 L210 0" />
    </svg>
  );
}

function Facets({ d, viewBox, className }: { d: string; viewBox: string; className: string }) {
  return (
    <svg className={`hero-backdrop__gem ${className}`} viewBox={viewBox}>
      <path d={d} />
    </svg>
  );
}

const SPARKLES = [
  { top: "22%", left: "14%", size: 18, delay: 0 },
  { top: "68%", left: "9%", size: 12, delay: 1.4 },
  { top: "16%", left: "84%", size: 14, delay: 0.7 },
  { top: "74%", left: "88%", size: 20, delay: 2.1 },
  { top: "44%", left: "94%", size: 10, delay: 3 },
  { top: "36%", left: "24%", size: 9, delay: 3.6 },
  { top: "58%", left: "76%", size: 11, delay: 2.6 },
];

/** Gold specks drifting upward; positions spread across the width, staggered in time. */
const SPECKS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 6) % 100}%`,
  size: 2 + (i % 3),
  delay: (i * 1.3) % 11,
  duration: 11 + (i % 5) * 2,
}));

/** Decorative gemstone backdrop for the home hero; purely ornamental. */
export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop__rays" />
      <div className="hero-backdrop__lattice" />
      <Reticle />

      <svg className="hero-backdrop__gem hero-backdrop__gem--left" viewBox="-104 -104 208 208">
        <circle r={GIRDLE} />
        <path d={BRILLIANT_FACETS} />
      </svg>
      <svg className="hero-backdrop__gem hero-backdrop__gem--right" viewBox="-104 -104 208 208">
        <circle r={GIRDLE} />
        <path d={BRILLIANT_FACETS} />
      </svg>
      <Facets d={EMERALD_FACETS} viewBox="-64 -96 128 192" className="hero-backdrop__gem--emerald" />
      <Facets d={MARQUISE_FACETS} viewBox="-34 -104 68 208" className="hero-backdrop__gem--marquise" />

      {SPECKS.map((s, i) => (
        <span
          key={`speck-${i}`}
          className="hero-backdrop__speck"
          style={
            {
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            } as CSSProperties
          }
        />
      ))}

      {SPARKLES.map((s, i) => (
        <svg
          key={`sparkle-${i}`}
          className="hero-backdrop__sparkle"
          viewBox="-10 -10 20 20"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          <path d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10Z" />
        </svg>
      ))}
    </div>
  );
}
