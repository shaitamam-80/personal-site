import { useTranslations } from "next-intl";
import { MessageSquareText, Search, FileSearch, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { TOOLS } from "@/lib/constants";

const TOOL_ICONS = {
  define: MessageSquareText,
  query: Search,
  review: FileSearch,
} as const;

export default function Tools() {
  const t = useTranslations("tools");

  return (
    <section id="tools" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ key, href }, i) => {
            const Icon = TOOL_ICONS[key as keyof typeof TOOL_ICONS];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary-300 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      {t("badge")}
                    </span>
                  </div>

                  <div className="mb-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                    {t(`${key}.title`)}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`${key}.label`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {t(`${key}.description`)}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all">
                    {t("tryIt")}
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
