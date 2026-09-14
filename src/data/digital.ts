/**
 * Content for the Digital Intelligence section.
 *
 * Every capability below describes something the GRC laboratory platform
 * (gem_tracker_api + the internal gem-tracker app) actually does, so the claims
 * on the public site stay in step with the software behind the certificate.
 */

export type CapabilityIcon =
  | "chain"
  | "compare"
  | "match"
  | "spectrum"
  | "scan"
  | "verify";

export type DigitalCapability = {
  id: string;
  icon: CapabilityIcon;
  title: string;
  body: string;
};

export const digitalCapabilities: DigitalCapability[] = [
  {
    id: "chain-of-custody",
    icon: "chain",
    title: "Digital chain of custody",
    body:
      "Every stone is registered at intake and tracked through each stage — testing, review, final approval, report — with the responsible gemologist and a timestamp recorded at every step.",
  },
  {
    id: "dual-testing",
    icon: "compare",
    title: "Two independent examinations",
    body:
      "Two gemologists examine and record each stone separately. The platform places both sets of readings side by side, so any disagreement has to be resolved before a report can be issued.",
  },
  {
    id: "reference-matching",
    icon: "match",
    title: "Confidence-scored identification",
    body:
      "Refractive index, specific gravity and hardness are scored against our gemological reference library, which returns a ranked shortlist of candidate species and varieties with a match score for each.",
  },
  {
    id: "spectral-analysis",
    icon: "spectrum",
    title: "Spectral analysis",
    body:
      "Transmitted spectra are captured and read on screen, with absorption bands located by wavelength and classified by strength — the diagnostic evidence behind an identification.",
  },
  {
    id: "gem-recognition",
    icon: "scan",
    title: "Automated gem recognition",
    body:
      "Our imaging tools detect the outline of the stone in each photograph and report a confidence value for the result, which lets certificates reproduce the gem at its exact physical size.",
  },
  {
    id: "qr-verification",
    icon: "verify",
    title: "Instantly verifiable certificates",
    body:
      "Each report carries a unique number and QR code that resolves against our live records, so anyone holding the certificate can confirm it in seconds from anywhere in the world.",
  },
];

export type DigitalInsight = {
  id: string;
  title: string;
  body: string;
};

export const digitalInsights: DigitalInsight[] = [
  {
    id: "species-distribution",
    title: "Species & variety distribution",
    body:
      "What is actually coming across the bench, tracked across every stone we certify.",
  },
  {
    id: "agreement-rates",
    title: "Examiner agreement rates",
    body:
      "How often our two independent examinations reach the same conclusion, measured per gemologist.",
  },
  {
    id: "turnaround",
    title: "Stage-by-stage turnaround",
    body:
      "Where time is spent between intake and issue, so we can tell clients what to expect and hold to it.",
  },
];

/**
 * The absorption bands drawn on the decorative spectrum strip, positioned across
 * the 380–780 nm visible range the laboratory's spectroscope view covers.
 */
export const SPECTRUM_RANGE = { min: 380, max: 780 } as const;

export const spectrumBands = [
  { from: 400, to: 425, strength: "strong" },
  { from: 442, to: 452, strength: "medium" },
  { from: 468, to: 478, strength: "weak" },
  { from: 685, to: 695, strength: "strong" },
] as const;

export type MeasurementScale = {
  id: string;
  label: string;
  /** The reading as printed on the readout. */
  display: string;
  /** Span the track covers, and the labels drawn at each end. */
  axis: { min: number; max: number };
  axisLabels: { min: string; max: string };
  /** Published range for the leading match — drawn as the gold band. */
  reference: { min: number; max: number };
  /** The lab's reading. R.I. is a span (a doubly refractive stone gives two
   *  readings); S.G. is a single point. */
  reading: { min: number; max: number };
};

/**
 * An illustrative blue sapphire, sized so the drawn evidence and the scores in
 * {@link sampleMatches} agree: the R.I. span sits inside the corundum range and
 * the S.G. reading falls just short of it, which is what keeps the leading match
 * at 97 rather than 100.
 */
export const sampleMeasurements: MeasurementScale[] = [
  {
    id: "ri",
    label: "Refractive index",
    display: "1.762 – 1.770",
    axis: { min: 1.74, max: 1.8 },
    axisLabels: { min: "1.740", max: "1.800" },
    reference: { min: 1.762, max: 1.77 },
    reading: { min: 1.762, max: 1.77 },
  },
  {
    id: "sg",
    label: "Specific gravity",
    display: "3.92",
    axis: { min: 3.8, max: 4.2 },
    axisLabels: { min: "3.80", max: "4.20" },
    reference: { min: 3.95, max: 4.1 },
    reading: { min: 3.92, max: 3.92 },
  },
];

/** Hardness is a single published figure for corundum, so it needs no scale. */
export const sampleHardness = {
  label: "Mohs hardness",
  display: "9",
  reference: "Corundum 9",
} as const;

/**
 * Sample shortlist shown in the readout panel. Scores are what the laboratory's
 * own matcher returns for the readings above, so the panel stays self-consistent.
 */
export const sampleMatches = [
  { species: "Corundum", variety: "Blue Sapphire", score: 97 },
  { species: "Zircon", variety: "Blue Zircon", score: 59 },
  { species: "Spinel", variety: "Blue Spinel", score: 46 },
] as const;
