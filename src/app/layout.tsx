import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Frank_Ruhl_Libre, Atkinson_Hyperlegible, Heebo } from "next/font/google";
import { isRTL, type Locale } from "@/i18n/request";
import Script from "next/script";
import "./globals.css";

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["500", "700"],
  variable: "--font-frank",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

// Hebrew body fallback (Atkinson lacks Hebrew glyphs)
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heebo",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

// Static inline script for dark mode - no user input involved, safe to inline
const DARK_MODE_SCRIPT = `(function(){var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')})()`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const tA11y = await getTranslations("a11y");
  const direction = isRTL(locale) ? "rtl" : "ltr";
  const fontVariables = `${frankRuhl.variable} ${atkinson.variable} ${heebo.variable}`;
  // Hebrew: body falls back to Heebo for Hebrew glyphs (Atkinson supports Latin only).
  const bodyStack =
    locale === "he"
      ? "var(--font-atkinson), var(--font-heebo), system-ui, sans-serif"
      : "var(--font-atkinson), system-ui, sans-serif";

  return (
    <html lang={locale} dir={direction} className={fontVariables} suppressHydrationWarning>
      <head>
        <Script id="dark-mode" strategy="beforeInteractive">
          {DARK_MODE_SCRIPT}
        </Script>
        <style>{`:root{--font-display:var(--font-frank);--font-body:${bodyStack}}`}</style>
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a href="#main" className="skip-link">
            {tA11y("skipToContent")}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
