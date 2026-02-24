export default function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-300 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-600">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
