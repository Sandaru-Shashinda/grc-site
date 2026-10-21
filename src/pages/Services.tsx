import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import ServiceArt from "../components/ServiceArt";
import { services } from "../data/site";
import "./Services.css";

export default function Services() {
  return (
    <>
      <PageHero title="Services" />

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`section ${index % 2 === 1 ? "section--cream" : ""}`}
        >
          <div
            className={`container service-row ${
              index % 2 === 1 ? "service-row--reversed" : ""
            }`}
          >
            <div className="service-row__content" data-reveal>
              <h2 className="section-title">{service.title}</h2>
              <p>{service.description}</p>
              <Link to="/contact" className="btn btn--primary">
                Contact
              </Link>
            </div>
            <div
              className="service-row__media"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              {service.image ? (
                <img src={service.image} alt={service.title} loading="lazy" />
              ) : (
                <ServiceArt kind={service.art ?? "diamond"} />
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
