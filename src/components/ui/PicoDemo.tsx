"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { REFDESK } from "@/lib/constants";

/*
 * Interactive PICO demo — the "show, don't tell" component.
 *
 * The user picks one of 3 pre-baked research topics. We then reveal an
 * AI-style framework decomposition (PICO / PEO / etc.) with a typing
 * animation. No network call: the breakdowns are deterministic mock data
 * authored by hand, so the demo never fails and matches RefDesk's real UX.
 *
 * To later wire to the real RefDesk classification endpoint, replace
 * `EXAMPLES[i].breakdown` with the API response and keep the same shape.
 */

type FrameworkKey = "PICO" | "PEO" | "SPIDER";

interface BreakdownEntry {
  letter: string;
  field: string;
  value: string;
}

interface Example {
  id: string;
  topicKey: string;
  framework: FrameworkKey;
  rationaleKey: string;
  breakdown: BreakdownEntry[];
}

const EXAMPLES: Example[] = [
  {
    id: "downSyndrome",
    topicKey: "example1Topic",
    framework: "PICO",
    rationaleKey: "example1Rationale",
    breakdown: [
      { letter: "P", field: "Population", value: "Pediatric patients with Down syndrome" },
      { letter: "I", field: "Intervention", value: "Recombinant growth hormone (GH) therapy" },
      { letter: "C", field: "Comparator", value: "Placebo or no GH treatment" },
      { letter: "O", field: "Outcome", value: "Linear growth velocity (cm/year)" },
    ],
  },
  {
    id: "incontinence",
    topicKey: "example2Topic",
    framework: "PICO",
    rationaleKey: "example2Rationale",
    breakdown: [
      { letter: "P", field: "Population", value: "Women with stress urinary incontinence" },
      { letter: "I", field: "Intervention", value: "Stem cell therapy (autologous or allogeneic)" },
      { letter: "C", field: "Comparator", value: "Standard care / pelvic floor therapy" },
      { letter: "O", field: "Outcome", value: "Incontinence episodes per 24h, quality-of-life scores" },
    ],
  },
  {
    id: "fibromyalgia",
    topicKey: "example3Topic",
    framework: "PEO",
    rationaleKey: "example3Rationale",
    breakdown: [
      { letter: "P", field: "Population", value: "Adults with fibromyalgia" },
      { letter: "E", field: "Exposure", value: "Co-existing overactive bladder (OAB) symptoms" },
      { letter: "O", field: "Outcome", value: "Prevalence and severity association strength" },
    ],
  },
];

/*
 * Internal sub-component that owns the typing animation. Re-mounts via
 * `key={active.id}` on the parent <AnimatePresence>, so its useState
 * starts fresh each time and we never call setState in an effect body.
 */
function ActiveBreakdown({ example }: { example: Example }) {
  const t = useTranslations("picoDemo");
  const tA11y = useTranslations("a11y");
  const shouldReduceMotion = useReducedMotion();
  const total = example.breakdown.length;

  const [revealedCount, setRevealedCount] = useState(() =>
    shouldReduceMotion ? total : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setRevealedCount((current) => {
        if (current >= total) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 350);
    return () => window.clearInterval(interval);
  }, [total, shouldReduceMotion]);

  const isComplete = revealedCount >= total;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-xl border border-primary-200/60 bg-bone-100 dark:border-primary-800/40 dark:bg-surface-elevated overflow-hidden"
    >
      {/* Framework badge + rationale */}
      <div className="flex items-start gap-3 border-b border-border-rule p-4 bg-bone-50 dark:bg-ink-700/40">
        <span className="font-heading text-xl font-bold text-primary-600 dark:text-primary-400 leading-none mt-0.5">
          {example.framework}
        </span>
        <p className="text-xs text-text-muted leading-snug flex-1">
          {t(example.rationaleKey)}
        </p>
      </div>

      {/* Animated breakdown table */}
      <dl className="divide-y divide-border-rule">
        {example.breakdown.map((entry, i) => {
          const visible = i < revealedCount;
          return (
            <motion.div
              key={entry.letter}
              initial={false}
              animate={{ opacity: visible ? 1 : 0.15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 px-4 py-3"
            >
              <dt className="flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-bold text-primary-500 leading-none">
                  {entry.letter}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-subtle mt-1">
                  {entry.field}
                </span>
              </dt>
              <dd className="text-sm sm:text-base text-text-primary leading-snug pt-1">
                {visible ? (
                  entry.value
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block h-4 w-3/4 rounded bg-border-rule animate-pulse"
                  />
                )}
              </dd>
            </motion.div>
          );
        })}
      </dl>

      {/* Live region for screen readers */}
      <div role="status" aria-live="polite" className="sr-only">
        {isComplete &&
          `${example.framework} framework: ${example.breakdown
            .map((b) => `${b.field}: ${b.value}`)
            .join(". ")}`}
      </div>

      {/* CTA to RefDesk */}
      <div className="border-t border-border-rule p-4 flex items-center justify-between gap-3 bg-bone-50 dark:bg-ink-700/40">
        <p className="text-xs text-text-subtle italic">{t("disclaimer")}</p>
        <a
          href={REFDESK.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("ctaInRefDesk")} (${tA11y("openInNewTab")})`}
          className="group inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50 dark:focus-visible:ring-offset-ink-700 px-2 py-1 transition-colors whitespace-nowrap"
        >
          {t("ctaInRefDesk")}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}

export default function PicoDemo() {
  const t = useTranslations("picoDemo");
  const shouldReduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = EXAMPLES.find((e) => e.id === activeId) ?? null;

  function handleSelect(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  return (
    <div className="rounded-2xl border border-border-rule bg-bone-50 dark:bg-ink-700 p-6 sm:p-8">
      <div className="flex items-start gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <div className="font-heading text-lg font-semibold text-ink-700 dark:text-bone-50">
            {t("heading")}
          </div>
          <p className="text-sm text-text-muted mt-0.5">{t("subtitle")}</p>
        </div>
      </div>

      {/* Topic selector chips */}
      <div className="mb-5">
        <div className="text-xs uppercase tracking-widest text-text-subtle mb-2">
          {t("pickLabel")}
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((example) => {
            const isActive = example.id === activeId;
            return (
              <button
                key={example.id}
                type="button"
                onClick={() => handleSelect(example.id)}
                aria-pressed={isActive}
                className={`text-start rounded-full px-3.5 py-2 text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone-50 dark:focus-visible:ring-offset-ink-700 ${
                  isActive
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-border-rule bg-bone-100 dark:bg-ink-700 text-text-primary hover:border-primary-400 hover:bg-bone-200 dark:hover:bg-surface-elevated"
                }`}
              >
                {t(example.topicKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Output */}
      <AnimatePresence mode="wait">
        {active ? (
          <ActiveBreakdown key={active.id} example={active} />
        ) : (
          <motion.div
            key="empty"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            className="rounded-xl border border-dashed border-border-rule p-6 text-center text-sm text-text-subtle italic"
          >
            {t("emptyState")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
