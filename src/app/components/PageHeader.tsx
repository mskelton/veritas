export interface PageHeaderProps {
  actions?: React.ReactNode
  subtitle: string
  title: string
}

export function PageHeader({ actions, subtitle, title }: PageHeaderProps) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
          {title}
        </h1>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {subtitle}
        </p>
      </div>

      {actions ? (
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{actions}</div>
      ) : null}
    </div>
  )
}
