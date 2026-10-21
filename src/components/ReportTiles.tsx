import { Link } from "react-router-dom";
import { reportTypes } from "../data/reports";
import { revealDelay } from "../hooks/useReveal";
import "./ReportTiles.css";

const MAX_DEPTH = 4;

export function DepthMeter({ depth }: { depth: number }) {
  return (
    <span className="depth-meter" role="img" aria-label={`Examination depth ${depth} of ${MAX_DEPTH}`}>
      {Array.from({ length: MAX_DEPTH }, (_, i) => (
        <span key={i} className={i < depth ? "is-on" : ""} />
      ))}
    </span>
  );
}

type ReportTilesProps = {
  /** On the Reports page itself the tiles jump to their section in place. */
  inPage?: boolean;
};

/** One tile per printed report, each leading to that report's section. */
export default function ReportTiles({ inPage = false }: ReportTilesProps) {
  return (
    <ul className="report-tiles">
      {reportTypes.map((report, index) => {
        const cover = report.images[0];
        const body = (
          <>
            <span className="report-tile__media">
              <img src={cover.src} alt="" width={cover.width} height={cover.height} loading="lazy" />
            </span>
            <span className="report-tile__body">
              <span className="report-tile__format">{report.format}</span>
              <span className="report-tile__name">{report.name}</span>
              <span className="report-tile__tagline">{report.tagline}</span>
              <DepthMeter depth={report.depth} />
            </span>
          </>
        );
        return (
          <li key={report.slug} data-reveal style={revealDelay(index * 90)}>
            {inPage ? (
              <a href={`#${report.slug}`} className="report-tile">
                {body}
              </a>
            ) : (
              <Link to={`/reports#${report.slug}`} className="report-tile">
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
