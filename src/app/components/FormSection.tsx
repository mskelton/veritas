export function FormSection({
  children,
  subtitle,
  title,
}: {
  children: React.ReactNode
  subtitle: string
  title: string
}) {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
        {children}
      </div>
    </div>
  )
}
