"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Linkedin, Send, Loader2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; messageKey: "submitFailed" };

const FIELD_INPUT_CLASSES =
  "w-full rounded-lg border bg-white px-4 py-3 text-base outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-500/30 dark:bg-gray-800";

function fieldClasses(hasError: boolean) {
  return [
    FIELD_INPUT_CLASSES,
    hasError
      ? "border-red-500 focus-visible:border-red-500 dark:border-red-500"
      : "border-gray-300 focus-visible:border-primary-500 dark:border-gray-600 dark:focus-visible:border-primary-400",
  ].join(" ");
}

export default function Contact() {
  const t = useTranslations("contact");
  const tA11y = useTranslations("a11y");
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  function translateError(key: string | undefined): string | undefined {
    if (!key) return undefined;
    const validKeys = ["nameRequired", "emailInvalid", "messageTooShort"] as const;
    type ValidKey = (typeof validKeys)[number];
    return (validKeys as readonly string[]).includes(key)
      ? t(`errors.${key as ValidKey}`)
      : undefined;
  }

  async function onSubmit(data: ContactInput) {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({ kind: "success" });
        reset();
        return;
      }

      setStatus({ kind: "error", messageKey: "submitFailed" });
    } catch {
      setStatus({ kind: "error", messageKey: "submitFailed" });
    }
  }

  function onInvalid() {
    const firstErrorField = (
      ["name", "email", "subject", "message"] as const
    ).find((field) => errors[field]);
    if (firstErrorField) setFocus(firstErrorField);
  }

  const nameError = translateError(errors.name?.message);
  const emailError = translateError(errors.email?.message);
  const messageError = translateError(errors.message?.message);

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("heading")}
            subtitle={t("subtitle")}
            fleuron
          />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid gap-10 lg:grid-cols-5">
          {/* Contact form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              noValidate
              className="space-y-4"
            >
              {/* Honeypot — hidden visually but reachable in DOM for bots */}
              <input
                type="text"
                {...register("website")}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("nameField")}
                  <span aria-hidden="true" className="text-red-600 ms-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? "contact-name-err" : undefined}
                  className={fieldClasses(!!nameError)}
                  {...register("name")}
                />
                {nameError && (
                  <p
                    id="contact-name-err"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("emailField")}
                  <span aria-hidden="true" className="text-red-600 ms-1">
                    *
                  </span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "contact-email-err" : undefined}
                  className={fieldClasses(!!emailError)}
                  {...register("email")}
                />
                {emailError && (
                  <p
                    id="contact-email-err"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("subjectField")}
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  autoComplete="off"
                  className={fieldClasses(false)}
                  {...register("subject")}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t("messageField")}
                  <span aria-hidden="true" className="text-red-600 ms-1">
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  aria-invalid={!!messageError}
                  aria-describedby={messageError ? "contact-message-err" : undefined}
                  className={`${fieldClasses(!!messageError)} resize-none`}
                  {...register("message")}
                />
                {messageError && (
                  <p
                    id="contact-message-err"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {messageError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus-visible:ring-offset-gray-900"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {isSubmitting ? t("sending") : t("send")}
              </button>

              <div role="status" aria-live="polite" className="min-h-[1.5rem]">
                {status.kind === "success" && (
                  <div className="text-sm">
                    <p className="font-medium text-green-700 dark:text-green-400">
                      {t("success")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {t("successDetail")}
                    </p>
                  </div>
                )}
                {status.kind === "error" && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {t(`errors.${status.messageKey}`)}
                  </p>
                )}
              </div>
            </form>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="font-heading text-lg font-semibold mb-6">
                {t("directContact")}
              </h3>
              <div className="space-y-5">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Mail
                    className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {t("emailLabel")}
                    </div>
                    {SITE_CONFIG.email}
                  </div>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Phone
                    className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {t("phoneLabel")}
                    </div>
                    <span dir="ltr">{SITE_CONFIG.phone}</span>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin
                    className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {t("locationLabel")}
                    </div>
                    {t("location")}
                  </div>
                </div>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn — Shai Tamam (${tA11y("openInNewTab")})`}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Linkedin
                    className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      LinkedIn
                    </div>
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
