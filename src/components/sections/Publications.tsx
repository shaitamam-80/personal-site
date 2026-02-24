import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PUBLICATIONS } from "@/lib/constants";

export default function Publications() {
  const t = useTranslations("publications");

  return (
    <section id="publications" className="py-20">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {PUBLICATIONS.map((pub, i) => (
            <ScrollReveal key={pub.doi} delay={i * 0.1}>
              <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                  {t(pub.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">
                    {pub.authors.replace(
                      "Tamam S",
                      "**Tamam S**"
                    ).split("**").map((part, j) =>
                      j === 1 ? (
                        <strong key={j} className="text-primary-600 dark:text-primary-400">
                          {part}
                        </strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                  {pub.journal}. {pub.year};{pub.volume}:{pub.pages}.
                </p>
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  {t("viewOnPubMed")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
