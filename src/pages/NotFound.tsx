import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="This page doesn't seem to exist." />
      <section className="section">
        <div className="container" style={{ maxWidth: 560, textAlign: "center" }}>
          <p>
            It looks like the link pointing here was faulty. Try one of the pages
            below instead.
          </p>
          <div className="btn-group" style={{ justifyContent: "center" }}>
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
