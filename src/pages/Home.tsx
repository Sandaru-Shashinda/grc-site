import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <section className="hero">
        <div className="container hero__inner">
          <span className="eyebrow hero__eyebrow">Gemological Report of Ceylon</span>
          <h1 className="hero__title">Welcome to GRC</h1>
          <p className="hero__text">
            We are a professional gemological laboratory based in Sri Lanka, one of
            the world&rsquo;s most important gem capitals. GRC specializes in
            gemstone, jewelry-mounted gemstone, and natural pearl testing and
            certification. Our reports are accurate, independent, and designed to
            give customers a clear understanding of the authenticity and quality of
            what they buy or own.
          </p>
          <div className="btn-group hero__actions">
            <Link to="/services" className="btn btn--primary">
              Services
            </Link>
            <Link to="/about" className="btn btn--outline">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Let's talk about GRC --------------------------------------------- */}
      <section className="section">
        <div className="container about-strip">
          <div className="about-strip__content">
            <h2 className="section-title">Let&rsquo;s talk about GRC</h2>
            <p>
              GRC provides professional gemstone identification and authentication
              services, with special expertise in emeralds. Each gemstone is
              carefully examined to determine its identity, natural origin, and
              observable gemological characteristics.
            </p>
            <p>
              Our certificates support informed decision-making for buyers, sellers,
              and collectors.
            </p>
            <Link to="/services" className="btn btn--primary">
              Our Services
            </Link>
          </div>
          <div className="about-strip__media">
            <img
              src="/images/lab-team.jpg"
              alt="The GRC gemological laboratory team at work"
              loading="lazy"
              width={768}
              height={507}
            />
          </div>
        </div>
      </section>

      {/* Verify certificate ----------------------------------------------- */}
      <section className="section section--cream verify-band">
        <div className="container verify-band__inner">
          <h2 className="section-title">Verify Certificate</h2>
          <p className="lead">Download your certificate using your certificate number.</p>
          <Link to="/verify-certificate" className="btn btn--primary">
            Verify Now
          </Link>
        </div>
      </section>

      {/* Laboratory gallery ------------------------------------------------ */}
      <section className="section">
        <div className="container">
          <div className="gallery">
            <figure className="gallery__item">
              <img
                src="/images/lab-team.jpg"
                alt="GRC gemologists examining gemstones in the laboratory"
                loading="lazy"
              />
            </figure>
            <figure className="gallery__item">
              <img
                src="/images/gem-laboratory-2.jpeg"
                alt="Gemological testing equipment at the GRC laboratory"
                loading="lazy"
              />
            </figure>
            <figure className="gallery__item">
              <img
                src="/images/gem-laboratory-1.jpeg"
                alt="Microscope analysis of a gemstone at the GRC laboratory"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
