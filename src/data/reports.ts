/**
 * The printed reports GRC issues, as shown on the Reports page.
 *
 * What each report *examines* is not restated here: it is read from the matching
 * clause of "Certificate Types & Examination Scope" in ./terms, which is the
 * binding wording. This file only adds what the printed document looks like.
 */

import { termsSections } from "./terms";

export type ReportImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ReportType = {
  /** Anchor id on the Reports page. */
  slug: string;
  /** The clause in ./terms that defines this report's examination scope. */
  termsClauseId: string;
  name: string;
  tagline: string;
  /** Paper size and presentation, as printed in the section eyebrow. */
  format: string;
  description: string;
  /** 1 (identification) to 4 (most comprehensive) — drives the depth meter. */
  depth: number;
  /** The first image is the one shown on overview cards. */
  images: ReportImage[];
  /** The fields printed on the document itself. */
  fields: string[];
};

const img = (name: string, alt: string, width: number, height: number): ReportImage => ({
  src: `/images/reports/${name}.jpg`,
  alt,
  width,
  height,
});

export const reportTypes: ReportType[] = [
  {
    slug: "premium",
    termsClauseId: "premium-certificate",
    name: "Premium Certificate",
    tagline: "The complete record of an exceptional stone.",
    format: "A4 · Black or red Premium folder",
    description:
      "Our most comprehensive examination and documentation. Beyond full identification and geographic origin, the Premium report grades colour by hue, tone and saturation, and answers every treatment test individually — colour enhancements, clarity enhancements and surface modifications — so nothing is summarised away. It is accompanied by a video certificate and an overall assessment of the gemstone.",
    depth: 4,
    images: [
      img("premium-folders", "GRC Premium report folders in black and red, with gold lettering and three emerald-cut gemstones on the cover", 933, 1400),
      img("premium-report", "Sample GRC Premium report: details, hue, tone and saturation, results, a full treatment checklist, clarity chart, statement, photograph and signatures", 989, 1400),
      img("premium-black", "Black GRC Premium report folder", 1145, 1374),
      img("premium-red", "Red GRC Premium report folder", 933, 1400),
    ],
    fields: [
      "Item description",
      "Weight",
      "Measurements (L × W × H)",
      "Shape",
      "Cutting style — crown & pavilion",
      "Hue, tone & saturation",
      "Colour",
      "Clarity",
      "Transparency",
      "Species",
      "Variety",
      "Geographic origin",
      "Itemised treatment checklist",
      "Clarity chart",
      "Photograph",
      "QR code",
    ],
  },
  {
    slug: "a4-full",
    termsClauseId: "a4-full-certificate",
    name: "A4 Full Certificate",
    tagline: "Full identification, origin and treatment.",
    format: "A4 · White GRC folder",
    description:
      "A comprehensive gemological examination on a full A4 page, presented in the white GRC folder. It records the stone's measurements, shape and cutting style, then reports colour, clarity, transparency, species, variety and geographic origin, with the treatment findings stated in full.",
    depth: 3,
    images: [
      img("a4-report", "Sample GRC A4 Full report: details, results with geographic origin, treatment, clarity chart, statement, photograph and signatures", 991, 1400),
      img("a4-folder-angle", "White GRC report folder with gold lettering and three emerald-cut gemstones", 991, 1400),
      img("a4-folder", "White GRC report folder, front view", 1050, 1400),
    ],
    fields: [
      "Item description",
      "Weight",
      "Measurements (L × W × H)",
      "Shape",
      "Cutting style — crown & pavilion",
      "Colour",
      "Clarity",
      "Transparency",
      "Species",
      "Variety",
      "Geographic origin",
      "Treatment",
      "Clarity chart",
      "Photograph",
      "QR code",
    ],
  },
  {
    slug: "a5",
    termsClauseId: "a5-certificate",
    name: "A5 Certificate",
    tagline: "Identification with clarity and treatment.",
    format: "A5 · Landscape sheet",
    description:
      "A more detailed examination on a landscape A5 sheet. It identifies the stone, grades its clarity against the GRC clarity chart, and reports heat treatment and fracture filling — for a stone that needs more than identification, without a full origin report.",
    depth: 2,
    images: [
      img("a5-report", "Sample GRC A5 report: GRC number, description, weight, shape, cut, measurements, clarity, results, clarity chart, photograph and QR code", 1400, 991),
    ],
    fields: [
      "GRC number & date",
      "Description",
      "Weight",
      "Shape",
      "Cut",
      "Measurements (L × W × H)",
      "Transparency",
      "Clarity",
      "Colour",
      "Species",
      "Variety",
      "Comments",
      "Clarity chart",
      "Photograph",
      "QR code",
    ],
  },
  {
    slug: "memo-card",
    termsClauseId: "memo-card-certificate",
    name: "Memo Card Certificate",
    tagline: "Identification that fits in a wallet.",
    format: "Card · 85.60 × 53.98 mm",
    description:
      "Basic identification with a photographic record, on a durable card the size of a bank card. It carries the stone's photograph, key details and its own QR code, so it can travel with the stone and be verified anywhere.",
    depth: 1,
    images: [
      img("memo-card-front", "Front of the GRC Memo Card: gold GRC logo and turtle emblem, three gemstones and laboratory contact details", 933, 1400),
      img("memo-card-back", "Back of the GRC Memo Card: GRC number, date, weight, colour, shape and cut, dimension, species, variety, comments, photograph and QR code", 1400, 933),
    ],
    fields: [
      "GRC number & date",
      "Weight",
      "Colour",
      "Shape & cut",
      "Dimension (L × W × H)",
      "Species",
      "Variety",
      "Comments",
      "Photograph",
      "QR code",
    ],
  },
];

/** Examination items for a report, exactly as the terms list them. */
export function examinationScope(termsClauseId: string): string[] {
  for (const section of termsSections) {
    const clause = section.clauses.find((c) => c.id === termsClauseId);
    if (clause) return clause.items ?? [];
  }
  return [];
}

/**
 * The Premium report's treatment checklist. Mirrors TREATMENT_SECTIONS in
 * gem-tracker-app/src/lib/treatments.ts, which is what the printed report reads.
 */
export const premiumTreatmentSections = [
  {
    title: "Colour enhancements",
    items: [
      "Heat treatment",
      "Irradiation treatment",
      "HPHT",
      "Diffusion treatment",
      "Dyeing",
      "Bleaching",
    ],
  },
  {
    title: "Clarity enhancements",
    items: [
      "Fracture filling with oil",
      "Fracture filling with resin / glass",
      "Laser drilling",
      "HPNT",
    ],
  },
  {
    title: "Surface modifications",
    items: ["Coating", "Assembled stone"],
  },
];

/**
 * Numbered markers over the Premium sample sheet. Positions are percentages of
 * premium-report.jpg and sit in blank space beside each block.
 */
export const premiumAnatomy = [
  { id: "number", x: 78.7, y: 13.9, title: "Report number & QR code", body: "A unique GRC number and QR code that open this report from our live records." },
  { id: "details", x: 20.2, y: 20.6, title: "Details", body: "Description, weight, measurements, shape and the cutting style of crown and pavilion." },
  { id: "colour", x: 70.8, y: 30, title: "Colour grading", body: "Hue, with tone and saturation each graded low, medium or high." },
  { id: "results", x: 20.2, y: 38.7, title: "Results", body: "Colour, clarity, transparency, species, variety and geographic origin." },
  { id: "treatment", x: 69.8, y: 38.7, title: "Treatment checklist", body: "Twelve treatments, each answered yes or no across three groups." },
  { id: "clarity", x: 26.3, y: 63.5, title: "Clarity chart", body: "The GRC clarity scale, from Flawless through Loupe Clean, Eye Clean and Visible to Highly Included." },
  { id: "statement", x: 68.8, y: 63.8, title: "Statement", body: "How the origin and colour description were reached." },
  { id: "photo", x: 29.3, y: 74.3, title: "Photograph", body: "An image of the stone, with its variety and weight beneath." },
  { id: "signatures", x: 60.7, y: 85.7, title: "Signatures", body: "Signed by the consultant gemologist and the laboratory's authorised signatory." },
];

/** The Verbal Report has no printed document, so it appears in the comparison only. */
export const verbalReport = {
  termsClauseId: "verbal-report",
  name: "Verbal Report",
  format: "In person, no document",
};

type CellValue = boolean | string;

export type ComparisonRow = {
  label: string;
  /** One value per column, in the order of {@link comparisonColumns}. */
  values: CellValue[];
};

/** Columns run from the most comprehensive report down to the verbal report. */
export const comparisonColumns = [
  ...reportTypes.map((r) => ({ id: r.slug, name: r.name, termsClauseId: r.termsClauseId })),
  { id: "verbal", name: verbalReport.name, termsClauseId: verbalReport.termsClauseId },
];

/** Rows whose ticks come straight from each report's terms scope. */
const scopeRows: { label: string; matches: string[] }[] = [
  { label: "Species / stone name", matches: ["Stone Name", "Species"] },
  { label: "Variety", matches: ["Variety"] },
  { label: "Colour", matches: ["Colour"] },
  { label: "Clarity", matches: ["Clarity"] },
  { label: "Gem origin", matches: ["Gem Origin"] },
  { label: "Heat treatment / unheated", matches: ["Heat Treatment / Unheated"] },
  { label: "Emerald oil treatment", matches: ["Emerald: Oil Treatment"] },
  { label: "Fracture filling", matches: ["Fracture Filling"] },
  { label: "Diffusion treatment", matches: ["Diffusion Treatment"] },
  { label: "Irradiation", matches: ["Irradiation"] },
  { label: "Other relevant treatments", matches: ["Other Relevant Treatments"] },
  { label: "Overall assessment", matches: ["Overall Assessment of the Gemstone"] },
];

export const examinationRows: ComparisonRow[] = scopeRows.map((row) => ({
  label: row.label,
  values: comparisonColumns.map((column) => {
    const scope = examinationScope(column.termsClauseId);
    return row.matches.some((item) => scope.includes(item));
  }),
}));

/** What the printed document carries. Column order matches comparisonColumns. */
export const documentRows: ComparisonRow[] = [
  {
    label: "Format",
    values: [...reportTypes.map((r) => r.format.replace(" · ", ", ")), verbalReport.format],
  },
  { label: "Weight, shape & measurements", values: [true, true, true, true, false] },
  { label: "Photograph of the stone", values: [true, true, true, true, false] },
  { label: "QR code verification", values: [true, true, true, true, false] },
  { label: "Clarity chart", values: [true, true, true, false, false] },
  { label: "Hue, tone & saturation", values: [true, false, false, false, false] },
  { label: "Itemised treatment checklist", values: [true, false, false, false, false] },
  {
    label: "Video certificate",
    values: comparisonColumns.map((c) =>
      examinationScope(c.termsClauseId).includes("Video Certificate")
    ),
  },
];
