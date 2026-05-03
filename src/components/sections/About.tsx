import { useTranslations } from "next-intl";
import { BookOpen, Users, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const t = useTranslations("about");
  const tA11y = useTranslations("a11y");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label"), Icon: Award },
    { value: t("stat2Value"), label: t("stat2Label"), Icon: BookOpen },
    { value: t("stat3Value"), label: t("stat3Label"), Icon: Users },
  ];

  return (
    <section id="about" className="py-24 lg:py-28 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} />
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14 items-start">
          {/* Monogram column */}
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <figure
              className="relative mx-auto max-w-sm lg:max-w-none"
              role="img"
              aria-label={tA11y("monogramAlt")}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-accent-100 ring-1 ring-primary-200/60 shadow-sm dark:from-primary-900/40 dark:via-primary-950/30 dark:to-accent-900/30 dark:ring-primary-700/40">
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <div
                    aria-hidden="true"
                    className="font-heading text-[10rem] sm:text-[12rem] lg:text-[14rem] font-bold leading-none text-primary-700 dark:text-primary-300"
                  >
                    ST
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-4 h-px w-12 bg-primary-400/60 dark:bg-primary-500/60"
                  />
                  <figcaption className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-primary-700 dark:text-primary-300">
                    Shai Tamam
                  </figcaption>
                  <div className="mt-2 max-w-[20ch] text-xs text-gray-600 dark:text-gray-400 leading-snug">
                    {t("monogramTagline")}
                  </div>
                </div>
              </div>
              {/* Decorative offset accent */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -end-4 -z-10 h-24 w-24 rounded-2xl bg-primary-200/70 dark:bg-primary-900/40"
              />
            </figure>
          </ScrollReveal>

          {/* Copy column */}
          <ScrollReveal delay={0.15} className="lg:col-span-3">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t("paragraph1")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t("paragraph2")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-10 font-medium">
              {t("paragraph3")}
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-gray-200 dark:border-gray-700 pt-8">
              {stats.map(({ value, label, Icon }) => (
                <div key={label} className="text-center">
                  <Icon
                    aria-hidden="true"
                    className="mx-auto mb-2 h-5 w-5 text-primary-600 dark:text-primary-400"
                  />
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
