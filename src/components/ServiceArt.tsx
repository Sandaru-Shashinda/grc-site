import { BRILLIANT_FACETS, GIRDLE, RETICLE_TICKS } from "../lib/gemArt";
import "./ServiceArt.css";

export type ServiceArtKind = "diamond" | "research";

/**
 * Line-drawn panel standing in for a service photograph: a round brilliant for
 * diamond testing, and the same stone under a microscope reticle for research.
 * Purely ornamental.
 */
export default function ServiceArt({ kind }: { kind: ServiceArtKind }) {
  return (
    <div className={`service-art service-art--${kind}`} aria-hidden="true">
      {kind === "research" && (
        <svg className="service-art__reticle" viewBox="-310 -310 620 620">
          <circle r={300} />
          <path d={RETICLE_TICKS} />
          <circle r={250} className="service-art__dash" />
          <path d="M0 -300 L0 -170 M0 300 L0 170 M-300 0 L-170 0 M300 0 L170 0" />
        </svg>
      )}
      <svg className="service-art__gem" viewBox="-104 -104 208 208">
        <circle r={GIRDLE} />
        <path d={BRILLIANT_FACETS} />
      </svg>
    </div>
  );
}
