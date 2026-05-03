import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PUBLICATIONS } from "@/lib/constants";

export default function Publications() {
  const t = useTranslations("publications");
  const tA11y = useTranslations("a11y");

  return (
    <section
      id="publications"
      className="py-24 lg:py-32 bg-surface dark:bg-surface"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("heading")}
            subtitle={t("subtitle")}
            fleuron
          />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ol className="space-y-10">
            {PUBLICATIONS.map((pub, i) => (
              <ScrollReveal key={pub.doi} delay={i * 0.08}>
                <li className="flex gap-5 sm:gap-7">
                  {/* Roman numeral catalog index — like a real journal TOC */}
                  <div
                    aria-hidden="true"
                    className="shrink-0 font-heading text-xs uppercase tracking-widest text-primary-500 pt-2 w-10 text-end"
                  >
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Citation body */}
                  <article className="flex-1 border-s border-border-rule ps-5 sm:ps-7">
                    {/* Authors line — typeset like a real citation */}
                    <p className="text-sm text-text-muted leading-relaxed mb-2">
                      {pub.authors.map((author, j) => (
                        <span key={`${author.name}-${j}`}>
                          {author.highlight ? (
                            <strong className="text-primary-700 dark:text-primary-400 font-semibold">
                              {author.name}
                            </strong>
                          ) : (
                            author.name
                          )}
                          {j < pub.authors.length - 1 ? ", " : "."}
                        </span>
                      ))}
                    </p>

                    {/* Article title — display serif, the typographic centerpiece */}
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-ink-700 dark:text-bone-50 leading-snug mb-3">
                      {t(pub.titleKey)}
                    </h3>

                    {/* Journal citation — italic journal name, formatted volume */}
                    <p className="text-sm text-text-muted leading-relaxed">
                      <em className="font-heading not-italic font-medium text-ink-700 dark:text-bone-100">
                        {pub.journal}
                      </em>
                      <span className="text-text-subtle">
                        {" · "}
                        {pub.year}
                        {" · "}Vol.&nbsp;{pub.volume}
                        {" · pp. "}
                        {pub.pages}
                      </span>
                    </p>

                    {/* Action row */}
                    <div className="mt-3 flex items-center gap-5 text-sm">
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("viewOnPubMed")} (${tA11y("openInNewTab")})`}
                        className="-mx-2 inline-flex items-center gap-1.5 rounded px-2 py-2 font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                      >
                        {t("viewOnPubMed")}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <span className="text-xs text-text-subtle font-mono">
                        DOI: {pub.doi}
                      </span>
                    </div>
                  </article>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
