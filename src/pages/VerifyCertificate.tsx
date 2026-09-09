import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import "./VerifyCertificate.css";

export default function VerifyCertificate() {
  return (
    <>
      <PageHero title="Verify Certificate" />

      <section className="section">
        <div className="container verify">
          <h2 className="verify__title">Certificate Verification Page</h2>
          <p className="lead">This page is under development.</p>
          <p>
            Once the verification service is live you will be able to download your
            certificate here using your certificate number. In the meantime, please
            get in touch and we will confirm a certificate for you directly.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
