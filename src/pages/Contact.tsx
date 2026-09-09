import { useState, type FormEvent } from "react";
import PageHero from "../components/PageHero";
import { site } from "../data/site";
import "./Contact.css";

type Fields = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", email: "", message: "" };
const REQUIRED_MESSAGE = "This field is required.";

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = REQUIRED_MESSAGE;
  if (!values.phone.trim()) errors.phone = REQUIRED_MESSAGE;
  if (!values.email.trim()) {
    errors.email = REQUIRED_MESSAGE;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update(field: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      // TODO: point this at the GRC contact endpoint once the API is available.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PageHero title="Contact" />

      {/* Get in touch ------------------------------------------------------ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title contact-heading">Get in Touch</h2>
          <div className="contact-cards">
            <article className="contact-card">
              <h3 className="contact-card__title">Contact Number</h3>
              <p className="contact-card__label">General Inquiries</p>
              <a href={site.phoneHref} className="contact-card__value">
                {site.phone}
              </a>
            </article>

            <article className="contact-card">
              <h3 className="contact-card__title">Email</h3>
              <a href={`mailto:${site.email}`} className="contact-card__value">
                {site.email}
              </a>
            </article>

            <article className="contact-card">
              <h3 className="contact-card__title">Business Hours</h3>
              <ul className="contact-card__hours">
                {site.hours.map((entry) => (
                  <li key={entry.days}>
                    <span>{entry.days}</span>
                    <span>{entry.time}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Message form ------------------------------------------------------ */}
      <section className="section section--cream">
        <div className="container contact-form-wrap">
          <h2 className="section-title contact-heading">Send Us a Message</h2>

          {status === "sent" && (
            <p className="form__notice form__notice--success" role="status">
              Thank you — your message has been sent. We will be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="form__notice form__notice--error" role="alert">
              There was an error trying to submit your form. Please try again.
            </p>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form__field">
              <label htmlFor="name" className="form__label">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={100}
                placeholder="Name *"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="form__input"
              />
              {errors.name && (
                <p id="name-error" className="form__error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form__field">
              <label htmlFor="phone" className="form__label">
                Phone <span aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={100}
                placeholder="Phone *"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="form__input"
              />
              {errors.phone && (
                <p id="phone-error" className="form__error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form__field">
              <label htmlFor="email" className="form__label">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email *"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="form__input"
              />
              {errors.email && (
                <p id="email-error" className="form__error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form__field">
              <label htmlFor="message" className="form__label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
                className="form__input form__textarea"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary form__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {/* Map ---------------------------------------------------------------- */}
      <section className="contact-map">
        <iframe
          src={site.mapEmbed}
          title={site.legalName}
          aria-label={site.legalName}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
