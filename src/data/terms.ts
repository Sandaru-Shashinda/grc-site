export type TermsClause = {
  /** Anchor id — also what the on-page contents list links to. */
  id: string;
  title: string;
  /** One paragraph, or several rendered in order. */
  body: string | string[];
  /** Optional bullet list shown after the body. */
  items?: string[];
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
export const termsUpdated = "October 2026";

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
        id: "scope-of-examination-and-responsibility",
        title: "Scope of Examination & Responsibility",
        body: [
          "GRC examines the gemstone as a whole; however, the extent of examination, testing, and reporting varies according to the certificate type selected.",
          "The Verbal Report, Memo Card Certificate, and A5 Certificate cover the specific examinations and assessments listed for each certificate type and do not constitute a comprehensive gemological assessment of all gemstone characteristics and treatments.",
          "The A4 Full Certificate and Premium Certificate provide more comprehensive gemological assessments in accordance with their respective examination scopes. GRC accepts responsibility for the examinations performed and findings reported within the scope of these certificate types.",
          "All certificates reflect the findings obtained at the time of examination. Characteristics, treatments, or other features not included in the applicable examination scope are not expressly assessed or confirmed by the certificate. Any changes, treatments, damage, or modifications occurring after examination are not reflected in the original certificate.",
        ],
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
          "Weight, dimensions, and other measurements may vary slightly due to instrument tolerances, environmental conditions, and measurement procedures. Minor variations in weight, dimensions, and other measurements may occur within the applicable tolerances of the instruments and measurement methods used by GRC.",
      },
      {
        id: "borderline-grades",
        title: "Borderline Grades",
        body:
          "Where a gemstone exhibits characteristics between two grading categories, the assigned grade shall be determined by the examining gemologist based on the observed characteristics, professional judgment, and applicable grading standards.",
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
          "Clients are responsible for providing accurate information regarding the gemstone submitted for examination. GRC’s evaluation is based on the physical examination and testing conducted by the laboratory, together with relevant information provided by the client. GRC does not independently verify all information supplied by the client unless specifically examined or tested.",
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
          "Client information and gemstone details shall be treated as confidential and shall not be disclosed to third parties without authorization, except where disclosure is required by applicable law or regulatory requirements, or for legitimate certificate verification and recordkeeping purposes, subject to applicable law.",
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
        title: "Limitation of Liability",
        body: [
          "GRC conducts gemstone examinations using its available equipment, testing methods, professional expertise, and applicable gemological practices at the time of examination. The report reflects the findings obtained from the examination performed on the submitted gemstone.",
          "To the extent permitted by applicable law, GRC shall not be responsible for changes, treatments, alterations, damage, or modifications occurring after examination, or for losses arising from the use of the report beyond its stated scope. Any reported discrepancy shall be reviewed by GRC, and appropriate corrective action may be taken where necessary.",
        ],
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
      {
        id: "protection-of-reputation",
        title: "Protection of Reputation & Legal Action",
        body: [
          "GRC reserves the right to take appropriate legal action against any person or party who unlawfully damages its reputation through false or defamatory statements, impersonation, or misuse or falsification of GRC’s name, logo, certificates, or reports.",
          "Where legally justified, GRC may seek compensation for proven losses and recovery of legal costs, as permitted by applicable Sri Lankan law.",
          "This section does not prohibit genuine customer complaints, honest opinions, or fair criticism.",
        ],
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
          "Certificate verification confirms whether the certificate corresponds to GRC’s official records. Verification alone does not constitute a fresh examination of the gemstone, confirmation of its current condition, or issuance of a new certificate. A physical examination may be required to assess the gemstone’s current characteristics.",
      },
    ],
  },
  {
    id: "certificate-types",
    number: "03",
    title: "Certificate Types & Examination Scope",
    intro:
      "Each certificate provides a defined level of gemological examination and reporting according to the certificate type selected.",
    numbered: false,
    clauses: [
      {
        id: "verbal-report",
        title: "Verbal Report",
        body: "Provides basic gemstone identification:",
        items: ["Stone Name", "Variety"],
      },
      {
        id: "memo-card-certificate",
        title: "Memo Card Certificate",
        body: "Provides basic identification with a photographic record:",
        items: [
          "Stone Name",
          "Variety",
          "Photograph of the Stone",
          "Heat Treatment / Unheated",
          "Emerald: Oil Treatment",
        ],
      },
      {
        id: "a5-certificate",
        title: "A5 Certificate",
        body: "Provides a more detailed examination:",
        items: [
          "Stone Name",
          "Variety",
          "Clarity",
          "Heat Treatment / Unheated",
          "Fracture Filling",
          "Emerald: Oil Treatment",
        ],
      },
      {
        id: "a4-full-certificate",
        title: "A4 Full Certificate",
        body: "Provides a comprehensive gemological examination:",
        items: [
          "Colour",
          "Clarity",
          "Species",
          "Variety",
          "Gem Origin",
          "Heat Treatment / Unheated",
          "Fracture Filling",
          "Diffusion Treatment",
          "Irradiation",
        ],
      },
      {
        id: "premium-certificate",
        title: "Premium Certificate",
        body: "Provides the most comprehensive examination and documentation:",
        items: [
          "Colour",
          "Clarity",
          "Species",
          "Variety",
          "Gem Origin",
          "Heat Treatment / Unheated",
          "Fracture Filling",
          "Diffusion Treatment",
          "Irradiation",
          "Other Relevant Treatments",
          "Video Certificate",
          "Overall Assessment of the Gemstone",
        ],
      },
    ],
  },
];
