"use client"

import { ErrorBoundary } from "react-error-boundary"

export function FactErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {children}
    </ErrorBoundary>
  )
}
