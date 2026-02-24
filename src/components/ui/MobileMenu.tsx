"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function MobileMenu({
  navItems,
}: {
  navItems: { href: string; label: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 start-0 z-50 w-72 bg-white dark:bg-gray-900 p-6 shadow-xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 end-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <ul className="mt-16 space-y-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
