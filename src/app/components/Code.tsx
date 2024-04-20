export interface CodeProps {
  children: React.ReactNode
  isMultiline?: boolean
}

export function Code({ children, isMultiline }: CodeProps) {
  const Component = isMultiline ? "pre" : "code"

  return (
    <Component className="rounded-md border border-zinc-300 bg-zinc-200 p-4 text-sm">
      {isMultiline ? <code>{children}</code> : children}
    </Component>
  )
}
