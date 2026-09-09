import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  CertificateNotFoundError,
  reportViewUrl,
  verifyCertificate,
  type VerifiedCertificate,
} from "../lib/api";
import "./VerifyCertificate.css";

/** Both numbers the lab issues: GRC-2026-09-00001 (printed) and REP-… (internal). */
const NUMBER_HINT = "For example, GRC-2026-09-00001";

/** Grace period so the visitor sees the certificate was found before the page changes. */
const REDIRECT_DELAY_MS = 1200;

type Status =
  | { kind: "idle" }
  | { kind: "verifying" }
  | { kind: "verified"; certificate: VerifiedCertificate }
  | { kind: "not-found"; message: string }
  | { kind: "error"; message: string };

export default function VerifyCertificate() {
  const [grcNumber, setGrcNumber] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  // Abandon an in-flight lookup if the visitor navigates away mid-request.
  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = grcNumber.trim();
    if (!trimmed) {
      setStatus({
        kind: "error",
        message: "Please enter the certificate number printed on your report.",
      });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus({ kind: "verifying" });

    try {
      const certificate = await verifyCertificate(trimmed, controller.signal);
      setStatus({ kind: "verified", certificate });
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof CertificateNotFoundError) {
        setStatus({ kind: "not-found", message: error.message });
        return;
      }
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not reach the verification service. Please try again.",
      });
    }
  }

  function reset() {
    abortRef.current?.abort();
    setStatus({ kind: "idle" });
    setGrcNumber("");
  }

  return (
    <>
      <PageHero
        title="Verify Certificate"
        subtitle="Enter the certificate number printed on your GRC report to open the official certificate."
      />

      <section className="section">
        <div className="container verify">
          {status.kind === "verified" ? (
            <VerifiedPanel certificate={status.certificate} onReset={reset} />
          ) : (
            <div className="verify__card">
              <h2 className="verify__title">Certificate Verification</h2>
              <p className="verify__intro">
                Every GRC report carries a unique certificate number and a QR code.
                Enter that number below to view the same official certificate the QR
                code opens.
              </p>

              <form className="verify__form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="grc-number" className="verify__label">
                  Certificate Number
                </label>
                <div className="verify__row">
                  <input
                    id="grc-number"
                    name="grc-number"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    placeholder="GRC-2026-09-00001"
                    className="verify__input"
                    value={grcNumber}
                    onChange={(event) => {
                      setGrcNumber(event.target.value);
                      if (status.kind !== "idle") setStatus({ kind: "idle" });
                    }}
                    aria-describedby="grc-number-hint"
                    aria-invalid={
                      status.kind === "not-found" || status.kind === "error"
                    }
                    disabled={status.kind === "verifying"}
                  />
                  <button
                    type="submit"
                    className="btn btn--primary verify__submit"
                    disabled={status.kind === "verifying"}
                  >
                    {status.kind === "verifying" ? "Verifying…" : "Verify"}
                  </button>
                </div>
                <p id="grc-number-hint" className="verify__hint">
                  {NUMBER_HINT}
                </p>
              </form>

              <div aria-live="polite">
                {status.kind === "not-found" && (
                  <div className="verify__result verify__result--invalid">
                    <span className="verify__badge verify__badge--invalid">
                      Not found
                    </span>
                    <p>{status.message}</p>
                    <p className="verify__small">
                      Please check the number and try again. If your certificate is
                      recent it may not be published yet —{" "}
                      <Link to="/contact">contact us</Link> and we will confirm it
                      directly.
                    </p>
                  </div>
                )}

                {status.kind === "error" && (
                  <div className="verify__result verify__result--error">
                    <p>{status.message}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/**
 * Confirms the match, then hands the visitor to the full report view — the same
 * page the certificate's QR code opens. The redirect is delayed a beat so the
 * confirmation is actually readable, and the link stays as a fallback for anyone
 * whose browser blocks the automatic navigation.
 */
function VerifiedPanel({
  certificate,
  onReset,
}: {
  certificate: VerifiedCertificate;
  onReset: () => void;
}) {
  const destination = reportViewUrl(certificate._id);

  useEffect(() => {
    const timer = window.setTimeout(
      () => window.location.assign(destination),
      REDIRECT_DELAY_MS
    );
    return () => window.clearTimeout(timer);
  }, [destination]);

  return (
    <div className="verify__card verify__card--verified" aria-live="polite">
      <span className="verify__badge verify__badge--valid">Verified authentic</span>
      <h2 className="verify__title">Certificate found</h2>

      <dl className="verify__summary">
        <div>
          <dt>GRC Number</dt>
          <dd>{certificate.gemId || "—"}</dd>
        </div>
        {certificate.identification && (
          <div>
            <dt>Identification</dt>
            <dd>{certificate.identification}</dd>
          </div>
        )}
        {certificate.issuedDate && (
          <div>
            <dt>Issued</dt>
            <dd>
              {new Date(certificate.issuedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
        )}
      </dl>

      <p className="verify__redirecting">Opening your official certificate…</p>

      <div className="btn-group verify__actions">
        <a href={destination} className="btn btn--primary">
          View Certificate
        </a>
        <button type="button" className="btn btn--outline" onClick={onReset}>
          Verify Another
        </button>
      </div>
    </div>
  );
}
