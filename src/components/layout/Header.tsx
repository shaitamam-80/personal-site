"use client";

import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "@/components/ui/MobileMenu";

export default function Header() {
  const t = useTranslations("nav");
  const active = useActiveSection();

  const navItems = NAV_ITEMS.map((id) => ({
    href: `#${id}`,
    label: t(id),
  }));

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-xl font-bold text-primary-600 dark:text-primary-400"
        >
          ST
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active === item.href.slice(1)
                  ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
