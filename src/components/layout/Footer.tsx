import { useTranslations } from "next-intl";
import { Linkedin, Mail, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-900">
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Shai Tamam. {t("rights")}.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
          {t("builtWith")} <Heart className="h-3 w-3 text-red-500" /> Next.js
        </p>
      </Container>
    </footer>
  );
}
