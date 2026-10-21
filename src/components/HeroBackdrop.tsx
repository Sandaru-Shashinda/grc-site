import "./HeroBackdrop.css";

/** Point on a circle of radius r at the given angle (degrees), centred on 0,0. */
function at(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return `${(r * Math.cos(rad)).toFixed(2)} ${(r * Math.sin(rad)).toFixed(2)}`;
}

const TABLE = 42;
const STAR = 68;
const GIRDLE = 100;

/** Top view of a round brilliant cut: table, star, bezel and upper-girdle facets. */
const BRILLIANT_FACETS = Array.from({ length: 8 }, (_, k) => {
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

function Brilliant({ className }: { className: string }) {
  return (
    <svg className={`hero-backdrop__gem ${className}`} viewBox="-104 -104 208 208">
      <circle r={GIRDLE} />
      <path d={BRILLIANT_FACETS} />
    </svg>
  );
}

const SPARKLES = [
  { top: "22%", left: "14%", size: 18, delay: 0 },
  { top: "68%", left: "9%", size: 12, delay: 1.4 },
  { top: "16%", left: "84%", size: 14, delay: 0.7 },
  { top: "74%", left: "88%", size: 20, delay: 2.1 },
  { top: "44%", left: "94%", size: 10, delay: 3 },
];

/** Decorative gemstone backdrop for the home hero; purely ornamental. */
export default function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-backdrop__lattice" />
      <Brilliant className="hero-backdrop__gem--left" />
      <Brilliant className="hero-backdrop__gem--right" />
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
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
