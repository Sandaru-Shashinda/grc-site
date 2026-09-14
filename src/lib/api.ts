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

/* -------------------------------------------------------------------------- */
/* Contact form                                                               */
/* -------------------------------------------------------------------------- */

export type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  message: string;
  /** Honeypot — the form keeps it hidden and empty; bots fill it in. */
  website?: string;
};

/** Per-field messages the API sends back when it rejects a submission. */
export type ContactFieldErrors = Partial<
  Record<"name" | "phone" | "email" | "message", string>
>;

export class ContactValidationError extends Error {
  readonly errors: ContactFieldErrors;

  constructor(message: string, errors: ContactFieldErrors) {
    super(message);
    this.name = "ContactValidationError";
    this.errors = errors;
  }
}

/**
 * Sends a "Send Us a Message" submission to the laboratory inbox.
 *
 * Throws {@link ContactValidationError} when the API rejects individual fields,
 * so the form can put the message under the field it belongs to rather than
 * showing one notice for every kind of failure.
 */
export async function sendContactMessage(
  submission: ContactSubmission,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...submission, source: "grc.lk" }),
  });

  if (response.ok) return;

  let body: { message?: string; errors?: ContactFieldErrors } = {};
  try {
    body = await response.json();
  } catch {
    // Not JSON — the status is all we have to go on.
  }

  if (response.status === 400 && body.errors) {
    throw new ContactValidationError(
      body.message || "Please check the form and try again.",
      body.errors
    );
  }

  throw new Error(
    body.message || `The message could not be sent (${response.status}).`
  );
}

/* -------------------------------------------------------------------------- */
/* Posts                                                                      */
/* -------------------------------------------------------------------------- */

export type PublishedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  /** Only the single-post endpoint returns the body. */
  body?: string;
  category: string;
  coverImage?: string;
  author?: { name?: string } | null;
  publishedAt?: string;
  createdAt: string;
};

export class PostNotFoundError extends Error {
  constructor(message = "This post is no longer available.") {
    super(message);
    this.name = "PostNotFoundError";
  }
}

/** Lists published posts, newest first, optionally narrowed to one category. */
export async function fetchPublishedPosts(
  category?: string,
  signal?: AbortSignal
): Promise<PublishedPost[]> {
  const url = new URL(`${API_BASE_URL}/posts/public`);
  if (category) url.searchParams.set("category", category);

  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Posts could not be loaded (${response.status}).`);
  }

  const data = (await response.json()) as { posts?: PublishedPost[] };
  return data.posts ?? [];
}

/**
 * Reads one published post.
 *
 * Throws {@link PostNotFoundError} for a slug that is not published, so the page
 * can show "no longer available" rather than a loading failure — an unpublished
 * post and a broken API need different wording.
 */
export async function fetchPublishedPost(
  slug: string,
  signal?: AbortSignal
): Promise<PublishedPost> {
  const response = await fetch(
    `${API_BASE_URL}/posts/public/${encodeURIComponent(slug)}`,
    { signal, headers: { Accept: "application/json" } }
  );

  if (response.status === 404) throw new PostNotFoundError();
  if (!response.ok) {
    throw new Error(`This post could not be loaded (${response.status}).`);
  }

  return (await response.json()) as PublishedPost;
}
