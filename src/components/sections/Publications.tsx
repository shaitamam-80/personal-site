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
    <section id="publications" className="py-24 lg:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ol className="relative space-y-6">
            {PUBLICATIONS.map((pub, i) => {
              const isLast = i === PUBLICATIONS.length - 1;
              return (
                <ScrollReveal key={pub.doi} delay={i * 0.08}>
                  <li className="flex gap-3 sm:gap-4">
                    {/* Year */}
                    <div className="shrink-0 w-12 sm:w-14 text-end">
                      <div className="font-heading text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 leading-none pt-1">
                        {pub.year}
                      </div>
                    </div>

                    {/* Marker column: dot at top + vertical connector */}
                    <div
                      aria-hidden="true"
                      className="relative shrink-0 w-3 flex justify-center"
                    >
                      <span className="mt-1.5 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-950" />
                      {!isLast && (
                        <span className="absolute top-6 -bottom-6 w-0.5 bg-primary-100 dark:bg-primary-900/40" />
                      )}
                    </div>

                    {/* Card */}
                    <article className="flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                      <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-white leading-snug">
                        {t(pub.titleKey)}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {pub.authors.map((author, j) => (
                          <span key={`${author.name}-${j}`}>
                            {author.highlight ? (
                              <strong className="text-primary-600 dark:text-primary-400">
                                {author.name}
                              </strong>
                            ) : (
                              author.name
                            )}
                            {j < pub.authors.length - 1 ? ", " : "."}
                          </span>
                        ))}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {pub.journal}. {pub.year};{pub.volume}:{pub.pages}.
                      </p>
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("viewOnPubMed")} (${tA11y("openInNewTab")})`}
                        className="mt-1 -mx-2 inline-flex items-center gap-1.5 rounded px-2 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                      >
                        {t("viewOnPubMed")}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </article>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
