import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Heebo, Inter } from "next/font/google";
import { isRTL, type Locale } from "@/i18n/request";
import Script from "next/script";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  const direction = isRTL(locale) ? "rtl" : "ltr";
  const fontClass = locale === "he" ? heebo.variable : inter.variable;
  const fontCSSVar = locale === "he" ? "--font-heebo" : "--font-inter";

  return (
    <html lang={locale} dir={direction} className={fontClass} suppressHydrationWarning>
      <head>
        <Script id="dark-mode" strategy="beforeInteractive">
          {DARK_MODE_SCRIPT}
        </Script>
        <style>{`:root{--font-body:var(${fontCSSVar});--font-display:var(${fontCSSVar})}`}</style>
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
