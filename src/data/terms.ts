export type TermsClause = {
  /** Anchor id — also what the on-page contents list links to. */
  id: string;
  title: string;
  body: string;
};

export type TermsSection = {
  id: string;
  /** Displayed as the "01." / "02." marker beside the section title. */
  number: string;
  title: string;
  intro?: string;
  /** Clause cards carry their position number; policy statements do not. */
  numbered: boolean;
  clauses: TermsClause[];
};

/** Bump whenever the wording below is revised. */
export const termsUpdated = "September 2026";

export const termsSections: TermsSection[] = [
  {
    id: "terms-and-conditions",
    number: "01",
    title: "Terms & Conditions",
    intro:
      "These terms apply to every Gemological Report of Ceylon (GRC) certificate and report, and to the examination work carried out to produce them.",
    numbered: true,
    clauses: [
      {
        id: "inclusions-and-features",
        title: "Inclusions & Features",
        body:
          "The Gemological Report of Ceylon (GRC) certifies the gemstone based on the knowledge, testing methods, equipment, and gemological standards available at the time of examination. The certificate reflects the condition and characteristics of the gemstone at the time of examination.",
      },
      {
        id: "assessment-of-features",
        title: "Assessment of Features",
        body:
          "Characteristics such as inclusions, color, clarity, and other identifying features are assessed according to accepted gemological practices at the time of examination. Future technological developments may allow for new interpretations or artificial replication of certain features.",
      },
      {
        id: "post-issue-treatments",
        title: "Post-Issue Treatments",
        body:
          "Any treatment or modification performed after the certificate date, including heating, oiling, filling, diffusion, irradiation, coating, or color enhancement, is not covered by the original certificate. GRC accepts no responsibility for alterations made after examination.",
      },
      {
        id: "limitations",
        title: "Limitations",
        body:
          "The certificate is based solely on the characteristics observed during the examination. Any subsequent change to the gemstone may affect its appearance, properties, characteristics, or identification.",
      },
      {
        id: "scope-of-certification",
        title: "Scope of Certification",
        body:
          "The certificate serves as a record of the gemological evaluation performed at the time of examination. It does not constitute a guarantee of future durability, market value, investment value, or resistance to treatments or modifications.",
      },
      {
        id: "reporting-errors",
        title: "Reporting Errors",
        body:
          "Any errors or discrepancies identified in the certificate should be reported to GRC within seven (7) days of receipt for review and, where appropriate, correction.",
      },
      {
        id: "measurement-variations",
        title: "Measurement Variations",
        body:
          "Weight, dimensions, and other measurements may vary slightly due to instrument tolerances, environmental conditions, and measurement procedures. Minor variations may occur, typically within ±0.02 g or equivalent measurement tolerance, where applicable.",
      },
      {
        id: "borderline-grades",
        title: "Borderline Grades",
        body:
          "Where the color or clarity of a gemstone falls between two grading categories, GRC may assign the higher grade based on the professional judgment of the examining gemologist and applicable grading standards.",
      },
      {
        id: "gemological-evaluation",
        title: "Gemological Evaluation",
        body:
          "The certificate reflects the observed quality, cut, clarity, color, and other relevant characteristics of the gemstone at the time of examination. It does not constitute a market appraisal, valuation, investment advice, or price recommendation.",
      },
      {
        id: "client-responsibility",
        title: "Client Responsibility",
        body:
          "Clients are responsible for providing accurate information regarding the gemstone submitted for examination. GRC’s evaluation is based on the information provided by the client together with the physical examination and testing conducted by GRC.",
      },
      {
        id: "educational-purpose",
        title: "Educational Purpose & Inclusion Images",
        body:
          "Gemstone images, inclusion images, microscopic photographs, diagrams, and identifying marks included in GRC certificates or published by GRC may be used for educational, research, documentation, and identification purposes. These materials are intended to support the understanding of gemstone characteristics and identification.",
      },
      {
        id: "use-of-grc-materials",
        title: "Use of GRC Materials",
        body:
          "The content of GRC certificates and publications, including text, photographs, inclusion images, graphics, designs, and logos, is the intellectual property of GRC and may not be copied, reproduced, distributed, modified, or used commercially without prior written permission from GRC.",
      },
      {
        id: "post-issue-alterations",
        title: "Post-Issue Alterations",
        body:
          "Any modification to a gemstone after the report is issued, including re-cutting, polishing, treatment, drilling, mounting, or resetting, may affect or invalidate portions of the original evaluation.",
      },
      {
        id: "environmental-and-handling-factors",
        title: "Environmental & Handling Factors",
        body:
          "The certificate does not account for changes that may occur due to heat, light, chemicals, improper handling, accidents, or normal wear and tear after the date of examination.",
      },
      {
        id: "confidentiality",
        title: "Confidentiality",
        body:
          "Client information and gemstone details are treated as confidential and will not be disclosed to third parties without authorization, except where disclosure is required by applicable law or regulatory requirements.",
      },
      {
        id: "non-transferability",
        title: "Non-Transferability",
        body:
          "The certificate relates specifically to the gemstone examined by GRC and cannot be transferred, substituted, or applied to another gemstone.",
      },
      {
        id: "treatment-disclosure",
        title: "Treatment Disclosure",
        body:
          "Where treatments such as oiling or other enhancements are identified during examination, they will be disclosed in the certificate where applicable. The disclosure of a treatment does not constitute a guarantee regarding the stability or future condition of the treatment.",
      },
      {
        id: "liability-limitation",
        title: "Liability Limitation",
        body:
          "To the extent permitted by applicable law, GRC and its employees shall not be liable for losses or damages arising from errors, omissions, interpretations, or limitations associated with the report. Where appropriate, GRC’s responsibility may be limited to reviewing, correcting, or reissuing the certificate.",
      },
      {
        id: "as-is-basis",
        title: "“As Is” Basis",
        body:
          "The certificate is issued on an “as is” basis and does not provide warranties regarding merchantability, fitness for a particular purpose, future condition, or future market value.",
      },
      {
        id: "legal-jurisdiction",
        title: "Legal Jurisdiction",
        body:
          "Any dispute arising from or relating to a GRC certificate or report shall be governed by the applicable laws of Sri Lanka and subject to the jurisdiction of the appropriate courts or legal authorities in Sri Lanka.",
      },
      {
        id: "certificate-validity",
        title: "Certificate Validity",
        body:
          "The certificate represents the gemstone as examined on the date stated on the certificate. Any treatment, modification, damage, alteration, or change to the gemstone after the examination date is not reflected in the original report.",
      },
    ],
  },
  {
    id: "certificate-verification-policy",
    number: "02",
    title: "Certificate Verification & Examination Policy",
    numbered: false,
    clauses: [
      {
        id: "certificate-verification",
        title: "Certificate Verification",
        body:
          "GRC certificates may be verified through GRC against the official records maintained by the laboratory.",
      },
      {
        id: "examination-and-processing-time",
        title: "Examination & Processing Time",
        body:
          "Where physical examination of the gemstone is required for verification, re-evaluation, or further certification, GRC generally requires 3–5 working days to complete the examination and provide the relevant result.",
      },
      {
        id: "additional-examination",
        title: "Additional Examination",
        body:
          "If additional testing or examination is required, the processing time may be extended depending on the type of gemstone and the nature of the examination required. The client will be informed accordingly.",
      },
      {
        id: "verification-limitations",
        title: "Verification Limitations",
        body:
          "Certificate verification confirms that the certificate is genuine and matches GRC’s official records. It does not mean that the gemstone has been examined again or that a new certificate has been issued.",
      },
    ],
  },
];
