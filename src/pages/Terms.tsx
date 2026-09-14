import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { termsSections, termsUpdated } from "../data/terms";
import { site } from "../data/site";
import "./Terms.css";

export default function Terms() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="The terms under which GRC issues its gemological certificates and reports."
      />

      {/* Contents ----------------------------------------------------------- */}
      <section className="section terms-contents-section">
        <div className="container">
          <p className="terms-updated">Last updated: {termsUpdated}</p>

          <nav className="terms-contents" aria-labelledby="terms-contents-title">
            <h2 id="terms-contents-title" className="terms-contents__title">
              Contents
            </h2>
            {termsSections.map((section) => (
              <div key={section.id} className="terms-contents__group">
                <a href={`#${section.id}`} className="terms-contents__heading">
                  {section.number}. {section.title}
                </a>
                <ol className="terms-contents__list">
                  {section.clauses.map((clause) => (
                    <li key={clause.id}>
                      <a href={`#${clause.id}`} className="terms-contents__link">
                        {clause.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Clauses ------------------------------------------------------------ */}
      {termsSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={section.id}
          className={`section terms-section ${
            sectionIndex % 2 === 1 ? "section--cream" : ""
          }`}
        >
          <div className="container terms-body" data-reveal>
            <span className="eyebrow">Section {section.number}</span>
            <h2 className="section-title">{section.title}</h2>
            {section.intro && <p className="lead terms-body__intro">{section.intro}</p>}

            <ol className="terms-list">
              {section.clauses.map((clause, index) => (
                <li key={clause.id} id={clause.id} className="terms-clause">
                  {section.numbered && (
                    <span className="terms-clause__number" aria-hidden="true">
                      {index + 1}
                    </span>
                  )}
                  <div className="terms-clause__content">
                    <h3 className="terms-clause__title">{clause.title}</h3>
                    <p>{clause.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* Questions ---------------------------------------------------------- */}
      <section className="section section--cream-deep">
        <div className="container terms-cta" data-reveal>
          <h2 className="section-title">Questions about these terms?</h2>
          <p>
            If you have identified a discrepancy in a certificate, or need clarification
            on any clause above, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
          <div className="btn-group">
            <Link to="/contact" className="btn btn--primary">
              Contact Us
            </Link>
            <Link to="/verify-certificate" className="btn btn--outline">
              Verify Certificate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
