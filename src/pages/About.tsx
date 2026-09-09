import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { services } from "../data/site";
import "./About.css";

export default function About() {
  return (
    <>
      <PageHero title="About" />

      {/* Established in 2025 ---------------------------------------------- */}
      <section className="section">
        <div className="container about-intro">
          <h2 className="section-title">Established in 2025</h2>
          <p className="lead about-intro__statement">
            The Gemological Report of Ceylon is a professional gem certification and
            reporting institution established in 2025, dedicated to delivering
            accurate, transparent, and internationally aligned gemological reports.
          </p>
          <p>
            The Gemological Report of Ceylon was established with a clear mission: to
            strengthen trust in Sri Lankan gemstones by providing reliable
            certification that meets global standards. Each report is prepared using
            systematic gemological testing, professional expertise, and a commitment
            to impartiality.
          </p>
          <p>
            We serve gem traders, jewelers, collectors, and clients seeking dependable
            gemstone identification and reporting. Our work reflects our core values
            of accuracy, integrity, and excellence, supporting Sri Lanka&rsquo;s
            legacy as one of the world&rsquo;s most respected sources of fine
            gemstones.
          </p>
        </div>
      </section>

      {/* Founder ----------------------------------------------------------- */}
      <section className="section section--cream">
        <div className="container founder">
          <span className="eyebrow">Founder</span>
          <h3 className="founder__name">Milinda Edirisinghe</h3>
          <p>
            Milinda Edirisinghe, a distinguished gemologist with over 20 years of
            experience, the organization is built on a foundation of deep industry
            knowledge, research-based analysis, and ethical responsibility.
            Recognized as one of Sri Lanka&rsquo;s leading gemologists, the founder
            has contributed extensively to the field through over 1,000 published
            newspaper articles on gemology, gemstones, and the gem trade market,
            including the renowned pearl article published in Sunday Times in 2013.
          </p>
        </div>
      </section>

      {/* Mission & Vision --------------------------------------------------- */}
      <section className="section">
        <div className="container mission-grid">
          <article className="mission-card">
            <h2 className="mission-card__title">Mission</h2>
            <p>
              To deliver accurate, independent, and professional gemological
              certification through scientifically recognized testing methods and
              internationally accepted standards, ensuring trust and clarity for
              every customer.
            </p>
          </article>
          <article className="mission-card">
            <h2 className="mission-card__title">Vision</h2>
            <p>
              To be a globally respected gemological authority from Sri Lanka,
              providing trusted certification that strengthens transparency,
              confidence, and value in the international gem and jewelry market.
            </p>
          </article>
        </div>
      </section>

      {/* Services list ------------------------------------------------------ */}
      <section className="section section--cream-deep">
        <div className="container about-services">
          <h2 className="section-title">Services</h2>
          <ul className="about-services__list">
            {services.map((service) => (
              <li key={service.slug}>{service.title}</li>
            ))}
          </ul>
          <Link to="/services" className="btn btn--primary">
            View Services
          </Link>
        </div>
      </section>
    </>
  );
}
