/**
 * Client for the public endpoints of gem_tracker_api.
 *
 * Only the certificate verification route is used here. It is deliberately the
 * unauthenticated one — visitors to grc.lk have no token, exactly like someone
 * scanning the QR code printed on a report.
 */

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "https://gem-tracker-six.vercel.app/api";

/**
 * Where the full report view lives. The certificate QR encodes
 * `<origin>/reports/<_id>` against the gem-tracker-app deployment, so a verified
 * number has to be sent to the same place for the two paths to agree.
 */
const REPORT_VIEW_URL: string =
  import.meta.env.VITE_REPORT_VIEW_URL ||
  "https://gemological-report-ceylon.vercel.app";

export type VerifiedCertificate = {
  /** Mongo id — addresses the full report view, and is what the QR encodes. */
  _id: string;
  reportType?: "small" | "medium" | "large" | "verbal";
  reportId: string;
  gemId: string;
  status?: string;
  identification?: string;
  measurements?: {
    ri?: { min: number | null; max: number | null } | null;
    /** Specific gravity is optional — many reports legitimately omit it. */
    sg?: number | null;
    hardness?: number | null;
  };
  descriptions?: {
    weight?: number | string | null;
    color?: string | null;
  };
  issuedDate?: string;
  verifiedAt?: string;
};

export class CertificateNotFoundError extends Error {
  constructor(message = "This GRC number does not match our records.") {
    super(message);
    this.name = "CertificateNotFoundError";
  }
}

/** Builds the URL of the full report view for a verified certificate. */
export function reportViewUrl(id: string): string {
  return `${REPORT_VIEW_URL.replace(/\/$/, "")}/reports/${id}`;
}

/**
 * Looks a certificate up by its printed GRC number.
 *
 * Throws {@link CertificateNotFoundError} for a number that isn't on record, so
 * the page can tell "no such certificate" apart from "the lookup itself broke" —
 * they need very different wording in front of a customer.
 */
export async function verifyCertificate(
  grcNumber: string,
  signal?: AbortSignal
): Promise<VerifiedCertificate> {
  const trimmed = grcNumber.trim();
  const response = await fetch(
    `${API_BASE_URL}/reports/${encodeURIComponent(trimmed)}/verify`,
    { signal, headers: { Accept: "application/json" } }
  );

  if (response.status === 404) {
    throw new CertificateNotFoundError();
  }

  if (!response.ok) {
    throw new Error(
      `Verification service returned ${response.status}. Please try again.`
    );
  }

  const data = (await response.json()) as VerifiedCertificate;

  // A 200 without an _id means the API predates the field. Without it there is
  // nothing to redirect to, so say so rather than sending the visitor to /reports/undefined.
  if (!data?._id) {
    throw new Error(
      "This certificate was found but cannot be displayed yet. Please contact us."
    );
  }

  return data;
}
