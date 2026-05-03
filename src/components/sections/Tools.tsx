import { useTranslations } from "next-intl";
import {
  Lightbulb,
  Compass,
  SearchCode,
  ListChecks,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { REFDESK } from "@/lib/constants";

const STAGE_ICONS = {
  question: Lightbulb,
  scoping: Compass,
  strategy: SearchCode,
  screening: ListChecks,
  journal: BookOpen,
} as const;

export default function Tools() {
  const t = useTranslations("tools");
  const tA11y = useTranslations("a11y");

  return (
    <section id="tools" className="py-24 lg:py-28 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-400"
            />

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                      {t("productName")}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-300">
                  {t("betaBadge")}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("tagline")}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {t("description")}
              </p>

              <div className="my-10 h-px bg-gray-200 dark:bg-gray-700" />

              <div className="mb-10">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-5">
                  {t("stagesHeading")}
                </h4>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {REFDESK.stages.map(({ key, tier }, i) => {
                    const Icon = STAGE_ICONS[key as keyof typeof STAGE_ICONS];
                    return (
                      <li
                        key={key}
                        className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/30 dark:border-gray-700 dark:bg-gray-900/40 dark:hover:border-primary-700/60 dark:hover:bg-primary-900/10"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm dark:bg-gray-800 dark:text-primary-400">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <span
                            aria-hidden="true"
                            className="absolute -top-1.5 -start-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white"
                          >
                            {i + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h5 className="font-heading font-semibold text-gray-900 dark:text-white">
                              {t(`stages.${key}.name`)}
                            </h5>
                            <span
                              className={
                                tier === "free"
                                  ? "inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  : "inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                              }
                            >
                              {tier === "free" ? t("freeTier") : t("proTier")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t(`stages.${key}.description`)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="mb-10">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  {t("frameworksHeading")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {REFDESK.frameworks.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href={REFDESK.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("cta")} (${tA11y("openInNewTab")})`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-900"
                >
                  {t("cta")}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
