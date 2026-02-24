"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const nextLocale = locale === "he" ? "en" : "he";
  const label = locale === "he" ? "EN" : "עב";

  function switchLocale() {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      aria-label={`Switch to ${nextLocale === "he" ? "Hebrew" : "English"}`}
    >
      {label}
    </button>
  );
}
