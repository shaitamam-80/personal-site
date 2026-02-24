import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ROLE_KEYS = ["mdi", "tau", "bgu", "intel"] as const;

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-s-2 border-primary-200 dark:border-primary-800 ps-8">
            {ROLE_KEYS.map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.1}>
                <div className="relative mb-10 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute -start-[2.55rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 ring-4 ring-white dark:bg-primary-900/50 dark:text-primary-400 dark:ring-gray-950">
                    <Briefcase className="h-4 w-4" />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {t(`roles.${key}.period`)}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {t(`roles.${key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t(`roles.${key}.company`)}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t(`roles.${key}.description`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
