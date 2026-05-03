export const SITE_CONFIG = {
  name: { he: "שי תמם", en: "Shai Tamam" },
  email: "shaitamam@gmail.com",
  phone: "+972-52-7357359",
  linkedin: "https://www.linkedin.com/in/shaitamam",
  location: { he: "ישראל", en: "Israel" },
} as const;

export const NAV_ITEMS = [
  "about",
  "services",
  "tools",
  "publications",
  "contact",
] as const;

export const REFDESK = {
  url: "https://refdesk.shaitamam.com/",
  stages: [
    { key: "question", tier: "free" },
    { key: "scoping", tier: "free" },
    { key: "strategy", tier: "pro" },
    { key: "screening", tier: "pro" },
    { key: "journal", tier: "pro" },
  ],
  frameworks: [
    "PICO",
    "SPIDER",
    "CoCoPop",
    "PCC",
    "PFO",
    "PIRD",
    "PEO",
    "PICo",
    "BeHEMoTh",
    "CMO",
    "ECLIPSE",
    "PerSPEcTiF",
  ],
} as const;

export type ServiceKey =
  | "systematicReviews"
  | "researchConsultation"
  | "training"
  | "scientificWriting"
  | "aiIntegration";

export interface ServiceMeta {
  key: ServiceKey;
  primary?: boolean;
}

export const SERVICES: readonly ServiceMeta[] = [
  { key: "systematicReviews", primary: true },
  { key: "researchConsultation" },
  { key: "training" },
  { key: "scientificWriting" },
  { key: "aiIntegration" },
] as const;

export interface AuthorEntry {
  name: string;
  highlight?: boolean;
}

export interface Publication {
  authors: readonly AuthorEntry[];
  titleKey: string;
  journal: string;
  year: number;
  volume: string;
  pages: string;
  doi: string;
  pmid: string;
}

export const PUBLICATIONS: readonly Publication[] = [
  {
    authors: [
      { name: "Shaki D" },
      { name: "Hershkovitz E" },
      { name: "Tamam S", highlight: true },
      { name: "Bollotin A" },
      { name: "David O" },
      { name: "Yalovitsky G" },
      { name: "et al." },
    ],
    titleKey: "pub1Title",
    journal: "Front Endocrinol (Lausanne)",
    year: 2023,
    volume: "14",
    pages: "1135768",
    doi: "10.3389/fendo.2023.1135768",
    pmid: "37334282",
  },
  {
    authors: [
      { name: "Shaki D" },
      { name: "Hershkovitz E" },
      { name: "Tamam S", highlight: true },
      { name: "Bollotin A" },
      { name: "David O" },
      { name: "Yalovitsky G" },
      { name: "et al." },
    ],
    titleKey: "pub2Title",
    journal: "Front Pediatr",
    year: 2023,
    volume: "11",
    pages: "1132296",
    doi: "10.3389/fped.2023.1132296",
    pmid: "37334225",
  },
  {
    authors: [
      { name: "Goldberg N" },
      { name: "Tamam S", highlight: true },
      { name: "Weintraub AY" },
    ],
    titleKey: "pub3Title",
    journal: "Int J Gynaecol Obstet",
    year: 2022,
    volume: "159(3)",
    pages: "630-641",
    doi: "10.1002/ijgo.14290",
    pmid: "35580907",
  },
  {
    authors: [
      { name: "Klapper-Goldstein H" },
      { name: "Tamam S", highlight: true },
      { name: "Sade S" },
      { name: "Weintraub AY" },
    ],
    titleKey: "pub4Title",
    journal: "Int J Gynaecol Obstet",
    year: 2022,
    volume: "157(1)",
    pages: "19-30",
    doi: "10.1002/ijgo.13769",
    pmid: "34309858",
  },
] as const;
