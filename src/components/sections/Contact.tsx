"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-5">
          {/* Contact form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("nameField")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("emailField")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-400"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("subjectField")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("messageField")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-400 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                <Send className="h-4 w-4" />
                {status === "sending" ? t("sending") : t("send")}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {t("success")}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {t("error")}
                </p>
              )}
            </form>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-lg font-semibold mb-6">{t("directContact")}</h3>
              <div className="space-y-5">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t("emailLabel")}</div>
                    {SITE_CONFIG.email}
                  </div>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t("phoneLabel")}</div>
                    <span dir="ltr">{SITE_CONFIG.phone}</span>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{t("locationLabel")}</div>
                    {t("location")}
                  </div>
                </div>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">LinkedIn</div>
                    Shai Tamam
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
