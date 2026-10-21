import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ReportGallery, { Lightbox } from "../components/ReportGallery";
import ReportTiles from "../components/ReportTiles";
import { revealDelay } from "../hooks/useReveal";
import {
  comparisonColumns,
  documentRows,
  examinationRows,
  examinationScope,
  premiumAnatomy,
  premiumTreatmentSections,
  reportTypes,
  type ComparisonRow,
  type ReportType,
} from "../data/reports";
import "./Reports.css";

function CheckIcon() {
  return (
    <svg className="report-check" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Reports() {
  return (
    <>
      <PageHero
        title="Our Reports"
        subtitle="Four printed reports, each with a defined examination scope — from a wallet-sized identification card to our Premium Certificate."
      />

      {/* Overview ------------------------------------------------------------ */}
      <section className="section reports-overview">
        <div className="container">
          <ReportTiles inPage />
          <p className="reports-overview__note" data-reveal>
            Need only a quick identification? A <strong>Verbal Report</strong> gives the
            stone name and variety in person, with no printed document.{" "}
            <a href="#compare">Compare every report</a>
          </p>
        </div>
      </section>

      {/* One section per report --------------------------------------------- */}
      {reportTypes.map((report, index) => (
        <ReportSection key={report.slug} report={report} index={index} />
      ))}

      {/* Comparison ---------------------------------------------------------- */}
      <section className="section" id="compare">
        <div className="container">
          <header className="reports-head" data-reveal>
            <span className="eyebrow">Side by side</span>
            <h2>Compare our reports</h2>
            <p className="lead">
              What each report examines, and what the printed document carries.
            </p>
          </header>

          <div className="compare" data-reveal>
            <table className="compare__table">
              <thead>
                <tr>
                  <td />
                  {comparisonColumns.map((column) => (
                    <th key={column.id} scope="col">
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <ComparisonGroup title="Examination" rows={examinationRows} />
              <ComparisonGroup title="On the document" rows={documentRows} />
            </table>
          </div>
          <p className="compare__note">
            Examination scope as defined in our{" "}
            <Link to="/terms-and-conditions#certificate-types">Terms &amp; Conditions</Link>.
          </p>

          <div className="reports-cta" data-reveal>
            <h2>Every report can be verified</h2>
            <p className="lead">
              Each GRC report carries a unique number and QR code that open it from our
              official records, from anywhere in the world.
            </p>
            <div className="btn-group reports-cta__actions">
              <Link to="/contact" className="btn btn--primary btn--lg">
                Request a Report
              </Link>
              <Link to="/verify-certificate" className="btn btn--outline btn--lg">
                Verify a Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportSection({ report, index }: { report: ReportType; index: number }) {
  const isPremium = report.slug === "premium";
  const reversed = index % 2 === 1;
  const scope = examinationScope(report.termsClauseId);
  const tone = isPremium ? "report-section--dark" : reversed ? "section--cream" : "";

  return (
    <section id={report.slug} className={`section report-section ${tone}`}>
      <div className="container">
        <div className={`report-row ${reversed ? "report-row--reversed" : ""}`}>
          <div className="report-row__media" data-reveal>
            <ReportGallery images={report.images} title={report.name} />
          </div>

          <div className="report-row__content" data-reveal style={revealDelay(120)}>
            <span className="eyebrow">{report.format}</span>
            <h2 className="report-row__title">{report.name}</h2>
            <p className="report-row__tagline">{report.tagline}</p>
            <p>{report.description}</p>

            <h3 className="report-row__label">Examination scope</h3>
            <ul className="scope-list">
              {scope.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="report-row__label">On the report</h3>
            <ul className="field-chips">
              {report.fields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>

            <div className="btn-group report-row__actions">
              <Link to="/contact" className="btn btn--primary">
                Request this Report
              </Link>
              <a href="#compare" className={`btn ${isPremium ? "btn--ghost-light" : "btn--outline"}`}>
                Compare Reports
              </a>
            </div>
          </div>
        </div>

        {isPremium && <PremiumDetail report={report} />}
      </div>
    </section>
  );
}

/** The Premium report's sheet with numbered markers, and its treatment checklist. */
function PremiumDetail({ report }: { report: ReportType }) {
  const [highlight, setHighlight] = useState<string | null>(null);
  const [viewing, setViewing] = useState(false);
  const sheet = report.images.find((image) => image.src.endsWith("premium-report.jpg"))!;

  return (
    <>
      <div className="anatomy">
        <header className="anatomy__head" data-reveal>
          <span className="eyebrow">Inside the Premium report</span>
          <h3 className="anatomy__title">Every section, explained</h3>
        </header>

        <div className="anatomy__body">
          <figure className="anatomy__figure" data-reveal>
            <button
              type="button"
              className="anatomy__sheet"
              onClick={() => setViewing(true)}
              aria-label="Enlarge the sample Premium report"
            >
              <img src={sheet.src} alt={sheet.alt} width={sheet.width} height={sheet.height} loading="lazy" />
              {premiumAnatomy.map((part, i) => (
                <span
                  key={part.id}
                  className={`anatomy__pin ${highlight === part.id ? "is-active" : ""}`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            </button>
            <figcaption>Sample sheet. Select it to view at full size.</figcaption>
          </figure>

          <ol className="anatomy__list" data-reveal style={revealDelay(120)}>
            {premiumAnatomy.map((part, i) => (
              <li
                key={part.id}
                className={highlight === part.id ? "is-active" : ""}
                onMouseEnter={() => setHighlight(part.id)}
                onMouseLeave={() => setHighlight(null)}
              >
                <span className="anatomy__num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <strong>{part.title}</strong>
                  {part.body}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="treatments" data-reveal>
        <div className="treatments__intro">
          <h3 className="anatomy__title">Twelve treatments, each answered</h3>
          <p>
            Where other reports state a treatment finding, the Premium report marks
            every test yes or no — so the absence of a treatment is recorded, not
            implied.
          </p>
        </div>
        <div className="treatments__groups">
          {premiumTreatmentSections.map((group) => (
            <div key={group.title} className="treatments__group">
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                    <span className="treatments__boxes" aria-hidden="true">
                      <i>Yes</i>
                      <i>No</i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {viewing && (
        <Lightbox
          images={[sheet]}
          index={0}
          title={`${report.name} — sample`}
          onChange={() => {}}
          onClose={() => setViewing(false)}
        />
      )}
    </>
  );
}

function ComparisonGroup({ title, rows }: { title: string; rows: ComparisonRow[] }) {
  return (
    <tbody>
      <tr className="compare__group">
        <th scope="rowgroup" colSpan={comparisonColumns.length + 1}>
          {title}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.label}>
          <th scope="row">{row.label}</th>
          {row.values.map((value, i) => (
            <td key={comparisonColumns[i].id}>
              {typeof value === "string" ? (
                <span className="compare__text">{value}</span>
              ) : value ? (
                <>
                  <CheckIcon />
                  <span className="visually-hidden">Included</span>
                </>
              ) : (
                <>
                  <span className="compare__dash" aria-hidden="true" />
                  <span className="visually-hidden">Not included</span>
                </>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
