import { ArrowRight } from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: string;
  href?: string;
  primary?: boolean;
}

export default function Card({
  icon,
  title,
  description,
  cta,
  href,
  primary = false,
}: CardProps) {
  const surface = primary
    ? "border-primary-200 bg-white ring-1 ring-primary-200/60 dark:border-primary-700 dark:bg-gray-900 dark:ring-primary-800/40"
    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900";

  const iconSurface = primary
    ? "bg-primary-600 text-white dark:bg-primary-500"
    : "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400";

  const content = (
    <>
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconSurface}`}
      >
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
      {cta && (
        <span
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
            primary
              ? "text-primary-700 dark:text-primary-300"
              : "text-primary-600 dark:text-primary-400"
          } group-hover:text-primary-700 dark:group-hover:text-primary-300`}
        >
          {cta}
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </span>
      )}
    </>
  );

  const baseClasses = `group block rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${surface}`;

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
