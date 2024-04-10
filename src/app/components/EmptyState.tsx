export interface EmptyStateProps {
  icon?: React.ReactNode
  title?: string
}

export function EmptyState({ icon, title }: EmptyStateProps) {
  return (
    <button
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      type="button"
    >
      {icon}

      <span className="mt-2 block text-sm font-semibold text-gray-900">
        {title}
      </span>
    </button>
  )
}
