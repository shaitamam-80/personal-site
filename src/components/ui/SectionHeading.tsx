export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  fleuron = false,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  fleuron?: boolean;
}) {
  return (
    <div className={`text-center ${subtitle || fleuron ? "mb-14" : "mb-12"}`}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-ink-700 dark:text-bone-50">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {fleuron && (
        <div aria-hidden="true" className="editorial-fleuron mt-6">
          ❖
        </div>
      )}
    </div>
  );
}
