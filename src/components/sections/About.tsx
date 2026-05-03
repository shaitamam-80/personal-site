import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const t = useTranslations("about");
  const tA11y = useTranslations("a11y");

  const marginalia = [
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-surface-elevated dark:bg-surface-raised"
    >
      <Container>
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-ink-700 dark:text-bone-50 mt-3">
              {t("heading")}
            </h2>
            <div aria-hidden="true" className="editorial-fleuron mt-6">
              ❖
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Main column — body copy */}
          <ScrollReveal delay={0.1} className="lg:col-span-8 lg:order-1">
            <p className="dropcap text-lg sm:text-xl text-text-primary leading-relaxed mb-6">
              {t("paragraph1")}
            </p>
            <p className="text-lg text-text-muted leading-relaxed mb-10">
              {t("paragraph2")}
            </p>

            {/* Pull-quote */}
            <figure
              className="my-10 border-s-4 border-primary-500 ps-6 py-2"
              role="figure"
              aria-label={tA11y("pullQuoteAlt")}
            >
              <blockquote className="font-heading text-2xl sm:text-3xl italic leading-snug text-ink-700 dark:text-bone-100">
                <span aria-hidden="true" className="text-primary-500/70 me-1">&ldquo;</span>
                {t("paragraph3")}
                <span aria-hidden="true" className="text-primary-500/70 ms-1">&rdquo;</span>
              </blockquote>
            </figure>
          </ScrollReveal>

          {/* Marginalia column — credentials as side notes */}
          <ScrollReveal delay={0.2} className="lg:col-span-4 lg:order-2">
            <aside className="lg:sticky lg:top-24 space-y-6">
              {/* Monogram seal */}
              <figure
                className="relative mx-auto lg:mx-0 max-w-[180px]"
                role="img"
                aria-label={tA11y("monogramAlt")}
              >
                <div className="aspect-square flex flex-col items-center justify-center rounded-full border-2 border-primary-500/30 bg-bone-50 dark:bg-ink-700 p-4 ring-1 ring-primary-500/10">
                  <div
                    aria-hidden="true"
                    className="font-heading text-6xl font-bold leading-none text-primary-600 dark:text-primary-400"
                  >
                    ST
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1 h-px w-8 bg-primary-500/40"
                  />
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-text-subtle">
                    EST 2014
                  </div>
                </div>
              </figure>

              <div aria-hidden="true" className="editorial-rule" />

              {/* Marginalia stats */}
              <dl className="space-y-4">
                {marginalia.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <dt className="font-heading text-3xl font-bold text-primary-600 dark:text-primary-400 leading-none w-14 text-end shrink-0">
                      {item.value}
                    </dt>
                    <dd className="text-sm text-text-muted leading-snug">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div aria-hidden="true" className="editorial-rule" />

              <p className="text-xs text-text-subtle italic leading-relaxed">
                {t("monogramTagline")}
              </p>
            </aside>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
