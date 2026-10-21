import type { ServiceArtKind } from "../components/ServiceArt";

export type NavItem = {
  label: string;
  path: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Reports", path: "/reports" },
  { label: "Contact", path: "/contact" },
  {
    label: "Post",
    path: "/post",
    children: [
      { label: "Blog", path: "/category/blog" },
      { label: "GRC News", path: "/category/grc-news" },
      { label: "Uncategorized", path: "/category/uncategorized" },
    ],
  },
];

/** Footer-only links — kept out of the primary navigation. */
export const legalLinks: NavItem[] = [
  { label: "Terms & Conditions", path: "/terms-and-conditions" },
];

export const site = {
  name: "GRC",
  fullName: "Gemological Report of Ceylon",
  legalName: "GRC - Gemological Report Of Ceylon (Pvt) Ltd",
  logo: "/images/grc-logo.png",
  phone: "+94 778204525",
  phoneHref: "tel:+94778204525",
  email: "info@grc.lk",
  hours: [
    { days: "Monday — Friday", time: "9am – 5pm" },
    { days: "Saturday", time: "9am – 1pm" },
    { days: "Sunday", time: "Closed" },
  ],
  mapEmbed:
    "https://maps.google.com/maps?q=GRC%20-%20Gemological%20Report%20Of%20Ceylon%20%28Pvt%29%20Ltd&t=m&z=12&output=embed&iwloc=near",
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  /** Photograph of the service; without one a line-drawn `art` panel is shown. */
  image?: string;
  art?: ServiceArtKind;
};

export const services: Service[] = [
  {
    slug: "gemstone-testing",
    title: "Gemstone Testing & Certification",
    description:
      "GRC provides professional gemstone identification and authentication services, with special expertise in emeralds. Each gemstone is carefully examined to determine its identity, natural origin, and observable gemological characteristics. Our certificates support informed decision-making for buyers, sellers, and collectors.",
    image: "/images/gem-laboratory-2.jpeg",
  },
  {
    slug: "jewelry-mounted-gemstone-testing",
    title: "Jewelry-Mounted Gemstone Testing & Certification",
    description:
      "We offer reliable testing and certification for gemstones mounted in jewelry without removing the stone. Using advanced, non-destructive gemological techniques, we assess visible characteristics and authenticity while preserving the integrity of the jewelry piece.",
    image: "/images/gem-laboratory-1.jpeg",
  },
  {
    slug: "natural-pearl-testing",
    title: "Natural Pearl Testing & Certification",
    description:
      "GRC specializes in professional natural pearl testing and certification. Through detailed gemological examination, we identify whether a pearl is natural, cultured, or imitation. Our reports provide confidence and transparency in pearl authenticity.",
    image: "/images/pearls.png",
  },
  {
    slug: "diamond-testing",
    title: "Diamond Testing",
    description:
      "GRC tests diamonds to establish whether a stone is a natural diamond, a laboratory-grown diamond, or a diamond simulant. Each stone is examined with non-destructive gemological methods, and its observable characteristics are recorded, so buyers and sellers can trade with confidence.",
    art: "diamond",
  },
  {
    slug: "gem-research",
    title: "GEM Research",
    description:
      "Beyond routine testing, GRC carries out gemological research into the stones that pass through our laboratory, with particular attention to Ceylon gemstones. This work builds the reference knowledge behind our identifications and keeps our methods current with new treatments and synthetics.",
    art: "research",
  },
];

export type Category = {
  slug: string;
  label: string;
};

export const categories: Category[] = [
  { slug: "blog", label: "Blog" },
  { slug: "grc-news", label: "GRC News" },
  { slug: "uncategorized", label: "Uncategorized" },
];

/* Posts are no longer held here — they come from the laboratory API. See
   `PublishedPost` and `fetchPublishedPosts` in ../lib/api. */
