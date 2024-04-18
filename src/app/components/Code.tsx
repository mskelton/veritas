export interface CodeProps {
  children: React.ReactNode
  isMultiline?: boolean
}

export function Code({ children, isMultiline }: CodeProps) {
  const Component = isMultiline ? "pre" : "code"

  return (
    <Component className="p-4 rounded-md border border-zinc-300 bg-zinc-200 text-sm">
      {isMultiline ? <code>{children}</code> : children}
    </Component>
  )
}
