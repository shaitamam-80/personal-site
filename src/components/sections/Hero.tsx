"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const t = useTranslations("hero");
  const tA11y = useTranslations("a11y");

  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-surface">
      {/* Subtle background — paper texture rather than blob gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bone-50 via-bone-100 to-bone-200/40 dark:from-ink-700 dark:via-ink-700 dark:to-ink-900" />
      </div>

      <Container className="py-20 lg:py-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left column — name + tagline */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <span className="eyebrow">{t("eyebrow")}</span>
              <span aria-hidden="true" className="h-px w-12 bg-primary-500/60" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-ink-700 dark:text-bone-50 leading-[0.95] mb-8"
            >
              {t("name")}
            </motion.h1>

            <motion.div variants={itemVariants} className="max-w-xl">
              <p className="font-heading text-xl sm:text-2xl italic text-primary-600 dark:text-primary-400 mb-6 leading-snug">
                {t("title")}
              </p>
              <div aria-hidden="true" className="editorial-rule mb-6" />
              <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-10">
                {t("tagline")}
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-base font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 focus-visible:ring-offset-bone-100 dark:focus-visible:ring-offset-ink-700 rounded-sm"
              >
                <span className="border-b border-primary-600/40 group-hover:border-primary-600 pb-0.5 transition-colors">
                  {t("cta")}
                </span>
                <span aria-hidden="true" className="rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right column — credentials sidebar (editorial frontispiece) */}
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-5 lg:ps-8 lg:border-s lg:border-border-rule"
          >
            <div className="space-y-6">
              <div>
                <div className="eyebrow mb-2">{t("credentialsLabel")}</div>
                <ul className="space-y-3 text-sm sm:text-base text-text-primary">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="font-heading text-primary-500 shrink-0 w-6">I.</span>
                    <span>{t("credential1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="font-heading text-primary-500 shrink-0 w-6">II.</span>
                    <span>{t("credential2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="font-heading text-primary-500 shrink-0 w-6">III.</span>
                    <span>{t("credential3")}</span>
                  </li>
                </ul>
              </div>

              <div className="editorial-rule" />

              <div className="text-xs uppercase tracking-widest text-text-subtle">
                {t("established")}
              </div>
            </div>
          </motion.aside>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          aria-label={tA11y("scrollToAbout")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <motion.span
            aria-hidden="true"
            className="block"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4 }}
          >
            <ArrowDown className="h-5 w-5 text-text-subtle" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
