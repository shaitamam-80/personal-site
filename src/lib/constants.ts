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
  "publications",
  "contact",
] as const;

export const PUBLICATIONS = [
  {
    authors:
      "Shaki D, Hershkovitz E, Tamam S, Bollotin A, David O, Yalovitsky G, et al.",
    titleKey: "pub1Title",
    journal: "Front Endocrinol (Lausanne)",
    year: 2023,
    volume: "14",
    pages: "1135768",
    doi: "10.3389/fendo.2023.1135768",
    pmid: "37334282",
  },
  {
    authors:
      "Shaki D, Hershkovitz E, Tamam S, Bollotin A, David O, Yalovitsky G, et al.",
    titleKey: "pub2Title",
    journal: "Front Pediatr",
    year: 2023,
    volume: "11",
    pages: "1132296",
    doi: "10.3389/fped.2023.1132296",
    pmid: "37334225",
  },
  {
    authors: "Goldberg N, Tamam S, Weintraub AY.",
    titleKey: "pub3Title",
    journal: "Int J Gynaecol Obstet",
    year: 2022,
    volume: "159(3)",
    pages: "630-641",
    doi: "10.1002/ijgo.14290",
    pmid: "35580907",
  },
  {
    authors: "Klapper-Goldstein H, Tamam S, Sade S, Weintraub AY.",
    titleKey: "pub4Title",
    journal: "Int J Gynaecol Obstet",
    year: 2022,
    volume: "157(1)",
    pages: "19-30",
    doi: "10.1002/ijgo.13769",
    pmid: "34309858",
  },
] as const;
