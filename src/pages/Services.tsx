import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
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
            <div className="service-row__content">
              <h2 className="section-title">{service.title}</h2>
              <p>{service.description}</p>
              <Link to="/contact" className="btn btn--primary">
                Contact
              </Link>
            </div>
            <div className="service-row__media">
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
