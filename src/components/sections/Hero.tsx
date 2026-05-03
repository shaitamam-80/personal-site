"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const t = useTranslations("hero");
  const tA11y = useTranslations("a11y");

  return (
    <section className="relative min-h-[90svh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 start-1/4 h-72 w-72 rounded-full bg-primary-100 opacity-40 blur-3xl dark:bg-primary-900/30" />
        <div className="absolute bottom-1/4 end-1/4 h-96 w-96 rounded-full bg-accent-100 opacity-30 blur-3xl dark:bg-accent-900/20" />
      </div>

      <Container className="py-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            {t("name")}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-6"
          >
            {t("title")}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t("tagline")}
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus-visible:ring-offset-gray-950"
            >
              {t("cta")}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          aria-label={tA11y("scrollToAbout")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <motion.span
            aria-hidden="true"
            className="block"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
