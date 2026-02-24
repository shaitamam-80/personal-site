"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 start-1/4 h-72 w-72 rounded-full bg-primary-100 opacity-40 blur-3xl dark:bg-primary-900/30" />
        <div className="absolute bottom-1/4 end-1/4 h-96 w-96 rounded-full bg-accent-100 opacity-30 blur-3xl dark:bg-accent-900/20" />
      </div>

      <Container className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-2"
          >
            {t("greeting")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            {t("name")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-6"
          >
            {t("title")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t("tagline")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              {t("cta")}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
